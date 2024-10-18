import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = "http://pimenov.kz:8999/auth_api/v1/auth_user/auth/google"+request.nextUrl.search;
  const b = await(await fetch(url)).json();

  return Response.redirect(
    "http:localhost:3000/auth?accessTokenData="+b.access.token+
    "&refreshTokenData="+b.refresh.token);
}
