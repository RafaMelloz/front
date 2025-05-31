import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';

import { AddBalanceComponent } from "../modals/add-balance/add-balance.component";
import { AddFixedIncomeComponent } from "../modals/add-fixed-income/add-fixed-income.component";
import { EarningSpendingChartComponent } from "../earning-spending-chart/earning-spending-chart.component";
import { EarningSpendingTableComponent } from "../earning-spending-table/earning-spending-table.component";
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { AddFixedCostsComponent } from '../modals/add-fixed-costs/add-fixed-costs.component';

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
    EarningSpendingChartComponent, 
    EarningSpendingTableComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})



export class DashboardComponent implements OnInit {
  public balance: number = 0;

  public fixedIncome: Data[] = [];
  public fixedCosts: Data[] = [];

  // variaveis de controle das modals
  visiAddBalance: boolean = false;
  visiAddFixedIncome: boolean = false;
  visiAddFixedCosts: boolean = false;

  constructor(
    private dataService: DataService,
    // private auth: Auth,
  ) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((data: any) => {
      if (data) {
        console.log(data);
        this.balance = data.balance;
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
