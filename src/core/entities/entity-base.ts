import { UniqueEntityId } from "./unique-entity-id"

export class EntityBase<Props> {
    private _id: UniqueEntityId
    protected props: Props

    get id() {
        return this._id
    }

    constructor(props: Props, id?: UniqueEntityId) {
        this.props = props
        this._id = id ?? new UniqueEntityId()
    }
}