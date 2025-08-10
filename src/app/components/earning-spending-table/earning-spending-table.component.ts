import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Data } from '../../shared/interfaces/data';

@Component({
  selector: 'app-earning-spending-table',
  imports: [CommonModule],
  templateUrl: './earning-spending-table.component.html',
  styleUrl: './earning-spending-table.component.css'
})
export class EarningSpendingTableComponent {
  readonly totalProfit = input<Data[]>([]);
  readonly totalExpense = input<Data[]>([]);
}
