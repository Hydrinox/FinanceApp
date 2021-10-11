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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));

// app.use(cookieSession({
//   name: 'sessionjkl',
//   keys: ['key1', 'key2']
// }))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: `mongodb://${config.dbHost}/${config.dbName}` })
}))

app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRoutes);
app.use("/expenses", expenseRoutes);
app.use("/income", incomeRoutes);
app.use("/retirement", retirementRoutes);

module.exports = app;