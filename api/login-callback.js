// /api/login-callback.js
export default async function handler(req, res) {
    const { code, type } = req.query;
    const appid = '1011';
    const appkey = '3d8c4745ba1286a5d0d52b0015c0f8a2';
    const url = `https://log.az0.cn/connect.php?act=callback&appid=${appid}&appkey=${appkey}&type=${type}&code=${code}`;
    const juheRes = await fetch(url);
    const juheData = await juheRes.json();
    if (juheData.code === 0) {
        res.status(200).json({
            code: 0, user: {
                nickname: juheData.nickname,
                avatar: juheData.faceimg,
                social_uid: juheData.social_uid,
                type: juheData.type
            }
        });
    } else {
        res.status(200).json({ code: 1, msg: juheData.msg });
    }
} 