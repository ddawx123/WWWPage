/**
 * Single Sign On
 * @copyright 2012-2018 DingStudio All Rights Reserved
 */

/**
 * Verify SSO Status
 * @return {mixed}
 */
function checkSSO() {//Loading DingStudio SSO Api
    console.log("Please wait, we are connecting to remote application interface ...");
    var xhr;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xhr = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var authdata = xhr.responseXML;
            var authcode = authdata.getElementsByTagName("authcode")[0].firstChild.nodeValue;
            //alert(authcode);
            if (authcode == '0') {
                document.getElementById("copyright_info").innerHTML = '<a href="copyright.html" target="_self">&copy;2012-' + new Date().getFullYear() + ' DingStudio</a>&nbsp;&nbsp;&nbsp;<a href="https://passport.dingstudio.cn/sso/login.php?mod=caslogin&returnUrl=' + encodeURIComponent(window.location.href) + '&ref=portalindex" target="_self" title="登录网站通行证" onclick="return showLoginForm()">用户登录</a>';
                var visitor_js = document.createElement('script');
                visitor_js.setAttribute('src', './assets/js/visitor.js');
                document.getElementsByTagName('head')[0].appendChild(visitor_js);
            }
            else {
                var token = authdata.getElementsByTagName("token")[0].firstChild.nodeValue;//Get User Token
                var xhr2;
                if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
                    xhr2 = new XMLHttpRequest();
                }
                else {// code for IE6, IE5
                    xhr2 = new ActiveXObject("Microsoft.XMLHTTP");
                }
                xhr2.onreadystatechange = function () {
                    if (xhr2.readyState == 4 && xhr2.status == 200) {
                        var userinfo = xhr2.responseXML;
                        var resultcode = userinfo.getElementsByTagName("code")[0].firstChild.nodeValue;
                        if (resultcode == 200) {
                            //var userdata = userinfo.getElementsByTagName("data")[0];
                            var username = userinfo.getElementsByTagName("data")[0].getElementsByTagName("username")[0].firstChild.nodeValue;
                            document.getElementById("copyright_info").innerHTML = '<a href="copyright.html" target="_self">&copy;2012-' + new Date().getFullYear() + ' DingStudio</a>&nbsp;&nbsp;&nbsp;当前帐户：' + username + '&nbsp;&nbsp;<a href="https://passport.dingstudio.cn/sso/usercenter.php?ref=portalindex" target="_self" title="访问网站通行证用户中心">用户中心</a>&nbsp;&nbsp;&nbsp;<a href="https://passport.dingstudio.cn/sso/login.php?action=dologout&url=' + encodeURIComponent(window.location.href) + '" target="_self" title="退出网站通行证登录状态" onclick="return showLogoutForm()">退出</a>';
                        }
                    }
                }
                xhr2.withCredentials = true;
                xhr2.open("POST", "https://passport.dingstudio.cn/sso/api?format=xml&action=verify", true);
                xhr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr2.send('token=' + token + '&reqtime=' + Date.parse(new Date()) / 1000 + '&cors_domain=' + window.location.protocol + '//' + window.location.host);
            }
            console.log("Well, the dingstudio ssoapi has been successfully connected.");
        }
    }
    xhr.withCredentials = true;
    xhr.open("POST", "https://passport.dingstudio.cn/sso/api?format=xml&action=status", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send('cors_domain=' + window.location.protocol + '//' + window.location.host);
}

/**
 * Display login dialog
 * @return {null}
 */
function showLoginForm() {
    swal({
        title: "<small>登录网站通行证</small>",
        animation: "slide-from-bottom",
        showConfirmButton: true,
        confirmButtonText: "关闭",
        text: '<iframe id="ifrmname" src="https://passport.dingstudio.cn/sso/iframelogin.php?mod=caslogin&returnUrl=' + encodeURIComponent(window.location.href) + '&ref=portalindex" height="160" width="360" marginheight="0" marginwidth="0" scrolling="no" frameborder="0"></iframe>',
        html: true
    }, function () {
        checkSSO();
    });
    return false;
}

/**
 * Session logout confirm
 * @return {null}
 */
function showLogoutForm() {
    swal({
        title: "是否退出网站通行证",
        text: "亲，您确认要退出网站用户通行证？继续操作后所有关联站点的登录会话也会同步退出，请确保没有正在进行的工作哦~",
        type: "warning",
        animation: "slide-from-bottom",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        html: false
    }, function () {
        doLogout();
    });
    return false;
}

/**
 * Do logout process by JSONP mode
 * @return {script}
 */
function doLogout() {
    var jsonp_logout = document.createElement('script');
    jsonp_logout.setAttribute('src', 'https://passport.dingstudio.cn/sso/api?format=json&action=logout&callback=logoutHandler');
    document.getElementsByTagName('head')[0].appendChild(jsonp_logout);
}

/**
 * Logout handler for server callback
 * @return {mixed} Logout result
 */
function logoutHandler(data) {
    if (data.code === 200) {
        swal({
            title: '操作结果',
            text: '会话登出成功，欢迎再次回来！',
            type: 'success',
            animation: "slide-from-bottom",
            showCancelButton: false,
            closeOnConfirm: false,
            showLoaderOnConfirm: false,
            confirmButtonText: "确认",
            timer: 3000,
            html: false
        }, function () {
            checkSSO();
            swal.close();
        });
    }
    else {
        swal({
            title: '操作结果',
            text: '会话登出操作超时，建议刷新页面后再次尝试。有时，可能因为网络延迟、服务端维护升级等，如果该问题多次出现，建议更换网络或联系站点管理员！',
            type: 'error',
            animation: "slide-from-bottom",
            showCancelButton: false,
            closeOnConfirm: false,
            showLoaderOnConfirm: false,
            confirmButtonText: "确认",
            html: false
        });
    }
}
