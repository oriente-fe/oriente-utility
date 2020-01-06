class Plugin {
  onHandleDocs(ev) {
    for (const doc of ev.data.docs) {
      if (doc.kind === 'function') {
        doc.importStyle = `{ ${doc.importStyle} }`
      }
      if (doc.importPath) {
        doc.importPath = doc.importPath.split('/').slice(0, 1)[0]
      }
    }
  }
}

module.exports = new Plugin()
