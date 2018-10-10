$(function(){
	var qr_time=null;
	function qrTimeout(){
		clearTimeout(qr_time);
		qr_time=setTimeout(function(){
			$(".qr-timeout").show();
		},40000)//40秒后二维码失效
	}
	//时间处理程序
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
	var reg=(function(){
		
	}())
})