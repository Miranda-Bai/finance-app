import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const monthSchema = new Schema(
  {
    month: String,
    revenue: {
      type: mongoose.Types.Currency,
      Currency: "NZD",
      get: (v) => v / 100,
    },
    expenses: {
      type: mongoose.Types.Currency,
      Currency: "NZD",
      get: (v) => v / 100,
    },
    operationalExpenses: {
      type: mongoose.Types.Currency,
      Currency: "NZD",
      get: (v) => v / 100,
    },
    nonOperationalExpenses: {
      type: mongoose.Types.Currency,
      Currency: "NZD",
      get: (v) => v / 100,
    },
  },
  { toJSON: { getters: true } } // setting!
);

const daySchema = new Schema(
  {
    date: String,
    revenue: {
      type: mongoose.Types.Currency,
      Currency: "NZD",
      get: (v) => v / 100,
    },
    expenses: {
      type: mongoose.Types.Currency,
      Currency: "NZD",
      get: (v) => v / 100,
    },
  },
  { toJSON: { getters: true } } // setting!
);

const KPISchema = new Schema(
  {
    totalProfit: {
      type: mongoose.Types.Currency,
      Currency: "NZD",
      get: (v) => v / 100,
    },
    totalRevenue: {
      type: mongoose.Types.Currency,
      Currency: "NZD",
      get: (v) => v / 100,
    },
    totalExpenses: {
      type: mongoose.Types.Currency,
      Currency: "NZD",
      get: (v) => v / 100,
    },
    expensesByCategory: {
      type: Map,
      of: {
        type: mongoose.Types.Currency,
        Currency: "NZD",
        get: (v) => v / 100,
      },
    },
    monthlyData: [monthSchema],
    dailyData: [daySchema],
  },
  { timestamps: true, toJSON: { getters: true } } // setting!
);

const KPI = mongoose.model("KPI", KPISchema);

export default KPI;
