import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
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

// inisialisasi async function untuk fetch data berdasarkan id
export async function retrieveDataById(collectionName: string, id: string) {
    // inisialisasi snapshot u/ ambil data berdasarkan id
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    // inisialisasi data hasil snapshot
    const data = snapshot.data()
    // kembalikan nilai data
    return data;
}