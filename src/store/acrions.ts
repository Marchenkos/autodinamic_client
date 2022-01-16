import { createAction } from 'typesafe-redux-helpers';

export const INITIALISATION = {
    TRIGGER: createAction('[Initialisation] Trigger'),
    STARTED: createAction('[Initialisation] Started'),
    COMPLETED: createAction('[Initialisation] Completed'),
};
