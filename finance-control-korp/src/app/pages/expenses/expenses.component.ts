import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ExpenseService } from '../../services/expenses.service';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [ExpenseService], 
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent implements OnInit {
  expenseForm: FormGroup;
  expenses: any[] = [];
  categories: string[] = ['Alimentação', 'Transporte', 'Salário', 'Outros'];

  constructor(private fb: FormBuilder, private expenseService: ExpenseService) {
    this.expenseForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      date: ['', Validators.required], // Incluímos o campo de data
    });
  }

  ngOnInit(): void {
    this.loadExpenses();
  }

  // Carregar despesas do backend
  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe((data) => {
      this.expenses = data;
    });
  }

  // Submeter nova despesa para o backend
  onSubmit(): void {
    if (this.expenseForm.valid) {
      const newExpense = {
        ...this.expenseForm.value,
        date: new Date(this.expenseForm.value.date).toISOString(), // Converter a data para UTC
      };

      this.expenseService.addExpense(newExpense).subscribe(
        (expense) => {
          this.expenses.push(expense); // Adiciona a nova despesa à lista local
          this.expenseForm.reset(); // Reseta o formulário
          console.log('Despesa salva com sucesso:', expense); // Log de sucesso
        },
        (error) => {
          console.error('Erro ao salvar a despesa:', error); // Log de erro
        }
      );
    }
  }

  // Excluir despesa pelo ID
  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id).subscribe(() => {
      this.expenses = this.expenses.filter((expense) => expense.id !== id);
    });
  }
}
