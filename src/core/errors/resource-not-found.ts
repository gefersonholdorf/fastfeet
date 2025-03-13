import type { UseCaseError } from "./error";

export class ResourceNotFoundUseCaseError extends Error implements UseCaseError {
    constructor() {
        super('Resource not found.')
    }
}