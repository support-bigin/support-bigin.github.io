# 클럽클리오 커스텀이벤트 목록
1. search
    * 웹페이지의 내부 검색바를 이용한 검색 행동을 추적합니다.
* custom event name : search
 전송 데이터
 a. keyword : '검색어'
 예시) bigin.event('search' , {
 keyword : '비비크림' })
2. headerLink
헤더의 네비게이션 바를 통한 페이지 이동 시 발생하는 커스텀이벤트입니다.
어떤 브랜드 혹은 어떤 브랜드의 카테고리를 필터링하는지에 대한 행동을 추적합니다.
커스텀 이벤트 이름 : headerLink 전송데이터
a. header : 헤더의 네비게이션 바 버튼 이름 ex) CLIO
b. category : 'FACE',
c. subCategory : "cushion"
예시)
쇼핑버튼을 클릭하는 경우. bigin.event('headerLink', {
header : 'all', // 모든 브랜드의 상품을 담고있어서 all 이라고 명명 })
쇼핑버튼에 마우스를 호버시킨 후, 페이스 버튼을 클릭하는 경우, bigin.event('headerLink', {
header : 'all',
category : 'face' })
CLIO 버튼을 하는 경우, bigin.event('headerLink', {
header: 'CLIO', })
    
 CLIO 버튼에 마우스를 호버시킨 후, 페이스 버튼을 클릭하는 경우, bigin.event('headerLink', {
header : "CLIO",
category : 'face' })
3. sideLink
/product/product_list , /product/brand_main , /product/brand_product_list 페이지에서 좌측 사이드 메뉴의 버튼을 통해서 필터링을 하는 경우에 발생하는 커스텀이벤트입니다. 좌측 사이드 메뉴의 필터링 기능을 사용하는 행동을 추적합니다.
커스텀 이벤트 이름 : sideLink 전송데이터
a. header : '좌측 사이드 메뉴의 타이틀' // 예시로 자세히 설명드리겠습니다.
b. category : ['FACE']
c. subCategory : ['쿠션']
d. brand : ['클리오', '구달']
예시.
/product/product_list 페이지의 좌측 사이드 메뉴에서 FACE 버튼을 클릭하는 경우,
bigin.event('sideLink', {
header : 'all',
category : ['FACE'] })
/product/product_list 페이지의 좌측 사이드 메뉴에서 FACE 의 하위카테고리인 쿠션을 클릭하는 경우, bigin.event('sideLink', {
header : 'all', category : ['FACE'], subCategory : ['쿠션']
})
/product/product_list 페이지의 좌측 사이드 메뉴에서 FACE 의 하위카테고리인 쿠션을 클릭된 상태에서 클리오 , 구달 브랜드 필터링을 하는 경우, bigin.event('sideLink', {
header : 'all',
category : ['FACE'], subCategory : ['쿠션'], brand : ['클리오', '구달']
})
/product/brand_main 페이지(헤더 네이게이션 바에서 goodal 버튼을 클릭한 경우)에서 좌측 사이드 메뉴 중 스킨/미스트를 클릭한 경우,
 bigin.event('sideLink', { header : 'goodal',
category : ['스킨/미스트'] })
/product/brand_product_list 페이지에서 상세검색을 하는 경우, bigin.event('sideLink', {
header : 'goodal',
category : ['FACE' , 'SKIN CARE'], subCategory : ['선케어', '스페션케어' , '클렌져']
})
4. sortBy
상품 리스트에서 "최신순", "조회순" , '가격순' 과 같은 정렬 버튼을 클릭하는 행동을 추적하는 커스텀 이벤트입니다.
커스텀 이벤트 이름 : sortBy 전송데이터
a. sortType : "정렬 방식"
예시)
최신순 버튼을 클릭하는 경우, bigin.event('sortBy' , {
sortType : '최신순' })
5. question
1:1 상담하기를 통하여 문의를 남기는 행동을 추적하는 커스텀이벤트입니다.
커스텀 이벤트 이름 : question, 전송데이터
a. id : '문의 아이디',
b. category : '상담 종류'
c. title : '제목',
d. content : '문의 내용'
예시. bigin.event('question' , {
id : 'q1234',
category : '배송문의',
title : '배송이 오질 않아요',
content : '배송이 많이 늦네요. 그래서 이유를 알고싶어요'
 })
vi. viewReview
각 상품의 리뷰 조회를 추적하기 위한 커스텀이벤트입니다.
커스텀이벤트 이름 : viewReview 전송데이터
a. id : '리뷰 아이디',
b. product : '상품아이디',
c. title : '리뷰제목',
d. content : '리뷰내용'
예시. bigin.event('viewReview', {
id : 'R1234',
product : 'P1234', })
7.consultingChat
클럽클리오의 우측에 플로팅되어 있는 1대1 상담 톡 버튼의 클릭 행동을 추적하며 어떤 페이지에서 상담요청이 존재하는지 추적하는 커스텀이벤트입니다.
커스텀이벤트 이름 : consultingChat 전송데이터
a. list : '현재 페이지 이름'
예시. bigin.event('consultingChat' , {
list : '/main' })
8.banner
배너가 존재하는 페이지에서 배너를 클릭하는 행동을 추적합니다.
배너의 링크가 상품 상세페이지로 이동하는 경우엔
제품을 클릭할 때 사용하는 bg:impression 이벤트를 사용하면되지만
배너의 링크가 "회사소개 페이지" 또는 "이벤트 상세 페이지" 인경우엔
banner 라는 이름의 커스텀 이벤트를 사용하여 배너를 클릭하는 사용자의 행동을 추적합니다.
커스텀이벤트 이름 : banner 전송데이터
a. list : '현재 페이지의 이름',
b. position : '배너의 위치 또는 타이틀'
 c. subPosition : '4' // 배너가 슬라이드 형식인 경우, 몇번째 배너인지에 대한 정보를 입력합니다.
예시.
배너가 페이지의 상단에 존재하고, 슬라이드 형식의 배너인 경우 bigin.event('banner' , {
list : '/main',
position : 'top-banner', // 배너의 위치 정보 또는 특징을 입력해주세요. subPosition : 4 // 4번째 배너 클릭
})
9. sns
메인페이지 하단의 sns 썸네일 또는 상품상세페이지에서 sns 링크 버튼의 클릭을 추적합니다.
커스텀이벤트 이름 : sns 전송데이터
a. list : '현재페이지',
b. sns ; 'sns 종류',
c. product : '상품 아이디'
예시.
메인페이지에서 sns 을 클릭하는 경우 bigin.event('sns' , {
list : '/main',
sns : 'instagram',
url : 'instagram.1231.asdfasfd.com'
product : 'p1234'. // 상품 아이디를 알 수 있는 경우에는 상품아이디를 등록해주세요.
})
상품 상세페이지에서 sns 을 클릭하는 경우, bigin.event('sns' , {
list : '/product/product_view', product : 'p1234',
sns : 'facebook',
url : 'facebook.1234.zcxv.com'
})
10. addToWishList
addToCart 이커머스 트래킹과 사용법이 동일하며 위시리스트에 담겨지는 상품을 추적하는 커스텀이벤트입니다.
11. wishList
cart 이커머스 트래킹과 동일한 사용법이 동일하며
업데이트된 위시리스트의 목록들을 추적하는 커스텀이벤트입니다.