# 고도몰 bigin sdk 설치 

## 시작하기

bigin sdk를 고도몰 기반 쇼핑몰에 설치하기 위해 아래의 방식들을 사용합니다. 

1. **구글 태그매니저** 

   - 제공되는 gtm 컨테이너를 가이드에 따라 수정하여 쇼핑몰에 맞게 커스터마이징할 수 있습니다.

2. **DOM scraping 방식**

   - 임대형 쇼핑몰의 특성 상, 데이터 처리에 관여하는 비즈니스 로직을 공개하지 않는 경우가 있습니다.

   - ​	1) **상품리스트** 페이지에서의 **상품 데이터 조회**,  

     ​	2) **게시판** 페이지에서 **게시글 정보 생성**

     ​	3) 상품 주문 시, **결제 정보 생성** 등

     과 같은 비즈니스 로직은 관리자페이지에서 접근 할 수 없는 임대형 쇼핑몰이 존재합니다.
     이와 같은 경우에 **DOM scraping** 방식을 사용합니다.

   

   - **DOM scraping 방식**은 HTML로 구성된 UI 레이어의 DOM 트리에 직접적으로 접근하여 필요한 데이터를 가져오는 방식입니다. 손쉬운 **DOM scraping** 을 위해 가이드에 따른 **hidden div 태그를 추가하는 코드가 필요합니다.

     

## gtm 컨테이너 내려받기

[godomall_container.json](http://support.bigin.io/data/container.json) 파일을 내려받은 후, 사용할 구글 태그매니저 컨테이너에 병합합니다.
godomall_container.json 파일은 bigin 기본 추적 스크립트의 삽입부터 모든 추적 코드들을 구현한 gtm 컨테이너입니다.

gtm 컨테이너의 **내려받기**와 **가져오기**에 대한 자세한 설명은 [이곳](https://support.google.com/tagmanager/answer/6106997?hl=en)를 참조해주세요.



## google 태그 관리자 설치코드 삽입 

고도몰 관리자페이지에 접속한 후, **레이아웃의 페이지 소스 **상에 **구글 태그매니저 스니펫**을 삽입합니다. 
모든 페이지들은 **상단 레이아웃** 과 **하단 레이아웃**을 포함합니다.  
**구글 태그매니저 스니펫** 을 레이아웃의 html 에 삽입함으로써 모든 페이지에서 컨테이너의 정보를 가진 **gtm.js**에 접근할 수 있습니다. 

[구글 태그 관리자 고객센터](https://support.google.com/tagmanager/answer/6103696?hl=ko) 또는 [구글 태그 관리자 개발가이드](https://developers.google.com/tag-manager/quickstart)에서 자세한 설치법을 알아보세요.

세한 설치법을 알아보세요.



## 기본 추적 스크립트 삽입 - 고도몰



#### 추적 코드 스니펫

[godomall_container.json](http://support.bigin.io/pages/%5Bhttp://www.google.co.kr%5D(http://www.google.co.kr/)) 의 태그 중 **"bigin 삽입"** 태그를 통해서 **bigin.sdk.js** 가 프로젝트 내부에 로드됩니다. **bigin 삽입** 태그의 내용은 아래와 같습니다.



```html
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



**bigin 삽입** 태그의 트리거는 **모든 페이지뷰** 로 설정되어 있어 페이지 변경 시, 매회 호출됩니다.<br> `projectID` 가 실제 프로젝트의 추적ID와 같도록 변경해주어야 합니다..





## 고유 사용자 식별



**{ ? gd_is_login() }**  치환코드를 활용하여 사용자의 로그인 유무를 판별할 수 있습니다. 

<!--{ ? gd_is_login() === false }-->
 (로그인전)    
<!--{ : }-->
 (로그인후)   

로그인 상태에서는 **(로그인후)** 영역이 활성화되어 해당 UI가 출력됩니다. ex) <code>로그아웃</code> , <code>회원정보</code> 버튼 활성화
반대로 로그아웃인 상태에선 **(로그인전)** 가 활성화되며 해당하는 UI가 출력됩니다. ex) <code>로그인</code>  버튼 활성화

**(로그인후)** 영역 내부에 로그인 사용자 정보를 기록한 **hidden div 태그** 들을 추가합니다. 
그리고 **hidden div 태그** 를 **DOM scraping** 하여 로그인 사용자 식별을 시도합니다.  



### 로그인 사용자 식별 



#### { ? gd _is_login() } 치환코드 수정 

상단 헤더 파일의 **{ ? gd_is_login() }** 치환코드 내부를 아래와 같이 수정합니다. 

```html
<!--{ ? gd_is_login() === false }-->
<li>
    <a href="../member/login.php">로그인</a>
</li>
<li>
    <a href="../member/join_method.php">회원가입</a>
</li>
<!--{ : }-->
<li>
    <a href="../member/logout.php?returnUrl={=logoutReturnUrl}">로그아웃</a>
    <a href="../member/mypage.php">마이페이지</a>    
    
    <!--  bigin login start  -->    
    <div class="bigin-user bigin-login">
	    <div class="bigin-user-name" style="display:none;">"{=gSess.memNm}"</div>
		<div class="bigin-user-id" style="display:none;">"{=gSess.memNo}"</div>
		<div class="bigin-user-phone" style="display:none;">"{=gSess.cellPhone}"</div>
		<div class="bigin-user-email" style="display:none;">"{=gSess.memId}"</div>        
    </div>
    <!--  bigin login end  -->            
</li>
<!--{ / }-->
```



#### 로그인 사용자 식별을 위한 gtm 컨테이너 구성 

**"bigin 로그인"** 태그와 **"biginUserExistingTrg"** 트리거가 사용됩니다.

**"bigin 로그인"** 태그는 DOM scraping 과 bigin 로그인 사용자 식별을 수행하는 코드로 구성되며, 
**"biginUserExistingTrg"** 트리거는 **모든 페이지뷰**와 **맞춤 자바스크립트 변수**가 활성 조건인 트리거입니다.

 

 **태그 : bigin 로그인** 

```html
<script>
	function biginLoad(biginUser) {
	    var timer = 0;
  
	    var interverId = setInterval(function() {
          
	    	timer += 500;
          	
	    	if ( timer >= 5000 ) {
              	console.log(timer);              
              	console.log("clearInterval before failure");              
	    		clearInterval(interverId);

	    	}
          	else if( typeof(bigin) == 'object' ){
              	console.log("clearInterval after success");                            
            	bigin.user("profile", biginUser)	
	    		clearInterval(interverId);   

            }
	    }, 500);
    }   
  
	(function(){
      	var biginUser = {};
    	try{
        	biginUser.id = document.querySelector(".bigin-user-id").innerText;
        	biginUser.name = document.querySelector(".bigin-user-name").innerText;
        	biginUser.email = document.querySelector(".bigin-user-email").innerText;
        	biginUser.phoneCell = document.querySelector(".bigin-user-phone-cell").innerText;       
          	biginLoad(biginUser);
        }
		catch(e){
      		console.log(e);
		}
    })()
  

</script>
```



 **트리거 : biginUserExistingTrg** 

![godo-loginTrg](/Users/westlife/Desktop/godo-loginTrg.png)



 **변수 : pageViewVar** 

맞춤 자바스크립트 유형의 변수를 사용합니다. 

```javascript
function(){
	var flag = false;
  	if(document.querySelector(".bigin-user")){
      	var biginUser = document.querySelector(".bigin-user .bigin-user-id");
      	if(biginUser){
	    	flag = true;        
        }
    }
  	console.log(flag);
	return flag;
}
```



### 로그아웃 추적  



#### Layout_stateLogon 모듈 수정 



#### 로그아웃 추적을 위한 gtm 컨테이너 구성 

**"cafe24 bigin 로그아웃"** 태그와 **"logoutButtonClickedTrg"** 트리거가 사용됩니다.

**"cafe24 bigin 로그아웃"** 태그는 즉시실행함수의 형태로 bigin 로그아웃 추적 코드를 실행합니다.
**"logoutButtonClickedTrg"** 트리거는 **클릭 - 모든 요소**와 **맞춤 자바스크립트 변수**가 활성 조건인 트리거입니다.

 

 **태그 : bigin 로그아웃** 

```html
<script>
  (function(){
  	bigin.user("logout")
  })()
</script>
```



 **트리거 : logoutButtonClickedTrg** 

![cafe24_logout_trigger](http://support.bigin.io/images/cafe24_logout_trigger.png)



 **변수 : buttonClickedVar** 

맞춤 자바스크립트 유형의 변수를 사용합니다. 

```javascript
function(){
	var flag = false;
  
  	// 로그아웃 버튼의 클래스 명  
  	if({{Click Classes}}.indexOf("btnLogout") > -1){
    	console.log('로그아웃 버튼 클릭 : ' + {{Click Classes}});
		flag = 'logout';
    }
    
	return flag;
}
```





## 이커머스 추적 



### 제품의 링크 클릭

쇼핑몰의 랜딩페이지, 상품 분류 페이지, 검색 결과 페이지 등 **제품 상세페이지 링크** 가 노출되는 페이지에서 **제품 링크 클릭** 에 대한 이커머스 추적을 실행해야합니다.

이때, UI 레이어에 노출된 상품의 데이터(상품명, 가격, 설명 등)를 효율적으로 가져오기 위해서 **hidden div 태그**를 삽입합니다. 
그리고 **hidden div 태그**는 상품의 데이터를 내용으로 취합니다. 



cafe24는 상품 리스트에 관한 모듈들이 있습니다. 

| 페이지           | 모듈명                                 |
| ---------------- | -------------------------------------- |
| 메인페이지       | product_listmain_[seq]                 |
| 상품 분류 페이지 | product_listrecommend (추천 상품 목록) |
| 상품 분류 페이지 | product_listnew (신상품 목록)          |
| 상품 분류 페이지 | product_listnormal (일반상품 목록)     |
| 검색 결과 페이지 | search_result (상품 검색 결과 목록)    |
| 상품 상세 페이지 | product_relation (관련 상품 목록)      |



상품 목록 모듈 수정 

상품 목록 모듈의 html은 <code>ui</code> 태그 내부에 두 개의 <code>li</code> 태그들을 가집니다.
두 <code>li</code> 태그 내부에 상품 데이터를 바인딩한 태그들을 아래와 같이 추가해줍니다. 

```html
<div module="상품 목록 모듈" class="ec-base-product">
        <ul class="prdList grid2">
            <li id="anchorBoxId_{$product_no}">
                <div class="thumbnail">
                    <div class="prdImg">
                        <a href="{$link_product_detail}">
                            <img src="{$image_medium}" id="{$image_medium_id}"/>
                        </a>
                    </div>
                </div>
                
 				<!--  코드 추가 start -->               
                <div class="bigin-product" style="display:none;">
	                <div class="bigin-product-id" style="display:none;">"{$product_no}"</div>
    	            <div class="bigin-product-name" style="display:none;">"{$product_name}"</div>
        	        <div class="bigin-product-price" style="display:none;">"{$product_price}"</div>
            	    <div class="bigin-product-brand" style="display:none;">"{$prd-brand}"</div>                                    
                    <div class="bigin-product-thumbnail" style="display:none;">"{$image_medium}"</div>
                </div>
 				<!--  코드 추가 end -->                               
            </li>
            <li id="anchorBoxId_{$product_no}">
                <div class="thumbnail">
                    <div class="prdImg">
                        <a href="{$link_product_detail}">
                            <img src="{$image_medium}" id="{$image_medium_id}"/>
                        </a>
                    </div>
                </div>
 				<!--  코드 추가 start -->                   
				<div class="bigin-product" style="display:none;">
	                <div class="bigin-product-id" style="display:none;">"{$product_name}"</div>
    	            <div class="bigin-product-name" style="display:none;">"{$product_name}"</div>
        	        <div class="bigin-product-price" style="display:none;">"{$product_price}"</div>
            	    <div class="bigin-product-brand" style="display:none;">"{$prd-brand}"</div>                                    
                    <div class="bigin-product-thumbnail" style="display:none;">"{$image_medium}"</div>
                </div>
 				<!--  코드 추가 end -->                   
            </li>
        </ul>
    </div>
```



**태그 : cafe24 bigin 상품링크클릭**

```html
<script>
  (function(){
    var biginProductContainer;
  	var biginProduct = {};
    try{
      	biginProductContainer = {{Click Element}}.closest("li");
    
    	biginProduct.id = biginProductContainer.querySelector(".bigin-product-id").innerText;
    
    	biginProduct.name = biginProductContainer.querySelector(".bigin-product-name") ? biginProductContainer.querySelector(".bigin-product-name").innerText : "";
    
    	biginProduct.price = biginProductContainer.querySelector(".bigin-product-price").innerText.replace(/[^0-9]/g ,"");
    
    	var thumbnail = biginProductContainer.querySelector(".bigin-product-thumbnail").innerText;
    	if(thumbnail.startsWith("//")){
          	thumbnail = thumbnail.replace("//" ,'');
        }
    	biginProduct.thumbnail = [thumbnail];
    
    	var list = biginProductContainer.querySelector(".bigin-product-list") ? biginProductContainer.querySelector(".bigin-product-list").innerText : '';
    	biginProduct.list = window.location.pathname + list;
    	console.log("bg:impression", biginProduct)
    }catch(e){
    	console.log(e);
    }
    
  })()
</script>
```



**트리거 : impressionTrg**

![impressionTrg](/Users/westlife/Desktop/impressionTrg.png)



변수 : clickVar

```javascript
function(){
	var flag = false;
  	var regexProductDetail = new RegExp(/product\/.*?\/[0-9]+.*/);
  
    // 상품 링크 클릭 
	if(regexProductDetail.test({{Click URL}})){
    	console.log('상품 링크 클릭 : ' + {{Click URL}});      
    	flag = 'impression';
    }  
  
  	// 로그아웃 버튼의 클래스 명  
  	if({{Click Classes}}.indexOf("btnLogout") > -1){
    	console.log('로그아웃 버튼 클릭 : ' + {{Click Classes}});
		flag = 'logout';
    }
    
	return flag;
}
```





### 제품의 노출

**제품 상세 페이지**의 조회 시에 노출되는 제품의 상세정보들을 추적합니다. 



### 제품의 노출

**제품 상세 페이지**의 조회 시에 노출되는 제품의 상세정보들을 추적합니다. 



**상품상세화면 템플릿 수정**

<code>goods/goods_view.html</code>를 아래와 같이 수정합니다.

```html
{*** 상품상세화면 | goods/goods_view.php ***}
{ # header }
<div class="content_box">
    // ...
</div>

<!-------- bigin sdk Start--------->
<script>
    var callViewProduct = function(){
	    var biginProduct = {};
    	biginProduct.id = '{goodsView.goodsNo}';
	    biginProduct.name = '{goodsView.goodsNm}';
    	biginProduct.price = '{goodsView.goodsPrice}';
	    biginProduct.categories = ['{goodsView.cateNm}'];
    	biginProduct.thumbnail = [document.querySelector('.thumbnail>a>img').src];    
	    biginProduct.brand = '{goodsView.brandNm}';        
        window.dataLayer.push(
            {
                event : "viewProduct",
                data : biginProduct
			}
        )
    }
    
    window.addEventListener("load", function(){
        callViewProduct();
    })
</script>
<!-------- bigin sdk End--------->

{=fbGoodsViewScript}
{ # footer }

```



**태그 : viewProduct**

~~~html
<script>
    (function(){
        bigin.event("bg:viewProduct", {{data}})
    })()
</script>
~~~



**트리거 : viewProductTrg**



![godo-viewProductTrg](/Users/westlife/Desktop/godo-viewProductTrg.png)



제품의 노출을 추적하기 위해 **일부 페이지뷰** 유형의 트리거를 사용하며, 제품 상세 페이지의 <code>path name</code> 의 값을 정규표현식을 통해 식별합니다.



### 장바구니 추가

상품상세화면 html 페이지에서 **장바구니 추가**에 해당 기능을 수행하는 함수가 공개되는 경우, 해당 함수를 활용하며, 
그렇지 않은 경우, 아래의 가이드를 따라주시기 바랍니다.



**상품상세화면 템플릿 수정**

<code>goods/goods_view.html</code>를 아래와 같이 수정합니다.

~~~html
{*** 상품상세화면 | goods/goods_view.php ***}
{ # header }
<div class="content_box">
    // ...
</div>

<!-------- bigin sdk Start--------->
<script>
    var callViewProduct = function(){
		// 생략
    }
    
    var callAddToCart = function(){
        var biginProductList = []
		document.querySelectorAll("div[id*='option_display_item']").forEach(function(e, i){
			var biginProduct = {};
			biginProduct.id = e.querySelector("input[name*='goodsNo']").value;
			biginProduct.name = e.querySelector("span.name").innerText;
			biginProduct.quantity = e.querySelector("input[name*='goodsCnt']").value
			biginProduct.price = e.querySelector(".price").innerText.replace(/[^0-9]/g, "");

			biginProductList.push(biginProduct);
		})
        
         window.dataLayer.push(
            {
                event : "addToCart",
                data : {
                    products : biginProductList
                }
			}
        )
    }
    
    window.addEventListener("load", function(){
        callViewProduct();
        document.querySelector("장바구니 버튼 태그 셀렉터").addEventListener("click" , function(){
            callAddToCart();
        })
    })
</script>
<!-------- bigin sdk End--------->

{=fbGoodsViewScript}
{ # footer }


~~~





**태그 : addToCart**

~~~html
<script>
    (function(){
        bigin.event("bg:addToCart" , {{data}})
    })()
</script>
~~~





**트리거 : addToCartTrg**

![godo-addToCartTrg](/Users/westlife/Desktop/godo-addToCartTrg.png)



### 장바구니 조회



**장바구니 템플릿 수정**

~~~html
{*** 장바구니 | front/order/cart.php ***}
{ # header }

<div class="content_box">
    <div class="order_wrap">
        <div class="cart_cont">

            <form id="frmCart" name="frmCart" method="post" target="ifrmProcess">
                
                <div class="cart_cont_list">

                    <div class="order_table_type">
                        <table>
                        	</thead>
                            </thead>
                            <tbody>

                            <!--{ @ .value_ }-->
                            <!--{ @ ..value_ }-->
                            <tr>
                        	// ...
<!------ bigin cart Start ------>                                
<script>
	var biginProductImage = document.querySelector("상품 이미지 태그 셀렉터").src;
	var biginProductList = biginProductList || [];
	var biginProduct = {};
	biginProduct.id = "{=...goodsNo}";
	biginProduct.name = "{=...goodsNm}";
	biginProduct.quantity = "{=...goodsCnt}";
	biginProduct.price = "{=...goodsPriceString}";
    biginProduct.thumbnail = [biginProductImage];    
	biginProductList.push(biginProduct)
</script>
<!------ bigin cart End ------>                                                                
							// ...
							</tr>
                    </tbody>
                    
<!------ bigin sdk Start ------>                            
<script>
    window.addEventListener("load", function(){
        window.dataLayer.push(
            {
                event : "cart",
                data : {
                    products : biginProductList
                }
            }
        )
    })
</script>
<!------ bigin sdk End ------>     
{=fbCartScript}
{ # footer }
~~~





**태그 : bigin 장바구니 **

```html
<script>
    (function(){
        bigin.event("bg:cart" , {{data}})
    })()
</script>
```



**트리거 : cartTrg**

![godo-cartTrg](/Users/westlife/Desktop/godo-cartTrg.png)



### 장바구니 제거 



**장바구니 템플릿 수정**

```html
{*** 장바구니 | front/order/cart.php ***}
{ # header }

<div class="content_box">
    <div class="order_wrap">
        <div class="cart_cont">

            <form id="frmCart" name="frmCart" method="post" target="ifrmProcess">
                
                <div class="cart_cont_list">

                    <div class="order_table_type">
                        <table>
                        	</thead>
                            </thead>
                            <tbody>

                            <!--{ @ .value_ }-->
                            <!--{ @ ..value_ }-->
                            <tr>
                        	// ...
<!------ bigin cart Start ------>                                
<script>
	// 생략
</script>
<!------ bigin cart End ------>                                                                
							// ...
							</tr>
                    </tbody>
                    
<!------ bigin sdk Start ------>                            
<script>
    
    var callBiginTrack = function(param){
        var biginSelectedProductList = [];
		document.querySelectorAll("input[id*='cartSno']:checked").forEach(function(e, i){
			biginSelectedProductList.push(biginProductList[i]);
		})        
        
        if(param == 'remove'){
	        window.dataLayer.push({
    	        event : "removeCart",
        	    data : {
            	    products : biginSelectedProductList
	            }
    	    })            
        }
    }
    
    window.addEventListener("load", function(){
        window.dataLayer.push(
            {
                event : "cart",
                data : {
                    products : biginProductList
                }
            }
        )
        
        document.querySelector("상품 삭제 버튼 셀렉터").addEventListener("click" , function(){
            callBiginTrack('remove');
        })
        
    })
</script>
<!------ bigin sdk End ------>     
{=fbCartScript}
{ # footer }
```





**태그 : bigin 장바구니 제거**

```html
<script>
    (function(){
        bigin.event("bg:removeCart" , {{data}})
    })()
</script>
```



**트리거 : removeCartTrg**

![godo-removeCartTrg](/Users/westlife/Desktop/godo-removeCartTrg.png)



### 체크아웃 프로세스 시작



**장바구니 템플릿 수정**

```html
{*** 장바구니 | front/order/cart.php ***}
{ # header }

<div class="content_box">
    <div class="order_wrap">
        <div class="cart_cont">

            <form id="frmCart" name="frmCart" method="post" target="ifrmProcess">
                
                <div class="cart_cont_list">

                    <div class="order_table_type">
                        <table>
                        	</thead>
                            </thead>
                            <tbody>

                            <!--{ @ .value_ }-->
                            <!--{ @ ..value_ }-->
                            <tr>
                        	// ...
<!------ bigin cart Start ------>                                
<script>
	// 생략
</script>
<!------ bigin cart End ------>                                                                
							// ...
							</tr>
                    </tbody>
                    
<!------ bigin sdk Start ------>                            
<script>
    
    var callBiginTrack = function(param){
        var biginSelectedProductList = [];
		document.querySelectorAll("input[id*='cartSno']:checked").forEach(function(e, i){
			biginSelectedProductList.push(biginProductList[i]);
		})        
        
        if(param == 'remove'){
	        window.dataLayer.push({
    	        event : "removeCart",
        	    data : {
            	    products : biginSelectedProductList
	            }
    	    })            
        }
        else if(param == 'checkout'){
			window.dataLayer.push({
    	        event : "checkoutStep0",
        	    data : {
            	    products : biginSelectedProductList
	            }
    	    })            
        }
    }
    
    
    window.addEventListener("load", function(){
        window.dataLayer.push(
            {
                event : "cart",
                data : {
                    products : biginProductList
                }
            }
        )
        
        document.querySelector("상품 삭제 버튼 셀렉터").addEventListener("click" , function(){
            callBiginTrack('remove');
        })
		document.querySelector("상품 구매 버튼 셀렉터").addEventListener("click" , function(){
            callBiginTrack('checkout');
        })
        
    })
</script>
<!------ bigin sdk End ------>     
{=fbCartScript}
{ # footer }
```





**태그 : bigin 체크아웃 step 0**

```html
<script>
    (function(){
        bigin.event("bg:checkout" , {{data}})
    })()
</script>
```



**트리거 : checkoutStep0Trg**

![godo-checkoutStep0Trg](/Users/westlife/Desktop/godo-checkoutStep0Trg.png)





### 체크아웃 프로세스 추적



**태그 : bigin 체크아웃 프로세스 추적**

```html
<script>
  (function(){
  	var checkedInput = document.querySelector("input[id*='settleKind']:checked");
	var payMethod = checkedInput.closest(".form-element").querySelector("label").innerText;
    
    bigin.event("bg:checkout" , {
    	step : 1,
      	option : payMethod
    })
  })()
</script>
```



**트리거 : checkoutStepNTrg**

![checkoutStepNTrg](/Users/westlife/Desktop/checkoutStepNTrg.png)





### 제품 구매 완료

**구매완료 페이지 수정**

페이지 상단 또는 하단에 아래의 스크립트를 추가해주세요.

~~~html
<script>
	function callBiginPurchase(){
		var data = {};
		data.id = {orderInfo.orderNo};
		data.affilation = '';
		data.shipping = {=gd_isset(orderInfo.totalDeliveryCharge)};
		data.price = {orderInfo.totalGoodsPrice};
		data.payMethod = '{=gd_isset(orderInfo.settleName)}';
	

		function parse(string) {
			var pairs = string.slice(1).split(',');
      		var result = {};
			pairs.forEach(function (pair) {
				pair = pair.split(':');
				result[pair[0]] = decodeURIComponent(pair[1] || '');
			});
		return JSON.parse(JSON.stringify(result));
		}

    	var productList = [];
    	document.querySelectorAll('input').forEach(function(element){
      		if(element.name == 'naver-common-inflow-script-order-item'){
        		var product = parse(element.value);
        		productList.push({
          			'id' : product.goodsno.substring(1, product.goodsno.length-1),
					'price' : (product.price/ Number(product.ea)),
					'name' : product.goodsnm.substring(1, product.goodsnm.length-1),
					'quantity' : Number(product.ea)
        		});
			}
		});
		window.dataLayer.push(
			{'data' : undefined},
			{
				'event' : 'purchase',
				'data' : {
					'id' : data.id,
					'affiliation' : data.affiliation,
					'revenue' : data.price,
					'paymethod' : data.payMethod,
					'products' : productList
				}
			}
		);
	}
	window.addEventListener("load", function(){
		callBiginPurchase();
	})
</script>	
~~~



주문된 상품의 데이터를 DOM scraping 방식으로 가져오기 위하여 아래와 같은 방식으로 모듈의 html 을 수정해야합니다.



**태그 : bigin 구매안료**

```html
<script>
    (function(){
        bigin.event("bg:purchase" , {{data}})
    })()
</script>
```



**트리거 : purchaseTrg**

![purchaseTrg](/Users/westlife/Desktop/purchaseTrg.png)





### 제품의 환불

주문상세, 주문목록 html 페이지에서 **주문취소**에 해당 기능을 수행하는 함수가 공개되는 경우, 해당 함수를 활용하며, 
그렇지 않은 경우, 아래의 가이드를 따라주시기 바랍니다.



**태그 : bigin 환불**

```html
<script>
  (function(){
    var orderId;
    
    try{
		orderId = {{Click Element}}.closest("tr[data-order-no]").getAttribute("data-order-no")
       	bigin.event("bg:refund" {
   			id : orderId
	   	})
    }
    catch(e){
    	console.log(e);
    }

  })()
</script>
```





**트리거 : refundTrg**

![refundTrg](/Users/westlife/Desktop/refundTrg.png)









