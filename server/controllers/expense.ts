import Expense from '../models/expense';
import BaseCtrl from './base';

class ExpenseCtrl extends BaseCtrl {
  model = Expense;
}

export default ExpenseCtrl;