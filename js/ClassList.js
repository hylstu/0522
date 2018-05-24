// JavaScript Document

function ClassList(a,b){
	$(a).mousemove(function(){
		$(this).addClass("Merhover");
		$(this).find(b).slideDown("slow");
	})

	$(a).mouseleave(function(){
		$(this).removeClass("Merhover");
		$(this).find(b).stop(true,true).slideUp("slow");
	})
}