import firebase from "firebase";

class Fire {
    constructor() {
        this.init();
        this.checkAuth();
    }

    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(
                {
                    apiKey: 'AIzaSyCxTuKWIHwBQdKTqa8jLT3-ceOKAN5QYnE',
                    authDomain: 'chatapp-b5c5d.firebaseapp.com',
                    databaseURL: 'https://chatapp-b5c5d.firebaseio.com',
                    projectId: 'chatapp-b5c5d',
                    storageBucket: 'chatapp-b5c5d.appspot.com',
                    messagingSenderId: '468541121822',
                    appId: '1:468541121822:android:0266074d625a29b8c3d50f',
                }
            )
        }
    };

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
        })
    };

    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            };

            this.db.push(message);
        })
    };

    parse = message => {
        const {user, text, timestamp} = message.val();
        const {key: _id} = message;
        const createdAt = new Date(timestamp);

        return {
            _id,
            createdAt,
            text,
            user
        };
    };

    get = callback => {
        this.db.on("child_added", snapshot => callback(this.parse(snapshot)))
    };

    off() {
        this.db.off();
    };

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get db() {
        return firebase.database().ref("messages");
    }
}

export default new Fire();
