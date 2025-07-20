// /api/juhe-login-proxy.js
export default async function handler(req, res) {
    const { type, redirect_uri } = req.query;
    const appid = '1011';
    const appkey = '3d8c4745ba1286a5d0d52b0015c0f8a2';
    const url = `https://log.az0.cn/connect.php?act=login&appid=${appid}&appkey=${appkey}&type=${type}&redirect_uri=${redirect_uri}`;
    const juheRes = await fetch(url);
    const juheData = await juheRes.json();
    res.status(200).json(juheData);
} 