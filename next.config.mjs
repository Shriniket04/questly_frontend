/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		typedRoutes: true,
		optimizePackageImports: [
			"lucide-react",
			"framer-motion",
			"@tanstack/react-query",
			"zustand"
		]
	},
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "**" }
		]
	}
};

export default nextConfig;

