"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Modal({
	open,
	onOpenChange,
	title,
	description,
	children,
	className
}: {
	open: boolean
	onOpenChange: (v: boolean) => void
	title?: string
	description?: string
	children: React.ReactNode
	className?: string
}) {
	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out" />
				<Dialog.Content
					className={cn(
						"glass fixed left-1/2 top-1/2 w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl p-6 shadow-xl",
						"className"
					)}
				>
					<div className="flex items-center justify-between">
						<div>
							{title && <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>}
							{description && <Dialog.Description className="text-muted-foreground text-sm">{description}</Dialog.Description>}
						</div>
						<Dialog.Close className="rounded-md p-1 hover:bg-accent/20">
							<X className="h-5 w-5" />
						</Dialog.Close>
					</div>
					<div className="mt-4">{children}</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}


