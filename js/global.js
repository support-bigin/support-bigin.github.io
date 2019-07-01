var header = document.querySelector('head');
var div = document.createElement('div');
div.classList.add('bigin')
var script = document.createElement('script');
script.classList.add('bigin-defualt-tracking-script')
script.innerHTML = `(function(){console.log(123123123)})()`
div.appendChild(script);
header.appendChild(div);
