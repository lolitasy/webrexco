if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {
        var T, k;
        if (this === null) {
            throw new TypeError('this is null or not defined');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }
        if (arguments.length > 1) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}
!function ($) {
    var defaults = {
        current: 1,
        total: false,
        length: 7,
        siblings: false,
        side: 1,
        prev: "上一页",
        next: "下一页",
        more: "...",
        style: "/webrexco/static/css/cmn/pager.css",
        className: "pager-style-injected"
    };
    $.fn.pager = function (options) {
        if (!this.length)
            return this;
        if (typeof options === "number")
            options = $.extend({}, defaults, { total: options });
        options = $.extend({}, defaults, options);
        if (options.total === false) {
            console.error("[Pager] total cannot be undefined");
            return this;
        }
        if (options.siblings === false &&
            options.length === false) {
            console.error("[Pager] both siblings and length are undefined");
            return this;
        }
        if (options.siblings !== false &&
            options.length !== false) {
            console.error("[Pager] both siblings and length are number");
            return this;
        }
        if (options.length !== false) {
            if (options.length % 2 == 0) {
                console.error("[Pager] length must be an even number");
                return this;
            }
            options.siblings = (options.length - options.side * 2 - 3) / 2;
        }
        !function (owner, options) {
            if (!$(document.body).hasClass(options.className)) {
                var s = document.createElement("link");
                s.type = "text/css";
                s.rel = "stylesheet";
                s.href = options.style;
                document.getElementsByTagName("head")[0].appendChild(s);
                $(document.body).addClass(options.className);
            }
            owner.empty();
            var current = options.current;
            function trigger() {
                owner.data("index", current).trigger("page", current);
                appendChildren();
            }
            var prev = $("<div>").addClass("prev").text(options.prev).appendTo(owner);
            var next = $("<div>").addClass("next").text(options.next).appendTo(owner);
            var list = [];
            function appendRange(from, to) {
                for (var i = from; i <= to; i++)
                    list.push($("<div>").addClass("page" + (i == current ? " current" : "")).text(i).data("index", i).insertBefore(next));
            }
            function appendMore() {
                list.push($("<div>").addClass("page").text("...").insertBefore(next));
            }
            function appendChildren() {
                list.forEach(function (value) { return value.remove(); });
                list = [];
                if (options.length !== false) {
                    if (options.total <= options.length) {
                        appendRange(1, options.total);
                    }
                    else if (current < options.length - options.side - 2) {
                        appendRange(1, options.length - options.side - 1);
                        appendMore();
                        appendRange(options.total - options.side + 1, options.total);
                    }
                    else if (current <= options.total - (options.length - options.side - 2)) {
                        appendRange(1, options.side);
                        appendMore();
                        appendRange(current - options.siblings, current + options.siblings);
                        appendMore();
                        appendRange(options.total - options.side + 1, options.total);
                    }
                    else {
                        appendRange(1, options.side);
                        appendMore();
                        appendRange(options.total - (options.length - options.side - 1) + 1, options.total);
                    }
                }
                else {
                    if (current <= options.siblings + 2) {
                        var head = options.siblings * 2 + 1;
                        var more = options.total > head;
                        appendRange(1, more ? head : options.total);
                        if (more) {
                            if (options.total > head + 1)
                                appendMore();
                            appendRange(options.total - options.side + 1, options.total);
                        }
                    }
                    else if (current < options.total - options.siblings - 1) {
                        appendRange(1, options.side);
                        appendMore();
                        appendRange(current - options.siblings, current + options.siblings);
                        appendMore();
                        appendRange(options.total - options.side + 1, options.total);
                    }
                    else {
                        var limit = options.side + options.siblings * 2;
                        if (options.total > limit) {
                            appendRange(1, options.side);
                            if (options.total > limit + 1)
                                appendMore();
                        }
                        appendRange(options.total - options.siblings * 2, options.total);
                    }
                }
            }
            owner.off();
            owner.on("click", ".prev", function () {
                if (current == 1)
                    return;
                current--;
                trigger();
            }).on("click", ".next", function () {
                if (current == options.total)
                    return;
                current++;
                trigger();
            }).on("click", ".page", function () {
                var index = $(this).data("index");
                if (!index)
                    return;
                if (index == current)
                    return;
                current = index;
                trigger();
            });
            appendChildren();
        }(this, options);
        return this;
    };
}($);
//# sourceMappingURL=pager.js.map