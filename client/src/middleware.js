import { NextResponse } from "next/server";

const url = `${process.env.NEXT_PUBLIC_API_URL}/user/renew-session`;

export async function middleware(req) {
   const { pathname, origin } = req.nextUrl;

   const token = req.cookies.get("token")?.value || "";

   let isValidToken = false;

   try {
      const res = await fetch(url, {
         method: "GET",
         headers: { "x-token": token },
      });

      isValidToken = res.ok;
   } catch (error) {
      isValidToken = false;
   }

   if (isValidToken && pathname === "/") {
      return NextResponse.redirect(`${origin}/app`);
   }

   if (isValidToken && pathname.includes("auth")) {
      return NextResponse.redirect(`${origin}/app`);
   }

   if (!isValidToken && pathname.includes("/app")) {
      console.log("hola");
      return NextResponse.redirect(origin);
   }

   if (pathname === "/app") {
      const mainPage = req.cookies.get("currentMainPage")?.value || "quick-notes";

      return NextResponse.redirect(`${origin}/app/${mainPage}`);
   }
}


