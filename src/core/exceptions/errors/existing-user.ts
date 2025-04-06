export class ExistingUserError extends Error {
    constructor() {
        super('Existing user.')
    }
}