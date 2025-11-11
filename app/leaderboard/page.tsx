"use client"

import { useSessionStore } from "@/stores/session"
import { PlayerCard } from "@/components/cards/PlayerCard"

export default function LeaderboardPage() {
	const players = useSessionStore(s => s.players)
	const sorted = [...players].sort((a, b) => b.score - a.score)
	return (
		<div className="container py-10">
			<h1 className="mb-6 text-2xl font-semibold">Leaderboard</h1>
			<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
				{sorted.map((p, idx) => (
					<PlayerCard key={p.id} player={p} rank={idx + 1} />
				))}
			</div>
		</div>
	)
}


