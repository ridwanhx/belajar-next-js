import { NextApiRequest, NextApiResponse } from "next";

// inisialisasi type
type Data = {
    revalidated: boolean,
    message?: string,
}

// inisialisasi async function handler
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // simulasi keamanan menggunakan token (mencegah agar tidak sembarang orang yang bisa mengakses / masuk ke api ini dengan memaksa user yang ingin mengakses api ini untuk mengirimkan token yang sama yang telah di definisikan didalam file env)
    if (req.query.token !== process.env.REVALIDATE_TOKEN) {
        res.status(401).json({ revalidated: false, message: "invalid token" })
    }

    // memastikan user yang ingin mengakses data movie untuk menuliskan urlnya seperti berikut:
    // localhost:3000/api/revalidate?data=movie
    if (req.query.data === "movie") {
        try {
            await res.revalidate("/movie/static");
            return res.json({ revalidated: true });
        } catch (error) {
            return res.status(500).send({ revalidated: false });
        }
    } else {
        // kembalikan response jika user tidak mengirimkan data pada request
        return res.json({ revalidated: false, message: "Select data first." });
    }
}