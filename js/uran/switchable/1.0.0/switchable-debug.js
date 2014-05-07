define("uran/switchable/1.0.0/switchable-debug", ["$-debug", "lib/widget/1.0.2/widget-debug", "lib/base/1.0.1/base-debug", "lib/class/1.0.0/class-debug", "lib/events/1.0.0/events-debug"], function(require, exports, module) {

    var $ = require('$-debug');
    var Widget = require('lib/widget/1.0.2/widget-debug');

    var Switchable = Widget.extend({
        attrs: {
            triggerClass: 'trigger',
            panelClass: 'panel',
            activeTriggerClass: 'trigger-active',
            multiple: false
        },
        setup: function(){
            var that = this
            that.set('triggers', that.$('.' + that.get('triggerClass')))
            that.set('panels', that.$('.' + that.get('panelClass')))
            that.get('triggers').each(function(idx, el){
                el = $(el)
                el.attr('data-idx', idx)
                if(el.hasClass(that.get('activeTriggerClass'))){
                    that.set('activeIdx', idx)
                }
            })
            
        },
        events: {
            'click .{{attrs.triggerClass}}': '_switchTo'
        },
        switchTo: function(idx){
            var that = this
            if(that.get('multiple')){
                that._toggle(idx)
                if(that.get('triggers').eq(idx).hasClass(this.get('activeTriggerClass'))){
                    that.trigger('switched', idx)
                }
            }else{
                if(that.get('activeIdx') != idx){
                    that._toggle(that.get('activeIdx'))
                    that._toggle(idx)
                    that.set('activeIdx', idx)
                    that.trigger('switched', idx)
                }
            }
        },
        _switchTo: function(ev){
            this.switchTo(ev.currentTarget.getAttribute('data-idx'))
            ev.preventDefault()
        },
        _toggle:function(idx){
            var that = this
            that.get('triggers').eq(idx).toggleClass(that.get('activeTriggerClass'))
            that.get('panels').eq(idx).toggle()
        }
    });
    
    module.exports = Switchable;
});

