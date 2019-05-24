## SDK 추적코드 설치
### 시작하기
bigin의 WEB SDK는 웹사이트에 삽입되는 스크립트 형태로, 웹사이트에 접속한 사용자들의 행동 이벤트를 추적하고, 웹사이트로 유입된 사용자의 구매행동 추적 및 다차원 분석을 지원합니다.

웹사이트에서 기본 데이터를 수집하는 방법은 다음과 같습니다.



1. 새로운 bigin 계정을 만들거나 계정에 로그인합니다.

    * 계정을 만들려면 [무료로 시작하기](https://insight.bigin.io/sign-up)를 클릭합니다.
    * 계정에 로그인하려면 [로그인](https://insight.bigin.io/login)을 클릭합니다.
2. 프로젝트를 생성하여 추적코드를 발급받습니다.

3. 안내에 따라 웹사이트 또는 모바일 앱에 추적코드를 추가하면 프로젝트의 기본 추적 데이터가 수집됩니다.

***

### 기본 추적 스크립트

1. 추적 스크립트는 프로젝트마다 고유의 추적 ID로 작동합니다. 프로젝트 생성을 완료하면 bigin.js 를 사용할 수 있는 추적코드가 생성됩니다.
2. 아래의 설명에 따라 추적 ID를 찾습니다. 추적 코드 스니펫에 이 추적 ID를 사용합니다.
3. bigin.js 추적코드 스니펫을 복사하여 추적할 각 웹페이지에 삽입합니다.

각 페이지의 시작 태그인 <head> 바로 다음에 추적 코드 스니펫을 추가합니다.
웹사이트의 SDK의 경우 구글 태그매니저(GTM)의 설치를 지원합니다. 구글 태그매니저의 설치방법은 여기를 참고하세요.

### 추적 ID 찾기
추적 ID를 찾으려면 다음 단계를 따르세요.

1. insight.bigin.io에 로그인합니다.
2. 설정 > 해당 프로젝트를 클릭합니다.
3. 추적 ID가 페이지 상단에 표시됩니다.

사이트의 각 페이지에서 <head> 태그 바로 뒤에 다음 스니펫을 삽입합니다. 다음과 같이 PROJECTID를 실제 프로젝트의 추적ID로 변경합니다.

### 추적 코드 스니펫

~~~
(function() {
  var biginScript = document.createElement('script');
  biginScript.type = 'text/javascript';
  biginScript.async = true;
  biginScript.src = 'https://sdk.bigin.io/v0.3/bigin.js'; // bigin SDK 버전
  biginScript.onload = function() {
    bigin.config({
      projectID: "프로젝트 ID", // 프로젝트의 고유 추적 ID 입니다. 'G924TSD55D-2'
      domain: "https://bigin.io", // 프로젝트의 도메인 url 입니다.
      track: ['session', 'view', 'click', 'scroll'], // 자동 추적(AutoTrack)이 가능한 이벤트와 제스처
      trackLocation:true, // 모바일 접속 시 위치정보 수집 허용
      currencyCode: “KRW” // 표시 통화
    });
  };

  var s = document.getElementsByTagName('script')[0];

  s.parentNode.inserBefore(ab, s);

})();
~~~

## 데이터 수집의 허용
bigin SDK는 선택적으로 기본적인 사용자 행동을 추적할 수 있습니다. 아래의 선택적으로 추적되는 추적항목을 확인하세요.

~~~
track : [
    'session', // 사용자 방문의 단위를 수집하기 위한 단위입니다. 가능한 이 데이터는 추적을 권장합니다.
    'view', // 사용자의 페이지 조회를 수집할 수 있습니다. SPA(SinglePageApplication)은 별도의 설정이 필요합니다.
    'click', // 마우스로 클릭하는 모든 클릭이벤트를 수집합니다. 특정 이벤트의 추적은 CustomEvent 의 추적을 이용하세요.
    'scroll' // 웹사이트 내의 스크롤 이벤트를 수집합니다.
]
~~~

|키|설명|
|:---|:---|
|session|	사용자 방문의 단위를 수집합니다. 사용자의 방문당 행동들을 알기 위하여 이 데이터의 추적을 권장합니다.|
|view	|사용자의 페이지 조회를 수집합니다. SPA(Single Page Application)는 별도의 페이지 추적 설정이 필요합니다.|
|click	|마우스로 클릭하는 모든 클릭이벤트를 수집합니다. *사용자가 클릭한 특정 이벤트를 알기 위해서는 커스텀 이벤트 추적을 사용합니다.|
|scroll	|사용자의 스크롤 이벤트를 수집합니다.|

### 특정 페이지 뷰 추적 사용 중지
위의 데이터 수집에서 기본 동작은 bigin SDK 로 데이터를 보내는 것입니다. 사용자와 웹사이트의 상호작용을 추적하기 위해서는 이것은 대부분의 경우 권장하는 부분입니다. 사이트의 각 페이지에 스니펫을 추가하면 페이지 뷰가 자동으로 추적됩니다. 그러나 스니펫이 대시보드로 페이지 뷰 조회를 보내지 않게하려면 send_page_view매개 변수를 false다음 과 같이 설정하십시오 .

~~~
ignore : ['/pagePath', '/pagePath/page'] // 추적 사용을 중지할 특정 페이지의 path를 다음과 같이 추가하세요.
~~~

### SPA의 가상 페이지 뷰 추적
SPA(SinglePageApplication) 단일 페이지 어플리케이션로 개발된 웹사이트의 경우, 페이지 뷰 이벤트의 별도 추적이 필요합니다.

아래의 스니펫을 추적할 페이지의 <head> 태그 안에 추가하세요.

~~~
(function() {
    bigin.track("view", {
        page: '/productDetail/12345', // (옵션)pagePath 또는 window.location.pathname 로 추적합니다.
        ignore:['/main'] // (옵션)추적을 허용하지 않는 페이지의 정규식
    });
})();
~~~

## 고유 사용자 식별
### 로그인 사용자 식별
bigin은 로그인 또는 회원가입 등 회원의 고유정보를 수집하여, 이커머스 및 웹사이트에서 행동하는 이벤트를 개별 사용자의 행동으로 처리할 수 있도록 사용자를 추적합니다. 로그인을 통한 사용자 중심의 분석은 다양한 비즈니스 접점을 한 명의 사용자 중심으로 이어주기 때문에 전체 사용자의 파악과 경로를 통한 분석을 할 수 있습니다.

|키|설명|
|:---|:---|
|userID|asdfasdfasdf|
|userID|asdfasdfasdf|
|userID|asdfasdfasdf|


<br>
<br>
<br>
<br>










# 1 헤더

"#"
# This is a H1

"##"
## This is a H2

"###"
### This is a H3

"####"
#### This is a H4

"#####"
##### This is a H5

"######"
###### This is a H6

# 2 수평선
***


# 3 blockquote
> This is a blockqute.


>> This is a blockqute.


>>> This is a blockqute.


>>>>This is a blockqute.


# 4 순서있는 목록

1. 일
2. 이
3. 삼


# 5 순서없는 목록


* 일
    * 일-이
        * 일-삼
* 이
    * 이-이
        * 이-삼
* 삼
    * 삼-이
        * 삼-삼



# 6  코드<pre><code></code></pre>

``` This is a normal paragraph: This is a code block. end code block. ```

This is a normal paragraph:
    This is a code block.
end code block.

```html
<a href="https://www.google.co.kr/" target="_blank">GOOGLE</a>
```

```css
.list > li {
  position: absolute;
  top: 40px;
}
```

```javascript
function func() {
  var a = 'AAA';
  return a;
}
```

~~~

bash
$ vim ./~zshrc

~~~

```
python
s = "Python syntax highlighting"
print s
```

```
No language indicated, so no syntax highlighting.
But let's throw in a tag.
```


# 7 강조
*single asterisks*
_single underscores_
**double asterisks**
__double underscores__
++underline++
~~cancelline~~


# 8 이미지
![Alt text](/support-bigin.github.io/images/bigin_logo.png)
![대체 텍스트(alternative text)를 입력하세요!](http://www.gstatic.com/webp/gallery/5.jpg "링크 설명(title)을 작성하세요.")

![Kayak][logo]

[logo]: http://www.gstatic.com/webp/gallery/2.jpg "To go kayaking."
# 9 링크

[GOOGLE](https://google.com)

[NAVER](https://naver.com "링크 설명(title)을 작성하세요.")

[Dribbble][Dribbble link]

[GitHub][1]

구글 홈페이지: https://google.com
네이버 홈페이지: <https://naver.com>

[Dribbble link]: https://dribbble.com
[1]: https://github.com
[참조 링크]: https://naver.com "네이버로 이동합니다!"














