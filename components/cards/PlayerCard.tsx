"use client"

import { Player } from "@/stores/session"

export function PlayerCard({ player, rank }: { player: Player; rank: number }) {
	return (
		<div className="glass flex items-center justify-between rounded-xl p-4">
			<div className="flex items-center gap-3">
				<div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-sky-500 text-center text-sm font-semibold text-white">
					{rank}
				</div>
				<div className="font-medium">{player.name}</div>
			</div>
			<div className="text-sm text-muted-foreground">{player.score} pts</div>
		</div>
	)
}


