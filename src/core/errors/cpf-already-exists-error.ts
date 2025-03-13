import type { UseCaseError } from "./error";

export class CPFAlreadyExistsUseCaseError extends Error implements UseCaseError {
    constructor() {
        super('CPF already exists.')
    }
}