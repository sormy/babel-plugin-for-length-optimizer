import babel from "@rollup/plugin-babel";

export default {
  input: "src/plugin.js",
  plugins: [
    babel({
      babelHelpers: "bundled"
    })
  ],
  output: {
    file: "dist/plugin.js",
    format: "cjs",
    exports: "auto"
  }
}
