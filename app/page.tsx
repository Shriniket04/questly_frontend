"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

export default function HomePage() {
	return (
		<section className="container py-12 md:py-20">
			<div className="grid items-center gap-8 md:grid-cols-2">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="space-y-6"
				>
					<h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
						<span className="bg-gradient-to-br from-violet-500 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
							Questly
						</span>{" "}
						Live Quizzes, Made Stunning
					</h1>
					<p className="text-muted-foreground text-lg">
						A beautiful, fast, and modern Kahoot-like platform. Host live sessions, join from any device, and
						experience real-time leaderboards.
					</p>
					<div className="flex flex-wrap gap-3">
						<Link href="/quizzes">
							<Button size="lg">Browse Quizzes</Button>
						</Link>
						<Link href="/quizzes/create">
							<Button variant="secondary" size="lg">Create Quiz</Button>
						</Link>
						<Link href="/join">
							<Button variant="ghost" size="lg">Join Game</Button>
						</Link>
						<ThemeToggle />
					</div>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, delay: 0.1 }}
				>
					<div className="glass rounded-2xl p-6 shadow-xl">
						<div className="aspect-[16/10] w-full rounded-xl bg-gradient-to-br from-violet-600/30 via-fuchsia-600/30 to-sky-600/30" />
						<div className="mt-4">
							<p className="text-sm text-muted-foreground">
								Host stunning live sessions with smooth animations, real-time updates, and delightful UX.
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	)
}


