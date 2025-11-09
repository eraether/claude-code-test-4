const { chromium } = require('playwright');
const path = require('path');

async function captureScreenshots() {
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--single-process'
    ]
  });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  const baseDir = __dirname;
  const screenshotsDir = path.join(baseDir, 'screenshots');

  // Capture landing page
  console.log('Capturing landing page...');
  await page.goto(`file://${path.join(baseDir, 'index.html')}`);
  await page.waitForTimeout(2000); // Wait for animations to start
  await page.screenshot({
    path: path.join(screenshotsDir, 'landing-page.png'),
    fullPage: false
  });

  // Capture Chapter 1
  console.log('Capturing Chapter 1...');
  await page.goto(`file://${path.join(baseDir, 'chapters', 'chapter-01-discovery.html')}`);
  await page.waitForTimeout(3000); // Wait for canvas animation to render
  await page.screenshot({
    path: path.join(screenshotsDir, 'chapter-01.png'),
    fullPage: false
  });

  // Capture Chapter 7
  console.log('Capturing Chapter 7...');
  await page.goto(`file://${path.join(baseDir, 'chapters', 'chapter-07-loop.html')}`);
  await page.waitForTimeout(3000); // Wait for canvas animation to render
  await page.screenshot({
    path: path.join(screenshotsDir, 'chapter-07.png'),
    fullPage: false
  });

  await browser.close();
  console.log('Screenshots captured successfully!');
}

captureScreenshots().catch(console.error);
