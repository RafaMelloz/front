import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { AddBalanceComponent } from '../../components/modals/add-balance/add-balance.component';
import { AddFixedIncomeComponent } from '../../components/modals/add-fixed-income/add-fixed-income.component';
import { AddFixedCostsComponent } from '../../components/modals/add-fixed-costs/add-fixed-costs.component';
import { AddMaximumSpendingComponent } from '../../components/modals/add-maximum-spending/add-maximum-spending.component';
import { EarningSpendingChartComponent } from '../../components/earning-spending-chart/earning-spending-chart.component';
import { EarningSpendingTableComponent } from '../../components/earning-spending-table/earning-spending-table.component';
import { AddWindfallComponent } from '../../components/modals/add-windfall/add-windfall.component';
import { AddUnexpectedCostsComponent } from '../../components/modals/add-unexpected-costs/add-unexpected-costs.component';
import { DataService } from '../../services/data.service';


interface Data {
  name: string;
  value: string;
}

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
  public windfall: Data[] = [];
  public unexpectedCosts: Data[] = [];

  public fixedIncome: Data[] = [];
  public fixedCosts: Data[] = [];

  // variaveis de controle das modals
  visiAddBalance: boolean = false;
  visiAddFixedIncome: boolean = false;
  visiAddWindfall: boolean = false;
  visiAddUnexpectedCosts: boolean = false;
  visiAddMaximumSpending: boolean = false;
  visiAddFixedCosts: boolean = false;

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((data: any) => {
      if (data) {
        console.log(data);

        this.balance = data.balance;
        this.maximumSpending = data.maximumSpending;  
        this.windfall = data.windfall;
        this.unexpectedCosts = data.unexpectedCosts;
        
        this.fixedIncome = data.fixedIncome;
        this.fixedCosts = data.fixedCosts;
      }
    });
  }

  showModal(modalName: string) {
    if (modalName in this) {
      (this as any)[modalName] = true;
    }
  }

  visibilityChange(event: { name: string; value: boolean }) {
    const { name, value } = event;
    if (name in this) {
      (this as any)[name] = value;
    }
  }

  calculateTotalIncome(){
    
  }
}
