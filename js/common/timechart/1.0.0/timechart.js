(function () {
    // timeChart
    var timeChart = {};
    // util help
    function timeChartHelper() { }
    // Array each
    Array.prototype.each = function (func, startIndex, endIndex) {
        startIndex = startIndex || 0;
        endIndex = endIndex || this.length - 1;
        for (var i = startIndex; i <= endIndex; i++) {
            func(this[i], this, i);
            if (this.breakLoop) {
                this.breakLoop = false;
                break;
            }
        }
    };
    timeChartHelper.prototype = {
        isTouchDevice: function () {
            return !!('ontouchstart' in window);
        },
        toMoney: function (val) {
            return val.toFixed(2);
        },
        getOffset: function (e) {
            if (!isNaN(e.offsetX) && !isNaN(e.offsetY)) return e;
            var target = e.target;
            if (target.offsetLeft == undefined) {
                target = target.parentNode;
            }
            var pageCoord = getPageCoord(target);
            //计算鼠标位置（触发元素与窗口的距离）
            var eventCoord =
            {
                x: window.pageXOffset + e.clientX,
                y: window.pageYOffset + e.clientY
            };
            var offset =
            {
                offsetX: eventCoord.x - pageCoord.x,
                offsetY: eventCoord.y - pageCoord.y
            };
            return offset;
        },
        getPageCoord: function (element) {
            var coord = { x: 0, y: 0 };
            while (element) {
                coord.x += element.offsetLeft;
                coord.y += element.offsetTop;
                element = element.offsetParent;
            }
            return coord;
        },
        addEvent: function (elm, evType, fn, useCapture) {
            if (elm.addEventListener) {
                elm.addEventListener(evType, fn, useCapture);
                return true;
            }
            else if (elm.attachEvent) {
                var r = elm.attachEvent('on' + evType, fn);
                return r;
            }
            else {
                elm['on' + evType] = fn;
            }
        },
        $id: function (id) { return document.getElementById(id); }
    };
    timeChart.extendObject = function (src, dest) {
        for (var f in src) {
            dest[f] = src[f];
        }
    };
    timeChart.extendWindow = function (src) {
        timeChart.extendObject(src, window);
    };
    var TCHelper = new timeChartHelper();
    timeChart.extendWindow(TCHelper);

    // Painter
    timeChart.Painter = function(canvasId, paintImplement, data) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas.getContext) return;
        this.ctx = this.canvas.getContext('2d');
        this.data = data;
        this.paintImplement = paintImplement;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    };
    timeChart.Painter.prototype = {
        paint: function () {
            var pctx = this.paintImplement;
            var data = this.data;
            var ctx = this.ctx;
            if (typeof pctx.initialize == 'function') pctx.initialize(this);
            if (pctx.start) pctx.start.call(this);

            if (typeof pctx.paintItems == 'function') {
                pctx.paintItems.call(this);
            }
            else {
                var dataLength = ((typeof pctx.getDataLength == 'function') ? pctx.getDataLength.call(this) : this.data.length);
                for (var i = 0; i < dataLength; i++) {
                    var x = pctx.getX ? pctx.getX.call(this, i) : undefined;
                    var y = pctx.getY ? pctx.getY.call(this, i) : undefined;
                    pctx.paintItem.call(this, i, x, y);
                }
            }
            if (pctx.end) pctx.end.call(this);
        }
    };

    // crossLines
    timeChart.crossLines = function(options) {
        this.updateOptions(options);
    };
    timeChart.crossLines.prototype = {
        updateOptions: function (options) {
            this.canvas = options.canvas;
            this.canvasId = this.canvas.id;
            this.horizontalDivId = this.canvasId + '_crossLines_H';
            this.verticalDivId = this.canvasId + '_crossLines_V';
            this.verticalRange = options.verticalRange || { y1: 0, y2: this.canvas.height };
            this.horizontalRange = options.horizontalRange || { x1: 0, x2: this.canvas.width };
            this.canvasPosition = getPageCoord(this.canvas);
            this.crossPoint = options.crossPoint;
            this.color = options.color || 'black';
        },
        removeCrossLines: function () {
            var canvas = this.canvas;
            var canvasId = canvas.id;
            var horizontalDivId = canvasId + '_crossLines_H';
            var verticalDivId = canvasId + '_crossLines_V';
            var lineX = $id(horizontalDivId);
            if (lineX) lineX.style.display = 'none';
            var lineY = $id(verticalDivId);
            if (lineY) lineY.style.display = 'none';
        },
        getHLine: function () {
            return $id(this.horizontalDivId);
        },
        getVLine: function () {
            return $id(this.verticalDivId);
        },
        setMouseEvents: function (evtForHLine, evtForVLine) {
            this.hLineMouseEvt = evtForHLine;
            this.vLineMouseEvt = evtForVLine;
        },
        updateCrossPoint: function (point) {
            this.crossPoint = point;
            this.drawCrossLines();
        },
        drawCrossLines: function () {
            var canvas = this.canvas;
            var canvasId = this.canvas.id;
            var horizontalDivId = canvasId + '_crossLines_H';
            var verticalDivId = canvasId + '_crossLines_V';
            var vertialRange = this.verticalRange || { y1: 0, y2: canvas.height };
            var horizontalRange = this.horizontalRange || { x1: 0, x2: canvas.width };
            var canvasPosition = this.canvasPosition;

            //判断是否超出水平和垂直范围，如果超出范围则要隐藏线
            if (this.crossPoint.x < horizontalRange.x1
                || this.crossPoint.x > horizontalRange.x2
                || this.crossPoint.y < vertialRange.y1
                || this.crossPoint.y > vertialRange.y2) {
                this.removeCrossLines();
                return;
            }

            var zIndex = (canvas.style.zIndex || 1) + 1;
            //画水平线
            var exists = false;
            var hLine;
            if ($id(horizontalDivId)) {
                exists = true;
                hLine = $id(horizontalDivId);
            } else {
                hLine = document.createElement('DIV');
                hLine.id = horizontalDivId;
            }
            hLine.style.display = 'block';
            hLine.style.position = 'absolute';
            hLine.style.width = Math.round(horizontalRange.x2 - horizontalRange.x1) + 'px';
            hLine.style.height = '1px';
            hLine.style.left = Math.round(canvasPosition.x + horizontalRange.x1) + 'px';
            hLine.style.top = Math.round(this.crossPoint.y + canvasPosition.y) + 'px';
            hLine.style.backgroundColor = this.color;
            hLine.style.zIndex = zIndex;
            if (!exists) {
                document.body.appendChild(hLine);
                if (typeof this.hLineMouseEvt == 'function') {
                    addEvent(hLine, 'mouseover', this.hLineMouseEvt);
                    addEvent(hLine, 'mousemove', this.hLineMouseEvt);
                }
            }

            //画垂直线
            exists = false;
            var vLine;
            if ($id(verticalDivId)) {
                exists = true;
                vLine = $id(verticalDivId);
            } else {
                vLine = document.createElement('DIV');
                vLine.id = verticalDivId;
            }

            vLine.style.display = 'block';
            vLine.style.position = 'absolute';
            vLine.style.height = Math.round(vertialRange.y2 - vertialRange.y1) + 'px';
            vLine.style.width = '1px';
            vLine.style.left = Math.round(this.crossPoint.x + canvasPosition.x) + 'px';
            vLine.style.top = Math.round(vertialRange.y1 + canvasPosition.y) + 'px';
            vLine.style.backgroundColor = this.color;
            vLine.style.index = zIndex;
            if (!exists) {
                document.body.appendChild(vLine);
                if (typeof this.vLineMouseEvt == 'function') {
                    addEvent(vLine, 'mouseover', this.vLineMouseEvt);
                    addEvent(vLine, 'mousemove', this.vLineMouseEvt);
                }
            }
        }
    };

    // xAxis
    timeChart.xAxis = function(options){
      this.options = options;
    };
    timeChart.xAxis.prototype = {
        initialize: function (painter) { painter.options = this.options; },
        start: function () {
            var ctx = this.ctx;
            ctx.save();
            ctx.fillStyle = this.options.color;
            ctx.font = this.options.font;
            if (this.options.textBaseline) ctx.textBaseline = this.options.textBaseline;
            ctx.translate(this.options.region.x, this.options.region.y);
        },
        getY: function () { return 0; },
        getX: function (i) {
            if (i == 0) return 0;
            var w = this.ctx.measureText(this.data[i]).width;
            if (i == this.data.length - 1) return this.options.region.width - w;
            return (this.options.region.width * i / (this.data.length - 1)) - w / 2;
        },
        paintItem: function (i, x, y) {
            this.ctx.fillText(this.data[i], x, y);
        },
        end: function () {
            this.ctx.restore();
        }
    };

    // yAxis
    timeChart.yAxis = function(scalerOptions) {
      this.scalerOptions = scalerOptions;
    };
    timeChart.yAxis.prototype = {
        initialize: function (painter) {
            painter.scalerOptions = this.scalerOptions;
        },
        start: function () {
            var ctx = this.ctx;
            ctx.save();
            if (typeof this.scalerOptions.color == 'string') ctx.fillStyle = this.scalerOptions.color;
            ctx.font = this.scalerOptions.font;
            ctx.translate(this.scalerOptions.region.x, this.scalerOptions.region.y);
            if (this.scalerOptions.textBaseline) ctx.textBaseline = this.scalerOptions.textBaseline;
        },
        end: function () { this.ctx.restore(); },
        getX: function (i) {
            if (this.scalerOptions.align == 'left') return 0;

            var w = this.ctx.measureText(this.data[i]).width;
            return this.scalerOptions.region.width - w;
        },
        getY: function (i) {
            if (i == 0) return 0;
            if (i == this.data.length-1) return this.scalerOptions.region.height - this.scalerOptions.fontHeight;
            return (this.scalerOptions.region.height * i / (this.data.length - 1) - this.scalerOptions.fontHeight / 2);
        },
        paintItem: function (i, x, y) {
            if (typeof this.scalerOptions.color == 'function')
                this.ctx.fillStyle = this.scalerOptions.color(this.data[i]);
            this.ctx.fillText(this.data[i], x, y);
        }
    };

    // linePainter
    timeChart.linePainter = function(options){
        this.options = options;
    };
    timeChart.linePainter.prototype = {
        initialize:function(absPainter){
          absPainter.options  = this.options;
        },
        getDataLength:function(){return this.options.getDataLength.call(this);},
        getX: function (i) {
            return (i + 1) * (this.options.region.width / this.options.maxDotsCount);
        },
        start: function () {
            var ctx = this.ctx;
            var options = this.options;
            var region = options.region;
            ctx.save();
            //转换坐标
            ctx.translate(region.x, region.y + region.height / 2);

            var maxDiff = 0;
            var me = this;
            
            this.data.items.each(function (item) {
                var diff = Math.abs(options.middleValue - options.getItemValue(item));
                maxDiff = Math.max(diff, maxDiff);
            });

            this.maxDiff = maxDiff;
            ctx.beginPath();
            ctx.strokeStyle = options.lineColor;
        },
        end: function () {
            this.ctx.stroke();
            this.ctx.restore();
        },
        getY: function (i) {
            var options = this.options; 
            var diff =options.getItemValue(this.data.items[i]) - options.middleValue;
            return 0 - diff * options.region.height / 2 / this.maxDiff; 
        },
        paintItem: function (i, x, y) {
            var ctx = this.ctx;

            if (i == 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
    };

    // crossLinesAndTipMgr
    timeChart.crossLinesAndTipMgr = function(canvas, options) {
        if (typeof timeChart.Tip != 'function') {
            timeChart.Tip = function () { };
            timeChart.Tip.prototype = { show: function () { }, hide: function () { }, update: function () { } };
        }
        this.canvas = canvas;
        this.options = options;
    }
    timeChart.crossLinesAndTipMgr.prototype._removeTipAndCrossLines = function () {
        var me = this;
        if (me.tip) me.tip.hide();
        if (me.clsMgr) me.clsMgr.removeCrossLines();
    };
    timeChart.crossLinesAndTipMgr.prototype._onMouseOrTouchMove = function (ev) {
        ev = ev || event;
        ev = getOffset(ev);
        var me = this;
        var options = me.options;
        var canvas = me.canvas;
        var canvasPosition = getPageCoord(canvas);
        var range = options.triggerEventRanges;

        //判断是否在范围之内，如果不在范围之内则移去十字线和tip
        if (ev.offsetX < range.x || ev.offsetX > range.x + range.width
                || ev.offsetY < range.y || ev.offsetY > range.y + range.height) {
            me._removeTipAndCrossLines();
            return;
        }

        var crossPoint = options.getCrossPoint(ev);
        //添加鼠标和触摸Event
        var crossLinesOptions = {
            crossPoint: crossPoint,
            verticalRange: { y1: range.y, y2: range.y + range.height },
            horizontalRange: { x1: range.x, x2: range.x + range.width },
            color: options.crossLineOptions.color,
            canvas: canvas
        };
        if (!me.clsMgr) {
            var clsMgr = new timeChart.crossLines(crossLinesOptions);
            clsMgr.setMouseEvents(function (evHLine) {
                evHLine = evHLine || event;
                evHLine = getOffset(evHLine);
                var translatedEv = { offsetX: evHLine.offsetX + range.x, offsetY: parseInt(me.clsMgr.getHLine().style.top) - canvasPosition.y };
                var point = options.getCrossPoint(translatedEv);
                clsMgr.updateCrossPoint(point);
                if (me.tip) {
                    me.tip.update(point, options.tipOptions.getTipHtml(translatedEv));
                }
            }, function (evl) {
                evl = evl || event;
                evl = getOffset(evl);
                var translatedEv = { offsetX: parseInt(me.clsMgr.getVLine().style.left) - canvasPosition.x, offsetY: evl.offsetY + range.y };
                var point = options.getCrossPoint(translatedEv);
                clsMgr.updateCrossPoint(point);
                if (me.tip) {
                    me.tip.update(point, options.tipOptions.getTipHtml(translatedEv));
                }
            });

            me.clsMgr = clsMgr;
        } else {
            me.clsMgr.updateOptions(crossLinesOptions);
        }
        me.clsMgr.drawCrossLines();
        if (options.tipOptions) {
            var tipOp = options.tipOptions;
            if (!me.tip) {
                //tip设置
                var tip = new timeChart.Tip({
                    position: { x: tipOp.position.x || false, y: tipOp.position.y || false }, //position中的值是相对于canvas的左上角的
                    size: tipOp.size,
                    opacity: tipOp.opacity || 80,
                    cssClass: tipOp.cssClass,
                    offsetToPoint: tipOp.offsetToPoint || 30,
                    relativePoint: { x: crossPoint.x, y: crossPoint.y },
                    canvas: canvas,
                    canvasRange: options.triggerEventRanges,
                    innerHTML: tipOp.getTipHtml(ev)
                });
                me.tip = tip;
            }

            me.tip.show(crossPoint, tipOp.getTipHtml(ev));
        }
    };
    timeChart.crossLinesAndTipMgr.prototype._mouseout = function (ev) {
        var e = ev || event;
        ev = getOffset(e);
        var me = this;
        var range = me.options.triggerEventRanges;
        //判断是否在范围之内，如果不在范围之内则移去十字线和tip
        if (ev.offsetX <= range.x || ev.offsetX >= range.x + range.width
                || ev.offsetY <= range.y || ev.offsetY >= range.y + range.height) {
            me._removeTipAndCrossLines();
            return;
        }

        var toEle = e.toElement || e.relatedTarget || e.target;
        
        if (toEle) {
            if (toEle == me.canvas) return;
            if (toEle == me.clsMgr.getHLine() || toEle == me.clsMgr.getVLine()) return;
            me._removeTipAndCrossLines();
        }
    };
    timeChart.crossLinesAndTipMgr.prototype.addCrossLinesAndTipEvents = function () {
        var canvas = this.canvas;
        var options = this.options;
        var canvasPosition = getPageCoord(canvas);
        if (canvas.addCrossLinesAndTipEvents == true) return;
        canvas.addCrossLinesAndTipEvents = true;

        var touchable = isTouchDevice();
        var me = this;
        if (touchable) {
            addEvent(canvas, 'touchstart', function (ev) { me._touchstart.call(me, ev); });

            addEvent(canvas, 'touchmove', function (ev) { me._touchmove.call(me, ev); });

            addEvent(canvas, 'touchend', function (ev) { me._touchend.call(me, ev); });
        }
        else {
            addEvent(canvas, 'mouseout', function (ev) { me._mouseout.call(me, ev); });

            addEvent(canvas, 'mousemove', function (ev) { me._onMouseOrTouchMove.call(me, ev); });

            if (typeof options.onClick == 'function') {
                addEvent(canvas, 'click', options.onClick);
            }
        }
    };
    timeChart.addCrossLinesAndTipEvents = function(canvas, options) { 
        if(!canvas.crossLineAndTipMgrInstance){
            canvas.crossLineAndTipMgrInstance = new timeChart.crossLinesAndTipMgr(canvas, options);
            canvas.crossLineAndTipMgrInstance.addCrossLinesAndTipEvents();
        }
    }

    // timeFormat
    timeChart.timeFormat = function(ts) {
        var nowDate = new Date(ts);
        var year = nowDate.getFullYear();
        var mon = nowDate.getMonth() + 1;
        var day = nowDate.getDate();
        var hour = nowDate.getHours();
        var min = nowDate.getMinutes();
        var sec = nowDate.getSeconds();
        
        // toTwoDigit
        mon = mon < 10 ? '0' + mon : mon;
        day = day < 10 ? '0' + day : day;
        hour = hour < 10 ? '0' + hour : hour;
        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;

        return year + mon + day + hour + min + sec;
    };

    // line
    timeChart.line = function(ctx, x0, y0, x1, y1, color, width, dash) {
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = color;
        ctx.lineWidth = width || 1;
        ctx.stroke();
        //ctx.setLineDash([dash || 0]);
    };

    // minsTime
    timeChart.getMinTime = function(minIndex) {
        //上午09：30-11：30
        //下午13：00-15：00
        var d = new Date();
        if (minIndex <= 120) {
            d.setHours(9, 30, 30);
            d = new Date(d.getTime() + (minIndex) * 60 * 1000);
        } else {
            d.setHours(13, 0, 0);
            d = new Date(d.getTime() + (minIndex - 120) * 60 * 1000);
        }

        var hour = d.getHours() > 9 ? new String(d.getHours()) : '0' + d.getHours();
        var minutes = d.getMinutes() > 9 ? new String(d.getMinutes()) : '0' + d.getMinutes();
        var seconds = '30';
        return hour + '' + minutes + seconds;
    };

    // Tip
    timeChart.Tip = function(options) {
        this.options = options;
        this.canvas = options.canvas;
        this.canvas.tip = this;
    };
    timeChart.Tip.prototype = {
        show: function (relativePoint, html) {
            var dc = this.dataContext;
            var painter = this.canvas.painter;
            if (dc) {
                if (dc.isNewQuote) painter.fillTopText(dc.data);
                else painter.fillTopText(dc.data, dc.index);
            }
        },
        update: function (relativePoint, html) {
            this.show(relativePoint, html);
        },
        hide: function () {
            var dc = this.dataContext;
            var painter = this.canvas.painter;
            if (dc) {
                painter.fillTopText(dc.data);
            }
        }
    };

    // minsChart
    timeChart.minsChart = function(canvasId, options) {
        timeChart.extendObject(options, this);
        this.canvas = $id(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.painter = this;
    };
    timeChart.minsChart.prototype = {

        paint: function (data) {
            this.fillTopText(data);
            this.paintChart(data);
            this.paintxAxis();
        },

        paintxAxis: function () {
            var xAxisImpl = new timeChart.xAxis(this.xScaler);
            var xAxisPainter = new timeChart.Painter(this.canvas.id, xAxisImpl, this.xScaler.data);
            xAxisPainter.paint();
        },

        paintChart: function (data) {
            var minsChartOptions = this.minsChart;
            var region = this.minsChart.region;
            var ctx = this.ctx;
            ctx.beginPath();
            ctx.strokeStyle = minsChartOptions.borderColor;
            ctx.rect(region.x, region.y, region.width, region.height);
            ctx.stroke();

            //水平线
            var middleIndex = (this.minsChart.horizontalLineCount + this.minsChart.horizontalLineCount % 2) / 2;
            var splitCount = this.minsChart.horizontalLineCount + 1;
            for (var i = 1; i <= this.minsChart.horizontalLineCount; i++) {
                var color = (i == middleIndex ? minsChartOptions.middleLineColor : minsChartOptions.otherSplitLineColor);
                var y = region.y + region.height * i / splitCount;
                timeChart.line(ctx, region.x, y, region.x + region.width, y, color);
            }
            //垂直线 
            splitCount = this.minsChart.verticalLineCount + 1;
            for (var i = 1; i <= this.minsChart.verticalLineCount; i++) {
                var x = region.x + region.width * i / splitCount;
                timeChart.line(ctx, x, region.y, x, region.y + region.height, minsChartOptions.otherSplitLineColor);
            }

            //价格线
            var lineOptions = {
                region: region,
                maxDotsCount: this.maxDotsCount,
                getDataLength: function () { return this.data.items.length; },
                getItemValue: function (item) { return item.price; },
                middleValue: data.quote.preClose, //通常是昨收
                lineColor: minsChartOptions.priceLineColor
            };
            var linePainterImp = new timeChart.linePainter(lineOptions);
            var priceLinePainter = new timeChart.Painter(this.canvas.id, linePainterImp, { items: data.mins });
            priceLinePainter.paint();

            //y轴
            var yOptions = this.minsChart.yScalerRight;
            var preClose = data.quote.preClose;
            var me = this;
            yOptions.color = function (val) {
                return val > preClose ? me.riseColor : (val == preClose ? me.normalColor : me.fallColor);
            };
            var scalersLeft = [];
            var min = preClose - priceLinePainter.maxDiff;
            var space = priceLinePainter.maxDiff * 2 / (this.minsChart.horizontalLineCount + 1);
            for (var i = this.minsChart.horizontalLineCount + 1; i >= 0; i--) {
                var val = min + i * space;
                scalersLeft.push(val.toFixed(2));
            }
            var yx = new timeChart.yAxis(yOptions);
            var yAxisPainter = new timeChart.Painter(this.canvas.id, yx, scalersLeft);
            yAxisPainter.paint();

            //均线
            if (this.needPaintAvgPriceLine) {
                //生成移动均线数据
                var items = [];
                var totalVolume = 0;
                var totalAmount = 0;
                data.mins.each(function (item) {
                    totalVolume += item.volume;
                    totalAmount += item.amount;
                    items.push(totalAmount / totalVolume);
                });
                lineOptions.lineColor = minsChartOptions.avgPriceLineColor;
                lineOptions.getItemValue = function (item) { return item; };
                linePainterImp = new timeChart.linePainter(lineOptions);
                var painterAvg = new timeChart.Painter(this.canvas.id, linePainterImp, { items: items });
                painterAvg.paint();
            }

            var me = this;
            var chartRegion = me.minsChart.region;

            function getY(x) {
                var index = Math.ceil((x - me.minsChart.region.x) * me.maxDotsCount / me.minsChart.region.width);
                var val;
                var isNewQuote;
                if (index >= 0 && index < data.mins.length) {
                    val = data.mins[index].price;
                    isNewQuote = false;
                } else {
                    val = data.quote.price;
                    isNewQuote = true;
                }

                if (me.canvas.tip) me.canvas.tip.dataContext = { data: data, isNewQuote: isNewQuote, index: index };
                var diff = val - preClose;
                var middleY = (me.minsChart.region.y + me.minsChart.region.height / 2);
                return middleY - diff * me.minsChart.region.height / 2 / priceLinePainter.maxDiff;
            }

            //添加鼠标事件
            timeChart.addCrossLinesAndTipEvents(this.canvas, {
                getCrossPoint: function (ev) { return { x: ev.offsetX, y: getY(ev.offsetX) }; },
                triggerEventRanges: { x: chartRegion.x, y: chartRegion.y, width: chartRegion.width, height: chartRegion.height },
                tipOptions: {
                    getTipHtml: function (ev) { return null; },
                    position: { x: false, y: false }
                },
                crossLineOptions: {
                    color: '#e70000'
                }
            });
        },

        fillTopText: function (data, minIndex) {
            var quote = data.quote;
            var sName = data.stock.name;
            var quoteTime = timeChart.timeFormat(quote.time);
            var ctx = this.ctx;
            var topText = this.topText;
            var region = topText.region;
            ctx.clearRect(region.x, region.y, region.width, region.height);
            var price;
            var time;
            if (typeof minIndex == 'undefined') {
                price = quote.price;
                time = quoteTime;
            } else {
                price = data.mins[minIndex].price;
                time = quoteTime.toString().substr(0, 8) + timeChart.getMinTime(minIndex);
            }

            ctx.fillStyle = topText.color;
            ctx.font = topText.font;
            if (topText.textBaseline) ctx.textBaseline = topText.textBaseline;
            var txt = sName + ' ';
            var width = ctx.measureText(txt).width;
            ctx.fillText(txt, topText.region.x, topText.region.y);

            var isRise = price > quote.preClose;
            var isEqual = price == quote.preClose;
            var isFall = price < quote.preClose;
            var diff = toMoney(price - quote.preClose);
            var txtRiseFall = toMoney(price) + (isRise ? '↑' : (isFall ? '↓' : '')) + diff + ('(') + toMoney(diff * 100 / quote.preClose) + '%)';

            var x = topText.region.x + width;
            ctx.fillStyle = isRise ? this.riseColor : (isFall ? this.fallColor : this.normalColor);
            ctx.fillText(txtRiseFall, x, topText.region.y);

            var temp = new String(time);
            var txtTime = temp.charAt(8) + temp.charAt(9) + ':' + temp.charAt(10) + temp.charAt(11);
            ctx.fillStyle = topText.color;
            var timeWidth = ctx.measureText(txtTime).width;
            ctx.fillText(txtTime, topText.region.x + topText.region.width - timeWidth, topText.region.y);
        }
    };

    var newTimeChart = new timeChart.minsChart('canvas', {
        fallColor: 'green', riseColor: 'red', normalColor: 'black', maxDotsCount: 241, needPaintAvgPriceLine: false,
        backgroundColor:'white',
        topText: { font: '12px 宋体', color: 'black', region: { x: 8.5, y: 5.5, width: 235, height: 14 }, textBaseline: 'top' },
        minsChart: {
            region: { x: 6.5, y: 21.5, width: 240, height: 130 },
            priceLineColor: '#e70000', avgPriceLineColor: 'red', middleLineColor: '#999', otherSplitLineColor: '#e0e0e0', borderColor: '#7b7d7b',
            horizontalLineCount: 7, verticalLineCount: 3,
            yScalerLeft: { font: '12px Arial', region: { x: .5, y: 20, width: .5, height: 130 }, align: 'right', fontHeight: 9, textBaseline: 'top' },
            yScalerRight: { font: '12px Arial', region: { x: 248.5, y: 20, width: 50.5, height: 130 }, align: 'right', fontHeight: 9, textBaseline: 'top' }
        },
        xScaler: {
            font: '12px Arial', color: 'black',
            region: { x: 6.5, y: 155, width: 240, height: 20 },
            data: ['09:30', '10:30', '11:30/13:00', '14:00', '15:00']
        }
    });

    // createScript
    var createScript = function(callUrl, callFunc) {
        var scriptEle = document.createElement('script');
        scriptEle.type = 'text/javascript';
        scriptEle.src = callUrl;
        var scriptDom = document.getElementsByTagName('script')[0];
        scriptDom.parentNode.insertBefore(scriptEle, scriptDom);
        callFunc && callFunc();
    }
    createScript('http://test.cn/mins-data.json?callback=getTimeChart', function() {
        getTimeChart = function(data) {
            if(data.mins) {
                newTimeChart.paint(data);
            } else {
                alert('数据请求失败，请您稍后再试~')
            }
        }
    });

    // Expose timeChart to the global object
    //window.timeChart = timeChart;

    if ( typeof define === "function"  ) {
        define("common/timechart/1.0.0/timechart", [], function () { return timeChart; } );
    }

})();
