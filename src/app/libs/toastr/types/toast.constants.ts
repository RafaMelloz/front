import { ToastOptions, ToastPromiseOptions } from "./toast.types";

export const DEFAULT_TOAST_OPTIONS: ToastOptions = {
    duration: 3000, 
    progressBar: false,
};

export const DEFAULT_TOAST_PROMISE_OPTIONS: ToastPromiseOptions = {
    loadingText: 'Carregando...',
    successText: 'Sucesso!',
    errorText: 'Erro!',
};