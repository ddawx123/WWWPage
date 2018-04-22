//######以下内容为ajax无刷函数过程声明区域，应用此技术是为了使某些页面切换时不停止背景音乐的播放。######
//Copyright 2017 DingStudio.Tech 小丁工作室版权所有！
function load() {//Application Init Interface
    console.log("Application is starting now ...");
    checkSSO();
    if (location.hash == "") {//Check HashBang Mode
        console.log("System not found any urlhash code, autoconfigure now ...");
        location.href = "#/index.html?cpm=" + Math.random();
    }
    else if (location.hash == "#/news.html") {
        console.log("System found news page hashbang url, redirecting now ...");
        goNews();
    }
    else {
        console.log("Please wait ...");
    }
    console.log("Application was loaded successfully ...");
}

function bk2old() {//ajax无刷返回主页面
    var xhr;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xhr = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("main").innerHTML = xhr.responseText;
            checkSSO();
        }
    }
    xhr.open("GET", "index1.html", true);
    xhr.send();
}
function goNews() {//ajax无刷进入公告中心页面
    var xhr;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xhr = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("main").innerHTML = xhr.responseText;//写入名为main的目标Div容器
            checkSSO();
        }
    }
    xhr.open("GET", "news.html", true);
    xhr.send();
}
//######ajax无刷函数过程声明结束######
