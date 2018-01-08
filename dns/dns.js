/**
 *使用dns模块
 */

var dns = require('dns');
const options = {
	family: 4,
	hints: dns.ADDRCONFIG | dns.V4MAPPED,
};

dns.lookup('www.baidu.com', options, (err, address, family) =>{
	console.log('address: %j family: IPv%s', address, family);
})



