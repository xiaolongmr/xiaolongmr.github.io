// 右键菜单 html转JavaScript
document.write("<ul id=\"cyy_menu\">");
document.write("    <li id=\"cyy_t1\">⟰ &nbsp;首页<\/li>");
document.write("    <li class=\"hr_break\"><\/li>");
document.write("    <li id=\"cyy_t2\">◀ &nbsp;返回<\/li>");
document.write("    <li id=\"cyy_t3\">⇨ &nbsp;前进<\/li>");
document.write("    <li id=\"cyy_t4\">⟳ &nbsp;刷新<\/li>");
document.write("    <li id=\"cyy_t5\">✐ &nbsp;日志<\/li>");
document.write("    <li class=\"hr_break\"><\/li>");
document.write("    <li id=\"cyy_t6\">👁 &nbsp;护眼模式 <\/li>");
document.write("    <li id=\"cyy_t7\">▣ &nbsp;更换背景<\/li>");
document.write("    <li id=\"cyy_t8\">♬ &nbsp;暂停/播放音乐 <\/li>");
document.write("    <li class=\"hr_break\"><\/li>");
// 下面是测试的
document.write("    <li id=\"cyy_t9\">&nbsp;小张&nbsp;<img class='heartgit' style='width: 15px; vertical-align: middle;' src='https://p.qlogo.cn/hy_personal/3e28f14aa051684243963d5396c2a938078a85c23f2eed887938535a772e251e/0.png'>&nbsp;小陈 <\/li>");
document.write("    <li id=\"cyy_t10\">☘ &nbsp;开发中... <\/li>");
document.write("<\/ul>");
document.write("<!-- 右键菜单js -->");


window.addEventListener('contextmenu', RightClickMenu);
const rightMenu = document.querySelector('#cyy_menu');

function RightClickMenu(e) {
    e.preventDefault();
    rightMenu.style.display = 'block';
    let x = e.clientX,
        y = e.clientY,
        menuWidth = rightMenu.offsetWidth,
        menuHeight = rightMenu.offsetHeight,
        htmlWidth = document.body.clientWidth,
        htmlHeight = document.body.clientHeight;
    if (x + menuWidth < htmlWidth) rightMenu.style.left = x + 'px';
    else rightMenu.style.left = htmlWidth - menuWidth + 'px';
    if (y + menuHeight < htmlHeight) rightMenu.style.top = y + 'px';
    else rightMenu.style.top = htmlHeight - menuHeight + "px";
}
document.body.addEventListener('click', function() {
    rightMenu.style.display = 'none';
});
document.querySelector('#cyy_menu').addEventListener('click', function(e) {
    switch (e.target.id) {
        case "cyy_t1":
            // 首页
            window.location.href = "/index.html";
            break;
        case "cyy_t2":
            // 返回
            window.history.back(-1);
            break;
        case "cyy_t3":
            // 前进
            window.history.forward(1);
            break;
        case "cyy_t4":
            // 刷新
            window.location.reload();
            break;
        case "cyy_t5":
            // 日志
            window.open("https://www.mgtv.ml/archives/1nav.html", "", "height=1000,width=500,location=0,left=200,top=100");
            break;
        case "cyy_t6":
            // 护眼模式
            // 默认右键护眼模式为0.5
            onclick = test3();
            container(0.5);
            break;
        case "cyy_t7":
            // 7
            onclick = test1();
            // window.alert("请记住以下账号密码\n\n  账号：1nav \n  密码：1nav");
            break;
        case "cyy_t8":
            // 8
            onclick = test2();

            break;
        case "cyy_t9":
            // 9 是恋爱清单
            onclick = test5();
            break;
        case "cyy_t10":
            // 10 开发中
            onclick = test8();
            break;
        default:
            console.error(e.target.id);
            break;
    }
});