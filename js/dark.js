var brightness;function container(e){"undefined"==typeof div?(div=document.createElement("div"),div.setAttribute("style","position:fixed;top:0;left:0;outline:5000px solid;z-index:998;"),document.body.appendChild(div)):div.style.display="",div.style.outlineColor="rgba(0,0,0,"+e+")"}window.addEventListener("keydown",(function(e){e.altKey&&90==e.keyCode&&container(brightness=.3),e.altKey&&88==e.keyCode&&container(brightness=0),e.altKey&&38==e.keyCode&&brightness-.05>.05&&container(brightness-=.05),e.altKey&&40==e.keyCode&&brightness+.05<.95&&container(brightness+=.05)}),!1);