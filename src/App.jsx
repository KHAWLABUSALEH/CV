import React, { useMemo, useState } from 'react'
import FloatingBackground from './components/FloatingBackground.jsx'

function Button({ href, children, variant = 'primary', newTab = true, ...props }) {
	const base =
		'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors transition-transform will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:-translate-y-0.5'
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

	function Portrait() {
		const [failed, setFailed] = useState(false)
		function onError() {
			setFailed(true)
		}
		return (
			<div className="animate-fade-up-delayed relative mx-auto aspect-square w-40 sm:w-48 md:w-64 rounded-2xl bg-white ring-1 ring-slate-200 shadow-lg shadow-slate-200/50">
				<div className="absolute -inset-0.5 rounded-[1.1rem] bg-gradient-to-b from-slate-100/60 to-transparent blur-md" aria-hidden="true"></div>
				<div className="relative h-full w-full overflow-hidden rounded-2xl">
					{failed ? (
						<div className="flex h-full w-full items-center justify-center bg-slate-50">
							<span className="text-3xl font-semibold text-slate-400">KA</span>
						</div>
					) : (
						<img
							src="/me.jpeg"
							alt="Portrait of Khawla Abu Saleh"
							className="h-full w-full object-cover"
							decoding="async"
							loading="lazy"
							onError={onError}
						/>
					)}
				</div>
			</div>
		)
	}

	return (
		<main className="relative min-h-dvh px-4 py-10 sm:py-16">
			{/* Background layer */}
			<div className="absolute inset-0 z-0">
				<FloatingBackground />
			</div>

			{/* Content layer */}
			<div className="relative z-10 mx-auto w-full max-w-5xl">
				<div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
					<section className="animate-fade-up order-2 md:order-1">
						<header className="">
							<h1 className="text-3xl sm:text-5xl font-bold tracking-tight">Khawla Abu Saleh</h1>
							<p className="mt-2 text-base sm:text-lg text-slate-600">Software Engineer | Full-Stack &amp; AI</p>
						</header>

						<p className="mt-6 text-base leading-7 text-slate-700">
							Built production-ready microservices and AI-driven assessment workflows. Strong in JavaScript/Node.js,
							PostgreSQL, MongoDB, and clean architecture. Passionate about impact-driven products.
						</p>

						<ul className="mt-5 flex flex-wrap gap-2">
							<li className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200">
								Microservices
							</li>
							<li className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200">
								AI-driven assessments
							</li>
							<li className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200">
								Node.js • PostgreSQL • MongoDB
							</li>
						</ul>

						<div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
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

						<div className="mt-5 flex items-center gap-4">
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
					</section>

					<aside className="order-1 md:order-2 md:justify-self-end">
						<Portrait />
					</aside>
				</div>

				<footer className="mt-12 text-center text-xs text-slate-500">
					<span>Built with React + Tailwind.</span>
				</footer>
			</div>
		</main>
	)
}

