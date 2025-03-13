import type { UseCaseError } from "./error";

export class AccessDeniedUseCaseError extends Error implements UseCaseError {
    constructor() {
        super('Access denied.')
    }
}