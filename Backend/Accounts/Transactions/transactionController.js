const moment = require("moment-timezone");
const transactionModel = require("../../Models/Transactions/transactionModel");

exports.createTransaction = async (req, res) => {
  try {
    const { date, category_id, credit, debit, remarks, created_by, status, type } = req.body;

    const formattedDate = moment.tz(date, "Asia/Dhaka").format("YYYY-MM-DD HH:mm:ss");
    const createdAt = moment().tz("Asia/Dhaka").format("YYYY-MM-DD HH:mm:ss"); // Current time in Dhaka

    console.log(formattedDate, category_id, credit, debit, remarks, created_by, status, type);

    const newTransaction = {
      date: formattedDate,
      category_id,
      credit,
      debit,
      remarks,
      created_by,
      created_at: createdAt,
      status,
      type,
    };

    await transactionModel.createTransaction(newTransaction);
    res.status(201).json({ message: "Transaction added successfully" });

  } catch (error) {
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


