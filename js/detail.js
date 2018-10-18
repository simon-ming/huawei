$(function(){
	var display=(function(){
		var i=0;
		return {
			init:function(){
				this.event();
			},
			event:function(){
				$('.nav-tab li').hover(function(){//导航下拉效果
					$(".show-box").stop(true);
					i=$(this).index();
					$(".show-box").slideDown()
					$(".product-list").eq(i).show().siblings().hide();
				},function(){
					$(".show-box").stop(true);
					i=$(this).index();
					$(".show-box").slideUp()
					$(".product-list").eq(i).show().siblings().hide();
				});
				$('.bigslider').hover(function(e){//放大镜
					$('.zoom').show();
					$('.big-zoom').show();
					$('.zoom').css('cursor','move')
					e=e ||window.event;
					// var _x=e.offsetX;
					// var _y=e.offsetY;
					var bx=$(this).offset().left;
					var by=$(this).offset().top;
					var _x=$(".zoom").width()/2;
					var _y=$(".zoom").height()/2;
					var maxX=$(this).width()-$(".zoom").width()-2;
					var maxY=$(this).height()-$(".zoom").height()-2;
					$(document).mousemove(function(e){
						var x=e.pageX-bx-_x;
						var y=e.pageY-by-_y;
						if(x<0){
							x=0;
						}else if(x>maxX){
							x=maxX;
						}
						if(y<0){
							y=0;
						}else if(y>maxY){
							y=maxY;
						}
						$('.zoom').css('left',x+'px')
						$('.zoom').css('top',y+'px')
						$('.big-zoom').css('backgroundPosition',-8/9*2*x+'px '+(-8/9*2*y+'px'))
					})
				},function(){
					$('.zoom').hide();
					$('.big-zoom').hide();

				});

				$(".thumbs .swiper-slide,.next,.prev").click(function() {
					$('.big-zoom').css('backgroundImage',"url("+$('.swiper-slide-active img').attr('src')+")")
			    });
			   	$('.num-add').click(function(e,max=5){//处理购物车数量添加
			   		if($('.number').val()>=max){
			   			$('.number').val(max)
			   			console.log($('.number').val())
			   		}else{
			   			$('.number').val(Number($('.number').val())+1);
			   		}
			   	})
			   	$('.num-sub').click(function(e,min=1){
			   		if($('.number').val()<=min){
			   			$('.number').val(min)
			   			$(this).addClass('add-disabled');
			   		}else{
			   			$('.number').val(Number($('.number').val())-1);
			   		}
			   	})
			   	$('.num-add,.num-sub').click(function(e,max=5,min=1){
			   		$('.num-add,.num-sub').removeClass('add-disabled');
			   		if($('.number').val()<=min){
			   			$('.num-sub').addClass('add-disabled');
			   		}else if($('.number').val()>=max){
			   			$('.num-add').addClass('add-disabled');
			   		}
			   	})
			   	//点击套餐,颜色,版本, 修改整体属性
			   	$('.sel-color li,.sel-version li,.sel-can li,.sel-server li').on('click',function(){
			   		$(this).addClass('sel-current').siblings().removeClass('sel-current')
			   		$('.attr-main').html($('.sel-color .sel-current span').html()+' / '+$('.sel-version .sel-current span').html()+' / '+$('.sel-can .sel-current span').html()+' / '+$('.sel-server .sel-current span').html())
			   		$('.h-version').html($('.sel-version .sel-current span').html())//修改版本
			   		$('.h-color').html($('.sel-color .sel-current span').html())//修改颜色
			   		$('.h-combo').html($('.sel-can .sel-current span').html())//修改套餐
			   	})
				//保险下拉菜单处理
			   	$('.ser-list a').click(function(){
			   		var h=$(this).html();
			   		$(this).parent().parent().parent().find('span').html(h);
			   	})
			   	//关闭按钮
			   	$('.seetoo,.add-win-close').click(function(){
			   		$('.add-cover').hide();
			   	})
			   	//加入购物车,创建localstorage
			   	$('.toshopcar').click(function(){
			   		addLocalStorage()
			   		$('.add-cover').show();
			   	})
		   		
			   	function addLocalStorage(){

			   		//1.提取标题
				   	var name=$('.detail-text h1').html().replace(/<[^>]+>/ig,'')
				   	$('.add-name-text').html(name);//赋值弹出框成功内容
				   	//2.提取id
				   	var id=$('.current-id').attr('value')
				   	//3.提取价格
				   	var price=$('.product-price').html().replace(/[^\d.]/g,'')
				   	//4.提取数量
				   	var count=$('.number').val();
				   	//5.获取图片
				   	var src=$('.sel-color .sel-current img').attr('src');
				   	var obj={
				   		name:name,
				   		goodsid:id,
				   		price:price,
				   		count:count,
				   		src:src
				   	}
				   	//判断是否存在localStorage 是否对象重复
				   	var jsonStr='['+JSON.stringify(obj)+']';
				   	var curStorage=localStorage.getItem('shopcar');
				   	var shopcarArr=JSON.parse(curStorage);
				   	if(shopcarArr!=null && shopcarArr.length>0){
				   		//循环所有数组里的对象,如果没有商品重复则创建新的对象
				   		var noRepeat=true;
				   		for(var i=0;i<shopcarArr.length;i++){
				   			//id和套餐相同则加数量
				   			if(shopcarArr[i].goodsid === obj.goodsid && shopcarArr[i].name===obj.name){
				   				// 发现重复添加数量
				   				shopcarArr[i].count=Number(shopcarArr[i].count)+Number(obj.count);
			   					localStorage.setItem('shopcar',JSON.stringify(shopcarArr))
				   				noRepeat=false;//发现重复则,设置false,不执行添加对象
				   				break;
				   			}
				   		}
				   		if(noRepeat){//没有重复则添加对象
			   				shopcarArr.push(obj);
			   				console.log(obj)
		   					localStorage.setItem('shopcar',JSON.stringify(shopcarArr))
				   		}
				   	}else{
				   		//不存在localStorage,创建
			   			localStorage.setItem('shopcar',jsonStr)
				   	}
				   	

				   	// console.log(curStorage);

				   	// console.log(name+','+id+','+price+','+count+','+src);
			   	}
			   	
			}
			
		}
		
	}())
	display.init();
})