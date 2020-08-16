const babel = require("@babel/core")

const config = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { node: "current" },
        modules: false
      }
    ]
  ],
  plugins: [require.resolve("./plugin")],
  ast: true
}

test("primitive", () => {
  const inputCode = `
    for (var i = 0; i < arr.length; i++) {}
  `

  const output = babel.transformSync(inputCode, config)

  expect(output.code).toMatchInlineSnapshot(
    `"for (var i = 0, _len = arr.length; i < _len; i++) {}"`
  )
})

test("chained member", () => {
  const inputCode = `
    for (var i = 0; i < p.arr.length; i++) {}
  `

  const output = babel.transformSync(inputCode, config)

  expect(output.code).toMatchInlineSnapshot(
    `"for (var i = 0, _len = p.arr.length; i < _len; i++) {}"`
  )
})

test("deopt on missing init", () => {
  const inputCode = `
    for (; i < arr.length; i++) {}
  `

  const output = babel.transformSync(inputCode, config)

  expect(output.code).toMatchInlineSnapshot(
    `"for (; i < arr.length; i++) {}"`
  )
})

test("uses only length", () => {
  const inputCode = `
    for (var i = 0; i < arr.count(); i++) {}
  `

  const output = babel.transformSync(inputCode, config)

  expect(output.code).toMatchInlineSnapshot(
    `"for (var i = 0; i < arr.count(); i++) {}"`
  )
})

test("nested", () => {
  const inputCode = `
    for (var i = 0; i < arr1.length; i++) {
      for (var j = 0; j < arr2.length; j++) {
      }
    }
  `

  const output = babel.transformSync(inputCode, config)

  expect(output.code).toMatchInlineSnapshot(`
    "for (var i = 0, _len = arr1.length; i < _len; i++) {
      for (var j = 0, _len2 = arr2.length; j < _len2; j++) {}
    }"
  `)
})
