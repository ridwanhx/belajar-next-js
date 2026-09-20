// import requirement types
import { retrieveData, retrieveDataById } from "@/lib/firebase/service";
import { NextApiRequest, NextApiResponse } from "next";

// mendefinisikan tipe data object untuk CastMember (sebelum integrasi firebase)
// type CastMember = {
//     id: number,
//     name: string,
//     role: string
// }

// inisialisasi response data
type Data = {
    status: boolean,
    statusCode: number,
    // inisialisasi static data (sebelum integrasi firebase)
    // data: {
    //     id: number,
    //     title: string,
    //     category: string[], // mendefinisikan tipe data array string
    //     director: string,
    //     casts: CastMember[],    // memungkinkan mengirimkan data object lebih dari 1, penjelasan konsepnya sama seperti yang telah saya jelaskan dibawah (terkait penambahan kurung siku)
    //     rating: number
    // }[] // penambahan kurung siku di akhir inisialisasi biasa digunakan dalam pemograman typescript untuk memberitahukan bahwa data ini nantinya bisa memuat banyak data yang didefinisikan kedalam bentuk array / singkatnya nanti pada saat di definisikan akan berbentuk array yang berisi banyak object

    // inisialisasi data (setelah integrasi firebase)
    data: any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // jika request mengirimkan id melalui url, maka
    if (req.query.movie![1]) {
        const data = await retrieveDataById("movies", req.query.movie![1]);
        res.status(200).json({ status: true, statusCode: 200, data });
    } else {
        // inisialisasi api integrasi firebase
        const data = await retrieveData("movies");
        res.status(200).json({ status: true, statusCode: 200, data });
    }
    // inisialisasi api static data
    // const data = [
    //     {
    //         id: 1,
    //         title: "The Dark Knight",
    //         category: ["action", "crime", "thriller"],
    //         director: "Christopher Nolan",
    //         casts: [
    //         {
    //             id: 1,
    //             name: "Christian Bale",
    //             role: "Batman",
    //         },
    //         {
    //             id: 2,
    //             name: "Heath Ledger",
    //             role: "The Joker",
    //         },
    //         ],
    //         rating: 9.2
    //     },
    //     {
    //         id: 2,
    //         title: "Spiderman 2",
    //         category: ["action", "drama"],
    //         director: "Sam Raimi",
    //         casts: [
    //         {
    //             id: 1,
    //             name: "Tobey Maguire",
    //             role: "Spiderman",
    //         },
    //         {
    //             id: 2,
    //             name: "Kirsten Dunst",
    //             role: "Mary Jane Watson",
    //         },
    //         ],
    //         rating: 7.3
    //     },
    //     {
    //         id: 3,
    //         title: "Fight Club",
    //         category: ["crime", "drama", "thriller"],
    //         director: "David Fincher",
    //         casts: [
    //         {
    //             id: 1,
    //             name: "Edward Norton",
    //             role: "Tyler Durden",
    //         },
    //         {
    //             id: 2,
    //             name: "Brad Pitt",
    //             role: "Tyler Durden",
    //         },
    //         ],
    //         rating: 8.1
    //     },
    //     {
    //         id: 4,
    //         title: "La La Land",
    //         category: ["drama", "romance"],
    //         director: "Damien Chazelle",
    //         casts: [
    //         {
    //             id: 1,
    //             name: "Ryan Gosling",
    //             role: "Sebastian",
    //         },
    //         {
    //             id: 2,
    //             name: "Emma Stone",
    //             role: "Mia",
    //         },
    //         ],
    //         rating: 8
    //     },
    // ];
}