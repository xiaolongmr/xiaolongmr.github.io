document.writeln(" <div id=gototop><svg class=\'Zi Zi--BackToTop\' title=回到顶部 fill=currentColor viewbox=\'0 0 24 24\' width=24 height=24><path d=\'M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z\'></path></svg></div>");
document.writeln("        <script src=//fastly.jsdelivr.net/gh/xiaolongmr/image/js/jquery.js></script>");
document.writeln("        <script>");
document.writeln("            function judgeWidth() {");
document.writeln("                oLeftBar.style.left = 481 < document.documentElement.clientWidth ? 0 : \'-249px\'");
document.writeln("            }");
document.writeln("            var oMenu = document.getElementById(\'menu\'),");
document.writeln("                oLeftBar = document.getElementById(\'leftBar\'),");
document.writeln("                menuFrom = document.getElementById(\'menu-form\');");
document.writeln("            oMenu.onclick = function() {");
document.writeln("                oLeftBar.style.left = 0 == oLeftBar.offsetLeft ? \'-249px\' : 0");
document.writeln("            }, window.onresize = function() {");
document.writeln("                judgeWidth()");
document.writeln("            };");
document.writeln("            for (var oNavItem = document.getElementById(\'navItem\'), aA = oNavItem.getElementsByTagName(\'a\'), i = 0; i < aA.length; i++) aA[i].onclick = function() {");
document.writeln("                for (var e = 0; e < aA.length; e++) aA[e].className = \'\';");
document.writeln("                this.className = \'active\', 0 == oLeftBar.offsetLeft && document.documentElement.clientWidth <= 481 && (oLeftBar.style.left = \'-249px\', menuFrom.checked = !1)");
document.writeln("            };");
document.writeln("            $(window).scroll(function() {");
document.writeln("                200 <= $(window).scrollTop() ? $(\'#gototop\').fadeIn(300) : $(\'#gototop\').fadeOut(300)");
document.writeln("            }), $(\'#gototop\').click(function() {");
document.writeln("                $(\'html,body\').animate({");
document.writeln("                    scrollTop: \'0px\'");
document.writeln("                }, 800)");
document.writeln("            });");
document.writeln("        </script>");
document.writeln("        <!-- 网页背景 -->");
document.writeln("        <script src=//fastly.jsdelivr.net/npm/typecho_joe_theme@4.4.5/assets/background/background1.min.js></script>");
document.writeln("        <!--  -->");