import { formModalReducer } from './form-modal.reducer';
import { confirmModalReducer } from './confirm-modal.reducer';
import { simpleModalReducer } from './simple-modal.reducer';

export interface ModalState {
    readonly formModal: ReturnType<typeof formModalReducer>;
    readonly confirmModal: ReturnType<typeof confirmModalReducer>;
    readonly simpleModal: ReturnType<typeof simpleModalReducer>;
}
