import {
    getDoc, doc, collection, query, getDocs,
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

export const all = async (): Promise<Array<Shelter>> => {
    const col = collection(db, COLLECTION_NAME)
    const q = query(col)
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))

    return data as Array<Shelter>
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
