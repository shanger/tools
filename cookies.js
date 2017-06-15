(function(window){
    var arr = [];
    var cookies = {
        data:function(){
            arr = [];
            document.cookie.split(';').forEach(function(ele){
                arr.push({
                    'key':ele.replace(/^(.*)(=)(.*)$/,'$1'),
                    'value':ele.replace(/^(.*)(=)(.*)$/,'$3'),
                })
            })
            return arr;
        }

    }

    cookies.get = function(key){
        var value = '';
        this.data().forEach(function(ele){
            if(ele.key === key){
                value = unescape(ele.value)
            }
        })
        return value;
    }
    cookies.set = function(key,value){
        var str = '';
        var data = this.data();
        data.forEach(function(ele){
            if(ele.key === key){
                ele.value = value
            }
        });
        data.forEach(function(ele){
            str += ele.key + '=' + escape(ele.value) +';'
        });
        document.cookie = str;
    }
    window.$cookies =  cookies;
})(window)