import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { Subscription } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'modal-add-maximum-spending',
  imports: [
    DialogModule,
    InputNumberModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './add-maximum-spending.component.html',
})

export class AddMaximumSpendingComponent implements OnInit, OnDestroy {
  public formData!: FormGroup;
  private unsubscribe: Subscription[] = [];
  @Input() currentValue!: number ;
  @Input() visible: boolean = false;
  @Input() variableName: string = '';
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
      maximumSpending: [null, Validators.required],
    });
  }

  sendForm() {
    const sub = this.dataService.changeMaximumSpending(this.formData.value).subscribe({
      next: (res) => {
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