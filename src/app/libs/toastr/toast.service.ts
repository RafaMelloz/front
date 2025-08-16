import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Toast, ToastOptions, ToastPromiseOptions } from './types/toast.types';
import { DEFAULT_TOAST_OPTIONS, DEFAULT_TOAST_PROMISE_OPTIONS } from './types/toast.constants';

@Injectable({
    providedIn: 'root'
})

export class ToastService {
    public alerts: Toast[] = [];
    constructor() { }

    // Partial<ToastOptions> deixa todas as propriedades de uma interface opcionais
    public Success(message: string, options?: Partial<ToastOptions>): void {
        this.addToast({
            type: 'success',
            message,
            options: { ...DEFAULT_TOAST_OPTIONS, ...options }
        });
    }

    public Error(message: string, options?: Partial<ToastOptions>): void {
        this.addToast({
            type: 'error',
            message,
            options: { ...DEFAULT_TOAST_OPTIONS, ...options }
        });
    }

    public async Promise<T>(func: Observable<T>, options?: ToastPromiseOptions) {
        const toast: Toast = {
            type: 'promise',
            message: options?.loadingText || DEFAULT_TOAST_PROMISE_OPTIONS.loadingText,
            options: { duration: 0, progressBar: false }
        };

        this.addToast(toast);

        func.subscribe({
            next: () => {
                this.updateToast(toast, {
                    type: 'success',
                    message: options?.successText || DEFAULT_TOAST_PROMISE_OPTIONS.successText,
                    options: { ...toast.options, duration: 3000 }
                });
            },
            error: () => {
                this.updateToast(toast, {
                    type: 'error',
                    message: options?.errorText || DEFAULT_TOAST_PROMISE_OPTIONS.errorText,
                    options: { ...toast.options, duration: 5000 }
                });
            }
        });
    }

    public getAlerts() {
        return this.alerts;
    }

    private addToast(toast: Toast) {
        this.alerts.push(toast);

        if (toast.options?.duration > 0) {
            setTimeout(() => {
                this.removeToast(toast);
            }, toast.options?.duration);
        }
    }

    private removeToast(toast: Toast) {
        const index = this.alerts.indexOf(toast);
        if (index !== -1) {
            this.alerts.splice(index, 1);
        }
    }

    private updateToast(toast: Toast, updates: Partial<Toast>) {
        Object.assign(toast, updates);

        setTimeout(() => {
            this.removeToast(toast);
        }, updates.options?.duration);
    }
}
