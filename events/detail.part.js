function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||e.indexOf('"')===-1)?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_style(r){if(!r)return"";if("object"==typeof r){var t="";for(var e in r)pug_has_own_property.call(r,e)&&(t=t+e+":"+r[e]+";");return t}return r+="",";"!==r[r.length-1]?r+";":r}function detail(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (address, detail, encodeURIComponent, endTime, host, link, people, poster, share, signed, startTime, status, title) {var imageCss = "url(" + poster + ")"
var imageFilter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + poster + "', sizingMethod='scale');"
pug_html = pug_html + "\u003Cdiv" + (" class=\"image\""+pug_attr("style", pug_style("background-image: " + imageCss + "; filter: " + imageFilter), true, false)) + "\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"info\"\u003E\u003Cdiv id=\"title\"\u003E" + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv\u003E\u003Cdiv class=\"i-clock\"\u003E\u003C\u002Fdiv\u003E\u003Cspan\u003E" + (pug_escape(null == (pug_interp = startTime + " - " + endTime) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E\u003Cdiv class=\"i-address\"\u003E\u003C\u002Fdiv\u003E\u003Cspan\u003E" + (pug_escape(null == (pug_interp = address) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E\u003Cdiv class=\"i-people\"\u003E\u003C\u002Fdiv\u003E\u003Cspan\u003E" + (pug_escape(null == (pug_interp = people) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cdiv class=\"i-host\"\u003E\u003C\u002Fdiv\u003E\u003Cspan\u003E" + (pug_escape(null == (pug_interp = host) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E";
switch (status){
case 0:
pug_html = pug_html + "\u003Cdiv class=\"button red disable\"\u003E审核中\u003C\u002Fdiv\u003E";
  break;
case 1:
if (signed) {
pug_html = pug_html + "\u003Cdiv class=\"button red disable\"\u003E已报名\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\u003Cdiv class=\"button red\" id=\"sign\"\u003E我要报名\u003C\u002Fdiv\u003E";
}
  break;
case 3:
if (signed) {
pug_html = pug_html + "\u003Cdiv class=\"button red disable\"\u003E已报名\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\u003Cdiv class=\"button red\" id=\"sign\"\u003E进行中\u003C\u002Fdiv\u003E";
}
  break;
case 4:
if (signed) {
pug_html = pug_html + "\u003Cdiv class=\"button red disable\"\u003E已报名\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\u003Cdiv class=\"button red disable\"\u003E名额已满\u003C\u002Fdiv\u003E";
}
  break;
case 5:
pug_html = pug_html + "\u003Cdiv class=\"button red disable\"\u003E活动结束\u003C\u002Fdiv\u003E";
  break;
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"detail-header\"\u003E活动内容\u003C\u002Fdiv\u003E\u003Cdiv class=\"detail\"\u003E" + (null == (pug_interp = detail) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
if (share)
{
pug_html = pug_html + "\u003Cdiv class=\"share\"\u003E\u003Cdiv class=\"weixin\" title=\"分享到微信\"\u003E\u003Cdiv class=\"weixin-popup\"\u003E\u003Cdiv class=\"qrcode\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"triangle\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Ca" + (" class=\"qzone\""+" target=\"_blank\" title=\"分享到 QQ 空间\""+pug_attr("href", "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + encodeURIComponent(link) + "&title=" + encodeURIComponent(title) + "&desc=" + encodeURIComponent(title) + "&summary=&site=", true, false)) + "\u003E\u003C\u002Fa\u003E\u003Ca" + (" class=\"weibo\""+" target=\"_blank\" title=\"分享到新浪微博\""+pug_attr("href", "http://service.weibo.com/share/share.php?url=" + encodeURIComponent(link) + "&title=" + encodeURIComponent(title) + "&appkey=&searchPic=", true, false)) + "\u003E\u003C\u002Fa\u003E\u003Cdiv class=\"like normal\" data-type=\"1\" title=\"点赞\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"favorite normal\" data-type=\"0\" title=\"收藏\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"top\" title=\"返回顶部'\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003Cscript\u003E(function() {\n    var s  = document.createElement(\"link\");\n    s.type = \"text\u002Fcss\";\n    s.rel  = \"stylesheet\";\n    s.href = \"\u002Fwebrexco\u002Fstatic\u002Fcss\u002Fevents\u002Fdetail.css\";\n    document.getElementsByTagName(\"head\")[0].appendChild(s);\n})();\u003C\u002Fscript\u003E";}.call(this,"address" in locals_for_with?locals_for_with.address:typeof address!=="undefined"?address:undefined,"detail" in locals_for_with?locals_for_with.detail:typeof detail!=="undefined"?detail:undefined,"encodeURIComponent" in locals_for_with?locals_for_with.encodeURIComponent:typeof encodeURIComponent!=="undefined"?encodeURIComponent:undefined,"endTime" in locals_for_with?locals_for_with.endTime:typeof endTime!=="undefined"?endTime:undefined,"host" in locals_for_with?locals_for_with.host:typeof host!=="undefined"?host:undefined,"link" in locals_for_with?locals_for_with.link:typeof link!=="undefined"?link:undefined,"people" in locals_for_with?locals_for_with.people:typeof people!=="undefined"?people:undefined,"poster" in locals_for_with?locals_for_with.poster:typeof poster!=="undefined"?poster:undefined,"share" in locals_for_with?locals_for_with.share:typeof share!=="undefined"?share:undefined,"signed" in locals_for_with?locals_for_with.signed:typeof signed!=="undefined"?signed:undefined,"startTime" in locals_for_with?locals_for_with.startTime:typeof startTime!=="undefined"?startTime:undefined,"status" in locals_for_with?locals_for_with.status:typeof status!=="undefined"?status:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));;return pug_html;}