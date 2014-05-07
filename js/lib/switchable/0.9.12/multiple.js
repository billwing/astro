define(function(require, exports, module) {

    // 手风琴组件
    module.exports = {

        isNeeded: function() {
            return this.get('multiple');
        },

        methods: {
            switchTo: function(toIndex) {
              this._switchTo(toIndex, toIndex);
            },

            _switchTrigger: function(toIndex) {
                this.triggers.eq(toIndex).toggleClass(this.get('activeTriggerClass'));
            },

            _triggerIsValid: function() {
                // multiple 模式下，再次触发意味着切换展开/收缩状态
                return true;
            },

            _switchPanel: function(panelInfo) {
                panelInfo.toPanels.toggle();
            }
        }
    };

});
