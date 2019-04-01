$().ready(function(){
	(function($){
	  $.isBlank = function(obj){
	    return(!obj || $.trim(obj) === "");
	  };
	})($);
	$(".u-contactUs.connect").click(function(e){
		e.preventDefault();
		// var openAdd = $(".u-openAdd b").eq(0);
		// var arrows = $(".u-arrows");
		var address = $(".g-companyAdd");
		// var close = openAdd.text();
		address.slideToggle();
		$("body,html").animate({
			scrollTop : $(document).height()
		},{duration: 500,easing:"linear"});
	});
	$(".g-navItem>li").hover(function(){
		if($(this).find(".g-detailNav.aidai").is(":animated"))return;
		$(this).find(".g-detailNav.aidai").fadeIn();
	},function(){
		$(this).find(".g-detailNav.aidai").fadeOut();
	});
	//以下为关于顶部的效果
 	var topSlidedown = function(){//顶部header下移效果
		$('.g-header').stop(true,false).addClass('animateFixed')
						  .animate({'top':'0px'},500);
	},
	topSlideup = function(){
		$('.g-header').stop(true,false).removeClass('animateFixed')
						  .animate({'top':'-100px'},500);
	};
 	//判断鼠标滚动方向的函数
 	(function scrollDrection(){
 		var beforeScroll = 0;
 		$(window).scroll(function(){
 			var afterScroll = $(this).scrollTop();
 				delta = afterScroll - beforeScroll;
 			if(delta===0){
 				return false;
 			}else if(delta>0){//向下
 				if($(window).scrollTop()>230){//当滚动高度超过230，触发事件
 					topSlidedown();
 				}
 			}else{//向上
 				if($(window).scrollTop()<88){//当滚动高度小于230，恢复原状
 					topSlideup();
 				}
 			}
 			beforeScroll = afterScroll;
 		});
 	})();
 	$(".u-navSearchBtn").hover(function(e){
 		if($(".g-hotSearch").is(":animated")){
 			return;
 		}
 		e.stopPropagation();
 		$(".u-searchContent").focus();
 		$(".g-hotSearch").fadeIn();
 	},function(e){
 		e.stopPropagation();
 		$(".g-hotSearch").fadeOut();
 	})
 	$(".u-searchContent,.u-footerSearchBtn").keydown(function(e){
		var value = $(this).val();
		if(value == ""|| undefined == value || $.isBlank(value)){
			return;
		}
		if(e.keyCode == 13){
			location.href = "/webrexco/search.htm?keywords="+encodeURIComponent(value);
		}
	});
	$(".u-searchIcon").click(function(){
		var value = $(".u-searchContent").val();
		if(value == ""|| undefined == value|| $.isBlank(value)){
			return;
		}
		location.href = "/webrexco/search.htm?keywords="+encodeURIComponent(value);
	});
	$(".u-searchIcon,.u-footerSearchCon").click(function(){
		var value = $(".u-footerSearchBtn").val();
		if(value == ""|| undefined == value|| $.isBlank(value)){
			return;
		}
		location.href = "/webrexco/search.htm?keywords="+encodeURIComponent(value);
	});
	(function(){
		var $hotSearchList;
		var cookieList = JSON.parse(cookieMgr.get("cookie_navAndSearch"));
		if(cookieList){
			$(".g-hotSearch").append(baseView.render("#tpl_hotSearchList",cookieList.yesTodayHotArticle));
			$(".g-detailNav.ajax").append(baseView.render("#tpl_topSite",cookieList.sites));
			var maxNavWidth = 0;
			$(".u-detailNav").each(function(){
				if(maxNavWidth<$(this).text().length){
					maxNavWidth = $(this).text().length;
				}
			})
			$(".u-detailNav").css("width",maxNavWidth*14);
			var height = $('.g-detailNav.ajax').height();
			$('.g-detailNav.ajax').css("bottom",-height+27);
			$(".g-navItem>li").hover(function(){
				if(cookieList.sites.length==0)return;
				if($(this).find(".g-detailNav.ajax").is(":animated"))return;
				$(this).find(".g-detailNav.ajax").fadeIn();
			},function(){
				if(cookieList.sites.length==0)return;
				$(this).find(".g-detailNav.ajax").fadeOut();
			});
			return;
		}
		baseModel.get({
			url : "/webrexco/news/data/navAndHotSearch.cgi",
			success : function(rslt){
				if(rslt.code!=0){
					return;
				}
				$hotSearchList = JSON.stringify(rslt.result);
				cookieMgr.add("cookie_navAndSearch",$hotSearchList,null,300);
				$(".g-hotSearch").append(baseView.render("#tpl_hotSearchList",rslt.result.yesTodayHotArticle));
				$(".g-detailNav.ajax").append(baseView.render("#tpl_topSite",rslt.result.sites));
				var maxNavWidth = 0;
				$(".u-detailNav").each(function(){
					if(maxNavWidth<$(this).text().length){
						maxNavWidth = $(this).text().length;
					}
				})
				$(".u-detailNav").css("width",maxNavWidth*14);
				var height = $('.g-detailNav.ajax').height();
				$('.g-detailNav.ajax').css("bottom",-height+27);
				$(".g-navItem>li").hover(function(){
					if(rslt.result.sites.length==0)return;
					if($(this).find(".g-detailNav.ajax").is(":animated"))return;
					$(this).find(".g-detailNav.ajax").fadeIn();
				},function(){
					if(rslt.result.sites.length==0)return;
					$(this).find(".g-detailNav.ajax").fadeOut();
				});
			}
		})
	})();
	var headerCodeMap = window.headerMap&&window.headerMap.headerCodeMap||{
        "0":0
    };
    var headerEle=$(".g-navItem>li").eq(headerCodeMap[0]);
    headerEle.addClass("active");
});