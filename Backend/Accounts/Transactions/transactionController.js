const moment = require("moment-timezone");
const transactionModel = require("../../Models/Transactions/transactionModel");
const summaryModel=require('../../Models/Transactions/SummeryModel')
const db=require('../../Config/db')


exports.createTransaction = async (req, res) => {
  try {
    const { date, category_id, credit, debit, remarks, created_by, status, type } = req.body;

    const formattedDate = moment.tz(date, "Asia/Dhaka").format("YYYY-MM-DD HH:mm:ss");
    const createdAt = moment().tz("Asia/Dhaka").format("YYYY-MM-DD HH:mm:ss");

    console.log(formattedDate, category_id, credit, debit, remarks, created_by, status, type);

    // Convert values to numbers
    const creditValue = Number(credit) || 0;
    const debitValue = Number(debit) || 0;

    const newTransaction = {
      date: formattedDate,
      category_id,
      credit: creditValue,
      debit: debitValue,
      remarks,
      created_by,
      created_at: createdAt,
      status,
      type,
    };

    await transactionModel.createTransaction(newTransaction);
    await summaryModel.updateSummary(creditValue, debitValue, type);

    res.status(201).json({ message: "Transaction added successfully" });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



exports.getTransaction = async (req, res) => {
  try {
    const transactions = await transactionModel.getTransactions();

    const formattedTransactions = transactions.map((transaction) => ({
      ...transaction,
      date: moment.tz(transaction.date, "Asia/Dhaka").format("YYYY-MM-DD HH:mm:ss"),
      created_at: moment.tz(transaction.created_at, "Asia/Dhaka").format("YYYY-MM-DD HH:mm:ss"),
    }));

    res.status(200).json(formattedTransactions);
  } catch (error) {
    res.status(500).json({ error: "Error Occurred" });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    
    await db.transaction(async (trx) => {
      const existingTransaction = await trx("transactions").where({ id }).first();

      if (!existingTransaction) {
        return res.status(404).json({ message: "Transaction not found" });
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
      const updatedTotalBalance = updatedTotalCredit - updatedTotalDebit; // Balance is (credit - debit)

      await trx("summary").update({
        total_credit: updatedTotalCredit,
        total_debit: updatedTotalDebit,
        total_balane: updatedTotalBalance,
      });

      res.status(200).json({ message: "Transaction and summary updated successfully" });
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getSummary=async(req,res)=>{
  try{
    const summary=await transactionModel.getSummary();
    res.status(200).json(summary)
  }catch(error){
    res.status(500).json("Error occured")
  }
}








