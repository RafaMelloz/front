import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'Toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  imports: [CommonModule]
})

export class ToastComponent implements OnInit {
  @Input() type!: string;
  @Input() message!: string;
  @Input() duration!: number;
  @Input() progressBar!: boolean;
  progress: number = 100

  ngOnInit(): void {
    if (this.progressBar) {
      this.startProgress();
    }
  }

  startProgress() {
    const stepTime = 100;
    const decrement = 100 / (this.duration / stepTime);

    setInterval(() => {
      this.progress -= decrement;
    }, stepTime);
  }
}
