import { getSession } from "@/actions/session";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
	const session = await getSession();

	if (!session || !session.user) {
		if (req.nextUrl.pathname.startsWith("/dashboard")) {
			return NextResponse.redirect(new URL("/auth/signin", req.url));
		}
	} else if (req.nextUrl.pathname.startsWith("/auth")) {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	NextResponse.next();
}
