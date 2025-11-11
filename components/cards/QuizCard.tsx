"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"

export function QuizCard({
	title,
	description,
	onStart
}: {
	title: string
	description: string
	onStart?: () => void
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className="glass rounded-xl p-5"
		>
			<h3 className="text-lg font-semibold">{title}</h3>
			<p className="text-muted-foreground mt-1 text-sm">{description}</p>
			<div className="mt-4">
				<Button onClick={onStart}>Host</Button>
			</div>
		</motion.div>
	)
}


