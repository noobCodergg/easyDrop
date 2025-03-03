const moment = require("moment-timezone");
const db = require("../config/db");
const { statusCode } = require("../helpers/httpStatusCode");
const { catchBlockCodes } = require("../helpers/catchBlockCodes");
const validateApiFields = require("../helpers/validateApiKeys");
const { printError } = require("../helpers/controllerProfile");

const createTransaction = async (req, res) => {
  try {
    const {
      date,
      category_name,
      credit = 0,
      debit = 0,
      remarks,
      created_by,
      status,
      type,
    } = req.body;

    // Validate required fields
    if (!validateApiFields({ category_name, remarks, created_by, status, type })) {
      printError("Api Field(s) Errors", "createTransaction");
      return res.status(statusCode.BAD_REQUEST).json({
        flag: "FAIL",
        msg: "Api Field(s) Errors",
      });
    }

    // Use default timezone (Asia/Dhaka) set in index.js
    const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
    const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
    const creditValue = parseFloat(credit) || 0;
    const debitValue = parseFloat(debit) || 0;

    await db.transaction(async (trx) => {
      await trx("transactions").insert({
        date: formattedDate,
        category_name,
        credit: creditValue,
        debit: debitValue,
        remarks,
        created_by,
        created_at: createdAt,
        status,
        type,
      });

      const summary = await trx("summary").first();
      const isCredit = type === "credit";
      const isDebit = type === "debit";

      if (summary) {
        const totalCredit = parseFloat(summary.total_credit) + (isCredit ? creditValue : 0);
        const totalDebit = parseFloat(summary.total_debit) + (isDebit ? debitValue : 0);
        const totalBalance = totalCredit - totalDebit;

        await trx("summary").update({
          total_credit: totalCredit,
          total_debit: totalDebit,
          total_balance: totalBalance, // Corrected from total_balane
        });
      } else {
        await trx("summary").insert({
          total_credit: isCredit ? creditValue : 0,
          total_debit: isDebit ? debitValue : 0,
          total_balance: creditValue - debitValue, // Corrected from total_balane
        });
      }
    });

    return res.status(statusCode.OK).json({
      flag: "SUCCESS",
      msg: "Transaction Created",
    });
  } catch (err) {
    catchBlockCodes(res, err);
  }
};

const getTransaction = async (req, res) => {
  try {
    let { fromDate, toDate, category, remarks } = req.params;

    // Set default date range if not provided
    const defaultFromDate = moment().startOf("month").format("YYYY-MM-DD 00:00:00");
    const defaultToDate = moment().format("YYYY-MM-DD 23:59:59");

    fromDate = fromDate && fromDate !== "null" ? `${fromDate} 00:00:00` : defaultFromDate;
    toDate = toDate && toDate !== "null" ? `${toDate} 23:59:59` : defaultToDate;
    const category_name = category === "null" ? undefined : category;
    const searchRemarks = remarks === "null" ? undefined : remarks;

    const transactions = await db("transactions")
      .select("*")
      .whereBetween("date", [fromDate, toDate])
      .modify((query) => {
        if (category_name) query.where("category_name", category_name);
        if (searchRemarks) query.where("remarks", "like", `%${searchRemarks}%`);
      })
      .orderBy("date", "desc");

    const formattedTransactions = transactions.map((transaction) => ({
      ...transaction,
      date: moment(transaction.date).format("YYYY-MM-DD HH:mm:ss"),
      created_at: moment(transaction.created_at).format("YYYY-MM-DD HH:mm:ss"),
    }));

    return res.status(statusCode.OK).json({
      flag: "SUCCESS",
      msg: "Transactions Retrieved",
      data: formattedTransactions,
    });
  } catch (err) {
    catchBlockCodes(res, err);
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    // Validate required fields
    if (!validateApiFields({ id })) {
      printError("Invalid Transaction ID", "updateTransaction");
      return res.status(statusCode.BAD_REQUEST).json({
        flag: "FAIL",
        msg: "Invalid Transaction ID",
      });
    }

    await db.transaction(async (trx) => {
      const existingTransaction = await trx("transactions").where({ id }).first();
      if (!existingTransaction) {
        return res.status(statusCode.NOT_FOUND).json({
          flag: "FAIL",
          msg: "Transaction not found",
        });
      }

      const { debit: oldDebit = 0, credit: oldCredit = 0 } = existingTransaction;
      const { debit: newDebit = oldDebit, credit: newCredit = oldCredit, type = existingTransaction.type } = updatedFields;

      await trx("transactions").where({ id }).update(updatedFields);

      const summary = await trx("summary").first();
      if (!summary) {
        throw new Error("Summary table is empty");
      }

      const totalCredit = parseFloat(summary.total_credit) - parseFloat(oldCredit) + parseFloat(newCredit);
      const totalDebit = parseFloat(summary.total_debit) - parseFloat(oldDebit) + parseFloat(newDebit);
      const totalBalance = totalCredit - totalDebit;

      await trx("summary").update({
        total_credit: totalCredit,
        total_debit: totalDebit,
        total_balance: totalBalance, // Corrected from total_balane
      });
    });

    return res.status(statusCode.OK).json({
      flag: "SUCCESS",
      msg: "Transaction Updated",
    });
  } catch (err) {
    catchBlockCodes(res, err);
  }
};

const getSummary = async (req, res) => {
  try {
    const summary = await db("summary").select("*").first();

    if (!summary) {
      return res.status(statusCode.NOT_FOUND).json({
        flag: "FAIL",
        msg: "No summary data found",
      });
    }

    return res.status(statusCode.OK).json({
      flag: "SUCCESS",
      msg: "Summary Retrieved",
      data: summary,
    });
  } catch (err) {
    catchBlockCodes(res, err);
  }
};

module.exports = {
  createTransaction,
  getTransaction,
  updateTransaction,
  getSummary,
};