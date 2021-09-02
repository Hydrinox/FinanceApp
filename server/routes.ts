import * as express from 'express';
import ExpenseCtrl from './controllers/expense';

function setRoutes(app): void {
  const router = express.Router();
  const expenseCtrl = new ExpenseCtrl();

  // expenses
  router.route('/expenses').get(expenseCtrl.getAll);
  router.route('/expenses/count').get(expenseCtrl.count);
  router.route('/expense').post(expenseCtrl.insert);
  router.route('/expense/:id').get(expenseCtrl.get);
  router.route('/expense/:id').put(expenseCtrl.update);
  router.route('/expense/:id').delete(expenseCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}

export default setRoutes;