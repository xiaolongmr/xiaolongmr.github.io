var titleTime,OriginTitile=document.title;function displayAlert(e,t,i){var n=document.createElement("div");if("success"==e)n.style.backgroundImage="linear-gradient(90deg, #74EBD590 0%, #9FACE6 100%)";else if("error"==e)n.style.backgroundImage="linear-gradient(147deg, #FFE53B 0%, #FF252590 74%)";else if("info"==e)n.style.backgroundImage="linear-gradient(90deg, #FEE14090 0%, #FA709A 100%)";else{if("dark"!=e)return void console.log("入参type错误");n.style.backgroundImage="linear-gradient(180deg, #7a9edc 0%, #b980a990 100%)"}n.id="lunbo",n.style.position="fixed",n.style.transform="translate(-50%)",n.style.backdropFilter="blur(.1rem)",n.style.webkitBackdropFilter="blur(.1rem)",n.style.left="50%",n.style.top="20%",n.style.color="white",n.style.fontSize="15px",n.style.borderRadius="15px",n.style.textAlign="center",n.style.lineHeight="25px",n.style.alignItems="center",n.style.padding="10px 30px",n.style.zIndex="999",null==document.getElementById("lunbo")&&(document.body.appendChild(n),n.innerHTML=t,setTimeout((function(){document.body.removeChild(n)}),i))}function test0(){displayAlert("success",'<p class="issue-wrap-gw" style="height: 110px; overflow: hidden;"><span class="wrap-word-gw">名称：XXX <br>网址：https://www.xx.cn <br>描述：这是一个完全免费简单好用的在线...</span></p>',6e3)}function test1(){displayAlert("error","暂无权限",1500)}function test2(){displayAlert("info","网易云id缺失",1500)}function test3(){displayAlert("dark","<p style='text-align: start'>Alt+Z:打开夜间模式;<br>Alt+X:关闭;<br>Alt+↑:增加亮度;<br>Alt+↓:降低亮度</p>",3e3)}function test4(){displayAlert("success","<img style='width: 100px;' src='https://p.qlogo.cn/hy_personal/3e28f14aa05168421bd439e7b002fdc3119da81188c90c7ce58c5b5baef7880b/0.png' alt='视传人' title='视传人' referrerpolicy='no-referrer' />视传人 , 视传魂 , 视传都是人上人!",1500)}function test5(){displayAlert("success","<img onclick=window.location.reload(); style='width: 20px; position:absolute; margin:-5px 0px 0px 50%; transform:translate(-25px)' src='/img/clear.svg'><div class='card-widget card-info'><div class=item-headline><span>恋爱清单</span></div><div style='text-align: center; color: #888; font-size: 15px; padding: 10px'><div style='width: 220px; margin: 0 auto'><img class='love'src='https://thirdqq.qlogo.cn/g?b=sdk&k=Bev4kt2qt6ZBMfNLYbGtSw&s=640&t=1657859177'alt='love'title='小陈'style='width: 60px; border-radius: 50%;transition: all .5s;'/><img src='https://m.360buyimg.com/babel/jfs/t1/28239/30/18086/3736/62d530cbE02974f98/e57f9bf1e0ce61c8.gif'alt='love'style='width: 60px; border-radius: 50%'/><img class='love'src='https://thirdqq.qlogo.cn/g?b=sdk&k=yqjbmdENrko19T7mjIc3vg&s=640&t=1655292317'alt='love'title='小张'style='width: 60px; border-radius: 50%; transition: all .5s;'/></div><p id='lovepyqSitetime2' style='font-size:0.8rem;margin-top:16px;background:linear-gradient(to right,red,blue);-webkit-background-clip:text;color:transparent;' ></p><div class=author-info__description style='margin-bottom:10px;'>If the moon smiled,she would resemble you.</div ><a style='text-decoration:none; padding: 7px 20px; background: hotpink; color: #fff; border-radius:5px!important  ' href='https://www.zlblog.cf/love/index.html' target='_blank' rel='noopener'>祝福</a></div>",2500)}function test6(){displayAlert("info","网易云id缺失",1500)}function test7(){displayAlert("info","<img onclick=window.location.reload(); style='width: 20px; position:absolute; margin:-5px 0px 0px 50%; transform:translate(-25px)' src='/img/clear.svg'></p><p style='text-align: start'>抱歉，您所使用的浏览器无法完成此操作<br>请使用 Ctrl + D 将本页加入收藏夹！<br>其实是我不会写😅 </p>",2e3)}function test8(){displayAlert("info","<img onclick=window.location.reload(); style='width: 20px; position:absolute; margin:-5px 0px 0px 50%; transform:translate(-25px)' src='/img/clear.svg'><p>开发中,玩会游戏吧...</p><iframe  src=https://game.crisp.chat style='transform: translate(-50%); border-radius: 20px' height=600 width=1200 scrolling='no' frameborder='0' ></iframe>",1e6)}function test9(){displayAlert("success","<img style='width: 100px; border-radius:6px' src='https://n.sinaimg.cn/sinakd2020827s/708/w354h354/20200827/9b48-iyhvyva3506111.gif' referrerpolicy='no-referrer' /> 专业课老师平时上课推荐过的网站!",1500)}function addFavorite(e,t){var i,n;"object"!=typeof t?(i=document.title,n=location.href):(i=t.title||document.title,n=t.url||location.href);try{window.external.addFavorite(n,i)}catch(t){window.sidebar?(e.href=n,e.title=i,e.rel="sidebar"):onclick=test7()}}function tips(){document.getElementById("dome").innerHTML="<br><strong>1</strong> 引用的是第三方评论插件，需要选择<font node-type='header-login'  color=hotpink> 社交账号</font> 进行登录留言<br> <strong>2</strong> 欢迎留言推荐实用的网站，无关留言会定期清理<font node-type='header-login' onclick=test0() color=skyblue > 👉<u>推荐格式</u>👈 </font> "}function lovepyqSitetime2(){window.setTimeout("lovepyqSitetime2()",1e3);var e=6e4,t=36e5,i=864e5,n=new Date,r=n.getFullYear(),o=n.getMonth()+1,l=n.getDate(),s=n.getHours(),a=n.getMinutes(),d=n.getSeconds(),c=Date.UTC(2022,6,3,0,0,0),p=Date.UTC(r,o,l,s,a,d)-c,g=Math.floor(p/31536e6),m=Math.floor(p/i-365*g),u=Math.floor((p-(365*g+m)*i)/t),f=Math.floor((p-(365*g+m)*i-u*t)/e),y=Math.floor((p-(365*g+m)*i-u*t-f*e)/1e3);document.getElementById("lovepyqSitetime2").innerHTML="我们相<img class='heartgit' style='width: 20px; vertical-align: middle;' src='https://gcore.jsdelivr.net/gh/xiaolongmr/image@main/gif/xin.gif'>了：</br>"+g+"年"+m+"天"+u+"时"+f+"分"+y+"秒啦"}document.addEventListener("visibilitychange",(function(){document.hidden?(document.title="(つェ⊂)我藏好了哦~ "+OriginTitile,clearTimeout(titleTime)):(document.title="(*´∇｀*) 被你发现啦~ "+OriginTitile,titleTime=setTimeout((function(){document.title=OriginTitile}),2e3))})),function(e,t,i,n,r,o,l,s){s=function(){o=t.createElement(i),l=t.getElementsByTagName(i)[0],o.src=r,o.charset="utf-8",o.async=1,l.parentNode.insertBefore(o,l)},e.SeniverseWeatherWidgetObject=n,e[n]||(e[n]=function(){(e[n].q=e[n].q||[]).push(arguments)}),e[n].l=+new Date,e.attachEvent?e.attachEvent("onload",s):e.addEventListener("load",s,!1)}(window,document,"script","SeniverseWeatherWidget","//cdn.sencdn.com/widget2/static/js/bundle.js?t="+parseInt(((new Date).getTime()/1e8).toString(),10)),window.SeniverseWeatherWidget("show",{flavor:"slim",location:"WW3M6GBCXPV8",geolocation:!0,language:"zh-Hans",unit:"c",theme:"auto",token:"8df27f18-9e77-492e-b2bc-e704b089a8b0",hover:"disabled",container:"tp-weather-widget"}),lovepyqSitetime2();