<?php
    header('Content-Type:text/html; charset=utf-8');

    //GET 방식으로 전달받은 검색어 query
    $query= $_GET['query'];

    //php 에서 다른 서버에 HTTP Request를 수행하는 curl 라이브러리 [ client url : CLI에서 HTTP통신 명령어 ]
    $encQuery= urlencode($query); // GET으로 검색어 요청파라미터를 전송하기 위해 인코딩
    $url= "https://openapi.naver.com/v1/search/blog?query=" . $encQuery;

    //1. curl 작업시작 - 초기화
    $ch = curl_init();

   
    //2. curl 옵션 설정 
    curl_setopt($ch, CURLOPT_URL, $url);             // 2.1 접속 url
    curl_setopt($ch, CURLOPT_POST, false);           // 2.2 post 방식인지 여부
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  // 2.3 응답 결과를 되돌려 받를 것인지 여붜

    // 2.4 해더 정보  - naver search open api에 접속할때 필요한 인증값. 
    // naver 개발자 사이트에 application 등록하면 발급되는 id, secret 값. ~ 등록할 때 사용환경 [web선택 - url ~ http://mrhi2024.dothome.co.kr  [대표 url까지만 등록 - sub pass 까지는 표시하지 않음] ]
    $client_id = "yauZrZiXn0rTX7wviAo3";   
    $client_secret = "febCk0N52b";

    $headers = array(); //헤더정보를 저장할 빈 배열
    $headers[] = "X-Naver-Client-Id: ".$client_id;          //별도의 인덱스번호가 없으면 마지막에 추가
    $headers[] = "X-Naver-Client-Secret: ".$client_secret;  //별도의 인덱스번호가 없으면 마지막에 추가
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    // 2.5 POST방식으로 넘길 데이터(JSON데이터) 가 있다면..아래처럼...CURLOPT_POSTFIELDS
    //curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
    

    //3. curl_작업 실행
    $response= curl_exec($ch);
    echo $response; //응답 결과 echo. [client react web으로 응답]

   
    //4. curl 닫기
    curl_close($ch);
?>