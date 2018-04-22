document.onreadystatechange = function () {
    if (document.readyState == 'complete') {
        if (location.hash == "#/news.html") {//防止在次级页面允许hitokito导致控制台产生错误
            console.log("You are in the second page, and hitokoto plugin was disabled on this page.");
        }
        else {
            var xhr;
            if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
                xhr=new XMLHttpRequest();
            }
            else {// code for IE6, IE5
                xhr=new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhr.onreadystatechange=function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    document.getElementById("hitokoto").innerHTML = "小句欣赏：" + xhr.responseText;
                }
            }
            xhr.open("GET","https://sslapi.hitokoto.cn/?encode=text",true);
            xhr.setRequestHeader("Content-type","text/plain");
            xhr.send();
        }
    }
}