import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-table',
  imports: [
    CommonModule
  ],
  templateUrl: './default-table.component.html',
  styleUrl: './default-table.component.css'
})
export class DefaultTableComponent {
  @Input() list: { name: string; value: string }[] = [];
  @Output() listChange = new EventEmitter<{ name: string; value: string }[]>();

  removeItem(index: number) {
    this.list.splice(index, 1);
    this.listChange.emit(this.list);
  }
}
