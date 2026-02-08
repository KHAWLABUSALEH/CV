import React, { useMemo } from 'react'

// Very lightweight floating elements for a subtle, memorable background.
// Respects prefers-reduced-motion via CSS in styles.css.
export default function FloatingBackground({ count = 14 }) {
	const elements = useMemo(() => {
		const tokens = ['{}', '</>', 'AI', '0101', '[]', '<>', '//', '::', 'λ', '∑', 'fn', '=>']
		const arr = []
		for (let i = 0; i < count; i++) {
			const token = tokens[i % tokens.length]
			const size = 10 + Math.round(Math.random() * 18) // 10–28px
			const top = Math.round(Math.random() * 100)
			const left = Math.round(Math.random() * 100)
			const dur1 = 12 + Math.round(Math.random() * 12) // 12–24s
			const dur2 = 18 + Math.round(Math.random() * 14) // 18–32s
			const rot = (Math.random() * 12 - 6).toFixed(2) // -6 to 6 deg
			arr.push({ id: i, token, size, top, left, dur1, dur2, rot })
		}
		return arr
	}, [count])

	return (
		<div
			className="pointer-events-none fixed inset-0 -z-10 select-none [mask-image:radial-gradient(55%_55%_at_50%_40%,black,transparent)]"
			aria-hidden="true"
		>
			{/* Soft gradient wash */}
			<div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white"></div>

			{elements.map((el) => (
				<span
					key={el.id}
					className="fg-floating absolute text-slate-900/10"
					style={{
						'--dur1': `${el.dur1}s`,
						'--dur2': `${el.dur2}s`,
						top: `${el.top}%`,
						left: `${el.left}%`,
						fontSize: `${el.size}px`,
						transform: `rotate(${el.rot}deg)`,
					}}
				>
					{el.token}
				</span>
			))}
		</div>
	)
}

