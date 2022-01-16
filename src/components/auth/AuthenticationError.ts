export enum AuthenticationErrorType {
    INVALID_CREDENTIALS,
    INVALID_REFRESH_TOKEN,
    NETWORK_ERROR,
    OTHER,
}

export type AuthenticationError =
    | LoginAuthenticationError
    | LogoutAuthenticationError
    | LoginAsGuestAuthenticationError
    | RefreshAuthenticationError;

export class LoginAuthenticationError extends Error {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    constructor(public username: string, public type: AuthenticationErrorType, public cause: any) {
        super(`Failed to login for user: '${username}', caused by: \n${cause.message || cause}`);

        if (cause.stack) {
            this.stack = cause.stack;
        }
    }
}

export class RefreshAuthenticationError extends Error {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    constructor(public type: AuthenticationErrorType, public cause: any) {
        super(`Failed to refresh tokens, caused by: \n${cause.message || cause}`);

        if (cause.stack) {
            this.stack = cause.stack;
        }
    }
}

export class LogoutAuthenticationError extends Error {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    constructor(public type: AuthenticationErrorType, public cause: any) {
        super(`Failed to logout, caused by: \n${cause.message || cause}`);

        if (cause.stack) {
            this.stack = cause.stack;
        }
    }
}

export class LoginAsGuestAuthenticationError extends Error {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    constructor(public type: AuthenticationErrorType, public cause: any) {
        super(`Failed to login as guest, caused by: \n${cause.message || cause}`);

        if (cause.stack) {
            this.stack = cause.stack;
        }
    }
}
