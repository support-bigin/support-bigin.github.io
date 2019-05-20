# 임대형 솔루션의 설치 안내
## 시작하기

bigin 추적코드를 임대형 쇼핑몰에 설치하기 위해 아래의 방식들을 사용합니다. 

1. **구글 태그매니저** 

   - 제공되는 gtm 컨테이너를 가이드에 따라 수정하여 쇼핑몰에 맞게 커스터마이징할 수 있습니다.

2. **DOM scraping**

   - 임대형 쇼핑몰의 특성 상, 데이터 처리에 관여하는 비즈니스 로직을 공개하지 않는 경우가 있습니다.

     ​	1) **상품 목록** 페이지( ex. <u>xxx.com/product/list.html</u> ) 에서 노출되는 **상품 조회**,  

     ​	2) **게시판**( ex. <u>xxx.com/board/product/write.html</u> ) 페이지에서 **게시글 생성**

     ​	3) **장바구니**( ex. <u>xxx.com/order/cart.html</u>)에서 **상품 제거** 

     등 과 같은 비즈니스 로직은 관리자페이지에서 접근 할 수 없는 경우가 존재합니다.	
     이와 같은 경우에 **DOM scraping** 방식을 사용합니다.



- **DOM scraping 방식**은 HTML로 구성된 UI 레이어의 DOM 트리에 직접 접근하여 필요한 데이터를 가져오는 방식입니다. 	
  손쉬운 **DOM scraping** 을 위해 가이드에 따른 **&lt;div style="display:none"&gt;&lt;/div&gt; 태그**를 추가하는 부분이 필요합니다.

  

<span class="end-point"></span>

## 카페24



### gtm 컨테이너 내려받기

<a href="../data/cafe24_container.json" download>cafe24_container.json</a> 파일을 내려받은 후, 사용할 구글 태그매니저 컨테이너에 추가( 또는 병합) 합니다.	
cafe24_container.json 파일은 bigin 기본 추적 스크립트의 삽입부터 대부분의 추적 코드들을 구현한 gtm 컨테이너입니다.

gtm 컨테이너의 **내려받기**와 **가져오기**에 대한 자세한 설명은 [이곳](https://support.google.com/tagmanager/answer/6106997?hl=en)를 참조해주세요.



### 구글 태그매니저 설치

스마트 디자인 편집창을 열고 **기본 레이아웃**, **공통 레이아웃**에 **구글 태그매니저 스니펫**을 삽입합니다. 
대부분의 페이지들은 **기본 레이아웃** 또는 **공통 레이아웃**, **팝업 레이아웃** 등의 레이아웃 내부에 위치합니다. 
**구글 태그매니저 스니펫** 을 레이아웃의 html 에 삽입함으로써 모든 페이지에서 컨테이너의 정보를 가진 **gtm.js**에 접근할 수 있습니다. 

[구글 태그 관리자 고객센터](https://support.google.com/tagmanager/answer/6103696?hl=ko) 또는 [구글 태그 관리자 개발가이드](https://developers.google.com/tag-manager/quickstart)에서 자세한 설치법을 알아보세요.



### 기본 추적 스크립트 삽입

#### 추적 코드 스니펫

[cafe24_container.json](http://support.bigin.io/pages/%5Bhttp://www.google.co.kr%5D(http://www.google.co.kr/)) 의 태그 중 **"bigin insert"** 태그를 통해서 **bigin.sdk.js** 가 프로젝트 내부에 로드됩니다. **bigin 삽입** 태그의 내용은 아래와 같습니다.



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



**bigin insert** 태그의 트리거는 **모든 페이지뷰** 로 설정되어 있어 페이지 변경 시, 매회 호출됩니다.<br> 그리고 `projectID` 가 실제 프로젝트의 추적ID와 같도록 변경해주어야 합니다.



### 고유 사용자 식별

고유 사용자 식별 추적을 위해서 **"Layout_stateLogon"** , **"Layout_statelogoff"** 모듈을 사용하며, <br>**"Layout_stateLogon"** 모듈과 **"Layout_statelogoff"** 모듈을 통해서 사용자의 로그인 유무를 판별할 수 있습니다. 

로그인 상태에서는 **"Layout_stateLogon"**이 활성화되어 **"Layout_stateLogon"** 모듈의 UI가 출력되고 해당 기능을 활용할 수 있습니다. 

반대로 로그아웃인 상태에선 **"Layout_statelogoff"** 가 활성화되며 **"Layout_stateLogoff"** 모듈의 UI와 기능이 사용됩니다.

**Layout_stateLogon** 모듈 내부에 **로그인 사용자 정보**를 기록한
**&lt;div style="display:none"&gt;&lt;/div&gt; 태그** 들을 추가합니다. 
그리고 **&lt;div style="display:none"&gt;&lt;/div&gt; 태그** 의 텍스트 노드를 **DOM scraping** 하여 로그인 사용자 식별을 시도합니다.  



### 로그인 사용자 식별 

#### 모듈 : Layout_stateLogon 모듈 수정 

메인 레이아웃, 공통 레이아웃의 **Layout_stateLogon** 모듈을 아래와 같이 수정합니다. 

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



#### **태그 : bigin login** 

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



**bigin login** 태그의 트리거는 **모든 페이지뷰** 로 설정되어 있어 페이지 변경 시, 매회 호출됩니다.

<br>

<br>

### 로그아웃 추적  

<br>

로그아웃 추적을 위해서 **"bigin logout"** 태그와 **모든 페이지뷰** 트리거가 사용됩니다.<br>
반드시 **bigin logout** 태그 내부에 로그아웃 버튼의 selector를 명시해 주어야합니다.

 

#### **태그 : bigin logout** 

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



**bigin logout** 태그의 트리거는 **모든 페이지뷰** 로 설정되어 있어 페이지 변경 시, 매회 호출됩니다.<br>

<br>

### 이커머스 추적

<br>

#### 상품 목록 페이지에서의 이커머스 추적

쇼핑몰의 랜딩페이지, 상품 분류 페이지, 검색 결과 페이지 등 **제품 상세페이지로의 링크** 가 노출되는 페이지에서 **제품 링크 클릭** 에 대한 이커머스 추적을 실행해야합니다.

이때, UI 레이어에 노출된 상품의 데이터(상품명, 가격, 설명 등)를 효율적으로 가져오기 위해서 **&lt;div style="display:none"&gt;&lt;/div&gt; 태그**를 삽입합니다. 
그리고 **&lt;div style="display:none"&gt;&lt;/div&gt; 태그**  의 텍스트 노드의 값으로 상품 데이터를 취합니다.  

아래의 예시는 메인페이지에서의 이커머스 추적을 설명합니다. 

상품 목록 페이지(product/list.html), 검색결과 페이지(search.html)의 경우, 
`bigin tracking in list.html` 태그와 `bigin tracking in search.html` 태그를 사용합니다. 

<br>

##### 모듈 : 상품 목록 모듈 수정

cafe24는 아래 테이블과 같은 상품 리스트 모듈들이 있습니다. 

| 페이지           | 모듈명                                 |
| ---------------- | -------------------------------------- |
| 메인페이지       | product_listmain_[seq]                 |
| 상품 분류 페이지 | product_listrecommend (추천 상품 목록) |
| 상품 분류 페이지 | product_listnew (신상품 목록)          |
| 상품 분류 페이지 | product_listnormal (일반상품 목록)     |
| 검색 결과 페이지 | search_result (상품 검색 결과 목록)    |
| 상품 상세 페이지 | product_relation (관련 상품 목록)      |



상품 목록 모듈의 html은 <code>ui</code> 태그 내부에 두 개의 <code>li</code> 태그들을 가집니다.
두 <code>li</code> 태그 내부에 상품 데이터를 바인딩한 태그들을 아래와 같이 추가해줍니다. 

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

###### **태그 : bigin tracking in main.html**

```javascript
<!------ bigin impression start ------>
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
       
		$(".xans-product-listmain-1 li[id*='anchorBoxId']").each(function(index, element){
			setClickListener(index, element);
		}) // 메인 상품
		$(".xans-product-listmain-2 li[id*='anchorBoxId']").each(function(index, element){
			setClickListener(index, element);
		}) // 메인 상품
		$(".xans-product-listmain-3 li[id*='anchorBoxId']").each(function(index, element){
			setClickListener(index, element);
		}) // 메인 상품
		$(".xans-product-listmain-4 li[id*='anchorBoxId']").each(function(index, element){
			setClickListener(index, element);
		}) // 메인 상품           
    })
</script>
<!------ bigin impression end ------->
```

<br><br>

**트리거 : bigin main.html pageview trg**

![bigin main.html pageview](http://support.bigin.io/images/cafe-triggers/main_pageview.png)

<br><br>

#### 상품 상세 페이지에서의 이커머스 추적

**제품 상세 페이지** 에서는 대개 `상품 노출(bg:viewProduct)`, `장바구니 추가(bg:addToCart)`, `구매하기 (bg:checkout)`의 이커머스 추적이 이루어집니다. <br>
추가적인 추적코드를 설치하기 위해서는 아래의 코드를 수정해주시기 바랍니다. 

상품 상세 페이지에서의 이커머스 추적 방식은 크게 **옵션이 존재하는 경우**와 **옵션이 존재하지 않는 경우**로 분류됩니다.<br>
옵션 상품의 경우, 해당 상품은 <code>variant</code> 라는 제품 데이터를 가진 하나의 상품으로 취급합니다. 



##### 태그 : bigin viewProduct in detail.html

```javascript
<script>
    // 옵션상품이 존재하는 경우, 
    var getBiginProductList = function(){
		var biginOptions;

        if(option_stock_data){
	        biginOptions = JSON.parse(option_stock_data);
        }

		var biginProductList = [];
		$(".option_products .option_product").each(function(i ,e){
			var biginProduct = {};
            var biginOptionId = $(e).find("td>input[id*='option_box']").val();
		    try{
		    	biginProduct.id=iProductNo;
        		biginProduct.name=product_name;
                biginProduct.price = biginOptions[biginOptionId].option_price;
				biginProduct.thumbnail = [window.location.hostname + '/web/product/tiny/'+ product_image_tiny];
                if($(e).find(".quantity_opt").length < 1){
                	biginProduct.quantity = 0;
                }else{
					biginProduct.quantity = $(e).find(".quantity_opt").val();
                }
				//biginProduct.variant = $(e).find(".product>span").text();
                biginProduct.variant = biginOptions[biginOptionId].option_value;
				biginProductList.push(biginProduct);
		    }catch(e){
				console.log(e);
			}
		})
        return biginProductList;
    }
    // 옵션상품이 존재하지 않는 경우, 
	function getBiginProduct(){
		var biginProduct = {};
		try{
			biginProduct.id = iProductNo;
			biginProduct.name = product_name;
            if(typeof(product_sale_price) != "undefined"){
            	biginProduct.price = product_sale_price;
            }else{
				biginProduct.price = product_price;
            }
			biginProduct.thumbnail = [window.location.hostname + '/web/product/tiny/'+ product_image_tiny];
			biginProduct.quantity = $('#quantity').val();

		}catch(e){
			console.log(e);
		}
		return biginProduct;
	}

    window.addEventListener('load' , function(){
        if(typeof(bigin) != 'undefined'){
			bigin.event("bg:viewProduct" , getBiginProduct())               
        }

        $("구매하기 버튼 셀렉터").bind("click", function(){
			if(typeof(bigin) != 'undefined'){
				// 옵션이 존재하는 상품
                if(typeof(option_stock_data) != "undefined"){
		            bigin.event("bg:checkout", {
    	                step :0,
    		            products : getBiginProductList()
        		    });
				// 옵션이 존재하지 않는 상품                    
                }else{
		            bigin.event("bg:checkout", {
    	                step :0,
    		            products : [getBiginProduct()]
        		    });
                }
            }
        })

		$(".npay_btn_item").bind("click", function(){

			if(typeof(bigin) != 'undefined'){
                 if(typeof(option_stock_data) != "undefined"){
		            bigin.event("bg:checkout", {
    	                step :0,
                        option: "naverpay",
    		            products : getBiginProductList()
        		    });
                }else{
		            bigin.event("bg:checkout", {
    	                step :0,
                        option: "naverpay",
    		            products : [getBiginProduct()]
        		    });
                }
            }
        });

		$("장바구니 담기 버튼 셀렉터").bind("click", function(){

			if(typeof(bigin) != 'undefined'){
				// 옵션이 존재하는 상품                
                 if(typeof(option_stock_data) != "undefined"){
		            bigin.event("bg:addToCart", {
    		            products : getBiginProductList()
        		    });
				// 옵션이 존재하지 않는 상품                     
                }else{
		            bigin.event("bg:addToCart", {
    		            products : [getBiginProduct()]
        		    });
                }
            }
        });
    });
</script>
```

<br>

<br>

#### **트리거 : bigin detail.html pageview**

![viewProductTrg](http://support.bigin.io/images/cafe-triggers/detail_pageview.png)

<br>

### 장바구니 페이지에서의 이커머스 추적

장바구니 페이지에서는 `장바구니 조회(bg:cart)`, `장바구니 제거 (bg:removeCart)`, `구매하기(bg:checkout)` 등의 이커머스 추적이 이뤄집니다. <br>
추가적인 추적코드를 설치하기 위해서는 아래의 코드를 수정해주시기 바랍니다. 

<br>



#### 모듈 : 장바구니 상품 모듈 수정 

cafe24는 아래 테이블과 같은 장바구니 상품 모듈들이 있습니다. 

| 모듈명                  | 모듈 코드                 |
| ----------------------- | ------------------------- |
| 일반상품 기본 배송      | xans-order-normnormal     |
| 일반상품 개별배송       | xans-order-normindividual |
| 일반상품 해외배송       | xans-order-normoversea    |
| 일반상품 (업체기본배송) | xans-order-suppnormal     |



장바구니 상품 모듈은 <code>tbody</code> 태그 내부에 두 개의 <code>tr</code> 태그들을 가집니다.
두 <code>tr</code> 태그 내부에 상품 데이터를 바인딩한 태그들을 아래와 같이 추가해줍니다. 

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

#### **태그 : bigin tracking in cart.html**

```javascript
<script>
	function getBiginSelectedProductList(){
		var biginTempSelectedProductList = Basket._getCheckedProduct();
		var biginSelectedProductList = [];
		for(var i = 0; i < biginTempSelectedProductList.length; i++){
			biginSelectedProductList.push(biginProductList[biginTempSelectedProductList[i].seq]);
		}
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

#### **트리거 : bigin cart.html pageview**

![addToCartTrg](http://support.bigin.io/images/cafe-triggers/cart_pageview.png)



<br><br>



### 주문서 작성 페이지에서의 이머커스 추적

체크아웃 프로세스에 진입한 후, 각 단계와 옵션 정보를 추적합니다.	
체크아웃 프로세스 추적을 위해 **bigin tracking in orderform.html** 태그와 **bigin orderform.html pageview** 트리거를 사용됩니다.	

주문서 작성페이지의 상품 모듈은 <code>tbody</code> 태그 내부에 두 개의 <code>tr</code> 태그들을 가집니다.
두 <code>tr</code> 태그 내부에 상품 데이터를 바인딩한 태그들을 아래와 같이 추가해줍니다. 

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

<br>

#### **태그 : bigin tracking in orderform.html**

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



#### **트리거 : bigin orderform.html pageview**

![checkoutStepNTrg](http://support.bigin.io/images/cafe-triggers/orderform_pageview.png)



<br>

### 구매 완료페이지에서의 이커머스 추적

cafe24는 주문 상품 리스트에 관한 모듈들이 있습니다. 

| 모듈명                       | 모듈코드                        |
| ---------------------------- | ------------------------------- |
| 주문완료페이지 기본배송상품  | xans-order_normalresultlist     |
| 주문완료페이지 개별배송상품  | xans-order_individualresultlist |
| 주문완료페이지 해외배송상품  | xans-order_oversearesultlist    |
| 주문완료페이지 상은품 리스트 | xans-order_giftresultlist       |

<br>

#### 모듈 : 주문 상품 목록 모듈 수정 

주문된 상품의 데이터를 DOM scraping 방식으로 가져오기 위하여 아래와 같은 방식으로 모듈의 html 을 수정해야합니다.



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



##### **태그 : bigin tracking in order_result.html**

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

    var cookie_value = escape(value) + ((days == null) ? '' : ';    expires=' + exdate.toUTCString());
    document.cookie = cookie_name + '=' + cookie_value;
  }

  window.addEventListener('load' , function(){
    var biginPaymethod = $(".bigin-paymethod").text();
    if(typeof(biginProductList) != "undefined"){
      if(getCookie('bigin-transaction-id') != "거래 ID"){
        bigin.event('bg:purchase', {
          id : '거래 ID',
          revenue : '상품의 총 가격',
          shipping: '배송비',
          paymethod : '거래 방식(ex. 무통장입금)',
          products : biginProductList
        });
        setCookie('bigin-transaction-id' , '거래 ID');
      }
    }
  })
</script>
```

<br>

#### **트리거 : bigin order_result.html pageview**

![purchaseTrg](http://support.bigin.io/images/cafe-triggers/order_result_pageview.png)



<br>

### 주문 조회 페이지에서의 이커머스 추적

거래된 제품의 환불을 추적합니다. 	
**bigin tracking in order-list.html** 태그와 **bigin order-list.html pageview** 트리거를 사용합니다. 	

<br>

#### **태그 : bigin tracking in order-list.html**

```javascript
<script>
	$("주문 취소 버튼 셀렉터").each(function(i, e){
      $(e).bind("click", function(){
        var callback = $(this).attr("onclick");
        if(callback && typeof(bigin) != "undefined"){
          var orderId = callback.toString().match(/(?<=cel\().*?(?=\))/)[0].replace(/\"/g,'').replace(/\'/g,'');
          bigin.event("bg:refund", {
            id : orderId
          })
        }
      })
    })
</script>
```



<br>

#### **트리거 : bigin order-list.html pageview**

![refundTrg](http://support.bigin.io/images/cafe-triggers/order_list_pageview.png)

<br>



### 주문 상세 페이지에서의 이커머스 추적

거래된 제품의 환불을 추적합니다. 	
**bigin 환불** 태그와 **refundTrg** 트리거를 사용합니다. 	
**refundTrg** 트리거는 요소 클릭 형식의 트리거로써, **clickVar** 변수를 사용합니다.

<br>

#### **태그 : bigin tracking in order-detail.html**

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

#### **트리거 : bigin order-detail.html pageview**

![refundTrg](http://support.bigin.io/images/cafe-triggers/order_detail_pageview.png)

<br>





### 반품/교환/취소 페이지에서의 이커머스 추적

거래된 제품의 부분 환불에 대한 이커머스 추적을 합니다. 	
**bigin tracking in return.html** 태그와 **bigin return.html pageview** 트리거를 사용합니다. 	

취소 페이지(cancel.html), 교환(exchange.html)의 경우, 
`bigin tracking in cancel.html` 태그와 `bigin tracking in exchange.html` 태그를 사용합니다. 

<br>

#### **태그 : bigin tracking in return.html**

```javascript
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
	$(".xans-myshop-orderhistoryapplycancel .btnArea>a:first").bind("click", function(){
		var biginProductList = getBiginRefundProductList();
        var biginOrderId = '거래 ID';
		if(typeof(bigin) != "undefined" && typeof(biginProductList) != "undefined" && biginProductList.length > 0){
			try{
	        	bigin.event("bg:refund", {
    	        	id : biginOrderId,
        	        products : biginProductList
				})
			}catch(e){
            	console.log(e);
			}
		}
	})
        // 반품
    $(".xans-myshop-orderhistoryapplyreturn .btnArea>a:first").bind("click", function(){
 		var biginProductList = getBiginRefundProductList();
        var biginOrderId = '거래 ID';
        if(typeof(bigin) != "undefined" && typeof(biginProductList) != "undefined" && biginProductList.length > 0){
        	try{
	        	bigin.event("bg:refund", {
    	        	id : biginOrderId,
        	        products : biginProductList
            	})
			}catch(e){
            	console.log(e);
			}
		}
	})
</script>
```



<br>

#### **트리거 : bigin return.html pageview**

![refundTrg](http://support.bigin.io/images/cafe-triggers/return_pageview.png)

<br>

<span class="end-point"></span>

## 고도몰

### gtm 컨테이너 내려받기

<a href="../data/godomall_container.json" download>godomall_container.json</a> 파일을 내려받은 후, 사용할 구글 태그매니저 컨테이너에 추가( 또는 병합) 합니다.	
godomall_container.json 파일은 bigin 기본 추적 스크립트의 삽입부터 대부분의 추적 코드들을 구현한 gtm 컨테이너입니다.

gtm 컨테이너의 **내려받기**와 **가져오기**에 대한 자세한 설명은 [이곳](https://support.google.com/tagmanager/answer/6106997?hl=en)를 참조해주세요.



### 구글 태그매니저 설치



스마트 디자인 편집창을 열고 **상단 레이아웃**에 **구글 태그매니저 스니펫**을 삽입합니다. 
대부분의 페이지들은 **상단 레이아웃** 내부에 위치합니다. 
**구글 태그매니저 스니펫** 을 레이아웃의 html 에 삽입함으로써 모든 페이지에서 컨테이너의 정보를 가진 **gtm.js**에 접근할 수 있습니다. 

[구글 태그 관리자 고객센터](https://support.google.com/tagmanager/answer/6103696?hl=ko) 또는 [구글 태그 관리자 개발가이드](https://developers.google.com/tag-manager/quickstart)에서 자세한 설치법을 알아보세요.



### 기본 추적 스크립트 삽입

#### 추적 코드 스니펫

[godomall_container.json](http://support.bigin.io/pages/%5Bhttp://www.google.co.kr%5D(http://www.google.co.kr/)) 의 태그 중 **"bigin insert"** 태그를 통해서 **bigin.sdk.js** 가 프로젝트 내부에 로드됩니다. **bigin insert** 태그의 내용은 아래와 같습니다.



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



**bigin insert** 태그의 트리거는 **모든 페이지뷰** 로 설정되어 있어 페이지 변경 시, 매회 호출됩니다.<br> 그리고 `projectID` 가 실제 프로젝트의 추적ID와 같도록 변경해주어야 합니다.



### 고유 사용자 식별

고유 사용자 식별을 위해서 유저 정보를 저장하는 치환코드를 사용합니다. 
치환코드의 종류는 아래와 같습니다. 

| 치환코드           | 결과값          |
| ------------------ | --------------- |
| {=gSess.memNo}     | 회원 일련번호   |
| {=gSess.memId}     | 회원 아이디     |
| {=gSess.memNm}     | 회원 이름       |
| {=gSess.nickNm}    | 회원 닉네임     |
| {=gSess.cellPhone} | 회원 휴대폰번호 |



### 로그인 사용자 식별 

#### 템플릿 수정 

상단 레이아웃 템플릿을 아래의 스크립트를 추가합니다.

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



### 로그아웃 추적  

<br>

로그아웃 추적을 위해서 **"bigin logout"** 태그와 **모든 페이지뷰** 트리거가 사용됩니다.<br>
반드시 `bigin logout` 태그에 로그아웃 버튼의 selector를 명시하여 주어야합니다.

 

##### 태그 : bigin logout

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



**bigin logout** 태그의 트리거는 **모든 페이지뷰** 로 설정되어 있어 페이지 변경 시, 매회 호출됩니다.<br>



### 이커머스 추적

<br>

<br>

#### 상품 목록 페이지에서의 이커머스 추적

쇼핑몰의 랜딩페이지, 상품 분류 페이지, 검색 결과 페이지 등 **제품 상세페이지로의 링크** 가 노출되는 페이지에서 **제품 링크 클릭** 에 대한 이커머스 추적을 실행해야합니다.

이때, UI 레이어에 노출된 상품의 데이터(상품명, 가격, 설명 등)를 효율적으로 가져오기 위해서 **&lt;div style="display:none"&gt;&lt;/div&gt; 태그**를 삽입합니다. 
그리고 **&lt;div style="display:none"&gt;&lt;/div&gt; 태그**  의 텍스트 노드의 값으로 상품 데이터를 취합니다.  

아래의 예시는 메인페이지에서의 이커머스 추적을 설명합니다. 

상품 목록 페이지(goods/goods_list.php), 검색결과 페이지(goods/goods_search.php)의 경우, 
`bigin tracking in goods_list.php` 태그와 `bigin tracking in goods_search.php` 태그를 사용합니다. 

<br>

##### 템플릿 수정

고도몰의 제품 데이터는 /goods/list/list_0X.html 템플릿에 존재합니다. 
해당 템플릿은 갤러리형, 리스트형, 심플이미지형 등으로 나뉘며 메인 페이지(index.html), 상품 목록 페이지(goods/goods_list.html), 검색 페이지(goods/goods_search.html) 에서 사용됩니다.

아래와 같이 **&lt;div style="display:none"&gt;&lt;/div&gt; 태그** 을 추가하여 제품 정보 템플릿을 수정합니다. 

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

######  **태그 : bigin tracking in index.html**

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

**트리거 : bigin index.php pageview trg**

![bigin main.html pageview](http://support.bigin.io/images/godo-triggers/index_pageview.png)

<br><br>

#### 상품 상세 페이지에서의 이커머스 추적

**제품 상세 페이지** 에서는 대개 상품 노출(bg:viewProduct), 장바구니 추가(bg:addToCart), 구매하기 (bg:checkout)의 이커머스 추적이 이루어집니다. 
추가적인 추적코드를 설치하기 위해서는 아래의 코드를 수정해주시기 바랍니다. 

상품 상세 페이지에서의 이커머스 추적 방식은 크게 **옵션이 존재하는 경우**와 **옵션이 존재하지 않는 경우**로 분류됩니다. <br>
옵션 상품의 경우, 해당 상품은 <code>variant</code> 라는 제품 데이터를 가진 하나의 상품으로 취급합니다. 



##### 템플릿 수정

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



##### 태그 : bigin viewProduct in goods_view.php

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

### 장바구니 페이지에서의 이커머스 추적

장바구니 페이지에서는 `장바구니 조회(bg:cart)`, `장바구니 제거 (bg:removeCart)`, `구매하기(bg:checkout)` 등의 이커머스 추적이 이뤄집니다. <br>
추가적인 추적코드를 설치하기 위해서는 아래의 코드를 수정해주시기 바랍니다. 

<br>



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



### 주문서 작성 페이지에서의 이머커스 추적

체크아웃 프로세스에 진입한 후, 각 단계와 옵션 정보를 추적합니다.	
체크아웃 프로세스 추적을 위해 **bigin tracking in orderform.html** 태그와 **bigin orderform.html pageview** 트리거를 사용됩니다.	

주문서 작성페이지의 상품 모듈은 <code>tbody</code> 태그 내부에 두 개의 <code>tr</code> 태그들을 가집니다.
두 <code>tr</code> 태그 내부에 상품 데이터를 바인딩한 태그들을 아래와 같이 추가해줍니다. 

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

### 구매 완료페이지에서의 이커머스 추적

<br>

##### **태그 : bigin tracking in order_result.html**

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

### 주문 조회 페이지에서의 이커머스 추적

거래된 제품의 환불을 추적합니다. 	
**bigin tracking in order_list.php** 태그와 **bigin order_list.php pageview** 트리거를 사용합니다. 	

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



### 주문 상세 페이지에서의 이커머스 추적

거래된 제품의 환불을 추적합니다. 	
**bigin tracking in order_view.php** 태그와 **bigin order_view.php pageview** 트리거를 사용합니다. 	

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

