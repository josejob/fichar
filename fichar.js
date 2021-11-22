// script para fichar
const { chromium } = require('playwright')
const fs = require('fs')
const fileUserCredentials = './user.json'
const defaultUsername = '11111111A'
const defaultPassword = '1111'
const defaultLongitude = 41.111111
const defaultlatitude = 2.111111
let userName = ''
let userPasword = ''
let userLongitude = ''
let userLatitude = ''

try {
  if (fs.existsSync(fileUserCredentials)) {
    const obj = JSON.parse(fs.readFileSync(fileUserCredentials, 'utf8'))
    userName = obj.username
    userPasword = obj.password
    userLongitude = obj.longitude
    userLatitude = obj.latitude
  } else {
    userName = defaultUsername
    userPasword = defaultPassword
    userLongitude = defaultLongitude
    userLatitude = defaultlatitude
  }
} catch (err) {
  console.log(err)
}

;(async () => {
  const browser = await chromium.launch({ headless: true })

  const context = await browser.newContext({
    geolocation: { longitude: userLongitude, latitude: userLatitude },
    permissions: ['geolocation'],
  })
  const page = await context.newPage()
  await page.goto('https://a3gt.wolterskluwer.es/gt#/clockings/57962')

  await page.type('#username', userName)
  await page.type('#pwd', userPasword)

  await page.click('#sendClocking')
  await page.waitForSelector('div.notice')

  await page.screenshot({ path: './screenshots/' + 'fichar.png' })

  await page.close()
  await browser.close()
})()
