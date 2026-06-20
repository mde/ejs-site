// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import starlight from '@astrojs/starlight';
import { ejsLang } from './src/ejs-lang.mjs';
import jsGrammars from '@shikijs/langs/javascript';
import htmlGrammars from '@shikijs/langs/html';

// The custom EJS grammar embeds the JavaScript and HTML grammars, so they must
// be registered with Shiki too. Each Shiki lang module default-exports the
// language plus its own embedded dependencies, so we flatten and de-duplicate
// by scope name to avoid registering the same grammar twice.
const toArray = (m) => (Array.isArray(m) ? m : [m]);
const seen = new Set();
const shikiLangs = [...toArray(jsGrammars), ...toArray(htmlGrammars), ejsLang].filter(
	(grammar) => {
		const key = grammar.scopeName ?? grammar.name;
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	},
);

// EJS documentation — built with Starlight, served at /docs/ alongside the
// static landing page. Output goes to ../docs so Firebase (public: ".")
// serves it as plain static files.
// https://astro.build/config
export default defineConfig({
	devToolbar: { enabled: false },
	site: 'https://ejs.co',
	base: '/docs/',
	outDir: '../docs',
	trailingSlash: 'always',
	// No docs landing page — send /docs/ straight to Getting Started.
	redirects: {
		'/': '/docs/getting-started/',
	},
	// All site imagery is SVG — skip sharp optimization and serve as-is.
	image: { service: passthroughImageService() },
	integrations: [
		starlight({
			title: 'EJS Docs',
			description:
				'Documentation for EJS — a simple templating language that lets you generate HTML markup with plain JavaScript.',
			// No clickable anchor links beside headings.
			markdown: { headingLinks: false },
			pagefind: false,
			logo: {
				src: './src/assets/ejs-logo.svg',
				replacesTitle: false,
			},
			components: {
				Header: './src/components/Header.astro',
				// Search is disabled (pagefind: false above), so no search UI is
				// rendered in the sidebar or nav.
				Sidebar: './src/components/Sidebar.astro',
				// Share the landing page's `theme` localStorage key and a matching
				// sun/moon toggle so light/dark stays in sync across / and /docs/.
				ThemeProvider: './src/components/ThemeProvider.astro',
				ThemeSelect: './src/components/ThemeSelect.astro',
			},
			favicon: '/favicon.svg',
			customCss: ['./src/styles/theme.css'],
			head: [
				{
					tag: 'link',
					attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				},
				{
					tag: 'link',
					attrs: {
						rel: 'preconnect',
						href: 'https://fonts.gstatic.com',
						crossorigin: true,
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Inter:wght@400;500;600&family=Montserrat:wght@400;500;600;700&display=swap',
					},
				},
			],
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/mde/ejs',
				},
			],
			editLink: {
				baseUrl: 'https://github.com/mde/ejs-site/edit/main/docs-src/',
			},
			expressiveCode: {
				// Code surfaces stay dark in both themes, matching the landing page.
				themes: ['github-dark'],
				shiki: {
					langs: shikiLangs,
				},
				styleOverrides: {
					// EC adds the 1px border width to this for the outer corner, so 4px
					// here yields a 5px visible radius — matching the landing code windows.
					borderRadius: '4px',
					borderColor: '#272727',
					codeBackground: '#1c1c1c',
					frames: {
						editorActiveTabBackground: '#1c1c1c',
						editorTabBarBackground: '#161616',
						terminalBackground: '#1c1c1c',
						terminalTitlebarBackground: '#161616',
						// No macOS "traffic-light" window buttons on terminal frames.
						terminalTitlebarDotsOpacity: '0',
					},
				},
			},
			sidebar: [
				{
					label: 'Start Here',
					items: [{ label: 'Getting Started', slug: 'getting-started' }],
				},
				{
					label: 'Guide',
					items: [
						{ label: 'Tags', slug: 'guide/tags' },
						{ label: 'Includes', slug: 'guide/includes' },
						{ label: 'Custom Delimiters', slug: 'guide/custom-delimiters' },
						{ label: 'Layouts', slug: 'guide/layouts' },
						{ label: 'Caching', slug: 'guide/caching' },
						{ label: 'Client-Side Support', slug: 'guide/client-side' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Options', slug: 'reference/options' },
						{ label: 'CLI Usage', slug: 'reference/cli' },
					],
				},
			],
		}),
	],
});
