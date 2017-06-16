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
        document.cookie = key + '=' + escape(value);
    }
    cookies.del = function(key){
        var date = new Date();
        date.setDate(-1);
        document.cookie = key + '=' + this.get('key') + ';expires=' + date.toGMTString();
    }
    window.$cookies =  cookies;
})(window)