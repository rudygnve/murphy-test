import puppeteer from "puppeteer";

export const getGroupDetails = async (groupURI: string) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(groupURI);
  await page.waitForSelector("title");
  await page.waitForSelector("img[data-imgperflogname='profileCoverPhoto']");
  const groupDetails = await page.evaluate(() => {
    const groupNameContainer = document.querySelector("title");
    const groupCoverContainer = document.querySelector(
      "img[data-imgperflogname='profileCoverPhoto']"
    );
    const name = groupNameContainer?.textContent;
    const cover = groupCoverContainer?.getAttribute("src");
    if (name?.includes(" | Facebook"))
      return { name: name.split(" | Facebook")[0], cover };
    return { name, cover };
  });
  return groupDetails;
};
