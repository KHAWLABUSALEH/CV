import React, { useMemo, useState } from 'react'

function Button({ href, children, variant = 'primary', newTab = true, ...props }) {
	const base =
		'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
	const variants = {
		primary: 'bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-slate-900',
		secondary: 'bg-white text-slate-900 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus-visible:ring-slate-400',
		ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400',
	}
	const className = `${base} ${variants[variant] || variants.primary}`

	if (href) {
		return (
			<a
				className={className}
				href={href}
				target={newTab ? '_blank' : undefined}
				rel={newTab ? 'noopener noreferrer' : undefined}
				{...props}
			>
				{children}
			</a>
		)
	}
	return (
		<button className={className} type="button" {...props}>
			{children}
		</button>
	)
}

export default function App() {
	const [copied, setCopied] = useState(false)

	// You can replace this later with your deployed URL.
	const deployedUrl = useMemo(() => {
		// Prefer current origin when running on dev/preview, else fallback to localhost default.
		try {
			return window.location.origin
		} catch {
			return 'http://localhost:5173'
		}
	}, [])

	async function copyLink() {
		const url = deployedUrl
		try {
			if (navigator.clipboard && window.isSecureContext) {
				await navigator.clipboard.writeText(url)
			} else {
				// Fallback: prompt-based copy for non-HTTPS contexts
				window.prompt('Copy this URL', url)
			}
			setCopied(true)
			setTimeout(() => setCopied(false), 1500)
		} catch {
			window.prompt('Copy this URL', url)
		}
	}

	return (
		<main className="min-h-dvh px-4 py-10 sm:py-16">
			<div className="mx-auto w-full max-w-2xl">
				<header className="text-center">
					<h1 className="text-3xl sm:text-5xl font-bold tracking-tight">Khawla Abu Saleh</h1>
					<p className="mt-2 text-base sm:text-lg text-slate-600">Software Engineer | Full-Stack &amp; AI</p>
				</header>

				<p className="mt-6 text-base leading-7 text-slate-700 text-center">
					Built production-ready microservices and AI-driven assessment workflows. Strong in JavaScript/Node.js,
					PostgreSQL, MongoDB, and clean architecture. Passionate about impact-driven products.
				</p>

				<div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
					<Button href="/cv.pdf" aria-label="Download CV as PDF" variant="primary" newTab={false}>
						Download CV
					</Button>
					<Button href="https://www.linkedin.com/in/khawla-abusaleh-3b1389206/" aria-label="Open LinkedIn profile" variant="secondary">
						LinkedIn
					</Button>
					<Button href="https://github.com/KHAWLABUSALEH" aria-label="Open GitHub profile" variant="secondary">
						GitHub
					</Button>
					<Button href="mailto:khawlaabusaleh1@gmail.com" aria-label="Send me an email" variant="secondary" newTab={false}>
						Email
					</Button>
				</div>

				<div className="mt-10 rounded-xl border border-slate-200 p-5 sm:p-6">
					<div className="flex flex-col items-center gap-4">
						<img
							src="/qr.png"
							alt="QR code linking to this page"
							className="h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 rounded-md border border-slate-200 object-contain bg-white"
							decoding="async"
							loading="lazy"
						/>
						<p className="text-sm text-slate-500">Scan to save my CV &amp; links.</p>
						<div className="flex items-center gap-3">
							<Button onClick={copyLink} variant="ghost" aria-live="polite" aria-label="Copy deployed URL to clipboard">
								{copied ? 'Copied!' : 'Copy link'}
							</Button>
							<a
								href="/qr.png"
								download="qr.png"
								className="text-sm text-slate-600 underline underline-offset-4 hover:text-slate-900"
								aria-label="Download QR image"
							>
								Download QR
							</a>
						</div>
					</div>
				</div>

				<footer className="mt-10 text-center text-xs text-slate-500">
					<span>Built with React + Tailwind.</span>
				</footer>
			</div>
		</main>
	)
}

