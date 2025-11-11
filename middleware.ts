import { NextResponse, type NextRequest } from "next/server"

const PROTECTED_PATHS = ["/quizzes/create", "/host"]
const AUTH_PATHS = ["/login", "/register"]

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl
	const token = req.cookies.get("token")?.value

	if (PROTECTED_PATHS.some(p => pathname.startsWith(p))) {
		if (!token) {
			const url = req.nextUrl.clone()
			url.pathname = "/login"
			return NextResponse.redirect(url)
		}
	}

	if (AUTH_PATHS.some(p => pathname.startsWith(p)) && token) {
		const url = req.nextUrl.clone()
		url.pathname = "/quizzes"
		return NextResponse.redirect(url)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ["/((?!_next|.*\\..*).*)"]
}


