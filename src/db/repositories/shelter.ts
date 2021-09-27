import {
    getDoc, doc,
} from 'firebase/firestore/lite'
import { db } from '..'

const COLLECTION_NAME = 'shelters'

export type Shelter = {
    address: string;
    phone: string;
    name: string;
    email: string;
    pets: string[];
    website: string;
    city: string;
    location: {
        latitude: number;
        longitude: number;
    };
    logo: string;
    id: string;
}

export const get = async (id: string): Promise<Shelter | null> => {
    const docRef = doc(db, COLLECTION_NAME, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        const data = { ...docSnap.data(), id: docSnap.id }
        return data as Shelter
    }
    return null
}
