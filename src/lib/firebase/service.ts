import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "./init"

// inisialisasi firestore
const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
    // inisialisasi snapshot
    const snapshot = await getDocs(collection(firestore, collectionName))
    
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));

    return data;
}