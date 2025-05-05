import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		rules: {
			// TypeScript
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unsafe-function-type": "off",
			"@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
			// React
			"react/display-name": "off",
			// Import
			"import/order": [
				"error",
				{
					groups: ["builtin", "external", "internal", ["parent", "sibling", "index"]],
					pathGroups: [
						{
							pattern: "react",
							group: "builtin",
							position: "before",
						},
						{
							pattern: "next*",
							group: "builtin",
							position: "before",
						},
					],
					pathGroupsExcludedImportTypes: ["react"],
					alphabetize: {
						order: "asc",
						caseInsensitive: true,
					},
					"newlines-between": "always",
				},
			],
		},
	},
	eslintConfigPrettier,
];

export default eslintConfig;
