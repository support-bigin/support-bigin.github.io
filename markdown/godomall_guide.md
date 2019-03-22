# 고도몰 bigin sdk 설치 

## 시작하기

bigin sdk를 고도몰 기반 쇼핑몰에 설치하기 위해 아래의 방식들을 사용합니다. 

1. **구글 태그매니저** 

   - 제공되는 gtm 컨테이너를 가이드에 따라 수정하여 쇼핑몰에 맞게 커스터마이징할 수 있습니다.

2. **DOM scraping 방식**

   - 고도몰 쇼핑몰의 특성 상, 데이터 처리에 관여하는 비즈니스 로직을 공개하지 않는 경우가 있습니다.

   - ​	1) **상품리스트** 페이지에서의 **상품 데이터 조회**,  

     ​	2) **게시판** 페이지에서 **게시글 정보 생성**

     ​	3) 상품 주문 시, **결제 정보 생성** 등

     과 같은 비즈니스 로직은 관리자페이지에서 접근 할 수 없는 경우가 존재합니다.	
     이와 같은 경우에 **DOM scraping** 방식을 사용합니다.

   

   - **DOM scraping 방식**은 HTML로 구성된 UI 레이어의 DOM 트리에 직접 접근하여 필요한 데이터를 가져오는 방식입니다. 	
     손쉬운 **DOM scraping** 을 위해 가이드에 따른 **hidden div 태그**를 추가하는 코드가 필요합니다.	

     

<span class="end-point"></span>

## gtm 컨테이너 내려받기

[godomall_container.json](http://support.bigin.io/data/container.json) 파일을 내려받은 후, 사용할 구글 태그매니저 컨테이너에 병합합니다.	
godomall_container.json 파일은 bigin 기본 추적 스크립트의 삽입부터 대부분의 추적 코드들을 구현한 gtm 컨테이너입니다.

gtm 컨테이너의 **내려받기**와 **가져오기**에 대한 자세한 설명은 [이곳](https://support.google.com/tagmanager/answer/6106997?hl=en)를 참조해주세요.



<span class="end-point"></span>

<br>

## 구글 태그매니저 설치 

고도몰 관리자페이지에 접속한 후, **레이아웃의 페이지 소스** 내부에 **구글 태그매니저 스니펫**을 삽입합니다.	
고도몰 쇼핑몰의 모든 페이지들은 **상단 레이아웃 html** 과 **하단 레이아웃 html**을 포함하며,  
**구글 태그매니저 스니펫** 을 레이아웃의 html 에 삽입함으로써 모든 페이지에서 컨테이너의 정보를 가진 **gtm.js**에 접근할 수 있습니다. 

[구글 태그 관리자 고객센터](https://support.google.com/tagmanager/answer/6103696?hl=ko) 또는 [구글 태그 관리자 개발가이드](https://developers.google.com/tag-manager/quickstart)에서 자세한 설치법을 알아보세요.



<span class="end-point"></span>



## 기본 추적 스크립트 삽입



#### 추적 코드 스니펫

[godomall_container.json](http://support.bigin.io/pages/%5Bhttp://www.google.co.kr%5D(http://www.google.co.kr/)) 의 태그 중 **"bigin 삽입"** 태그를 통해서 **bigin.sdk.js** 가 프로젝트 내부에 로드됩니다.	
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

<br>

**bigin 삽입** 태그의 트리거는 **모든 페이지뷰** 로 설정되어 있어 페이지 변경 시, 매회 호출됩니다.<br> `projectID` 가 실제 프로젝트의 추적ID와 같도록 변경해주어야 합니다..



<br>

<span class="end-point"></span>

## 고유 사용자 식별



**{ ? gd_is_login() }**  치환코드를 활용하여 사용자의 로그인 유무를 판별할 수 있습니다. 



~~~javascript
<!--{ ? gd_is_login() === false }-->

    (로그인전)  
    //ex) <button>login</button>
    //ex) <button>join</button>
<!--{ : }-->

     (로그인후)
    //ex) <button>logout</button>
    //ex) <button>mypage</button>
~~~

<br>

로그인 상태에서는 **(로그인후)** 영역이 활성화되어 해당 UI가 출력됩니다. ex) <code>로그아웃</code> , <code>회원정보</code> 버튼 활성화	
반대로 로그아웃인 상태에선 **(로그인전)** 가 활성화되며 해당하는 UI가 출력됩니다. ex) <code>로그인</code>  버튼 활성화	

**(로그인후)** 영역 내부에 로그인 사용자 정보를 기록한 **hidden div 태그** 들을 추가합니다. 	
그리고 **hidden div 태그** 를 **DOM scraping** 하여 로그인 사용자 식별을 시도합니다.  	



### 로그인 사용자 식별 

**"bigin 로그인"** 태그와 **"biginUserExistingTrg"** 트리거가 사용됩니다.

**"bigin 로그인"** 태그는 DOM scraping 과 bigin 로그인 사용자 식별을 수행하는 코드로 구성되며, 
**"biginUserExistingTrg"** 트리거는 **모든 페이지뷰**와 **맞춤 자바스크립트 변수**가 활성 조건인 트리거입니다.



#### 템플릿 : { ? gd _is_login() } 치환코드 수정 

상단 헤더 파일의 **{ ? gd_is_login() }** 치환코드 내부를 아래와 같이 수정합니다. 

```javascript
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

<br> 

####  **태그 : bigin 로그인** 

```javascript
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



#### **트리거 : biginUserExistingTrg** 

![godo-loginTrg](http://support.bigin.io/images/godo-loginTrg.png)



#### **변수 : pageViewVar** 

```javascript
function(){
	var flag = false;
  	if(document.querySelector(".bigin-user")){
      	var biginUser = document.querySelector(".bigin-user .bigin-user-id");
      	if(biginUser){
	    	flag = 'login';        
        }
    }
	return flag;
}
```

<br>

### 로그아웃 추적  

로그인 사용자의 로그아웃 행동을 추적합니다.	
**bigin 로그아웃** 태그와 **logoutTrg** 트리거가 사용됩니다.	
**logoutTrg** 는 요소 클릭 형식의 트리거로써 **clickVar** 변수를 사용합니다.



<br>

 

####  **태그 : bigin 로그아웃** 

```javascript
<script>
  (function(){
  	bigin.user("logout")
  })()
</script>
```



####  **트리거 : logoutButtonClickedTrg** 

![godo_logoutTrg](http://support.bigin.io/images/godo-logoutTrg.png)



#### **변수 : clickVar** 

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



<span class="end-point"></span>

## 이커머스 추적 



### 제품의 링크 클릭

쇼핑몰의 랜딩페이지, 상품 분류 페이지, 검색 결과 페이지 등 **제품 상세페이지 링크** 가 노출되는 페이지에서 **제품 링크 클릭** 에 대한 이커머스 추적을 실행해야합니다.

이때, UI 레이어에 노출된 상품의 데이터(상품명, 가격, 설명 등)를 효율적으로 가져오기 위해서 **hidden div 태그**를 삽입합니다. 
그리고 **hidden div 태그**는 상품의 데이터를 내용으로 취합니다. 





#### **템플릿 : 상품목록 템플릿 수정** 

고도몰의 상품 리스트 페이지에 게재되는 상품들에 대한 치환코드는 보통 <code>goods/list/list-[seq]</code> 페이지에 기록되어 있습니다.	
<code>goods/list/list-[seq]</code> 페이지를 아래와 같이 수정해주세요.

```javascript
{*** 갤러리형 | goods/list/list_01.html ***}
<div class="item_gallery_type">
    <!--{ ? goodsList }-->
    <ul>
        <!--{ @ goodsList }-->
        <!--{ @ .value_ }-->
        <li>
            <div class="item_cont">
                <div class="item_photo_box">
                    <a href="{=gd_goods_url(..goodsUrl, ..goodsNo)}"target="_blank">
                        {..goodsImage}
                    </a>
                </div>
                <div class="item_info_cont">
                    <div class="item_tit_box">
                        <span class="item_brand">
                            <strong>[{..brandNm}]</strong>
                            {..makerNm}
                        </span>
                        <a href="{=gd_goods_url(..goodsUrl, ..goodsNo)}">
                            <strong class="item_name">{..goodsNm}</strong>
                            <span class="item_name_explain">{..shortDescription}</span>
                        </a>
                    </div>
                    <div class="item_money_box">
                        <strong class="item_price">
                            {..goodsPriceString}
                        </strong>
                    </div>
                </div>
            </div>
            <!------ bigin sdk Start  ------>
            <div class="bigin-product" style="display:none;">
				<div class="bigin-product-id" style="display:none;">{..goodsNo}</div>
				<div class="bigin-product-image" style="display:none;">{..goodsImage}</div>
				<div class="bigin-product-price" style="display:none;">{..goodsPrice}</div>
				<div class="bigin-product-name" style="display:none;">{..goodsNm}</div>
				<div class="bigin-product-brand" style="display:none;">{..brandNm}</div>
            </div>
            <!------ bigin sdk End  ------>            
        </li>
    </ul>
</div>
<!-- //item_gallery_type -->

```

<br>

#### **태그 : bigin 상품링크클릭**

```javascript
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



#### **트리거 : impressionTrg**

![impressionTrg](http://support.bigin.io/images/cafe24-impressionTrg.png)

<br>

#### **변수 : clickVar**

```javascript
function(){
	var flag = false;
  	var regexProductDetail = new RegExp(/product\/.*?\/[0-9]+.*/);
  
    // 상품 링크 클릭 
	if(regexProductDetail.test({{Click URL}})){
    	console.log('상품 링크 클릭 : ' + {{Click URL}});      
    	flag = 'impression';
    }  
    
	return flag;
}
```

<br>

### 제품의 노출

**제품 상세 페이지**의 조회 시에 노출되는 제품의 상세정보들을 추적합니다. 

**bigin 제품노출** 태그와 **viewProductTrg** 트리거가 사용됩니다. 

<br>

#### **템플릿 : 상품상세화면 템플릿 수정**

<code>goods/goods_view.html</code>를 아래와 같이 수정합니다.

```javascript
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

<br>

#### **태그 : viewProduct**

~~~javascript
<script>
    (function(){
        bigin.event("bg:viewProduct", {{data}})
    })()
</script>
~~~

<br>

#### **트리거 : viewProductTrg**



![godo-viewProductTrg](http://support.bigin.io/images/godo-viewProductTrg.png)



제품의 노출을 추적하기 위해 **일부 페이지뷰** 유형의 트리거를 사용하며, 제품 상세 페이지의 <code>path name</code> 의 값을 정규표현식을 통해 식별합니다.



<br>

### 장바구니 추가

상품상세화면 html 페이지에서 **장바구니 추가**에 해당 기능을 수행하는 함수가 공개되는 경우, 해당 함수를 활용하며, 
그렇지 않은 경우, 아래의 가이드를 따라주시기 바랍니다.

장바구니 추가 이벤트를 추적하기 위해서 **bigin 장바구니 추가** 태그와 **addToCartTrg** 트리거를 사용합니다.

<br>

#### **템플릿 : 상품상세화면 템플릿 수정**

<code>goods/goods_view.html</code>를 아래와 같이 수정합니다.

~~~javascript
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



<br>

#### **태그 : addToCart**

~~~javascript
<script>
    (function(){
        bigin.event("bg:addToCart" , {{data}})
    })()
</script>
~~~



<br>



#### **트리거 : addToCartTrg**

![godo-addToCartTrg](http://support.bigin.io/images/godo-addToCartTrg.png)

<br>

### 장바구니 조회



장바구니 페이지 조회 시, 장바구니 담긴 상품들의 정보를 추적합니다.

**bigin 장바구니 조회** 태그와 **cartTrg**트리거가 사용됩니다.	
**cartTrg** 트리거는 맞춤 이벤트 형식으로 <code>cart</code>라는 이름을 사용합니다.

#### **템플릿 : 장바구니 템플릿 수정**

~~~javascript
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



<br>

#### **태그 : bigin 장바구니 **

```javascript
<script>
    (function(){
        bigin.event("bg:cart" , {{data}})
    })()
</script>
```

<br>

#### **트리거 : cartTrg**

![godo-cartTrg](http://support.bigin.io/images/godo-cartTrg.png)



<br>

### 장바구니 제거 

장바구니에 담긴 상품의 제거 시, 해당 행동과 제거되는 상품의 정보를 추적합니다.	
**bigin 장바구니 제거** 태그와 **removeCartTrg** 트리거가 사용됩니다.	
**removeCartTrg** 트리거는 맞춤이벤트 형식의 트리거로써 <code>removeCart</code> 를 이벤트 이름으로 취합니다.

<br>

#### **템플릿 : 장바구니 템플릿 수정**

```javascript
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



<br>

#### **태그 : bigin 장바구니 제거**

```javascript
<script>
    (function(){
        bigin.event("bg:removeCart" , {{data}})
    })()
</script>
```

<br>

#### **트리거 : removeCartTrg**

![godo-removeCartTrg](/Users/westlife/Desktop/godo-removeCartTrg.png)



### 체크아웃 프로세스 시작

장바구니 페이지에서 체크아웃 프로세스를 진행하는 경우, 	
**bigin 체크아웃 step 0** 태그와 **checkoutStep0Trg** 트리거를 통해서 체크아웃 프로세스 추적을 진행합니다.	
**checkoutStep0Trg**는 맞춤이벤트 형식의 트리거로써 <code>checkoutStep0</code> 이벤트이름으로 취합니다.

#### **템플릿 : 장바구니 템플릿 수정**

```javascript
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



<br>

#### **태그 : bigin 체크아웃 step 0**

```javascript
<script>
    (function(){
        bigin.event("bg:checkout" , {{data}})
    })()
</script>
```



<br>

#### **트리거 : checkoutStep0Trg**

![godo-checkoutStep0Trg](/Users/westlife/Desktop/godo-checkoutStep0Trg.png)



<br>

### 체크아웃 프로세스 추적



체크아웃 프로세스에 진입한 후, 각 단계와 옵션 정보를 추적합니다.	
체크아웃 프로세스 추적을 위해 **bigin 체크아웃 프로세스 추적** 태그와 **checkoutStepNTrg** 트리거를 사용되며,	
**checkoutStepNTrg** 트리거는 요소클릭 형식의 트리거로 **clickVar** 변수를 사용합니다.



**태그 : bigin 체크아웃 프로세스 추적**

```javascript
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

![checkoutStepNTrg](http://support.bigin.io/images/godo-checkoutStepNTrg.png)



<br>

#### **변수 : clickVar**

```javascript
function(){
	var flag = false;
  	var regexProductDetail = new RegExp(/product\/.*?\/[0-9]+.*/);
  
    // 상품 링크 클릭 
	if({{Click Classes}}.indexOf("구매하기 버튼 태그 클래스명") > -1)){
    	console.log('구매하기 버튼 클릭 : ' + {{Click Classes}});      
    	flag = 'checkoutStepN';
    }  
    
	return flag;
}
```

<br>

### 제품 구매 완료

고도몰 기반의 쇼핑몰은 구매 완료페이지에서 구매 상품에 대한 정보가 노출되지 않습니다.
그 대신 **hidden input** 형식으로 제한된 상품 정보들만 제공됩니다. 

#### **템플릿 : 구매완료 페이지 수정**

페이지 상단 또는 하단에 아래의 스크립트를 추가해주세요.

~~~javascript
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



#### **태그 : bigin 구매안료**

```javascript
<script>
    (function(){
        bigin.event("bg:purchase" , {{data}})
    })()
</script>
```



#### **트리거 : purchaseTrg**

![purchaseTrg](http://support.bigin.io/images/godo-purchaseTrg.png)





### 제품의 환불

주문상세, 주문목록 html 페이지에서 **주문취소**에 해당 기능을 수행하는 함수가 공개되는 경우, 해당 함수를 활용하며, 
그렇지 않은 경우, 아래의 가이드를 따라주시기 바랍니다.



#### **태그 : bigin 환불**

```javascript
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





#### **트리거 : refundTrg**

![refundTrg](http://support.bigin.io/images/godo-refundTrg.png)



<span class="end-point"></span>





