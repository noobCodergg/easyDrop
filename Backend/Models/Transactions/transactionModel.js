const db = require("../../Config/db");

module.exports = {
  createTransaction: (transaction) => db("transactions").insert(transaction),

  getTransactions: async ({ fromDate, toDate, category_name, remarks }) => {
    return db("transactions")
      .select("*")
      .whereBetween("date", [fromDate, toDate]) // Ensure date filtering works
      .modify((query) => {
        if (category_name) query.where("category_name", category_name); // Apply category filter if provided
        if (remarks) query.where("remarks", "like", `%${remarks}%`); // Partial match for remarks
      })
      .orderBy("date", "desc");
  },

  updateTransaction: (id, updatedFields) => db("transactions").where({ id }).update(updatedFields),

  getSummary: () => db("summary").select("*"),
};

