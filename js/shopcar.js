$(function(){
	//shopcar-trade事件委托处理价格
	// 渲染购物车数据到页面
	function createHtml(){
		var dataArr=JSON.parse(localStorage.getItem('shopcar'));
		var frag=document.createDocumentFragment();
		for(var i=0;i<dataArr.length;i++){
			// 处理src
			dataArr[i].src='images/428_428'+dataArr[i].src.replace('images/40_40','')
			var classStr='';
			if(dataArr[i].count>=10){
				classstr=' add-disabled';
			}else if(dataArr[i].count<=1){
				classstr=' add-disabled';
			}
			var itemObj=$('<div class="shopcar-trade"></div>')[0];
			for(var j in dataArr[i]){
				itemObj[j]=dataArr[i][j]	
			}
			var htmlStr=`<div class="shopcar-trade">
			<div class="select-all">
				<i class="sel-input current-checked">
				</i>
			</div>
			<div class="shopcar-det-area">
				<div class="det-area">
					<div class="small-shoppic">
						<img src="${dataArr[i].src}" alt="" class="shopimg-thumb">
					</div>
					<div class="product-name"><a href="">${dataArr[i].name}</a></div>
					<div class="shop-price">¥ ${dataArr[i].price}</div>
					<div class="shop-count">
						<div class="add-btn clearfix">
							<input type="text" class="number" value="${dataArr[i].count}">
							<p>
								<a href="javascript:void(0);" class="num-add">+</a>
								<a href="javascript:void(0);" class="num-sub${classStr}">-</a>
							</p>
						</div>
					</div>
					<div class="shop-total">¥ ${Number(dataArr[i].price)*dataArr[i].count}</div>
					<div class="shop-operate"><a href="javascript:;">删除</a></div>
				</div>
				<div class="det-extra">
					<div class="small-shoppic">配</div>
					<div class="product-name">
						<a href="" class='extra-img'><img src="images/428_428_1475917596008mp.jpg"  alt=""></a>
								荣耀 AM115 半入耳式耳机 （白色） AM115 荣耀版
							</div>
							<div class="shop-price"> </div>
							<div class="shop-count">x 1</div>
							<div class="shop-total"></div>
							<div class="shop-operate"><a href="javascript:;"></a></div>
						</div>
					</div>
			</div>`;
			//使用数组拼接字符串
			itemObj.innerHTML=htmlStr;
			frag.appendChild(itemObj);
		}		
		$('.trade-box').append(frag);
		// $('.trade-box').append(strArr.join(''));
	}
	createHtml();
	//1.处理单个商品选中
	$('.shopcar-trade').on('click','.sel-input',function(){

	})

	//处理购物车数量添加
	$('.num-add').click(function(e,max=10){
		$(this).siblings().removeClass('add-disabled');
		var num=$(this).parent().prev();
		num.val(Number(num.val())+1);
		if(num.val()>=max){
			num.val(max)
			$(this).addClass('add-disabled');
		}
	})
	$('.num-sub').click(function(e,min=1){
		$(this).siblings().removeClass('add-disabled');
		var num=$(this).parent().prev();
		num.val(Number(num.val())-1);
		if(num.val()<=min){
			num.val(min)
			$(this).addClass('add-disabled');
		}
	})
	//过滤除整数外的所有字符
	$('.number').on('input',function(){
		var str=$(this).val();
		$(this).val($(this).val().replace(/[^\d]*/g,''));
		if(str==''){
			$(this).val(1);
		}else if(Number(str)>10){
			$(this).val(10);
		}
	})

	//结算数目
	function getTotal(){
		$('.shopcar-trade').each(function(){
			$(this).find('')
		})
	}
})