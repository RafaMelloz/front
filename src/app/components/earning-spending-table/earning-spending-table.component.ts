import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-earning-spending-table',
  imports: [CommonModule],
  templateUrl: './earning-spending-table.component.html',
  styleUrl: './earning-spending-table.component.css'
})
export class EarningSpendingTableComponent {
  mockGanho = [
    { name: 'Salário', value: 5000, date: '2023-10-01' },
    { name: 'Freelance', value: 1500, date: '2023-10-05' },
    { name: 'Investimentos', value: 2000, date: '2023-10-10' },
    { name: 'Venda de produtos', value: 800, date: '2023-10-15' },
    { name: 'Aluguel', value: 1200, date: '2023-10-20' }
  ];

  mockGasto = [
    { name: 'Aluguel', value: 1200, date: '2023-10-01' },
    { name: 'Supermercado', value: 600, date: '2023-10-05' },
    { name: 'Transporte', value: 300, date: '2023-10-10' },
    { name: 'Lazer', value: 400, date: '2023-10-15' },
    { name: 'Contas', value: 500, date: '2023-10-20' }
  ];
}
