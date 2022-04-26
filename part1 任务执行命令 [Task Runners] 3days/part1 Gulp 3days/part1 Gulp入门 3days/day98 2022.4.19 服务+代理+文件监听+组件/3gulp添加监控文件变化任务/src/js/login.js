const xhr = new XMLHttpRequest();
xhr.open('GET', '/dt?include_fields=top_comments%2Cis_root%2Csource_link%2Citem%2Cbuyable%2Croot_id%2Cstatus%2clike_count%2Csender%2Calbum%2Creply_count&filter_id=%E7%BE%8E%E9%A3%9F%E8%8F%9C%E8%BB%B1&start=24&_=1599562930879')
xhr.send()
xhr.onload = function () {
    console.log(JSON.parse(xhr.responseText));
}

/*
    为什么可以走代理
        + 我代理服务器使用的是 gulp-webserver
        + 我的页面也是在 gulp-webserver 上启动的
    
    为什么代理地址不对
        + 因为代理服务器使用的 gulp-webserver
        + 我的页面是在 nginx 上打开的
*/

const xhr2 = new XMLHttpRequest()
xhr2.open('GET', '/gx')
xhr2.send()
xhr2.onload = function () {
    console.log(xhr2.responseText);
}

const xhr3 = new XMLHttpRequest()
xhr3.open('GET', '/gx/server.php')
xhr3.send()
xhr3.onload = function () {
    console.log(xhr3.responseText);
}