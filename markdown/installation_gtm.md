# 태그매니저(GTM)를 활용한 설치

직접 코드에 접근하여 태그매니저의 도움없이 설치를 진행하시려면 [SDK 추적코드 설치 (bigin.js)](https://support.bigin.io/pages/detail.html?kind=installation_javascript#installation_javascript_0) 로 이동하여 설치방법을 알아보세요.



## 구글 태그매니저로 시작하기

비긴 애널리틱스의 추적코드(bigin.js) 설치는 구글 태그매니저(Google Tag Manger)를 통해 설치할 수 있도록 지원하고 있습니다. <br>아래의 문서를 통해 구글 태그매니저를 활용한 bigin.js의 SDK 설치를 시작할 수 있습니다.


<span class="end-point"></span>
## container.json 설치

태그매니저의 설치를 돕기 위해 bigin 기본 추적 스크립트의 설치부터 모든 추적 코드의 구현에 대한 설정이 완료된 구글 태그매니저의 컨테이너 파일을 제공하고 있습니다. <a class="container-json" href="../data/container.json" download>container.json</a> 파일을 내려받은 후, 사용할 구글 태그매니저 컨테이너에 병합합니다.

태그매니저 컨테이너의 **내려받기**와 **가져오기**에 대한 자세한 설명은 [여기](https://support.google.com/tagmanager/answer/6106997?hl=kr)를 참조해주세요.



### 구성

container.json 에 설정된 **태그**들은 **bigin** 객체의 내장 함수들을 활용하여 **고유 사용자 식별, 이벤트 추적, 페이지 추적 , 이커머스 추적**을 구현합니다. 

제공되는 컨테이너에는 태그와 트리거, 변수의 설정이 함께 포함되어 있습니다.



### 태그

 <a class="container-json" href="../data/container.json" download>container.json</a> 컨테이너 파일에는 아래의 비긴 설치를 위한 태그가 포함되어 있습니다.

| 태그                                          | 설명                                                         |
| --------------------------------------------- | ------------------------------------------------------------ |
| bigin_Tracking Script                         | 기본 추적코드 스니펫으로 bigin 이벤트 추적을 위한 기본 코드 입니다. |
| bigin_Configuration                              | 기본 설정 변경을 수행하는 태그입니다.                        |
| bigin_SPA Tracking Pageview | SPA(Single Page Application)에서 페이지 조회를 수집하기 위한 별도 설정 태그입니다. |
| bigin_GPS Tracking                          | 사용자의 위치 정보 수집을 위한 별도 설정 태그입니다.         |
| bigin_Identify User                            | 고유 사용자 식별을 위한 이벤트 태그입니다.                   |
| bigin_Disconnect User                      | 동일 환경의 복수 계정 사용자의 추적을 위해 식별 사용자의 연결을 해제하는 태그입니다. 로그아웃과 비슷한 기능으로 작동합니다. |
| bigin_Custom Event                    | 커스텀 이벤트의 기본 태그입니다.                             |
| bigin_Impression                              | `bg:impression` 이벤트 추적을 수행하는 태그입니다. 사용자가 제품 링크를 클릭할 때, 해당 제품 데이터와 게재 위치정보를 추적합니다. |
| bigin_View Product                     | `bg:viewProduct` 이벤트 추적을 수행하는 태그입니다. 사용자가 제품의 상세페이지에 진입할 때, 제품의 상세정보를 추적합니다. |
| bigin_Item To Cart                        | `bg:addToCart` 이벤트 추적을 수행하는 태그입니다. 장바구니에 추가되는 제품 데이터를 추적합니다. |
| bigin_Cart                               | `bg:cart` 이벤트 추적을 수행하는 태그입니다. 현재 장바구니의 제품 목록을 추적합니다. |
| bigin_Remove Cart                      | `bg:removeCart` 이벤트 추적을 수행하는 태그입니다. 장바구니에서 제거되는 제품의 정보를 추적합니다. |
| bigin_Checkout                               | `bg:checkout` 이벤트 추적을 수행하는 태그입니다. 결제 단계의 제품 정보, 체크아웃 프로세스의 단계 및 옵션 정보를 추적합니다. |
| bigin_Purchase                              | `bg:purchase` 이벤트 추적을 수행하는 태그입니다. 거래 데이터와 구매한 제품의 정보를 추적합니다. |
| bigin_Refund                              | `bg:refund` 이벤트 추적을 수행하는 태그입니다. 완료된 환불 내역을 추적합니다. |
| bigin_Review                                   | `bg:review` 이벤트 추적을 수행하는 태그입니다. 작성된 상품 리뷰에 대한 정보를 추적합니다. |



### 트리거

[container.json](http://support.bigin.io)의 트리거는 **"맞춤 이벤트"** 와 **"페이지 뷰"** 형식의 트리거로 작동됩니다.

| 트리거명                                               | 형식        | 이벤트 이름 |
| ------------------------------------------------------ | ----------- | ----------- |
| 트리거 : bigin_Tracking Script                          | 페이지 뷰   |             |
| 트리거 : bigin_Configuration                              | 맞춤 이벤트 | config      |
| 트리거 : bigin_SPA Tracking Pageview | 맞춤 이벤트 | views       |
| 트리거 : bigin_Identify User                         | 맞춤 이벤트 | login       |
| 트리거 : bigin_Disconnect User                        | 맞춤 이벤트 | logout      |
| 트리거 : bigin_Custom Event                     | 맞춤 이벤트 | custom      |
| 트리거 : bigin_Impression                              | 맞춤 이벤트 | impression  |
| 트리거 : bigin_View Product                     | 맞춤 이벤트 | viewProduct |
| 트리거 : bigin_item To cart                       | 맞춤 이벤트 | addToCart   |
| 트리거 : bigin_Cart                               | 맞춤 이벤트 | cart        |
| 트리거 : bigin_Remove Cart                      | 맞춤 이벤트 | removeCart  |
| 트리거 : bigin_Checkout                               | 맞춤 이벤트 | checkout    |
| 트리거 : bigin_Purchase                              | 맞춤 이벤트 | purchase    |
| 트리거 : bigin_Refund                              | 맞춤 이벤트 | refund      |
| 트리거 : bigin_Review                              | 맞춤 이벤트 | review      |

### 변수 

이벤트의 실행을 구분하기 위하여  `event` 를 기본 제공 변수로서 사용합니다. 이벤트의 KEY값을 정의하기 위한 데이터 영역 변수로서  `data`, `eventName`이 사용됩니다. 

`Event` 변수는 **맞춤 이벤트** 형식의 트리거 활성화에 사용됩니다. 

`data` 변수는 **데이터 영역 변수**로써 제품 데이터, 구매 데이터, 거래 데이터, 리뷰 데이터, 유저 데이터, 설정 데이터를 태그 관리자 컨테이너로 전달합니다.

`eventName` 변수는 **데이터 영역 변수**로써 커스텀 이벤트의 이름으로 사용되며, 커스텀 이벤트 이름을 태그 관리자 컨테이너로 전달합니다.

아래의 사용자 정의 변수 예시를 참고하세요.

~~~javascript
dataLayer.push({
    event : "impression", // "bigin 제품링크클릭 트리거" 활성화
    data : {
        'id' : 'P12345',
		'name' : 'Blue Jean',
		'category' : ['남성','하의','청바지'],
		'brand' : 'Bigin', 
		'list' : '검색',
		'position' : '3',
		'thumbnail' : ['imageUrl']
    } // data 값은 "bigin 제품링크클릭" 태그의 {{data}}에 바인딩
}) 
~~~

```javascript
dataLayer.push({
    event : "custom", // "bigin 커스텀이벤트 트리거" 활성화,
    eventName : "sortBy",  // "커스텀 이벤트 이름"
    data : {
        sort : "조회순"
    } // data 값은 "bigin 커스텀이벤트" 태그의 {{data}}에 바인딩.
}) 
```

<span class="end-point"></span>

## 구글 태그 관리자 설치(gtm.js)

구글 태그매니저 컨테이너를 프로젝트에 적용시키기 위해서는 **google 태그 관리자 설치 코드** 가 프로젝트의 모든 페이지에 삽입되어 있어야합니다. 구글 태그매니저를 시작하는 방법은 [구글 태그 관리자 고객센터](https://support.google.com/tagmanager/answer/6103696?hl=ko)  또는 [구글 태그 관리자 개발가이드](https://developers.google.com/tag-manager/quickstart)에서 자세한 알아보세요.


<span class="end-point"></span>

## 기본 추적 스크립트

구글 태그매니저를 활용한 기본 스크립트의 삽입에 대해 설명합니다. 기본 추적 스크립트 대한 자세한 설명은 [Javascript SDK(bigin.js) 설치](http://support.bigin.io/pages/detail.html?kind=installation_javascript#installation_javascript_1)를 참조해주세요.



### 추적 코드 스니펫

[container.json]([http://www.google.co.kr](http://www.google.co.kr/)) 의 태그 중 **"bigin  삽입"** 태그를 통해서 bigin.sdk.js 가 프로젝트 내부에 로드됩니다.
 `projectID` 의 값에 프로젝트의 추적ID를 입력해야 하며 **bigin 삽입** 태그의 내용은 아래의 스니펫과 같습니다. 

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
    (window, document, 'script', 'bigin', '프로젝트 ID', "KRW");
</script>
```

**bigin 삽입** 태그의 트리거는 **모든 페이지뷰** 로 설정되어 있어 페이지 변경 시, 매회 호출됩니다.



### 현지 통화의 설정

**"bigin 설정"** 태그를 통해 통화 설정을 변경할 수 있습니다.

태그의 구성과 트리거는 아래와 같습니다. 

```javascript
<script>
	(function() {
		bigin.config({{data}});        
	})();
</script>
```

![config_trigger.png](http://support.bigin.io/images/config_trigger.png)



#### 예제

```javascript
dataLayer.push({
    event : "config",
    data : {
        currency : "KRW"
    }
})
```



### 모바일 사용자의 위치정보 수집 

 **`bigin 로케이션`** 태그를 통해 모바일 사용자의 위치정보를 수집할 수 있습니다.

태그의 구성과 트리거는 아래와 같습니다. 

```javascript
<script>
(function () {
    bigin.user("location");
})();
</script>
```

![location_trigger](http://support.bigin.io/images/location_trigger.png)

#### 예제

```javascript
dataLayer.push({
    event : "location",
})
```





### SPA(Single Page Application)의 페이지 조회 수집

단일 페이지 어플리케이션 (SPA; Single Page Application) 으로 개발된 웹사이트의 경우, 별도의 페이지 추적이 필요합니다.

**"bigin SPA 페이지뷰"**  태그를 통해 각각의 페이지를 추적하며, 태그의 구성과 트리거는 아래와 같습니다. 

```javascript
<script>
	(function () {
		bigin.track('views', {{data}});
    })();
</script>
```

![views_trigger.png](http://support.bigin.io/images/views_trigger.png)



####예제

```javascript
dataLayer.push({
    "event" : "views",
    "data" : {
		page : '/productDetail/12345' // (옵션) pagePath 또는 window.location.pathname 로 추적합니다.
    }
})
```


<span class="end-point"></span>
## 고유 사용자 식별

이 장에선 구글 태그매니저를 활용한 bigin.sdk.js 의 고유 사용자 식별 방식만을 설명합니다. 
bigin.sdk.js 의 고유 사용자 식별에 대한 자세한 설명은 [bigin 사용자 식별 가이드](http://support.bigin.io/pages/detail.html?kind=installation#installation_2) 로 대체합니다.



### 로그인 사용자 식별

사용자의 고유정보를 추적함으로써, 사용자의 행동 데이터들을 사용자의 계정으로 귀속시킬 수 있습니다.
 **"bigin 로그인"** 태그를 통해 사용자의 고유 정보를 추적합니다.

태그의 구성과 트리거는 아래와 같습니다. 

```javascript
<script>
(function () {
    bigin.user("profile", {{data}});
})();
</script>
```

![login_trigger.png](http://support.bigin.io/images/login_trigger.png)



#### 예제

```javascript
dataLayer.push({
    event : "login",
    data : {
		'userID': 'User 1', // bigin에서 발급되는 고유 ID 외에 별도의 ID로 사용자를 식별할 수 있습니다.
        'email': 'support@bigin.io', // (필수) 사용자의 이메일
        'name': '홍길동', // 이름
        'nickname': '길동이', // 닉네임
        'phoneNumber': '025063944', // 집 전화번호
        'phoneCell': '01011112222', // 휴대폰 전화번호
        'gender': 'Male', // 성별
        'birth': '1990', // 생년
        'address': '서울시 강남구 선릉로 90길 36 미소빌딩 8층 Big Insight', // 주소
        'property': 'value' // 고유 사용자의 별도 측정기준, 추가적으로 추적하고자 하는 정보를 기입합니다.
    }
})
```



### 복수 계정 사용자의 추적

 **"bigin 로그아웃"** 태그를 통해 기존 로그인 사용자의 세션을 종료할 수 있습니다. 

태그의 구성과 트리거는 아래와 같습니다. 

```javascript
<script>
(function () {
    bigin.user("logout");
})();
</script>
```

![logout_trigger.png](http://support.bigin.io/images/logout_trigger.png)



#### 예제

```javascript
dataLayer.push({
    event : "logout",
})
```

<span class="end-point"></span>

## 커스텀 이벤트 추적

이 장에선 구글 태그매니저를 활용한 bigin.sdk.js 의 커스텀 이벤트 추적 방식만을 설명합니다. 
bigin.sdk.js 의 커스텀 이벤트 추적에 대한 자세한 설명은 [bigin 커스텀 이벤트 추적 가이드](http://support.bigin.io/pages/detail.html?kind=installation#installation_3)를 참조해주세요.



#### 커스텀 이벤트 수집

 **"bigin 커스텀이벤트"** 태그를 통해 커스텀 이벤트를 수집할 수 있습니다.

태그의 구성과 트리거는 아래와 같습니다. 

```javascript
<script>
(function () {
    bigin.event({{eventName}}, {{data}});
})();
</script>
```

![custom_trigger](http://support.bigin.io/images/custom_trigger.png)

#### 예제

```javascript
dataLayer.push({
    event : "custom",
    eventName : "sortBy",
    data : {
        sort : "조회순"
    }
})
```


<span class="end-point"></span>
## 이커머스 추적

구글 태그매니저를 활용한 bigin.sdk.js 의 이커머스 추적 방식만을 설명합니다. 
이커머스 추적에 대한 자세한 설명은 [Javascript SDK(bigin.js) 설치-이커머스 추적](http://support.bigin.io/pages/detail.html?kind=installation_javascript#installation_javascript_4) 을 참조해주세요.



### 제품 노출

제품의 링크 클릭 시, 제품 상세정보와 게재 위치 정보를 추적합니다.

```javascript
dataLayer.push({
    event : 'impression',
    data : {
		'id' : 'P12345', // (필수) 제품의 고유 ID.
	    'name' : 'Blue Jean', // (필수) 제품 이름.
    	'category' : ['남성','하의','청바지'], // 제품의 카테고리. 하위 카테고리의 설정은 배열의 순서로 설정됩니다.
	    'brand' : 'Bigin', // 제품과 관련된 브랜드
    	'list' : '검색', // 제품을 조회한 경로 (예 : 검색, 메인화면, 인기 상품)
	    'position' : '3',// 목록 또는 컬렉션의 제품 위치 (예 : 2) 
    	'thumbnail' : ['imageUrl']
    }
})
```



### 제품 세부정보 조회

제품의 세부정보 페이지의 조회 시, 제품의 노출데이터를 추적합니다. 

```javascript
dataLayer.push({
    event : 'viewProduct',
    data : {
		'id' : 'P12345', // (필수) 제품의 고유 ID.
	    'name' : 'Blue Jean', // (필수) 제품 이름.
    	'category' : ['남성','하의','청바지'], // 제품의 카테고리. 하위 카테고리의 설정은 배열의 순서로 설정됩니다.
	    'brand' : 'Bigin', // 제품과 관련된 브랜드
		'list' : '검색', // 제품을 조회한 경로 (예 : 검색, 메인화면, 인기 상품)
	    'position' : '3',// 목록 또는 컬렉션의 제품 위치 (예 : 2) 
    	'price' : 15400, // 제품의 가격
	    'thumbnail' : ['imageUrl']
    }
})
```



### 제품 장바구니에 추가

장바구니에 특정 상품들이 추가될 때, 추가되는 상품들의 정보를 추적합니다.



```javascript
dataLayer.push({
    event : 'addToCart',
    data : {
        products : [
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
    }
})
```



### 장바구니 조회

장바구니 조회 시, 장바구니의 제품 목록을 업데이트 합니다

```javascript
dataLayer.push({
    event : 'cart',
    data : {
        products : [
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
    }
})
```



### 제품 장바구니에서 삭제

장바구니에서 특정 상품들이 제거될 때, 제거된 제품의 정보를 추적합니다

```javascript
dataLayer.push({
    event : 'removeCart',
    data : {
        products : [
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
    }
})
```

### 

### 체크아웃 프로세스

체크아웃 페이지에서 체크아웃 단계, 옵션, 상품들의 정보를 추적합니다.

```javascript
dataLayer.push({
    event : 'checkout',
    data : {
        step : 0,
        option : 'visa'
        products : [
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
    }
})
```



### 제품 구매

구매 완료 시, 거래 정보와 구매된 상품의 정보를 추적합니다.

```javascript
dataLayer.push({
    event : 'purchase',
    data : {
        'id' : 'T12345',
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
    }
})
```



### 제품의 환불

구매한 제품을 환불하는 경우, 환불된 거래 정보와 제품 정보들을 추적합니다. 

#### 거래의 전체 환불

```javascript
dataLayer.push({
    event : 'refund',
    data : {
		id : 'T12345',
    }
})
```

#### 거래의 부분 환불

```javascript
dataLayer.push({
    event : 'refund',
    data : {
		id : 'T12345',
        products : [
	        {
    	        'id' : 'P12345', // (필수) 환불 제품의 고유 ID.
        	    'quantity' : 1, // (필수) 환불 제품의 수량.
            	'variant' : '32',
	        }
    	]
    }
})
```



### 제품 리뷰의 수집

제품 리뷰 작성 시, 리뷰 데이터를 수집합니다.

```javascript
dataLayer.push({
    event : 'review',
    data : {
		'id' : 'R12345', // (필수) 리뷰 ID.
	    'product' : 'P12345', // (필수) 제품 고유 ID.
    	'score' : '4.5', // 제품 리뷰의 점수.
	    'content' : '제품 리뷰의 내용입니다.', // 제품 리뷰의 내용.
    }
})
```

