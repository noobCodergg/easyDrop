const db = require("../../Config/db");
const { getSummary } = require("./transactionModel");

module.exports = {
  updateSummary: async (credit, debit, type) => {
    return db.transaction(async (trx) => {
      const existingSummary = await trx("summary").first();

      if (existingSummary) {
        const newTotalCredit = parseFloat(existingSummary.total_credit) + (type === "credit" ? parseFloat(credit) : 0);
        const newTotalDebit = parseFloat(existingSummary.total_debit) + (type === "debit" ? parseFloat(debit) : 0);
        const newTotalBalane = parseFloat(existingSummary.total_balane) + (type === "credit" ? parseFloat(credit) : -parseFloat(debit));

        await trx("summary").update({
          total_credit: newTotalCredit,
          total_debit: newTotalDebit,
          total_balane: newTotalBalane, // Ensure this is a number
        });
      } else {
        await trx("summary").insert({
          total_credit: type === "credit" ? parseFloat(credit) : 0,
          total_debit: type === "debit" ? parseFloat(debit) : 0,
          total_balane: parseFloat(credit) - parseFloat(debit),
        });
      }
    });
  },

  
};
