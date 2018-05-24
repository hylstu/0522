//弹窗
var WebCommon={};
WebCommon.popup={};
WebCommon.popup.show=function(DomId){
	$("#fade").css({
					display:"block",height:$(document).height()
				});
	$("#"+DomId).css({
					left:($("body").width()-$("#"+DomId).width())/2-10+"px",
					top:($(window).height()-$("#"+DomId).height())/2-10+"px",
					display:"block"
				});
		$("#"+DomId+" .ClosesBtn").click(function(){
				$("#"+DomId).css("display","none");
				$("#fade").css("display","none");
			});
	};
WebCommon.popup.hide=function(DomId)
{
	$("#"+DomId).css("display","none");
	$("#fade").css("display","none");
	};

