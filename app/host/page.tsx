"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useSessionStore } from "@/stores/session"
import { QuestionCard } from "@/components/cards/QuestionCard"
import { Button } from "@/components/ui/Button"

export default function HostPage() {
	const sp = useSearchParams()
	const quizId = sp.get("quizId")
	const { pin, players, setQuestions, reset, status } = useSessionStore()

	useEffect(() => {
		// mock questions for demo; replace with API fetch
		setQuestions([
			{
				id: "q1",
				text: "What is the capital of France?",
				timeLimitSec: 20,
				choices: [
					{ id: "a", text: "Paris", correct: true },
					{ id: "b", text: "Berlin" },
					{ id: "c", text: "Madrid" },
					{ id: "d", text: "Rome" }
				]
			},
			{
				id: "q2",
				text: "2 + 2 = ?",
				timeLimitSec: 10,
				choices: [
					{ id: "a", text: "3" },
					{ id: "b", text: "4", correct: true },
					{ id: "c", text: "5" },
					{ id: "d", text: "22" }
				]
			}
		])
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="container py-8">
			<div className="mb-6 flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-semibold">Host Session</h1>
					<p className="text-sm text-muted-foreground">Quiz: {quizId ?? "unknown"}</p>
				</div>
				<div className="glass rounded-xl px-4 py-2">
					<span className="text-sm text-muted-foreground">PIN</span>
					<div className="text-2xl font-bold tracking-widest">{pin ?? "------"}</div>
				</div>
			</div>

			{status === "lobby" && (
				<div className="glass rounded-xl p-6">
					<p className="text-muted-foreground">Waiting for players to join...</p>
					<div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
						{players.map(p => (
							<div key={p.id} className="rounded-lg border border-border/60 bg-accent/10 p-3">{p.name}</div>
						))}
					</div>
				</div>
			)}

			{status === "in_progress" && <QuestionCard />}

			{status === "ended" && (
				<div className="glass rounded-xl p-6">
					<h3 className="text-xl font-semibold">Game Ended</h3>
					<Button className="mt-4" onClick={() => reset()}>Reset</Button>
				</div>
			)}
		</div>
	)
}


