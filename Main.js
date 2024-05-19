const Main= ()=>{

    //(실습1)
    const client_id= ''
    const client_secret=''

    const clickBtn= ()=>{       
        // 1) cors 문제발생 테스트
        // fetch('https://openapi.naver.com/v1/search/blog.json',{
        //     method:'GET',
        //     headers:{
        //         "X-Naver-Client-Id": client_id,
        //         "X-Naver-Client-Secerit" : client_secret                
        //     }
        // }).then(res=>res.text()).then(text=>alert(text)).catch(e=>alert(e.message))

        // // "proxy" 를 통해 경로를 브라우저가 다르게 인식하도록 하는 기법. 
        // 2) proxy 로 해결 - https://openapi.naver.com 은 package.json 에 등록되어 있으니. 이후 path 부터만 작성하면 됨. 
        fetch('/v1/search/blog.json',{
            method:'GET',
            headers:{
                "X-Naver-Client-Id": client_id,
                "X-Naver-Client-Secerit" : client_secret                
            }
        }).then(res=>res.text()).then(text=>alert(text)).catch(e=>alert(e.message))
         
        //  다만, 1개의 도메인만 프록시서버로 등록이 가능함. 
        //  이를 해결하기 위해 나온 http-proxy-middleware 라이브러리. 
        //  여러 도메인을 제어할 수 있음. [ setupProxy.js ] 라는 파일을 통해 직접 프록시 루트 설정
        //  (네이버 검색 크롤링으로 실습 clickBtn2)
    }


    //(실습2)
    const clickBtn2= ()=>{
        // HTTP 크롤링 [크롤링(crawling) 은 웹 페이지를 그대로 가져와서 거기서 데이터를 추출해 내는 행위]
        // 크롤링(Crawling) 또는 스크래핑(Scraping)으로 혼동해서 쓰는 경우가 많이 있습니다. 크롤링은 개인 혹은 단체에서 필요한 데이터가 있는 웹(Web)페이지의 구조를 분석하고 파악하여 긁어옵니다
        // robots.txt를 통해 접근범위가 어디까지 가능한지 확인

        // 1) '검색어 : 코스피 지수'
        // const url= 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%BD%94%EC%8A%A4%ED%94%BC+%EC%A7%80%EC%88%98'
        // fetch(url).then(res=>res.text()).then(text=>alert(text)).catch(e=>alert(e.message))

        // 2) http-proxy-middleware 라이브러리로 해결 - install  &   setupProxy.js 파일명으로 프록시 루트 설정(파일만 만들고 내용 작성을 안하면 브라우저에서 실행안됨)
        // const url= '/naver/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%BD%94%EC%8A%A4%ED%94%BC+%EC%A7%80%EC%88%98'
        // fetch(url).then(res=>res.text()).then(text=>alert(text)).catch(e=>alert(e.message))

        // 3) HTML parsing 방법.. [개발자모드를 통해 요소구조를 파악하고 식별할 값을 인식하여 DOM 제어하듯이 값 취득. - 읽어온 html을 마치 내 document인양 해석하면 됨]
        //                    [주의!! 개발자 모드의 [요소]통해 보는 html과 fetch() 네트워크를 통해 응답받은 html은 다른 구조를 가질 수도 있음. 정확한 것은 network 탭의 해당 요청문서를 클릭하여 응답항목의 html을 보고 작업]
        // 코스피 지수 값 파싱하여 출력해보기..
        const url= '/naver/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%BD%94%EC%8A%A4%ED%94%BC+%EC%A7%80%EC%88%98'
        fetch(url)
        .then(res=>res.text())
        .then(text=>{
            //alert(text) // 다이얼로그는 긴글을 모두 보여주지 못함. 개발자도구의 [network]탭에서 해당요청을 클릭하여 [response]항목을 보면 html을 모두 구조적으로 볼수 있음. 들여쓰기가 잘 되어 있음.
            // 읽어온 글씨를 DOM 모델로 만들기
            const dom= new DOMParser()
            const doc= dom.parseFromString(text, 'text/html')  //두번째 파라미터 : mimeType
            // const es= doc.querySelectorAll('.price') // price라는 클래스 선택자를 이용하여 요소찾기
            // alert( es[0].innerHTML )
            const e= doc.querySelector('.price') // price라는 클래스 명이 한개뿐이어서.. 다중 찾기를 하지 않아도 됨. 만약, 여러개면 첫번째 요소가 찾아짐.
            alert( e.innerHTML )
        })
        .catch(e=>alert(e.message))

    }


    // (실습3)
    const clickBtn3= ()=>{
        // 닷홈 서버에 호스팅 하고 backend로 php curl 작업 수행
        let query= '리액트'  //검색어
        const url= './backend/naver_search.php?query=' + query

        fetch(url).then(res=>res.text()).then(text=>alert(text)).catch(e=>alert(e.message))

        // 프로젝트폴더 root 위치에 backend 폴더 안에 naver_search.php 파일 만들고 curl 작업.
        // 완성 후 빌드 후 배포하여 데스트하기 
    }

    // [과제. '코스피 지수' 에 대한 웹 크롤링 작업을 서드파티 서버를 통해 요청해보기! ]
    const clickBtn4=()=>{
        // naver search http web crawling.
    }

    return (
        <div style={{padding:16}}>
            
            <h2>OPEN API - CORS</h2>

            {/* (실습1) naver search open api  [ json parsing ]*/}
            <button onClick={clickBtn}>naver search open api</button>
            <hr></hr>

            {/* (실습2) naver search web crawling [ http parsing ]*/}
            <button onClick={clickBtn2}>naver search web crawling</button>
            <hr></hr>    

            {/* 위 2가지 방법 모두 실제 빌드하여 호스팅서버에 배포하면 404에러 발생. 개발모드에서만 동작함. - network탭의 해당 문서요청을 선택하여 헤더 정보를 보면 요청 URL이 현재 업로드된 서버 도메인으로 되어 있음. */}
            {/* 배포모드에서도 동작하려면.. */}
            {/* 1) 프록시서버 설정을 할 수 있는 호스팅 서버 사용 - Netlify[네트리파이] - 무료 정적 호스팅 서버 (파일 업로드로 배포가능, Github 저장소와 연동 가능) - 정적 웹 호스팅만 가능 */}
            {/* 2) 3rd-party server(Dothome)를 중계 서버로 활용 - php curl 로 요청. */}

            {/* (권장은 2). 호스팅 서버의 프록시 설정을 수정하지 못하는 상황이 있을 수도 있기에..[dotome hosting server는 못함] */}
            <button onClick={clickBtn3}>naver search open api -- via php dothome server</button> 
            <hr></hr>

            {/* [ ## 과제 ## ] '코스피 지수' 에 대한 웹 크롤링 작업을 서드파티 서버를 통해 요청해보기! */}
            <button onClick={clickBtn4}>naver search web crawling -- via php dothome server</button> 
            
        </div>
    )
}
export default Main