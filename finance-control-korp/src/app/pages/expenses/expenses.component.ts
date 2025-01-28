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
  selectedExpense: any | null = null; // Propriedade para gerenciar o modal
  isEditMode: boolean = false; // Controla se o modal está em modo de edição

  constructor(private fb: FormBuilder, private expenseService: ExpenseService) {
    this.expenseForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      date: ['', Validators.required], // Campo de data
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
        date: new Date(this.expenseForm.value.date).toISOString(), // Converter data para UTC
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

  // Abrir o modal para gerenciar uma despesa
  openModal(expense: any): void {
    this.selectedExpense = expense; // Define a despesa selecionada
    this.isEditMode = false; // Inicia o modal no modo "Gerenciar"

    // Preenche o formulário com os dados da despesa selecionada
    this.expenseForm.patchValue({
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
      date: new Date(expense.date).toISOString().split('T')[0], // Formata a data para "yyyy-MM-dd"
    });
  }

  // Fechar o modal
  closeModal(): void {
    this.selectedExpense = null; 
    this.isEditMode = false; 
  }
  
  enableEditMode(): void {
    this.isEditMode = true; // Ativa o modo de edição no modal
  }
  
  editExpense(): void {
    if (!this.selectedExpense || !this.expenseForm.valid) return;
  
    const updatedExpense = {
      ...this.selectedExpense, // Mantém os dados atuais (como ID)
      ...this.expenseForm.value, // Substitui pelos novos valores do formulário
      date: new Date(this.expenseForm.value.date).toISOString(), // Garante o formato UTC para a data
    };
  
    this.expenseService.updateExpense(updatedExpense.id, updatedExpense).subscribe(
      () => {
        const index = this.expenses.findIndex((e) => e.id === updatedExpense.id);
        if (index !== -1) {
          this.expenses[index] = updatedExpense;
        }
        this.closeModal(); // Fecha o modal após a edição
      },
      (error) => {
        console.error('Erro ao atualizar a despesa:', error);
      }
    );
  }
  
  
}
