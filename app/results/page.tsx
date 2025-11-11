"use client"

import { useSessionStore } from "@/stores/session"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

export default function ResultsPage() {
	const { players, reset } = useSessionStore()
	const sorted = [...players].sort((a, b) => b.score - a.score)
	const top3 = sorted.slice(0, 3)
	return (
		<div className="container py-10">
			<h1 className="mb-6 text-2xl font-semibold">Results</h1>
			<div className="glass rounded-2xl p-6">
				<div className="grid gap-3 md:grid-cols-3">
					{top3.map((p, i) => (
						<div key={p.id} className="rounded-xl border border-border/60 bg-accent/10 p-4">
							<div className="text-sm text-muted-foreground">#{i + 1}</div>
							<div className="text-lg font-semibold">{p.name}</div>
							<div className="text-sm text-muted-foreground">{p.score} pts</div>
						</div>
					))}
				</div>
				<div className="mt-6 flex gap-3">
					<Button onClick={reset}>Reset</Button>
					<Link href="/leaderboard"><Button variant="secondary">View leaderboard</Button></Link>
				</div>
			</div>
		</div>
	)
}


