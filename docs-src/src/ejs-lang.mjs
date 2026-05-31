// Minimal TextMate grammar for EJS so code blocks highlight the JavaScript
// inside <% %> tags and scope the delimiters as embedded punctuation (which
// github-dark renders in red/coral, matching the landing page's crimson tags).
export const ejsLang = {
	name: 'ejs',
	scopeName: 'text.html.ejs',
	// Pull in the HTML and JS grammars Shiki bundles so the embedded scopes resolve.
	embeddedLangs: ['html', 'javascript'],
	patterns: [{ include: '#ejs-tags' }, { include: 'text.html.basic' }],
	repository: {
		'ejs-tags': {
			patterns: [
				{
					// <%# ... %> comments
					name: 'comment.block.ejs',
					begin: '<%#',
					end: '%>',
				},
				{
					// <% %>, <%= %>, <%- %>, <%_ %>, with optional -%> / _%> closers
					name: 'meta.embedded.block.javascript',
					begin: '<%[=\\-_]?',
					beginCaptures: {
						0: { name: 'punctuation.section.embedded.begin.ejs' },
					},
					end: '[-_]?%>',
					endCaptures: {
						0: { name: 'punctuation.section.embedded.end.ejs' },
					},
					patterns: [{ include: 'source.js' }],
				},
			],
		},
	},
};
