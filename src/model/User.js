import { Firebase } from "../db/Firebase";
import Model from "./Model";

export default class User extends Model{
    static getReference() {
        return Firebase.db().collection('/users')
    }

    static findByEmail(email) {
        return User.getReference().doc(email)
    }

    constructor(id) {
        super()
        if(id) this.getById(id)
    }

    get name() { return this._data.name }
    set name(value) { this._data.name = value }

    get email() { return this._data.email }
    set email(value) { this._data.email = value }

    get photo() { return this._data.photo }
    set photo(value) { this._data.photo = value }

    getById(id) {
        return new Promise((success, failure) => {
            User.findByEmail(id).onSnapshot(doc => {
                this.fromJSON(doc.data())
                success(doc)
            })
        })
    }

    save() {
        return User.findByEmail(this.email).set(this.toJSON())
    }
}