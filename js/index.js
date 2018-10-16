$(function(){
	
	var qr_time=null;
	function qrTimeout(){
		clearTimeout(qr_time);
		qr_time=setTimeout(function(){
			$(".qr-timeout").show();
		},40000)//40秒后二维码失效
	}
	//从cookie获取用户名
	function setUsername(){
		if($.cookie('username')){
			$('.showuser').html('<a href="#" class="left-smallnav-first login-btn">'+$.cookie('username')+'</a>');
		}
	}
	setUsername();
	//获取购物车信息
	function setShopcar(){
		var dataArr=JSON.parse(localStorage.getItem('shopcar'));
		var a=0;
		if(dataArr!='null' && dataArr.toString()!=''){//没有商品对象
			for(var i=0;i<dataArr.length;i++){
				console.log(dataArr[i].count)
				a+=Number(dataArr[i].count);
			}	
		}
		$('.shopcar-count').html(a);
	}
	setShopcar();
	//事件处理程序
	$(".qrimg").mouseenter(function(){
		$(this).animate({left:'20px'});
		$(".qr-help").animate({opacity:'1'})
	});
	$(".qr-img-det").mouseleave(function(){
		$(".qrimg").animate({left:'109px'});
		$(".qr-help").animate({opacity:'0'})
	});
	$(".account").click(function(){
		$(".qr-login").removeClass('mode-sel')
		$(this).addClass('mode-sel')
		$('.useacount').show();
		$('.useqr').hide();
	})
	$(".qr-login").click(function(){
		qrTimeout();
		$(".account").removeClass('mode-sel')
		$(this).addClass('mode-sel')
		$('.useqr').show();
		$('.useacount').hide();
	})	
	$(".close").click(function(){
		$(".login-window").hide();
	});
	$(".login-btn").click(function(){
		$(".login-window").show();
	});
	$(".header-ad-close").click(function(){
		$(".header-ad").slideUp();
	})
	$('.selected').click(function(){
		if(!$(this).attr('issel')){
			$(this).attr('issel',true)
			$(this).css('background-image','url(images/tick-on.png)')
		}else{
			$(this).attr('issel','')
			$(this).css('background-image','url(images/tick-off.png)')
		}
	})
	$('.search-text').focus(function(){
		$(".tips").hide();
	})
	$('.search-text').blur(function(){
		$(".tips").show();
	})
	$(".msg-phone").click(function(){
		$(".usual-way").hide();
		$(".phone-verify").show();
	})
	$(".back").click(function(){
		$(".usual-way").show();
		$(".phone-verify").hide();
	})
	//处理登录二维码
	
	$(".refush,.qr-login").click(function(){
		$(".qr-timeout").hide();
		$(".qr-det img").attr({'src':'https://hwid1.vmall.com/DimensionalCode/getqrWeb?appID=com.huawei.hwidweb&loginChannel=7000700&reqClientType=700&confirmFlag=1&version=13200&_t='+Date.now()})
		qrTimeout();
	})
	// 拖拽函数
	var drag=(function(){
		var $move=document.querySelector('.login-move');
		var $login=document.querySelector('.login');
		return {
			init(){
				this.event();
			},
			event(){
				$move.onmousedown=function(e){
					e= e || window.event;
					var l=e.offsetX;
					var t=e.offsetY;
					var maxX=window.innerWidth-$login.offsetWidth/2-17;
					var maxY=window.innerHeight-$login.offsetHeight/2;
					document.onmousemove=function(e){
						if(e.stopPropagation){
							e.stopPropagation();
						}else{
							e.cancelBubble=true;
						}
            			e.preventDefault()
						var x=e.pageX-l+$login.offsetWidth/2;//
						var y=e.pageY-t+$login.offsetHeight/2;//
						console.log(x)
						if(x<$login.offsetWidth/2){
							x=$login.offsetWidth/2
						}else if(x>maxX){
							x=maxX
						}
						if(y<$login.offsetHeight/2){
							y=$login.offsetHeight/2
						}else if(y>maxY){
							// y=maxY
						}
						$login.style.left=x+'px';
						$login.style.top=y+'px';
					}
				}
				document.onmouseup=function(){
					document.onmousemove=false;
				}
			}
		}
	}())
	drag.init();
	//正则验证
	function _get(ele,all){
		if(!all){
			return document.querySelector(ele);
		}else{
			return document.querySelectorAll(ele);
		}
	}
	var login=(function(){
		var $submit=_get('.indexlogin');
		var $username=_get('.user');
		var $password=_get('.pwd');

		return {
			init:function(){
				this.check={
					password:function(val){
						var reg=/^\w{6,18}$/;
						return reg.test(val)?1:0;
					},
					phone:function(val){
						var reg=/^1[23456789]\d{9}$/;
						return reg.test(val)?1:0;
					},
					repassword:function(val){
						var ele=document.querySelector('.repassword');
						return ele.value==val?1:0;
					},
					username:function(val){
						var reg=/^\w{4,50}$/;
						return reg.test(val)?1:0;
					},
					email:function(val){
						var reg=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
						return reg.test(val)?1:0;
					},
					isNull:function(val){
						return val==''?1:0;
					}
				};
				this.event();
			},
			event:function(){
				var _this=this;
				$submit.onclick=function(){
					for(var i=0;i<_get('.error',true).length;i++){
						_get('.error',true)[i].style.display="none";
					}
						$username.style.borderColor='#ccc';
						$password.style.borderColor='#ccc';
					var valu=$username.value.trim();
					var valp=$password.value.trim();
					if(_this.check.isNull(valu)==1){
						_get('.u-null').style.display="block";
						$username.style.borderColor='rgba(255,51,32,0.5)';
					}else if(_this.check.username(valu)!==1){
						_get('.account-error').style.display="block";
						$username.style.borderColor='rgba(255,51,32,0.5)';

					}else if(_this.check.isNull(valp)==1){
						_get('.p-null').style.display="block";
						$password.style.borderColor='rgba(255,51,32,0.5)';
					}else{
						// debugger
						_this.sendAjax();

					console.log(1);

					}
				}
			},
			sendAjax:function(){
				var _this=this; 
				$.ajax({
					url:'php/login.php',
					type:'post',
					contentType:'application/json',
					data:JSON.stringify({
						username:$username.value,
						password:$password.value
					}),
					success:function(data){
						console.log(data)
						_this.loginSuccess(data)
					}
				})
			},
			loginSuccess:function(data){
				if(data.code==200){
					document.cookie="user-id="+data.data.id;
					document.cookie="username="+data.data.username;
					document.cookie="token="+data.data.token;
					localStorage.avatar=data.data.avatar;
					$(".login-window").hide();
					setUsername();
				}else if(data.code==1000){
					_get('.login_fail').style.display="block";
				}
			}
		}
	}())
	login.init();
})