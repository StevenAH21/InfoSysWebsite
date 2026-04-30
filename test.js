const puppeteer = require("puppeteer");

async function go() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  // -----------------------------
  // 1. Homepage
  // -----------------------------
  await page.goto("https://uw-iss-website.web.app/index.html", {
    waitUntil: "domcontentloaded",
  });

  console.log("Homepage loaded");

  // -----------------------------
  // 2. Login
  // -----------------------------
  await page.click('a[href="login.html"]');
  await page.waitForSelector("#loginEmail", { visible: true });

  console.log("Login page loaded");

  await page.type("#loginEmail", "test@wisc.edu");
  await page.type("#loginPassword", "admin123");

  console.log("Typed login info");

  await page.click("#loginBtn");

  await new Promise((r) => setTimeout(r, 5000));

  console.log("Current URL after login:", page.url());

  // -----------------------------
  // 3. Events page filter buttons
  // -----------------------------
  await page.goto("https://uw-iss-website.web.app/events.html", {
    waitUntil: "domcontentloaded",
  });

  console.log("Events page loaded");

  await page.waitForSelector(".filter-tab", { visible: true });

  await page.click('.filter-tab[data-filter="social"]');
  console.log("Clicked Socials filter");

  await new Promise((r) => setTimeout(r, 1000));

  await page.click('.filter-tab[data-filter="company"]');
  console.log("Clicked Company Visits filter");

  await new Promise((r) => setTimeout(r, 1000));

  await page.click('.filter-tab[data-filter="workshop"]');
  console.log("Clicked Workshops filter");

  await new Promise((r) => setTimeout(r, 1000));

  await page.click('.filter-tab[data-filter="all"]');
  console.log("Clicked All Events filter");

  await new Promise((r) => setTimeout(r, 1000));

  // -----------------------------
  // 4. Careers page buttons
  // -----------------------------
  await page.goto("https://uw-iss-website.web.app/careers.html", {
    waitUntil: "domcontentloaded",
  });

  console.log("Careers page loaded");

  await page.waitForSelector(".resource-card", { visible: true });

  // Click Our Partners button
  await page.click('a[href="#partners"]');
  console.log("Clicked Our Partners button");

  await new Promise((r) => setTimeout(r, 1500));

  // Click Upcoming Events button in CTA
  await page.click('.cta-section a[href="events.html"]');
  console.log("Clicked Upcoming Events button");

  await page.waitForSelector(".filter-tab", { visible: true });
  console.log("Returned to Events page from Careers");

  // -----------------------------
  // 5. Contact form test
  // -----------------------------
  await page.goto("https://uw-iss-website.web.app/contact.html", {
    waitUntil: "domcontentloaded",
  });

  console.log("Contact page loaded");

  await page.waitForSelector("#interestForm", { visible: true });

  await page.type("#firstName", "Test");
  await page.type("#lastName", "User");
  await page.type("#email", "test@wisc.edu");
  await page.select("#interest", "member");
  await page.type("#message", "This is a Puppeteer test submission.");

  console.log("Filled out contact form");

  await page.click("#submitBtn");

  await new Promise((r) => setTimeout(r, 3000));

  const formStatus = await page.$eval("#formStatus", (el) => el.textContent);
  console.log("Contact form status:", formStatus);

  // -----------------------------
  // 6. Mobile hamburger menu
  // -----------------------------
  await page.goto("https://uw-iss-website.web.app/index.html", {
    waitUntil: "domcontentloaded",
  });

  await page.setViewport({ width: 500, height: 800 });

  await page.click("#hamburger");

  console.log("Hamburger menu clicked");

  await new Promise((r) => setTimeout(r, 8000));

  await browser.close();
}

go();