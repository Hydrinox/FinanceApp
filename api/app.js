const express = require('express');
const app = express();
const morgan = require('morgan');
const config = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieSession = require('cookie-session');


const expenseRoutes = require('./routes/expense');
const incomeRoutes = require('./routes/income');
const retirementRoutes = require('./routes/retire');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');


mongoose.connect(`mongodb://${config.dbHost}/${config.dbName}`);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));


app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use("/", authRoutes);
app.use("/expenses", expenseRoutes);
app.use("/income", incomeRoutes);
app.use("/retirement", retirementRoutes);

module.exports = app;