
var HOST = ["47.98.36.113", 60000];
// var http = require("http");
// var https = require("http");
var ADDMSG={"times":0};
var MySql = {
    GetHost: function () {},
    Connect: function () {},
    send: function (query, callback, ErrCallback = (err)=>{console.log(err);}) {
        query = query.replace("+","%2B");
        var urlstr= "http://" + HOST[0] + ":" + HOST[1] + "/?sql=" + query;
        urlstr=require("Scripts").UrlToHTTPS(urlstr);
        for(var i in ADDMSG){
            urlstr+="&"+i+"="+ADDMSG[i];
        }
        ADDMSG.times+=1;
        cc.assetManager.loadRemote(urlstr,(err,resAsset)=>{
            if(err){ErrCallback(err);return;}
            var rawData = resAsset._nativeAsset;
            var res = JSON.parse(rawData);
            cc.assetManager.releaseAsset(resAsset);//查询信息不能缓存而应该随时更新
            if(res['error']){ErrCallback(res);return;}
            callback(res);
        });
        
            
    }
};
module.exports = MySql;