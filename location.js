(function(window){
    var query = {},_location = {};
    (location.search.replace(/^(\?)(.*)/,'$2')).split('&').forEach(function(ele){
            let name = ele.split('=')[0];
            let val = ele.split('=')[1]
            if(name){
                query[name] = {
                    'name':name,
                    'val':val
                }
            }
    })

    _location.qurey = query;
    _location.host = location.host;         //域名
    _location.port = location.port;         //端口
    _location.protocol = location.protocol; //协议
    _location.pathname = location.pathname; //路径
    _location.origin = location.protocol + '//' + location.host + location.port;
    window.$location =  _location;
})(window)