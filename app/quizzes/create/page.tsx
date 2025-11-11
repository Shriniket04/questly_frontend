"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { api } from "@/lib/axios"
import { toast } from "sonner"

export default function CreateQuizPage() {
	const qc = useQueryClient()
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const mutation = useMutation({
		mutationFn: async (payload: { title: string; description: string }) => {
			const res = await api.post("/quizzes", payload, { withCredentials: true })
			return res.data
		},
		onMutate: async (newQuiz) => {
			await qc.cancelQueries({ queryKey: ["quizzes"] })
			const previous = qc.getQueryData<any[]>(["quizzes"]) || []
			qc.setQueryData(["quizzes"], [{ id: `temp-${Date.now()}`, ...newQuiz }, ...previous])
			return { previous }
		},
		onError: (_err, _vars, ctx) => {
			qc.setQueryData(["quizzes"], ctx?.previous)
			toast.error("Failed to create quiz")
		},
		onSuccess: () => {
			toast.success("Quiz created")
		},
		onSettled: () => {
			qc.invalidateQueries({ queryKey: ["quizzes"] })
			setTitle("")
			setDescription("")
		}
	})

	return (
		<div className="container max-w-2xl py-10">
			<h1 className="mb-6 text-2xl font-semibold">Create Quiz</h1>
			<div className="glass rounded-2xl p-6">
				<div className="grid gap-3">
					<Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
					<Input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
					<Button onClick={() => mutation.mutate({ title, description })} disabled={!title || mutation.isPending}>
						{mutation.isPending ? "Creating..." : "Create"}
					</Button>
				</div>
			</div>
		</div>
	)
}


