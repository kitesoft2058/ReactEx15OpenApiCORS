const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        '/naver', //proxy가 필요한 path parameter -- 경로가 /naver/ 로 시작하면 아래 target 도메일 서버로 인식해라...
        createProxyMiddleware({
            target: 'https://m.search.naver.com', //타겟이 되는 api url
            pathRewrite:{
                '^/naver': '' // fetch() 할때 '/naver'이라는 경로를 만나면 ''빈 글씨로 바꿔라.. [여러 프록시서버를 등록할 때 어떤 프록시를 원하는지 구별하기 위해..naver 을 사용했던 것이니 실제로는 필요 없는 경로]
            },
            changeOrigin: true, // 서버 구성에 따른 호스트 헤더 변경 여부 설정
            }
        )
    )

    //만약, 다른 호스트 도메인을 추가로 프록시서버로 등록하려면..
    app.use(
        '/다른context',
        createProxyMiddleware({
            target: 'https://다른호스트',
            pathRewrite: {
                '^/지우려는패스':''
            },
            changeOrigin: true
            }
        )
    )
}