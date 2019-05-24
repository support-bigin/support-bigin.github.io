# 임대형 솔루션에 설치 (고도몰)



온라인 커머스의 서비스 구축 형태가 임대형 솔루션인 경우, 지원되는 설치의 범위 또는 제한사항이 임대형 솔루션의 정책에 따라 다르게 적용됩니다. 임대형 솔루션에 비긴 애널리틱스 설치를 위한 설치 방법을 안내합니다.



- cafe24 임대형 솔루션에 bigin.js 설치가 필요하다면 [임대형 솔루션 : cafe24](#) 로 이동하여 알아보세요.

  

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

  



## 구글 태그매니저 설치

개발자의 편의성을 위해 구글 태그매니저를 활용한 설치방법을 안내합니다. 아래의 설치 방법은 구글태그매니저를 활용하여 설치하는 방법을 기술하며, 구글 태그매니저가 설치되어 있어야합니다.



1. 구글 태그매니저 계정을 생성하여 태그 관리자 추적 ID를 발급받습니다.
2. 카페 24의 스마트 디자인 편집창을 열어 **기본 레이아웃**, **공통 레이아웃**에 **구글 태그매니저 스니펫**을 삽입합니다. 
   대부분의 페이지들은 **기본 레이아웃** 또는 **공통 레이아웃**, **팝업 레이아웃** 등의 레이아웃 내부에 위치하므로 **구글 태그매니저 스니펫** 을 레이아웃 html 에 삽입함으로써 모든 페이지에서 컨테이너의 정보를 가진 **gtm.js**에 접근할 수 있습니다. 



[구글 태그 관리자 고객센터](https://support.google.com/tagmanager/answer/6103696?hl=ko) 또는 [구글 태그 관리자 개발가이드](https://developers.google.com/tag-manager/quickstart)에서 자세한 설치법을 알아보세요.



### GTM 컨테이너 내려받기

고도몰 솔루션에 빅인 스크립트의 설치를 돕기 위하여 GTM 컨테이너를 제공합니다. godomall_container.json 파일은 bigin 기본 추적 스크립트 및 커스텀이벤트, 이커머스 추적 코드들을 구현한 GTM 컨테이너입니다. 링크된 

<a href="../data/godomall_container.json" download>godomall_container.json</a> 파일을 내려받은 후, 사용할 구글 태그매니저 계정에 컨테이너를 추가(또는 병합)합니다. 

gtm 컨테이너의 **내려받기**와 **가져오기**에 대한 자세한 설명은 [이곳](https://support.google.com/tagmanager/answer/6106997?hl=en)를 참조해주세요.



## 기본 추적 스크립트 삽입

### 추적 코드 스니펫

[godomall_container.json](http://support.bigin.io/pages/%5Bhttp://www.google.co.kr%5D(http://www.google.co.kr/)) 의 태그 중 **`bigin_Tracking Script`** 태그를 통해서 **bigin.js** 가 프로젝트 내부에 로드됩니다. **bigin_Tracking Script** 태그의 내용은 아래와 같습니다.

기본 추적 스크립트에서 `projectID` 와 `domain` 을 insight.bigin.io 에서 생성한 데이터를 수집할 프로젝트의 정보와 동일하게 변경해야 합니다.

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

**`bigin_Tracking Script`** 태그의 트리거는 **모든 페이지뷰** 로 설정되어 있어 페이지 조회가 동작할 때, 매회 호출됩니다.<br>



## 고유 사용자 식별

고유 사용자 식별을 위해서 유저 정보를 저장하는 치환코드를 사용합니다. 고도몰에서 지원하는 치환코드의 종류는 아래와 같습니다. 

| 치환코드           | 결과값          |
| ------------------ | --------------- |
| {=gSess.memNo}     | 회원 일련번호   |
| {=gSess.memId}     | 회원 아이디     |
| {=gSess.memNm}     | 회원 이름       |
| {=gSess.nickNm}    | 회원 닉네임     |
| {=gSess.cellPhone} | 회원 휴대폰번호 |



### 템플릿 수정 

상단 레이아웃 템플릿 편집창에서 아래의 스크립트를 추가합니다.

```javascript
<script>
    function getBiginUser(){
		var biginUser = {
		    "name": "{=gSess.memNm}",
            "id" : "{=gSess.memNo}",
		    "phoneCell": "{=gSess.cellPhone}",
            "nickName" : "{=gSess.nickNm}"
		};    	
    	return biginUser;
	}
	var handleLoad = function () {
        var timer = 0;
        var interverId = setInterval(function() {
            timer += 500;
            var biginUser = getBiginUser();
            if (timer >= 5000 || !biginUser.id){
                clearInterval(interverId);
                
                if (biginUser.id) {
                    bigin.user("profile", getBiginUser());
                }
            }
        }, 500);
    }

    window.addEventListener("load", function(){
        handleLoad();
    })
	
</script>
```



## 고유 사용자 식별의 종료  

<br>

하나의 기기에서 다수의 사용자가 고유 사용자로 처리되는 경우를 제외하기 위하여 로그인을 통한 고유 사용자 식별 이벤트의 종료 시점을 추적합니다. 종료시점은 대개 로그인 정보를 전송하지 않는 UI의 로그아웃 버튼에 설치하며,  로그아웃 추적을 위해서 **`bigin logout`** 태그와 **모든 페이지뷰** 트리거가 사용됩니다.
반드시 `bigin logout` 태그에 로그아웃 버튼의 선택자(selector)를 명시해야 합니다.

 

### 태그 : bigin logout

```javascript 
<script>
	window.addEventListener("load" , function(){
    	if(document.querySelector("로그아웃 버튼 셀렉터")){
        	document.querySelector("로그아웃 버튼 셀렉터").addEventListener("click" , function(){
				bigin.user("logout");
			})
        }
    })    
</script>
```



**`bigin logout`** 태그의 트리거는 **모든 페이지뷰** 로 설정되어 있어 페이지 변경 시, 매회 호출됩니다.<br>



## 이커머스 이벤트 추적

쇼핑몰의 랜딩페이지, 상품 분류 페이지, 검색 결과 페이지 등 **제품 상세페이지로의 링크** 가 노출되는 페이지에서 **제품 링크 클릭** 에 대한 이커머스 추적을 실행해야합니다.

1. UI 레이어에 노출된 상품의 데이터(상품명, 가격, 설명 등)를 효율적으로 가져오기 위해서 **<div style="display:none"></div> 태그**를 삽입하여 가상의 데이터레이어를 생성합니다.
2. 생성한 가상 데이터레이어의 텍스트 노드의 값으로 상품 데이터를 전송합니다.  

이커머스 행동의 추적은 제공되는 UI 모듈에서 표시하는 데이터를 DOM 요소를 scarping 하여 이커머스 이벤트로 추적합니다. 

이커머스 이벤트 추적은 아래의 목적으로 수집하여 분석합니다.

- 제품의 목록 위치,순서 등 방문자가 제품을 조회한 노출 위치를 전송합니다. [제품 노출](#)
- 제품의 세부정보 페이지를 추적하여 제품의 실적을 파악합니다. [제품 세부정보 페이지 조회](#)
- 제품을 장바구니에 담는 횟수와 제품의 정보를 추적합니다. [제품 장바구니에 추가](#)
- 장바구니에 담긴 제품의 정보와 목록을 추적합니다. [장바구니 조회](#)
- 장바구니에서 제품을 제외할 경우, 제외된 제품의 정보를 추적합니다. [장바구니에서 삭제](#)
- 결제 단계 및 결제와 관련된 옵션과 단계에 도달한 제품의 정보를 추적합니다. [체크아웃 프로세스](#)
- 발생한 거래의 데이터를 수집하며, 거래에 포함된 제품의 정보와 할인,제휴사를 추적합니다. [제품 구매](#)
- 발생한 거래 취소될 경우, 취소된 거래 데이터와 제품을 추적합니다. [제품 환불](#)



### 제품 노출

쇼핑몰의 랜딩페이지, 상품 분류 페이지, 검색 결과 페이지 등 **제품 상세페이지로의 링크** 가 노출되는 페이지에서 **제품 링크 클릭** 에 대한 이커머스 행동을 추적할 수 있습니다. 제품 노출에 대한 이벤트는 `bg:impression` 으로 추적하며, 상품 목록과 목록에서의 게재위치를 함께 전송할 수 있습니다.



상품 목록 페이지(goods/goods_list.php), 검색결과 페이지(goods/goods_search.php)의 경우, 
`bigin tracking in goods_list.php` 태그와 `bigin tracking in goods_search.php` 태그를 사용합니다. 



아래의 예시는 메인페이지에서의 이커머스 추적을 설명합니다. 

<br>

#### 템플릿 수정

고도몰의 제품 데이터는 /goods/list/list_0X.html 템플릿에 존재합니다. 
해당 템플릿은 갤러리형, 리스트형, 심플이미지형 등으로 나뉘며 메인 페이지(index.html), 상품 목록 페이지(goods/goods_list.html), 검색 페이지(goods/goods_search.html) 에서 사용됩니다.

아래와 같이 **<div style="display:none"></div> 태그** 을 추가하여 제품 정보 템플릿을 수정합니다. 

```javascript
<div class="item-display type-gallery">
    <div class="list">
	    <ul>
			<li>
        		<div class="thumbnail">
                    // 생략
				</div>
				<div class="name">
                    // 생략                    
				</div>
				<div class="price">
                    // 생략                    
				</div>
				<div class="bigin-product" style="display:none">
					<div class="bigin-product-id" style="display:none">{..goodsNo}</div>
					<div class="bigin-product-price" style="display:none">{..goodsPrice}</div>
					<div class="bigin-product-name" style="display:none">{..goodsNm}</div>
					<div class="bigin-product-list" style="display:none">{mainData.themeNm}</div>				
				</div>
	        </li>
    	</ul>
	</div>
</div>
```

<br><br>

####  **태그 : bigin tracking in index.html**

```javascript
<script>
    function setClickListener(index, element){
		var biginProduct = {};
		var biginContainer = $(element).find(".bigin-product");
		try{
			biginProduct.id = $(biginContainer).find(".bigin-product-id").text();
			biginProduct.name = $(biginContainer).find(".bigin-product-name").text();
			biginProduct.price = $(biginContainer).find(".bigin-product-price").text();
			biginProduct.thumbnail = [$(biginContainer).find(".bigin-product-image").text()];
			biginProduct.list = window.location.pathname + "__";
			biginProduct.position = index + 1;

			$(element).find("a 태그 셀렉터").bind("click", function(){
                if(typeof(bigin) != 'undefined'){
					bigin.event("bg:impression" , biginProduct);
                }
			})

		}catch(e){
			console.log(e);
		}
	}

    window.addEventListener('load' , function(){
       
		$(".goods_content_1 ul li").each(function(index, element){
			setClickListener(index, element);
		}) // 메인 상품
		$(".goods_content_2 ul li").each(function(index, element){
			setClickListener(index, element);
		}) // 메인 상품
		$(".goods_content_3 ul li").each(function(index, element){
			setClickListener(index, element);
		}) // 메인 상품           
    })
</script>
```

<br><br>

#### 트리거 : bigin index.php pageview trg

![bigin main.html pageview](http://support.bigin.io/images/godo-triggers/index_pageview.png)

<br><br>

### 제품 세부정보 페이지 조회

상품 세부 페이지에서의 이커머스 추적 방식은 크게 **옵션이 존재하는 경우**와 **옵션이 존재하지 않는 경우**로 분류됩니다. 옵션 상품의 경우, 해당 상품은 <code>variant</code> 라는 제품 데이터를 가진 하나의 상품으로 취급합니다. 



#### 템플릿 수정

제품 정보를 나타내는 치환코드들을 아래와 같이 전역변수에 저장합니다. 

```javascript
<script>
	var goodsNo = '{goodsView.goodsNo}'; // 제품 번호
	var goodsNm = "{goodsView['goodsNmDetail']}";	// 제품명
	var brandNm = '{goodsView["brandNm"]}';	// 브랜드명
	var categoryNm = '{goodsView["cateNm"]}';	// 카테고리명
	var goodsPrice = '{goodsView["goodsPrice"]}';	// 제품 가격
</script>
```



#### 태그 : bigin viewProduct in goods_view.php

추가된 상품 목록을 `DOM Scraping` 해야하기 때문에 selector 수정이 필요합니다.

```javascript
<script>
	function getBiginProduct(){
		var biginProduct = {};
		biginProduct.id = goodsNo;
		biginProduct.name = goodsNm;
		biginProduct.brand = brandNm;
		biginProduct.category = [categoryNm];
		biginProduct.price = parseInt(goodsPrice);
		biginProduct.thumbnail = [window.location.hostname + $("#mainImage>img").attr('src')];
		biginProduct.quantity = 1;
		
		return biginProduct;
		
	}
	
	var getBiginProductList = function(){
		var biginOptions;

		var biginProductList = [];
        
        // 추가된 상품 정보 목록
		$(".order-goods").find('div[id*="option_display_item"]').each(function(i ,e){
			var biginProduct = {};
		    try{
		    	biginProduct.id = goodsNo;
        		biginProduct.name = goodsNm;
				var optionPrice = $(e).find(".price input[name*='option_price']").val();
                biginProduct.price = parseInt(optionPrice) + parseInt(goodsPrice);
				biginProduct.thumbnail = window.location.hostname + $("#mainImage img").attr('src');
				biginProduct.quantity = $(e).find(".price>.count>input").val();
				if($(".option_total_display_area").length > 0){
	                biginProduct.variant = $(e).find("span.name>strong").text()			
				}
				biginProductList.push(biginProduct);
		    }catch(e){
				console.log(e);
			}
		})
        return biginProductList;
    }	
	
	function unitPrice(price, quantity){
		var tempPrice = (""+price).replace(/[^0-9]/g,'');
		var tempQuantity = parseInt(quantity);
		tempPrice = parseInt(tempPrice);
		return tempPrice/tempQuantity;
	}
	
	function biginDetailFunc(){
		if(typeof(bigin) != "undefined"){
			var biginProduct = getBiginProduct();
            bigin.event("bg:viewProduct" , biginProduct)
		}
		
        // 장바구니 담기 
		$("장바구니 담기 버튼 셀렉터").bind("click", function(){
			if(typeof(bigin) != "undefined"){
				var biginProductList = getBiginProductList();				
                bigin.event("bg:toCart", {
                    products : biginProductList
                })
			}
		})
        
        // 구매하기
		$("구매하기 버튼 셀렉터").bind("click", function(){
			if(typeof(bigin) != "undefined"){
				var biginProductList = getBiginProductList();
                bigin.event("bg:checkout", {
                    step : 0,
                    products : biginProductList
                })
			}
		})
        
        // 네이버 페이
		$(".npay_btn_item").bind("click", function(){
			if(typeof(bigin) != "undefined"){
				var biginProductList = getBiginProductList();			
                bigin.event("bg:checkout", {
                    step : 0,
                    option : "naverpay",
                    products : biginProductList
                })
			}
		})		
	}
	
	window.addEventListener("load", function(){
		biginDetailFunc();
	})
</script>
```

<br>

<br>

#### **트리거 : bigin goods_view.php pageview**

![viewProductTrg](http://support.bigin.io/images/godo-triggers/goods_view_pageview.png)

<br>

### 장바구니 조회



장바구니 상품 모듈은 <code>tbody</code> 태그 내부의 <code>tr</code> 태그 상품 데이터를 바인딩한 태그들을 아래와 같이 추가해줍니다. 

```javascript
<tbody>
    <tr>
	    <td>
    		<div class="thumbnail">
        		// 생략    	
			</div>
    	</td>
	    <td>
    		<div class="name">
        		// 생략            
			</div>
    	</td>
	    <td>
    		<div class="price">
        		// 생략            
			</div>
    	</td>	
		<script>				
			var biginProductList = biginProductList || [];
			var biginProduct = {};
			try{
				biginProduct.id = '{=...goodsNo}';
				biginProduct.name = '{=...goodsNm}';
				if('{=...goodsPriceString}'){
					biginProduct.price = '{=...goodsPriceString}';						
				}else{
					biginProduct.price = '{=gd_currency_display((...price['goodsPriceSum'] + ...price['optionPriceSum'] + ...price['optionTextPriceSum']))}';										}
				biginProduct.quantity = '{=...goodsCnt}';
				var biginThumbnail = `{=...goodsImage}`.match(/(?<=src=).*?(?= )/)[0].replace(/\"/g,'').replace(/\'/g,'');
				biginProduct.thumbnail = [window.location.hostname + biginThumbnail];
				biginProduct.price = unitPrice(biginProduct.price, biginProduct.quantity);				  <!--{ @ ...option }-->
	            <!--{ ? ....optionName }-->
					biginProduct.variable = '{=....optionValue}';
        	    <!--{ / }-->
	            <!--{ / }-->
    	        <!--{ @ ...optionText }-->
        	    <!--{ ? ....optionValue }-->
					biginProduct.variable = '{=....optionValue}';						
            	<!--{ / }-->
	            <!--{ / }-->								
				biginProductList.push(biginProduct)
			}catch(e){
				console.log(e);
			}					
		</script>            
	<tr>
</tbody>
```

<br><br>

#### **태그 : bigin tracking in cart.php**

```javascript
<script>
	function getBiginSelectedProductList(){
		var biginSelectedProductList = [];
		$('#frmCart  input:checkbox[name="cartSno[]"]').toArray().forEach(function(e, i){
			if(e.checked){
				if(typeof(biginProductList) != "undefined"){
					biginSelectedProductList.push(biginProductList[i])				
				}
			}
		})
		return biginSelectedProductList;
	}

    window.addEventListener('load' , function(){
		if(typeof(biginProductList) != "undefined" && typeof(bigin) != 'undefined'){
        	bigin.event('bg:cart', {
            	products : biginProductList
            });
        }

        // 개별 상품 주문
		$("개별 상품 주문하기 버튼 셀렉터").each(function(index, e){
			$(e).bind("click", function(event){
				if(typeof(bigin) != 'undefined'){
					bigin.event("bg:checkout" , {
						step : 0,
						products : [biginProductList[index]]
					})
				}
			})
		})

        // 개별 상품 장바구니 추가
		$("개별 상품 장바구니 추가 버튼 셀렉터").each(function(index, e){
			$(e).bind("click", function(event){
				if(typeof(bigin) != 'undefined'){
					bigin.event("bg:removeCart" , {
						products : [biginProductList[index]]
					})
				}
			})
		})

        // 선택 상품 장바구니 제거 
		$("선택 상품 장바구니 제거버튼 셀렉터").bind('click' , function(){
			if(typeof(bigin) != "undefined"){
				var biginSelectedProductList = getBiginSelectedProductList();
                if(biginSelectedProductList.length > 0 && typeof(bigin) != 'undefined'){
                	bigin.event("bg:removeCart", {
                        products : biginSelectedProductList
                    })
                }
			}
		})

        // 선택 상품 주문
		$("선택 상품 주문 버튼 셀렉터").bind("click" , function(){
			if(typeof(bigin) != "undefined"){
				var biginSelectedProductList = getBiginSelectedProductList();
                if(biginSelectedProductList.length > 0 && typeof(bigin) != 'undefined'){
                	bigin.event("bg:checkout", {
                        step : 0,
                        products : biginSelectedProductList
                    })
                }
			}
		})

        // 전체 상품 주문 
        $("전체 상품 주문 버튼 셀렉터").bind("click", function(){
        	if(typeof(bigin) != "undefined" && biginProductList.length > 0){
            	bigin.event("bg:checkout" , {
                	step : 0,
                    products : biginProductList
                })
            }
        })

        // 네이버페이 주문 
        $(".npay_btn_item").bind("click", function(){
        	if(typeof(bigin) != "undefined" && biginProductList.length > 0){
            	bigin.event("bg:checkout" , {
                	step : 0,
                    option: "naverpay",
                    products : biginProductList
                })
            }
        })
	})
</script>
```

<br>

#### **트리거 : bigin cart.php pageview**

![addToCartTrg](http://support.bigin.io/images/godo-triggers/cart_pageview.png)



<br><br>



### 체크아웃 프로세스

체크아웃 프로세스에 진입한 후, 각 단계와 옵션 정보를 추적합니다.	
체크아웃 프로세스 추적을 위해 **`bigin tracking in orderform.html`** 태그와 **`bigin orderform.html pageview`** 트리거를 사용됩니다.	

주문서 작성페이지의 상품 모듈은 <code>tbody</code> 태그 내부에 두 개의 <code>tr</code> 태그들을 가집니다.
<code>tr</code> 태그 내부에 상품 데이터를 바인딩한 태그들을 아래와 같이 추가해줍니다. 

```javascript
<tbody>
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
			var biginProductList = biginProductList || [];
			var biginProduct = {};
			try{
				biginProduct.id = '{=...goodsNo}';
				biginProduct.name = '{=...goodsNm}';
				if('{=...goodsPriceString}'){
					biginProduct.price = '{=...goodsPriceString}';		
				}else{
					biginProduct.price = '{=gd_currency_display((...price['goodsPriceSum'] + ...price['optionPriceSum'] + ...price['optionTextPriceSum']))}';									
				}
				biginProduct.quantity = '{=...goodsCnt}';
				var biginThumbnail = `{=...goodsImage}`.match(/(?<=src=).*?(?= )/)[0].replace(/\"/g,'').replace(/\'/g,'');
				biginProduct.thumbnail = [window.location.hostname + biginThumbnail];
				biginProduct.price = unitPrice(biginProduct.price, biginProduct.quantity);												
                <!--{ @ ...option }-->
                <!--{ ? ....optionName }-->
					biginProduct.variable = '{=....optionValue}';
                <!--{ / }-->
                <!--{ / }-->
                <!--{ @ ...optionText }-->
                <!--{ ? ....optionValue }-->
					biginProduct.variable = '{=....optionValue}';		
				<!--{ / }-->
                <!--{ / }-->								
				biginProductList.push(biginProduct)
			}catch(e){
				console.log(e);
			}
		</script>                      
	<!------------- bigin end -------------->      
	</tr>
</tbody>


```

<br>

#### **태그 : bigin tracking in order.php**

```javascript
<script>
  window.addEventListener('load', function(){
    $("주문하기 버튼 셀렉터").bind("click", function(){
      bigin.event("bg:checkout", {
        step : 1,
        option : '옵션 정보,
        product : biginProductList
      });
    })
  })
</script>
```



#### **트리거 : bigin order.php pageview**

![checkoutStepNTrg](http://support.bigin.io/images/godo-triggers/order_pageview.png)



<br>

### 제품 구매

<br>

#### **태그 : bigin tracking in order_result.html**

```javascript
<script>
	function getBiginCookie(cookie_name) {
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
	function setBiginCookie(cookie_name, value, days) {
    	var exdate = new Date();
    	exdate.setDate(exdate.getDate() + days);

    	var cookie_value = escape(value) + ((days == null) ? '' : ';    expires=' + exdate.toUTCString());
    	document.cookie = cookie_name + '=' + cookie_value;
	}
	
	function callBiginPurchase(){
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
		
		if(getBiginCookie('bigin-transaction-id') != '거래 ID'){
            if(typeof(bigin) != "undefined"){
                bigin.event("bg:purchase", {
						'id' : '거래 ID',
						'shipping' : '배송비',
						'revenue' : '상품 가격의 총합',
						'paymethod' : '거래방식',
						'products' : productList
				})
				setBiginCookie('bigin-transaction-id' , '거래 ID');			                
            }
		}
	}
	window.addEventListener("load", function(){
		
		callBiginPurchase();
	})
</script>	
```

<br>

#### **트리거 : bigin order_end.php pageview**

![purchaseTrg](http://support.bigin.io/images/godo-triggers/order_end_pageview.png)



<br>

### 제품 환불

거래된 제품의 환불을 추적합니다. 	
**`bigin tracking in order_list.php`** 태그와 **`bigin order_list.php pageview`** 트리거를 사용합니다. 	

<br>

#### **태그 : bigin tracking in order-list.php**

```javascript
<script>
	$("주문 취소 버튼 셀렉터").each(function(i, e){
      $(e).bind("click", function(){
        var callback = $(this).attr("onclick");
        if(callback && typeof(bigin) != "undefined"){
          var orderId = "거래 ID";
          bigin.event("bg:refund", {
            id : orderId
          })
        }
      })
    })
</script>
```



<br>

#### **트리거 : bigin order_list.php pageview**

![refundTrg](http://support.bigin.io/images/godo-triggers/order_list_pageview.png)

<br>



### 부분 환불

거래된 제품의 환불을 추적합니다. **`bigin tracking in order_view.php`** 태그와 **`bigin order_view.php pageview`** 트리거를 사용합니다. 	

<br>

#### **태그 : bigin tracking in order_view.php**

```javascript
<script>
	$('취소하기 버튼 셀렉터').bind("click", function(){	
        if(typeof(bigin) != "undefined"){
          	var orderId = "거래 ID";
          	bigin.event("bg:refund", {
            	id : orderId
			})
		}
	})
</script>
```



<br>

#### **트리거 : bigin order_view.php pageview**

![refundTrg](http://support.bigin.io/images/godo-triggers/order_view_pageview.png)

<br>

