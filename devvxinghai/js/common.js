//有问题接口
// 商城里边商品详情  /api/shopping/goods_detail
// 商城分类无数据 /api/shopping/getgoods_by_category_id
var api_init = function(){};
var url = "http://xinhai.vfing.com:80/api"
//var url = "http://192.168.0.8/api"  //接口地址 http://192.168.0.11/api.php
var sokectUrl = 'http://xinhai.vfing.com:8282'
// order_status: 1已提交 2取消 3退款中 4退货中 5已退款 6已退货 7待评价 8已完成
// order_type:   1:旅居卡2:旅游3:健康4:商城
//shipping_status:0 未发货 1已发货 2已收获
// pay_status: 0未支付 1已支付
//1:余额2:银行卡3:微信4:支付宝
function request(apis,params,callback,methods){
	api.ajax({
		url: url+apis,
		method: methods || 'post',
		data: {
			values: params,
		}
	}, function(ret, err) {
		callback(err,ret)
	});
}
apiready = function(){
	api_init ? api_init() : "";
}
setTimeout(function(){
    api.setWinAttr({
		bgColor: "#F8F9FB",
	});
},1000)

//判断是否登录
function isLogin(){
	return $api.getStorage('uid') != undefined 
}
//判断是否是IOS
function isIos(){
	var systemType = api.systemType;
	return systemType == "ios";
}
// iphoneX 底部识别
function handerIOSX(){
    if (api.statusBarAppearance) {
		var safeArea_bottom = api.safeArea.bottom || 0;
		var footer = document.getElementsByClassName('ifooter')[0];
		if(footer == null){
			return false
		}
		var footerHeight = footer.clientHeight;
		footer.style.height = footerHeight + safeArea_bottom + "px";
		footer.style.paddingBottom = safeArea_bottom + "px";
	}
}
//在某个数组里边任意取len的值
function getRandomArr(arr,len){
	var renderArr = [];
	for (var i = 0; i < len; i++) {
		var randm = Math.floor(Math.random() * arr.length);
		renderArr.push(arr[randm]);
		arr.splice(randm,1)
	}
	return renderArr
}
//根据两个时间戳计算相差小时和天数（）@param1：当前时间 @param2：结束时间
function interval(faultDate,completeTime){
	var usedTime = completeTime - faultDate;  //两个时间戳相差的毫秒数
	var m = Math.floor(usedTime%(60*60) / 60);
	var s = Math.floor(usedTime%(60*60) % 60);
	if (m < 10) {
		m = "0"+m
	}
	if (s < 10) {
		s = "0"+s
	}
	return{
		m:m,
		s:s,
	}
}
/*沉浸式*/
function immersion() {
	if (api.statusBarAppearance) {
		var safeArea = api.safeArea.top;
		var header = document.querySelector('.header');
		var main = document.querySelector('.main');
		if (header) {
			var height = header.offsetHeight;
            header.style.height = height + safeArea + 'px';
			$api.fixStatusBar(header);
        }
		if (main) {
			main.style.paddingTop = height + safeArea + 'px';
		}
	}
}
// 保存图片到本地
function savePicture(url){
	var timestamp = new Date().getTime()
	api.download({
		url: url,
		savePath: 'fs://test'+timestamp+'.jpeg',
		report: true,
		cache: true,
		allowResume: true
	}, function(ret, err) {
		if(ret){
			api.toast({
				msg:'图片已保存到本地'
			})
		}
		api.saveMediaToAlbum({
			path: 'fs://test'+timestamp+'.jpeg'
		}, function(ret, err) {
			
		});
	});
}
//退出APP
function ExitApp() {
	var ci = 0;
	var time1, time2;
	api.addEventListener({
	  name : 'keyback'
	}, function(ret, err) {
	  if (ci == 0) {
		time1 = new Date().getTime();
		ci = 1;
		api.toast({msg:'再按一次返回键退出'});
	  } else if (ci == 1) {
		time2 = new Date().getTime();
		if (time2 - time1 < 3000) {
		api.closeWidget({
		  id : api.appId,
		  retData : {
			name : 'closeWidget'
		  },
		  silent : true
		});
		} else {
		ci = 0;
		 api.toast({msg:'再按一次返回键退出'});
		}
	  }
	});
  }
  /*swiper*/
function swiper() {
	var swiper = new Swiper('.swiper-container', {
	 loop: true,
	 pagination: {
	  el: '.swiper-pagination',
	 },
	 autoplay: {
	  delay: 3000,
	  disableOnInteraction: false,
	 },
	 on: {
	   touchStart: function(event) {
		api.setFrameAttr({
		 name: api.frameName,
		 bounces: false
		});
	   },
	   touchEnd: function(event) {
		api.setFrameAttr({
		 name: api.frameName,
		 bounces: true
		});
	   },
		 }
	 });
   }
// 按钮点击遮罩层动画；
function createEle(ele){
	var ele = document.querySelector(ele);
	if(ele == null){
		return false
	}
	var box = document.createElement('div');
	box.className = "cirle";
	box.style = 'display:none;width:4px;height:4px;border-radius:50%;overflow:hidden;position:absolute;background-color:rgba(0,0,0,.3)'
	ele.appendChild(box)
	ele.addEventListener('click',function(e){
		var cirle = document.querySelector('.cirle');
		var px = e.offsetX;
		var py = e.offsetY;
		cirle.style.left = px - 2 + "px";
		cirle.style.top  = py - 2 + "px";
		cirle.style.display = 'block';
		cirle.style.animation = '.2s scrd';
		setTimeout(function(){
			cirle.style.animation = '';
			cirle.style.display = 'none';
		},200)
	},true)
}
setTimeout(function(){
	createEle('.zhezao');
},800);
// 动态加载JS
function loadJs(url, callback) {
	var script = document.createElement('script');
	script.type = "text/javascript";
	if (typeof (callback) != "undefined") {
		if (script.readyState) {
			script.onreadystatechange = function () {
				if (script.readyState == "loaded" || script.readyState == "complete") {
					script.onreadystatechange = null;
					callback();
				}
			}
		} else {
			script.onload = function () {
				callback();
			}
		}
	}
	script.src = url;
	document.body.appendChild(script);
}
loadJs("../../js/monitor.js", function () {});

//文本复制功能
function copy(text){
	//text为需要复制的文本
  var clipBoard = api.require('clipBoard');
	clipBoard.set({
   		value: text
	}, function(ret, err) {
    	if (ret) {
        	api.toast({msg:"复制成功",location:"middle"})
		} else {
    		api.toast({msg:"复制失败，请稍后重试",location:"middle"})
    	}
	});
}
// 瀑布流
function renderWaterFull(select,gbottom,glr){
	var waterItems = document.getElementsByClassName(select);  //所有瀑布流成员
	var carr = [];
	for (var i = 0; i < waterItems.length; i++) {
		var cheight = waterItems[i].clientHeight;
		carr.push({
			hg:cheight,
			index:i,
			top:0,
			xp:"",
		});
	}
	var newarr = resetArr(carr); // 数据操作完毕，开始重整dom结构
	newarr.map(function(v){
		waterItems[v.index].style.top = v.top+"px";
		waterItems[v.index].style[v.xp] = glr+"px";
	})
	function resetArr(arr){
		var lastarr = ((arr.length % 2) == 0) ? "" : arr[arr.length - 1];
		arr = ((arr.length % 2) == 0) ? arr : arr.splice(0,arr.length - 1);
		//重组顺序
		for (var i = 0; i < arr.length; i = i+2) {
			var currentEle = arr[i];  //当前元素
			var otherEle = arr [i+1]  //下一个元素
			var hang = Math.ceil((i+1) / 2);
			if((hang % 2) == 0){  //偶数行
				if (currentEle.hg <= otherEle.hg) {
					var other = arr[i+1];
					arr[i+1] = arr[i];
					arr[i] = other;
				}
			}else{        //奇数行
				if (currentEle.hg >= otherEle.hg) {
					var other = arr[i+1];
					arr[i+1] = arr[i];
					arr[i] = other;
				}
			}
		}
		lastarr != "" ? arr.push(lastarr) : "";
		//重组后计算top值 0,2,4 偶数
		for (var j = 0; j < arr.length; j++) {
			var pos = (j % 2) == 0 ? 'left' : 'right';
			arr[j].top = computedTop(pos,j);
			arr[j].xp = pos;
		}
		return arr;
		function computedTop(pos,index){
			var sum = 0;
			for(var k = pos == "left" ? 0 : 1;k < index; k = k+2){
			sum+= (arr[k].hg+gbottom)
			}
			return sum 
		}
	}
}
/* 获取元素的css值 @param1：元素选择器。@param2：某个css的字符串， @param3:切除最后两位个数 50px => 50   */ 
function getEleCss(ele,cssMsg,iscut){
	var eleStyle,num;
	if (window.getComputedStyle) {
		eleStyle = window.getComputedStyle(ele,null);
		num = iscut ? eleStyle[cssMsg].substring(0,eleStyle[cssMsg].length-iscut) : eleStyle[cssMsg];
	} else {
		console.err('your brower is not support')  
		num = ""; 
	}
	return num
}
// api回退页面
function hisToWin(num){
    if(!num){
		return false
	}
	var wins = api.windows();
	api.closeToWin({
		name:wins[wins.length- 1 - num].name,
	})
}
// 数组过滤空值
function filterAll(arr){
	var target = arr.filter(function(current){
		return current !== null && current !== undefined && current !== "";
	})
	target = target.map(function(v){
		v.goods = [];
		return v
	})
	return target;
}
// banner图URL参数
function getBannerQuery(url) {
	if (!url) {
	  return false
	}
	var obj = {};
	var urlArr = url.split('?');
	obj.url = urlArr[0];
	if (urlArr.length == 2) {
	  var param = urlArr[1].split('&');
	  var xinObj = {};
	  for (var i = 0; i < param.length; i++) {
		  var eleArr = param[i].split('=');
		  xinObj[eleArr[0]] = eleArr[1]
	  }
	  obj.params = xinObj;
	}
	return obj;
}
//数尾补两个0 1=>1.00 , 2.2=>2.20;
function setNum2(num){
	num += '';  
	num = num.replace(/[^0-9|\.]/g, ''); 
	if(/^0+/){num = num.replace(/^0+/, '')}  
	if(!/\./.test(num)){num += '.00'} 
	if(/^\./.test(num)){num = '0' + num}
	num += '00';        
	num = num.match(/\d+\.\d{2}/)[0];
	return num
}  
//获取几天后的时间
function getTime(lastDay){
	var currentTime = (new Date()).valueOf();
	var addTime = lastDay * (1000 * 60 * 60 * 24);
	var d =new Date(currentTime + addTime);
	var year=d.getFullYear();
	var month=change(d.getMonth()+1);
	var day=change(d.getDate());
	function change(t){
		if(t<10){
		return "0"+t;
		}else{
		return t;
		}
	}
	var time= year+'-'+month+'-'+day;
	return time
}