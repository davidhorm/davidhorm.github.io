module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb",
        "airbnb-typescript",
        "plugin:react/jsx-runtime",

        // NOTE: this needs to be last! https://github.com/prettier/eslint-config-prettier#installation
        "prettier",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 13,
        "sourceType": "module",
        "project": './tsconfig.json'

    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
    }
};
