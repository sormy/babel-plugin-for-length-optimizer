const babel = require("@babel/core")

const config = {
  plugins: [require.resolve("./plugin")]
}

it("works", () => {
  const inputCode = `
    // for (var i = 0; i < arr.length, i++) {}
    foo === bar;
  `

  const output = babel.transformSync(inputCode, config)

  expect(output.code).toMatchInlineSnapshot(`
    "\\"use strict\\";

    // for (var i = 0; i < arr.length, i++) {}
    sebmck === dork;"
  `)
})
