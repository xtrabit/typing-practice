module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "plugins": ['jsx-a11y'],
  "rules": {
    "object-curly-spacing": ["error", "never"],
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "class-methods-use-this": "warn",
    "no-unused-expressions": ["warn", {"allowTernary": true, "allowShortCircuit": true}],
    "no-confusing-arrow": ["error", {"allowParens": true}],
    "jsx-quotes": ["warn", "prefer-single"],
    "jsx-a11y/anchor-is-valid": "off",
    "consistent-return": "warn",
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "arrow-body-style": ["warn", "as-needed"],
    "react/no-did-update-set-state": "warn",
    "react/destructuring-assignment": "warn",
    "no-nested-ternary": "off",
    "arrow-parens": "warn",
    "react/prefer-stateless-function": "warn"
  },
  "globals": {"fetch": false},
  "env": {
    "browser": true,
    "node": true
  }
};
