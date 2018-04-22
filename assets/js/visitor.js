/**
 * Single Sign On - Visitor Mode
 * @copyright 2012-2018 DingStudio All Rights Reserved
 */

var jsonp_visitor = document.createElement('script');
jsonp_visitor.setAttribute('src', 'https://passport.dingstudio.cn/api/visitor?getSession');
document.getElementsByTagName('head')[0].appendChild(jsonp_visitor);

function visitorCallback(resource) {
    if (resource.code == 200) {
        console.log('Welcome back, guest user.');
    }
    else {
        location.href = 'https://passport.dingstudio.cn/api/visitor?domain=' + document.domain + '&goto=' + encodeURIComponent(window.location.href);
    }
}
