
function city(inputbox, cityJson, callback) {
    console.log(cityJson)
	/**
	 * get元素
	 * @param {Object} a 元素
	 */
	function _id(a){return document.getElementById(a)}
	
	// 单例添加dom
    // if(!city.htmlrunning)
    addDom();
	
	// // 开启元素
	// if(city.htmlrunning){
	// 	_id('cityBox').style.display = 'block';
	// }
	
	// // 执行单例
	// city.htmlrunning = true;
	// /**
	//  * 单例添加Dom
	//  */
	function addDom(){
		var content = [
						'	<div id="box3">',
						'			<p>',
						'					<l id="l">取消</l>',
						'					<r id="r">确认</r>',
						'			</p>',
						'			<back id="back"></back>',
						'			<div>',
						'					<span>加载中...</span><!--省-->',
						'			</div>',
						'			<div>',
						'					<span><br>加载中...</span><!--市-->',
						'			</div>',
						'			<div>',
						'					<span><br>加载中...</span><!--县-->',
						'			</div>',
						'	</div>'
						].join('');
						
		var div = window.document.createElement('div');
		div.id = 'cityBox';
		window.document.body.appendChild(div);
		div.innerHTML += content;
	}
	
	
	var c1, c2, c3, y1, y, upjj, bottomjj, ycj, em, emjj, //控制移动，获得下一级的值
	class1n, name1, //省
	name2, name3, afterh, px, b2y1, //二级原点
	b2y, b2upjj, b2emjj, b2bottomjj, b2taglength, b3y1, b3y, b3upjj, b3bottomjj, b3emjj, newname2, b3length, color, color1, array //滑动轨迹

	array = [];
	c1 = c2 = c3 = '';
	color1 = "#ccc";
	color = "#000";
	upjj = bottomjj = b2upjj = b2bottomjj = 1;
	b3upjj = b3bottomjj = 1;
	class1n = b2taglength = b2emjj = emjj = 0;
	b3emjj = 0;
	ycj = 35;
	afterh = '<div style="height:20em;"></div>';
	var box = document.getElementById("box3");
	var b1 = box.getElementsByTagName("span")[0];
	var b2 = box.getElementsByTagName("span")[1];
	var b3 = box.getElementsByTagName("span")[2];
	var combox = window.getComputedStyle(b1);
	em = parseInt(combox.lineHeight);
	(function() {
		for (var i in cityJson) {
			c1 += '<a class="' + (++class1n) + '">' + i + '</a>' + '<br>';
		}
		b1.innerHTML = '<br />' + c1 + afterh;
	})();

	function b1join(va) {
		name1 = b1.getElementsByTagName("a")[va];
		var a = b1.getElementsByTagName("a");
		for (var i in a) {
			if (+i < 1000) {
				a[i].style.color = color1;
			}
		}
		name1.style.color = color;
		name1 = name1.innerText; //获取位置
		c2 = ''; //清除缓存
		b2taglength = 0;
		b2.style.top = "0em";
		b2emjj = 0;
		var c2arr = eval('cityJson.' + name1);
		for (var j in c2arr) {
			c2 += "<a>" + j + "</a><br />";
			b2taglength += 1;
		}
		b2.innerHTML = '<br />' + c2 + afterh;
		b2join(0);
		b3fun(0);
	}
	b1join(0);

	function b2join(va) {
		name2 = b2.getElementsByTagName('a')[va];
		var a = b2.getElementsByTagName("a");
		for (var i in a) {
			if (+i < 1000) {
				a[i].style.color = color1;
			}
		}
		name2.style.color = color;
		name2 = name2.innerText;
		b3.style.top = "0em";
		b3emjj = 0;
		c3 = '';
		newname2 = eval('cityJson.' + name1 + '.' + name2);
		b3length = newname2.length;
		newname2.forEach(function(v, i, a) {
			c3 += "<a>" + v + "</a><br>";
		})
		b3.innerHTML = '<br />' + c3 + afterh;
		b3fun(0);
	}

	function b3fun(va) {
		name3 = b3.getElementsByTagName('a')[va];
		var a = b3.getElementsByTagName("a");
		for (var i in a) {
			if (+i < 1000) {
				a[i].style.color = color1;
			}
		}
		name3.style.color = color;
		name3 = name3.innerText;
	}

	function o(y, y1) {
		array.push(y);
		array.forEach(function(v, index, a) {
			array = [];
			for (var i = 0; i <= a.length && i != index; i++) {
				if (a[i] == v) {
					y1 = v;
					array = [];
					// console.log(v)
					break;
				}
			}
		});
	}
	b3fun(0);
	b1.addEventListener("touchstart", function(e) {
		y1 = e.changedTouches[0].clientY;
	});
	b2.addEventListener("touchstart", function(e) {
		b2y1 = e.changedTouches[0].clientY;
	});
	b3.addEventListener("touchstart", function(e) {
		b3y1 = e.changedTouches[0].clientY;
	});
	b1.addEventListener("touchend", function(e) {
		upjj = bottomjj = 1;
	});
	b2.addEventListener("touchend", function(e) {
		b2upjj = b2bottomjj = 1;
	});
	b3.addEventListener("touchend", function(e) {
		b3upjj = b3bottomjj = 1;
	});
	b1.addEventListener("touchmove", function(e) {
		e.stopPropagation();
		y = e.changedTouches[0].clientY;
		if (y + ycj * upjj <= y1 && emjj <= class1n - 2) {
			b1.style.top = "-" + em * (++emjj) + "px";
			upjj++;
			b1join(emjj);
		}
		if (y - ycj * bottomjj >= y1 && emjj >= 1) {
			b1.style.top = "-" + em * (--emjj) + "px";
			bottomjj++;
			b1join(emjj);
		}
		o(y, y1)
	});
	b2.addEventListener("touchmove", function(e) {
		b2y = e.changedTouches[0].clientY;
		if (b2y + ycj * b2upjj <= b2y1 && b2emjj <= (b2taglength - 2)) {
			b2.style.top = "-" + em * (++b2emjj) + "px";
			b2upjj++;
			b2join(b2emjj);
		}
		if (b2y - ycj * b2bottomjj >= b2y1 && b2emjj >= 1) {
			b2.style.top = "-" + em * (--b2emjj) + "px";
			b2bottomjj++;
			b2join(b2emjj);
		}
		o(b2y, b2y1)
	});
	b3.addEventListener("touchmove", function(e) {
		b3y = e.changedTouches[0].clientY;
		if (b3y + ycj * b3upjj <= b3y1 && b3emjj <= (b3length - 2)) {
			b3.style.top = "-" + em * (++b3emjj) + "px";
			b3upjj++;
			b3fun(b3emjj);
		}
		if (b3y - ycj * b3bottomjj >= b3y1 && b3emjj >= 1) {
			b3.style.top = "-" + em * (--b3emjj) + "px";
			b3bottomjj++;
			b3fun(b3emjj);
		}
		o(b3y, b3y1)
	});
	box.addEventListener("touchstart", function(e) { //提交数据
		//e.stopPropagation();
        var ev = e.target;
        var site
		if (ev.id == "l") {
            setTimeout(function(){
                document.body.removeChild(box.parentNode)
            }.bind(this), 300)
            
            prevent('end')
            callback(site)
		}
		if (ev.id == "r") {
			// var site = [name1, name2, name3];
			site = name2 ? [name1, name2] : [name1];
			if (site[0] == site[1]) {
                site = [name1];
			}
			
			if (/input/ig.test(inputbox.tagName)) {
				inputbox.value = site.join('-');
			} else {
				inputbox.innerText = site.join('-');
			}
			
                
            setTimeout(function(){
                document.body.removeChild(box.parentNode)
            }, 300)
            prevent('end')
            callback(site)
        }
        
        
    })
    

    function preventDefaultEvent(ev) {
        ev.preventDefault();
    }
    prevent('start')

    function prevent(state){
        if(state == "start"){
            document.querySelector('body').addEventListener('touchmove', preventDefaultEvent, false)
            document.getElementsByTagName('html')[0].style.overflowY= 'hidden';
        }else if(state == "end"){
            document.querySelector('body').removeEventListener('touchmove', preventDefaultEvent, false)
            document.getElementsByTagName('html')[0].style.overflowY= 'auto';
        }
    }
}

export default city
