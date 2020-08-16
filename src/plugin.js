export default function({ types: t }) {
  return {
    visitor: {
      ForStatement(path) {
        if (!t.isVariableDeclaration(path.node.init)) {
          // unsupported syntax: for (; arr.length;) {}
          return
        }

        const declarations = []

        path.get("test").traverse({
          MemberExpression(path) {
            if (t.isIdentifier(path.node.property, { name: "length" })) {
              const id = path.scope.generateUidIdentifier("len")
              declarations.push([id, path.node])
              path.replaceWith(id)
            }
          }
        })

        for (const [id, node] of declarations) {
          path.node.init.declarations.push(
            t.variableDeclarator(id, node)
          )
        }
      }
    }
  }
}
