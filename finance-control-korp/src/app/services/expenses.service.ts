import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private expenses: any[] = [];
  private currentId = 1;

  constructor() {}

  getExpenses(): any[] {
    return this.expenses;
  }

  addExpense(expense: any): void {
    const newExpense = { ...expense, id: this.currentId++ };
    this.expenses.push(newExpense);
  }

  deleteExpense(id: number): void {
    this.expenses = this.expenses.filter((expense) => expense.id !== id);
  }
}
