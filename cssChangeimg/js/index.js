var bindDom = document.querySelector("#test")
var test = document.querySelector("#test > div");
var imgList = [],imageIndex = 0;
var hammertime = new Hammer(bindDom);
Hammer.defaults.domEvents = true;
hammertime.add(new Hammer.Pinch());
hammertime.add(new Hammer.Rotate());
var pinchlock = false;

/* 缩放 */
hammertime.on("pinchin pinchout", function (ev) {
    ev.srcEvent.stopPropagation()
    var translate = test.style.transform.match(/(translate3d\(.*\))/)?test.style.transform.match(/(translate3d\(.*\))/)[1]:''
    test.style.transform ='scale('+ev.scale+')' +' ' +translate;
});

// hammertime.on("pinchout", function (ev) {
//     ev.srcEvent.stopPropagation()
//     if(!pinchlock){
//         var translate = test.style.transform.match(/(translate3d\(.*\))/)?test.style.transform.match(/(translate3d\(.*\))/)[1]:''
//         test.style.transform ='scale('+ev.scale+')' +' ' +translate;
//         setTimeout(function(){
//             pinchlock = false
//         },1000)
//     }
// });
/* 缩放结束 */
/* 旋转 */
hammertime.on("rotate", function (ev) {
    // ev.srcEvent.stopPropagation()
    alert(ev.angle)
});

/* 双击还原 */
hammertime.on("doubletap", function (e) {
    test.style.transform ='translate3d(0,0,0)';
});

/* 留着做图片切换 */
hammertime.on("swiperight", function (e) {
    alert('right')
    //test.style.backgroundImage = imgList[imageIndex<imgList.length ? imageIndex++ :imgList.length]
});

hammertime.on("swipeleft", function (e) {
    alert('left')
    //test.style.backgroundImage = imgList[imageIndex > 0 ? imageIndex-- :0]
});
/* 移动 */
var startX = 0,startY = 0,endX = 0,endY = 0,totalMove = 0;  //totalMove作为移动距离的计数
var _width = document.body.offsetWidth;
var _height = document.body.offsetHeight;
hammertime.on("panstart", function (e) {
    startX = e.deltaX;
    startY = e.deltaY;
});

hammertime.on("panmove", function (e) {
    endX = e.deltaX;
    endY = e.deltaY;
    // var moveX = Math.abs(endX - startX);
    // var moveY = Math.abs(endY - startY);
    
    // if(moveX > 40 || moveY > 40){
        moveX = ( (endX)/_width )*100;
        moveY = ( (endY)/_height )*100;
        var scale = test.style.transform.match(/(scale\(.*\))/)?test.style.transform.match(/(scale\(.*\))/)[1]:''
        if(scale){
            test.style.transform ='translate3d('+ -Number( - moveX)+'%,'+ -Number(- moveY)+'%,0) '+ scale;
        }
        
    // }
    
});
hammertime.on("panend", function (e) {
    totalMove = 0;
});



function getStyle (selector,style){
    var dom = document.querySelector(selector);
    return window.getComputedStyle?window.getComputedStyle(dom,null)[style]:dom.currentStyle[style]; 
}