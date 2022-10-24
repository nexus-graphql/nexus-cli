module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "always",
      },
    ],
  },
};
