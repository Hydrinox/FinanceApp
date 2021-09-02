import { Schema, model } from "mongoose";

const expenseSchema = new Schema({
        name: String,
        amount: Number
    },
        { timestamps: true }       
    );

const Expense = model("expense", expenseSchema);
    
export default Expense;

