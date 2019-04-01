/// <reference types="jquery" />
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {

        var T, k;

        if (this === null) {
            throw new TypeError('this is null or not defined');
        }

        // 1. Let O be the result of calling toObject() passing the
        // |this| value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get() internal
        // method of O with the argument "length".
        // 3. Let len be toUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If isCallable(callback) is false, throw a TypeError exception. 
        // See: http://es5.github.com/#x9.11
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        // 5. If thisArg was supplied, let T be thisArg; else let
        // T be undefined.
        if (arguments.length > 1) {
            T = thisArg;
        }

        // 6. Let k be 0
        k = 0;

        // 7. Repeat, while k < len
        while (k < len) {

            var kValue;

            // a. Let Pk be ToString(k).
            //    This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty
            //    internal method of O with argument Pk.
            //    This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {

                // i. Let kValue be the result of calling the Get internal
                // method of O with argument Pk.
                kValue = O[k];

                // ii. Call the Call internal method of callback with T as
                // the this value and argument list containing kValue, k, and O.
                callback.call(T, kValue, k, O);
            }
            // d. Increase k by 1.
            k++;
        }
        // 8. return undefined
    };
}

!function ($: JQueryStatic) {
    interface Options {
        current?: number;
        total: number;
        siblings?: number;
        length?: number;
        side?: number;
        prev?: string;
        next?: string;
        more?: string;
        style?: string;
        className?: string;
    }

    const defaults: Options = {
        current: 1,
        total: false as any,
        length: 7,
        siblings: false as any,
        side: 1,
        prev: "上一页",
        next: "下一页",
        more: "...",
        style: "/webrexco/static/css/cmn/pager.css",
        className: "pager-style-injected"
    };

    $.fn.pager = function (this: JQuery, options: Options | number): JQuery {
        if (!this.length)
            return this;

        if (typeof options === "number")
            options = $.extend({}, defaults, { total: options }) as Options;

        options = $.extend({}, defaults, options) as Options;

        if (options.total as any === false) {
            console.error("[Pager] total cannot be undefined");
            return this;
        }

        if (options.siblings as any === false &&
            options.length as any === false) {
            console.error("[Pager] both siblings and length are undefined");
            return this;
        }
        if (options.siblings as any !== false &&
            options.length as any !== false) {
            console.error("[Pager] both siblings and length are number");
            return this;
        }
        if (options.length as any !== false) {
            if (options.length % 2 == 0) {
                console.error("[Pager] length must be an even number");
                return this;
            }
            options.siblings = (options.length - options.side * 2 - 3) / 2;
        }

        !function (owner: JQuery, options: Options) {
            if (!$(document.body).hasClass(options.className)) {
                var s = document.createElement("link");
                s.type = "text/css";
                s.rel = "stylesheet";
                s.href = options.style;
                document.getElementsByTagName("head")[0].appendChild(s);

                $(document.body).addClass(options.className);
            }

            owner.empty();

            let current = options.current;

            function trigger() {
                owner.data("index", current).trigger("page", current);
                appendChildren();
            }

            const prev = $("<div>").addClass("prev").text(options.prev).appendTo(owner);
            const next = $("<div>").addClass("next").text(options.next).appendTo(owner);
            let list: JQuery[] = [];

            function appendRange(from: number, to: number) {
                for (let i = from; i <= to; i++)
                    list.push($("<div>").addClass("page" + (i == current ? " current" : "")).text(i).data("index", i).insertBefore(next));
            }
            function appendMore() {
                list.push($("<div>").addClass("page").text("...").insertBefore(next));
            }

            function appendChildren() {
                list.forEach(value => value.remove());
                list = [];

                if (options.length as any !== false) {
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
                        const head = options.siblings * 2 + 1;
                        const more = options.total > head;

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
                        const limit = options.side + options.siblings * 2;
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
                const index = $(this).data("index") as number;
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
