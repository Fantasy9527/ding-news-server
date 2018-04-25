
const puppeteer = require('puppeteer');
var os = require('os');
const fse = require('fs-extra');
const path = require('path');
const _ = require('lodash');

module.exports = async function(app){
  try {
    console.log('开始抓取内容');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox ', '--disable-setuid-sandbox ']
    });
    const page = await browser.newPage();
    const loadCount = 10;
    await page.goto('https://juejin.im/welcome/frontend', { waitUntil: 'networkidle2' });
    await page.setViewport({
      width: 1920,
      height: 1080
    });

    await page.waitFor(5000);
    //加载更多文章
    await page.keyboard.press('End');
    await page.waitFor(1000);
    await page.keyboard.press('End');
    await page.waitFor(1000);
    await page.keyboard.press('End');
    await page.waitFor(1000);
    await page.keyboard.press('End');
    await page.waitFor(1000);
    await page.keyboard.press('End');
    await page.waitFor(1000);
    await page.keyboard.press('End');
    await page.waitFor(1000);
    await page.keyboard.press('End');
    await page.waitFor(1000);
    await page.keyboard.press('End');
    await page.waitFor(1000);
    await page.keyboard.press('End');
    await page.waitFor(1000);
    await page.keyboard.press('End');
    await page.waitFor(1000);
    await page.keyboard.press('End');
    await page.waitFor(1000);
    await page.keyboard.press('End');
    await page.waitFor(1000);

    var result = await page.evaluate(() => {
      let arr = [];
      let newsList = document.querySelectorAll('.title-row');
      console.log(newsList);
      newsList.forEach((item) => {
        let title = item.querySelector('a').innerText;
        let messageURL = item.querySelector('a').href;
        arr.push({
          title,
          messageURL
        });
      });
      console.log(arr);
      return arr;
    });

    let newsDataPath = `${os.homedir()}/.news/`;
    let newsFilePath = `${os.homedir()}/.news/data.json`;
    let newsExistsPath = `${os.homedir()}/.news/exists.json`;
    const exists = await fse.pathExists(newsDataPath);
    console.log(exists);
    if (exists) {
      console.log('文件已经存在,开始对已存在数据去重处理');
      const news = await fse.readJson(newsFilePath);
      result = result.concat(news);
      result = _.uniqBy(result, 'messageURL');
    } else {
      console.log('文件不存在,开始生成');
      await fse.ensureDir(newsDataPath);
      await fse.writeJson(newsExistsPath, []);

    }

    await fse.writeJson(newsFilePath, result);
    console.log('抓取完毕,数据量为:', result.length);
    // await browser.close();
  } catch (error) {
    console.log(error);
  }
};
