// 聚合登录跳转脚本（自动切换本地/线上跳转）
window.juheLogin = function (type = 'qq') {
    const appid = '1011';
    const appkey = '3d8c4745ba1286a5d0d52b0015c0f8a2';
    const redirect_uri = encodeURIComponent(window.location.origin + '/juhe-callback.html');
    const apiUrl = `https://log.az0.cn/connect.php?act=login&appid=${appid}&appkey=${appkey}&type=${type}&redirect_uri=${redirect_uri}`;
    const isLocal = [
        'localhost',
        '127.0.0.1',
        '127.0.0.1:5501'
    ].some(h => location.host === h || location.hostname === h);
    if (isLocal) {
        // 本地开发直接跳API（会看到json但能调试）
        window.location.href = apiUrl;
    } else {
        // 线上用fetch拿url字段再跳转
        fetch(apiUrl)
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
    }
}; 