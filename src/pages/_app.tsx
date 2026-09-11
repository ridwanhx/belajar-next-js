// _app.tsx adalah sebuah route file yang dimana nantinya untuk setiap halaman yang di render, bisa kita atur di sini
// menjadi titik awal dimana nantinya seluruh url akan mengakses ke file ini terlebih dahulu

// import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
