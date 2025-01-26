import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expenses.service';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Adicione os módulos aqui
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
})

export class ExpensesComponent {
  expenseForm: FormGroup;
  expenses: any[] = [];
  categories: string[] = ['Alimentação', 'Transporte', 'Salário', 'Outros'];

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['',[Validators.required, Validators.min(0.01)],],
      category: ['', Validators.required],
    });
  }

  
  onSubmit(): void {
    if (this.expenseForm.valid) {
      this.expenses.push({ ...this.expenseForm.value });
      this.expenseForm.reset();
    }
  }
  
  deleteExpense(id: number): void {
    this.expenses = this.expenses.filter((expense) => expense.id !== id);
  }
  
}

