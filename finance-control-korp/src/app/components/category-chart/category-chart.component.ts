import { Component, Input, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-category-chart',
  standalone: true,
  templateUrl: './category-chart.component.html',
  styleUrls: ['./category-chart.component.css']
})
export class ExpenseChartComponent implements OnChanges {
  @Input() expenses: any[] = []; // Recebe as despesas do componente pai
  @ViewChild('pieChart') pieChart!: ElementRef<HTMLCanvasElement>;
  
  private chartInstance!: Chart; // Armazena o gráfico

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expenses'] && this.expenses.length > 0) {
      this.createChart(); // Atualiza o gráfico quando os dados mudarem
    }
  }

  private createChart(): void {
    if (!this.pieChart || !this.pieChart.nativeElement) return; // Verifica se o elemento do gráfico existe
  
    const ctx = this.pieChart.nativeElement.getContext('2d');
    if (!ctx) return;
  
    // Verifica se já existe um gráfico e destrói antes de criar um novo
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  
    const categoryTotals: { [key: string]: number } = {};
  
    this.expenses.forEach(expense => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }
      categoryTotals[expense.category] += expense.amount;
    });
  
    this.chartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(categoryTotals),
        datasets: [
          {
            data: Object.values(categoryTotals),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50']
          }
        ]
      }
    });
  }
  
}
