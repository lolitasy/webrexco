// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement, fromIndex) {

        var k;

        // 1. Let o be the result of calling ToObject passing
        //    the this value as the argument.
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }

        var o = Object(this);

        // 2. Let lenValue be the result of calling the Get
        //    internal method of o with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = o.length >>> 0;

        // 4. If len is 0, return -1.
        if (len === 0) {
            return -1;
        }

        // 5. If argument fromIndex was passed let n be
        //    ToInteger(fromIndex); else let n be 0.
        var n = fromIndex | 0;

        // 6. If n >= len, return -1.
        if (n >= len) {
            return -1;
        }

        // 7. If n >= 0, then Let k be n.
        // 8. Else, n<0, Let k be len - abs(n).
        //    If k is less than 0, then let k be 0.
        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        // 9. Repeat, while k < len
        while (k < len) {
            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the
            //    HasProperty internal method of o with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            //    i.  Let elementK be the result of calling the Get
            //        internal method of o with the argument ToString(k).
            //   ii.  Let same be the result of applying the
            //        Strict Equality Comparison Algorithm to
            //        searchElement and elementK.
            //  iii.  If same is true, return k.
            if (k in o && o[k] === searchElement) {
                return k;
            }
            k++;
        }
        return -1;
    };
}

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

if (!Date.now) {
    Date.now = function () {
        return new Date().valueOf();
    }
}

!window.addEventListener && (function (WindowPrototype, DocumentPrototype, ElementPrototype, addEventListener, removeEventListener, dispatchEvent, registry) {
    WindowPrototype[addEventListener] = DocumentPrototype[addEventListener] = ElementPrototype[addEventListener] = function (type, listener) {
        var target = this;

        registry.unshift([target, type, listener, function (event) {
            event.currentTarget = target;
            event.preventDefault = function () { event.returnValue = false };
            event.stopPropagation = function () { event.cancelBubble = true };
            event.target = event.srcElement || target;

            listener.call(target, event);
        }]);

        this.attachEvent("on" + type, registry[0][3]);
    };

    WindowPrototype[removeEventListener] = DocumentPrototype[removeEventListener] = ElementPrototype[removeEventListener] = function (type, listener) {
        for (var index = 0, register; register = registry[index]; ++index) {
            if (register[0] == this && register[1] == type && register[2] == listener) {
                return this.detachEvent("on" + type, registry.splice(index, 1)[0][3]);
            }
        }
    };

    WindowPrototype[dispatchEvent] = DocumentPrototype[dispatchEvent] = ElementPrototype[dispatchEvent] = function (eventObject) {
        return this.fireEvent("on" + eventObject.type, eventObject);
    };
})(Window.prototype, HTMLDocument.prototype, Element.prototype, "addEventListener", "removeEventListener", "dispatchEvent", []);

$("input[type=checkbox], input[type=radio]").change(function () {
    $("input[type=checkbox], input[type=radio]").each(function () {
        $(this).next().toggleClass("checked", this.checked);
    });
});

$("label").on("selectstart", false);
$('input, textarea').placeholder();

function map(title, city, address) {
    var map = new qq.maps.Map("map", {
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        scaleControl: false,
    });

    geocoder = new qq.maps.Geocoder({
        complete: function (result) {
            var location = result.detail.location;

            var marker = new qq.maps.Marker({
                map: map,
                position: location
            });
            qq.maps.event.addListener(marker, 'click', function () {
                window.open("http://apis.map.qq.com/uri/v1/marker?marker=" + encodeURIComponent("coord:" + location.toString() + ";addr:" + address + ";title:" + title) + "&referer=aidai");
            });
            map.setCenter(location);
            map.zoomTo(17);
        },
    });
    geocoder.getLocation(city + address);
}

!function () {
    function query(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    var id = query("id");
    if (!id) {
        location.href = "/webrexco/404.htm";
        return;
    }

    $("#input-anonymous").click(function () {
        if (this.checked)
            $("#input-name").attr("placeholder", "").removeAttr("required").change();
        else
            $("#input-name").attr("placeholder", "必填").attr("required", "").change();
    });

    $("input, select, textarea").focus(function () {
        var $this = $(this);
        if (!$this.is("[required]"))
            return;

        var val = $this.val();
        if (val == null || $.trim(val) == "")
            $this.addClass("invalid");
    }).on("input change", function () {
        var $this = $(this);
        var val = $this.val();
        if ($this.is("[required]") &&
            (val == null || $.trim(val) == "")) {
            if ($this.is("select") || $this.is("[type=file]"))
                $this.data("error", "请选择" + $this.data("name"));
            else
                $this.data("error", "请填写" + $this.data("name"));
            $this.addClass("invalid");
            return;
        }

        var pattern = $this.attr("pattern");
        if (pattern && !val.match("^" + pattern + "$")) {
            $this.data("error", "请正确填写" + $this.data("name"));
            $this.addClass("invalid");
            return;
        }

        var maxlength = $this.attr("maxlength");
        if (maxlength && val.length > maxlength) {
            $this.data("error", $this.data("name") + "超出长度限制");
            $this.addClass("invalid");
            return;
        }

        var accept = $this.attr("accept");
        if (accept) {
            var list = accept.split(", ");
            var ext = $this.val();
            ext = ext.substr(ext.lastIndexOf("."));
            if (list.indexOf(ext) == -1) {
                $this.data("error", $this.data("name") + "的文件类型被禁止");
                $this.addClass("invalid");
                return;
            }
        }

        $this.removeClass("invalid");
    });

    $("#input-activity-id").val(id);

    $.ajax({
        url: "/webrexco/events/detail.cgi",
        method: "POST",
        timeout: 10000,
        data: { activityId: id },
        success: function (data) {
            if (data.code == 404) {
                location.href = "/webrexco/404.htm";
                return;
            }

            if (data.code != 0) {
                util.tipsModal(2, data.message);
                return;
            }

            var activity = data.activity;

            document.title = activity.name;
            $("#keywords, #description").attr("content", activity.name);

            $(".main").html(detail({
                poster: activity.posterUrl,
                title: activity.name,
                startTime: activity.startTime.substring(0, activity.startTime.length - 4),
                endTime: activity.endTime.substring(0, activity.endTime.length - 4),
                address: activity.province + activity.city + activity.address,
                people: "限额" + activity.partiNum + "人",
                host: activity.host + " 主办",
                detail: activity.content,
                share: true,
                link: location.href,
                signed: data.signed,
                status: activity.status
            }));

            map(activity.name, activity.city, activity.address);

            var link = window.location.href;
            var content = activity.name;
            $(".weixin").hover(function () {
                $(".weixin-popup").fadeIn();
            }, function () {
                $(".weixin-popup").fadeOut();
            });
            $('.qrcode').qrcode({
                // render 方式: 'canvas', 'image' or 'div'//用image适配方便
                render: 'image',
                // 容错等级: 'L', 'M', 'Q' or 'H'
                ecLevel: 'L',
                // 控制canvas 偏移
                left: 0,
                top: 0,
                // 控制二维码尺寸
                size: 84,
                // 控制二维码颜色
                fill: '#000',
                // background color or image element, null for transparent background
                background: null,
                // 二维码内容
                text: link,
                // 控制二维码的圆角: 0.0 .. 0.5
                radius: 0,
                // 边缘留空，默认0
                quiet: 0,
            });

            if (data.is_assist)
                $(".like").toggleClass("normal active");
            if (data.is_collection)
                $(".favorite").toggleClass("normal active");

            $(".like, .favorite").click(function () {
                var $this = $(this);
                $.ajax({
                    url: "/webrexco/events/like.cgi",
                    method: "POST",
                    timeout: 10000,
                    data: {
                        activityId: id,
                        type: $this.data("type")
                    },
                    success: function (data) {
                        if (data.code == 401) {
                            showIframe("/webrexco/activity/login/login.htm?refresh=1");
                            return;
                        }

                        if (data.code !== 0) {
                            util.tipsModal(2, data.message);
                            return;
                        }

                        $this.toggleClass("normal active");
                    },
                    error: function () {
                        util.tipsModal(2, "系统异常");
                    }
                });
            });

            $(".top, .u-toBodyTop").click(function () {
                $("html, body").stop().animate({ scrollTop: 0 }, '500', 'swing');
            });

            data.joinUser.forEach(function (item) {
                $(".swiper-wrapper").append($("<div>").addClass("swiper-slide item").append("日期：", $("<span>").addClass("time").text(item.createDate.substring(0, 10)), "用户：", $("<span>").addClass("user").text(item.realName)));
            });

            if (data.joinUser.length > 5) {

                var mySwiper = new Swiper('.swiper-container', {
                    direction: "vertical",
                    setWrapperSize: true,

                    height: 20 * 5,
                    spaceBetween: 0,
                    slidesPerView: 5,

                    simulateTouch: false,

                    loop: true,
                    autoplay: 3000,
                });
            }

            $("#sign").click(sign);

            $(".cancel, .close").click(function () {
                $(".mask").hide();
                $(document.body).removeClass("overlay");
            });

            $("#submit").click(function () {
                var $this = $(this);
                if ($this.hasClass("disabled"))
                    return;

                $("input, select, textarea").change();
                var invalid = $(".invalid");
                if (invalid.length) {
                    util.tipsModal(2, invalid.data("error"));
                    return;
                }

                $this.addClass("disabled").text("正在提交");

                $.ajax({
                    url: "/webrexco/events/signup.cgi",
                    method: "POST",
                    timeout: 10000,
                    data: $("form").serialize(),
                    success: function (data) {
                        if (data.code !== 0) {
                            util.tipsModal(2, data.message);
                            $this.removeClass("disabled").text("确 认");
                            return;
                        }

                        util.tipsModal(1, data.message, function () {
                            location.reload();
                        }, function () {
                            location.reload();
                        });
                        $(".mask").hide();
                        $(document.body).removeClass("overlay");
                    },
                    error: function () {
                        util.tipsModal(2, "系统异常");
                        $this.removeClass("disabled").text("确 认");
                    }
                });
            });
        },
        error: function () {
            util.tipsModal(2, "系统异常");
        }
    });
}();

function sign() {
    $.ajax({
        url: "/webrexco/events/info.cgi",
        method: "POST",
        timeout: 10000,
        success: function (data) {
            if (data.code == 401) {
                showIframe("/webrexco/activity/login/login.htm?refresh=1");
                return;
            }

            if (data.code !== 0) {
                util.tipsModal(2, data.message);
                return;
            }

            var info = data.info;
            if (info) {
                $("#input-name").val(info.realName);
                $("#input-company").val(info.company);
                $("#input-position").val(info.job);
                $("#input-phone").val(info.phone);
                $("#input-mail").val(info.email);
                $("#input-weixin").val(info.wechat);
            }

            $(".mask").show();
            $(document.body).addClass("overlay");
        },
        error: function () {
            util.tipsModal(2, "系统异常");
        }
    });
}
