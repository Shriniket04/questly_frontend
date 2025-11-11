"use client"

import "./globals.css"
import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ThemeProvider } from "next-themes"
import { Toaster } from "sonner"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 1
		}
	}
})

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="min-h-screen gradient">
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<QueryClientProvider client={queryClient}>
						<div className="flex min-h-screen flex-col">
							<Navbar />
							<main className="flex-1">{children}</main>
							<Footer />
						</div>
						<ReactQueryDevtools initialIsOpen={false} />
						<Toaster position="top-right" richColors closeButton />
					</QueryClientProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}


