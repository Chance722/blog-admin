const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const cheerio = require('cheerio')
const cssPath = path.resolve(__dirname, './src/assets/icons/iconfont.css')
const htmlPath = path.resolve(__dirname, './src/assets/icons/demo_index.html')
const jsonPath = path.resolve(__dirname, './public/iconfont.json')

let cssFile = null
let htmlFile = null
let $ = null
try {
  cssFile = fs.readFileSync(cssPath, 'utf-8')
  htmlFile = fs.readFileSync(htmlPath, 'utf-8')
  $ = cheerio.load(htmlFile, { decodeEntities: false })
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
    const $fontcls = $('.tab-container').find('.content.font-class')
    const nameTxt = $fontcls.find(`.iconfont.${item}`).parents('li').find('.name').html()
    iconMap[item] = nameTxt.replace(/[\r\n]/g,"").trim()
  })

  rimraf(jsonPath, err => {
    if (err) console.log(err)
    fs.writeFileSync(jsonPath, JSON.stringify(iconMap))
  })

}

module.exports.getIconClasses = getIconClasses