// Dynamic Background Music Loader

var xhr;
if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    xhr = new XMLHttpRequest();
}
else {// code for IE6, IE5
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var xml = xhr.responseXML;
        var musicId = xml.getElementsByTagName("data")[0].firstChild.nodeValue;
        document.getElementById('bgmusic').innerHTML = '\
        <audio src="//static2.dingstudio.cn/musics/' + musicId + '.mp3" controls="controls" autoplay="autoplay" loop="loop" height="100" width="100" type="audio/mp3">\
        <embed height="100" width="100" src="//static2.dingstudio.cn/musics/' + musicId + '.mp3">\
        </audio>\
        ';
    }
}
xhr.withCredentials = false;
xhr.open("GET", "http://api.dingstudio.cn/api?format=xml&mod=DynamicBgm", true);
xhr.setRequestHeader("Content-type", "text/plain");
xhr.send();