const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.cetrogar.com.ar/login');
  
  // Listar todos los inputs
  const inputs = page.locator('input');
  const count = await inputs.count();
  console.log(`Total inputs found: ${count}`);
  
  for (let i = 0; i < count; i++) {
    const input = inputs.nth(i);
    const placeholder = await input.getAttribute('placeholder');
    const type = await input.getAttribute('type');
    const name = await input.getAttribute('name');
    const id = await input.getAttribute('id');
    console.log(`Input ${i}: placeholder="${placeholder}" type="${type}" name="${name}" id="${id}"`);
  }
  
  // Listar todos los botones
  const buttons = page.locator('button');
  const btnCount = await buttons.count();
  console.log(`\nTotal buttons found: ${btnCount}`);
  
  for (let i = 0; i < btnCount; i++) {
    const button = buttons.nth(i);
    const text = await button.textContent();
    const type = await button.getAttribute('type');
    console.log(`Button ${i}: text="${text}" type="${type}"`);
  }
  
  await browser.close();
})();
