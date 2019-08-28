const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const cssPath = path.resolve(__dirname, './src/assets/icons/iconfont.css')
const jsonPath = path.resolve(__dirname, './public/iconfont.json')

let cssFile = null

try {
  cssFile = fs.readFileSync(cssPath, 'utf-8')
} catch (e) {
  console.log(e)
}

function getIconArray (str, array = []) {
  let iconArray = array.slice()
  const m =  /\.(\w|\-)+:before/g.exec(str)
  if (!m) return iconArray
  iconArray.push(m[0])
  return getIconArray(str.slice(m.index + m[0].length, str.length), iconArray)
}

const getIconClasses = listenPath => {
  console.log(`${listenPath} was changed.`)
  const fileStr = cssFile.replace(/[\r\n]/g,"")
  const iconArray = getIconArray(fileStr).map(item => item.replace('.', '').replace(':before', ''))
  let iconMap = {}
  iconArray.forEach(item => {
    iconMap[item] = item.replace('icon-', '')
  })

  rimraf(jsonPath, err => {
    if (err) console.log(err)
    fs.writeFileSync(jsonPath, JSON.stringify(iconMap))
  })

}

module.exports.getIconClasses = getIconClasses