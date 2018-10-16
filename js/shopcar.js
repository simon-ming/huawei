$(function(){
	//shopcar-trade事件委托处理价格
	// 渲染购物车数据到页面
	// 获取localstorage
	var dataArr=JSON.parse(localStorage.getItem('shopcar'));
	function createHtml(){
		var frag=document.createDocumentFragment();
		for(var i=0;i<dataArr.length;i++){
			// 处理src
			var src=dataArr[i].src;
			src='images/428_428'+src.replace('images/40_40','')
			var aclassStr='';//处理加减的css样式
			var sclassStr='';
			var itemObj=$('<div class="shopcar-trade"></div>')[0];
			if(dataArr[i].count==10){
				aclassStr=' add-disabled';
			}else if(dataArr[i].count==1){
				sclassStr=' add-disabled';
			}
			for(var j in dataArr[i]){
				itemObj[j]=dataArr[i][j]	
			}
			var htmlStr=`
			<div class="select-all">
				<i class="sel-input current-checked">
				</i>
			</div>
			<div class="shopcar-det-area">
				<div class="det-area" dataid=${dataArr[i].goodsid}>
					<div class="small-shoppic">
						<img src="${src}" alt="" class="shopimg-thumb">
					</div>
					<div class="product-name"><a href="">${dataArr[i].name}</a></div>
					<div class="shop-price">¥ ${dataArr[i].price}</div>
					<div class="shop-count">
						<div class="add-btn clearfix">
							<input type="text" class="number" value="${dataArr[i].count}">
							<p>
								<a href="javascript:void(0);" class="num-add ${aclassStr}">+</a>
								<a href="javascript:void(0);" class="num-sub ${sclassStr}">-</a>
							</p>
						</div>
					</div>
					<div class="shop-total">¥ ${(Number(dataArr[i].price)*dataArr[i].count).toFixed(2)}</div>
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
					</div>`;
			//使用数组拼接字符串
			itemObj.innerHTML=htmlStr;
			frag.appendChild(itemObj);
		}		
		$('.trade-box').append(frag);
	}
	createHtml();
	
	//加减购物车数量,重新计算价格
	$('.shopcar-trade .det-area').on('click','.num-add,.num-sub',function(){
		// console.log($(this).parents('.det-area')[0]);
		var price=Number($(this).parents('.shopcar-trade')[0].price);
		var count=Number($(this).parents('.det-area').find('.number').val());
		$(this).parents('.det-area').find('.shop-total').html('¥ '+(price*count).toFixed(2));
		var name=$(this).parents('.shopcar-trade')[0].name;
		var id=$(this).parents('.shopcar-trade')[0].goodsid;
		operateLocalStorage(name,id,count)
		getTotal();
	})
	//重写localStorage
	function operateLocalStorage(name,id,count,op=1){//1设置数量 0删除本条数据
		for(var i=0;i<dataArr.length;i++){
			if(dataArr[i].name==name && dataArr[i].goodsid == id){
				if(op == 1){
					dataArr[i].count=count;
					localStorage.setItem('shopcar',JSON.stringify(dataArr));
					break;
				}else if(op == 0){
					dataArr.splice(i,1)//删除这个数组
					localStorage.setItem('shopcar',JSON.stringify(dataArr));
				}
			}
		}
	}
	// 删除购物车
	$('.shopcar-trade .det-area').on('click','.shop-operate a',function(){
		var name=$(this).parents('.shopcar-trade')[0].name;
		var id=$(this).parents('.shopcar-trade')[0].goodsid;
		operateLocalStorage(name,id,'no',0)//传0删除匹配的对象
		$(this).parents('.shopcar-trade').remove()//删除dom元素
		getTotal();

	})

	//处理购物车数量加减
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
		//获取总价钱
		var total=0;
		var count=0;
		$('.shopcar-trade .det-area ').each(function(){
			if($(this).parents('.shopcar-trade').find('.current-checked').length){
				var str=$(this).find('.shop-total').html().replace(/[¥\s]?/g,'')
				var countStr=Number($(this).find('.number').val());
				count+=countStr;
				total+=parseFloat(str);
			}			
		})
		$('.final-total').html(total.toFixed(2))
		$('.final-count').html(count)
		// 获取总数量
		// console.log(1)
	}
	getTotal();
	//单击选中
	$('.sel-input').on('click',function(){
		$(this).toggleClass('current-checked')
		getTotal();
	})
	//单击全选选中所有
	$('.gettotal-box .sel-input,.shopcar-operation .sel-input').on('click',function(){
		if($(this).is('.current-checked')){
			$('.sel-input').addClass('current-checked');
		}else{
			$('.sel-input').removeClass('current-checked');
		}
		getTotal();
	})
	//购物车内 判断是否选中全选按钮
	// function isSelAll(){
	$('.shopcar-trade .sel-input').on('click',function(){
		var isSel=true;
		if(!$(this).is('.current-checked')){
			$('.gettotal-box .sel-input,.shopcar-operation .sel-input').removeClass('current-checked');
		}
		//循环每个选中按钮,如果有没选中的,返回false,去除全选
		$('.shopcar-trade .sel-input').each(function(){
			if(!$(this).is('.current-checked')){
				isSel=false;
				return false//循环到有对象没有选中结束循环
			}
		})
		if(isSel){
			$('.gettotal-box .sel-input,.shopcar-operation .sel-input').addClass('current-checked');
		}else{
			$('.gettotal-box .sel-input,.shopcar-operation .sel-input').removeClass('current-checked');
		}
	})
})