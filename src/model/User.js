import { ClassEvent } from "../utils/ClassEvent";
import { Firebase } from "../db/Firebase";

export default class User extends ClassEvent{
    static getReference() {
        return Firebase.db().collection('/users')
    }

    static findByEmail(email) {
        return User.getReference().doc(email)
    }

}