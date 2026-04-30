const puppeteer = require("puppeteer");

async function go() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
  });

  const page = await browser.newPage();

  // Go to homepage
  await page.goto("https://uw-iss-website.web.app/index.html", {
    waitUntil: "networkidle2",
  });

  // -----------------------------
  // 1. Navigate to Login page
  // -----------------------------
  await page.click('a[href="login.html"]');
  await page.waitForNavigation({ waitUntil: "networkidle2" });

  console.log("On login page:", page.url());

  // -----------------------------
  // 2. Enter VALID credentials
  // -----------------------------
  await page.type("#loginEmail", "test@wisc.edu"); // replace
  await page.type("#loginPassword", "admin123"); // replace

  // -----------------------------
  // 3. Submit login
  // -----------------------------
  await page.click("#loginBtn");

  // give Firebase time to respond
  await new Promise((r) => setTimeout(r, 4000));

  // -----------------------------
  // 4. Verify redirect (SUCCESS)
  // -----------------------------
  const currentURL = page.url();

  if (
    currentURL.includes("index.html") ||
    currentURL.includes("admin-dashboard.html")
  ) {
    console.log("Login successful, redirected to:", currentURL);
  } else {
    console.log("Unexpected redirect:", currentURL);
  }

  // -----------------------------
  // 5. Test navigation after login
  // -----------------------------
  await page.goto("https://uw-iss-website.web.app/index.html");

  await page.click('a[href="events.html"]');
  await page.waitForNavigation({ waitUntil: "networkidle2" });

  console.log("Events page loaded:", page.url());

  // -----------------------------
  // Close browser
  // -----------------------------
  await new Promise((r) => setTimeout(r, 5000));

  await browser.close();
}

go();
