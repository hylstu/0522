
//商户推荐里面的
$(function(){	
		// 导航左侧栏js效果 start
		$(".Mer_li li").hover(function(){
			$(".Mer_Rcons").fadeIn();
			var indexf=$(this).index(".Mer_li li");
			$(this).addClass("Merhover").siblings().removeClass("Merhover");
			$($(".Mer_Rcons_lis")[indexf]).stop(true,true).fadeIn().siblings().fadeOut();
		},function(){
			
		})
		$(".Mer_bigClas").mouseleave(function(){
											  
			$(".Mer_Rcons").fadeOut();
			$(".Mer_Rcons_lis").fadeOut();
			$(".Mer_li li").removeClass("menulihover");

		})
		// 导航左侧栏js效果  end
		
	})




function ClassList(a,b){
	$(a).mousemove(function(){
		$(this).addClass("Merhover");
		$(this).find(b).show();
	})

	$(a).mouseleave(function(){
		$(this).removeClass("Merhover");
		$(this).find(b).stop(true,true).hide();
	})
}







	//新闻列表里面的商品分类
		
	$(function(){
			   var NewAlls=$(".News_lefts h1");
				NewAlls.mousemove(function(){
					$(".News_leftLists").css("display","block");
					
					$(".newClassList li").mousemove(function(){
						$(this).addClass("Merhover");
						$(this).find(".newClassCinLists").slideDown("slow");
					})
					$(".newClassList li").mouseleave(function(){
						$(this).removeClass("Merhover");
						$(this).find(".newClassCinLists").stop(true,true).slideUp("slow");
					})
			
				})
		
				$(".News_lefts").mouseleave(function(){
					 $(".News_leftLists").css("display","none");
				 })
			
		
	})

