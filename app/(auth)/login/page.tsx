"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { toast } from "sonner"
import { api } from "@/lib/axios"
import { useAuthStore } from "@/stores/auth"

export default function LoginPage() {
	const router = useRouter()
	const setUser = useAuthStore(s => s.setUser)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		try {
			const res = await api.post("/auth/login", { email, password }, { withCredentials: true })
			setUser(res.data.user)
			toast.success("Welcome back!")
			router.push("/quizzes")
		} catch (err: any) {
			toast.error(err?.response?.data?.message ?? "Login failed")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="container flex max-w-md flex-col items-center justify-center py-16">
			<div className="glass w-full rounded-2xl p-8">
				<h1 className="mb-2 text-2xl font-semibold">Login</h1>
				<p className="mb-6 text-sm text-muted-foreground">Access your account to host or join games.</p>
				<form onSubmit={onSubmit} className="space-y-4">
					<Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
					<Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? "Signing in..." : "Sign in"}
					</Button>
				</form>
				<p className="mt-4 text-sm text-muted-foreground">
					New here? <Link className="text-primary underline" href="/register">Create an account</Link>
				</p>
			</div>
		</div>
	)
}


