define("gallery/list/0.2.1/list-debug", [], function(require, exports, module) {
    /*
ListJS Beta 0.2.0
By Jonny Strömberg (www.jonnystromberg.com, www.listjs.com)

OBS. The API is not frozen. It MAY change!

License (MIT)

Copyright (c) 2011 Jonny Strömberg http://jonnystromberg.com

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/
    "use strict";
    var document = window.document, h;
    var List = function(id, options, values) {
        var self = this, templater, init, initialItems, Item, Templater, sortButtons, events = {
            updated: []
        };
        this.listContainer = typeof id == "string" ? document.getElementById(id) : id;
        // Check if the container exists. If not return instead of breaking the javascript
        if (!this.listContainer) return;
        this.items = [];
        this.visibleItems = [];
        // These are the items currently visible
        this.matchingItems = [];
        // These are the items currently matching filters and search, regadlessof visible count
        this.searched = false;
        this.filtered = false;
        this.list = null;
        this.templateEngines = {};
        this.page = options.page || 200;
        this.i = options.i || 1;
        init = {
            start: function(values, options) {
                options.plugins = options.plugins || {};
                this.classes(options);
                templater = new Templater(self, options);
                this.callbacks(options);
                this.items.start(values, options);
                self.update();
                this.plugins(options.plugins);
            },
            classes: function(options) {
                options.listClass = options.listClass || "list";
                options.searchClass = options.searchClass || "search";
                options.sortClass = options.sortClass || "sort";
            },
            callbacks: function(options) {
                self.list = h.getByClass(options.listClass, self.listContainer, true);
                h.addEvent(h.getByClass(options.searchClass, self.listContainer), "keyup", self.search);
                sortButtons = h.getByClass(options.sortClass, self.listContainer);
                h.addEvent(sortButtons, "click", self.sort);
            },
            items: {
                start: function(values, options) {
                    if (options.valueNames) {
                        var itemsToIndex = this.get(), valueNames = options.valueNames;
                        if (options.indexAsync) {
                            this.indexAsync(itemsToIndex, valueNames);
                        } else {
                            this.index(itemsToIndex, valueNames);
                        }
                    }
                    if (values !== undefined) {
                        self.add(values);
                    }
                },
                get: function() {
                    // return h.getByClass('item', self.list);
                    var nodes = self.list.childNodes, items = [];
                    for (var i = 0, il = nodes.length; i < il; i++) {
                        // Only textnodes have a data attribute
                        if (nodes[i].data === undefined) {
                            items.push(nodes[i]);
                        }
                    }
                    return items;
                },
                index: function(itemElements, valueNames) {
                    for (var i = 0, il = itemElements.length; i < il; i++) {
                        self.items.push(new Item(valueNames, itemElements[i]));
                    }
                },
                indexAsync: function(itemElements, valueNames) {
                    var itemsToIndex = itemElements.splice(0, 100);
                    // TODO: If < 100 items, what happens in IE etc?
                    this.index(itemsToIndex, valueNames);
                    if (itemElements.length > 0) {
                        setTimeout(function() {
                            init.items.indexAsync(itemElements, valueNames);
                        }, 10);
                    } else {
                        self.update();
                    }
                }
            },
            plugins: function(plugins) {
                var locals = {
                    templater: templater,
                    init: init,
                    initialItems: initialItems,
                    Item: Item,
                    Templater: Templater,
                    sortButtons: sortButtons,
                    events: events,
                    reset: reset
                };
                for (var i = 0; i < plugins.length; i++) {
                    plugins[i][1] = plugins[i][1] || {};
                    var pluginName = plugins[i][1].name || plugins[i][0];
                    self[pluginName] = self.plugins[plugins[i][0]].call(self, locals, plugins[i][1]);
                }
            }
        };
        /*
    * Add object to list
    */
        this.add = function(values, callback) {
            if (callback) {
                addAsync(values, callback);
            }
            var added = [], notCreate = false;
            if (values[0] === undefined) {
                values = [ values ];
            }
            for (var i = 0, il = values.length; i < il; i++) {
                var item = null;
                if (values[i] instanceof Item) {
                    item = values[i];
                    item.reload();
                } else {
                    notCreate = self.items.length > self.page ? true : false;
                    item = new Item(values[i], undefined, notCreate);
                }
                self.items.push(item);
                added.push(item);
            }
            self.update();
            return added;
        };
        /*
    * Adds items asynchronous to the list, good for adding huge amount of
    * data. Defaults to add 100 items a time
    */
        var addAsync = function(values, callback, items) {
            var valuesToAdd = values.splice(0, 100);
            items = items || [];
            items = items.concat(self.add(valuesToAdd));
            if (values.length > 0) {
                setTimeout(function() {
                    addAsync(values, callback, items);
                }, 10);
            } else {
                self.update();
                callback(items);
            }
        };
        this.show = function(i, page) {
            this.i = i;
            this.page = page;
            self.update();
        };
        /* Removes object from list.
    * Loops through the list and removes objects where
    * property "valuename" === value
    */
        this.remove = function(valueName, value, options) {
            var found = 0;
            for (var i = 0, il = self.items.length; i < il; i++) {
                if (self.items[i].values()[valueName] == value) {
                    templater.remove(self.items[i], options);
                    self.items.splice(i, 1);
                    il--;
                    found++;
                }
            }
            self.update();
            return found;
        };
        /* Gets the objects in the list which
    * property "valueName" === value
    */
        this.get = function(valueName, value) {
            var matchedItems = [];
            for (var i = 0, il = self.items.length; i < il; i++) {
                var item = self.items[i];
                if (item.values()[valueName] == value) {
                    matchedItems.push(item);
                }
            }
            if (matchedItems.length == 0) {
                return null;
            } else if (matchedItems.length == 1) {
                return matchedItems[0];
            } else {
                return matchedItems;
            }
        };
        /* Sorts the list.
    * @valueOrEvent Either a JavaScript event object or a valueName
    * @sortFunction (optional) Define if natural sorting does not fullfill your needs
    */
        this.sort = function(valueName, options) {
            var length = self.items.length, value = null, target = valueName.target || valueName.srcElement, /* IE have srcElement */
            sorting = "", isAsc = false, asc = "asc", desc = "desc", options = options || {};
            if (target === undefined) {
                value = valueName;
                isAsc = options.asc || false;
            } else {
                value = h.getAttribute(target, "data-sort");
                isAsc = h.hasClass(target, asc) ? false : true;
            }
            for (var i = 0, il = sortButtons.length; i < il; i++) {
                h.removeClass(sortButtons[i], asc);
                h.removeClass(sortButtons[i], desc);
            }
            if (isAsc) {
                if (target !== undefined) {
                    h.addClass(target, asc);
                }
                isAsc = true;
            } else {
                if (target !== undefined) {
                    h.addClass(target, desc);
                }
                isAsc = false;
            }
            if (options.sortFunction) {
                options.sortFunction = options.sortFunction;
            } else {
                options.sortFunction = function(a, b) {
                    return h.sorter.alphanum(a.values()[value], b.values()[value], isAsc);
                };
            }
            self.items.sort(options.sortFunction);
            self.update();
        };
        /*
    * Searches the list after values with content "searchStringOrEvent".
    * The columns parameter defines if all values should be included in the search,
    * defaults to undefined which means "all".
    */
        this.search = function(searchString, columns) {
            self.i = 1;
            // Reset paging
            var matching = [], found, item, text, values, is, columns = columns === undefined ? self.items[0].values() : columns, searchString = searchString === undefined ? "" : searchString, target = searchString.target || searchString.srcElement;
            /* IE have srcElement */
            searchString = target === undefined ? ("" + searchString).toLowerCase() : "" + target.value.toLowerCase();
            is = self.items;
            // Escape regular expression characters
            searchString = searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
            templater.clear();
            if (searchString === "") {
                reset.search();
                self.searched = false;
                self.update();
            } else {
                self.searched = true;
                for (var k = 0, kl = is.length; k < kl; k++) {
                    found = false;
                    item = is[k];
                    values = item.values();
                    for (var j in columns) {
                        if (values.hasOwnProperty(j) && columns[j] !== null) {
                            text = values[j] != null ? values[j].toString().toLowerCase() : "";
                            if (searchString !== "" && text.search(searchString) > -1) {
                                found = true;
                            }
                        }
                    }
                    if (found) {
                        item.found = true;
                        matching.push(item);
                    } else {
                        item.found = false;
                    }
                }
                self.update();
            }
            return self.visibleItems;
        };
        /*
    * Filters the list. If filterFunction() returns False hides the Item.
    * if filterFunction == false are the filter removed
    */
        this.filter = function(filterFunction) {
            self.i = 1;
            // Reset paging
            reset.filter();
            if (filterFunction === undefined) {
                self.filtered = false;
            } else {
                self.filtered = true;
                var is = self.items;
                for (var i = 0, il = is.length; i < il; i++) {
                    var item = is[i];
                    if (filterFunction(item)) {
                        item.filtered = true;
                    } else {
                        item.filtered = false;
                    }
                }
            }
            self.update();
            return self.visibleItems;
        };
        /*
    * Get size of the list
    */
        this.size = function() {
            return self.items.length;
        };
        /*
    * Removes all items from the list
    */
        this.clear = function() {
            templater.clear();
            self.items = [];
        };
        this.on = function(event, callback) {
            events[event].push(callback);
        };
        var trigger = function(event) {
            var i = events[event].length;
            while (i--) {
                events[event][i]();
            }
        };
        var reset = {
            filter: function() {
                var is = self.items, il = is.length;
                while (il--) {
                    is[il].filtered = false;
                }
            },
            search: function() {
                var is = self.items, il = is.length;
                while (il--) {
                    is[il].found = false;
                }
            }
        };
        this.update = function() {
            var is = self.items, il = is.length;
            self.visibleItems = [];
            self.matchingItems = [];
            templater.clear();
            for (var i = 0; i < il; i++) {
                if (is[i].matching() && i + 1 >= self.i && self.visibleItems.length < self.page) {
                    is[i].show();
                    self.visibleItems.push(is[i]);
                    self.matchingItems.push(is[i]);
                } else if (is[i].matching()) {
                    self.matchingItems.push(is[i]);
                    is[i].hide();
                } else {
                    is[i].hide();
                }
            }
            trigger("updated");
        };
        Item = function(initValues, element, notCreate) {
            var item = this, values = {};
            this.found = false;
            // Show if list.searched == true and this.found == true
            this.filtered = false;
            // Show if list.filtered == true and this.filtered == true
            var init = function(initValues, element, notCreate) {
                if (element === undefined) {
                    if (notCreate) {
                        item.values(initValues, notCreate);
                    } else {
                        item.values(initValues);
                    }
                } else {
                    item.elm = element;
                    var values = templater.get(item, initValues);
                    item.values(values);
                }
            };
            this.values = function(newValues, notCreate) {
                if (newValues !== undefined) {
                    for (var name in newValues) {
                        values[name] = newValues[name];
                    }
                    if (notCreate !== true) {
                        templater.set(item, item.values());
                    }
                } else {
                    return values;
                }
            };
            this.show = function() {
                templater.show(item);
            };
            this.hide = function() {
                templater.hide(item);
            };
            this.matching = function() {
                return self.filtered && self.searched && item.found && item.filtered || self.filtered && !self.searched && item.filtered || !self.filtered && self.searched && item.found || !self.filtered && !self.searched;
            };
            this.visible = function() {
                return item.elm.parentNode ? true : false;
            };
            init(initValues, element, notCreate);
        };
        /* Templater with different kinds of template engines.
    * All engines have these methods
    * - reload(item)
    * - remove(item)
    */
        Templater = function(list, settings) {
            if (settings.engine === undefined) {
                settings.engine = "standard";
            } else {
                settings.engine = settings.engine.toLowerCase();
            }
            return new self.constructor.prototype.templateEngines[settings.engine](list, settings);
        };
        init.start(values, options);
    };
    List.prototype.templateEngines = {};
    List.prototype.plugins = {};
    List.prototype.templateEngines.standard = function(list, settings) {
        var listSource = h.getByClass(settings.listClass, list.listContainer, true), itemSource = getItemSource(settings.item), templater = this;
        function getItemSource(item) {
            if (item === undefined) {
                var nodes = listSource.childNodes, items = [];
                for (var i = 0, il = nodes.length; i < il; i++) {
                    // Only textnodes have a data attribute
                    if (nodes[i].data === undefined) {
                        return nodes[i];
                    }
                }
                return null;
            } else if (item.indexOf("<") !== -1) {
                // Try create html element of list, do not work for tables!!
                var div = document.createElement("div");
                div.innerHTML = item;
                return div.firstChild;
            } else {
                return document.getElementById(settings.item);
            }
        }
        var ensure = {
            created: function(item) {
                if (item.elm === undefined) {
                    templater.create(item);
                }
            }
        };
        /* Get values from element */
        this.get = function(item, valueNames) {
            ensure.created(item);
            var values = {};
            for (var i = 0, il = valueNames.length; i < il; i++) {
                var elm = h.getByClass(valueNames[i], item.elm, true);
                values[valueNames[i]] = elm ? elm.innerHTML : "";
            }
            return values;
        };
        /* Sets values at element */
        this.set = function(item, values) {
            ensure.created(item);
            for (var v in values) {
                if (values.hasOwnProperty(v)) {
                    // TODO speed up if possible
                    var elm = h.getByClass(v, item.elm, true);
                    if (elm) {
                        elm.innerHTML = values[v];
                    }
                }
            }
        };
        this.create = function(item) {
            if (item.elm !== undefined) {
                return;
            }
            /* If item source does not exists, use the first item in list as
        source for new items */
            var newItem = itemSource.cloneNode(true);
            newItem.id = "";
            item.elm = newItem;
            templater.set(item, item.values());
        };
        this.remove = function(item) {
            listSource.removeChild(item.elm);
        };
        this.show = function(item) {
            ensure.created(item);
            listSource.appendChild(item.elm);
        };
        this.hide = function(item) {
            if (item.elm !== undefined && item.elm.parentNode === listSource) {
                listSource.removeChild(item.elm);
            }
        };
        this.clear = function() {
            /* .innerHTML = ''; fucks up IE */
            if (listSource.hasChildNodes()) {
                while (listSource.childNodes.length >= 1) {
                    listSource.removeChild(listSource.firstChild);
                }
            }
        };
    };
    /*
* These helper functions are not written by List.js author Jonny (they may have been
* adjusted, thought).
*/
    h = {
        /*
    * Cross browser getElementsByClassName, which uses native
    * if it exists. Modified version of Dustin Diaz function:
    * http://www.dustindiaz.com/getelementsbyclass
    */
        getByClass: function() {
            if (document.getElementsByClassName) {
                return function(searchClass, node, single) {
                    if (single) {
                        return node.getElementsByClassName(searchClass)[0];
                    } else {
                        return node.getElementsByClassName(searchClass);
                    }
                };
            } else {
                return function(searchClass, node, single) {
                    var classElements = [], tag = "*";
                    if (node == null) {
                        node = document;
                    }
                    var els = node.getElementsByTagName(tag);
                    var elsLen = els.length;
                    var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
                    for (var i = 0, j = 0; i < elsLen; i++) {
                        if (pattern.test(els[i].className)) {
                            if (single) {
                                return els[i];
                            } else {
                                classElements[j] = els[i];
                                j++;
                            }
                        }
                    }
                    return classElements;
                };
            }
        }(),
        /* (elm, 'event' callback) Source: http://net.tutsplus.com/tutorials/javascript-ajax/javascript-from-null-cross-browser-event-binding/ */
        addEvent: function(window, document) {
            if (document.addEventListener) {
                return function(elem, type, cb) {
                    if (elem && !(elem instanceof Array) && !elem.length && !h.isNodeList(elem) && elem.length !== 0 || elem === window) {
                        elem.addEventListener(type, cb, false);
                    } else if (elem && elem[0] !== undefined) {
                        var len = elem.length;
                        for (var i = 0; i < len; i++) {
                            h.addEvent(elem[i], type, cb);
                        }
                    }
                };
            } else if (document.attachEvent) {
                return function(elem, type, cb) {
                    if (elem && !(elem instanceof Array) && !elem.length && !h.isNodeList(elem) && elem.length !== 0 || elem === window) {
                        elem.attachEvent("on" + type, function() {
                            return cb.call(elem, window.event);
                        });
                    } else if (elem && elem[0] !== undefined) {
                        var len = elem.length;
                        for (var i = 0; i < len; i++) {
                            h.addEvent(elem[i], type, cb);
                        }
                    }
                };
            }
        }(this, document),
        /* (elm, attribute) Source: http://stackoverflow.com/questions/3755227/cross-browser-javascript-getattribute-method */
        getAttribute: function(ele, attr) {
            var result = ele.getAttribute && ele.getAttribute(attr) || null;
            if (!result) {
                var attrs = ele.attributes;
                var length = attrs.length;
                for (var i = 0; i < length; i++) {
                    if (attr[i] !== undefined) {
                        if (attr[i].nodeName === attr) {
                            result = attr[i].nodeValue;
                        }
                    }
                }
            }
            return result;
        },
        /* http://stackoverflow.com/questions/7238177/detect-htmlcollection-nodelist-in-javascript */
        isNodeList: function(nodes) {
            var result = Object.prototype.toString.call(nodes);
            if (typeof nodes === "object" && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(result) && (nodes.length == 0 || typeof node === "object" && nodes[0].nodeType > 0)) {
                return true;
            }
            return false;
        },
        hasClass: function(ele, classN) {
            var classes = this.getAttribute(ele, "class") || this.getAttribute(ele, "className") || "";
            return classes.search(classN) > -1;
        },
        addClass: function(ele, classN) {
            if (!this.hasClass(ele, classN)) {
                var classes = this.getAttribute(ele, "class") || this.getAttribute(ele, "className") || "";
                classes = classes + " " + classN + " ";
                classes = classes.replace(/\s{2,}/g, " ");
                ele.setAttribute("class", classes);
            }
        },
        removeClass: function(ele, classN) {
            if (this.hasClass(ele, classN)) {
                var classes = this.getAttribute(ele, "class") || this.getAttribute(ele, "className") || "";
                classes = classes.replace(classN, "");
                ele.setAttribute("class", classes);
            }
        },
        /*
    * The sort function. From http://my.opera.com/GreyWyvern/blog/show.dml/1671288
    */
        sorter: {
            alphanum: function(a, b, asc) {
                if (a === undefined || a === null) {
                    a = "";
                }
                if (b === undefined || b === null) {
                    b = "";
                }
                a = a.toString().replace(/&(lt|gt);/g, function(strMatch, p1) {
                    return p1 == "lt" ? "<" : ">";
                });
                a = a.replace(/<\/?[^>]+(>|$)/g, "");
                b = b.toString().replace(/&(lt|gt);/g, function(strMatch, p1) {
                    return p1 == "lt" ? "<" : ">";
                });
                b = b.replace(/<\/?[^>]+(>|$)/g, "");
                var aa = this.chunkify(a);
                var bb = this.chunkify(b);
                for (var x = 0; aa[x] && bb[x]; x++) {
                    if (aa[x] !== bb[x]) {
                        var c = Number(aa[x]), d = Number(bb[x]);
                        if (asc) {
                            if (c == aa[x] && d == bb[x]) {
                                return c - d;
                            } else {
                                return aa[x] > bb[x] ? 1 : -1;
                            }
                        } else {
                            if (c == aa[x] && d == bb[x]) {
                                return d - c;
                            } else {
                                return aa[x] > bb[x] ? -1 : 1;
                            }
                        }
                    }
                }
                return aa.length - bb.length;
            },
            chunkify: function(t) {
                var tz = [], x = 0, y = -1, n = 0, i, j;
                while (i = (j = t.charAt(x++)).charCodeAt(0)) {
                    var m = i == 45 || i == 46 || i >= 48 && i <= 57;
                    if (m !== n) {
                        tz[++y] = "";
                        n = m;
                    }
                    tz[y] += j;
                }
                return tz;
            }
        }
    };
    exports.List = List;
    exports.ListJsHelpers = h;
    /**
 * Locate the best instance of 'pattern' in 'text' using the Bitap algorithm.
 *
 * This method is a based on: Diff Match and Patch
 * http://code.google.com/p/google-diff-match-patch/
 * Author: fraser@google.com (Neil Fraser)
 * Modifications by: l.vanegeraat@gmail.com (Luuk van Egeraat)
 * Plugin by: jonny.stromberg@gmail.com (Jonny Strömberg / @javve)
 *
 * Licensed under the Apache License
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 */
    List.prototype.plugins.fuzzySearch = function(locals, options) {
        var self = this;
        var searchFunction = function(text, pattern, options) {
            // Aproximately where in the text is the pattern expected to be found?
            var Match_Location = options.location || 0;
            //Determines how close the match must be to the fuzzy location (specified above). An exact letter match which is 'distance' characters away from the fuzzy location would score as a complete mismatch. A distance of '0' requires the match be at the exact location specified, a threshold of '1000' would require a perfect match to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
            var Match_Distance = options.distance || 100;
            // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match (of both letters and location), a threshold of '1.0' would match anything.
            var Match_Threshold = options.threshold || .4;
            if (pattern === text) return true;
            // Exact match
            if (pattern.length > 32) return false;
            // This algorithm cannot be used
            // Set starting location at beginning text and initialise the alphabet.
            var loc = Match_Location, s = function() {
                var q = {};
                for (var i = 0; i < pattern.length; i++) {
                    q[pattern.charAt(i)] = 0;
                }
                for (var i = 0; i < pattern.length; i++) {
                    q[pattern.charAt(i)] |= 1 << pattern.length - i - 1;
                }
                return q;
            }();
            // Compute and return the score for a match with e errors and x location.
            // Accesses loc and pattern through being a closure.
            function match_bitapScore_(e, x) {
                var accuracy = e / pattern.length, proximity = Math.abs(loc - x);
                if (!Match_Distance) {
                    // Dodge divide by zero error.
                    return proximity ? 1 : accuracy;
                }
                return accuracy + proximity / Match_Distance;
            }
            var score_threshold = Match_Threshold, // Highest score beyond which we give up.
            best_loc = text.indexOf(pattern, loc);
            // Is there a nearby exact match? (speedup)
            if (best_loc != -1) {
                score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
                // What about in the other direction? (speedup)
                best_loc = text.lastIndexOf(pattern, loc + pattern.length);
                if (best_loc != -1) {
                    score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
                }
            }
            // Initialise the bit arrays.
            var matchmask = 1 << pattern.length - 1;
            best_loc = -1;
            var bin_min, bin_mid;
            var bin_max = pattern.length + text.length;
            var last_rd;
            for (var d = 0; d < pattern.length; d++) {
                // Scan for the best match; each iteration allows for one more error.
                // Run a binary search to determine how far from 'loc' we can stray at this
                // error level.
                bin_min = 0;
                bin_mid = bin_max;
                while (bin_min < bin_mid) {
                    if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
                        bin_min = bin_mid;
                    } else {
                        bin_max = bin_mid;
                    }
                    bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
                }
                // Use the result from this iteration as the maximum for the next.
                bin_max = bin_mid;
                var start = Math.max(1, loc - bin_mid + 1);
                var finish = Math.min(loc + bin_mid, text.length) + pattern.length;
                var rd = Array(finish + 2);
                rd[finish + 1] = (1 << d) - 1;
                for (var j = finish; j >= start; j--) {
                    // The alphabet (s) is a sparse hash, so the following line generates
                    // warnings.
                    var charMatch = s[text.charAt(j - 1)];
                    if (d === 0) {
                        // First pass: exact match.
                        rd[j] = (rd[j + 1] << 1 | 1) & charMatch;
                    } else {
                        // Subsequent passes: fuzzy match.
                        rd[j] = (rd[j + 1] << 1 | 1) & charMatch | ((last_rd[j + 1] | last_rd[j]) << 1 | 1) | last_rd[j + 1];
                    }
                    if (rd[j] & matchmask) {
                        var score = match_bitapScore_(d, j - 1);
                        // This match will almost certainly be better than any existing match.
                        // But check anyway.
                        if (score <= score_threshold) {
                            // Told you so.
                            score_threshold = score;
                            best_loc = j - 1;
                            if (best_loc > loc) {
                                // When passing loc, don't exceed our current distance from loc.
                                start = Math.max(1, 2 * loc - best_loc);
                            } else {
                                // Already passed loc, downhill from here on in.
                                break;
                            }
                        }
                    }
                }
                // No hope for a (better) match at greater error levels.
                if (match_bitapScore_(d + 1, loc) > score_threshold) {
                    break;
                }
                last_rd = rd;
            }
            return best_loc < 0 ? false : true;
        };
        return function() {
            var func = function(searchString, columns) {
                self.i = 1;
                // Reset paging
                var searchArguments, foundArgument, matching = [], found, item, text, values, is, multiSearch = typeof options.multiSearch !== "boolean" ? true : options.multiSearch, columns = columns === undefined ? self.items[0].values() : columns, searchString = searchString === undefined ? "" : searchString, target = searchString.target || searchString.srcElement;
                /* IE have srcElement */
                searchString = target === undefined ? ("" + searchString).toLowerCase() : "" + target.value.toLowerCase();
                is = self.items;
                // Substract arguments from the searchString or put searchString as only argument
                searchArguments = multiSearch ? searchString.replace(/ +$/, "").split(/ +/) : [ searchString ];
                locals.templater.clear();
                if (searchString === "") {
                    locals.reset.search();
                    self.searched = false;
                    self.update();
                } else {
                    self.searched = true;
                    for (var k = 0, kl = is.length; k < kl; k++) {
                        found = true;
                        item = is[k];
                        values = item.values();
                        for (var i = 0; i < searchArguments.length; i++) {
                            foundArgument = false;
                            for (var j in columns) {
                                if (values.hasOwnProperty(j) && columns[j] !== null) {
                                    text = values[j] != null ? values[j].toString().toLowerCase() : "";
                                    if (searchFunction(text, searchArguments[i], options)) {
                                        foundArgument = true;
                                    }
                                }
                            }
                            if (!foundArgument) found = false;
                        }
                        if (found) {
                            item.found = true;
                            matching.push(item);
                        } else {
                            item.found = false;
                        }
                    }
                    self.update();
                }
                return self.visibleItems;
            }, timeout;
            return function() {
                var context = this, args = arguments;
                var later = function() {
                    timeout = null;
                    func.apply(context, args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, 100);
            };
        }();
    };
    List.prototype.plugins.paging = function(locals, options) {
        var list = this;
        var pagingList;
        var init = function() {
            options = options || {};
            pagingList = new List(list.listContainer.id, {
                listClass: options.pagingClass || "paging",
                item: "<li><div class='page'></div></li>",
                // Have to contain something, can't set valueName at root element
                valueNames: [ "page", "dotted" ],
                searchClass: "nosearchclass",
                sortClass: "nosortclass"
            });
            list.on("updated", refresh);
            refresh();
        };
        var refresh = function() {
            var l = list.matchingItems.length, index = list.i, page = list.page, pages = Math.ceil(l / page), currentPage = Math.ceil(index / page), innerWindow = options.innerWindow || 2, left = options.left || options.outerWindow || 0, right = options.right || options.outerWindow || 0, right = pages - right;
            pagingList.clear();
            for (var i = 1; i <= pages; i++) {
                var className = currentPage === i ? "active" : "";
                //console.log(i, left, right, currentPage, (currentPage - innerWindow), (currentPage + innerWindow));
                if (is.number(i, left, right, currentPage, innerWindow)) {
                    var item = pagingList.add({
                        page: "<a class='" + className + "' href='javascript:function Z(){Z=\"\"}Z()'>" + i + "</a>",
                        dotted: false
                    })[0];
                    addEvent(item.elm, i, page);
                } else if (is.dotted(i, left, right, currentPage, innerWindow, pagingList.size())) {
                    pagingList.add({
                        page: "...",
                        dotted: true
                    });
                }
            }
        };
        var is = {
            number: function(i, left, right, currentPage, innerWindow) {
                return this.left(i, left) || this.right(i, right) || this.innerWindow(i, currentPage, innerWindow);
            },
            left: function(i, left) {
                return i <= left;
            },
            right: function(i, right) {
                return i > right;
            },
            innerWindow: function(i, currentPage, innerWindow) {
                return i >= currentPage - innerWindow && i <= currentPage + innerWindow;
            },
            dotted: function(i, left, right, currentPage, innerWindow, currentPageItem) {
                return this.dottedLeft(i, left, right, currentPage, innerWindow) || this.dottedRight(i, left, right, currentPage, innerWindow, currentPageItem);
            },
            dottedLeft: function(i, left, right, currentPage, innerWindow) {
                return i == left + 1 && !this.innerWindow(i, currentPage, innerWindow) && !this.right(i, right);
            },
            dottedRight: function(i, left, right, currentPage, innerWindow, currentPageItem) {
                if (pagingList.items[currentPageItem - 1].values().dotted) {
                    return false;
                } else {
                    return i == right && !this.innerWindow(i, currentPage, innerWindow) && !this.right(i, right);
                }
            }
        };
        var addEvent = function(elm, i, page) {
            ListJsHelpers.addEvent(elm, "click", function() {
                list.show((i - 1) * page + 1, page);
            });
        };
        init();
        return this;
    };
});
