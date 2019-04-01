function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||e.indexOf('"')===-1)?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)s=pug_classes(r[g]),s&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_style(r){if(!r)return"";if("object"==typeof r){var t="";for(var e in r)pug_has_own_property.call(r,e)&&(t=t+e+":"+r[e]+";");return t}return r+="",";"!==r[r.length-1]?r+";":r}function collection(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (JSON, dataList, pages) {if (pages == 0) {
pug_html = pug_html + "\u003Cdiv class=\"i-empty\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"empty\"\u003E您还没有收藏哦～\u003C\u002Fdiv\u003E";
}
else {
// iterate dataList
;(function(){
  var $$obj = dataList;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var item = $$obj[pug_index0];
var link
if (item.isJump)
link = item.jumpUrl
else if (item.type !== undefined)
link = "/webrexco/news/detail.htm?newsId=" + item.id;
else
link = "/webrexco/events/detail.htm?id=" + item.id;
pug_html = pug_html + "\u003Cdiv class=\"article\"\u003E";
var c = [];
var images;
switch (item.type){
case 1:
c.push("type-1");
images = item.articleLitpics != "" ? JSON.parse(item.articleLitpics) : [""];
var image = images[0]
var imageCss = "url(" + image + ")"
var imageFilter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + image + "', sizingMethod='scale');"
pug_html = pug_html + "\u003Ca" + (" class=\"poster\""+" target=\"_blank\""+pug_attr("href", link, true, false)+pug_attr("style", pug_style("background-image: " + imageCss + "; filter: " + imageFilter), true, false)) + "\u003E\u003C\u002Fa\u003E";
  break;
case 2:
c.push("type-1");
images = item.articleVideos != "" ? JSON.parse(item.articleVideos) : [""];
pug_html = pug_html + "\u003Cdiv" + (" class=\"poster\""+pug_attr("href", link, true, false)) + "\u003E\u003Cvideo class=\"video video-js vjs-default-skin vjs-big-play-centered\" width=\"290\" height=\"180\" controls=\"controls\"\u003E\u003Csource" + (pug_attr("src", images[0], true, false)) + "\u002F\u003E\u003C\u002Fvideo\u003E\u003C\u002Fdiv\u003E";
  break;
case 3:
c.push("type-3")
images = item.articleLitpics != "" ? JSON.parse(item.articleLitpics) : [""];
  break;
case undefined:
item.articleTitle = item.activityName
item.articleContent = item.activityProvince + item.activityCity + item.activityAddress
item.time = item.activityStartTime.substring(0, item.activityStartTime.length - 4) + " - " + item.activityEndTime.substring(0, item.activityEndTime.length - 4)
item.articleSource = "活动"
c.push("type-1");
var image = item.fullPosterUrl
var imageCss = "url(" + image + ")"
var imageFilter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + image + "', sizingMethod='scale');"
pug_html = pug_html + "\u003Ca" + (" class=\"poster\""+" target=\"_blank\""+pug_attr("href", link, true, false)+pug_attr("style", pug_style("background-image: " + imageCss + "; filter: " + imageFilter), true, false)) + "\u003E\u003C\u002Fa\u003E";
  break;
}
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["right",c], [false,true]), false, false)) + "\u003E\u003Ca" + (" class=\"name\""+" target=\"_blank\""+pug_attr("href", link, true, false)) + "\u003E" + (pug_escape(null == (pug_interp = item.articleTitle) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003Cdiv" + (" class=\"button white\""+pug_attr("data-id", item.id, true, false)+pug_attr("data-type", item.type, true, false)) + "\u003E取消收藏\u003C\u002Fdiv\u003E";
if (item.type != 3) {
pug_html = pug_html + "\u003Cdiv class=\"detail\"\u003E" + (pug_escape(null == (pug_interp = item.articleContent) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
if (item.time) {
pug_html = pug_html + "\u003Cdiv class=\"detail\"\u003E" + (pug_escape(null == (pug_interp = item.time) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
}
}
else {
pug_html = pug_html + "\u003Cdiv class=\"images\"\u003E";
// iterate images.slice(0, 3)
;(function(){
  var $$obj = images.slice(0, 3);
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var image = $$obj[pug_index1];
pug_html = pug_html + "\u003Cdiv" + (" class=\"image\""+pug_attr("style", pug_style("background-image: url(" + image +")"), true, false)) + "\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var image = $$obj[pug_index1];
pug_html = pug_html + "\u003Cdiv" + (" class=\"image\""+pug_attr("style", pug_style("background-image: url(" + image +")"), true, false)) + "\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E\u003Cspan\u003E" + (pug_escape(null == (pug_interp = item.articleSource) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan\u003E" + (pug_escape(null == (pug_interp = item.articleReadCount + "人阅读") ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan\u003E" + (pug_escape(null == (pug_interp = item.timeSub) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var item = $$obj[pug_index0];
var link
if (item.isJump)
link = item.jumpUrl
else if (item.type !== undefined)
link = "/webrexco/news/detail.htm?newsId=" + item.id;
else
link = "/webrexco/events/detail.htm?id=" + item.id;
pug_html = pug_html + "\u003Cdiv class=\"article\"\u003E";
var c = [];
var images;
switch (item.type){
case 1:
c.push("type-1");
images = item.articleLitpics != "" ? JSON.parse(item.articleLitpics) : [""];
var image = images[0]
var imageCss = "url(" + image + ")"
var imageFilter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + image + "', sizingMethod='scale');"
pug_html = pug_html + "\u003Ca" + (" class=\"poster\""+" target=\"_blank\""+pug_attr("href", link, true, false)+pug_attr("style", pug_style("background-image: " + imageCss + "; filter: " + imageFilter), true, false)) + "\u003E\u003C\u002Fa\u003E";
  break;
case 2:
c.push("type-1");
images = item.articleVideos != "" ? JSON.parse(item.articleVideos) : [""];
pug_html = pug_html + "\u003Cdiv" + (" class=\"poster\""+pug_attr("href", link, true, false)) + "\u003E\u003Cvideo class=\"video video-js vjs-default-skin vjs-big-play-centered\" width=\"290\" height=\"180\" controls=\"controls\"\u003E\u003Csource" + (pug_attr("src", images[0], true, false)) + "\u002F\u003E\u003C\u002Fvideo\u003E\u003C\u002Fdiv\u003E";
  break;
case 3:
c.push("type-3")
images = item.articleLitpics != "" ? JSON.parse(item.articleLitpics) : [""];
  break;
case undefined:
item.articleTitle = item.activityName
item.articleContent = item.activityProvince + item.activityCity + item.activityAddress
item.time = item.activityStartTime.substring(0, item.activityStartTime.length - 4) + " - " + item.activityEndTime.substring(0, item.activityEndTime.length - 4)
item.articleSource = "活动"
c.push("type-1");
var image = item.fullPosterUrl
var imageCss = "url(" + image + ")"
var imageFilter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + image + "', sizingMethod='scale');"
pug_html = pug_html + "\u003Ca" + (" class=\"poster\""+" target=\"_blank\""+pug_attr("href", link, true, false)+pug_attr("style", pug_style("background-image: " + imageCss + "; filter: " + imageFilter), true, false)) + "\u003E\u003C\u002Fa\u003E";
  break;
}
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["right",c], [false,true]), false, false)) + "\u003E\u003Ca" + (" class=\"name\""+" target=\"_blank\""+pug_attr("href", link, true, false)) + "\u003E" + (pug_escape(null == (pug_interp = item.articleTitle) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003Cdiv" + (" class=\"button white\""+pug_attr("data-id", item.id, true, false)+pug_attr("data-type", item.type, true, false)) + "\u003E取消收藏\u003C\u002Fdiv\u003E";
if (item.type != 3) {
pug_html = pug_html + "\u003Cdiv class=\"detail\"\u003E" + (pug_escape(null == (pug_interp = item.articleContent) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
if (item.time) {
pug_html = pug_html + "\u003Cdiv class=\"detail\"\u003E" + (pug_escape(null == (pug_interp = item.time) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
}
}
else {
pug_html = pug_html + "\u003Cdiv class=\"images\"\u003E";
// iterate images.slice(0, 3)
;(function(){
  var $$obj = images.slice(0, 3);
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var image = $$obj[pug_index2];
pug_html = pug_html + "\u003Cdiv" + (" class=\"image\""+pug_attr("style", pug_style("background-image: url(" + image +")"), true, false)) + "\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var image = $$obj[pug_index2];
pug_html = pug_html + "\u003Cdiv" + (" class=\"image\""+pug_attr("style", pug_style("background-image: url(" + image +")"), true, false)) + "\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E\u003Cspan\u003E" + (pug_escape(null == (pug_interp = item.articleSource) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan\u003E" + (pug_escape(null == (pug_interp = item.articleReadCount + "人阅读") ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan\u003E" + (pug_escape(null == (pug_interp = item.timeSub) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003Cscript\u003E$(\".video\").each(function () { videojs(this); })\u003C\u002Fscript\u003E";
}}.call(this,"JSON" in locals_for_with?locals_for_with.JSON:typeof JSON!=="undefined"?JSON:undefined,"dataList" in locals_for_with?locals_for_with.dataList:typeof dataList!=="undefined"?dataList:undefined,"pages" in locals_for_with?locals_for_with.pages:typeof pages!=="undefined"?pages:undefined));;return pug_html;}