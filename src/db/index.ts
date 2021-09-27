import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

// config value from add firebase sdk script that showed earlier.
const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
}

// init app
const app = initializeApp(config)
const db = getFirestore(app)

export { app, db }
