/**
 * 自动生成文件
 */

//1.用户输入生成几个文件


const  fs = require('fs');
var path = require('path');
var rootDir = './createFiles';
const  readline = require('readline');
const rl = readline.createInterface({
	input:process.stdin,
	output:process.stdout
})
question();

function question() {
	rl.question('请问要生成一个文件: ',(answer)=>{

		//拿到用户数据判断是不是数字
		if(!parseInt(answer)) {
			console.log('你输入的不是数字');
			question();
		}
		//先生成一个createFiles目录
		fs.stat(path.join(__dirname,rootDir),(err, stat) =>{
			if(stat){
				createdFiles(answer);
			}else {
				fs.mkdir(path.join(__dirname,rootDir),(err) =>{
					if(err) throw err;
					createdFiles(answer);

				});
			}

		})

	})
}

function createdFiles(mount){

	fs.readdir(path.join(__dirname,rootDir),(err,files) =>{
		if(err) throw err;


		files.forEach((v,i)=>{
			fs.unlinkSync(path.join(__dirname,rootDir,v));
		})

		for(let i=0;i<mount;i++){
			fs.writeFileSync(path.join(__dirname,rootDir,(i+1)+".js"),`我是第${i+1}个文件`);
		}
		console.log('文件生成完成');
		process.exit(0);

	})
}



