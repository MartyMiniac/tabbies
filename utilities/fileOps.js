const path = require('path')

const views = path.join(__dirname, '../views')

exports.getHTMLFile = filename => {
    return path.join(views, filename)
} 