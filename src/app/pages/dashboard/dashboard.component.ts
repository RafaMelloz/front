import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';

// Services
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

// Interfaces And Utils
import { Data } from '../../shared/interfaces/data';
import { Totals } from '../../shared/interfaces/totals';
import { calculateOverLimitExpense } from '../../shared/utils/calculateMethods';

// Modals
import { AddBalanceComponent } from '../../components/modals/add-balance/add-balance.component';
import { AddWindfallComponent } from '../../components/modals/add-windfall/add-windfall.component';
import { AddFixedCostsComponent } from '../../components/modals/add-fixed-costs/add-fixed-costs.component';
import { AddFixedIncomeComponent } from '../../components/modals/add-fixed-income/add-fixed-income.component';
import { AddUnexpectedCostsComponent } from '../../components/modals/add-unexpected-costs/add-unexpected-costs.component';
import { AddMaximumSpendingComponent } from '../../components/modals/add-maximum-spending/add-maximum-spending.component';
// Table and chart 
import { EarningSpendingChartComponent } from '../../components/earning-spending-chart/earning-spending-chart.component';
import { EarningSpendingTableComponent } from '../../components/earning-spending-table/earning-spending-table.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    TooltipModule,
    DialogModule,
    AddBalanceComponent,
    AddFixedIncomeComponent,
    AddFixedCostsComponent,
    AddMaximumSpendingComponent,
    EarningSpendingChartComponent,
    EarningSpendingTableComponent,
    AddWindfallComponent,
    AddUnexpectedCostsComponent
],
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit {
  public balance: number = 0;
  public maximumSpending: number = 0;
  public overLimitExpense: number = 0;

  public windfall: Data[] = [];
  public unexpectedCosts: Data[] = [];

  public fixedIncome: Data[] = [];
  public fixedCosts: Data[] = [];

  public totalProfit = signal<Data[]>([]);
  public totalExpense = signal<Data[]>([]);

  public totals = signal<Totals[]>([]);
  
  // variaveis de controle das modals
  public visiAddBalance: boolean = false;
  public visiAddFixedIncome: boolean = false;
  public visiAddWindfall: boolean = false;
  public visiAddUnexpectedCosts: boolean = false;
  public visiAddMaximumSpending: boolean = false;
  public visiAddFixedCosts: boolean = false;

  constructor(
    private router: Router, 
    private dataService: DataService, 
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.dataService.getData().subscribe((data: any) => {
      if (data) {
        this.balance = data.balance;
        this.maximumSpending = data.maximumSpending;
        this.windfall = data.windfall;
        this.unexpectedCosts = data.unexpectedCosts;
        this.fixedIncome = data.fixedIncome;
        this.fixedCosts = data.fixedCosts;
      }
      this.overLimitExpense = calculateOverLimitExpense(this.maximumSpending, this.unexpectedCosts);
      this.getAllIncome();
      this.getAllCosts();

      this.totals.set([{
        profit: this.sumValues(this.totalProfit()),
        expense: this.sumValues(this.totalExpense()),
        date: this.getCurrentMonth()
      }]);
    });
  }

  getAllIncome() {
    this.totalProfit.set([...this.fixedIncome, ...this.windfall]);
  }

  getAllCosts() {
    this.totalExpense.set([...this.fixedCosts, ...this.unexpectedCosts]);
  }

  sumValues(arr: Data[]): number {
    return arr.reduce((acc, item) => acc + Number(item.value), 0);
  }

  showModal(modalName: string) {
    if (modalName in this) {
      (this as any)[modalName] = true;
    }
  }

  getCurrentMonth(): string {
    const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    const currentMonth = months[new Date().getMonth()];

    return currentMonth;
  }    

  visibilityChange(event: { name: string; value: boolean }) {
    const { name, value } = event;
    if (name in this) {
      (this as any)[name] = value;
    }
  }

  logout() {
    this.auth.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
