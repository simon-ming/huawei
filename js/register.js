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
})
// function $(obj){
// 	return document.querySelector(obj);
// }