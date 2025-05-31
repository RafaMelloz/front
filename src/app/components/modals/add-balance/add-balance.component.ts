import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { DataService } from '../../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'modal-add-balance',
  imports: [
    DialogModule,
    InputNumberModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-balance.component.html',
})

export class AddBalanceComponent implements OnInit, OnDestroy{
  public formData!: FormGroup;
  private unsubscribe: Subscription[] = [];
  @Input() visible: boolean = false;
  @Input() variableName: string = '';
  @Output() visibilityChanged = new EventEmitter<{ name: string, value: boolean }>();

  constructor(
    private form: FormBuilder,
    private dataService: DataService,
  ) {}
  

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formData = this.form.group({
      balance: [null, Validators.required],
    });
  }

  sendForm(){
    const sub = this.dataService.changeBalance(this.formData.value).subscribe({
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
