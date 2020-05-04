const firebase = require('firebase')
require('firebase/firestore')

export class Firebase {
    constructor() {
         this._firebaseConfig = {
             apiKey: process.env.APIKEY,
             authDomain: process.env.AUTHDOMAIN,
             databaseURL: process.env.DATABASEURL,
             projectId: process.env.PROJECTID,
             storageBucket: process.env.STORAGEBUCKET,
             messagingSenderId: process.env.MESSAGINGSENDERID,
             appId: process.env.APPID,
             measurementId: process.env.MEASUREMENTID
           };
        
        this.init()
    }

    init() {
        if (this._initialized) return
        // Initialize Firebase
        firebase.initializeApp(this._firebaseConfig);
        firebase.analytics();
        
        this._initialized = true;
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