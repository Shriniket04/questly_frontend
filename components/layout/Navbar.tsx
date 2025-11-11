"use client"

import Link from "next/link"
import { useAuthStore } from "@/stores/auth"
import { Button } from "@/components/ui/Button"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { useRouter } from "next/navigation"
import { api } from "@/lib/axios"
import { toast } from "sonner"

export function Navbar() {
	const user = useAuthStore(s => s.user)
	const logoutLocal = useAuthStore(s => s.logout)
	const router = useRouter()

	const logout = async () => {
		try {
			await api.post("/auth/logout", {}, { withCredentials: true })
		} catch {
			// ignore network error, clear local anyway
		}
		logoutLocal()
		toast.success("Logged out")
		router.push("/")
	}

	return (
		<header className="sticky top-0 z-30 w-full border-b border-border/60 bg-background/60 backdrop-blur-xl">
			<div className="container flex h-14 items-center justify-between">
				<div className="flex items-center gap-6">
					<Link href="/" className="font-semibold">
						<span className="bg-gradient-to-br from-violet-500 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
							Questly
						</span>
					</Link>
					<nav className="hidden items-center gap-4 text-sm md:flex">
						<Link href="/quizzes" className="text-muted-foreground hover:text-foreground">Quizzes</Link>
						<Link href="/quizzes/create" className="text-muted-foreground hover:text-foreground">Create</Link>
						<Link href="/join" className="text-muted-foreground hover:text-foreground">Join</Link>
					</nav>
				</div>
				<div className="flex items-center gap-2">
					<ThemeToggle />
					{user ? (
						<>
							<span className="hidden text-sm text-muted-foreground md:block">Hi, {user.name}</span>
							<Button variant="outline" onClick={logout}>Logout</Button>
						</>
					) : (
						<>
							<Link href="/login"><Button variant="outline">Login</Button></Link>
							<Link href="/register"><Button>Sign up</Button></Link>
						</>
					)}
				</div>
			</div>
		</header>
	)
}


