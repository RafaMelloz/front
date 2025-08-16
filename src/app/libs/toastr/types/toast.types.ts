type ToastType = 'success' | 'error' | 'promise';
export type ToastPosition = 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';

export interface Toast {
    type: ToastType;
    message: string;
    options: ToastOptions
}

export interface ToastOptions {
    duration: number;
    progressBar: boolean;
}

export interface ToastPromiseOptions {
    loadingText: string;
    successText: string;
    errorText: string;
}
