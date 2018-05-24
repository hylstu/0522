jQuery(function($){
	//创建DOM
	var 
	quickHTML = document.querySelector("div.quick_link_mian"),
	quickShell = $(document.createElement('div')).html(quickHTML).addClass('quick_links_wrap'),
	quickLinks = quickShell.find('.quick_links');
	quickPanel = quickLinks.next();
	quickShell.appendTo('.mui-mbar-tabs');
	
	//具体数据操作 
	var 
	quickPopXHR,
	loadingTmpl = '<div class="loading" style="padding:30px 80px"><i></i><span>Loading...</span></div>',
	popTmpl = '<a href="" class="ibar_closebtn" title="查看更多">查看更多</a><div class="ibar_plugin_title"><h3><input type="checkbox" class="all_checks"/>全选</h3></div><div class="pop_panel"><%=content%></div><div class="arrow"><i></i></div><div class="fix_bg"></div>',
	historyListTmpl = '',
	newMsgTmpl = '',
	quickPop = quickShell.find('#quick_links_pop'),
	quickDataFns = {
		//购物信息
		message_list: {
			title: '购物车',
			content: '<div class="ibar_plugin_content"><div class="ibar_cart_group ibar_cart_product"><div class="cart_lists greay_pros"><h3><span class="chLtit"><input type="checkbox" class="all_checks"/>产品名称标题信息</span><span class="chRclos"><a href=""><s></s></a></span></h3><p><span class="cart_l_img"><a href=""><img src="../../html/Demo4/images/sm_p.jpg"/></a></span><span class="cart_l_nums">1</span><span class="cart_r_price">349</span></p><p class="dous"></p></div><div class="cart_lists greay_pros"><h3><input type="checkbox" class="all_checks"/>产品名称标题信息</h3><p><span class="cart_l_img"><a href=""><img src="../../html/Demo4/images/sm_p.jpg"/></a></span><span class="cart_l_nums">1</span><span class="cart_r_price">349</span></p><p class="dous"></p></div><div class="cart_lists greay_pros"><h3><input type="checkbox" class="all_checks"/>产品名称标题信息</h3><p><span class="cart_l_img"><a href=""><img src="../../html/Demo4/images/sm_p.jpg"/></a></span><span class="cart_l_nums">1</span><span class="cart_r_price">349</span></p><p class="dous"></p></div><div class="cart_lists greay_pros"><h3><input type="checkbox" class="all_checks"/>产品名称标题信息</h3><p><span class="cart_l_img"><a href=""><img src="../../html/Demo4/images/sm_p.jpg"/></a></span><span class="cart_l_nums">1</span><span class="cart_r_price">349</span></p><p class="dous"></p></div><div class="cart_lists"><h3><input type="checkbox" class="all_checks"/>产品名称标题信息</h3><p><span class="cart_l_img"><a href=""><img src="../../html/Demo4/images/sm_p.jpg"/></a></span><span class="cart_l_nums">1</span><span class="cart_r_price">349</span></p><p class="dous"></p></div><div class="cart_lists"><h3><input type="checkbox" class="all_checks"/>产品名称标题信息</h3><p><span class="cart_l_img"><a href=""><img src="../../html/Demo4/images/sm_p.jpg"/></a></span><span class="cart_l_nums">1</span><span class="cart_r_price">349</span></p><p class="dous"></p></div><div class="cart_lists"><h3><input type="checkbox" class="all_checks"/>产品名称标题信息</h3><p><span class="cart_l_img"><a href=""><img src="../../html/Demo4/images/sm_p.jpg"/></a></span><span class="cart_l_nums">1</span><span class="cart_r_price">349</span></p><p class="dous"></p></div></div><div class="cart_handler"><div class="cart_handler_header"><span class="cart_handler_left">转换豆商品<span class="cart_price">15</span>件</span><span class="cart_handler_right">￥589.00</span><br /><span class="cart_handler_left">金豆商品<span class="cart_price">15</span>件</span><span class="cart_handler_right">￥589.00</span></div><a href="#" class="cart_go_btn cart_greys" target="_blank">结算<i>&nbsp;</i></a></div></div>',
			init:$.noop
		},
		
		//我的资产
		history_list: {
			title: '',
			content: '',
			init: $.noop
		},
		//给客服留言
		leave_message: {
			title: '',
			content: $("#ibar_gzcp").html(),
			init:$.noop
		},
		mpbtn_histroy:{
			title: '',
			content:'',
			init: $.noop
		},
		mpbtn_wdsc:{
			title: '',
			content: '',
			init: $.noop
		},
		mpbtn_recharge:{
			title: '',
			content: '',
			init: $.noop
		}
	};
	
	//showQuickPop
	var 
	prevPopType,
	prevTrigger,
	doc = $(document),
	popDisplayed = false,
	hideQuickPop = function(){
		if(prevTrigger){
			prevTrigger.removeClass('current');
		}
		popDisplayed = false;
		prevPopType = '';
		//quickPop.hide(); //后改,如果放开这一句,收起来只有黑边有效果,内容没有效果 cheng
		quickPop.animate({right:-560,queue:true},1000);
		
		//根着POP走,POP隐藏,我也隐藏 cheng
		$(".mui-mbar-tabs").animate({right:0,queue:true});
		$(".quick_links_wrap").animate({right:0,queue:true});
	},
	showQuickPop = function(type){
		if(quickPopXHR && quickPopXHR.abort){
			quickPopXHR.abort();
		}
		if(type !== prevPopType){
			var fn = quickDataFns[type];
			quickPop.html(ds.tmpl(popTmpl, fn));
			fn.init.call(this, fn);
		}
		doc.unbind('click.quick_links').one('click.quick_links', hideQuickPop);

		quickPop[0].className = 'quick_links_pop quick_' + type;
		popDisplayed = true;
		prevPopType = type;
		quickPop.show();
		quickPop.animate({right:-280,queue:true},100);
		
		//根着POP走,POP显示,我也显示 cheng
		$(".mui-mbar-tabs").animate({right:300,queue:true});
		$(".quick_links_wrap").animate({right:280,queue:true});
	};
	quickShell.bind('click.quick_links', function(e){
		e.stopPropagation();
	});
	/*quickPop.delegate('a.ibar_closebtn','click',function(){
		quickPop.hide();
		quickPop.animate({left:280,queue:true});
		if(prevTrigger){
			prevTrigger.removeClass('current');
		}
	});*/

	//通用事件处理
	var 
	view = $(window),
	quickLinkCollapsed = !!ds.getCookie('ql_collapse'),
	getHandlerType = function(className){
		return className.replace(/current/g, '').replace(/\s+/, '');
	},
	showPopFn = function(){
		var type = getHandlerType(this.className);
		if(popDisplayed && type === prevPopType){
			return hideQuickPop();
		}
		showQuickPop(this.className);
		if(prevTrigger){
			prevTrigger.removeClass('current');
		}
		prevTrigger = $(this).addClass('current');
	},
	quickHandlers = {
		//购物车，最近浏览，商品咨询
		my_qlinks: showPopFn,
		message_list: showPopFn,
		history_list: showPopFn,
		leave_message: showPopFn,
		mpbtn_histroy:showPopFn,
		mpbtn_recharge:showPopFn,
		mpbtn_wdsc:showPopFn,
		//返回顶部
		return_top: function(){
			ds.scrollTo(0, 0);
			hideReturnTop();
		}
	};
	quickShell.delegate('a', 'click', function(e){
		var type = getHandlerType(this.className);
		if(type && quickHandlers[type]){
			quickHandlers[type].call(this);
			e.preventDefault();
		}
	});
	
	//Return top
	var scrollTimer, resizeTimer, minWidth = 1350;

	function resizeHandler(){
		clearTimeout(scrollTimer);
		scrollTimer = setTimeout(checkScroll, 160);
	}
	
	function checkResize(){
		quickShell[view.width() > 1340 ? 'removeClass' : 'addClass']('quick_links_dockright');
	}
	function scrollHandler(){
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(checkResize, 160);
	}
	function checkScroll(){
		view.scrollTop()>100 ? showReturnTop() : hideReturnTop();
	}
	function showReturnTop(){
		quickPanel.addClass('quick_links_allow_gotop');
	}
	function hideReturnTop(){
		quickPanel.removeClass('quick_links_allow_gotop');
	}
	view.bind('scroll.go_top', resizeHandler).bind('resize.quick_links', scrollHandler);
	quickLinkCollapsed && quickShell.addClass('quick_links_min');
	resizeHandler();
	scrollHandler();
});