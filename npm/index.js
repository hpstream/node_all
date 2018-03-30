var goodTools = {

}

goodTools.arrToJson = function(data,key,issame){
        var temp = {};
        for(let i=0;i<data.length;i++){
            var onlykey = data[i][key];
            if(!temp[onlykey]){
                temp[onlykey] = data[i];
                continue;
            }
            //去除key值重复的
            if(issame){
                continue;
            }
            if(temp[onlykey] instanceof Array){
                temp[onlykey].push(data[i]);
                continue;
            }
            temp[onlykey] =[temp[onlykey]] 
            temp[onlykey].push(data[i]); 
        }

       return temp;
}

export default goodTools; 
