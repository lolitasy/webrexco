(function(){
	var index = 0;
	var pagesize = 10;
	$().ready(function(){
		getQueryStr();
		getBannerPicAndHotTags();
		getNavAndHotSearch();
		$(".u-toBodyTop").click(function(){
			$("body,html").animate({
				scrollTop : 0
			},{duration: 500,easing:"linear"});
		});
		$(".u-newNavItem.activity").click(function(e){
			e.preventDefault();
			loadActivity();
		});
		$(".u-newNavItem.all").click(function(e){
			e.preventDefault();
			index = 0;
			$(this).addClass("active").siblings().removeClass("active");
			$(".u-cli ckToLoad").off("click");
			init(null,!null);
		})
		$('.u-clickToBlowUp').click(function(e){
			e.preventDefault();
			$(".g-to").addClass("f-tc");
			$(".u-erweima").css("float","none").attr("width",150).attr("height",150);
			$(".u-toMessage").css({"float":"none","text-align":"center"})
		})
	});
	function getQueryStr(){
		if(!util.getQueryString("activity")){
			init();
			return;
		}
		loadActivity();
	}
	function loadActivity(){
		index = 0;
		$('.u-newNavItem.activity').addClass("active").siblings().removeClass("active");
		var data = {
			currentPage : ++index,
			pageSize : pagesize,
		}
		baseModel.get({
		 	url : "data/activitySearch.cgi",
		 	data : data,
		 	success :function(rslt){
		 		if(rslt.code!=0){
		 			return;
		 		}

				baseView.render("#tpl_newsList",rslt.dataList,".g-detailNews");
				if(rslt.dataList.length < data.pageSize){
					$(".g-newsPart .u-loadMore .u-clickToLoad").html("没有更多内容了").addClass("noborder");
				}else{
					$(".g-newsPart .u-loadMore .u-clickToLoad").html("More").removeClass("noborder");
					$(".u-clickToLoad").on("click",function(e){
						e.preventDefault();
						loadMore();
					});

				}
		 	}
		})
	}
	function loadArticle(linkId){
		var data = {
			currentPage : ++index,
			linkId : linkId,
			pageSize : pagesize,
		}
		baseModel.get({
			url : "data/siteSearch.cgi",
			data : data,
			success : function(rslt){
				if(rslt.code!=0){
					return;
				}
				baseView.render("#tpl_newsList",rslt.dataList,".g-detailNews");
				var v = $("video")
				v.each(function(){ videojs(this) });
				if(rslt.dataList.length < data.pageSize){
					$(".g-newsPart .u-loadMore .u-clickToLoad").html("没有更多内容了").addClass("noborder");
				}else{
					$(".g-newsPart .u-loadMore .u-clickToLoad").html("More").removeClass("noborder");
				}				
			}
		})
	}
	function getNavAndHotSearch(){
		baseModel.get({
			type : "get",
			url : "data/navAndHotSearch.cgi",
			success : function(rslt){
				if(rslt.code!=0){
					return;
				}
				baseView.render("#tpl_newsFlashList",rslt.result.yesTodayHotArticle,".newsFlash>div");
				newsSlide();
				$(".u-newNavItem.all").after(baseView.render("#tpl_site",rslt.result.sites));
				var urlLinkId = util.getQueryString("linkId");
				if(urlLinkId){
					$(".u-newNavItem").removeClass("active");
					$(".u-newsNav").find("[data-id='"+urlLinkId+"']").addClass("active");
					loadArticle(urlLinkId);
				};
				$(".J_site").on('click',function(){
					index = 0;
					$(this).addClass("active").siblings().removeClass("active");
					var linkId = $(this).data("id");
					loadArticle(linkId);
				});
			}
		})
	}
	function newsSlide(){
		var distance = parseInt($(".u-newsContent").css("height"))+parseInt($(".u-newsContent").css("padding-top"));
		var slideTimer = setInterval(function(){
			$(".J_slideNews").animate({
				top : -distance*2
			},1000,function(){
				var topItem1 = $(this).children().eq(0);
				var topItem2 = $(this).children().eq(1);
				topItem1.remove();
				topItem2.remove();
				$(this).append(topItem1);
				$(this).append(topItem2);
				$(this).css("top",0);
			})
		},2000)
	}
	function getBannerPicAndHotTags(){
		baseModel.get({
			type : 'get',
			url : "data/homePageAddAndHotTags.cgi",
			success : function(rslt){
				if(rslt.code!=0){
					return;
				}
				baseView.render("#tpl_picList",rslt.result.firstAds,".g-carousel");
				carousel(rslt.result.firstAds.length);
				baseView.render("#tpl_sidePicList",rslt.result.secondAds,".g-sideNews");
				$(".g-fixNews").prepend(baseView.render("#tpl_tagPicList",rslt.result.thirdAds));
				$(".g-hotTag").append(baseView.render("#tpl_hotTags",rslt.result.hotWords));
				$(".u-tags").each(function(){if($(this).text().length>4)$(this).text($(this).text().substring(0,4)+"...")})
			}
		})
	}
	function carousel(length){
		var container = $(".g-carousel");
		var carouselPic = $(".u-carousel");
		var carouselIndex = $(".g-carouselIndex");
		var distance = parseInt(carouselPic.css("width"));
		var activeCircle ='';
		var index = 0;
		var carouselTimer
		carouselIndex.css("width",30*length);
		container.css("width",distance*length);
		for(var i = 0;i < length;i++){
			activeCircle += "<b class='u-carouselIndex'></b>";
		}
		carouselIndex.append(activeCircle);
		$(".u-carouselIndex").eq(0).addClass("active");
		autoPlay();
		$(".u-carouselIndex").click(function(){
			var num = $(this).index();
			$(this).siblings().removeClass("active");
			$(this).addClass('active');
			index = num ;
			container.stop(true,false).animate({
				left : -distance*index
			},1000);
		})
		carouselPic.hover(function(){
			clearInterval(carouselTimer);
			$(this).css("transform","scale(1.05)");
		}).mouseleave(function(){
			$(this).css("transform","scale(1)");
			autoPlay();
		});
		function autoPlay(){
			carouselTimer = setInterval(function(){
				if(index == length){
					index = 0;
				}
				container.animate({
					left : -distance*index
				},1000);
				$(".u-carouselIndex").removeClass("active").eq(index).addClass("active");
				index++;
			},2000);
		}
	}
	function init(startDate,linkId){
		var data ={
			pageSize : pagesize,
			startDate : startDate||null,
			linkId : linkId||null,
			currentPage : ++index
		};
		baseModel.get({
			url : "data/loadMore.cgi",
			data: data,
			success : function(rslt){
				if(rslt.code!=0){
					return;
				}
				if(linkId!=null){
					baseView.render("#tpl_newsList",rslt.dataList,".g-detailNews");
				}else{
					$(".g-detailNews").append(baseView.render("#tpl_newsList",rslt.dataList));
				}
				var v = $("video")
				v.each(function(){ videojs(this) });
				if(rslt.dataList.length < data.pageSize){
					$(".g-newsPart .u-loadMore .u-clickToLoad").html("没有更多内容了").addClass("noborder");
				}else{
					$(".g-newsPart .u-loadMore .u-clickToLoad").html("More").removeClass("noborder");
					$(".u-clickToLoad").on("click",function(e){
						e.preventDefault();
						loadMore(rslt.dataList[rslt.dataList.length-1].createDate);
					});
				}
				
			}
		});
	}
	function loadMore(startDate){
		if($(".g-newsPart .u-loadMore .u-clickToLoad").hasClass("noborder")){
			return;
		}
		var url = '';
		var linkId = $(".u-newNavItem.active").data("id");
		if($(".u-newNavItem.J_site.active").length>0){
			url = "data/siteSearch.cgi"
		}else if($(".u-newNavItem.all.active").length>0){
			url = "data/loadMore.cgi";
		}else if($(".u-newNavItem.activity.active").length>0){
			url = "data/activitySearch.cgi";
		}
		var data ={
			pageSize : pagesize,
			startDate : startDate||null,
			linkId : linkId||null,
			currentPage : ++index//linkId==(null||undefined)?++index:null
		};
		baseModel.get({
			url : url,
			data: data,
			cache : false,
			success : function(rslt){
				if(rslt.code!=0){
					return;
				}
				$(".g-detailNews").append(baseView.render("#tpl_newsList",rslt.dataList));
				var v = $("video");
				v.each(function(){ videojs(this) });
				if(rslt.dataList.length < data.pageSize){
					$(".g-newsPart .u-loadMore .u-clickToLoad").html("没有更多内容了").addClass("noborder");
				}else{
					$(".g-newsPart .u-loadMore .u-clickToLoad").html("More").removeClass("noborder");
					$(".u-clickToLoad").off().on("click",function(e){
						e.preventDefault();
						loadMore(rslt.dataList[rslt.dataList.length-1].createDate);
					});
				}
				
			}
		});
	}
})();