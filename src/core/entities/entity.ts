import { UniqueId } from "./unique-id";

export abstract class Entity<Props> {
    private _id: UniqueId
    private _props: Props

    get id() {
        return this._id
    }

    get idString() {
        return this._id.toString
    }

    get props() {
        return this._props
    }

    constructor(props: Props, id?: UniqueId) {
        this._props = props
        this._id = id ?? new UniqueId(id)
    }
}