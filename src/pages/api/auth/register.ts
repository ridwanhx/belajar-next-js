import { signUp } from "@/lib/firebase/service";
import { NextApiRequest, NextApiResponse } from "next";

// inisialisasi type
type Data = {
    // inisialisasi status sebagai boolean, dan message sebagai string
    status: boolean,
    message: string,
}

// inisialisasi async function handler
export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // berikan kondisi
    // jika user mencoba mengakses api ini tanpa melalui method "POST" / mencoba mengakses api melalui url (menggunakan method GET dan lainnya)
    if (req.method === "POST") {
        // jika diakses melalui POST, jalankan signUp
        await signUp(
            req.body,
            ({ status, message }: { status: boolean; message: string }) => {
                // jika status bernilai true (jika register berhasil dan data berhasil disimpan kedalam database)
                if (status) {
                    res.status(200).json({ status, message });
                // jika status bernilai false (jika register gagal)
                } else {
                    res.status(400).json({ status, message });
                }
            }
        );
        // jika terindikasi pengguna mengakses api bukan dengan method POST
    } else {
        res.status(405).json({ status: false, message: "Method not allowed." });
    }
}