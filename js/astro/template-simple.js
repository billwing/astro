define("/js/astro/template-simple", ["$", "confirmbox"], function(require, exports, module) {

    // Template
    // -----------
    // JS组件功能

    var $ = require('$');

    var Confirmbox = require('confirmbox');

    module.exports = {

        init: function() {
            this._bindTriggers();
        },

        _bindTriggers: function() {
            var that = this;

            trigger.on('click', function() {
                that.template();
            });

        },

        template: function() {
            var that = this;

        }
    }

    // Helpers
    // -------

});
