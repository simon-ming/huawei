$(function(){
	$('.num-add').click(function(e,max=5){//处理购物车数量添加
		var num=$(this).parent().parent().find('.number');
		if(num.val()>=max){
			num.val(max)
			console.log(num.val())
		}else{
			num.val(Number(num.val())+1);
		}
	})
	$('.num-sub').click(function(e,min=1){
		var num=$(this).parent().parent().find('.number');

		if(num.val()<=min){
			num.val(min)
			$(this).addClass('add-disabled');
		}else{
			num.val(Number(num.val())-1);
		}
	})
	$('.num-add,.num-sub').click(function(e,max=5,min=1){
		var num=$(this).parent().parent().find('.number');
		var fa=$(this).parent().parent();
		$(this).removeClass('add-disabled').siblings().removeClass('add-disabled');
		if(num.val()<=min){
			fa.find('.num-sub').addClass('add-disabled');
		}else if(num.val()>=max){
			fa.find('.num-add').addClass('add-disabled');
		}
	})

	//处理删除
	

})