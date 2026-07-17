const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Desktop Screenshot
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:3000');
  await page.screenshot({ path: 'public/screenshot-desktop.png', fullPage: true });

  // Mobile Screenshot
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000');
  await page.screenshot({ path: 'public/screenshot-mobile.png', fullPage: true });

  // Admin Desktop Screenshot
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:3000/admin');
  await page.screenshot({ path: 'public/screenshot-admin.png', fullPage: true });

  await browser.close();
  console.log('Screenshots taken successfully.');
})();
