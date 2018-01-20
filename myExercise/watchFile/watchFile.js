var showdown  = require('showdown');
var fs = require('fs');
var cheerio = require('cheerio'); //引入爬虫模块
var converter = new showdown.Converter();



fs.watchFile('read.md', (curr, prev) => {
    mdToHtml().then((d) =>{
        createFile(d)
    })
  });

  function mdToHtml(){
      return new Promise((resolve, reject)=>{
        fs.readFile('read.md',(err,data) =>{
            if(err) {
                reject(error);
                throw err;
            }else{
                let text = data.toString('utf8');
                html  = converter.makeHtml(text);
                fs.readFile('template.html',(err,data) =>{
                    var $ = cheerio.load(data.toString());
                    $('body').html(html);

                    resolve($.html());
                })
              
            }  
        })
      })
  }

  function createFile(d){
   
      fs.writeFile('1.html',d,(err,data) =>{
          if(err) throw err;
            console.log('写入成功');
      })
   
}