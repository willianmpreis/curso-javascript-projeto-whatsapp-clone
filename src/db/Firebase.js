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

        firebase.firestore().settings({
            timestampsInSnapshots: true
        })

        this._initialized = true;
    }

    static db() {
        return firebase.firestore()
    }

    static hd() {
        return firebase.storage()
    }
}