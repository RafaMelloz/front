import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Subscription } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { DefaultTableComponent } from '../default-table/default-table.component';

interface DataTable {
  name: string;
  value: string;
}

@Component({
  selector: 'modal-add-windfall',
  imports: [
    DialogModule,
    InputNumberModule,
    InputTextModule,
    ReactiveFormsModule,
    CommonModule,
    DefaultTableComponent
  ],
  templateUrl: './add-windfall.component.html',
})

export class AddWindfallComponent implements OnDestroy, OnInit {
  @Input() dataTable: DataTable[] = [];
  public formData!: FormGroup;
  private unsubscribe: Subscription[] = [];

  // modal control
  @Input() visible: boolean = false;
  @Input() variableName: string = ''; // nome da variável que controla visibilidade
  @Output() visibilityChanged = new EventEmitter<{ name: string, value: boolean }>();

  constructor(
    private form: FormBuilder,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formData = this.form.group({
      name: [null, Validators.required],
      value: [null, Validators.required],
    });
  }

  addItemTable() {
    if (this.formData.valid) {
      this.dataTable.push(this.formData.value);
      this.formData.reset();
    }
  }

  sendForm() {
    if (this.dataTable.length < 1) {
      return;
    }

    const sub = this.dataService.changeWindfall(this.dataTable).subscribe({
      next: (res) => {
        console.log(res);
      }
    });
    this.unsubscribe.push(sub);
  }

  closeModal() {
    this.visibilityChanged.emit({ name: this.variableName, value: false });
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
