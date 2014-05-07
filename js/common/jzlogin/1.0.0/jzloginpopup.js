define(function(require, exports, module) {
	var $ = require('$');
    //var ConfirmBox = require('confirmbox');

	(function(f,g){var e=f.document,c=e.documentElement;var b=function(){var n=e.body,i=(window.navigator.userAgent||"").toLowerCase(),k=i.indexOf("msie")!==-1,m=i.indexOf("msie 6")!==-1,h=1,r="cache"+(+new Date()+"").slice(-8),s={};var q=function(){};q.prototype={getOptions:function(t){var v,u={},w={container:null,overlay:true,drag:true,fixed:true,follow:null,followX:0,followY:0,autoClose:0,lock:false,callback:null};for(v in w){u[v]=t[v]!==g?t[v]:w[v]}q.data("options",u);return u},setBodyBg:function(){if(n.currentStyle.backgroundAttachment!=="fixed"){n.style.backgroundImage="url(about:blank)";n.style.backgroundAttachment="fixed"}},appendIframe:function(t){t.innerHTML='<iframe style="position:absolute;left:0;top:0;width:100%;height:100%;z-index:-1;border:0 none;filter:alpha(opacity=0)"></iframe>'},setFollow:function(w,u,t,z){u=typeof u==="string"?e.getElementById(u):u;var v=w.style;v.position="absolute";v.left=q.getOffset(u,"left")+t+"px";v.top=q.getOffset(u,"top")+z+"px"},setPosition:function(v,u){var t=v.style;t.position=m?"absolute":u?"fixed":"absolute";if(u){if(m){t.setExpression("top",'fuckIE6=document.documentElement.scrollTop+document.documentElement.clientHeight/2+"px"')}else{t.top="50%"}t.left="50%"}else{if(m){t.removeExpression("top")}t.top=c.clientHeight/2+q.getScroll("top")+"px";t.left=c.clientWidth/2+q.getScroll("left")+"px"}},createOverlay:function(){var t=e.createElement("div"),u=t.style;u.cssText="margin:0;padding:0;border:none;width:100%;height:100%;background:#333;opacity:0.6;filter:alpha(opacity=60);z-index:997;position:fixed;top:0;left:0;";if(m){n.style.height="100%";u.position="absolute";u.setExpression("top",'fuckIE6=document.documentElement.scrollTop+"px"')}t.id="overlay";return t},createPopupBox:function(){var t=e.createElement("div");t.style.cssText="margin:0;padding:0;border:none;z-index:998;";t.id="JZLoginPopupBox";return t},createPopupWrap:function(t){var A=t.header?'<h4 class="JZLogin_title" id="JZLoginTitle"><a href="javascript:void(0)" title="\u5173\u95ed\u7a97\u53e3" class="close_btn" id="closeBtn">&times;</a>'+t.header+"</h4>":"",z=typeof t.yesFn==="function"?'<button class="btn_highlight" id="JZLoginYesBtn">'+(typeof t.yesText==="string"?t.yesText:"\u786e\u5b9a")+"</button>":"",w=typeof t.noFn==="function"||t.noFn===true?'<button class="btn_normal" id="JZLoginNoBtn">'+(typeof t.noText==="string"?t.noText:"\u53d6\u6d88")+"</button>":"",y=z===""&&w===""?"":'<div class="JZLogin_footer">'+w+z+"</div>",v=['<div class="JZLogin_content">',A,'<div class="JZLogin_text">'+t.content+"</div>",y,"</div>"].join(""),x=e.getElementById("JZLoginWrapper"),u=/<[\/]*script[\s\S]*?>/ig;if(!x){x=e.createElement("div");x.id="JZLoginWrapper";x.className="JZLogin_wrapper"}x.innerHTML=v.replace(u,"");return x}};q.data=function(u,x,w){if(typeof u==="string"){if(x!==g){s[u]=x}return s[u]}else{if(typeof u==="object"){var t=u===f?0:u.nodeType===9?1:u[r]?u[r]:(u[r]=++h),v=s[t]?s[t]:(s[t]={});if(w!==g){v[x]=w}return v[x]}}};q.removeData=function(w,x){if(typeof w==="string"){delete s[w]}else{if(typeof w==="object"){var t=w===f?0:w.nodeType===9?1:w[r];if(t===g){return}var u=function(z){var y;for(y in z){return false}return true},v=function(){delete s[t];if(t<=1){return}try{delete w[r]}catch(y){w.removeAttribute(r)}};if(x){delete s[t][x];if(u(s[t])){v()}}else{v()}}}};q.event={bind:function(x,w,v){var u=q.data(x,"e"+w)||q.data(x,"e"+w,[]);u.push(v);if(u.length===1){var t=this.eventHandler(x);q.data(x,w+"Handler",t);if(x.addEventListener){x.addEventListener(w,t,false)}else{if(x.attachEvent){x.attachEvent("on"+w,t)}}}},unbind:function(z,y,x){var v=q.data(z,"e"+y);if(!v){return}if(!x){v=g}else{for(var u=v.length-1,w=v[u];u>=0;u--){if(w===x){v.splice(u,1)}}}if(!v||!v.length){var t=q.data(z,y+"Handler");if(z.addEventListener){z.removeEventListener(y,t,false)}else{if(z.attachEvent){z.detachEvent("on"+y,t)}}q.removeData(z,y+"Handler");q.removeData(z,"e"+y)}},eventHandler:function(t){return function(y){y=q.event.fixEvent(y||f.event);var x=y.type,v=q.data(t,"e"+x);for(var u=0,w;w=v[u++];){if(w.call(t,y)===false){y.preventDefault();y.stopPropagation()}}}},fixEvent:function(v){if(v.target){return v}var u={},t;u.target=v.srcElement||document;u.preventDefault=function(){v.returnValue=false};u.stopPropagation=function(){v.cancelBubble=true};for(t in v){u[t]=v[t]}return u}};q.capitalize=function(u){var t=u.charAt(0);return t.toUpperCase()+u.replace(t,"")};q.getScroll=function(t){var u=this.capitalize(t);return c["scroll"+u]||n["scroll"+u]};q.getOffset=function(x,v){var y=this.capitalize(v),u=c["client"+y]||n["client"+y]||0,t=this.getScroll(v),w=x.getBoundingClientRect();return Math.round(w[v])+t-u};q.drag=function(A,z){var B="getSelection" in f?function(){f.getSelection().removeAllRanges()}:function(){try{e.selection.empty()}catch(F){}},E=this,t=E.event,x=false,C=k?A:e,v=z.style.position==="fixed",y=q.data("options").fixed;var D=function(I){x=true;var H=E.getScroll("top"),J=E.getScroll("left"),G=v?0:J,F=v?0:H;q.data("dragData",{x:I.clientX-E.getOffset(z,"left")+(v?J:0),y:I.clientY-E.getOffset(z,"top")+(v?H:0),el:G,et:F,er:G+c.clientWidth-z.offsetWidth,eb:F+c.clientHeight-z.offsetHeight});if(k){if(m&&y){z.style.removeExpression("top")}A.setCapture()}t.bind(C,"mousemove",u);t.bind(C,"mouseup",w);if(k){t.bind(A,"losecapture",w)}I.stopPropagation();I.preventDefault()};t.bind(A,"mousedown",D);var u=function(J){if(!x){return}B();var I=q.data("dragData"),H=J.clientX-I.x,L=J.clientY-I.y,M=I.et,N=I.er,K=I.eb,G=I.el,F=z.style;F.marginLeft=F.marginTop="0px";F.left=(H<=G?G:(H>=N?N:H))+"px";F.top=(L<=M?M:(L>=K?K:L))+"px";J.stopPropagation()};var w=function(G){x=false;if(k){t.unbind(A,"losecapture",arguments.callee)}t.unbind(C,"mousemove",u);t.unbind(C,"mouseup",arguments.callee);if(k){A.releaseCapture();if(m&&y){var F=parseInt(z.style.top)-E.getScroll("top");z.style.setExpression("top","fuckIE6=document.documentElement.scrollTop+"+F+'+"px"')}}G.stopPropagation()}};var j,l=function(t){if(t.keyCode===27){o.close()}},p=function(){if(j){clearTimeout(j);j=g}};var o={open:function(){var z=new q(),I=z.getOptions(arguments[0]||{}),t=q.event,G=this,x,B,E,A;p();if(I.overlay){x=e.getElementById("overlay");if(!x){x=z.createOverlay();n.appendChild(x);if(m){z.appendIframe(x)}}x.style.display="block"}if(m){z.setBodyBg()}B=e.getElementById("JZLoginPopupBox");if(!B){B=z.createPopupBox();n.appendChild(B)}if(I.follow){z.setFollow(B,I.follow,I.followX,I.followY);if(x){x.style.display="none"}I.fixed=false}else{z.setPosition(B,I.fixed)}B.style.display="block";if(!I.follow&&!I.fixed){var u=function(){z.setPosition(B,false)};t.bind(f,"resize",u);q.data("resize",u)}E=typeof I.container==="string"?e.getElementById(I.container):z.createPopupWrap(I.container);A=B.getElementsByTagName("*")[0];if(!A){B.appendChild(E)}else{if(A&&E!==A){A.style.display="none";n.appendChild(A);B.appendChild(E)}}E.style.display="block";var F=E.offsetWidth,D=E.offsetHeight;E.style.marginTop=E.style.marginRight=E.style.marginBottom=E.style.marginLeft="0px";if(!I.follow){B.style.marginLeft="-"+F/2+"px";B.style.marginTop="-"+D/2+"px"}else{B.style.marginLeft=B.style.marginTop="0px"}if(m&&!I.overlay){B.style.width=F+"px";B.style.height=D+"px"}var C=e.getElementById("closeBtn"),y=e.getElementById("JZLoginTitle"),v=e.getElementById("JZLoginYesBtn"),w=e.getElementById("JZLoginNoBtn");if(v){t.bind(v,"click",function(J){if(I.container.yesFn.call(G,J)!==false){G.close()}})}if(w){var H=function(J){if(I.container.noFn===true||I.container.noFn.call(G,J)!==false){G.close()}};t.bind(w,"click",H);if(C){t.bind(C,"click",H)}}else{if(C){t.bind(C,"click",G.close)}}if(!I.lock){t.bind(e,"keyup",l)}if(I.autoClose&&typeof I.autoClose==="number"){j=setTimeout(G.close,I.autoClose)}if(I.drag&&y){y.style.cursor="move";q.drag(y,B)}q.data("popupElements",{overlay:x,popupBox:B,closeBtn:C,popupTitle:y,popupYesBtn:v,popupNoBtn:w})},close:function(){var u=q.data("options"),w=q.data("popupElements"),v=q.event;p();if(u.overlay&&w.overlay){w.overlay.style.display="none"}w.popupBox.style.display="none";if(m){w.popupBox.style.removeExpression("top")}if(w.closeBtn){v.unbind(w.closeBtn,"click")}if(w.popupTitle){v.unbind(w.popupTitle,"mousedown")}if(w.popupYesBtn){v.unbind(w.popupYesBtn,"click")}if(w.popupNoBtn){v.unbind(w.popupNoBtn,"click")}if(!u.follow&&!u.fixed){var t=q.data("resize");v.unbind(f,"resize",t);q.removeData("resize")}if(!u.lock){v.unbind(e,"keyup",l)}if(typeof u.callback==="function"){u.callback.call(o)}q.removeData("options");q.removeData("popupElements")}};return o};var d=function(){f.JZLoginPopup=b()},a=function(){if(e.body){return}try{c.doScroll("left")}catch(h){setTimeout(a,1);return}d()};(function(){if(e.body){d()}else{if(e.addEventListener){e.addEventListener("DOMContentLoaded",function(){e.removeEventListener("DOMContentLoaded",arguments.callee,false);d()},false);f.addEventListener("load",d,false)}else{if(e.attachEvent){e.attachEvent("onreadystatechange",function(){if(e.readyState==="complete"){e.detachEvent("onreadystatechange",arguments.callee);d()}});f.attachEvent("onload",d);var h=false;try{h=f.frameElement==null}catch(i){}if(c.doScroll&&h){a()}}}}})();(function(){var i=window.location.host;var o=location.href;var j='<style>.JZLogin_wrapper{display:none;font-family:"Microsoft yahei",Arial;font-size:12px;color:#444;/*border:1px solid #12458d;*/border:3px solid transparent;border-radius:5px;box-shadow:0 0 10px rgba(0, 0, 0, 0.4);}.JZLogin_wrapper p{margin:0}.JZLogin_wrapper .gray{color:#999!important;}.JZLogin_wrapper .right{float:none!important;font-family:"\u5b8b\u4f53";color:#0C0}.JZLogin_wrapper .error{color:#F00!important;}.JZLogin_wrapper .ui-form{margin:0;}.JZLogin_wrapper label{display:inline;cursor:inherit;margin:0;}.JZLogin_wrapper .ui-label{float:left;width:170px;margin:0 0 0 -180px;padding-top:4px;font-size:14px;text-align:right;}.JZLogin_wrapper input{vertical-align:middle;}.JZLogin_wrapper .ui-input{display:inline;width:150px;height:24px;margin:0 5px 5px 0;padding:0 3px;line-height:24px;border:1px solid #a5c2d4}.JZLogin_wrapper .ui-form-explain{margin:0;padding:5px 0 0 0;font-size:12px;color:#999;}.JZLogin_wrapper .ui-form-required{margin-right:6px;font-family:SimSun;color:#F00;}.JZLogin_wrapper .ui-button{color:#222;}.JZLogin_wrapper .JZLogin_content{overflow:hidden;border-radius:5px;background:#FFF}.JZLogin_wrapper .JZLogin_title{overflow:hidden;height:30px;margin:0;padding:0 10px 0 30px;font-size:14px;line-height:28px;color:#EE3A09;border-bottom:1px solid #E5E5E5;border-radius:5px 5px 0 0;background:#F7F7F7 url(http://static.n8n8.cn/Public/Images/tiny_logo.gif) no-repeat 10px 50%;}.JZLogin_wrapper .JZLogin_name{float:left;margin:0;font-size:14px;line-height:28px;}.JZLogin_wrapper .switch-btn{float:right;margin-right:30px;+margin-top:-30px;font-size:12px;line-height:33px;}.JZLogin_wrapper .close_btn{float:right;width:20px;height:20px;margin-top:5px;+margin-top:-20px;font:700 20px arial;_font-size:12px;line-height:20px;text-align:center;text-decoration:none;color:#999;}.JZLogin_wrapper .close_btn:hover{color:#333;}.JZLogin_wrapper .JZLogin_text{float:left;padding:10px}.JZLogin_wrapper .JZLogin_footer{clear:both;height:35px;line-height:35px;text-align:center;background:#ecf0f3}.JZLogin_wrapper .JZLogin_footer:after{display:block;visibility:hidden;overflow:hidden;clear:both;content:"";height:0}.JZLogin_wrapper .ui-button-sub,.JZLogin_wrapper .ui-button{cursor:pointer;padding:3px 10px;border-width:1px;border-style:solid;border-color:#CCC #CCC #B3B3B3 #CCC;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;background:-webkit-gradient(linear,left top,left bottom,from(#FFFFFF),to(#E6E6E6));background:-moz-linear-gradient(top,#FFFFFF,#E6E6E6);background:-o-linear-gradient(top,#FFFFFF,#E6E6E6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#E6E6E6",endColorstr="#FFFFFF") chroma(color=black)}.JZLogin_wrapper .ui-button-sub:hover,.JZLogin_wrapper .ui-button:hover,.JZLogin_wrapper .ui-button-hover{color:#222;border-width:1px;border-style:solid;border-color:#CCC #CCC #B3B3B3 #CCC;background:-webkit-gradient(linear,left top,left bottom,from(#E6E6E6),to(#FFFFFF));background:-moz-linear-gradient(top,#E6E6E6,#FFFFFF);background:-o-linear-gradient(top,#E6E6E6,#FFFFFF);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#FFFFFF",endColorstr="#E6E6E6") chroma(color=black)}.JZLogin_mobiReg{float:right;margin-left:10px;padding-top:15px}.JZLogin_mobiReg .ui-form-item{padding:0 5px 0 110px}.JZLogin_mobiReg .ui-input{width:190px;margin-bottom:0;}.JZLogin_mobiReg .ui-input-checkcode{width:80px}.JZLogin_mobiReg .ui-button-getcode{cursor:pointer;margin:-1px 0 0 5px;padding:3px 10px;+padding:1px 5px;}.JZLogin_mobiReg .ui-button-sub{margin:0 0 -70px 20px;}.JZLogin_mobiReg .ui-form-explain{height:20px;padding:3px 0 0 0}.JZLogin_mobiAdv{display:none;float:left;width:234px;height:210px}.JZLogin_mobiAdv img{width:234px;height:210px;}.JZLogin_mobiLog .ui-form-tips{height:20px;margin:0;line-height:20px}.JZLogin_mobiLog .ui-form-item{padding:0 5px 0 110px}.JZLogin_wrapper_mobiReg{width:400px;}.JZLogin_wrapper_mobiReg .JZLogin_text{padding:10px 30px;}.JZLogin_wrapper_mobiReg .close_btn{*margin-top:-25px;}.JZLogin_wrapper_mobiReg .ui-button-sub{*position:relative;*left:-110px;_left:0;*margin-top:25px;}.JZLogin_wrapper_mobiLog{width:376px}.JZLogin_wrapper_mobiLog .JZLogin_title{border-bottom:1px solid #e5e5e5;}.JZLogin_wrapper_mobiLog .ui-form-item{padding-left:100px}.JZLogin_wrapper_mobiLog .ui-button-reg{color:#F00}.JZLogin_wrapper_mobiLog .ui-input-savePwd{cursor:pointer;margin:-1px 5px 0 0}.JZLogin_wrapper_mobiLog .ui-button-sub{*position:relative;margin:0 15px -65px 0;*margin-top:23px;}.JZLogin_wrapper_mobiVer {*width:510px;}.JZLogin_wrapper_mobiVer .JZLogin_text{background:#FFF;}.JZLogin_wrapper_mobiVer .close_btn{*margin-top:-25px;}.JZLogin_mobiVer{padding:10px 30px;_background:#FFF;}.JZLogin_mobiVer .ui-form{font-size:14px}.JZLogin_mobiVer .ui-form-tips{padding-bottom:10px}.JZLogin_mobiVer .ui-form-tips .cnt{text-indent:2em;font-size:13px;}.JZLogin_mobiVer .ui-form-step{padding-bottom:10px;}.JZLogin_mobiVer .ui-form-item{padding:0 5px 10px 120px}.JZLogin_mobiVer .ui-input{width:170px;}.JZLogin_mobiVer .ui-form-explain{padding:0;}.JZLogin_mobiVer .ui-button-getcode{cursor:pointer;margin:-5px 0 0 10px;padding:1px 5px;font-size:12px;}.JZLogin_mobiVer .ui-input-checkcode{width:170px;}.JZLogin_mobiVer .ui-button-sub{padding:3px 10px;font-size:13px;}.pagecode-box{display:none;position:fixed;top:50%;left:50%;z-index:999;margin:-73px 0 0 -148.5px;}.pagecode .pc-txt{padding-top:5px;font-size:13px;text-align:center}.pagecode .pc-txt label{display:inline;font-size:13px}.pagecode .pc-inp{display:inline;width:60px;height:22px;margin-right:10px;padding:0 3px;font-size:13px;border:1px solid #CCC}.pagecode .pc-lnk{color:#005eac}.pagecode .pc-img{margin:-3px 5px 0 0;vertical-align:middle}.pagecode .pc-btn{margin:20px 0 0 0;padding:0 0 15px 75px;text-align:left}.pagecode .pc-sub{cursor:pointer;width:60px;height:25px;border:1px solid #CCC;background:#EAEAEA}.JZLogin_qqVer{padding:0 20px;}.JZLogin_qqVer .ui-form-tips .cnt{width:285px;}.JZLogin_qqVer .ui-input{width:110px;}.JZLogin_qqVer .ui-form-item{padding-left:90px;}</style>';var n='<div id="JZLoginMobiRegBox"class="JZLogin_wrapper JZLogin_wrapper_mobiReg"><div class="JZLogin_content"><div class="JZLogin_title"><h2 class="JZLogin_name">\u624b\u673a\u6ce8\u518c</h2><a title="\u5173\u95ed"href="javascript:void(0);"class="close_btn JZLogin-close-btn"id="verClsBtn2">\u00d7</a><a class="switch-btn JZLogin-mobiLog-btn" href="javascript:void(0);">\u8fd4\u56de\u767b\u5f55</a></div><div class="JZLogin_text"><div class="JZLogin_mobiAdv"></div><div class="JZLogin_mobiReg"><form id="JZLoginMobiRegForm"class="ui-form"><div class="ui-form-item"><label for="JZLoginMobiRegAcc"class="ui-label"><span class="ui-form-required">*</span>\u60a8\u7684\u8d26\u53f7\uff1a</label><input id="JZLoginMobiRegAcc" class="mobi-inp ui-input" name="JZLoginMobiRegAcc" tabindex="5" type="text"/><div class="ui-form-explain"></div></div><div class="ui-form-item"><label for="JZLoginMobiRegCode"class="ui-label"><span class="ui-form-required">*</span>\u9a8c\u8bc1\u7801\uff1a</label><input id="JZLoginMobiRegCode"class="ui-input ui-input-checkcode" tabindex="6" type="text"data-explain="\u8bf7\u8f93\u5165\u60a8\u624b\u673a\u6536\u5230\u7684\u9a8c\u8bc1\u7801"autocomplete="off"maxlength="6"name="JZLoginMobiRegCode"value=""><input id="JZLoginMobiRegGetCode" type="button"class="ui-button ui-button-getcode" tabindex="7" value="\u83b7\u53d6\u9a8c\u8bc1\u7801"><div class="ui-form-explain"></div></div><div class="ui-form-item"><label for="JZLoginMobiRegPwd"class="ui-label"><span class="ui-form-required">*</span>\u8f93\u5165\u5bc6\u7801\uff1a</label><input id="JZLoginMobiRegPwd"name="password"type="password"class="ui-input" tabindex="8" value=""/><div class="ui-form-explain"></div></div><div class="ui-form-item"><label for="JZLoginMobiConPwd"class="ui-label"><span class="ui-form-required">*</span>\u518d\u8f93\u4e00\u6b21\uff1a</label><input id="JZLoginMobiConPwd"name="JZLoginMobiConPwd"type="password"class="ui-input" tabindex="9"/><div class="ui-form-explain ui-tiptext"></div></div><div class="ui-form-item"><input id="JZLoginMobiRegSub" type="submit"class="ui-button ui-button-sub" tabindex="10" value="\u7acb\u5373\u6ce8\u518c"></div></form></div></div><div class="JZLogin_footer"></div></div></div>';var m='<div id="JZLoginMobiLogBox"class="JZLogin_wrapper JZLogin_wrapper_mobiLog"><div class="JZLogin_content"><div class="JZLogin_title"><h2 class="JZLogin_name">\u7528\u6237\u767b\u5f55</h2><a id="verClsBtn3"class="close_btn JZLogin-close-btn"href="javascript:void(0);"title="\u5173\u95ed">\u00d7</a></div><div class="JZLogin_text"><div class="JZLogin_mobiLog"><form id="JZLoginMobiLogForm" class="ui-form"><div class="ui-form-item"><p class="ui-form-tips"></p></div><div class="ui-form-item"><label for="JZLoginMobiLog-username"class="ui-label">\u7528\u6237\u540d\uff1a</label><input id="JZLoginMobiLog-username" class="ui-input" type="text" name="JZLoginMobiLog-username" placeholder="\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801/\u8f6f\u4ef6\u8d26\u53f7" tabindex="2" title="\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801/\u8f6f\u4ef6\u8d26\u53f7"/><a id="JZLoginMobiLog-regBtn"class="ui-button-reg JZLogin-mobiReg-btn"href="javascript:void(0);">\u514d\u8d39\u6ce8\u518c</a><div class="ui-form-explain"></div></div><div class="ui-form-item"><label for="JZLoginMobiLog-password"class="ui-label">\u5bc6&nbsp;&nbsp;&nbsp;\u7801\uff1a</label><input id="JZLoginMobiLog-password"name="JZLoginMobiLog-password"type="password"class="ui-input"data-explain="\u8bf7\u8f93\u5165\u60a8\u7684\u5bc6\u7801" tabindex="3" title="\u8bf7\u8f93\u5165\u5bc6\u7801" value=""/><a class="ui-button-forPwd"href="http://u.n8n8.cn/getPassword"target="_blank">\u5fd8\u8bb0\u5bc6\u7801\uff1f</a><div class="ui-form-explain"></div></div><div class="ui-form-item"><input id="JZLoginMobiLog-savePwd"class="ui-input-savePwd"type="checkbox"checked="checked"title="\u4e3a\u4e86\u60a8\u7684\u8d26\u53f7\u5b89\u5168\uff0c\u8bf7\u52ff\u5728\u7f51\u5427\u7b49\u516c\u7528\u7535\u8111\u4e0a\u52fe\u9009\u6b64\u9879"/><label for="JZLoginMobiLog-savePwd">\u8bb0\u4f4f\u5bc6\u7801</label></div><div class="ui-form-item"><input type="submit"class="ui-button ui-button-sub" tabindex="4"value="\u7acb\u5373\u767b\u5f55"><input type="reset"class="ui-button ui-button-sub JZLogin-close-btn"value="\u53d6\u6d88\u767b\u5f55"></div></form></div></div><div class="JZLogin_footer"></div></div></div>';var h='<div id="JZLoginMobiVerBox"class="JZLogin_wrapper JZLogin_wrapper_mobiVer"><div class="JZLogin_content"><div class="JZLogin_title"><h2 class="JZLogin_name">\u624b\u673a\u9a8c\u8bc1</h2><a class="close_btn JZLogin-close-btn"href="javascript:void(0);"title="\u5173\u95ed">\u00d7</a><a class="switch-btn JZLogin-mobiLog-btn" href="javascript:void(0);">\u91cd\u65b0\u767b\u5f55</a><a class="switch-btn JZLogin-mobiReg-btn" href="javascript:void(0);">\u91cd\u65b0\u6ce8\u518c</a></div><div class="JZLogin_text"><div class="JZLogin_mobiVer"><form id="JZLoginMobiVerForm" class="ui-form"><div class="ui-form-tips"><p>\u5c0a\u656c\u7684\u7528\u6237\uff1a</p><p id="JZLoginMobiVerTips" class="cnt">\u8bf7\u5b8c\u5584\u60a8\u7684\u4fe1\u606f\uff0c\u8be5\u5e94\u7528\u9700\u8981\u624b\u673a\u8ba4\u8bc1\u7528\u6237\u624d\u53ef\u4ee5\u4f7f\u7528\u5168\u90e8\u529f\u80fd\u3002</p></div><div class="ui-form-step">1\u3001\u6b63\u786e\u8f93\u5165\u60a8\u7684\u624b\u673a\u53f7\u7801\uff0c\u70b9\u51fb\u201c\u83b7\u53d6\u9a8c\u8bc1\u7801\u201d\u6309\u94ae</div><div class="ui-form-item"><label for="JZLoginMobiVerAcc"class="ui-label"><span class="ui-form-required">*</span>\u624b\u673a\u53f7\u7801\uff1a</label><input id="JZLoginMobiVerAcc" class="mobi-inp ui-input" name="JZLoginMobiVerAcc" tabindex="11" type="text"/><input id="JZLoginMobiVerGetCode" type="button"class="ui-button ui-button-getcode" tabindex="12" value="\u83b7\u53d6\u9a8c\u8bc1\u7801"><div class="ui-form-explain">\u8bf7\u8f93\u5165\u60a8\u768411\u4f4d\u624b\u673a\u53f7\u7801</div></div><div class="ui-form-step">2\u3001\u6536\u5230\u9a8c\u8bc1\u7801\u77ed\u4fe1\u540e\uff0c\u5728\u4e0b\u65b9\u8f93\u5165\u9a8c\u8bc1\u7801</div><div class="ui-form-item"><label for="JZLoginMobiRegCode"class="ui-label"><span class="ui-form-required">*</span>\u9a8c\u8bc1\u7801\uff1a</label><input id="JZLoginMobiVerCode"class="ui-input ui-input-checkcode" tabindex="13" type="text"data-explain="\u8bf7\u8f93\u5165\u60a8\u624b\u673a\u6536\u5230\u7684\u9a8c\u8bc1\u7801"autocomplete="off"maxlength="6"name="JZLoginMobiRegCode"value=""><div class="ui-form-explain">\u8bf7\u8f93\u5165\u60a8\u624b\u673a\u6536\u5230\u76846\u4f4d\u9a8c\u8bc1\u7801</div></div><div class="ui-form-item"><input id="JZLoginMobiRegSub" type="submit"class="ui-button ui-button-sub" tabindex="10" value="\u63d0\u4ea4"></div></form><div>\u5982\u679c\u60a8\u5728\u4e00\u5206\u949f\u5185\u6ca1\u6709\u6536\u5230\u9a8c\u8bc1\u7801\uff0c\u8bf7\u91cd\u65b0\u70b9\u51fb\u201c\u83b7\u53d6\u9a8c\u8bc1\u7801\u201d</div></div></div></div></div>';var k='<div id="JZLoginQQVerBox"class="JZLogin_wrapper JZLogin_wrapper_qqVer"><div class="JZLogin_content"><div class="JZLogin_title"><h2 class="JZLogin_name">QQ\u9a8c\u8bc1</h2><a class="close_btn JZLogin-close-btn"href="javascript:void(0);"title="\u5173\u95ed">\u00d7</a></div><div class="JZLogin_text"><div class="JZLogin_mobiVer JZLogin_qqVer"><form id="JZLoginQQVerForm" class="ui-form"><div class="ui-form-tips"><p>\u5c0a\u656c\u7684\u7528\u6237\uff1a</p><p id="JZLoginQQVerTips" class="cnt">\u8bf7\u8f93\u5165\u60a8\u7684\u5e38\u7528QQ\uff0c\u4e0e\u5ba2\u670d\u4e13\u5458\u5efa\u7acb\u5feb\u6377\u6c9f\u901a\u3002\u70b9\u51fb\u201c\u63d0\u4ea4\u201d\u540e\uff0c\u6211\u4eec\u5c06\u5411\u60a8\u7684QQ\u90ae\u7bb1\u53d1\u9001\u4e00\u5c01\u9a8c\u8bc1\u90ae\u4ef6\uff0c\u8bf7\u60a8\u53ca\u65f6\u67e5\u6536\u5e76\u6fc0\u6d3b\u3002</p></div><div class="ui-form-item"><label for="JZLoginQQVerAcc"class="ui-label"><span class="ui-form-required">*</span>QQ\u53f7\u7801\uff1a</label><input id="JZLoginQQVerAcc" class="ui-input" name="JZLoginQQVerAcc" type="text"/><div class="ui-form-explain">\u8bf7\u8f93\u5165\u60a8\u7684QQ\u53f7\u7801</div></div><div class="ui-form-item"><input id="JZLoginQQVerSub" type="submit"class="ui-button ui-button-sub" value="\u63d0\u4ea4"></div></form></div></div></div></div>';var l='<div id="JZLoginCodeBox" class="pagecode-box"><div style="display:block;" class="JZLogin_wrapper"><div class="JZLogin_content"><div class="JZLogin_title"><h2 class="JZLogin_name">\u514d\u8d39\u83b7\u53d6\u77ed\u4fe1\u9a8c\u8bc1\u7801</h2><a class="close_btn JZLoginCode-close-btn"href="javascript:void(0);"title="\u5173\u95ed">\u00d7</a></div><div class="JZLogin_text"><div class="pagecode"><form id="pageCodeForm" action="#" method="post" data-mobi=""><div class="pc-txt"><label for="pageCodeInp">\u9a8c\u8bc1\u7801\uff1a</label><input id="pageCodeInp" class="pc-inp" type="text"><a class="pc-lnk" href="javascript:;" title="\u70b9\u51fb\u6362\u4e00\u5f20" onclick="this.firstChild.src=\'http://u.n8n8.cn/User/index.php?m=Mobi&a=getVerCode&t=\' + Math.random();return false;"><img class="pc-img" src="http://u.n8n8.cn/User/index.php?m=Mobi&a=getVerCode">\u770b\u4e0d\u6e05\uff1f\u6362\u4e00\u5f20</a></div><div class="pc-btn"><input type="submit" value="\u63d0\u4ea4" class="pc-sub"></div></form></div></div></div></div></div>';jQuery("body").append(j);jQuery("body").append(n);jQuery("body").append(m);jQuery("body").append(h);jQuery("body").append(k);jQuery("body").append(l)})()})(window,undefined);$(function(){var s=window.location.host;var D=s.split(".")[0];(function(){$.ajax({type:"GET",url:"http://u.n8n8.cn/User/index.php?m=Mobi&a=ajaxCheckMobi",dataType:"jsonp",async:false,success:function(Q){if(Q.e==2){jzLoginNoMobi=2;$(".JZLogin-isMobiLog-btn").data("events","unlogin")}else{if(Q.e==0){jzLoginNoMobi=0}else{if(Q.qq==0){jzLoginNoMobi=3}else{jzLoginNoMobi=1}}}}})})();function q(R,Q){if(Q>0){R.attr("disabled","disabled");R.val("\u8bf7\u7b49\u5f85"+Q+"\u79d2");Q--;setTimeout(function(){q(R,Q)},1000)}else{R.removeAttr("disabled");R.val("\u83b7\u53d6\u9a8c\u8bc1\u7801")}}var A=$("#JZLoginCodeBox");$(".JZLoginCode-close-btn").click(function(){A.hide()});var y="\u8d26\u53f7\u548c\u5bc6\u7801\u4e0d\u5339\u914d\uff0c\u8bf7\u91cd\u8bd5";var u=$("#JZLoginMobiLogForm .ui-form-tips");var g=$("#JZLoginMobiLogForm .ui-input");var H=$("#JZLoginMobiLog-username");var x=$("#JZLoginMobiLog-password");var h="\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801/\u8f6f\u4ef6\u8d26\u53f7";var J="\u8bf7\u8f93\u5165\u5bc6\u7801";g.focus(function(){u.html("").removeClass("error")});H.focus(function(){u.html(h)}).blur(function(){u.html("")});$("#JZLoginMobiLogForm").live("submit",function(S){S=S||window.event;S.preventDefault();var Q=H.val();var R=x.val();g.each(function(T){var U=[h,J];if($(this).val()==""||$(this).val()=="\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801/\u8f6f\u4ef6\u8d26\u53f7"){u.html(U[T]).addClass("error");return false}});if(!u.hasClass("error")){$.ajax({type:"GET",url:"http://u.n8n8.cn/User/index.php?m=Mobi&a=ajaxlogin",dataType:"jsonp",data:"username="+Q+"&password="+R,success:function(T){if(T.e==1){if(typeof JZMobiLogGotoUrl!="undefined"){location.href=JZMobiLogGotoUrl}else{location.reload()}}else{u.html(y).addClass("error")}},error:function(){alert("\u767b\u5f55\u5931\u8d25\uff0c\u8bf7\u91cd\u65b0\u518d\u8bd5\uff01")}})}return false});var O='<span class="right">\u221a\u6b63\u786e</span>';var a=$("#JZLoginMobiRegAcc");var G="\u8bf7\u8f93\u5165\u60a8\u7684\u624b\u673a\u53f7\u7801";var z="\u8bf7\u8f93\u5165\u6b63\u786e\u768411\u4f4d\u624b\u673a\u53f7\u7801";var n="\u8be5\u624b\u673a\u53f7\u7801\u5df2\u6ce8\u518c";var C="\u8bf7\u8f93\u5165\u624b\u673a\u53f7";a.focus(function(){if($(this).attr("placeholder")){$(this).removeAttr("placeholder")}$(this).nextAll(".ui-form-explain").html(G).removeClass("error").addClass("gray");$(this).nextAll(".right").remove()});a.blur(function(){var Q=$.trim(a.val());$(this).nextAll(".ui-form-explain").html("").removeClass("gray");if(Q==""){return false}else{if(Q.length!=11){$(this).nextAll(".ui-form-explain").html(z).addClass("error")}else{$.ajax({type:"GET",url:"http://u.n8n8.cn/User/index.php?m=Mobi&a=getUserVerify",dataType:"jsonp",data:"account="+Q,success:function(R){if(R.e==1){a.nextAll(".ui-form-explain").html(n).addClass("error")}else{a.nextAll(".ui-form-explain").html(O).removeClass("error")}}})}}});var f=$("#JZLoginMobiRegGetCode");f.click(function(){if(a.val()==""||a.nextAll(".ui-form-explain").hasClass("error")){alert("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801~");return false}else{$("#pageCodeForm").data("mobi",$(this).parents("form").find(".mobi-inp").val());A.show()}});$("#pageCodeForm").live("submit",function(T){var T=T||window.event;T.preventDefault();var S=$(this);var R=$.trim($(this).data("mobi"));var Q=$.trim($("#pageCodeInp").val());if(Q==""){alert("\u9a8c\u8bc1\u7801\u4e0d\u80fd\u4e3a\u7a7a~")}else{if(Q.length!=4){alert("\u9a8c\u8bc1\u7801\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u518d\u8bd5\uff01~")}else{$.ajax({type:"GET",url:"http://u.n8n8.cn/User/index.php?m=Mobi&a=regVerify",dataType:"jsonp",data:"account="+R+"&code="+Q,success:function(U){if(U.e==1){S.parents(".ui-dialog").prev(".ui-mask").remove();S.parents(".ui-dialog").remove();alert("\u9a8c\u8bc1\u7801\u53d1\u9001\u6210\u529f\uff0c\u8bf7\u6ce8\u610f\u67e5\u6536\uff01");A.hide();q(f,"60")}else{if(U.e==2){alert("\u9a8c\u8bc1\u7801\u53d1\u9001\u5931\u8d25\uff0c\u8bf7\u91cd\u65b0\u518d\u8bd5\uff01")}else{if(U.e==3){alert("\u60a8\u5728\u4e00\u5c0f\u65f6\u5185\u53d1\u9001\u9a8c\u8bc1\u7801\u8d85\u8fc73\u6b21\uff0c\u8bf7\u7a0d\u540e\u518d\u53d1\uff01")}else{if(U.e==4){alert("\u9a8c\u8bc1\u7801\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u518d\u8bd5\uff01")}else{alert(U.msg)}}}}}});return false}}});var c=$("#JZLoginMobiRegCode");var r="\u8bf7\u8f93\u5165\u60a8\u624b\u673a\u6536\u5230\u7684\u9a8c\u8bc1\u7801";var i="\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u9a8c\u8bc1\u7801";var K="\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801";c.focus(function(){$(this).nextAll(".ui-form-explain").html(r).removeClass("error").addClass("gray");$(this).nextAll(".right").remove()});c.blur(function(){var Q=c.val();$(this).nextAll(".ui-form-explain").html("").removeClass("gray");if(Q==""){return false}else{if(Q.length!=6){c.nextAll(".ui-form-explain").html(i).addClass("error")}else{$.ajax({type:"GET",url:"http://u.n8n8.cn/User/index.php?m=Mobi&a=chekverifycode",dataType:"jsonp",data:"verifycode="+Q,success:function(R){if(R.e==1){c.nextAll(".ui-form-explain").html(O).removeClass("error")}else{c.nextAll(".ui-form-explain").html(i).addClass("error")}}})}}});var p=$("#JZLoginMobiRegPwd");var t="6-20\u4f4d\u5b57\u7b26\uff0c\u5b57\u6bcd\u3001\u6570\u5b57\u6216\u7b26\u53f7\u7ec4\u5408";var k="\u5bc6\u7801\u957f\u5ea6\u53ea\u80fd\u57286-20\u4f4d\u5b57\u7b26\u4e4b\u95f4";var M="\u8bf7\u8f93\u5165\u5bc6\u7801";var E=$("#JZLoginMobiConPwd");var L="\u8bf7\u518d\u6b21\u8f93\u5165\u5bc6\u7801";var B="\u5bc6\u7801\u957f\u5ea6\u53ea\u80fd\u57286-20\u4f4d\u5b57\u7b26\u4e4b\u95f4";var I="\u4e24\u6b21\u8f93\u5165\u5bc6\u7801\u4e0d\u4e00\u81f4";var m="\u8bf7\u8f93\u5165\u5bc6\u7801";p.focus(function(){E.nextAll(".ui-form-explain").html("").removeClass("error");$(this).nextAll(".ui-form-explain").html(t).removeClass("error").addClass("gray");$(this).nextAll(".right").remove();E.nextAll(".right").remove()});p.blur(function(){var Q=p.val();var R=E.val();$(this).nextAll(".ui-form-explain").html("").removeClass("gray");if(Q==""){return false}else{if(Q.length<6||Q.length>20){$(this).nextAll(".ui-form-explain").html(k).addClass("error")}else{if(R!=""&&R!=Q){$(this).nextAll(".ui-form-explain").html(O);E.nextAll(".ui-form-explain").html(I).addClass("error");E.nextAll(".right").remove()}else{$(this).nextAll(".ui-form-explain").html(O);if(R==Q){E.nextAll(".ui-form-explain").html(O)}}}}});E.focus(function(){$(this).nextAll(".ui-form-explain").html(L).removeClass("error").addClass("gray");$(this).nextAll(".right").remove()});E.blur(function(){var Q=p.val();var R=E.val();$(this).nextAll(".ui-form-explain").html("").removeClass("gray");if(R==""){return false}else{if(R.length<6||R.length>20){$(this).nextAll(".ui-form-explain").html(B).addClass("error");return false}else{if(R!=Q){$(this).nextAll(".ui-form-explain").html(I).addClass("error")}else{$(this).nextAll(".ui-form-explain").html(O)}}}});var o=$("#JZLoginMobiRegForm");o.submit(function(V){V=V||window.event;V.preventDefault();var Q=$.trim(a.val());var T=c.val();var R=p.val();var S=E.val();var U=$("#JZLoginMobiRegSub");$(this).find(".ui-input").each(function(W){var X=[C,K,M,m];if($(this).val()==""){$(this).nextAll(".ui-form-explain").html(X[W]).addClass("error")}});if(!$(this).find(".error").length){U.attr("disabled","disabled");$.ajax({type:"GET",url:"http://u.n8n8.cn/User/index.php?m=Mobi&a=ajaxReg&type="+D,data:"account="+Q+"&verifycode="+T+"&password="+S,dataType:"jsonp",success:function(W){if(W.e==1){alert("\u606d\u559c\u60a8\uff0c\u8d26\u53f7\u6ce8\u518c\u6210\u529f\uff01");location.reload()}else{if(W.e==2){alert("\u624b\u673a\u9a8c\u8bc1\u7801\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u518d\u8bd5\uff01")}else{if(W.e==3){alert("\u8be5\u624b\u673a\u53f7\u7801\u5df2\u6ce8\u518c\uff0c\u8bf7\u6362\u4e00\u4e2a\u518d\u8bd5\uff01")}else{alert("\u5f88\u62b1\u6b49\uff0c\u6ce8\u518c\u5931\u8d25\uff0c\u8bf7\u91cd\u65b0\u518d\u8bd5\uff01")}}}},complete:function(W,X){U.removeAttr("disabled")},error:function(){alert("\u5f88\u62b1\u6b49\uff0c\u6ce8\u518c\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01")}});return false}});var w='<span class="right">\u221a\u6b63\u786e</span>';var j=$("#JZLoginMobiVerAcc");var N=$("#JZLoginMobiVerGetCode");var F=$("#JZLoginMobiVerCode");var v="\u8bf7\u8f93\u5165\u60a8\u768411\u4f4d\u624b\u673a\u53f7\u7801";var l="\u8bf7\u8f93\u5165\u6b63\u786e\u768411\u4f4d\u624b\u673a\u53f7\u7801";var b="\u8be5\u624b\u673a\u53f7\u7801\u5df2\u7ed1\u5b9a\uff0c\u8bf7\u6362\u4e00\u4e2a\u518d\u8bd5";var P="\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801";j.focus(function(){$(this).nextAll(".ui-form-explain").html(v).removeClass("error right")});j.bind("keyup",function(){$(this).removeClass("right")});j.bind("blur keyup",function(){var R=$(this).nextAll(".ui-form-explain");var Q=$.trim(j.val());if(Q==""){return false}else{if(Q.length<11&&Q.length>0){R.html(v).addClass("gray")}else{if(Q.length!=11){R.html(l).addClass("error")}else{R.html(w).removeClass("gray error").addClass("right")}}}});j.bind("blur",function(){var R=$(this).nextAll(".ui-form-explain");var Q=$.trim(j.val());if(Q.length>0&&Q.length<11){R.html(l).addClass("error")}});N.click(function(){var Q=$.trim(j.val());if(Q==""||j.nextAll(".ui-form-explain").hasClass("error")){alert("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801~");return false}else{$("#pageCodeForm").data("mobi",$(this).parents("form").find(".mobi-inp").val());A.show()}});$("#JZLoginMobiVerForm").submit(function(){var R=$.trim(j.val());var Q=F.val();$.ajax({type:"GET",url:"http://u.n8n8.cn/User/index.php?m=Mobi&a=ajaxSaveMobi",dataType:"jsonp",data:"account="+R+"&verifycode="+Q,success:function(S){if(S.e==1){alert("\u606d\u559c\u60a8\uff0c\u624b\u673a\u9a8c\u8bc1\u6210\u529f\uff01");location.reload()}else{if(S.e==0){alert(S.msg)}else{if(S.e==5){JZLoginPopup.open({container:{header:"\u624b\u673a\u9a8c\u8bc1\u6210\u529f",content:'<div style="text-indent:2em;"><p>\u606d\u559c\u60a8\uff0c\u624b\u673a\u9a8c\u8bc1\u6210\u529f\uff01</p><p>\u540c\u65f6\uff0c<span style="color:#C00;">\u624b\u673a\u53f7\u7801</span>\u662f\u60a8\u7684\u767b\u5f55\u8d26\u53f7\uff0c</p><p><span style="color:#C00;">\u624b\u673a\u9a8c\u8bc1\u7801</span>\u4f5c\u4e3a\u60a8\u7684\u521d\u59cb\u9ed8\u8ba4\u5bc6\u7801\u3002</p><p style="margin-top:10px;">\u7acb\u5373<a style="color:#C00;" href="http://u.n8n8.cn/getPassword" target="_blank">\u4fee\u6539\u5bc6\u7801>></a></p></div>',noFn:true,noText:"\u786e\u5b9a"},overlay:true})}else{return}}}}});return false});var e=$("#JZLoginQQVerAcc");var d=/^[1-9]\d{4,10}$/;$("#JZLoginQQVerForm").submit(function(R){R.preventDefault();var Q=$.trim(e.val());if(!d.test(Q)){alert("\u8bf7\u6b63\u786e\u8f93\u5165\u60a8\u7684QQ\u53f7~")}else{$.ajax({type:"GET",url:"http://u.n8n8.cn/User/?m=Api&a=chekqq",dataType:"jsonp",data:"qq="+Q,success:function(T){var S=T.code;var U=T.msg;if(S==1){JZLoginPopup.close();alert("QQ\u9a8c\u8bc1\u90ae\u4ef6\u5df2\u53d1\u9001\u5230\u60a8\u7684QQ\u90ae\u7bb1\uff0c\u8bf7\u5c3d\u5feb\u53bb\u70b9\u51fb\u90ae\u4ef6\u94fe\u63a5\u8fdb\u884c\u6fc0\u6d3b\uff01")}else{alert(U)}}})}});$(".JZLogin-close-btn").live("click",function(){JZLoginPopup.close()});$(".JZLogin-mobiLog-btn").live("click",function(){JZLoginPopup.open({container:"JZLoginMobiLogBox",overlay:true});$("#JZLoginMobiLog-username").focus();return false});$(".JZLogin-mobiReg-btn").live("click",function(){JZLoginPopup.open({container:"JZLoginMobiRegBox",overlay:true});return false});$(".JZLogin-mobiVer-btn").live("click",function(){JZLoginPopup.open({container:"JZLoginMobiVerBox",overlay:true});return false});JZLoginShow=function(){};JZLoginShow.mobiLog=function(){if(jzLoginNoMobi==2){JZLoginPopup.open({container:"JZLoginMobiLogBox",overlay:true});$("#JZLoginMobiLog-username").focus();return false}};JZLoginShow.mobiLogVer=function(){if(jzLoginNoMobi==2){JZLoginPopup.open({container:"JZLoginMobiLogBox",overlay:true});return false}else{if(jzLoginNoMobi==0){JZLoginPopup.open({container:"JZLoginMobiVerBox",overlay:true});return false}else{return}}};$(".JZLogin-mobiLogVer-btn").live("click",function(Q){Q=Q||window.event;Q.preventDefault();JZLoginShow.mobiLogVer();$("#JZLoginPopupBox input:first").focus()});JZLoginShow.allLogVer=function(R,S,Q){if(R&&jzLoginNoMobi==2){JZLoginPopup.open({container:"JZLoginMobiLogBox",overlay:true});return false}else{if(S&&jzLoginNoMobi==0){JZLoginPopup.open({container:"JZLoginMobiVerBox",overlay:true});return false}else{if(Q){JZLoginPopup.open({container:"JZLoginQQVerBox",overlay:true});return false}else{return}}}};$(".JZLogin-mobiVerPop-btn").live("click",function(Q){Q.preventDefault();JZLoginShow.allLogVer(0,1,0);$("#JZLoginPopupBox input:first").focus()});$(".JZLogin-qqVerPop-btn").live("click",function(Q){Q.preventDefault();JZLoginShow.allLogVer(0,0,1);$("#JZLoginPopupBox input:first").focus()})});
	
	module.exports = JZLoginPopup;
});