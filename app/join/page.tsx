"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { useSessionStore } from "@/stores/session"
import { toast } from "sonner"
import { api } from "@/lib/axios"

export default function JoinPage() {
	const [pinInput, setPinInput] = useState("")
	const [name, setName] = useState("")
	const setPin = useSessionStore(s => s.setPin)
	const addPlayer = useSessionStore(s => s.addPlayer)

	const join = async () => {
		if (!pinInput || !name) return
		try {
			// Optimistic local add
			setPin(pinInput)
			addPlayer({ id: crypto.randomUUID(), name, score: 0 })
			await api.post(`/sessions/${pinInput}/join`, { name })
			toast.success("Joined game!")
		} catch {
			toast.error("Failed to join")
		}
	}
	return (
		<div className="container max-w-md py-10">
			<h1 className="mb-6 text-2xl font-semibold">Join Game</h1>
			<div className="glass rounded-2xl p-6">
				<div className="grid gap-3">
					<Input placeholder="Game PIN" value={pinInput} onChange={e => setPinInput(e.target.value)} />
					<Input placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} />
					<Button onClick={join} disabled={!pinInput || !name}>Join</Button>
				</div>
			</div>
		</div>
	)
}


