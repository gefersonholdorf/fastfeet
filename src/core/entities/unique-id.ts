import { randomUUID } from "node:crypto"

export class UniqueId {
    private _id: string

    get toString() {
        return this._id
    }

    constructor(id?: string) {
        this._id = id ?? randomUUID()
    }
}