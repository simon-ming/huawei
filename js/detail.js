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
					var maxX=$(this).width()-$(".zoom").width();
					var maxY=$(this).height()-$(".zoom").height();
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
						$('.big-zoom').css('backgroundPosition',-2*x+'px '+(-2*y+'px'))
					})
				},function(){
					$('.zoom').hide();
					$('.big-zoom').hide();

				});

				$(".thumbs .swiper-slide,.next,.prev").click(function() {
					$('.big-zoom').css('backgroundImage',"url("+$('.swiper-slide-active img').attr('src')+")")
			    })

			}
			
		}
		
	}())
	display.init();
})