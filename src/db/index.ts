import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

// config value from add firebase sdk script that showed earlier.
const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
}

// init app
const app = initializeApp(config)
const db = getFirestore(app)

export { app, db }
