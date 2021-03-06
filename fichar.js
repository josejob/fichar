// script para fichar test husky
const { chromium } = require('playwright')
const fs = require('fs')
const fileUserCredentials = './user.json'
const userData = { username: '11111111A', password: '1111', longitude: 41.111111, latitude: 2.111111 }
let activeTraceLog = false

try {
  if (fs.existsSync(fileUserCredentials)) {
    const obj = JSON.parse(fs.readFileSync(fileUserCredentials, 'utf8'))
    userData.username = obj.username
    userData.password = obj.password
    userData.latitude = obj.latitude
    userData.longitude = obj.longitude
    activeTraceLog = obj.tracelog
  }
} catch (err) {
  console.log(err)
}

(async () => {
  const browser = await chromium.launch({ headless: false })

  const context = await browser.newContext({
    geolocation: { longitude: userData.longitude, latitude: userData.latitude },
    permissions: ['geolocation'],
    viewport: {
      width: 1920,
      height: 937
    }
  })
  if (activeTraceLog) await context.tracing.start({ screenshots: true, snapshots: true })
  const page = await context.newPage()

  await page.goto('https://a3gt.wolterskluwer.es/gt#/clockings/57962')

  await page.type('#username', userData.username)
  await page.type('#pwd', userData.password)

  await page.click('#sendClocking')
  await page.waitForSelector('div.notice')

  await page.screenshot({ path: './screenshots/' + 'fichar' + '.png' })
  if (activeTraceLog) await context.tracing.stop({ path: './tracelog/trace.zip' })

  await page.close()
  await browser.close()
})()
