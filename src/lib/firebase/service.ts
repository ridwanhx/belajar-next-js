import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import app from "./init"
// import bcrypt
import bcrypt from "bcryptjs";

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

// inisialisasi async function untuk handle sign up / register
export async function signUp(
    // inisialisasi user data requirement
    // menentukan data apa saja yang dikirimkan dari form register dan kemudian akan diterima/diolah oleh async function signUp ini
    userData: {
        fullName: string,
        email: string,
        password: string
        role?: string,
    },
    // inisialisasi parameter kedua yaitu adalah bertipe callback
    callback: Function
) {
    // inisialisasi query
    // cek apakah sudah ada data yang sama di database, dengan nama collection nya ialah "users", kemudian pada kolom "email", coba cek apakah sebelumnya sudah ada data yang sama dengan data email yang dikirimkan user
    const q = query(
        collection(firestore, "users"),
        where("email", "==", userData.email)
    );

    // inisialisasi snapshot
    // snapshot disini perannya adalah untuk mengeksekusi query berdasarkan perintah query yang sudah kita definisikan melalui variabel q diatas
    // getDocs() -> karena meng-get lebih dari satu data (plural)
    const snapshot = await getDocs(q);
    // data hasil snapshot kemudian di mapping untuk dicarikan apakah dari masing-masing data yang sudah tersimpan di dalam database memiliki kesamaan dengan yang dikirimkan user
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));

    // berikan kondisi
    // jika data yang dikembalikan bernilai > 0 (berarti benar ada data yang sama yang sebelumnya sudah tersimpan di dalam database)
    if (data.length > 0) {
        // kembalikan callback dengan status false dan pesan kesalahannya
        callback({ status: false, message: "Email already exists" });
    } else {
        // proses hashing password
        userData.password = await bcrypt.hash(userData.password, 10);

        // inisialisasi role nilai defaultnya adalah member
        userData.role = "member";

        // proses insert data ke dalam database menggunakan method addDoc
        await addDoc(collection(firestore, "users"), userData).then(() => {
            // kembalikan callback dengan status true dan pesan register success
            callback({ status: true, message: "Register success" });
        }).catch((error) => {
            // catching error
            callback({ status: false, message: error });
        })
    }
}

// inisialsiasi async function untuk handle sign in / login
export async function signIn(userData: { email: string }) {
    // inisialisasi query
    // mencari email yang sama dengan yang dikirimkan oleh user pada collection "users"
    const q = query(
        collection(firestore, "users"),
        where("email", "==", userData.email),
    );

    // inisialisasi snapshot
    const snapshot = await getDocs(q);

    // mapping data hasil snapshot
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    // beri kondisi
    // jika data hasil query berhasil didapat, maka ambil nilai index pertama dari data, jika gagal maka kembalikan null
    return (data.length > 0) ? data[0] : null;
}