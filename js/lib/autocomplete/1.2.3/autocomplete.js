define("lib/autocomplete/1.2.3/autocomplete",["$","lib/overlay/1.1.1/overlay","lib/position/1.0.1/position","lib/iframe-shim/1.0.2/iframe-shim","lib/widget/1.1.1/widget","lib/base/1.1.1/base","lib/class/1.1.0/class","lib/events/1.1.0/events","lib/templatable/0.9.1/templatable","gallery/handlebars/1.0.2/handlebars","./data-source","./filter","./autocomplete.handlebars"],function(a,b,c){function d(a){return"[object String]"===Object.prototype.toString.call(a)}function e(a,b){if(!a)return b;if(g.isFunction(a))return a.call(this,b);if(d(a)){for(var c=a.split("."),e=b;c.length;){var f=c.shift();if(!e[f])break;e=e[f]}return e}return b}function f(a,b){var c=this.highlightIndex,d=0,e=b||this.matchKey||"",f="";if(g.isArray(c)){for(var h=0,i=c.length;i>h;h++){var j,k,l=c[h];if(g.isArray(l)?(j=l[0],k=l[1]-l[0]):(j=l,k=1),j>d&&(f+=e.substring(d,j)),j<e.length&&(f+='<span class="'+a+'-item-hl">'+e.substr(j,k)+"</span>"),d=j+k,d>=e.length)break}return e.length>d&&(f+=e.substring(d,e.length)),f}return e}var g=a("$"),h=a("lib/overlay/1.1.1/overlay"),i=a("lib/templatable/0.9.1/templatable"),j=a("./data-source"),k=a("./filter"),l=a("./autocomplete.handlebars"),m=-1!==(window.navigator.userAgent||"").toLowerCase().indexOf("msie"),n={UP:38,DOWN:40,LEFT:37,RIGHT:39,ENTER:13,ESC:27,BACKSPACE:8},o=h.extend({Implements:i,attrs:{trigger:{value:null,getter:function(a){return g(a)}},classPrefix:"ui-autocomplete",align:{baseXY:[0,"100%"]},template:l,submitOnEnter:!0,selectItem:!0,dataSource:[],locator:"data",filter:void 0,inputFilter:function(a){return a},disabled:!1,selectFirst:!1,delay:100,selectedIndex:void 0,inputValue:null,data:null},events:{"mousedown [data-role=item]":function(a){var b=this.items.index(a.currentTarget);this.set("selectedIndex",b),this.get("selectItem")&&(this.selectItem(),this._firstMousedown=!0)},mousedown:function(){this._secondMousedown=!0},"click [data-role=item]":function(){this.get("selectItem")||this.hide()},"mouseenter [data-role=item]":function(a){var b=this.get("classPrefix")+"-item-hover";this.currentItem&&this.currentItem.removeClass(b),g(a.currentTarget).addClass(b)},"mouseleave [data-role=item]":function(a){var b=this.get("classPrefix")+"-item-hover";g(a.currentTarget).removeClass(b)}},templateHelpers:{highlightItem:f},parseElement:function(){this.set("model",{classPrefix:this.get("classPrefix"),items:[]}),o.superclass.parseElement.call(this)},setup:function(){var a=this.get("trigger"),b=this;o.superclass.setup.call(this),this.dataSource=new j({source:this.get("dataSource")}).on("data",this._filterData,this),this._initFilter(),this._blurHide([a]),this._tweakAlignDefaultValue(),a.attr("autocomplete","off"),this.delegateEvents(a,"blur.autocomplete",g.proxy(this._blurEvent,this)),this.delegateEvents(a,"keydown.autocomplete",g.proxy(this._keydownEvent,this)),this.delegateEvents(a,"keyup.autocomplete",function(){clearTimeout(b._timeout),b._timeout=setTimeout(function(){b._timeout=null,b._keyupEvent.call(b)},b.get("delay"))})},destroy:function(){this._clear(),this.element.remove(),o.superclass.destroy.call(this)},hide:function(){this._timeout&&clearTimeout(this._timeout),this.dataSource.abort(),o.superclass.hide.call(this)},selectItem:function(){this.hide();var a=this.currentItem,b=this.get("selectedIndex"),c=this.get("data")[b];if(a){var d=a.attr("data-value");this.get("trigger").val(d),this.set("inputValue",d,{silent:!0}),this.trigger("itemSelect",c),this._clear()}},setInputValue:function(a){if(this.get("inputValue")!==a){this._start=!0,this.set("inputValue",a);var b=this.get("trigger");b.val()!==a&&b.val(a)}},_onRenderInputValue:function(a){if(this._start&&a){var b=this.queryValue;this.queryValue=this.get("inputFilter").call(this,a),this.queryValue&&this.queryValue!==b&&(this.dataSource.abort(),this.dataSource.getData(this.queryValue))}else this.queryValue="";""!==a&&this.queryValue||(this.set("data",[]),this.hide()),delete this._start},_filterData:function(a){var b=this.get("filter"),c=this.get("locator");a=e(c,a),a=b.func.call(this,a,this.queryValue,b.options),this.set("data",a)},_onRenderData:function(a){this._clear(),this.set("model",{items:a}),this.renderPartial("[data-role=items]"),this.items=this.$("[data-role=items]").children(),this.currentItem=null,this.get("selectFirst")&&this.set("selectedIndex",0),g.trim(this.$("[data-role=items]").text())?this.show():this.hide()},_onRenderSelectedIndex:function(a){if(-1!==a){var b=this.get("classPrefix")+"-item-hover";this.currentItem&&this.currentItem.removeClass(b),this.currentItem=this.items.eq(a).addClass(b),this.trigger("indexChange",a,this.lastIndex),this.lastIndex=a;var c=parseInt(this.get("height"));if(c){var d=this.currentItem.parent().height()/this.items.length,e=Math.max(0,d*(a+1)-c);this.element.scrollTop(e)}}},_initFilter:function(){var a=this.get("filter");a=void 0===a?"url"===this.dataSource.get("type")?null:{name:"startsWith",func:k.startsWith,options:{key:"value"}}:g.isPlainObject(a)?k[a.name]?{name:a.name,func:k[a.name],options:a.options}:null:g.isFunction(a)?{func:a}:k[a]?{name:a,func:k[a]}:null,a||(a={name:"default",func:k["default"]}),this.set("filter",a)},_blurEvent:function(){m||(this._secondMousedown?this._firstMousedown&&(this.get("trigger").focus(),this.hide()):this.hide(),delete this._firstMousedown,delete this._secondMousedown)},_keyupEvent:function(){if(!this.get("disabled")&&this._keyupStart){delete this._keyupStart;var a=this.get("trigger").val();this.setInputValue(a)}},_keydownEvent:function(a){if(!this.get("disabled"))switch(delete this._keyupStart,a.which){case n.ESC:this.hide();break;case n.UP:this._keyUp(a);break;case n.DOWN:this._keyDown(a);break;case n.LEFT:case n.RIGHT:break;case n.ENTER:this._keyEnter(a);break;default:this._keyupStart=!0}},_keyUp:function(a){if(a.preventDefault(),this.get("data").length){if(!this.get("visible"))return this.show(),void 0;this._step(-1)}},_keyDown:function(a){if(a.preventDefault(),this.get("data").length){if(!this.get("visible"))return this.show(),void 0;this._step(1)}},_keyEnter:function(a){this.get("visible")&&(this.selectItem(),this.get("submitOnEnter")||a.preventDefault())},_step:function(a){var b=this.get("selectedIndex");-1===a?b>0?this.set("selectedIndex",b-1):this.set("selectedIndex",this.items.length-1):1===a&&(b<this.items.length-1?this.set("selectedIndex",b+1):this.set("selectedIndex",0))},_clear:function(){this.$("[data-role=items]").empty(),this.set("selectedIndex",-1),delete this.items,delete this.lastIndex,delete this.currentItem},_tweakAlignDefaultValue:function(){var a=this.get("align");a.baseElement=this.get("trigger"),this.set("align",a)}});o._filter=k,c.exports=o}),define("lib/autocomplete/1.2.3/data-source",["lib/base/1.1.1/base","lib/class/1.1.0/class","lib/events/1.1.0/events","$"],function(a,b,c){function d(a){return"[object String]"===Object.prototype.toString.call(a)}function e(a){return a.replace(/^([a-z])/,function(a,b){return b.toUpperCase()})}var f=a("lib/base/1.1.1/base"),g=a("$"),h=f.extend({attrs:{source:null,type:"array"},initialize:function(a){h.superclass.initialize.call(this,a),this.id=0,this.callbacks=[];var b=this.get("source");if(d(b))this.set("type","url");else if(g.isArray(b))this.set("type","array");else if(g.isPlainObject(b))this.set("type","object");else{if(!g.isFunction(b))throw new Error("Source Type Error");this.set("type","function")}},getData:function(a){return this["_get"+e(this.get("type")||"")+"Data"](a)},abort:function(){this.callbacks=[]},_done:function(a){this.trigger("data",a)},_getUrlData:function(a){var b,c=this,d={query:a?encodeURIComponent(a):"",timestamp:(new Date).getTime()},e=this.get("source").replace(/{{(.*?)}}/g,function(a,b){return d[b]}),f="callback_"+this.id++;this.callbacks.push(f),b=/^(https?:\/\/)/.test(e)?{dataType:"jsonp"}:{dataType:"json"},g.ajax(e,b).success(function(a){g.inArray(f,c.callbacks)>-1&&(delete c.callbacks[f],c._done(a))}).error(function(){g.inArray(f,c.callbacks)>-1&&(delete c.callbacks[f],c._done({}))})},_getArrayData:function(){var a=this.get("source");return this._done(a),a},_getObjectData:function(){var a=this.get("source");return this._done(a),a},_getFunctionData:function(a){function b(a){c._done(a)}var c=this,d=this.get("source"),e=d.call(this,a,b);e&&this._done(e)}});c.exports=h}),define("lib/autocomplete/1.2.3/filter",["$"],function(a,b,c){function d(a,b){if(g.isPlainObject(a)){var c=b&&b.key||"value";return a[c]||""}return a}function e(a,b){for(var c=[],d=a.split(""),e=0,f=b.split(""),g=0,h=d.length;h>g;g++){var i=d[g];if(i==f[e]){if(e===f.length-1){c.push([g-f.length+1,g+1]),e=0;continue}e++}else e=0}return c}function f(a){return(a||"").replace(i,"\\$1")}var g=a("$"),h={"default":function(a,b,c){var e=[];return g.each(a,function(a,b){var f={},h=d(b,c);g.isPlainObject(b)&&(f=g.extend({},b)),f.matchKey=h,e.push(f)}),e},startsWith:function(a,b,c){var e=[],h=b.length,i=new RegExp("^"+f(b));return h?(g.each(a,function(a,b){var f={},j=d(b,c);g.isPlainObject(b)&&(f=g.extend({},b)),i.test(j)&&(f.matchKey=j,h>0&&(f.highlightIndex=[[0,h]]),e.push(f))}),e):[]},stringMatch:function(a,b,c){b=b||"";var f=[],h=b.length;return h?(g.each(a,function(a,h){var i={},j=d(h,c);g.isPlainObject(h)&&(i=g.extend({},h)),j.indexOf(b)>-1&&(i.matchKey=j,i.highlightIndex=e(j,b),f.push(i))}),f):[]}};c.exports=h;var i=/(\[|\[|\]|\^|\$|\||\(|\)|\{|\}|\+|\*|\?|\\)/g}),define("lib/autocomplete/1.2.3/autocomplete.handlebars",["gallery/handlebars/1.0.2/runtime"],function(a,b,c){var d=a("gallery/handlebars/1.0.2/runtime"),e=d.template;c.exports=e(function(a,b,c,d,e){function f(a,b,d){var e,f,g,h="";return h+='\n            <li data-role="item" class="'+k((e=d.classPrefix,typeof e===j?e.apply(a):e))+'-item" data-value="',(f=c.matchKey)?f=f.call(a,{hash:{},data:b}):(f=a.matchKey,f=typeof f===j?f.apply(a):f),h+=k(f)+'">',g={hash:{},data:b},e=c.highlightItem,f=e?e.call(a,d.classPrefix,a.matchKey,g):l.call(a,"highlightItem",d.classPrefix,a.matchKey,g),(f||0===f)&&(h+=f),h+="</li>\n        "}this.compilerInfo=[3,">= 1.0.0-rc.4"],c=c||{};for(var g in a.helpers)c[g]=c[g]||a.helpers[g];e=e||{};var h,i="",j="function",k=this.escapeExpression,l=c.helperMissing,m=this;return i+='<div class="',(h=c.classPrefix)?h=h.call(b,{hash:{},data:e}):(h=b.classPrefix,h=typeof h===j?h.apply(b):h),i+=k(h)+'">\n    <ul class="',(h=c.classPrefix)?h=h.call(b,{hash:{},data:e}):(h=b.classPrefix,h=typeof h===j?h.apply(b):h),i+=k(h)+'-ctn" data-role="items">\n        ',h=c.each.call(b,b.items,{hash:{},inverse:m.noop,fn:m.programWithDepth(1,f,e,b),data:e}),(h||0===h)&&(i+=h),i+="\n    </ul>\n</div>\n"})});
