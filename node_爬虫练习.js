/*
* @Author: Marte
* @Date:   2017-06-28 14:45:27
* @Last Modified by:   Marte
* @Last Modified time: 2017-06-28 16:58:13
*/

'use strict';

const request= require('request');
const fs= require('fs');
//由于使用正表匹配元素太麻烦了，所以使用 cheerio ，用法与jq相似;
const cheerio = require('cheerio');
//由于使用了 cheerio 导致中文进行了编码，使用此库可以进行解码;
var Entities = require('html-entities').XmlEntities;
var entities = new Entities();



//读取图片文件，通过流的形式给另一个文件，具体查看 request 使用
request('http://google.com/doodle.png').pipe(fs.createWriteStream('doodle.png'))
/*=========================================*/
var str ="<div id='comment_nav'><span id='span_refresh_tips'></span><a href='javascript:void(00;' onclick='return RefreshCommentList();' id='lnk_RefreshComments' runat='server' clientidmode='Static'>刷新评论</a><a href='#' onclick='return RefreshPage();'>刷新页面</a><a href='#top'>返回顶部</a></div>"

    var $ = cheerio.load(str);
    var c= $('#lnk_RefreshComments');

console.log(entities.decode(c.html()));
/*=========================================*/