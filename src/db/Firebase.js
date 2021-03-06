const firebase = require('firebase')
require('firebase/firestore')
import {firebaseConfig} from './firebaseConfig'

export class Firebase {
    constructor() {
        this._firebaseConfig = firebaseConfig;
        
        this.init()
    }

    init() {
        if (window._initializedFirebase) return
        // Initialize Firebase
        firebase.initializeApp(this._firebaseConfig);
        firebase.analytics();
        
        window._initializedFirebase = true;
    }

    static db() {
        return firebase.firestore()
    }

    static hd() {
        return firebase.storage()
    }

    initAuth() {
        return new Promise((sucess, fail) => {
            let provider = new firebase.auth.GoogleAuthProvider()
            
            firebase.auth().languageCode = 'pt'
            firebase.auth().signInWithPopup(provider)
            .then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                let token = result.credential.accessToken;
                // The signed-in user info.
                let user = result.user;
                sucess({
                    user,
                    token
                })
              })
            .catch(err => {
                fail(err)
            })
        })        
    }
}