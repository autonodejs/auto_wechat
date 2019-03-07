# 微信发送自动暖信息

<a name="df368884"></a>
## 前言

> 每个都是为公司的应用写自动化测试脚本，没曾把这些自动化应用到生活中，直到逛社区看到 [用Node+wechaty写一个爬虫脚本每天定时给女(男)朋友发微信暖心话](https://juejin.im/post/5c77c6bef265da2de6611cff) 发现还有如此好玩的事情。于是赏玩了一把，觉得还可以有更美好的实现方式。


上面的脚本还要进行扫码登录的操作，对于经常写自动化脚本的我们最好是一劳永逸的。所以这次我的脚本：只需一次登录。😁

下面言归正传

<a name="424a2ad8"></a>
## 准备

* 一台Windows操作系统。
* 在Windows上安装微信客户端。
* 在Windows上安装[CukeTest](http://cuketest.com)

这里说明一下为啥我要用CukeTest？

> 因为CukeTest是一款专门用来做自动化测试的工具，我经常用它来开发Windows,Web,Mobile,Api等自动化测试脚本。 本次我主要是想用它来自动化操作Windows版微信，你在Windows上登录微信后，不用管它，它会一直在线，只要不管电脑，微信可以随时在线，再也不用担心掉线了。


Pc上安装好微信客户端，我们手动登录一下，为了方便快速的让自动化脚本找到你的哪个她(或他)，可以事先把她（或他）的微信置顶。

<a name="3142e69c"></a>
## 暖心内容来源

和上面的大佬一样也是每日一句来自[one](http://wufazhuce.com/)

天气信息来自[墨迹天气](http://tianqi.moji.com/)

<a name="6d88b4cd"></a>
## 使用库

* [chromedriver](https://www.npmjs.com/package/chromedriver)
* [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver)
* [moment](https://www.npmjs.com/package/moment)

这些库大家如果经常写自动化测试，应该很熟悉。chromedriver chrome浏览器的驱动， selenium-webdriver web自动化库。<br />我脚本的原理比较简单，就是把平时我们手工操作的步骤转化为自动化脚本，自动打开chrome浏览器，去one和墨迹天气页面上提取信息。<br />因为CukeTest内置的有对Windows控件的操作，用CukeTest直接去自动操作微信，把上面提取出来的信息发送出去即可。

<a name="4c763bb6"></a>
## 运行

```
git clone 
cd auto_wechat
npm install
```

使用CukeTest 打开项目，点击运行就可以看到运行效果。
<a name="d41d8cd9"></a>
#### 
<a name="df9a0c32"></a>
## 主要代码片段
<a name="04c216b0"></a>
### 1.编辑一个故事场景

![image.png](https://cdn.nlark.com/yuque/0/2019/png/87080/1551931419013-238c46f0-cbbb-4afb-93d0-12e281f52d00.png#align=left&display=inline&height=479&name=image.png&originHeight=479&originWidth=569&size=33657&status=done&width=569)

<a name="af545979"></a>
### 2.获取信息
获取One 

```javascript
await driver.get(url);
let css_selector = '.fp-one-cita-wrapper>.fp-one-cita > a'; //元素定位
let text = await driver.findElement({css:css_selector}).getText();
this.oneText = text;
```
获取天气

```javascript
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
```
<a name="4b436f33"></a>
### 3.微信界面操作
操作微信界面需要在CukeTest中添加虚拟控件。<br />
![addvirtualimage.gif](https://cdn.nlark.com/yuque/0/2019/gif/87080/1551946590971-e624c499-9876-4a36-9901-4a3c9cb70c0d.gif#align=left&display=inline&height=524&name=addvirtualimage.gif&originHeight=728&originWidth=1036&size=699587&status=done&width=746)

添加完虚拟控件，调用CukeTest提供的API即可。模型管理器中可以看到。<br />
![image.png](https://cdn.nlark.com/yuque/0/2019/png/87080/1551946746043-99e24705-a30e-4901-a11b-93d45a4cb043.png#align=left&display=inline&height=604&name=image.png&originHeight=604&originWidth=749&size=43939&status=done&width=749)

复制或拖拽相关的方法到代码编辑器中即可。

<a name="4704949b"></a>
### 4.运行

![runproject.gif](https://cdn.nlark.com/yuque/0/2019/gif/87080/1551947910373-82c51e42-e19c-4399-ade7-ed801acd6d4f.gif#align=left&display=inline&height=398&name=runproject.gif&originHeight=728&originWidth=1366&size=1595732&status=done&width=746)
