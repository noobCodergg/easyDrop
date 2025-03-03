const knex = require("../config/db");
const { statusCode } = require("../helpers/httpStatusCode");
const {catChBlockCodes} = require('../helpers/catchBlockCodes')


const getFinancialSummary = async (req, res) => {
  const { startDate, endDate } = req.params; 
  
  

  try {
    const baseQuery = knex("orders as o")
      .join("products as p", "o.product_id", "=", "p.id")
      .join("order_info as i", "i.id", "=", "o.order_id")
      .select(
        knex.raw("DATE(o.date) as order_date"),
        knex.raw(
          'CONCAT(YEAR(o.date), LPAD(WEEK(o.date, 1), 2, "0")) as order_week'
        ),
        knex.raw('DATE_FORMAT(o.date, "%Y-%m") as order_month'),
        knex.raw("SUM(p.resell_price * o.quantity) as total_resell_price"),
        knex.raw("SUM(p.buying_price * o.quantity) as total_buying_price"),
        knex.raw("SUM(i.delivery_charge) as total_logistics"),
        knex.raw(
          'STR_TO_DATE(CONCAT(YEAR(o.date), WEEK(o.date, 1), " Monday"), "%X%V %W") as week_start_date'
        )
      )
      .groupByRaw("order_date, order_week, order_month, week_start_date")
      .orderBy("order_date", "desc");

    const result = await baseQuery;

    let totalSales = 0;
    let totalCOGS = 0;
    let totalLogistics = 0;
    let totalGrossProfit = 0;

    const hasValidDateRange =
      startDate && endDate && startDate !== "null" && endDate !== "null";

    if (hasValidDateRange) {
      const totalsQuery = knex("orders as o")
        .join("products as p", "o.product_id", "=", "p.id")
        .join("order_info as i", "i.id", "=", "o.order_id")
        .select(
          knex.raw("SUM(p.resell_price * o.quantity) as total_resell_price"),
          knex.raw("SUM(p.buying_price * o.quantity) as total_buying_price"),
          knex.raw("SUM(i.delivery_charge) as total_logistics")
        )
        .whereBetween("o.date", [startDate, endDate]);

      const totalsResult = await totalsQuery;

      totalSales = Number(totalsResult[0]?.total_resell_price) || 0;
      totalCOGS = Number(totalsResult[0]?.total_buying_price) || 0;
      totalLogistics = Number(totalsResult[0]?.total_logistics) || 0;
      totalGrossProfit = totalSales - (totalCOGS + totalLogistics);
    } else {
      result.forEach((row) => {
        totalSales += Number(row.total_resell_price) || 0;
        totalCOGS += Number(row.total_buying_price) || 0;
        totalLogistics += Number(row.total_logistics) || 0;
      });
      totalGrossProfit = totalSales - (totalCOGS + totalLogistics);
    }

    const dateWise = {};
    const weekWise = {};
    const monthWise = {};

    result.forEach((row) => {
      const date = row.order_date;
      const week = row.order_week;
      const month = row.order_month;

      const sales = Number(row.total_resell_price) || 0;
      const cogs = Number(row.total_buying_price) || 0;
      const logistics = Number(row.total_logistics) || 0;
      const grossProfit = sales - (cogs + logistics);

      dateWise[date] = {
        totalSales: sales,
        totalCOGS: cogs,
        totalLogistics: logistics,
        grossProfit,
      };

      weekWise[week] = weekWise[week] || {
        totalSales: 0,
        totalCOGS: 0,
        totalLogistics: 0,
        grossProfit: 0,
      };
      weekWise[week].totalSales += sales;
      weekWise[week].totalCOGS += cogs;
      weekWise[week].totalLogistics += logistics;
      weekWise[week].grossProfit += grossProfit;

      monthWise[month] = monthWise[month] || {
        totalSales: 0,
        totalCOGS: 0,
        totalLogistics: 0,
        grossProfit: 0,
      };
      monthWise[month].totalSales += sales;
      monthWise[month].totalCOGS += cogs;
      monthWise[month].totalLogistics += logistics;
      monthWise[month].grossProfit += grossProfit;
    });

    return res.status(statusCode.OK).json({
      flag: "SUCCESS",
      data: {
        dateWise,
        weekWise,
        monthWise,
        total: {
          totalSales,
          totalCOGS,
          totalLogistics,
          totalGrossProfit,
        },
      },
    });
  } catch (err) {
    catChBlockCodes(res,err)
  }
};

module.exports = { getFinancialSummary };
