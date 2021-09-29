import {
    collection, getDocs, getDoc, doc, limit, query,
} from 'firebase/firestore/lite'
import { db } from '..'
import * as shelter from './shelter'

const COLLECTION_NAME = 'pets'

type Spec = 'kids' | 'other_pets' | 'trained_leash' | 'trained_tray' | 'trained_scratchingstone'

export type Pet = {
    id: string;
    color: string[];
    spec: Spec[];
    avatar: string;
    shelterId: string;
    sterilized: boolean;
    temperament: 'active' | 'calm';
    hair: 'short' | 'long';
    vaccinated: boolean;
    sex: 'boy' | 'girl';
    type: 'cat' | 'dog';
    chipped: boolean;
    birthDate: {
        seconds: number;
        nanoseconds: number;
    };
    size: 'small' | 'middle' | 'large';
    breed: string;
    description: string;
    photos: string[];
    name: string;
    shelter?: shelter.Shelter | null;
}

export const all = async (limitNumber = 100): Promise<Array<Pet>> => {
    const col = collection(db, COLLECTION_NAME)
    const q = query(col, limit(limitNumber))
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))

    return data as Array<Pet>
}

export const get = async (id: string): Promise<Pet | null> => {
    const docRef = doc(db, COLLECTION_NAME, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        const pet = { ...docSnap.data(), id: docSnap.id } as Pet
        if (pet.shelterId) {
            const shelterRes = await shelter.get(pet.shelterId)
            return { shelter: shelterRes, ...pet }
        }
        return pet
    }
    return null
}
