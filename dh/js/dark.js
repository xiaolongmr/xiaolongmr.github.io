// 🌞🌚夜间模式
var brightness;
// 显示遮罩

function container(brightness) {
    if (typeof(div) == 'undefined') {
        div = document.createElement('div');
        div.setAttribute('style', 'position:fixed;top:0;left:0;outline:5000px solid;z-index:998;');
        document.body.appendChild(div);
    } else {
        div.style.display = '';
    }
    div.style.outlineColor = 'rgba(0,0,0,' + brightness + ')';
}
// 事件监听
window.addEventListener('keydown', function(e) {
    if (e.altKey && e.keyCode == 90) { //Alt+Z:打开夜间模式
        container(brightness = 0.3);
    }
    if (e.altKey && e.keyCode == 88) { //Alt+X:关闭
        container(brightness = 0);
    }
    if (e.altKey && e.keyCode == 38) { //Alt+↑:增加亮度
        if (brightness - 0.05 > 0.05) container(brightness -= 0.05);
    }
    if (e.altKey && e.keyCode == 40) { //Alt+↓:降低亮度
        if (brightness + 0.05 < 0.95) container(brightness += 0.05);
    }
}, false);
// 🌞🌚夜间模式end