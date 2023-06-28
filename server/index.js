import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import KPI from "./models/KPI.js";
import { kpis } from "./data/data.js";

import productRoutes from "./routes/product.js";
import Product from "./models/Product.js";
import { products } from "./data/data.js";

import transactionRoutes from "./routes/transaction.js";
import Transaction from "./models/Transaction.js";
import { transactions } from "./data/data.js";

/* configurations */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* routes */
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

/* mongoose setup */
const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* Add data one time only */
    /* // delete data first to avoid duplicated data
    await mongoose.connection.db.dropDatabase();
    // insert mock data to the database
     */
    // KPI.insertMany(kpis);
    // Product.insertMany(products);
    // await mongoose.connection.db.dropCollection("transactions");
    // Transaction.insertMany(transactions);
  })
  .catch((error) => console.log(`${error} did not connect!`));
