export function Footer() {
	return (
		<footer className="border-t border-border/60">
			<div className="container flex h-16 items-center justify-between text-sm text-muted-foreground">
				<p>© {new Date().getFullYear()} Questly. All rights reserved.</p>
				<p className="hidden md:block">Built with Next.js, Tailwind, and shadcn-style UI.</p>
			</div>
		</footer>
	)
}


