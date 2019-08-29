# Javascript SDK(bigin.js) 설치



## 기본 추적 스크립트(bigin.js) 설치

1. 추적 스크립트는 프로젝트마다 발행되는 고유의 추적 ID가 명시되어야만 작동합니다. 프로젝트 생성을 완료하면 bigin.js를 사용할 수 있는 추적코드가 생성됩니다.
2. 아래의 설명에 따라 추적 ID를 찾습니다. 추적 코드 스니펫에 이 추적 ID를 사용합니다.
3. bigin.js 추적 코드 스크립트를 복사하여 추적할 각 웹페이지에 삽입합니다. 각 페이지의 시작 태그인 <head></head> 태그 상단에 추적 코드 스크립트를 추가합니다.



웹사이트의 SDK의 경우 구글 태그매니저(GTM)의 설치를 지원합니다. 구글 태그매니저의 설치방법은 [여기](http://support.bigin.io/pages/detail.html?kind=installation_gtm#installaion_gtm_0)를 참고하세요. 


### 추적 ID 찾기

추적 ID를 찾으려면 다음 단계를 따르세요.

1. [대시보드](https://insight.bigin.io) 에 로그인 합니다.
2. **프로젝트 설정 > 프로젝트 정보** 를 클릭합니다.
3. 추적 ID가 페이지 상단에 표시됩니다.

사이트의 각 페이지에서 <head></head> 태그 사이에 다음 스니펫을 삽입합니다. 다음과 같이 `projectID` 가 실제 프로젝트의 추적ID와 같도록 변경합니다.



### 추적 코드 스니펫

```javascript
<script>
    (function (w, d, s, l, i, c) {
      var f = d.getElementsByTagName(s)[0], j = d.createElement(s);
      j.async = true;
      j.src = "https://sdk.bigin.io/v1/bigin.sdk.js"; 
      var u = navigator.userAgent.toLowerCase(), h = {
        projectID: i,
        currencyCode: c
      };
      if ((u.indexOf('msie') !== -1) && parseInt(u.split('msie')[1]) < 9) {
        var r = setInterval(function () {
          if (w[l] !== undefined) {
            clearInterval(r);
            w[l].config(h);
          }
        }, 50);
      } else {
        j.onload = function () {
          w[l].config(h)
        };
      }
      f.parentNode.insertBefore(j, f);
    })
    (window, document, 'script', 'bigin', '프로젝트 ID', "KOR");
</script>
```
위의 스니펫은 해당 웹사이트에 bigin.js 를 비동기적으로 삽입합니다.

모든 추적은 추적코드 스니펫이 기술된 biginScript 스크립트가 로드된 이후부터 가능합니다.

추적데이터를 서버로 전송하는 코드는 biginScript가 로드된 시점 이후부터 호출되어야 합니다.






### 데이터 수집의 허용

bigin SDK는 선택적으로 기본적인 사용자 행동을 추적할 수 있습니다. 아래에서 선택적으로 추적되는 추적항목을 확인하세요.

```javascript         
// 기본 추적 스니펫에서 추적 항목 설정
<script>   
    (function (w, d, s, l, i, c) {
      var f = d.getElementsByTagName(s)[0], j = d.createElement(s);
      j.async = true;
      j.src = 'https://sdk.bigin.io/v1/bigin.sdk.js’; 
      var u = navigator.userAgent.toLowerCase(), h = {
        projectID: i,
        currencyCode: c
      };
      if ((u.indexOf('msie') !== -1) && parseInt(u.split('msie')[1]) < 9) {
        var r = setInterval(function () {
          if (w[l] !== undefined) {
            clearInterval(r);
            w[l].config(h);
          }
        }, 50);
      } else {
        j.onload = function () {
          w[l].config(h)
        };
      }
      f.parentNode.insertBefore(j, f);
    })
    (window, document, 'script', 'bigin', '프로젝트 ID', "KOR");
</script>  
```

```javascript
// 아래의 코드처럼 개별적인 추적 항목 설정도 가능합니다. 
(function() {
    bigin.track('session');
    bigin.track('view');
    bigin.track('click');
    bigin.track('scroll');
})();
```

| 키        | 설명                                                         |
| --------- | ------------------------------------------------------------ |
| `session` | 사용자 방문의 단위를 수집합니다. 사용자의 방문당 행동을 구분하기 위하여 이 데이터의 추적을 권장합니다. |
| `view `   | 페이지 조회를 수집합니다. SPA(Single Page Application)의 경우 별도의 페이지 추적 설정이 필요합니다. [SPA의 페이지 조회 수집](#) |
| `click`   | 마우스로 클릭하는 모든 클릭이벤트를 수집합니다. *클릭이벤트의 수집은 실행되는 이벤트의 추적과는 무관합니다. 사용자가 클릭한 특정 이벤트를 알기 위해서는 [커스텀 이벤트 추적](#) 을 사용합니다. |
| `scroll`  | 사용자의 스크롤 이벤트를 수집합니다.                         |

### SPA(Single Page Application)의 페이지 조회 수집

단일 페이지 어플리케이션 (SPA; Single Page Application) 으로 개발된 웹사이트의 경우, 페이지 조회 이벤트의 별도 추적이 필요합니다.

```javascript

(function() {
    bigin.track('views', {
        page : '/productDetail/12345' // (옵션) pagePath 또는 window.location.pathname 로 추적합니다.
    });
})();
```



### 현지 통화의 설정

[ISO 4217 기반 화폐단위](https://www.nationsonline.org/oneworld/currencies.htm) 를 나타내는 코드로 수집 데이터 중 발생하는 수익의 현지 통화를 나타냅니다. 현지 통화를 설정하는 방법은 아래와 같으며, 몇가지 방법에 대한 우선 순위 적용은 다음 순서에 따릅니다.

1. 기본 추적코드 (bigin.js)에서 `currencyCode` 설정
2. 기본 설정에 따라 **대한민국 통화(KRW)** 로 설정

```javascript
// 기본 추적 스니펫에서 현지 통화의 설정
<script>
    (function (w, d, s, l, i, c) {
      var f = d.getElementsByTagName(s)[0], j = d.createElement(s);
      j.async = true;
      j.src = 'https://sdk.bigin.io/v1/bigin.sdk.js’; 
      var u = navigator.userAgent.toLowerCase(), h = {
        projectID: i,
        currencyCode: c
      };
      if ((u.indexOf('msie') !== -1) && parseInt(u.split('msie')[1]) < 9) {
        var r = setInterval(function () {
          if (w[l] !== undefined) {
            clearInterval(r);
            w[l].config(h);
          }
        }, 50);
      } else {
        j.onload = function () {
          w[l].config(h)
        };
      }
      f.parentNode.insertBefore(j, f);
    })
    (window, document, 'script', 'bigin', '프로젝트 ID', '프로젝트 currencyCode');
</script>
```

```javascript
// 아래의 코드처럼 개별적인 통화 설정도 가능합니다.
(function() {
    bigin.config({
        currencyCode : "KRW"
    });
})();
```

<span class="end-point"></span>
## 고유 사용자 식별



### 로그인 사용자 식별

bigin은 로그인 또는 회원가입 등의 단계에서 회원의 고유한 정보를 추적하여, 이커머스 및 웹사이트에서 사용자의 행동 이벤트를 고유 사용자의 행동으로 처리할 수 있도록 고유 사용자를 식별하여 추적합니다. 로그인을 통한 사용자 중심의 분석은 다양한 비즈니스 접점을 한 명의 사용자로서 식별하기 때문에 사용자 중심의 행동 파악과 경로를 통한 분석을 할 수 있습니다.

사용자의 세션이 생성될 때 사용자의 고유 ID가 발급되며, 로그인, 회원정보 입력 과 같은 고유한 사용자로 식별할 수 있는 이벤트가 실행될 때 사용자의 프로파일을 매칭합니다. SDK 설치 과정에서 아래와 같이 `userID` 와 `email` 을 설정해야 합니다.

| 키       | 설명                                                         |
| -------- | ------------------------------------------------------------ |
| `userID` | 사용자의 고유 식별 ID. 별도의 수집 설정을 하지 않을 경우 bigin에서 발급되는 고유 ID로 식별합니다. |
| `email`  | ***필수** 사용자의 이메일 주소.                              |

```javascript
(function() {
    bigin.user("profile",{
        'userID': 'User 1', // bigin에서 발급되는 고유 ID 외에 별도의 ID로 사용자를 식별할 수 있습니다.
        'email': 'support@bigin.io', // (필수) 사용자의 이메일
        'name': '홍길동', // 이름
        'nickname': '길동이', // 닉네임
        'phoneNumber': '025063944', // 집 전화번호
        'phoneCell': '01011112222', // 휴대폰 전화번호
        'gender': 'Male', // 성별
        'birth': '1990', // 생년
        'address': '서울시 강남구 선릉로 90길 36 미소빌딩 8층 Big Insight', // 주소
        'property': 'value' // 고유 사용자의 별도 속성 값을 기입합니다. string 또는 number
    });
})();
```

위와 같이  별도의 회원의 고유한 속성을 수집하여 맞춤 프로파일을 구성할 수 있습니다.



### 복수 계정 사용자의 추적

한 세션 안에서 로그인하지 않은 상태의 행동과 로그인 후의 행동은 로그인 사용자의 행동으로 통합됩니다. 만약 세션 안에서 한 계정 외에 다른 계정의 로그인이 복수로 발생할 경우 마지막 로그인 사용자의 계정에 이전 데이터가 모두 속하게 됩니다.

위와 같은 문제를 해결하기 위해서는 로그인 사용자의 연결을 끊을 수 있는 행동(로그아웃 등.)에 아래의 스니펫을 추가하여 기존 로그인 사용자의 세션을 종료하여야 합니다.

```javascript
(function() {
    bigin.user("logout");
})();
```



### 모바일 사용자의 위치정보 수집

bigin이 사용자 위치를 수집하는 방법은 IP에 기반한 주소로 수집입니다. 더 정확한 위치의 수집이 필요한 경우에는 모바일에서 접속한 사용자의 위도와 경도를 수집할 수 있습니다. 아래의 스니펫을 <head></head> 태그 사이에 추가하세요. 사용자의 위치정보 수집을 묻고, 사용자가 이를 허용한다면 사용자의 현재 위치의 위도와 경도 데이터를 수집하여 저장할 수 있습니다.

```javascript
(function() {
    bigin.user("location"); // 기본 추적코드에 함께 있는 옵션입니다. 별도 적용 또는 기본추적코드의 trackLocation 을 true 로 허용하세요.
})();
```


<span class="end-point"></span>
## 커스텀 이벤트 추적



### 커스텀 이벤트

이벤트는 웹 페이지 또는 화면로드와 독립적으로 추적할 수있는 컨텐츠와의 사용자 상호 작용입니다. 커스텀 이벤트는 대부분의 bigin 보고서의 기초이며, 사용자가 웹사이트 또는 제품과 상호작용하는 방식을 이해하는데 필수적인 요소입니다. 

추적을 시작하기 전에 하나의 이벤트를 추적하여 bigin에서 이벤트를 수집, 저장 및 보여주는 형태를 이해하세요. 먼저 커스텀 이벤트의 기본 구조는 아래의 스니펫과 같습니다.

```javascript
bigin.event("eventName");
```



### 커스텀 이벤트의 속성 수집

bigin.js 에서는 모든 커스텀 이벤트의 속성을 나누어 이벤트의 속성을 보고서의 측정기준으로 수집할 수 있습니다. 커스텀 이벤트의 속성을 추가하면 웹페이지에서 발생할 수 있는 여러가지 상황을 하나의 이벤트 스크립트로 설정할 수 있습니다. 속성을 추가하는 경우 아래의 스니펫 구조를 참고하세요. 

```javascript
bigin.event("eventName" , {
    'property' : 'value' // 이벤트의 속성(측정기준)
});
```

커스텀 이벤트의 속성을 추가하기 위해서는 다음 순서에 따라 진행하세요.

1. bigin.event("eventName") 의 **eventName(이벤트 이름)** 을 설정하세요.
2. **eventName** 의 추가로 수집할 데이터 요소를 계획하고 속성데이터를 추가하세요.

커스텀 이벤트의 예제는 아래와 같습니다.

```javascript
bigin.event("customSearchEvent" ,{ // 이벤트명
    'category' : 'shoes',
    'color' : ['red','black'],
    'brand' : 'brandName',
    'size' : ['265','270'],
    'keyword' : '스니커즈'
});
```



### 이벤트 수집 확인

커스텀 이벤트의 수집은 아래의 단계로 확인할 수 있습니다.

1. 계정이 소유한 이벤트를 설치한 프로젝트의 **라이브** 보고서로 이동합니다.
2. 웹사이트에서 해당 커스텀이벤트를 발생시킵니다.
3. 라이브 보고서에서 정상적으로 이벤트가 수집되는 지 확인합니다.

<span class="end-point"></span>

## 이커머스 추적



### 개요

이커머스 추적을 사용하면 웹사이트에서 발생하는 거래 및 수익을 측정할 수 있습니다. 일반적인 이커머스 사이트에서 사용자의 구매 행동을 거래를 수행하는 웹 서버로 전송됩니다.

**제품 구매** 버튼의 클릭 외에도 장바구니, 제품의 노출, 체크아웃 등 전반적인 구매 상호작용을 추적하고 보고서로 나타낼 수 있습니다.

이커머스를 추적하는 것은 커스텀 이벤트의 추적과 크게 다르지 않습니다. 이커머스 추적은 상품 고유 ID와 거래 ID로 사용자의 구매행동을 식별하여 개별 사용자의 구매 여정을 분석할 수 있습니다.

bigin.js를 사용하여 보낼 수있는 이커머스 데이터 유형은 **구매활동 이벤트 및 노출 데이터, 제품 데이터, 리뷰 데이터 ** 입니다.



### 구매 활동 이벤트

사용자의 제품 구매 활동을 측정하는 추적 이벤트는 아래와 같습니다. 아래의 이벤트는 각각의 정의된 `key` 의 데이터를 수집하여, 행동을 측정합니다.

| 키                 | 설명                                    |
| ------------------ | --------------------------------------- |
| **bg:impression**  | 제품의 노출 및 게재위치.                |
| **bg:viewProduct** | 제품 세부정보 조회.                     |
| **bg:cart**        | 현재 장바구니 페이지의 상태를 업데이트. |
| **bg:addToCart**   | 장바구니에 하나 이상의 제품 추가.       |
| **bg:removeCart**  | 하나 이상의 제품 장바구니에서 삭제.     |
| **bg:checkout**    | 하나 이상의 제품 구매 단계.             |
| **bg:purchase**    | 하나 이상의 제품 구매.                  |
| **bg:refund**      | 하나 이상의 제품 환불.                  |
| **bg:review**      | 제품의 리뷰.                            |

### 제품 데이터

사용자가 어느 제품과의 상호작용이 이루어졌는지 수집하기 위한 데이터입니다. 제품의 객체를 수집하기 위한 키는 `products` 를 사용합니다.

| 키          | 필수   | 설명                                                         |
| ----------- | ------ | ------------------------------------------------------------ |
| `id`        | 예     | 제품 고유 ID                                                 |
| `name`      | 예     | 제품 이름 (예: Blue Jeans)                                   |
| `brand`     | 아니오 | 제품과 관련된 브랜드 (예: bigin)                             |
| `category`  | 아니오 | 제품 카테고리 (예: ACC). 하위 카테고리를 설정할 경우 배열로 데이터를 수집합니다. (예: 'ACC', 'RING', 'Gold') |
| `variant`   | 아니오 | 제품 변형/옵션 (예: 검정색, 265, XL 등...)                   |
| `price`     | 아니오 | 제품 가격 (예: 19200)                                        |
| `quantity`  | 아니오 | 제품 수량 (예: 정수)                                         |
| `coupon`    | 아니오 | 제품에 적용된 쿠폰 코드 (예: UP TO 50%)                      |
| `summary`   | 아니오 | 제품 설명 요약                                               |
| `thumbnail` | 아니오 | 제품의 대표 이미지. *제품과 관련된 보고서는 제품의 대표 이미지를 포함하여 구성합니다. |

### 노출 데이터

사용자가 웹페이지 내에서 어떤 경로에서 제품을 접하게 됬는지 수집하기 위한 노출 데이터입니다. 제품의 객체를 수집하기 위한 키는 `products` 를 사용합니다.

| 키         | 필수   | 설명                                                         |
| ---------- | ------ | ------------------------------------------------------------ |
| `id`       | **예** | 제품 고유 ID                                                 |
| `name`     | **예** | 제품 이름 (예: Blue Jeans)                                   |
| `brand`    | 아니오 | 제품과 관련된 브랜드 (예: bigin)                             |
| `category` | 아니오 | 제품 카테고리 (예: ACC). 하위 카테고리를 설정할 경우 배열로 데이터를 수집합니다. (예: 'ACC', 'RING', 'Gold') |
| `price`    | 아니오 | 제품 가격 (예: 19200)                                        |
| `list`     | 아니오 | 상품을 조회한 경로 (예 : 검색, 메인화면, 인기 상품 ..)       |
| `position` | 아니오 | 목록 또는 컬렉션에서 제품의 위치 (예 : 2)                    |

### 거래 데이터

사용자의 제품 구매 행동에 대한 수익 및 구매단계를 추적하기 위한 데이터입니다. 거래가 발생한 제품별 수익과 실적을 측정하기 위해서는 제품 객체 데이터를 필수로 추적하여야 합니다.

| 키            | 필수   | 설명                                                         |
| ------------- | ------ | ------------------------------------------------------------ |
| `id`          | **예** | 발생한 거래의 고유 ID. 구매활동 이벤트 `bg:purchase` 또는 `bg:refund` 일 때 필수로 작성합니다. (예: T12345) |
| `affiliation` | 아니오 | 이 거래가 발생한 상점 또는 제휴사. (예: Bigin Store)         |
| `revenue`     | **예** | 발생한 거래금액의 총 합계. (예: 364000)                      |
| `tax`         | 아니오 | 거래와 관련된 총 세금.                                       |
| `shipping`    | 아니오 | 거래의 배송비                                        |
| `coupon`      | 아니오 | 거래에 적용된 쿠폰.                                          |
| `products`    | **예** | 거래에 포함된 제품 데이터.                                   |
| `step`        | 아니오 | 구매의 단계를 나타내는 숫자입니다.                           |
| `option`      | 아니오 | 계산 및 구매의 옵션.                                         |

### 리뷰 데이터

사용자가 제품에 대한 평가를 남긴 리뷰(비정형 데이터)를 수집합니다. 

| 키        | 필수   | 설명                      |
| --------- | ------ | ------------------------- |
| `id`      | **예** | 리뷰 고유 ID (예: R12345) |
| `product` | **예** | 제품 고유 ID (예: P12345) |
| `score`   | 아니오 | 제품 리뷰 점수 (예: 4.5)  |
| `content` | 아니오 | 제품 리뷰의 내용.         |
<span class="end-point"></span>
## 이커머스 추적 예제



### 이커머스 활동 측정

일반적으로 이커머스 추적의 구현은 제품 노출 수 및 다음 작업 중 하나를 측정합니다.

* 제품의 링크 클릭
* 제품의 세부정보 보기
* 장바구니 조회.
* 장바구니에 추가 또는 장바구니에서 삭제.
* 구매 프로세스
* 제품 구매 및 환불



### 제품의 노출 또는 링크 클릭

이커머스 추적을 구현하기 위해서는 제품의 조회가 측정되어야 합니다. 일반적으로 제품 세부정보 페이지의 조회가 발생할 때 코드를 작동하며, 사용자가 제품을 조회할 때 서버로 전송하는 코드 스니펫의 예제는 아래와 같습니다. 

```javascript
bigin.event("bg:viewProduct",{
    'id' : 'P12345', // (필수) 제품의 고유 ID.
    'name' : 'Blue Jean', // (필수) 제품 이름.
    'category' : ['남성','하의','청바지'], // 제품의 카테고리. 하위 카테고리의 설정은 배열의 순서로 설정됩니다.
    'brand' : 'Bigin', // 제품과 관련된 브랜드
    'price' : 15400, // 제품의 가격
    'list' : '검색', // 제품을 조회한 경로 (예 : 검색, 메인화면, 인기 상품)
    'position' : '3',// 목록 또는 컬렉션의 제품 위치 (예 : 2) 
    'thumbnail' : ['imageUrl']
});
```

제품의 세부정보 페이지에서 조회한 경로(제품의 목록 또는 제품의 게재순서)를 가져오지 못 할 경우,사용자가 제품을 클릭할 때 **bg:impression** 이벤트를 작동하여 추적할 수 있습니다. 코드 스니펫의 예제는 아래와 같습니다.

```javascript
bigin.event("bg:impression",{
    'id' : 'P12345', // (필수) 제품의 고유 ID.
    'name' : 'Blue Jean', // (필수) 제품 이름.
    'category' : ['남성','하의','청바지'], // 제품의 카테고리. 하위 카테고리의 설정은 배열의 순서로 설정됩니다.
    'brand' : 'Bigin', // 제품과 관련된 브랜드
    'list' : '검색', // 제품을 조회한 경로 (예 : 검색, 메인화면, 인기 상품)
    'position' : '3',// 목록 또는 컬렉션의 제품 위치 (예 : 2) 
    'thumbnail' : ['imageUrl']
});
```



### 제품 장바구니에 추가

사용자가 특정 제품을 장바구니에 담는 행동을 추적하기 위해서는 장바구니 버튼에 별도의 추적이벤트 수집이 필요합니다. 장바구니에 상품을 추가할 때 적용되는 코드 스니펫의 예제는 아래와 같습니다.

```javascript
bigin.event("bg:addToCart",{
    'products':[
        {
            'id' : 'P12345', // (필수) 제품의 고유 ID.
            'name' : 'BlueJean', // (필수) 제품 이름.
            'quantity' : 1, // 제품이 담긴 수량
            'variant' : 'IndigoBlue', // 제품의 변형 옵션
            'price' : 19200 // 제품의 가격
        },
        {
            'id' : 'P12345',
            'name' : 'BlueJean',
            'quantity' : 1,
            'variant' : 'LightBlue',
            'price' : 25000
        }
    ]
}); 
```



### 장바구니 조회

사용자가 장바구니를 조회할 때 담겨있는 제품의 데이터를 **bg:cart** 이벤트로 호출합니다. 장바구니 조회 이벤트의 저장은 마지막으로 수집한 장바구니의 제품 목록을 업데이트 합니다. 적용되는 코드 스니펫의 예제는 아래와 같습니다.

```javascript
bigin.event("bg:cart",{
    'products':[
        {
            'id' : 'P12345', // (필수) 제품의 고유 ID.
            'name' : 'BlueJean', // (필수) 제품 이름.
            'quantity' : 1, // 제품이 담긴 수량
            'variant' : 'IndigoBlue', // 제품의 변형 옵션
            'price' : 19200 // 제품의 가격
        },
        {
            'id' : 'P54321',
            'name' : 'WhiteShirts',
            'quantity' : 1,
            'variant' : 'White',
            'price' : 25500
        }
    ]
}); 
```



### 제품 장바구니에서 삭제

장바구니에서 하나 이상의 제품을 제거할 때 제품의 정보와 사용자의 행동을 수집하기 위하여 추적합니다. 장바구니에서 제품을 제거할 때 적용되는 코드 스니펫의 기본 구조는 아래와 같습니다.

```javascript
bigin.event("bg:removeCart",{
    'products':[
        {
            'id' : 'P54321',
            'name' : 'WhiteShirts',
            'quantity' : 1,
            'variant' : 'White',
            'price' : 19200
        }
    ]
}); 
```



### 체크아웃 프로세스

제품을 구매하기 위해 사용자가 배송 및 결제 정보를 등록하는 체크아웃 페이지 단계를 추적합니다. 체크아웃 프로세스의 단계가 하나 이상의 단계로 되어 있다면, 거래 데이터의 `step` 키를 사용하여 체크아웃 단계를 정수로 나타냅니다.

체크아웃이 시작되는 첫 단계를 step 0 으로 간주합니다. 대표적인 예시로 **제품 세부정보 조회** 또는 **장바구니** 에서 구매하기 버튼을 통한 결제 프로세스의 시작이 있습니다. 코드 스니펫의 구조는 아래와 같습니다.

```javascript
bigin.event("bg:checkout",{
    'step' : 0,
    'option' : 'Visa',
    'products':[
        {
            'id' : 'P54321',
            'name' : 'WhiteShirts',
            'quantity' : 1,
            'variant' : 'White',
            'price' : 19200
        }
    ]
});
```

step 0 이후부터 구매 완료 이벤트 발생 시점까지 `step` 을 활용하여 체크아웃 프로세스를 추적합니다. 코드 스니펫의 구조는 아래와 같습니다.

```javascript
bigin.event("bg:checkout",{
    'step' : 1,
    'option' : 'Credit Card'
});
```



### 제품 구매 완료

사용자가 제품 구매를 완료하면 구매한 제품의 데이터를 수집합니다. 제품 구매 완료의 추적은 **bg:purchase** 이벤트로 추적하며, 이 이벤트는 제품의 구매가 완료 처리된 행동 또는 완료 후에 도착하는 페이지에서 작동할 쑤 있도록 합니다. 코드 스니펫의 기본 구조는 다음과 같습니다.

```javascript
bigin.event("bg:purchase",{
    'id' : 'T12345', // (필수) 고유 거래 ID.
    'revenue' : '38400', // (필수) 제품 수익.
    'affiliation' : 'Bigin Store', // 제휴사
    'tax' : 1900, //거래 수익의 세금.
    'shipping' : 2300, //거래의 배송비.
		'coupon' : 'PROMO-BIG78CM',
		'products' : [
        {
            'id' : 'P12345', // (필수) 제품의 고유 ID.
            'name' : 'BlueJean', // (필수) 이름.
            'quantity' : 1, // (필수) 제품 구매 수량.
            'category' : ['남성','하의','청바지'], // 제품의 카테고리. 하위 카테고리의 설정은 배열의 순서로 설정됩니다.
            'variant' : '33/31',
            'brand' : 'Bigin', 
            'thumbnail' : ['imageURL'],
            'price' : 19200
        },
        {
            'id' : 'P12345', 
            'name' : 'WhiteShirts', 
            'quantity' : 2,
            'category' : ['여성','상의','셔츠/블라우스'],
            'variant' : 'M', 
            'brand' : 'Bigin', 
            'thumbnail' : ['imageURL'],
            'price' : 19200
        }
    ],
    'property' : 'value'
}); 
```



### 제품의 환불

전체 거래를 환불 받으려면 **bg:refund** 이벤트를 호출하여 거래 ID를 제공하십시오. 아래의 코드 스니펫을 참고하여 주문 완료된 거래의 취소 및 환불의 트리거에 설치하세요.

```javascript
bigin.event("bg:refund",{
     'id' : 'T12345' // (필수) 고유 거래 ID.
}); 
```

거래 중 일부 제품의 부분 환불은 **bg:refund** 이벤트를 호출할 때, 거래 ID와 환불할 제품의 데이터를 제공해야 합니다.

```javascript
bigin.event("bg:refund",{
    'id' : 'T12345', // (필수) 고유 거래 ID.
    'products' : [
        {
            'id' : 'P12345', // (필수) 환불 제품의 고유 ID.
            'quantity' : 1, // (필수) 환불 제품의 수량.
            'variant' : 'IndigoBlue'
        }
    ]
}); 
```



### 제품 리뷰의 수집

사용자가 작성한 제품 리뷰 데이터를 수집하세요. 제품 리뷰의 만족도와 내용을 수집할 수 있습니다.

```javascript
bigin.event("bg:review",{
    'id' : 'R12345', // (필수) 리뷰 ID.
    'product' : 'P12345', // (필수) 제품 고유 ID.
    'score' : '4.5', // 제품 리뷰의 점수.
    'content' : '제품 리뷰의 내용입니다.', // 제품 리뷰의 내용.
    'property' : 'value'
}); 
```

<span class="end-point"></span>
