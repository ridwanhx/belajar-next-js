// Next.js bukan hanya bisa digunakan sebagai frontend, namun Next.js ini sifatnya adalah fullstack
// artinya kita juga bisa membuat backend didalam kerangka kerja Next.js
// seperti hal-nya yang coba disampaikan pada contoh berikut, dimana kita pada folder ini bisa mendefinisikan API

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// inisialisasi tipe data
type Data = {
  // berisi nama properti dan tipe data nya
  name: string,
  age: number,
  hobbies: object
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // inisialisasi response yang akan mengembalikan status code 200 dengan data json seperti yang terlihat di bawah
  res.status(200).json({
    name: 'Muhamad Ridwan',
    age: 23,
    hobbies: {
      productive: "coding",
      chill: "gaming"
    }
  })
}
