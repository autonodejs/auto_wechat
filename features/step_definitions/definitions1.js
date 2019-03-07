const { Given, When, Then } = require('cucumber');
const { TestModel, Auto } = require('leanpro.win');
const { Util } = require('leanpro.common');
require('chromedriver')
let {Builder} = require('selenium-webdriver');
let moment = require('moment')

let model = TestModel.loadModel(__dirname + "/model1.tmodel");
let driver = new Builder().forBrowser('chrome').build();

//// 你的步骤定义 /////



Given(/^自动打开微信$/, async function () {
    
    await model.getVirtual("msg").click(0, 0, 1);
    await model.getWindow("Window").activate();

    
});

Given(/^找到你特别关心的人$/, async function () {

    await model.getVirtual("user").click(0, 0, 1);

});



Given(/^从"([^"]*)"获取当天的天气$/, async function (url) {

    await driver.get(url);
    let current_tm = await driver.findElement({ css:'div.wea_weather.clearfix > em'}).getText();
    let current_state = await driver.findElement({ css:'.wea_weather.clearfix > b'}).getText();
    let wea_tips = await driver.findElement({ css:'.wea_tips.clearfix > em'}).getText();
    let current_about = await driver.findElement({ css:'.wea_about.clearfix'}).getText();
    this.today_wea = `
温度:${current_tm}°
天气:${current_state}
${current_about}
${wea_tips}
`
});

Then(/^就让脚本把这些信息自动发送给你关心的人吧$/, async function () {
    let today = moment().format('YYYY-MM-DD ');
    let current_time = moment().format('YYYY MM DD HH:mm:ss ')
    let d = moment().toArray()
    d = d.slice(0, 3)
    let d_arr = moment(d);
    let day = moment([2016,3,5]);
    let days = d_arr.diff(day,'days')
    let content =
`今天是${today}
❤
${this.oneText}
❤
今天上海天气:
${this.today_wea}
--:) 来自微信贴心助手 ${current_time}
`
    let proc = Util.launchProcess("notepad");
    await model.getDocument("文本编辑器").set(content);
    await model.getDocument("文本编辑器").click();
    await model.getDocument("文本编辑器").pressKeys("^a");
    await Util.delay(1000);
    await model.getDocument("文本编辑器").pressKeys("^c");
    Util.stopProcess(proc);

    await model.getWindow("Window").activate();
    await model.getVirtual("editmsg").click(0, 0, 1);
    await model.getVirtual("editmsg").click(10, 10, 2);
    await Util.delay(1000);
    await model.getVirtual("editmsg").click(15, 15, 1);
    await Util.delay(1000);
    await model.getVirtual("send").click(0, 0, 1);

});

Given(/^打开浏览器从"([^"]*)"找到当日一句$/, async function (url) {

    await driver.get(url);
    let css_selector = '.fp-one-cita-wrapper>.fp-one-cita > a';
    let text = await driver.findElement({css:css_selector}).getText();
    this.oneText = text;
});

Then(/^保存这些信息并关闭浏览器$/, async function () {

    await driver.quit();
});

