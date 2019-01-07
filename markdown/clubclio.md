
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

```bash
$ vim ./~zshrc
```

```python
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