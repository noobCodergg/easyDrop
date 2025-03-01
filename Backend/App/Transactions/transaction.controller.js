const moment = require("moment-timezone");
const db = require("../Config/db");
const { statusCode } = require("../Helpers/httpStatusCode");


const createTransaction = async (req, res) => {
  try {
    const {
      date,
      category_name,
      credit,
      debit,
      remarks,
      created_by,
      status,
      type,
    } = req.body;

    const formattedDate = moment.tz(date, "Asia/Dhaka").format("YYYY-MM-DD HH:mm:ss");
    const createdAt = moment().tz("Asia/Dhaka").format("YYYY-MM-DD HH:mm:ss");

   
    const creditValue = parseFloat(credit) || 0;
    const debitValue = parseFloat(debit) || 0;

    await db.transaction(async (trx) => {
      // Insert new transaction
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

   
      const existingSummary = await trx("summary").first();

      if (existingSummary) {
        const updatedTotalCredit = parseFloat(existingSummary.total_credit) + (type === "credit" ? creditValue : 0);
        const updatedTotalDebit = parseFloat(existingSummary.total_debit) + (type === "debit" ? debitValue : 0);
        const updatedTotalBalance = updatedTotalCredit - updatedTotalDebit;

        await trx("summary").update({
          total_credit: updatedTotalCredit,
          total_debit: updatedTotalDebit,
          total_balane: updatedTotalBalance, // Fixed typo
        });
      } else {
        await trx("summary").insert({
          total_credit: type === "credit" ? creditValue : 0,
          total_debit: type === "debit" ? debitValue : 0,
          total_balane: creditValue - debitValue, // Fixed typo
        });
      }
    });

    res.status(statusCode.OK).json({ flag: "SUCCESS", msg: "Transaction Created" });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getTransaction = async (req, res) => {
  try {
    let { fromDate, toDate, category, remarks } = req.params;

    console.log("Received Params:", { fromDate, toDate, category_name: category, remarks });

    
    const defaultFromDate = moment().startOf("month").tz("Asia/Dhaka").format("YYYY-MM-DD 00:00:00");
    const defaultToDate = moment().tz("Asia/Dhaka").format("YYYY-MM-DD 23:59:59");

    
    fromDate = fromDate && fromDate !== "null" ? `${fromDate} 00:00:00` : defaultFromDate;
    toDate = toDate && toDate !== "null" ? `${toDate} 23:59:59` : defaultToDate;

    
    const category_name = category === "null" ? undefined : category;
    remarks = remarks === "null" ? undefined : remarks;

    
    const transactions = await db("transactions")
      .select("*")
      .whereBetween("date", [fromDate, toDate])
      .modify((query) => {
        if (category_name) query.where("category_name", category_name);
        if (remarks) query.where("remarks", "like", `%${remarks}%`);
      })
      .orderBy("date", "desc");

   
    const formattedTransactions = transactions.map((transaction) => ({
      ...transaction,
      date: moment.tz(transaction.date, "Asia/Dhaka").format("YYYY-MM-DD HH:mm:ss"),
      created_at: moment.tz(transaction.created_at, "Asia/Dhaka").format("YYYY-MM-DD HH:mm:ss"),
    }));

    console.log(formattedTransactions);
    res.status(statusCode.OK).json({ flag: "SUCCESS", data: formattedTransactions });
  } catch (error) {
    console.error("Error Fetching Transactions:", error);
    res.status(500).json({ error: "Error Occurred" });
  }
};


const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    await db.transaction(async (trx) => {
      const existingTransaction = await trx("transactions").where({ id }).first();

      if (!existingTransaction) {
        return res.status(statusCode.NOT_FOUND).json({ message: "Transaction not found" });
      }

      const { debit: oldDebit, credit: oldCredit } = existingTransaction;
      const { debit: newDebit = oldDebit, credit: newCredit = oldCredit } = updatedFields;

      await trx("transactions").where({ id }).update(updatedFields);

      const existingSummary = await trx("summary").first();
      if (!existingSummary) {
        throw new Error("Summary table is empty");
      }

      const updatedTotalCredit = parseFloat(existingSummary.total_credit) - parseFloat(oldCredit) + parseFloat(newCredit);
      const updatedTotalDebit = parseFloat(existingSummary.total_debit) - parseFloat(oldDebit) + parseFloat(newDebit);
      const updatedTotalBalance = updatedTotalCredit - updatedTotalDebit;

      await trx("summary").update({
        total_credit: updatedTotalCredit,
        total_debit: updatedTotalDebit,
        total_balane: updatedTotalBalance, // Fixed typo
      });

      res.status(statusCode.OK).json({ flag: "SUCCESS", msg: "Transaction Updated" });
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getSummary = async (req, res) => {
  try {
    const summary = await db("summary").select("*").first();

    if (!summary) {
      return res.status(500).json({ message: "No summary data found" });
    }

    res.status(statusCode.OK).json({ flag: "SUCCESS", data: summary });
  } catch (error) {
    console.error("Error fetching summary:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createTransaction,
  getTransaction,
  updateTransaction,
  getSummary,
};
