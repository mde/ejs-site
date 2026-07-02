// Custom Shiki theme mirroring the landing page's hand-coded syntax classes:
//   .t-cm   comments          #78dce8
//   .t-kw   keywords          #ab9df2
//   .t-str  strings           #a9dc76
//   .t-html HTML tags         #939293
//   .t-var  functions/vars    #ff6188
//   .t-tag  EJS delimiters    #e05285
export const ejsSyntaxTheme = {
	name: 'ejs-syntax',
	type: 'dark',
	colors: {
		'editor.background': '#1c1c1c',
		'editor.foreground': '#e1e4e8',
	},
	tokenColors: [
		{
			scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
			settings: { foreground: '#78dce8' },
		},
		{
			scope: [
				'keyword',
				'keyword.control',
				'keyword.operator',
				'storage',
				'storage.type',
				'storage.modifier',
			],
			settings: { foreground: '#ab9df2' },
		},
		{
			scope: ['storage.modifier.package', 'storage.modifier.import', 'storage.type.java'],
			settings: { foreground: '#e1e4e8' },
		},
		{
			scope: [
				'string',
				'punctuation.definition.string',
				'string punctuation.section.embedded source',
			],
			settings: { foreground: '#a9dc76' },
		},
		{
			scope: ['entity.name.tag', 'meta.tag punctuation.definition.tag'],
			settings: { foreground: '#939293' },
		},
		{
			scope: [
				'entity',
				'entity.name',
				'entity.name.function',
				'entity.name.class',
				'entity.other.attribute-name',
				'support.function',
				'support.class',
				'support.constant',
				'support.variable',
				'meta.property-name',
				'constant',
				'constant.language',
				'constant.numeric',
				'constant.other',
				'variable.other.constant',
				'variable.other.enummember',
				'variable.language',
			],
			settings: { foreground: '#ff6188' },
		},
		{
			scope: ['variable', 'variable.other', 'variable.parameter'],
			settings: { foreground: '#e1e4e8' },
		},
		{
			scope: [
				'punctuation.section.embedded.begin.ejs',
				'punctuation.section.embedded.end.ejs',
				'punctuation.definition.template-expression.begin',
				'punctuation.definition.template-expression.end',
			],
			settings: { foreground: '#e05285' },
		},
	],
};
