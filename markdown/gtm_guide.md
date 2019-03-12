# gtm 활용하여 bigin sdk 설치



구글 태그매니저를 활용한 bigin 웹 sdk의 설치 방법을 설명합니다. 



## gtm 컨테이너 내려받기

[container.json]([http://www.google.co.kr](http://www.google.co.kr/))  파일을 내려받은 후, 사용할 구글 태그매니저 컨테이너에 병합합니다.  
container.json 파일은 bigin 기본 추적 스크립트의 삽입부터 모든 추적 코드들을 구현한 태그와 트리거, 변수로 구성된 gtm 컨테이너입니다.

gtm 컨테이너의 **내려받기**와 **가져오기**에 대한 자세한 설명은 [이곳](https://support.google.com/tagmanager/answer/6106997?hl=en)를 참조해주세요.



#### 1. 태그

container.json의 **태그**들은 **bigin** 객체의 내장 메소드들을 활용하여 **고유 사용자 식별**, **이벤트 추적**, **페이지 추적** 등을 구현합니다.

| 태그명             | 내용                                                         | 설명                                                         |
| :----------------- | :----------------------------------------------------------- | ------------------------------------------------------------ |
| bigin 제품링크클릭 | <pre class="language-html"><code class="language-html"><br />&lt;script><br /> (<span style="color:#30a">function</span>(){<br />&nbsp;&nbsp;bigin.<span style="color:#708;">event</span>(<span style="color:#a11;">"bg:impression"</span>,{{data}})<br /> })()<br />&lt;/script></code></pre> | bg:impression 이벤트 추적을 수행하는 태그입니다. <br />사용자가 제품 링크를 클릭할 때, 해당 제품 데이터와 게재 위치정보를 추적합니다. |
| bigin 제품상세보기 | <pre class="language-html"><code class="language-html"><br />&lt;script><br /> (<span style="color:#30a">function</span>(){<br />&nbsp;&nbsp;bigin.<span style="color:#708;">event</span>(<span style="color:#a11;">"bg:viewProduct"</span>,{{data}})<br /> })()<br />&lt;/script></code></pre> | bg:viewProduct 이벤트 추적을 수행하는 태그입니다.<br /> 사용자가 제품의 상세페이지에 진입할 때, 제품의 상세정보를 추적합니다. |
| bigin 장바구니추가 | <pre class="language-html"><code class="language-html"><br />&lt;script><br /> (<span style="color:#30a">function</span>(){<br />&nbsp;&nbsp;bigin.<span style="color:#708;">event</span>(<span style="color:#a11;">"bg:addToCart"</span>,{{data}})<br /> })()<br />&lt;/script></code></pre> | bg:addToCart 이벤트 추적을 수행하는 태그입니다.<br /> 장바구니에 추가되는 제품 데이터를 추적합니다. |
| bigin 장바구니갱신 | <pre class="language-html"><code class="language-html"><br />&lt;script><br /> (<span style="color:#30a">function</span>(){<br />&nbsp;&nbsp;bigin.<span style="color:#708;">event</span>(<span style="color:#a11;">"bg:cart"</span>,{{data}})<br /> })()<br />&lt;/script></code></pre> | bg:cart 이벤트 추적을 수행하는 태그입니다.<br /> 현재 장바구니의 제품 목록을 추적합니다. |
| bigin 장바구니제거 | <pre class="language-html"><code class="language-html"><br />&lt;script><br /> (<span style="color:#30a">function</span>(){<br />&nbsp;&nbsp;bigin.<span style="color:#708;">event</span>(<span style="color:#a11;">"bg:removeCart"</span>,{{data}})<br /> })()<br />&lt;/script></code></pre> | bg:removeCart 이벤트 추적을 수행하는 태그입니다.<br /> 장바구니에서 제거되는 제품의 정보를 추적합니다. |
| bigin 체크아웃     | <pre class="language-html"><code class="language-html"><br />&lt;script><br /> (<span style="color:#30a">function</span>(){<br />&nbsp;&nbsp;bigin.<span style="color:#708;">event</span>(<span style="color:#a11;">"bg:checkout"</span>,{{data}})<br /> })()<br />&lt;/script></code></pre> | bg:checkout 이벤트 추적을 수행하는 태그입니다.<br /> 구매할 제품 정보, 체크아웃 프로세스의 단계 및 옵션 정보를 추적합니다. |
| bigin 구매         | <pre class="language-html"><code class="language-html"><br />&lt;script><br /> (<span style="color:#30a">function</span>(){<br />&nbsp;&nbsp;bigin.<span style="color:#708;">event</span>(<span style="color:#a11;">"bg:purchase"</span>,{{data}})<br /> })()<br />&lt;/script></code></pre> | bg:purchase 이벤트 추적을 수행하는 태그입니다.<br /> 거래 정보와 구매한 제품의 정보를 추적합니다. |
| bigin 환불         | <pre class="language-html"><code class="language-html"><br />&lt;script><br /> (<span style="color:#30a">function</span>(){<br />&nbsp;&nbsp;bigin.<span style="color:#708;">event</span>(<span style="color:#a11;">"bg:refund"</span>,{{data}})<br /> })()<br />&lt;/script></code></pre> | bg:refund 이벤트 추적을 수행하는 태그입니다.<br /> 완료된 환불 내역을 추적합니다. |
| bigin 리뷰         | <pre class="language-html"><code class="language-html"><br />&lt;script><br /> (<span style="color:#30a">function</span>(){<br />&nbsp;&nbsp;bigin.<span style="color:#708;">event</span>(<span style="color:#a11;">"bg:review"</span>,{{data}})<br /> })()<br />&lt;/script></code></pre> | bg:review 이벤트 추적을 수행하는 태그입니다.<br /> 작성된 상품 리뷰에 대한 정보를 추적합니다. |
| bigin 로그인       | <pre class="language-html"><code class="language-html"><br />&lt;script><br /> (<span style="color:#30a">function</span>(){<br />&nbsp;&nbsp;bigin.<span style="color:#708;">user</span>(<span style="color:#a11;">"profile"</span>,{{data}})<br /> })()<br />&lt;/script></code></pre> | 로그안 사용자 식별을 수행하는 태그입니다.                    |
| bigin 로그아웃     | <pre class="language-html"><code class="language-html"><br />&lt;script><br /> (<span style="color:#30a">function</span>(){<br />&nbsp;&nbsp;bigin.<span style="color:#708;">user</span>(<span style="color:#a11;">"logout"</span>)<br /> })()<br />&lt;/script></code></pre> | 복수 계정 사용자의 추적을 수행하는 태그입니다.               |
| bigin 설정         | <pre class="language-html"><code class="language-html"><br />&lt;script><br /> (<span style="color:#30a">function</span>(){<br />&nbsp;&nbsp;bigin.<span style="color:#708;">config</span>({{data}})<br /> })()<br />&lt;/script></code></pre> | 기본 설정 변경을 수행하는 태그입니다.                        |
| bigin 삽입         | 기본 추적 스크립트                                           | bigin 의 추적 코드 스크립트의 삽입을 수행하는 태그입니다.    |
| bigin SPA 페이지뷰 | <pre class="language-html"><code class="language-html"><br />&lt;script><br /> (<span style="color:#30a">function</span>(){<br />&nbsp;&nbsp;bigin.<span style="color:#708;">track</span>(<span style="color:#a11;">"views"</span>,{{data}})<br /> })()<br />&lt;/script></code></pre> | SPA(Single Page Application)의 페이지 조회 수집을 수행하는 태그입니다. |
| bigin 커스텀       | &lt;script><br />&nbsp;&nbsp;(function () &nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;bigin.track("views",{{data}});}<br />&nbsp;&nbsp;)();<br />&lt;/script> | 커스텀 이벤트 추적을 수행하는 태그입니다.                    |



#### 2. 트리거

[container.json](http://support.bigin.io)의 모든 트리거는 "맞춤 이벤트" 와 "페이지 뷰" 로 구성됩니다. 

| 트리거명                  | 형식                                      | 이벤트 이름 |
| :------------------------ | ----------------------------------------- | ----------- |
| bigin 제품링크클릭 트리거 | 맞춤 이벤트                               | impression  |
| bigin 제품상세보기 트리거 | 맞춤 이벤트                               | viewProduct |
| bigin 장바구니추가 트리거 | 맞춤 이벤트                               | addToCart   |
| bigin 장바구니갱신 트리거 | 맞춤 이벤트                               | cart        |
| bigin 장바구니제거 트리거 | 맞춤 이벤트                               | removeCart  |
| bigin 체크아웃 트리거     | 맞춤 이벤트                               | checkout    |
| bigin 구매 트리거         | 맞춤 이벤트                               | purchase    |
| bigin 환불 트리거         | 맞춤 이벤트                               | refund      |
| bigin 리뷰 트리거         | 맞춤 이벤트                               | review      |
| bigin 로그인 트리거       | 맞춤 이벤트                               | login       |
| bigin 로그아웃 트리거     | 맞춤 이벤트                               | logout      |
| bigin 설정 트리거         | 맞춤 이벤트                               | config      |
| bigin 삽입 트리거         | 페이지 뷰                                 |             |
| bigin SPA 페이지뷰 트리거 | 맞춤 이벤트                               | views       |
| bigin 커스텀 트리거       | 커스텀 이벤트 추적을 수행하는 태그입니다. |             |



#### 3. 변수 

기본 제공 변수인 "Event"와 사용자 정의 변수인 "data"가 사용됩니다. 

"data" 변수는 제품 데이터, 구매 데이터, 거래 데이터, 리뷰 데이터, 유저 데이터, 설정 데이터를 저장하며, 활성화된 태그로 전달됩니다.

"Event" 변수는 트리거의 활성화를 위해 사용됩니다.  

ex)

~~~javascript
dataLayer.push({
    event : "impression", // "bigin 제품링크클릭 트리거" 활성화
    data : {
        products : [
            {
				'id' : 'P12345',
				'name' : 'Blue Jean',
				'category' : ['남성','하의','청바지'],
				'brand' : 'Bigin', 
				'list' : '검색',
				'position' : '3'
				'thumbnail' : ['imageUrl']
            }
        ]
    } // "bigin 제품링크클릭" 태그로 전달
}) 
~~~

   

| 변수명 | 설명                                                    |
| :----- | ------------------------------------------------------- |
| event  | "맞춤 이벤트" 형식의 트리거 활성화를 위해서 사용됩니다. |
| data   | 추적 데이터를 저장하는 변수입니다.                      |







## google 태그 관리자 설치 코드 삽입

gtm 컨테이너를 프로젝트에 적용시키기 위해서 **google 태그 관리자 설치 코드**를 프로젝트의 모든 페이지에 삽입해야합니다.

[태그 관리자 고객센터 바로가기](https://support.google.com/tagmanager/answer/6103696?hl=ko) <br>[태그 관리자 개발가이드 바로가기](https://developers.google.com/tag-manager/quickstart)



## 기본 추적 스크립트

이 장에선 구글 태그매니저를 활용한 기본 추적 스크립트의 삽입 방식만을 설명합니다. 
기본 추적 스크립트에 대한 자세한 설명은 [bigin 기본 추적 스크립트 가이드](http://support.bigin.io/pages/detail.html?kind=installation#installation_1)를 참조해주세요.



### 추적 코드 스니펫

[container.json]([http://www.google.co.kr](http://www.google.co.kr/)) 의 태그 중 **"bigin  삽입"** 태그를 통해서 bigin.sdk.js 가 프로젝트 내부에 로드됩니다.
**bigin 삽입** 태그의 내용은 아래와 같습니다. 

```javascript
<script>
(function() {
    var biginScript = document.createElement('script');
    biginScript.type = 'text/javascript';
    biginScript.async = true;
    biginScript.src = 'https://sdk.bigin.io/v1/bigin.sdk.js'; // bigin SDK 버전
    biginScript.onload = function() {
        bigin.config({
            projectID: "프로젝트 ID", // 프로젝트의 고유 추적 ID 입니다. 'G924TSD55D-2'
            domain: "https://i.bigin.io",
            track: ['session', 'view', 'click', 'scroll'], // 자동 추적(AutoTrack)이 가능한 이벤트와 제스처
            trackLocation: false, // 모바일 접속 시 위치정보 수집 허용
            currencyCode: "KRW" // 표시 통화
        });
    };
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(biginScript, s);
})();
</script>
```

**bigin 삽입** 태그의 트리거는 **모든 페이지뷰** 로 설정되어 있어 페이지 변경 시, 매회 호출됩니다.
`projectID` 가 실제 프로젝트의 추적ID와 같도록 변경합니다.





### SPA(Single Page Application)의 페이지 조회 수집

단일 페이지 어플리케이션 (SPA; Single Page Application) 으로 개발된 웹사이트의 경우, 별도의 추적이 필요합니다.

**"bigin SPA 페이지뷰"** 태그를 통해 페이지 뷰을 추적합니다.

태그의 구성과 트리거는 아래와 같습니다. 

```javascript
  <script>
    (function () {
		bigin.track('views', {{data}});
    })();
  </script>
```

![views_trigger.png](http://support.bigin.io/images/views_trigger.png)



```javascript
dataLayer.push({
    "event" : "views",
    "data" : {
		page : '/productDetail/12345' // (옵션) pagePath 또는 window.location.pathname 로 추적합니다.
    }
})
```



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

![스크린샷 2019-03-11 오후 5.27.59](/Users/westlife/Desktop/스크린샷 2019-03-11 오후 5.27.59.png)

```javascript
dataLayer.push({
    event : "config",
    data : {
        currency : "KRW"
    }
})
```



## 고유 사용자 식별

이 장에선 구글 태그매니저를 활용한 bigin.sdk.js 의 고유 사용자 식별 방식만을 설명합니다. 
bigin.sdk.js 의 고유 사용자 식별에 대한 자세한 설명은 [bigin 사용자 식별 가이드](http://support.bigin.io/pages/detail.html?kind=installation#installation_2) 로 대체합니다.



#### 로그인 사용자 식별

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

![스크린샷 2019-03-11 오후 5.52.42](/Users/westlife/Desktop/스크린샷 2019-03-11 오후 5.52.42.png)

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



#### 복수 계정 사용자의 추적

 **"bigin 로그아웃"** 태그를 통해 

태그의 구성과 트리거는 아래와 같습니다. 

```javascript
<script>
(function () {
    bigin.user("logout");
})();
</script>
```

![스크린샷 2019-03-11 오후 5.56.26](/Users/westlife/Desktop/스크린샷 2019-03-11 오후 5.56.26.png)

```javascript
dataLayer.push({
    event : "logout",
})
```



#### 모바일 사용자의 위치정보 수집 

 **"bigin 로케이션"** 태그를 통해 

태그의 구성과 트리거는 아래와 같습니다. 

```javascript
<script>
(function () {
    bigin.use("location");
})();
</script>
```



```javascript
dataLayer.push({
    event : "location",
})
```



## 커스텀 이벤트 추적



## 이커머스 추적

이 장에선 구글 태그매니저를 활용한 bigin.sdk.js 의 이커머스 추적 방식만을 설명합니다. 
bigin.sdk.js 의 이커머스 추적에 대한 자세한 설명은 [bigin 이커머스 추적 가이드](http://support.bigin.io/pages/detail.html?kind=installation#installation_4)를 참조해주세요.



bigin 기본 추적 스크립트은 bigin 객체를 생성합니다. 
생성된 bigin 객체의 내장 메소드 중 event 메소드를 통해서 이커머스 추적이 진행됩니다.
[container.json]([http://www.google.co.kr](http://www.google.co.kr/)) 의 이머커스 관련 태그와 트리거들은 

~~~javascript
// 태그
<script>
	(function(){
        bigin.event("bg:eventName", {{data}})
	})()
</script>
~~~

![스크린샷 2019-03-11 오후 4.09.22](/Users/westlife/Desktop/스크린샷 2019-03-11 오후 4.09.22.png)

의 형식을 취합니다. 



```javascript
dataLayer.push({
    event : 'eventName',
    data : {
        // 전송할 데이터
    }
})
```



#### 제품의 노출

제품의 세부정보 페이지의 조회 시, 제품의 노출데이터를 추적합니다. 


~~~javascript
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
~~~



#### 제품의 링크 클릭

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



#### 제품 장바구니에 추가

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
	            'variant' : ['IndigoBlue','32'], // 제품의 변형 옵션
    	        'price' : 19200 // 제품의 가격
        	},
	        {
    	        'id' : 'P12345',
        	    'name' : 'BlueJean',
            	'quantity' : 1,
	            'variant' : ['LightBlue','32'],
    	        'price' : 25000
        	}
        ]
    }
})
```



#### 장바구니 조회

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
	            'variant' : ['IndigoBlue','32'], // 제품의 변형 옵션
    	        'price' : 19200 // 제품의 가격
        	},
	        {
    	        'id' : 'P12345',
        	    'name' : 'BlueJean',
            	'quantity' : 1,
	            'variant' : ['LightBlue','32'],
    	        'price' : 25000
        	}
        ]
    }
})
```





#### 제품 장바구니에서 삭제

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
	            'variant' : ['IndigoBlue','32'], // 제품의 변형 옵션
    	        'price' : 19200 // 제품의 가격
        	},
	        {
    	        'id' : 'P12345',
        	    'name' : 'BlueJean',
            	'quantity' : 1,
	            'variant' : ['LightBlue','32'],
    	        'price' : 25000
        	}
        ]
    }
})
```





#### 체크아웃 프로세스

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
	            'variant' : ['IndigoBlue','32'], // 제품의 변형 옵션
    	        'price' : 19200 // 제품의 가격
        	},
	        {
    	        'id' : 'P12345',
        	    'name' : 'BlueJean',
            	'quantity' : 1,
	            'variant' : ['LightBlue','32'],
    	        'price' : 25000
        	}
        ]
    }
})
```





#### 제품 구매 완료

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
        	    'variant' : ['33/31','IndigoBlue' ],
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







#### 제품의 환불

구매한 제품을 환불하는 경우, 환불된 거래 정보와 제품 정보들을 추적합니다. 

전체 거래를 환불하는 경우,  

```javascript
dataLayer.push({
    event : 'refund',
    data : {
		id : 'T12345',
    }
})
```



부분 환불을 하는 경우,

```javascript
dataLayer.push({
    event : 'refund',
    data : {
		id : 'T12345',
        products : [
	        {
    	        'id' : 'P12345', // (필수) 환불 제품의 고유 ID.
        	    'quantity' : 1, // (필수) 환불 제품의 수량.
            	'variant' : ['32','IndigoBlue']
	        }
    	]
    }
})
```



#### 제품 리뷰의 수집

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

