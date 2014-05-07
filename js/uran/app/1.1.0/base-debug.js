define("uran/app/1.1.0/base-debug", [ "$-debug", "lib/base/1.1.1/base-debug", "lib/class/1.1.0/class-debug", "lib/events/1.1.0/events-debug" ], function(require, exports, module) {
    "use strict";
    var $ = require("$-debug");
    var Base = require("lib/base/1.1.1/base-debug");
    var HandyBase = Base.extend({
        attrs: {
            touchend: $.support.touch ? "touchend" : "click"
        },
        initialize: function(config, parent, root) {
            HandyBase.superclass.initialize.call(this, config);
            this.parent = parent;
            this.root = root || parent && parent.root || parent;
            this.setup && this.setup();
        }
    });
    return HandyBase;
});
