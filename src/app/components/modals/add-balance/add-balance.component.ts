import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { DataService } from '../../../services/data.service';
import { Subscription } from 'rxjs';
import { ToastService } from '../../../libs/toastr/toast.service';

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
  @Input() visible: boolean = false;
  @Input() variableName: string = '';
  @Output() visibilityChanged = new EventEmitter<{ name: string, value: boolean }>();

  private unsubscribe: Subscription[] = [];
  private form: FormBuilder = inject(FormBuilder);
  private dataService: DataService = inject(DataService);
  private toastService: ToastService = inject(ToastService);

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
      next: () => {
        this.toastService.Success('Saldo atualizado!');
      },
      error: () => {
        this.toastService.Error('Erro ao atualizar saldo');
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
