import { CommonModule } from '@angular/common';
import { Component, effect, input } from '@angular/core';
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

  public totalProfitValue: number = 0;
  public totalExpenseValue: number = 0;

  constructor(){
    effect(() => {
      this.totalProfitValue = this.somaValores(this.totalProfit());
      this.totalExpenseValue = this.somaValores(this.totalExpense());
    });
  }
  
  somaValores(arr: Data[]): number {
    return arr.reduce((acc, item) => acc + Number(item.value), 0);
  }
}
