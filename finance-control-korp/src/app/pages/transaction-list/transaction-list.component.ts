import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getAll().subscribe((data: Transaction[]) => {
      this.transactions = data;
    });
  }

  deleteTransaction(id: number): void {
    this.transactionService.delete(id).subscribe(() => {
      this.transactions = this.transactions.filter(t => t.id !== id); // Atualiza a lista localmente
    });
  }
}
