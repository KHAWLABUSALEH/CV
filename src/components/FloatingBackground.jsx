import React, { useMemo } from 'react'

// Very lightweight floating elements for a subtle, memorable background.
// Respects prefers-reduced-motion via CSS in styles.css.
export default function FloatingBackground({ count = 14 }) {
	const elements = useMemo(() => {
		const tokens = ['{}', '</>', 'AI', '0101', '[]', '<>', '//', '::', 'λ', '∑', 'fn', '=>']
		const arr = []
		for (let i = 0; i < count; i++) {
			const token = tokens[i % tokens.length]
			const size = 14 + Math.round(Math.random() * 20) // 14–34px
			const top = Math.round(Math.random() * 100)
			const left = Math.round(Math.random() * 100)
			const dur1 = 12 + Math.round(Math.random() * 12) // 12–24s
			const dur2 = 18 + Math.round(Math.random() * 14) // 18–32s
			const rot = (Math.random() * 12 - 6).toFixed(2) // -6 to 6 deg
			const opacity = (0.12 + Math.random() * 0.08).toFixed(2) // 0.12–0.20
			arr.push({ id: i, token, size, top, left, dur1, dur2, rot, opacity })
		}
		return arr
	}, [count])

	return (
		<div className="pointer-events-none absolute inset-0 z-0 select-none" aria-hidden="true">
			{/* Soft gradient wash to ensure readability */}
			<div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-white to-white"></div>

			{elements.map((el) => (
				<span
					key={el.id}
					className="fg-floating absolute text-slate-800"
					style={{
						'--dur1': `${el.dur1}s`,
						'--dur2': `${el.dur2}s`,
						top: `${el.top}%`,
						left: `${el.left}%`,
						fontSize: `${el.size}px`,
						transform: `rotate(${el.rot}deg)`,
						opacity: el.opacity,
					}}
				>
					{el.token}
				</span>
			))}
		</div>
	)
}

