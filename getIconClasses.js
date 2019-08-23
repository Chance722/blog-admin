const fs = require('fs')
const path = require('path')
// const cheerio = require('cheerio')
const cssPath = path.resolve(__dirname, './src/assets/icons/iconfont.css')
const htmlPath = path.resolve(__dirname, './src/assets/icons/demo_index.html')

let file = null
let $ = null
try {
  file = fs.readFileSync(cssPath, 'utf-8')
  // $ = cheerio.load(htmlPath, 'utf-8')
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

const getIconClasses = path => {
  console.log(`${path} was changed.`)
  const fileStr = file.replace(/[\r\n]/g,"")
  const iconArray = getIconArray(fileStr).map(item => item.replace('.', '').replace(':before', ''))
  let nameArray = []
  // iconArray.forEach(item => {
  //   const $fontcls = $.find('.content.font-class')
  //   const nameTxt = $fontcls.find(`.icon-font.${item}`).find('.name').html()
  //   nameArray.push(nameTxt)
  // })


  console.log(iconArray)
  console.log(nameArray)
}


module.exports.getIconClasses = getIconClasses