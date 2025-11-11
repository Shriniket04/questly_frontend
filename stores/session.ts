import { create } from "zustand"

export type Player = {
	id: string
	name: string
	score: number
}

export type Question = {
	id: string
	text: string
	choices: { id: string; text: string; correct?: boolean }[]
	timeLimitSec: number
}

type SessionState = {
	pin: string | null
	players: Player[]
	currentQuestionIndex: number
	questions: Question[]
	status: "lobby" | "in_progress" | "ended"
	setPin: (pin: string | null) => void
	addPlayer: (player: Player) => void
	updateScore: (playerId: string, delta: number) => void
	setQuestions: (qs: Question[]) => void
	nextQuestion: () => void
	reset: () => void
}

export const useSessionStore = create<SessionState>((set, get) => ({
	pin: null,
	players: [],
	currentQuestionIndex: 0,
	questions: [],
	status: "lobby",
	setPin: (pin) => set({ pin }),
	addPlayer: (player) => set({ players: [...get().players, player] }),
	updateScore: (playerId, delta) =>
		set({
			players: get().players.map(p => (p.id === playerId ? { ...p, score: p.score + delta } : p))
		}),
	setQuestions: (qs) => set({ questions: qs, currentQuestionIndex: 0, status: "in_progress" }),
	nextQuestion: () => {
		const next = get().currentQuestionIndex + 1
		if (next >= get().questions.length) {
			set({ status: "ended" })
		} else {
			set({ currentQuestionIndex: next })
		}
	},
	reset: () => set({ pin: null, players: [], currentQuestionIndex: 0, questions: [], status: "lobby" })
}))


