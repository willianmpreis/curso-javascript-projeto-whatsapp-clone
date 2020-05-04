import { Firebase } from "../db/Firebase";
import Model from "./Model";

export default class User extends Model{
    static getReference() {
        return Firebase.db().collection('/users')
    }

    static findByEmail(email) {
        return User.getReference().doc(email)
    }

    static getContactsRef(id) {
        return User.getReference()
            .doc(id)
            .collection('contacts')
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

    /**
     * @param {User} contact 
     */
    addContact(contact) {
        return User.getContactsRef(this.email)
            .doc(btoa(contact.email)) //btoa converte para base64
            .set(contact.toJSON())
    }

    getContacts() {
        return new Promise((success, failure) => {

            User.getContactsRef(this.email).onSnapshot(docs => {
                let contacts = []

                docs.forEach(doc => {
                    let data = doc.data()
                    data.id = doc.id

                    contacts.push(data)
                })

                this.trigger('contactschange', docs)
                
                success(contacts)
            })
        })
    }
    
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