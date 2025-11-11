"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { toast } from "sonner"
import { api } from "@/lib/axios"
import { useAuthStore } from "@/stores/auth"

export default function RegisterPage() {
	const router = useRouter()
	const setUser = useAuthStore(s => s.setUser)
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		try {
			const res = await api.post("/auth/register", { name, email, password }, { withCredentials: true })
			setUser(res.data.user)
			toast.success("Account created!")
			router.push("/quizzes")
		} catch (err: any) {
			toast.error(err?.response?.data?.message ?? "Registration failed")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="container flex max-w-md flex-col items-center justify-center py-16">
			<div className="glass w-full rounded-2xl p-8">
				<h1 className="mb-2 text-2xl font-semibold">Create account</h1>
				<p className="mb-6 text-sm text-muted-foreground">Join Questly to play and host live quizzes.</p>
				<form onSubmit={onSubmit} className="space-y-4">
					<Input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
					<Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
					<Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? "Creating..." : "Create account"}
					</Button>
				</form>
				<p className="mt-4 text-sm text-muted-foreground">
					Already have an account? <Link className="text-primary underline" href="/login">Sign in</Link>
				</p>
			</div>
		</div>
	)
}
