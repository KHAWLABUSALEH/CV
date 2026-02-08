#!/usr/bin/env node
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import QRCode from 'qrcode'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

async function readConfigUrl() {
	const argUrl = process.argv[2]
	if (argUrl) return argUrl

	const configPath = path.join(projectRoot, 'qr-config.json')
	try {
		const raw = await fs.readFile(configPath, 'utf8')
		const json = JSON.parse(raw)
		if (json && typeof json.url === 'string' && json.url.trim().length > 0) {
			return json.url.trim()
		}
	} catch {
		// ignore, will fallback
	}
	return 'http://localhost:5173'
}

async function ensureDir(dir) {
	await fs.mkdir(dir, { recursive: true })
}

async function main() {
	const url = await readConfigUrl()
	if (!/^https?:\/\//i.test(url)) {
		console.error('Error: URL must start with http:// or https://')
		process.exit(1)
	}

	const publicDir = path.join(projectRoot, 'public')
	await ensureDir(publicDir)
	const outPath = path.join(publicDir, 'qr.png')

	console.log(`Generating QR for: ${url}`)
	await QRCode.toFile(outPath, url, {
		type: 'png',
		scale: 1,
		width: 1024, // high-resolution for printing
		margin: 2,
		color: {
			dark: '#000000',
			light: '#FFFFFFFF',
		},
	})
	console.log(`Saved: ${path.relative(projectRoot, outPath)}`)
}

main().catch((err) => {
	console.error(err)
	process.exit(1)
})

