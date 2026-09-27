import { NextResponse, NextRequest } from "next/server";
import withAuth from "./middlewares/withAuth";

// setiap logic didefinisikan di masing-masing middleware (dalam kasus ini, logic withAuth didefinisikan di file middlewares/withAuth.ts)
// sehingga, untuk kasus ini, file middleware.ts ini sifatnya hanya akan mempersilahkan untuk setiap pathname yang tidak masuk list requireAuth / pathname yang di definisikan di bawah
// jadi, middleware ini tugasnya jadi filter terakhir, jika sudah di approve oleh logic dari withAuth, maka middleware ini akan mempersilahkan pengakses untuk melanjutkan ke pathname yang dituju
export function mainMiddleware(req: NextRequest) {
    const res = NextResponse.next();
    return res;
}

export default withAuth(mainMiddleware, ["/movie", "/about", "/product"]);