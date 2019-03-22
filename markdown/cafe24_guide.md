# cafe24 bigin sdk 설치 

## 시작하기

bigin sdk를 cafe24 기반의 쇼핑몰에 설치하기 위해 아래의 방식들을 사용합니다. 

1. **구글 태그매니저** 

   - 제공되는 gtm 컨테이너를 가이드에 따라 수정하여 쇼핑몰에 맞게 커스터마이징할 수 있습니다.

2. **DOM scraping 방식**

   - cafe24 기반의 쇼핑몰의 특성 상, 데이터 처리에 관여하는 비즈니스 로직을 공개하지 않는 경우가 있습니다.

     ​	1) **상품리스트** 페이지에서의 **상품 데이터 조회**,  

     ​	2) **게시판** 페이지에서 **게시글 정보 생성**

     ​	3) 상품 주문 시, **결제 정보 생성** 등

     과 같은 비즈니스 로직은 관리자페이지에서 접근 할 수 없는 경우가 존재합니다.
     이와 같은 경우에 **DOM scraping** 방식을 사용합니다.


   

   - **DOM scraping 방식**은 HTML로 구성된 UI 레이어의 DOM 트리에 직접적으로 접근하여 필요한 데이터를 가져오는 방식입니다. 손쉬운 **DOM scraping** 을 위해 가이드에 따른 **hidden div 태그 **를 추가하는 부분이 필요합니다.

      

   



## 카페24 bigin sdk 설치하기 

카페24는 모듈과 변수이라는 개념을 통해서 페이지의 템플릿, 스타일, 기능을 구현합니다.
[카페24의 모듈과 변수에 대한 사전 지식](<https://sdsupport.cafe24.com/board/tip/read_intro.html?no=191&board_no=5>)을 숙지하신 후, bigin sdk 설치를 시작해주시기 바랍니다.

//모듈은 html, css, javascript 등으로 구성되며, 모듈을 삽입함으로써 모듈이 제공하는 기능을 사용할 수 있게 됩니다.



### gtm 컨테이너 내려받기

[cafe24_container.json](http://support.bigin.io/data/container.json) 파일을 내려받은 후, 사용할 구글 태그매니저 컨테이너에 병합합니다.
cafe24_container.json 파일은 bigin 기본 추적 스크립트의 삽입부터 모든 추적 코드들을 구현한 gtm 컨테이너입니다.

gtm 컨테이너의 **내려받기**와 **가져오기**에 대한 자세한 설명은 [이곳](https://support.google.com/tagmanager/answer/6106997?hl=en)를 참조해주세요.



### 구글 태그매니저 설치 

스마트 디자인 편집창을 열고 **기본 레이아웃**, **공통 레이아웃**에 **구글 태그매니저 스니펫**을 삽입합니다. 
모든 페이지들은 **기본 레이아웃** 또는 **공통 레이아웃**, **팝업 레이아웃** 등의 레이아웃 내부에 위치합니다.  
**구글 태그매니저 스니펫** 을 레이아웃의 html 에 삽입함으로써 모든 페이지에서 컨테이너의 정보를 가진 **gtm.js**에 접근할 수 있습니다. 

[구글 태그 관리자 고객센터](https://support.google.com/tagmanager/answer/6103696?hl=ko) 또는 [구글 태그 관리자 개발가이드](https://developers.google.com/tag-manager/quickstart)에서 자세한 설치법을 알아보세요.



### 기본 추적 스크립트 삽입

#### 추적 코드 스니펫

[cafe24_container.json](http://support.bigin.io/pages/%5Bhttp://www.google.co.kr%5D(http://www.google.co.kr/)) 의 태그 중 **"cafe24 bigin 삽입"** 태그를 통해서 **bigin.sdk.js** 가 프로젝트 내부에 로드됩니다. **cafe24 bigin 삽입** 태그의 내용은 아래와 같습니다.



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



**cafe24 bigin 삽입** 태그의 트리거는 **모든 페이지뷰** 로 설정되어 있어 페이지 변경 시, 매회 호출됩니다.<br> `projectID` 가 실제 프로젝트의 추적ID와 같도록 변경해주어야 합니다..





## 고유 사용자 식별

1. **"Layout_stateLogon"** 모듈과 2. **"Layout_statelogoff"** 모듈을 통해서 사용자의 로그인 유무를 판별할 수 있습니다. 

로그인 상태가 유지되는 상황에서는 **"Layout_stateLogon"**이 활성화되어 **"Layout_stateLogon"** 모듈의 UI가 출력되고 해당 기능을 활용할 수 있습니다. 
반대로 로그아웃인 상태에선 **"Layout_statelogoff"** 가 활성화되며 **"Layout_stateLogoff"** 모듈의 UI와 기능이 사용됩니다.

**Layout_stateLogon** 모듈 내부에 **로그인 사용자 정보**를 기록한 **hidden div 태그** 들을 추가합니다. 
그리고 **hidden div 태그** 를 **DOM scraping** 하여 로그인 사용자 식별을 시도합니다.  



### 로그인 사용자 식별 



#### Layout_stateLogon 모듈 수정 

메인 레이아웃, 공통 레이아웃의 **Layout_stateLogon** 모듈을 아래와 같이 수정합니다. 

```html
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



#### 로그인 사용자 식별을 위한 gtm 컨테이너 구성 

**"bigin 로그인"** 태그와 **"LayoutStateLogonExistingTrg"** 트리거가 사용됩니다.

**" bigin 로그인"** 태그는 DOM scraping 과 bigin 로그인 사용자 식별을 수행하는 코드로 구성되며, 
**"LayoutStateLogonExistingTrg"** 트리거는 **모든 페이지뷰**와 **맞춤 자바스크립트 변수**가 활성 조건인 트리거입니다.

 

 **태그 : cafe24 bigin 로그인** 

~~~html
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
~~~



 **트리거 : LayoutStateLogonExistingTrg** 

![cafe24_login_trigger](http://support.bigin.io/images/cafe24_login_trigger.png)



 **변수 : LayoutStateLogonExistingVar** 

맞춤 자바스크립트 유형의 변수를 사용합니다. 

~~~javascript
function(){
	var flag = false;
  	if(document.querySelector(".xans-layout-statelogon")){
      	var biginUser = document.querySelector(".xans-layout-statelogon .bigin-user-id");
      	if(biginUser){
	    	flag = true;        
        }
    }
  	console.log("LayoutStateLogonExistingVar");
	return flag;
}
~~~



### 로그아웃 추적  



#### 로그아웃 추적을 위한 gtm 컨테이너 구성 

**"cafe24 bigin 로그아웃"** 태그와 **"logoutButtonClickedTrg"** 트리거가 사용됩니다.

**"cafe24 bigin 로그아웃"** 태그는 즉시실행함수의 형태로 bigin 로그아웃 추적 코드를 실행합니다.
**"logoutButtonClickedTrg"** 트리거는 **클릭 - 모든 요소**와 **맞춤 자바스크립트 변수**가 활성 조건인 트리거입니다.

 

 **태그 : cafe24 bigin 로그아웃** 

```html
<script>
  (function(){
  	bigin.user("logout")
  })()
</script>
```



 **트리거 : logoutTrg** 

![cafe24-logoutTrg](http://support.bigin.io/images/cafe24-logoutTrg.png)



 **변수 : clickVar** 

맞춤 자바스크립트 유형의 변수를 사용합니다. 

```javascript
function(){
	var flag = false;

  	if({{Click Classes}}.indexOf("logout") > -1){
		console.log("로그아웃 버튼 클릭 : " + {{Click Classes}});
      	flag = "logout"
    }    
	return flag;
}
```





## 이커머스 추적 



### 제품의 링크 클릭

쇼핑몰의 랜딩페이지, 상품 분류 페이지, 검색 결과 페이지 등 **제품 상세페이지 링크** 가 노출되는 페이지에서 **제품 링크 클릭** 에 대한 이커머스 추적을 실행해야합니다.

이때, UI 레이어에 노출된 상품의 데이터(상품명, 가격, 설명 등)를 효율적으로 가져오기 위해서 **hidden div 태그**를 삽입합니다. 
그리고 **hidden div 태그**는 상품의 데이터를 내용으로 취합니다. 



**상품목록 템플릿 수정** 

고도몰의 상품 리스트 페이제이 게재되는 상품들에 대한 치환코드는  보통 <code>goods/list/list-[seq]</code> 페이지에 기록되어 있습니다.
<code>goods/list/list-[seq]</code> 페이지를 아래와 같이 수정해주세요.

~~~html
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

~~~



**태그 : bigin 상품링크클릭**

~~~html
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
~~~



**트리거 : impressionTrg**

![impressionTrg](/Users/westlife/Desktop/impressionTrg.png)



변수 : clickVar

~~~javascript
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
~~~





**태그 : viewProduct**

~~~html
<script>
  var callViewProduct = function(){
  	var biginProduct = {};
    var biginProductImage;
    
    try{
   		if(document.querySelector(".xans-product-image img")){
        	biginProductImage = document.querySelector(".xans-product-image img");
          	biginProduct.thumbnail = biginProductImage.src;
        }
		biginProduct.name = product_name;
      	biginProduct.price = product_price;
      	biginProduct.id = iProductNo;
      	console.log("bigin eent");
      	bigin.event("bg:viewProduct", biginProduct);
      	
    }catch(e){
    	console.log(e);
    }
  }
  
  if(document.readyState != 'complete'){
    console.log("! complete");
  	window.addEventListener("load", function(){
    	if(document.readyState == 'complete'){
              console.log("callback complete");
        	callViewProduct();
        }
    })
  }
  else{
    console.log("complete");    
	callViewProduct();    
  }
  
</script>
~~~



**트리거 : viewProductTrg**

![viewProductTrg](/Users/westlife/Desktop/viewProductTrg.png)

**일부 페이지뷰** 유형의 트리거를 사용하며, <code>path name</code> 의 값을 통해서 페이지 식별을 함.



### 장바구니 추가

**태그 : bigin 장바구니 추가**

~~~html
<script>
	(function(){
      	var biginProductList = [];
      	if(has_option == "T"){
			if(document.getElementsByClassName('option_box_id').length>0){
           		for(var i=0;i<document.getElementsByClassName('option_box_id').length;i++){
           			biginProductList.push({
               		id : iProductNo,
					name : product_name,
					price : document.querySelectorAll('span[id*="option_box"]')[i].innerText.replace(/[^0-9]/g,""),
		            variant:document.getElementsByClassName('product')[i].innerHTML.split('<span>')[1].split('</span>')[0],
					thumbnail : [window.location.hostname + "/web/product/tiny" + product_image_tiny];                      
        	        quantity:document.getElementById('option_box'+(i+1)+'_quantity').value
		            }); 
    	    	}
	    	}        
        }
		else{
        	var biginProduct = {};
          	biginProduct.id = iProductNo;
          	biginProduct.name = product_name;
          	biginProduct.price = product_price;
          	biginProduct.thumbnail = [window.location.hostname + "/web/product/tiny" + product_image_tiny];
          	biginProduct.quantity = document.querySelector("#quantity").value;
  			biginProductList.push(biginProduct);
        }
        
        bigin.event("bg:cart" , {
        	product: biginProductList;
        })
	})()
</script>
~~~



**트리거 : addToCartTrg**

![addToCartTrg](/Users/westlife/Desktop/addToCartTrg.png)



### 장바구니 갱신

**태그 : bigin 장바구니 갱신**

~~~html
<script>
  var callBiginCart = function(){
    var biginProductList = [];
    aBasketProductData.forEach(function(e, i){
    	var biginProduct = {};
      	biginProduct.id = e.product_no;
      	biginProduct.name = e.product_name;
      	biginProduct.price = e.product_price;
      	biginProduct.quantity = e.quantity;
      	biginProduct.variant = e.opt_str ? e.opt_str : null;
      	biginProduct.thumbnail = [];
      	biginProductList.push(biginProduct);
    })
    
    bigin.event("bg:cart", {
    	products : biginProductList
    })
  }
  
	if(document.readyState != 'complete'){
      	console.log("document.readyState != complete // in cart");      
    	window.addEventListener("load", function(){
      	console.log("window.onload // in cart");                
			callBiginCart();
        })
    }
 	else{
      	console.log("document.readyState == complete // in cart");
    	callBiginCart();
    }
</script>
~~~



**트리거 : cartTrg**

![cartTrg](/Users/westlife/Desktop/cartTrg.png)





### 장바구니 제거 



**태그 : bigin 장바구니 제거**

~~~html
<script>
	(function(){
		var biginSelectedProductList = [];
		document.querySelectorAll("input[id*='basket_chk_id']:checked").forEach(function(e, i){
			var biginProduct = {};
			biginProduct.id = aBasketProductData[i].product_no;
	  		biginProduct.name = aBasketProductData[i].product_name;
		  	biginProduct.price = aBasketProductData[i].product_price;
			biginProduct.quantity = aBasketProductData[i].quantity;
		  	biginProduct.variant = aBasketProductData[i].opt_str ? aBasketProductData[i].opt_str : null;
			biginProduct.thumbnail = [];
	  		biginSelectedProductList.push(biginProduct);
		})
	bigin.event("bg:removeCart", {
    	products : biginSelectedProductList
    })
  })()
</script>
~~~



**트리거 : removeCartTrg**

![removeCartTrg](/Users/westlife/Desktop/removeCartTrg.png)



### 체크아웃 프로세스 시작



**태그 : bigin 체크아웃 step 0**

~~~html
<script> 
	(function(){
		var biginSelectedProductList = [];
		document.querySelectorAll("input[id*='basket_chk_id']:checked").forEach(function(e, i){
			var biginProduct = {};
			biginProduct.id = aBasketProductData[i].product_no;
	  		biginProduct.name = aBasketProductData[i].product_name;
		  	biginProduct.price = aBasketProductData[i].product_price;
			biginProduct.quantity = aBasketProductData[i].quantity;
		  	biginProduct.variant = aBasketProductData[i].opt_str ? aBasketProductData[i].opt_str : null;
			biginProduct.thumbnail = [];
	  		biginSelectedProductList.push(biginProduct);
		})
		bigin.event("bg:checkout", {
          	step : 0,
          	option : "옵션 정보",
    		products : biginSelectedProductList
	    })
	})()
</script>
~~~



**트리거 : checkoutStep0Trg**

![checkoutStep0Trg](/Users/westlife/Desktop/checkoutStep0Trg.png)





### 체크아웃 프로세스 추적



**태그 : bigin 체크아웃 프로세스 추적**

~~~html
<script>
  (function(){
  	var checkedInput = document.querySelector("input[id*='addr_paymethod']:checked");
	var payMethod = checkedInput.closest(".ec-base-label").querySelector("label").innerText;
    
    bigin.event("bg:checkout" , {
    	step : 1,
      	option : payMethod
    })
  })()
</script>
~~~



**트리거 : checkoutStepNTrg**

![checkoutStepNTrg](/Users/westlife/Desktop/checkoutStepNTrg.png)





### 제품 구매 완료

cafe24는 주문 상품 리스트에 관한 모듈들이 있습니다. 

| 모듈명                                                   |
| -------------------------------------------------------- |
| order_normalresultlist (주문완료페이지 기본배송상품)     |
| order_individualresultlist (주문완료페이지 개별배송상품) |
| order_oversearesultlist (주문완료페이지 해외배송상품)    |
| order_giftresultlist (주문완료페이지 상은품 리스트)      |

주문 상품 목록 모듈 수정 

주문된 상품의 데이터를 DOM scraping 방식으로 가져오기 위하여 아래와 같은 방식으로 모듈의 html 을 수정해야합니다.



~~~html
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

                    <!---------- bigin purchase start ----------->
                    <script>
                    	var biginProductList = biginProductList || [];
                        var biginProduct = {};
                        biginProduct.id = "{$product_no}";
                        biginProduct.name = "{$product_name}";
                        biginProduct.price = "{$product_price}".replace(/[^0-9]/g,'');
                        biginProduct.quantity = "{$product_quantity}";
                        biginProduct.variant = "{$option_str}";
                        biginProduct.thumbnail = ["{$product_image}"];
                        biginProductList.push(biginProduct);
                    </script>
                    <!---------- bigin purchase end ----------->                    
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
                    <!---------- bigin purchase start ----------->
                    <script>
                    	var biginProductList = biginProductList || [];
                        var biginProduct = {};
                        biginProduct.id = "{$product_no}";
                        biginProduct.name = "{$product_name}";
                        biginProduct.price = "{$product_price}".replace(/[^0-9]/g,'');
                        biginProduct.quantity = "{$product_quantity}";
                        biginProduct.variant = "{$option_str}";
                        biginProduct.thumbnail = ["{$product_image}"];
                        biginProductList.push(biginProduct);
                    </script>
                    <!---------- bigin purchase end ----------->                                        
                </tr>
            </tbody>
~~~



~~~html
<div module="Order_result">
    // ....
    
    <script>
        var callBiginPurchase = function(){
            var biginPurchase = {};
            biginPurchase.id = "{$order_id}";
            biginPurchase.revenue = "{$total_product_price}";
            biginPurchase.payMethod = "{$paymethod_name}";
            biginPurchase.products = biginProductList;
            window.dataLayer.push({
                event : 'purchase',
                data : biginPurchase
            })
        }
        window.addEventListener("load", function(){
            callBiginPurchase();
        })
    </script>
    
    // ...
</div>
~~~



**태그 : bigin 구매안료**

~~~html
<script>
    (function(){
        bigin.event("bg:purchase" , {{data})
    })()
</script>
~~~



**트리거 : purchaseTrg**

![purchaseTrg](/Users/westlife/Desktop/purchaseTrg.png)





### 제품의 환불



**태그 : bigin 환불**

~~~html
<script>
  (function(){
    var orderId;
    
    try{
		orderId = {{Click Element}}.getAttribute("onclick").match(/(?<=\(\').*?(?=\'\))/)[0].replace(/\'/g, "").replace(/\"/g, "");    
    
       	bigin.event("bg:refund" {
   			id : orderId
	   	})
    }
    catch(e){
    	console.log(e);
    }

  })()
</script>
~~~





**트리거 : refundTrg**

![refundTrg](/Users/westlife/Desktop/refundTrg.png)







## 고도몰 bigin SDK 설치하기



### gtm 컨테이너 내려받기

[godomall_container.json](http://support.bigin.io/data/container.json) 파일을 내려받은 후, 사용할 구글 태그매니저 컨테이너에 병합합니다.
godomall_container.json 파일은 bigin 기본 추적 스크립트의 삽입부터 모든 추적 코드들을 구현한 gtm 컨테이너입니다.

gtm 컨테이너의 **내려받기**와 **가져오기**에 대한 자세한 설명은 [이곳](https://support.google.com/tagmanager/answer/6106997?hl=en)를 참조해주세요.



### 구글 태그매니저 설치 

고도몰 관리자페이지에 접속한 후, **레이아웃의 페이지 소스 **상에 **구글 태그매니저 스니펫**을 삽입합니다. 
모든 페이지들은 **상단 레이아웃** 과 **하단 레이아웃**을 포함합니다.  
**구글 태그매니저 스니펫** 을 레이아웃의 html 에 삽입함으로써 모든 페이지에서 컨테이너의 정보를 가진 **gtm.js**에 접근할 수 있습니다. 

[구글 태그 관리자 고객센터](https://support.google.com/tagmanager/answer/6103696?hl=ko) 또는 [구글 태그 관리자 개발가이드](https://developers.google.com/tag-manager/quickstart)에서 자세한 설치법을 알아보세요.





