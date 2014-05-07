define("lib/popup/1.1.6/popup",["$","lib/overlay/1.1.4/overlay","lib/position/1.0.1/position","lib/iframe-shim/1.0.2/iframe-shim","lib/widget/1.1.1/widget","lib/base/1.1.1/base","lib/class/1.1.0/class","lib/events/1.1.0/events"],function(a,b,c){function d(a,b,c,d,e){var f=d&&d[0];e.delegateEvents(f?d:b,f?a+" "+b.selector:a,function(a){c.call(a.currentTarget,a)})}var e=a("$"),f=a("lib/overlay/1.1.4/overlay"),g=f.extend({attrs:{trigger:{value:null,getter:function(a){return e(a)}},triggerType:"hover",delegateNode:{value:null,getter:function(a){return e(a)}},align:{value:{baseXY:[0,"100%"],selfXY:[0,0]},setter:function(a){return a?(a.baseElement?this._specifiedBaseElement=!0:this.activeTrigger&&(a.baseElement=this.activeTrigger),a):void 0},getter:function(a){return e.extend({},a,this._specifiedBaseElement?{}:{baseElement:this.activeTrigger})}},delay:70,disabled:!1,effect:"",duration:250},setup:function(){g.superclass.setup.call(this),this._bindTrigger(),this._blurHide(this.get("trigger")),this.activeTrigger=this.get("trigger").eq(0);var a=this;this.get("delegateNode")&&this.before("show",function(){a._relativeElements=a.get("trigger"),a._relativeElements.push(a.element)})},render:function(){return g.superclass.render.call(this),this.element.hide(),this},show:function(){return this.get("disabled")?void 0:g.superclass.show.call(this)},hide:function(a){return a?this:g.superclass.hide.call(this)},_bindTrigger:function(){var a=this.get("triggerType");"click"===a?this._bindClick():"focus"===a?this._bindFocus():this._bindHover()},_bindClick:function(){function a(a){b.get("disabled")||b.get("trigger").each(function(c,d){a==d?(d._active=!0,b.activeTrigger=e(d)):d._active=!1})}var b=this;d("click",this.get("trigger"),function(){this._active===!0?b.hide():(a(this),b.show())},this.get("delegateNode"),this),this.before("hide",function(){a()})},_bindFocus:function(){var a=this;d("focus",this.get("trigger"),function(){a.activeTrigger=e(this),a.show()},this.get("delegateNode"),this),d("blur",this.get("trigger"),function(){setTimeout(function(){!a._downOnElement&&a.hide(),a._downOnElement=!1},a.get("delay"))},this.get("delegateNode"),this),this.delegateEvents("mousedown",function(){this._downOnElement=!0})},_bindHover:function(){function a(){clearTimeout(b),b=null,i.get("visible")&&(c=setTimeout(function(){i.hide()},h))}var b,c,f=this.get("trigger"),g=this.get("delegateNode"),h=this.get("delay"),i=this;return 0>h?(this._bindTooltip(),void 0):(d("mouseenter",f,function(){clearTimeout(c),c=null,i.activeTrigger=e(this),b=setTimeout(function(){i.show()},h)},g,this),d("mouseleave",f,a,g,this),this.delegateEvents("mouseenter",function(){clearTimeout(c)}),this.delegateEvents("mouseleave",a),this.element.on("mouseleave","select",function(a){a.stopPropagation()}),void 0)},_bindTooltip:function(){var a=this.get("trigger"),b=this.get("delegateNode"),c=this;d("mouseenter",a,function(){c.activeTrigger=e(this),c.show()},b,this),d("mouseleave",a,function(){c.hide()},b,this)},_onRenderVisible:function(a,b){if(a!==!!b){var c=-1!==this.get("effect").indexOf("fade"),d=-1!==this.get("effect").indexOf("slide"),e={};d&&(e.height=a?"show":"hide"),c&&(e.opacity=a?"show":"hide");var f=this,g=a?function(){f.trigger("animated")}:function(){f.hide(!0),f.trigger("animated")};c||d?this.element.stop(!0,!0).animate(e,this.get("duration"),g).css({visibility:"visible"}):this.element[a?"show":"hide"]()}}});c.exports=g});
