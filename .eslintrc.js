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

        // NOTE: this must be after airbnb
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
        // Turning off because I don't use PropTypes
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-default-props.md
        "react/require-default-props": 0,

        // Prefer arrow functions
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
        "react/function-component-definition": [2, { "namedComponents": "arrow-function" }],

        // Prefer to export named components from an index file
        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/prefer-default-export.md
        "import/prefer-default-export": 0,
    }
};
