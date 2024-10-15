module.exports = {
  "extends": [
    "next/core-web-vitals",
    "prettier",
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": [
    "prettier"
  ],
  "rules": {
    "prettier/prettier": [
      "error",
      { endOfLine: "auto",   }
    ],
    "no-unused-vars": "off",
 
  }
}   
// "import/order": [
//       "error",
//       {
//         "groups": [
//           [
//             "builtin",
//             "external"
//           ],
//           [
//             "internal"
//           ],
//           [
//             "parent",
//             "sibling",
//             "index"
//           ]
//         ],
//         "newlines-between": "always-and-inside-groups",
       
//       }
//     ]