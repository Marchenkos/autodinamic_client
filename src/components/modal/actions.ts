import { createAction } from 'typesafe-redux-helpers';

export interface ShowConfirmModalOptions {
    title: string;
    description?: string;
    onChoose: (choice: boolean, params?: any) => void;
    params?: any;
}

export interface ShowSimpleModalOptions {
    text?: string;
    additionalAction?: () => void;
    additionalButtonText?: string;
}

export interface ShowFormModalProps {
    content: React.ReactNode;
    handleCloseModal?: () => void;
}

export const SHOW_CONFIRM_MODAL = createAction('[SHOW_CONFIRM_MODAL]', (payload: ShowConfirmModalOptions) => payload);
export const HIDE_CONFIRM_MODAL = createAction('[HIDE_CONFIRM_MODAL]');

export const SHOW_FORM_MODAL = createAction('[SHOW_FORM_MODAL]', (payload: ShowFormModalProps) => payload);
export const HIDE_FORM_MODAL = createAction('[HIDE_FORM_MODAL]');

export const SHOW_SIMPLE_MODAL = createAction('[SHOW_SIMPLE_MODAL]', (payload: ShowSimpleModalOptions) => payload);
export const HIDE_SIMPLE_MODAL = createAction('[HIDE_SIMPLE_MODAL]');
