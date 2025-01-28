import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Expense {
  id?: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiUrl = 'http://localhost:5117/api/expenses'; // Substitua pela URL do backend

  constructor(private http: HttpClient) {}

  // Obter todas as despesas
  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl);
  }

  // Criar uma nova despesa
  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense);
  }

  // Atualizar uma despesa
  updateExpense(id: number, expense: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, expense); 
  }  

  // Excluir uma despesa
  deleteExpense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
