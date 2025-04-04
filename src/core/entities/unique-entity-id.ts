export class UniqueEntityId {
    private _value: number

    get value() {
        return this._value
    }

    constructor(value?: number) {
        this._value = value ?? Date.now()
    }
}