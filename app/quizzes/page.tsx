"use client"

import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import { QuizCard } from "@/components/cards/QuizCard"
import { Skeleton } from "@/components/ui/Skeleton"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useSessionStore } from "@/stores/session"

type Quiz = { id: string; title: string; description: string }

export default function QuizzesPage() {
	const router = useRouter()
	const setPin = useSessionStore(s => s.setPin)

	const { data, isLoading, isError } = useQuery({
		queryKey: ["quizzes"],
		queryFn: async () => {
			const res = await api.get<Quiz[]>("/quizzes")
			return res.data
		}
	})

	const hostQuiz = async (quizId: string) => {
		try {
			// optimistic UX: fake pin then route
			setPin("123456")
			router.push(`/host?quizId=${quizId}`)
			await api.post(`/quizzes/${quizId}/host`)
		} catch {
			toast.error("Failed to start host session")
		}
	}

	return (
		<div className="container py-10">
			<h1 className="mb-6 text-2xl font-semibold">Browse Quizzes</h1>
			{isLoading && (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 6 }).map((_, i) => (
						<Skeleton key={i} className="h-32 rounded-xl" />
					))}
				</div>
			)}
			{isError && <p className="text-sm text-destructive">Failed to load quizzes.</p>}
			{data && (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{data.map((q) => (
						<QuizCard key={q.id} title={q.title} description={q.description} onStart={() => hostQuiz(q.id)} />
					))}
				</div>
			)}
		</div>
	)
}


