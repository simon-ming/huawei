$(function(){
	$(".selp").click(function(){
		$('.sele').removeClass('selon');
		$('.sele').addClass('seloff');
		$('.byphone').show().siblings().hide();
		$(this).addClass('selon');
	});
	$(".sele").click(function(){
		$('.selp').removeClass('selon');
		$('.selp').addClass('seloff');
		$('.byemail').show().siblings().hide();
		$(this).addClass('selon');
	});
	$(".authpic").click(function(){
		$(this).attr({'src':'https://hwid1.vmall.com/Captcha/authCodeImage?session_code_key=p_reg_login_websso_session_ramdom_code_key&_t'+Date.now()})
		console.log($(this))
	})
	//正则验证
	function _get(ele,all){
		if(!all){
			return document.querySelector(ele);
		}else{
			return document.querySelectorAll(ele);
		}
	}
	var regAuth=(function(){
		var $submit=_get('.toregister');
		var $username=_get('.phone-number');
		var $password=_get('.pwd');
		var $repassword=_get('.repwd');
		return {
			init:function(){
				this.check={
					password:function(val){
						var reg=/^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[])+$)([^(0-9a-zA-Z)]|[]|[a-zA-Z]|[0-9]){8,}$/;
						return reg.test(val)?1:0;
					},
					phone:function(val){
						var reg=/^1[23456789]\d{9}$/;
						return reg.test(val)?1:0;
					},
					repassword:function(val){
						var ele=document.querySelector('.pwd');
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
					var old='#ccc';
					var newcolor='rgba(255,51,32,0.5)';
					_get('.phone-bor').style.borderColor=old;
					_get('.errpwd').style.borderColor=old;
					_get('.errrpwd').style.borderColor=old;

					var valu=$username.value.trim();
					var valp=$password.value.trim();
					var valr=$repassword.value.trim();
					// debugger
					if(_this.check.isNull(valu)==1){//验证手机号
						_get('.u-null').style.display="block";
						_get('.phone-bor').style.borderColor=newcolor;
					}else if(_this.check.phone(valu)!==1){
						_get('.u-false').style.display="block";
						_get('.phone-bor').style.borderColor=newcolor;//验证密码
					}else if(_this.check.isNull(valp)==1){
						console.log(0);
						_get('.pwd-null').style.display="block";
						_get('.errpwd').style.borderColor=newcolor;
					}else if(_this.check.password(valp)!==1){
						_get('.pwd-false').style.display="block";
						_get('.errpwd').style.borderColor=newcolor;
					}else if(_this.check.isNull(valr)==1){//验证确认密码
						_get('.repwd-null').style.display="block";
						_get('.errrpwd').style.borderColor=newcolor;
					}else if(_this.check.repassword(valr)!==1){
						_get('.repwd-false').style.display="block";
						_get('.errrpwd').style.borderColor=newcolor;
					}else{
						_this.sendAjax()
					}

				}
			},
			sendAjax:function(){
				var _this=this;
				$.ajax({
					url:'php/register.php',
					type:'post',
					contentType:'application/json',
					data:JSON.stringify({
						username:$username.value,
						password:$password.value
					}),
					success:function(data){
						console.log(data)
						_this.registerSuccess(data)
					}
				})
			},
			registerSuccess:function(data){
				if(data.code==200){
					document.cookie="user-id="+data.data.id;
					document.cookie="user-id="+data.data.username;
					document.cookie="token=="+data.data.token;
					localStorage.avatar=data.data.avatar;
					location.href='index.html'
				}else if(data.code==400){
					_get('.registered').style.display="block";
					_get('.phone-bor').style.borderColor='rgba(255,51,32,0.5)';
				}
			}
		}
	}())
	regAuth.init();
})