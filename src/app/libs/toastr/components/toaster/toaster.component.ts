import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Toast, ToastPosition } from '../../types/toast.types';
import { ToastService } from '../../toast.service';
import { CommonModule } from '@angular/common';
import { ToastComponent } from "../toast/toast.component";
import { trigger, transition, style, animate } from '@angular/animations';



@Component({
  selector: 'Toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css'],
  imports: [CommonModule, ToastComponent],
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms ease-in',
          style({ opacity: 0 })
        )
      ])
    ])
  ],
})

export class ToasterComponent implements OnInit{
  @Input() position: ToastPosition = 'top-right';
  @Input() reverseOrder: boolean = false;
  private toastService: ToastService = inject(ToastService);
  public toasts = signal<Toast[]>([]);

  constructor() { }

  ngOnInit(): void {
    this.toasts.set(this.toastService.getAlerts());
  }

}
