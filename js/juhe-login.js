// 聚合登录跳转脚本（Vercel后端代理版）
window.juheLogin = function (type = 'qq') {
    const redirect_uri = encodeURIComponent(window.location.origin + '/juhe-callback.html');
    fetch(`/api/juhe-login-proxy?type=${type}&redirect_uri=${redirect_uri}`)
        .then(res => res.json())
        .then(data => {
            if (data.code === 0 && data.url) {
                window.location.href = data.url;
            } else {
                alert('获取登录地址失败: ' + (data.msg || '未知错误'));
            }
        })
        .catch(err => {
            alert('聚合登录接口请求失败: ' + err);
        });
}; 