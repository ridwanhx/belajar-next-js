import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    // modifikasi Html lang/language
    <Html lang="id">
      <Head>
        {/* inisialisasi meta charset global */}
        <meta charSet='UTF-8' />

        {/* inisialisasi meta global lainnya */}
        <meta name='author' content='Muhamad Ridwan' />

        {/* inisialisasi icon */}
        <link rel="shortcut icon" href="/main-icon.svg" type="image/x-icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
