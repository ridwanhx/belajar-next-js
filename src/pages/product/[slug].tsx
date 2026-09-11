// implementasi dynamic routing
// import useRouter (untuk menangkap setiap parameter yang didefinisikan didalam url, kemudian mendefinisikannya kembali dalam bentuk object (bisa dilihat melalui console.log))
import { useRouter } from "next/router";

export default function ProductDetailPage() {
  const { query } = useRouter();
  console.info(query.slug);
  return (
    <>
      <h1>Detail Product</h1>
      <p>Product: {query.slug}</p>
    </>
  );
}
