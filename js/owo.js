"use strict"; // 启用严格模式，提高代码的安全性和执行效率

// 定义一个辅助函数 _createClass，用于创建类的方法和静态属性
var _createClass = function () {
    // 辅助函数 defineProperties，用于将属性定义到目标对象上
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) { // 遍历属性数组
            var descriptor = props[i]; // 获取当前属性描述符
            descriptor.enumerable = descriptor.enumerable || false; // 设置属性是否可枚举
            descriptor.configurable = true; // 设置属性是否可配置
            if ("value" in descriptor) descriptor.writable = true; // 如果属性描述符中有 value 属性，则设置其可写性
            Object.defineProperty(target, descriptor.key, descriptor); // 将属性定义到目标对象上
        }
    }

    // 返回一个函数，用于将方法和静态属性定义到构造函数和原型上
    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps); // 定义原型属性
        if (staticProps) defineProperties(Constructor, staticProps); // 定义静态属性
        return Constructor; // 返回构造函数
    };
}();

// 辅助函数 _classCallCheck，用于检查类的实例化
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) { // 如果 instance 不是 Constructor 的实例
        throw new TypeError("Cannot call a class as a function"); // 抛出类型错误
    }
}

// 使用立即执行函数表达式 (IIFE) 创建 OwO 类
(function () {
    var OwO = function () {
        // OwO 类的构造函数
        function OwO(option) {
            var _this = this;

            _classCallCheck(this, OwO); // 检查类的实例化

            // 定义默认选项
            var defaultOption = {
                logo: 'OwO表情',
                container: document.getElementsByClassName('OwO')[0],
                target: document.getElementsByTagName('textarea')[0],
                position: 'up',
                width: '100%',
                maxHeight: '235px',
                api: 'https://dh.z-l.top/js/owo.json'
            };

            // 合并用户传入的选项和默认选项
            for (var defaultKey in defaultOption) {
                if (defaultOption.hasOwnProperty(defaultKey) && !option.hasOwnProperty(defaultKey)) {
                    option[defaultKey] = defaultOption[defaultKey];
                }
            }

            // 初始化实例属性
            this.container = option.container;
            this.target = option.target;

            // 根据选项设置容器的类
            if (option.position === 'up') {
                this.container.classList.add('OwO-up');
            }

            // 创建 XMLHttpRequest 对象
            var xhr = new XMLHttpRequest();

            // 设置请求状态变化的回调函数
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) { // 请求完成
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                        _this.odata = JSON.parse(xhr.responseText); // 解析 JSON 数据

                        _this.init(option); // 初始化 OwO
                    } else {
                        console.log('OwO data request was unsuccessful: ' + xhr.status); // 请求失败
                    }
                }
            };

            // 打开请求并发送
            xhr.open('get', option.api, true);
            xhr.send(null);
        }

        // 使用 _createClass 定义 OwO 类的方法
        _createClass(OwO, [{
            key: 'init',
            value: function init(option) {
                var _this2 = this;

                this.area = option.target;
                this.packages = Object.keys(this.odata); // 获取表情包的键

                // 生成 HTML 内容
                var html = '\n <div class="OwO-logo">' + option.logo + '</div>\n <div class="OwO-body" style="width: ' + option.width + '">';

                // 遍历表情包，生成表情列表
                for (var i = 0; i < this.packages.length; i++) {
                    html += '\n <ul class="OwO-items OwO-' + this.odata[this.packages[i]].name + ' OwO-items-' + this.odata[this.packages[i]].type + '" style="max-height: ' + (parseInt(option.maxHeight) - 53 + 'px') + ';">';
                    var opackage = this.odata[this.packages[i]].container;

                    // 遍历表情包中的每个表情
                    for (var _i = 0; _i < opackage.length; _i++) { // 遍历当前表情包中的所有表情
                        if (this.odata[this.packages[i]].type === 'image') { // 如果当前表情包的类型是 'image'
                            html += '\n <li class="OwO-item" title="' + opackage[_i].text + '" data-input="' + this.odata[this.packages[i]].name + "/" + opackage[_i].icon + '">' + '<img data-original="' + 'https://emoticons.z-l.top/' + this.odata[this.packages[i]].name + "/" + opackage[_i].icon + '.png" src="" icon="' + opackage[_i].text + '"></li>';
                            // 追加一个新的 <li> 元素到 html 变量中，表示一个图片表情项
                            // - class="OwO-item" 设置表情项的类名
                            // - title="' + opackage[_i].text + '" 设置表情项的标题（悬停时显示的提示）
                            // - data-input="' + this.odata[this.packages[i]].name + ":" + opackage[_i].icon + '" 设置自定义属性 data-input，用于插入到文本域中的内容
                            // - <img> 元素用于显示图片表情
                            //   - data-original="' + 'https://emoticons.z-l.top/' + this.odata[this.packages[i]].name + "/" + opackage[_i].icon + '.png"' 设置图片的原始 URL（懒加载时使用）
                            //   - src="" 图片初始 src 为空，懒加载时会动态加载
                            //   - icon="' + opackage[_i].text + '" 设置自定义属性 icon，用于存储表情的文字表示
                        } else if (this.odata[this.packages[i]].type === 'cat') { // 如果当前表情包的类型是 'image'
                            html += '\n <li class="OwO-item" title="' + opackage[_i].text + '" data-input="' + this.odata[this.packages[i]].name  + opackage[_i].icon + '">' + '<img data-original="' + 'https://npm.elemecdn.com/blobcat@1.0.0' + "/" + opackage[_i].icon + '.png" src="" icon="' + opackage[_i].text + '"></li>';
                        } else if (this.odata[this.packages[i]].type === 'bb_') { // 如果当前表情包的类型是 'image'
                            html += '\n <li class="OwO-item" title="' + opackage[_i].text + '" data-input="' + this.odata[this.packages[i]].name + opackage[_i].icon + '">' + '<img data-original="' + 'https://unpkg.com/@waline/emojis@1.1.0/bilibili/bb_' + opackage[_i].icon + '.png" src="" icon="' + opackage[_i].text + '"></li>';
                        } else {
                            html += '\n <li class="OwO-item" title="' + opackage[_i].text + '">' + opackage[_i].icon + '</li>';
                            // 追加一个新的 <li> 元素到 html 变量中，表示一个文字表情项
                            // - class="OwO-item" 设置表情项的类名
                            // - title="' + opackage[_i].text + '" 设置表情项的标题（悬停时显示的提示）
                            // - 直接插入 opackage[_i].icon 表情的文字表示
                        }
                    }


                    html += '\n </ul>';
                }

                // 生成表情包选项卡
                html += '\n <div class="OwO-bar">\n <ul class="OwO-packages">';

                for (var _i2 = 0; _i2 < this.packages.length; _i2++) {
                    html += '\n <li><span>' + this.packages[_i2] + '</span></li>';
                }

                html += '\n </ul>\n </div>\n </div>\n ';
                this.container.innerHTML = html; // 设置容器的 HTML 内容

                // 绑定事件
                this.logo = this.container.getElementsByClassName('OwO-logo')[0];
                this.logo.addEventListener('click', function () {
                    _this2.toggle();
                });

                this.container.getElementsByClassName('OwO-body')[0].addEventListener('click', function (e) {
                    var target = null;

                    // 判断点击的是表情项还是表情项的子元素
                    if (e.target.classList.contains('OwO-item')) {
                        target = e.target;
                    } else if (e.target.parentNode.classList.contains('OwO-item')) {
                        target = e.target.parentNode;
                    }

                    if (target) {
                        // 获取光标位置
                        var startPos = _this2.area.selectionStart;
                        var endPos = _this2.area.selectionEnd;
                        var areaValue = _this2.area.value;
                        var insertContent;

                        // 插入表情文本或图像标记
                        if (target.dataset.hasOwnProperty("input")) {
                            insertContent = "【" + target.dataset.input + "】";
                        } else {
                            insertContent = target.innerHTML;
                        }

                        _this2.area.value = areaValue.slice(0, startPos) + insertContent + areaValue.slice(endPos); // 插入表情
                        _this2.area.selectionStart = startPos + insertContent.length;
                        _this2.area.selectionEnd = startPos + insertContent.length;
                        _this2.area.focus(); // 聚焦到光标位置

                        _this2.toggle(); // 切换 OwO 状态
                    }
                });

                this.packagesEle = this.container.getElementsByClassName('OwO-packages')[0];

                // 绑定选项卡点击事件
                var _loop = function _loop(_i3) {
                    (function (index) {
                        _this2.packagesEle.children[_i3].addEventListener('click', function () {
                            _this2.tab(index);
                        });
                    })(_i3);
                };

                for (var _i3 = 0; _i3 < this.packagesEle.children.length; _i3++) {
                    _loop(_i3);
                }

                this.tab(0); // 默认选中第一个表情包
            }
        }, {
            key: 'toggle',
            value: function toggle() {
                // 切换 OwO 容器的显示状态
                if (this.container.classList.contains('OwO-open')) {
                    this.container.classList.remove('OwO-open');
                } else {
                    this.container.classList.add('OwO-open');
                }

                // 懒加载该区域类的图片
                try {
                    $("img").lazyload({
                        effect: "fadeIn"
                    });
                } catch (e) {
                    if (this.container.classList.contains("OwO-open")) {
                        var a = this.container.querySelectorAll(".OwO-items.OwO-items-show>li img");
                        [].forEach.call(a, function (a) {
                            var b = a.dataset.original;
                            b && (a.src = b, a.removeAttribute("data-src"));
                        });
                    }
                }
            }
        }, {
            key: 'tab',
            value: function tab(index) {
                // 切换选项卡显示的表情包
                var itemsShow = this.container.getElementsByClassName('OwO-items-show')[0];

                if (itemsShow) {
                    itemsShow.classList.remove('OwO-items-show');
                }

                this.container.getElementsByClassName('OwO-items')[index].classList.add('OwO-items-show'); // 切换选项卡的选中状态

                var packageActive = this.container.getElementsByClassName('OwO-package-active')[0];

                if (packageActive) {
                    packageActive.classList.remove('OwO-package-active');
                }

                this.packagesEle.getElementsByTagName('li')[index].classList.add('OwO-package-active'); // 懒加载该区域类的图片

                try {
                    $("img").lazyload({
                        effect: "fadeIn"
                    });
                } catch (e) {
                    if (this.container.classList.contains("OwO-open")) {
                        var a = this.container.querySelectorAll(".OwO-items.OwO-items-show>li img");
                        [].forEach.call(a, function (a) {
                            var b = a.dataset.original;
                            b && (a.src = b, a.removeAttribute("data-original"));
                        });
                    }
                }
            }
        }]);

        return OwO; // 返回 OwO 类
    }();

    // 判断模块环境，导出 OwO 类
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = OwO;
    } else {
        window.OwO = OwO;
    }
})();


