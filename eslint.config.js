module.exports = [
    {
        // parser: "@babel/eslint-parser",
        languageOptions: {
            globals: { node: true, commonjs: true, es2020: true },
            parserOptions: {
                extends: "standard-with-typescript",
                sourceType: "module",
                // ecmaVersion: 2020,
                ecmaFeatures: {
                    impliedStrict: true,
                },
            },
        },
        files: ["eslint.config.js", "agent/*.ts"],
        // excludedFiles: ["dist/"],
        // env: { node: true, commonjs: true, es2020: true },
        // overrides: [
        //     {
        //         // extends: "standard-with-typescript",
        //         files: [".eslintrc.ts", "agent/*.ts"],
        //         excludedFiles: ["dist/"],

        //     },
        // ],
        rules: {
            quotes: ["error", "double"],
            semi: ["error", "always"],
        },
    },
];
