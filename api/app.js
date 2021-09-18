const express = require('express');
const app = express();
const morgan = require('morgan');
const config = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');

const expenseRoutes = require('./routes/expense');
const incomeRoutes = require('./routes/income');
const retirementRoutes = require('./routes/retire');

mongoose.connect(`mongodb://${config.dbHost}/${config.dbName}`);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.use("/expenses", expenseRoutes);
app.use("/income", incomeRoutes);
app.use("/retirement", retirementRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;