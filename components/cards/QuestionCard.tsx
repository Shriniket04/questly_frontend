"use client"

import { useSessionStore } from "@/stores/session"
import { Button } from "@/components/ui/Button"

export function QuestionCard() {
	const { questions, currentQuestionIndex, nextQuestion, status } = useSessionStore()
	if (status !== "in_progress") return null
	const q = questions[currentQuestionIndex]
	if (!q) return null
	return (
		<div className="glass rounded-xl p-6">
			<h3 className="text-xl font-semibold">{q.text}</h3>
			<div className="mt-4 grid gap-3 sm:grid-cols-2">
				{q.choices.map((c) => (
					<div key={c.id} className="rounded-lg border border-border/60 bg-accent/10 p-3">
						{c.text}
					</div>
				))}
			</div>
			<div className="mt-6">
				<Button onClick={nextQuestion}>Next</Button>
			</div>
		</div>
	)
}


