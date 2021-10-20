const express = require('express');
const app = express();
const morgan = require('morgan');
const config = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');


const verifyToken = require('./middleware/verifyToken')
const expenseRoutes = require('./routes/expense');
const incomeRoutes = require('./routes/income');
const retirementRoutes = require('./routes/retire');
const authRoutes = require('./routes/auth');

mongoose.connect(process.env.MONGODB_URI || `mongodb://${config.dbHost}/${config.dbName}`);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: `${config.clientUrl}` }));


app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use("/auth", authRoutes);
app.use("/expenses", [verifyToken], expenseRoutes);
app.use("/income", [verifyToken], incomeRoutes);
app.use("/retirement", [verifyToken], retirementRoutes);

module.exports = app;