// EPS 01: Setup NEXT.js
// _app.tsx adalah sebuah route file yang dimana nantinya untuk setiap halaman yang di render, bisa kita atur di sini
// menjadi titik awal dimana nantinya seluruh url akan mengakses ke file ini terlebih dahulu

// EPS 02: Pages & Layout
// setiap file yang didefinisikan didalam folder pages, akan otomatis dibuatkan route nya oleh next.js
// sehingga dengan begitu, dalam implementasinya tadi kita sudah coba mendefinisikan file about.tsx, dan setelahnya kita bisa langsung akses isinya dengan mengakses ke url localhost:3000/about
// begitupun ketika kita mencoba memindahkan about.tsx kedalam folder about, kemudian mengganti nama file nya menjadi index.tsx, route nya tetap akan mengarahkan kita ke halaman about page yang telah kita definisikan pada file tersebut

import AppShell from '@/components/layouts/AppShell';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppShell>
      <Component {...pageProps} />
    </AppShell>
  );
}
