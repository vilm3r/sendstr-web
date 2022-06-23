module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
    ],
    plugins: ["@typescript-eslint"],
    parserOptions: {
        project: ["./tsconfig.json"]
    },
    rules: {
        "@typescript-eslint/no-explicit-any": 1
    }
  }