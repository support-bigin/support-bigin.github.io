# 임대형 솔루션에 설치 (카페24)



온라인 커머스의 서비스 구축 형태가 임대형 솔루션인 경우, 지원되는 설치의 범위 또는 제한사항이 임대형 솔루션의 정책에 따라 다르게 적용됩니다. 임대형 솔루션에 비긴 애널리틱스 설치를 위한 설치 방법을 안내합니다.



- 고도몰 임대형 솔루션에 bigin.js 설치가 필요하다면  [임대형 솔루션 : 고도몰](http://support.bigin.io/pages/detail.html?kind=installation_godo#installation_godo_0) 로 이동하여 알아보세요.



## 시작하기



bigin 추적 스크립트를 임대형 쇼핑몰에 설치하기 위해 아래의 두가지 방식을 사용합니다. 

1. **구글 태그매니저** 

   - 제공되는 GTM 컨테이너를 안내에 따라 수정하여 수집하고자 하는 항목에 적용할 수 있습니다.

2. **DOM scraping**

   - 임대형 쇼핑몰에서는 데이터를 데이터 처리에 관여하는 비즈니스 로직을 공개하지 않는 경우가 있습니다.

     ​	1) **상품 목록** 페이지( ex. <u>xxx.com/product/list.html</u> ) 에서 노출되는 **상품 조회**,  

     ​	2) **게시판**( ex. <u>xxx.com/board/product/write.html</u> ) 페이지에서 **게시글 생성**

     ​	3) **장바구니**( ex. <u>xxx.com/order/cart.html</u>)에서 **상품 제거** 

     등 과 같은 비즈니스 로직은 관리자페이지에서 접근 할 수 없는 경우가 존재합니다.	
     이와 같은 경우에 **DOM scraping** 방식을 사용합니다.



- **DOM scraping 방식**은 HTML로 구성된 UI 레이어의 DOM 트리에 직접 접근하여 필요한 데이터를 가져오는 방식입니다. 	
  손쉬운 **DOM scraping** 을 위해 가이드에 따른 **<div style="display:none"></div> 태그**를 추가하는 부분이 필요합니다.

  

<span class="end-point"></span>

## 구글 태그매니저 설치

개발자의 편의성을 위해 구글 태그매니저를 활용한 설치방법을 안내합니다. 아래의 설치 방법은 구글태그매니저를 활용하여 설치하는 방법을 기술하며, 구글 태그매니저가 설치되어 있어야합니다.

1. 구글 태그매니저 계정을 생성하여 태그 관리자 추적 ID를 발급받습니다.
2. 카페 24의 스마트 디자인 편집창을 열어 **기본 레이아웃**, **공통 레이아웃**에 **구글 태그매니저 스니펫**을 삽입합니다. 
   대부분의 페이지들은 **기본 레이아웃** 또는 **공통 레이아웃**, **팝업 레이아웃** 등의 레이아웃 내부에 위치하므로 **구글 태그매니저 스니펫** 을 레이아웃 html 에 삽입함으로써 모든 페이지에서 컨테이너의 정보를 가진 **gtm.js**에 접근할 수 있습니다. 



[구글 태그 관리자 고객센터](https://support.google.com/tagmanager/answer/6103696?hl=ko) 또는 [구글 태그 관리자 개발가이드](https://developers.google.com/tag-manager/quickstart)에서 자세한 설치법을 알아보세요.



### GTM 컨테이너 내려받기

카페24 솔루션에 빅인 스크립트의 설치를 돕기 위하여 GTM 컨테이너를 제공합니다. cafe24_container.json 파일은 bigin 기본 추적 스크립트 및 커스텀이벤트, 이커머스 추적 코드들을 구현한 GTM 컨테이너입니다. 링크된 

<a href="../data/cafe24_container.json" download>cafe24_container.json</a> 파일을 내려받은 후, 사용할 구글 태그매니저 계정에 컨테이너를 추가(또는 병합)합니다. 

gtm 컨테이너의 **내려받기**와 **가져오기**에 대한 자세한 설명은 [이곳](https://support.google.com/tagmanager/answer/6106997?hl=en)를 참조해주세요.




<span class="end-point"></span>
## 기본 추적 스크립트 삽입

### 추적 코드 스니펫

<a href="../data/cafe24_container.json" download>cafe24_container.json</a> 의 태그 중 **`bigin_Tracking Script`** 태그를 통해서 **bigin.js** 가 프로젝트 내부에 로드됩니다. 아래의 **bigin 기본 추적 스크립트** 태그를 참고하세요.

기본 추적 스크립트에서 `projectID` 을 insight.bigin.io 에서 생성한 데이터를 수집할 프로젝트의 정보와 동일하게 변경해야 합니다.

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

**`bigin_Tracking Script`** 태그의 트리거는 **모든 페이지뷰** 로 설정되어 있어 페이지 조회가 동작할 때마다, 매 회 호출됩니다.<br>


<span class="end-point"></span>
## 고유 사용자 식별

고유 사용자 식별 추적을 위해서 **`Layout_stateLogon`** , **`Layout_statelogoff`** 모듈을 사용하며, <br>**`Layout_stateLogon`** 모듈과 **`Layout_statelogoff`** 모듈을 통해서 고유 사용자의 통합과 분리를 로그인 시점으로 구분할 수 있습니다. 

로그인 상태에서는 **`Layout_stateLogon`**이 활성화되어 **`Layout_stateLogon`** 모듈의 UI가 출력되고 동작합니다.

반대로 로그아웃인 상태에선 **`Layout_statelogoff`** 가 활성화되며 **`Layout_stateLogoff`** 모듈의 UI와 기능이 사용됩니다.

1. **`Layout_stateLogon`** 모듈 내부에 **로그인 사용자 정보**를 기록한 **<div style="display:none"></div> 태그** 들을 추가합니다. 
2. **<div style="display:none"></div> 태그** 의 텍스트 변수를 **DOM scraping** 하여 이벤트의 속성의 값으로 전송합니다.



### 모듈 : Layout_stateLogon

메인 레이아웃, 공통 레이아웃의 **`Layout_stateLogon`** 모듈을 아래와 같이 수정합니다. 

```javascript
<div module="Layout_stateLogon">
	<a href="/member/modify.html">회원정보수정</a>
	<a href="{$action_logout}" class="log">로그아웃</a>  
	<a href="/order/basket.html">장바구니</a>
    
    <!--  Layout_stateLogon 모듈 내부에 아래의 태그 추가  -->
    <!--  bigin login start  -->    
    <div class="bigin-user-name" style="display:none;">{$name}</div>
	<div class="bigin-user-id" style="display:none;">{$id}</div>
	<div class="bigin-user-phone" style="display:none;">{$phone}</div>
	<div class="bigin-user-email" style="display:none;">{$email}</div>
    <!--  bigin login end  -->        
</div>
```



### **태그 : bigin_Identify User** 

```javascript
<script>
	var handleLoad = function () {
        var timer = 0;
        var interverId = setInterval(function() {
			timer += 500;
            if (
                timer >= 5000 ||
                (!document.querySelector(".bigin-user") || document.querySelector(".bigin-user-id").textContent)){
                clearInterval(interverId);
                if (document.querySelector(".bigin-user")) {
                	window.biginUser = {
						"id": document.querySelector(".bigin-user-id").textContent,
                        "name": document.querySelector(".bigin-user-name").textContent,
                        "nickname" : document.querySelector(".bigin-user-nickname").textContent,
                        "phoneCell": document.querySelector(".bigin-user-phone").textContent,
                        "email":  document.querySelector(".bigin-user-email").textContent
                	};
					bigin.user("profile", biginUser);
				}
			}
		}, 500);
	}

	window.addEventListener("load", function(){
	    handleLoad();
    })
</script>
```



**`bigin_Identify User`** 태그의 트리거는 **모든 페이지뷰** 로 설정되어 있어 페이지 조회가 동작할 때마다, 매 회 호출됩니다.

<br>

<br>
<span class="end-point"></span>

<br>

<h2>고유 사용자 식별 종료</h2>

<br>

하나의 기기에서 다수의 사용자가 고유 사용자로 처리되는 경우를 제외하기 위하여 로그인을 통한 고유 사용자 식별 이벤트의 종료 시점을 추적합니다. 종료시점은 대개 로그인 정보를 전송하지 않는 UI의 로그아웃 버튼에 설치하며, 로그아웃 추적은 **`bigin_Disconnect User`** 태그와 **모든 페이지뷰** 트리거가 사용됩니다.<br>
반드시 **`bigin_Disconnect User`** 태그 내부에 로그아웃 버튼의 선택자(selector)를 명시해 주어야합니다.

 

### **태그 : bigin_Disconnect User** 

```javascript 
<script>
	window.addEventListener("load" , function(){
    	if(document.querySelector("로그아웃 버튼 셀렉터")){
        	document.querySelector("로그아웃 버튼 셀렉터").addEventListener("click" , function(){
                if(typeof(bigin) != "undefined"){
	            	bigin.user("logout");                                    
                }
            })
        }
    })    
</script>
```



**`bigin_Disconnect User`** 태그의 트리거는 **모든 페이지뷰** 로 설정되어 있어 페이지 조회 시, 매회 호출됩니다.<br>

<br>
<span class="end-point"></span>



## 이커머스 이벤트 추적

카페24에서 이커머스 행동의 추적은 제공되는 UI 모듈에서 표시하는 데이터를 DOM 요소를 scarping 하여 이커머스 이벤트로 추적합니다. 

1. UI 레이어에 노출된 상품의 데이터(상품명, 가격, 설명 등)를 효율적으로 가져오기 위해서 **<div style="display:none"></div> 태그**를 삽입합니다. 
2. **<div style="display:none"></div> 태그**  의 텍스트 노드의 값으로 상품 데이터를 취합니다.  

이커머스 이벤트 추적은 아래의 목적으로 이벤트를 수집합니다.

* 제품의 목록 위치,순서 등 방문자가 제품을 조회한 노출 위치를 전송합니다. [제품 노출](#impression)
* 제품의 세부정보 페이지를 추적하여 제품의 실적을 파악합니다. [제품 세부정보 페이지 조회](#viewProduct)
* 제품을 장바구니에 담는 횟수와 제품의 정보를 추적합니다. [제품 장바구니에 추가](#addToCart)
* 장바구니에 담긴 제품의 정보와 목록을 추적합니다. [장바구니 조회](#cart)
* 장바구니에서 제품을 제외할 경우, 제외된 제품의 정보를 추적합니다. [장바구니에서 삭제](#removeCart)
* 결제 단계 및 결제와 관련된 옵션과 단계에 도달한 제품의 정보를 추적합니다. [체크아웃 프로세스](#checkout)
* 발생한 거래의 데이터를 수집하며, 거래에 포함된 제품의 정보와 할인,제휴사를 추적합니다. [제품 구매](#purchase)
* 발생한 거래 취소될 경우, 취소된 거래 데이터와 제품을 추적합니다. [제품 환불](#refund)

<br>

<h3 id="impression">제품 노출</h3>

쇼핑몰의 랜딩페이지, 상품 분류 페이지, 검색 결과 페이지 등 **제품 상세페이지로의 링크** 가 노출되는 페이지에서 **제품 링크 클릭** 에 대한 이커머스 행동을 추적할 수 있습니다. 제품 노출에 대한 이벤트는 `bg:impression` 으로 추적하며, 상품 목록과 목록에서의 게재위치를 함께 전송할 수 있습니다.

`bigin_Impression` 태그와 트리거를 통해 `bg:impression` 이커머스 추적이 이뤄지며, `Click URL`이 제품 상세 페이지로의 링크에 해당하는 일부 링크 클릭 트리거를 사용합니다.  


아래의 메인페이지에서의 이커머스 추적 예시를 알아보세요.

<br>

#### 모듈 : 상품 목록 모듈

아래의 cafe24의 상품 목록 모듈을 참고하세요.

| 페이지           | 모듈명                                 |
| ---------------- | -------------------------------------- |
| 메인페이지       | product_listmain_[seq]                 |
| 상품 분류 페이지 | product_listrecommend (추천 상품 목록) |
| 상품 분류 페이지 | product_listnew (신상품 목록)          |
| 상품 분류 페이지 | product_listnormal (일반상품 목록)     |
| 검색 결과 페이지 | search_result (상품 검색 결과 목록)    |
| 상품 상세 페이지 | product_relation (관련 상품 목록)      |

상품 목록 모듈의 html은 <code>ui</code> 태그 내부에 두 개의 <code>li</code> 태그들을 가집니다. <code>li</code> 태그 내부에 상품 데이터를 바인딩한 태그들을 아래와 같이 추가해줍니다. 

```javascript
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

<br><br>

#### **태그 : bigin_Impression**

```javascript
<script>  
	(function(){
      	try{
    		var link = {{Click Element}};
	     	var biginProductWrapper = $(link).closest("단일 제품을 포함하는 태그의 셀렉터").find(".bigin-product");
	  		var biginProduct = {};
  	
  			biginProduct.id = $(biginProductWrapper).find('.bigin-product-id').text();
	  		biginProduct.name = $(biginProductWrapper).find('.bigin-product-name').text();
  			biginProduct.price = $(biginProductWrapper).find('.bigin-product-price').text();
	  		biginProduct.list = window.location.hostname + "상세 영역 ex. MD-추천, 신상품";
  			biginProduct.position = $(biginProductWrapper).find('.bigin-product-position').text();  
  			biginProduct.thumbnail = [$(biginProductWrapper).find(".bigin-product-thumbnail").text()];
  
	  		if(typeof(bigin) != 'undefined'){
    	    	bigin.event("bg:impression", biginProduct)
        	}        
	        }catch(){
        
    	    }	
		})()  
</script>
```

<br><br>

#### 트리거 : bigin_Impression

![bigin main.html pageview](http://support.bigin.io/images/cafe24-event/bigin_Impression.png)

<br><br>

<h3 id="viewProduct">제품 세부정보 페이지 조회</h3>

페이지 URL이 <u>xxx.com/product/detail.html</u> 또는 <u>xxx.com/product/상품명/상품번호</u> 에 해당하는 제품 상세페이지 조회시, 제품의 세부정보를 추적할 수 있습니다. 제품 세부정보 페이지 조회에 대한 이벤트는 `bg:viewProduct` 으로 추적하며, 제품의 세부정보를 전송할 수 있습니다.

`bigin_View Product` 태그와 트리거를 통해 `bg:viewProduct` 이커머스 추적이 이뤄지며, `page url`이 <u>xxx.com/product/detail.html</u> 또는 <u>xxx.com/product/상품명/상품번호</u> 로 제한된 일부 페이지뷰을 사용합니다.  

상품 상세 페이지에서의 이커머스 추적 방식은 크게 **옵션이 존재하는 경우**와 **옵션이 존재하지 않는 경우**로 분류됩니다. 옵션 상품의 경우, 해당 상품은 <code>variant</code> 라는 제품 데이터를 가진 하나의 상품으로 취급합니다. 



#### 태그 : bigin_View Product

```javascript
<script>
	(function(){
    	var biginProduct = {};
      	biginProduct.id = iProductNo;
		biginProduct.price = product_price;
		biginProduct.thumbnail = [window.location.hostname + '/web/product/tiny/'+ product_image_tiny];
      	biginProduct.name = product_name;
		
      	if(typeof(bigin) != 'undefined'){
        	bigin.event("bg:viewProduct", biginProduct)
        }
    })()  
</script>
```

<br>

<br>

#### **트리거 : bigin_View Product**

![viewProductTrg](http://support.bigin.io/images/cafe24-event/bigin_viewProduct.png)

<br>



<h3 id="addToCart">제품 장바구니에 추가</h3>

사용자가 특정 제품을 장바구니에 추가하는 행동을 추적합니다. 장바구니 조회에 대한 이벤트는 `bg:addToCart` 로 추적하며, 장바구니에 추가된 제품 정보를 전송할 수 있습니다.

`bigin_Item To Cart` 태그와 트리거를 통해 `bg:addToCart` 이커머스 추적이 이뤄지며, `Click Class` 가 장바구니 담기 버튼의 선택자(selector) 로 제한된 일부 요소 클릭 트리거를 사용합니다.  

<br>

#### 태그 : bigin_Item To Cart

```javascript
<script>
  
  	function getBiginProduct(){
    	var biginProduct = {};
      	biginProduct.id = iProductNo;
      	biginProduct.price = product_price;
      	biginProduct.name = product_name;
		biginProduct.quantity = $('#quantity').val();
		biginProduct.thumbnail = [window.location.hostname + '/web/product/tiny/'+ product_image_tiny];
		
      	return biginProduct;
    }
  
  	function getBiginProductList(){
      
    	var biginProductList = [];
      
      	var biginOptions;
      
        if(typeof(option_stock_data) != 'undefined'){
			biginOptions = JSON.parse(option_stock_data);
          
			// 옵션선택 박스를 통해 추가되는 옵션 영역
          	$(".option_products .option_product").each(function(i ,e){
				var biginProduct = {};
              	// 옵션의 id
    	        var biginOptionId = $(e).find("input[id*='option_box']").val();
				biginProduct.id=iProductNo;
    	    	biginProduct.name=product_name;
        	    biginProduct.price = biginOptions[biginOptionId].option_price;
				biginProduct.thumbnail = [window.location.hostname + '/web/product/tiny/'+ product_image_tiny];
    	        if($(e).find(".quantity_opt").length < 1){
        	    	biginProduct.quantity = 0;
				}else{
					biginProduct.quantity = $(e).find(".quantity_opt").val();
				}
	            biginProduct.variant = biginOptions[biginOptionId].option_value;
				biginProductList.push(biginProduct);
			})
		}      	
  		return biginProductList;    	
    }
  
	(function(){
      	var biginProductList;
		if(typeof(option_stock_data) != 'undefined'){
        	biginProductList = getBiginProductList();
        }else{
        	biginProductList = [getBiginProduct()];
        }
      
      	if(Array.isArray(biginProductList)){
        	if(biginProductList.length > 0 && typeof(bigin) != 'undefined'){
				bigin.event("bg:addToCart", {
                	products : biginProductList
                })
            }
        }
    })() 
</script>
```

<br>

<br>

#### **트리거 : bigin_Item To Cart**

![viewProductTrg](http://support.bigin.io/images/cafe24-event/bigin_ItemToCart.png)

<br>



<h3 id="cart">장바구니 조회</h3>

사용자가 장바구니를 조회할 때 담겨져있는 제품들의 정보를 추적합니다. 장바구니 조회에 대한 이벤트는 `bg:cart` 로 추적하며, 장바구니에 담긴 제품 정보를 전송할 수 있습니다.

`bigin_Cart` 태그와 트리거를 통해 `bg:cart` 이커머스 추적이 이뤄지며,   `Click Class` 이 장바구니 담기 버튼의 선택자(selector)로 제한된 일부 요소 클릭 트리거를 사용합니다.  

<br>

#### 모듈 : 장바구니 상품 모듈 수정 

아래의 목록은 cafe24에서 제공하는 장바구니 상품 모듈입니다. 

| 모듈명                  | 모듈 코드                 |
| ----------------------- | ------------------------- |
| 일반상품 기본 배송      | xans-order-normnormal     |
| 일반상품 개별배송       | xans-order-normindividual |
| 일반상품 해외배송       | xans-order-normoversea    |
| 일반상품 (업체기본배송) | xans-order-suppnormal     |



장바구니 상품 모듈은 <code>tbody</code> 태그 내부에 두 개의 <code>tr</code> 태그들을 가집니다.
<code>tr</code> 태그 내부에 상품 데이터를 바인딩한 태그들을 아래와 같이 추가해줍니다. 

```javascript
<table border="1" summary="" class="xans-element- xans-order- xans-order-normnormal xans-record-">
	<tbody class="xans-element- xans-order xans-order-list center">
		<tr>
        <td class="thumbnail"></td>
        <td class="price"></td>
        <td class="name"></td>
		<!---- bigin cart start ---->
		<script>
			function getProductCode(strCode){
    			var strPCode = strCode;
			    strPCode = strPCode.match(/product_no=\d+/);
    			strPCode = String(strPCode);
			    var intPCode = strPCode.match(/\d+/);
    			if(intPCode != null && intPCode.length > 0) {
			      return intPCode[0];
		    	}
	    		return '';
			}    
		    var biginProductList = biginProductList || [];
		    var biginProduct = {};
			if(getProductCode('{$param}') != ''){
	    		biginProduct.id = '{$product_no}';
		    	biginProduct.name = '{$name|striptag}';
			    biginProduct.price = '{$product_price|striptag}'.replace(/[^0-9]/g,'');
				biginProduct.quantity = '{$form.quantity}'.split('value="')[1].split('"')[0];
			    if('{$layer_option_str}'){
    			    biginProduct.variant = '{$layer_option_str}';
			    }
		    	biginProduct.thumbnail = ['{$img}'];
	    		biginProductList.push(biginProduct);    
			}
		</script>
		<!---- bigin cart end ---->
        </tr>
        <tr>
        <td class="thumbnail"></td>
        <td class="price"></td>
        <td class="name"></td>            
		<!---- bigin cart start ---->
		<script>
		    var biginProductList = biginProductList || [];
		    var biginProduct = {};
			if(getProductCode('{$param}') != ''){
			    biginProduct.id = '{$product_no}';
		    	biginProduct.name = '{$name|striptag}';
	    		biginProduct.price = '{$product_price|striptag}'.replace(/[^0-9]/g,'');
				biginProduct.quantity = '{$form.quantity}'.split('value="')[1].split('"')[0];		
			    if('{$layer_option_str}'){
    			    biginProduct.variant = '{$layer_option_str}';
			    }
		    	biginProduct.thumbnail = ['{$img}'];
	    		biginProductList.push(biginProduct);    
			}
		</script>
		<!---- bigin cart end ---->
		</tr>
	</tbody>
</table>
```

<br><br>

#### **태그 : bigin_Cart**

```javascript
<script>
	(function(){
    	if(typeof(biginProductList) != "undefined" && typeof(bigin) != "undefined"){
          	if(Array.isArray(biginProductList)){
            	if(biginProductList.length > 0){
		        	bigin.event("bg:cart", {
        		    	products : biginProductList
		            })                
                }
            }
        }
    })()  
</script>
```

<br>

#### **트리거 : bigin_Cart**

![addToCartTrg](http://support.bigin.io/images/cafe24-event/bigin_cart.png)



<br><br>

<h3 id="removeCart">제품 장바구니에서 삭제</h3>

장바구니에서 하나 이상의 제품을 제거할 때 제품의 정보와 사용자의 행동을 수집하기 위하여 추적합니다. 장바구니에서 삭제된 제품 추적에 대한 이벤트는 `bg:removeCart`로 추적할 수 있습니다.

  `bigin_Remove Cart_allProducts`,   `bigin_Remove Cart_manyProducts`,  `bigin_Remove Cart_singleProduct`태그와 트리거를 통해 `bg:removeCart` 이커머스 추적이 이뤄지며,   `Click Class` 이 삭제하기 버튼의 선택자(selector)로 제한된 일부 요소 클릭 트리거를 사용합니다.  



#### 제품 장바구니에서 삭제 추적 태그 : bigin_Remove Cart_allProducts

장바구니에서 모든 상품을 삭제할 시, 아래의 태그를 통해 삭제된 제품정보를 추적합니다.

```javascript
<script>
	(function(){
    	if(typeof(bigin) != "undefined" && typeof(biginProductList) != "undefined"){
        	if(Array.isArray(biginProductList)){
            	if(biginProductList.length > 0){
                	bigin.event("bg:removeCart", {
                      	products : biginProductList
                    })
                }
            }
        }
    })()  
</script>
```



#### 제품 장바구니에서 삭제 추적 트리거 : bigin_Remove Cart_allProducts

![checkoutStepNTrg](http://support.bigin.io/images/cafe24-event/bigin_removeCartAllProducts.png)





#### 제품 장바구니에서 삭제 추적 태그 : bigin_Remove Cart_manyProducts

장바구니에서 선택된 상품을 삭제할 시, 아래의 태그를 통해 삭제된 제품 정보를 추적합니다.

```javascript
<script>
	function getBiginSelectedProductList(){
		var biginTempSelectedProductList = Basket._getCheckedProduct();
		var biginSelectedProductList = [];
		for(var i = 0; i < biginTempSelectedProductList.length; i++){
          	if(typeof(biginProductList) != "undefined"){
            biginSelectedProductList.push(biginProductList[biginTempSelectedProductList[i].seq]);   
            }
		}
		return biginSelectedProductList;
	}  
  	(function(){
    	if(typeof(bigin) != "undefined"){
          	var biginCheckoutProductList = getBiginSelectedProductList();
        	bigin.event("bg:removeCart", {
              	products : biginCheckoutProductList
            })
        }
    })()
</script>  
```



#### 제품 장바구니에서 삭제 추적 트리거 : bigin_Remove Cart_manyProducts

![checkoutStepNTrg](http://support.bigin.io/images/cafe24-event/bigin_removeCartManyProducts.png)





#### 제품 장바구니에서 삭제 추적 태그 : bigin_Remove Cart_singleProduct

장바구니에서 단일 상품을 삭제할 시, 아래의 태그를 통해 삭제된 제품 정보를 추적합니다.

```javascript
<script>
	(function(){
		var button = {{Click Element}};
     	var index = "버튼의 순서";
     	if(typeof(bigin) != "undefined"){
      		if(typeof(biginProductList) != "undefined" && Array.isArray(biginProductList)) {
	      		var biginSingleProduct = biginProductList[index];
    			bigin.event("bg:removeCart", {
            	  	products : [biginSingleProduct]
	            })              
            }
    	}
    })()  
</script>
```



#### 제품 장바구니에서 삭제 추적 트리거 : bigin_Remove Cart_singleProduct

![checkoutStepNTrg](http://support.bigin.io/images/cafe24-event/bigin_removeCartSingleProduct.png)



<h3 id="checkout">체크아웃 프로세스</h3>

제품을 구매하는 사용자의 체크아웃 페이지 단계를 추적합니다. 체크아웃 프로세스 추적에 대한 이벤트는 `bg:checkout`으로 추적하며, 체크아웃 페이지의 각 단계를 추적할 수 있습니다.  

체크아웃 프로세스의 추적은 대개 **제품 세부정보 페이지** 또는 **장바구니** 와 **주문서 작성 페이지** 에서 이뤄집니다. 

 `bigin_Checkout`,  `bigin_Checkout_allProducts`,   `bigin_Checkout_manyProducts`,  `bigin_Checkout_singleProduct`태그와 트리거를 통해 `bg:checkout` 이커머스 추적이 이뤄지며,   `Click Class` 이 결제하기 버튼의 선택자(selector)로 제한된 일부 요소 클릭 트리거를 사용합니다.  



#### 제품 상세 페이지의 체크아웃프로세스 추적 태그 : bigin_Checkout

제품 상세 페이지에서의 체크아웃 프로세스 추적을 위하여 아래의 태그를 사용합니다. 

```javascript
<script>
  
  	function getBiginProduct(){
    	var biginProduct = {};
      	biginProduct.id = iProductNo;
      	biginProduct.price = product_price;
      	biginProduct.name = product_name;
		biginProduct.quantity = $('#quantity').val();
		biginProduct.thumbnail = [window.location.hostname + '/web/product/tiny/'+ product_image_tiny];
		
      	return biginProduct;
    }
  
  	function getBiginProductList(){
      
    	var biginProductList = [];
      
      	var biginOptions;
      
        if(typeof(option_stock_data) != 'undefined'){
			biginOptions = JSON.parse(option_stock_data);
          
			// 옵션선택 박스를 통해 추가되는 옵션 영역
          	$(".option_products .option_product").each(function(i ,e){
				var biginProduct = {};
              	// 옵션의 id
    	        var biginOptionId = $(e).find("input[id*='option_box']").val();
				biginProduct.id=iProductNo;
    	    	biginProduct.name=product_name;
        	    biginProduct.price = biginOptions[biginOptionId].option_price;
				biginProduct.thumbnail = [window.location.hostname + '/web/product/tiny/'+ product_image_tiny];
    	        if($(e).find(".quantity_opt").length < 1){
        	    	biginProduct.quantity = 0;
				}else{
					biginProduct.quantity = $(e).find(".quantity_opt").val();
				}
	            biginProduct.variant = biginOptions[biginOptionId].option_value;
				biginProductList.push(biginProduct);
			})
		}      	
  		return biginProductList;    	
    }
  
	(function(){
      	var biginProductList;
		if(typeof(option_stock_data) != 'undefined'){
        	biginProductList = getBiginProductList();
        }else{
        	biginProductList = [getBiginProduct()];
        }
      
      	if(Array.isArray(biginProductList)){
        	if(biginProductList.length > 0 && typeof(bigin) != 'undefined'){
				bigin.event("bg:checkout", {
                  	step : 0,
                	products : biginProductList
                })
            }
        }
    })() 
</script>
```



#### 제품 상세 페이지의 체크아웃프로세스 추적 트리거 : bigin_Checkout

![checkoutStepNTrg](http://support.bigin.io/images/cafe24-event/bigin_checkout.png)



#### 장바구니의 체크아웃프로세스 추적 태그 : bigin_Checkout_allProducts

장바구니에서 모든 상품을 구매할 시, 아래의 태그를 통해 체크아웃 프로세스를 추적합니다.

```javascript
<script>
	(function(){
    	if(typeof(bigin) != "undefined" && typeof(biginProductList) != "undefined"){
        	if(Array.isArray(biginProductList)){
            	if(biginProductList.length > 0){
                  	var transaction = {};
                  	if(window.location.pathname.indexOf("orderform.html") > 0){
                    	transaction.step = 1;
                      	transaction.option = "옵션 정보";
                    }else if(window.location.pathnname.indexOf("detail.html") > 0){
                    	transaction.step = 0;
                      	transaction.option = "옵션 정보";
                    }else if(window.location.pathname.indexOf("cart.html") > 0){
                    	transaction.step = 0;
                      	transaction.option = "옵션 정보";
                    }
                  	transaction.products = biginProductList;
                	bigin.event("bg:checkout", transaction);
                }
            }
        }
    })()  
</script>
```



#### 장바구니의 체크아웃프로세스 추적 트리거 : bigin_Checkout_allProducts

![checkoutStepNTrg](http://support.bigin.io/images/cafe24-event/bigin_checkoutAllProducts.png)





#### 장바구니의 체크아웃프로세스 추적 태그 : bigin_Checkout_manyProducts

장바구니에서 선택된 상품을 구매할 시, 아래의 태그를 통해 체크아웃 프로세스를 추적합니다.

```javascript
<script>
	function getBiginSelectedProductList(){
		var biginTempSelectedProductList = Basket._getCheckedProduct();
		var biginSelectedProductList = [];
		for(var i = 0; i < biginTempSelectedProductList.length; i++){
          	if(typeof(biginProductList) != "undefined"){
            biginSelectedProductList.push(biginProductList[biginTempSelectedProductList[i].seq]);   
            }
		}
		return biginSelectedProductList;
	}  
  	(function(){
    	if(typeof(bigin) != "undefined"){
          	var biginCheckoutProductList = getBiginSelectedProductList();
        	bigin.event("bg:checkout", {
            	step : 0,
              	products : biginCheckoutProductList
            })
        }
    })()
</script>  
```



#### 장바구니의 체크아웃프로세스 추적 트리거 : bigin_Checkout_manyProducts

![checkoutStepNTrg](http://support.bigin.io/images/cafe24-event/bigin_checkoutManyProducts.png)





#### 장바구니의 체크아웃프로세스 추적 태그 : bigin_Checkout_singleProduct

장바구니에서 단일 상품을 구매할 시, 아래의 태그를 통해 체크아웃 프로세스를 추적합니다.

```javascript
<script>
	(function(){
		var button = {{Click Element}};
     	var index = "버튼의 순서";
     	if(typeof(bigin) != "undefined"){
      		if(typeof(biginProductList) != "undefined" && Array.isArray(biginProductList)) {
	      		var biginSingleProduct = biginProductList[index];
    			bigin.event("bg:checkout", {
        	    	step : 0,
            	  	products : [biginSingleProduct]
	            })              
            }
    	}
    })()  
</script>
```



#### 장바구니의 체크아웃프로세스 추적 트리거 : bigin_Checkout_singleProduct

![checkoutStepNTrg](http://support.bigin.io/images/cafe24-event/bigin_checkoutSingleProduct.png)







#### 주문서 작성 페이지 모듈 수정

카페24의 주문서 작성페이지의 상품 모듈은 <code>tbody</code> 태그 내부에 두 개의 <code>tr</code> 태그들을 가집니다.
 <code>tr</code> 태그 내부에 상품 데이터를 바인딩한 태그들을 아래와 같이 추가해줍니다. 

```javascript
<tbody class="xans-element- xans-order xans-order-individuallist center">
	<tr>
        <td class="thumbnail"></td>
        <td class="price"></td>
        <td class="name"></td>    
		<!---- bigin start ---->
		<script>
			function getProductCode(strCode){
		    	var strPCode = strCode;
			    strPCode = strPCode.match(/product_no=\d+/);
    			strPCode = String(strPCode);
		    	var intPCode = strPCode.match(/\d+/);
	    		if(intPCode != null && intPCode.length > 0) {
		    	  return intPCode[0];
	    		}
			    return '';
			}   	 
			function removeHtml(str){
	    		var removed_str = str.replace(/\<.*?\>/g," ");
		    	return removed_str;
			}
			function removeComma(str){
		    	var removed_str = parseInt(str.replace(/,/g,""));
    			return removed_str;
			}

	    	var biginProductList = biginProductList || [];
		    var biginProduct = {};
			if(getProductCode('{$param}') != ''){
			    biginProduct.id = getProductCode('{$param}');
			    biginProduct.name = removeHtml('{$product_name}').trim();
			    biginProduct.price = '{$product_price}'.replace(/[^0-9]/g, '');
			    biginProduct.thumbnail = ['{$product_image}'];
			    biginProduct.quantity = '{$product_quantity_text}'.replace(/[^0-9\\.]+/g, '');	
			    biginProduct.variant = '{$option_str}';
			    biginProductList.push(biginProduct);
			}
		</script>
		<!---- bigin cart end ---->
	</tr>
    <tr>
        <td class="thumbnail"></td>
        <td class="price"></td>
        <td class="name"></td>            
		<!---- bigin cart start ---->
		<script>
	    	var biginProductList = biginProductList || [];
		    var biginProduct = {};
			if(getProductCode('{$param}') != ''){
			    biginProduct.id = getProductCode('{$param}');
			    biginProduct.name = removeHtml('{$product_name}').trim();
			    biginProduct.price = '{$product_price}'.replace(/[^0-9]/g, '');
		    	biginProduct.thumbnail = ['{$product_image}'];
			    biginProduct.quantity = '{$product_quantity_text}'.replace(/[^0-9\\.]+/g, '');	
			    biginProduct.variant = '{$option_str}';
			    biginProductList.push(biginProduct);
			}
		</script>
		<!---- bigin cart end ---->
	</tr>
</tbody>
```



체크아웃 프로세스(결제 단계)의 각 단계와 옵션 정보를 추적합니다. 체크아웃 이벤트 추적은  **`bigin_Checkout_allProducts`** 태그와  트리거를 사용합니다.	



#### **태그 : bigin_Checkout_allProducts**

```javascript
<script>
	(function(){
    	if(typeof(bigin) != "undefined" && typeof(biginProductList) != "undefined"){
        	if(Array.isArray(biginProductList)){
            	if(biginProductList.length > 0){
                  	var transaction = {};
                  	if(window.location.pathname.indexOf("orderform.html") > 0){
                    	transaction.step = 1;
                      	transaction.option = "옵션 정보";
                    }else if(window.location.pathnname.indexOf("detail.html") > 0){
                    	transaction.step = 0;
                      	transaction.option = "옵션 정보";
                    }else if(window.location.pathname.indexOf("cart.html") > 0){
                    	transaction.step = 0;
                      	transaction.option = "옵션 정보";
                    }
                  	transaction.products = biginProductList;
                	bigin.event("bg:checkout", transaction);
                }
            }
        }
    })()  
</script>
```



#### **트리거 : bigin_Checkout_allProducts**

![checkoutStepNTrg](http://support.bigin.io/images/cafe24-event/bigin_checkoutAllProducts.png)







<h3 id="purchase">제품 구매</h3>

사용자가 제품 구매를 완료하면 구매한 제품의 데이터를 수집합니다. 제품 구매에 대한 이벤트는 `bg:purchase` 으로 추적하며, 구매한 제품 정보를 전송할 수 있습니다.

`bigin_Purchase` 태그와 트리거를 통해 `bg:purchase` 이커머스 추적이 이뤄지며, `page url`이 <u>xxx.com/order/order_result.html</u>  로 제한된 일부 페이지뷰을 사용합니다.  

아래의 목록은 cafe24에서 제공하는 주문 상품 목록 모듈입니다. 

| 모듈명                       | 모듈코드                        |
| ---------------------------- | ------------------------------- |
| 주문완료페이지 기본배송상품  | xans-order_normalresultlist     |
| 주문완료페이지 개별배송상품  | xans-order_individualresultlist |
| 주문완료페이지 해외배송상품  | xans-order_oversearesultlist    |
| 주문완료페이지 상은품 리스트 | xans-order_giftresultlist       |

<br>

#### 모듈 : 주문 상품 목록 모듈 수정 

주문된 상품의 데이터를 **DOM scraping** 방식으로 가져오기 위하여 아래와 같은 방식으로 모듈의 html 을 수정해야합니다.



```javascript
<tbody module="Order_normalresultlist">
	<tr>
    	<td class="thumb">
			// ... 
        </td>
        <td class="product">
			// ... 
        </td>
        <td class="price">
			// ... 
        </td>
		<td class="quantity">
			// ...                         
        </td>

		<!------------- bigin start -------------->                          
		<script>
			function getProductCode(strCode){
		    	var strPCode = strCode;
			    strPCode = strPCode.match(/product_no=\d+/);
    			strPCode = String(strPCode);
		    	var intPCode = strPCode.match(/\d+/);
	    		if(intPCode != null && intPCode.length > 0) {
		    	  return intPCode[0];
	    		}
			    return '';
			}   	 
			function removeHtml(str){
	    		var removed_str = str.replace(/\<.*?\>/g," ");
		    	return removed_str;
			}
			function removeComma(str){
		    	var removed_str = parseInt(str.replace(/,/g,""));
    			return removed_str;
			}                        
			if(getProductCode('{$param}') != 0) {
				var biginProductList = biginProductList || [];
				var biginProduct = {};
				biginProduct.id = getProductCode('{$param}');
				biginProduct.name = removeHtml('{$product_name}').trim();
				biginProduct.price = '{$product_price}'.replace(/[^0-9]/g, '');
				biginProduct.thumbnail = ['{$product_image}'];
				biginProduct.quantity = '{$product_quantity}'.replace(/[^0-9\\.]+/g, '');
				biginProduct.variant = '{$option_str}';
				biginProductList.push(biginProduct);        
			}
		</script>                      
		<!------------- bigin end -------------->      
	</tr>
    <tr>
    	<td class="thumb">
			// ... 
        </td>
        <td class="product">
			// ... 
        </td>
        <td class="price">
			// ... 
        </td>
        <td class="quantity">
			// ...                         
        </td>
		<!------------- bigin start -------------->                          
		<script>
			if(getProductCode('{$param}') != 0) {
				var biginProductList = biginProductList || [];
				var biginProduct = {};
				biginProduct.id = getProductCode('{$param}');
				biginProduct.name = removeHtml('{$product_name}').trim();
				biginProduct.price = '{$product_price}'.replace(/[^0-9]/g, '');
				biginProduct.thumbnail = ['{$product_image}'];
				biginProduct.quantity = '{$product_quantity}'.replace(/[^0-9\\.]+/g, '');
				biginProduct.variant = '{$option_str}';
				biginProductList.push(biginProduct);        
			}
		</script>                      
		<!------------- bigin end -------------->      
	</tr>
</tbody>

```



#### **태그 : bigin_Purchase**

```javascript
<script>
	function getCookie(cookie_name) {
    	var x, y;
	    var val = document.cookie.split(';');

    	for (var i = 0; i < val.length; i++) {
			x = val[i].substr(0, val[i].indexOf('='));
			y = val[i].substr(val[i].indexOf('=') + 1);
			x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
			if (x == cookie_name) {
				return unescape(y); // unescape로 디코딩 후 값 리턴
			}
		}
	}
	function setCookie(cookie_name, value, days) {
    	var exdate = new Date();
	    exdate.setDate(exdate.getDate() + days);

    	var cookie_value = escape(value) + ((days == null) ? '' : ';    expires=' +	exdate.toUTCString());
		document.cookie = cookie_name + '=' + cookie_value;
	}
	
  	(function(){
		if(typeof(biginProductList) != "undefined"){
			if(getCookie('bigin-transaction-id') != "거래 ID"){
				bigin.event('bg:purchase', {
					id : '거래 ID',
					revenue : '상품의 총 가격',
					shipping: '배송비',
					paymethod : '거래 방식(ex. 무통장입금)',
                  	coupon : '쿠폰명 또는 적립금',
                  	tax : '세금',
					products : biginProductList
    		    });
        		setCookie('bigin-transaction-id' , '거래 ID');
			}
		}    
    })()
</script>
```

<br>

#### **트리거 : bigin_Purchase**

![purchaseTrg](http://support.bigin.io/images/cafe24-event/bigin_purchase.png)



<br>



<h3 id ="refund">부분 환불</h3>

거래된 제품의 부분 환불을 추적합니다. **`bigin_Refund_product`** 태그와  트리거를 사용합니다. 	<br>부분 환불의 추적이 이뤄지는 페이지는 취소 페이지(cancel.html), 교환(exchange.html)이며, <br>
 `Click Class`  가 취소하기 버튼의 선택자(selector)로 제한된 일부 요소 클릭 트리거를 사용합니다.  



<br>

#### **태그 : bigin_Refund_product**

```javascript
<script>
	function getBiginRefundProductList(){
		var biginRefundProductList = [];
    	if(typeof(aOrderProductData) != "undefined"){
			$("input[name*='apply_product']").each(function(i, e){
				if(e.checked == true){
    	        	var biginProduct = {};
        	        biginProduct.id = aOrderProductData[i].product_no;
            	    biginProduct.quantity = $(e).closest('tr').find("input[id*='quantity_id']").val();;
	                biginProduct.price = parseInt(aOrderProductData[i].product_price);
    	            biginProduct.variant = aOrderProductData[i].opt_str;
        	        biginRefundProductList.push(biginProduct)
                }
            });
        }
        return biginRefundProductList;
    }  
  
	(function(){
    	var biginRefundProductList = getBiginRefundProductList();
      	if(typeof(bigin) != "undefined" && biginRefundProductList.length > 0){
        	bigin.event("bg:refund", {
            	id : '거래 ID',
              	products : biginRefundProductList
            })
        }
    })()  
</script>
```



<br>

#### **트리거 : bigin_Refund_product**

![refundTrg](http://support.bigin.io/images/cafe24-event/bigin_refundProducts.png)

<br>



### 환불

거래된 제품의 부분 환불을 추적합니다. **`bigin_Refund_transaction`** 태그와  트리거를 사용합니다. 	<br>
 `Click Class`  가 취소하기 버튼의 선택자(selector)로 제한된 일부 요소 클릭 트리거를 사용합니다.  

<br>

#### **태그 : bigin_Refund_transaction**

```javascript
<script>
	(function(){
    	if(typeof(bigin) != "undefined"){
        	bigin.event("bg:refund", {
            	id : '거래 ID',
            })
        }
    })()  
</script>
```



<br>

#### **트리거 : bigin_Refund_transaction**

![refundTrg](http://support.bigin.io/images/cafe24-event/bigin_refundTransaction.png)

<span class="end-point"></span>