
function isNullOrEmpty(value) {
    if (!value || value === "" || value === null)
        return true;
    return false;
}

function SetValue(key, value) {
    $.LightDataAjax({
        contentType: "application/json",
        dataType: "json",
        type: "POST",
        async: true,
        data: JSON.stringify({ key: key, value: value }),
        url: globalSettings.setValue,
        success: function (data) {
            return data;
        }
    });
}


function GetValue(key, onSuccess) {
    $.LightDataAjax({
        contentType: "application/json",
        dataType: "json",
        type: "POST",
        async: onSuccess != undefined,
        data: JSON.stringify({ key: key }),
        url: globalSettings.getValue,
        success: function (data) {
            if (onSuccess)
                onSuccess(data);
            return data;

        }
    });
}


(function ($) {
    $.fn.tableFix = function (options) {
        var settings = $.extend({
            scrollPos: 0
        }, options);
        var container = $(this);
        var table = container.children("table").first();
        var h2 = container.children("h2").first();
        var staticThead = $("<table></table>").append(table.children("thead").first().clone());
        table.children("thead").find("th").each(function (i, a) {
            staticThead.find("th").eq(i).width($(this).width());
        });
        staticThead.addClass("static");
        staticThead.css({ position: "absolute", top: 0 });
        if (container.find(".static").length <= 0)
            container.append(staticThead.hide());

        container.scroll(function () {
            var scrollPos = container.scrollTop();
            if (scrollPos > 5) {
                staticThead.css({ top: scrollPos });
                staticThead.show();
                var inputs = staticThead.find("input[type='checkbox']");
                table.find("thead").find("input[type='checkbox']").each(function (i, a) {
                    $.checkBox({ items: inputs.eq(i) }).prop($(this).is(":checked"));
                });
              

            } else staticThead.hide();
        });
    };

    $.fn.contextMenu = function (options) {
        var settings = $.extend({
            // [{ Text, id }]
            dataSource: [],
            click: function (item) { }
        }, options);
        var container = $(this);

        container.attr("title", "Right click to edit");
        function buildContext(e) {
            $(".contextMenu").remove();
            var context = $("<div class='contextMenu'></div>");
            $.each(settings.dataSource,
                function () {
                    var item = this;
                    context.append("<div class='contextItem'>" + this.text + "</div>");
                    context.find("div").last().click(function () {
                        if (settings.click)
                            settings.click(item);
                        $(".contextMenu").remove();
                    });

                });

            context.css({
                left: e.clientX,
                top: e.clientY
            });
            $("body").append(context);
            context.slideDown("slow");
            context.width(Math.max.apply(Math,
                $.map(context.find("div"),
                    function (o) {
                        return o.getBoundingClientRect().width;
                    })));


        }

        $("body").mousedown(function (e) {
            var target = $(e.target);
            if (!(target.hasClass("contextItem") || target.hasClass("contextMenu")))
                $(".contextMenu").remove();

        });

        container.bind("contextmenu", function (e) {
            buildContext(e);
            return false;
        });

        return container;
    }


    jQuery.fn.center = function (isRelative, parant) {
        if (!parant)
            parant = $(window);

        var item = this;

        this.css("position", "absolute");

        this.css("top", Math.max(0, ((parant.height() - $(this).outerHeight()) / 2) +
            parant.scrollTop()) + "px");

        this.css("left", Math.max(0, ((parant.width() - $(this).outerWidth()) / 2) +
            parant.scrollLeft()) + "px");
        var timeOut = undefined;
        if (isRelative) {
            $(window).resize(function () {
                if (timeOut)
                    clearTimeout(timeOut);
                timeOut = setTimeout(function () {
                    $(item).center(isRelative, parant);
                }, 50);
            });

            $(window).scroll(function () {
                if (timeOut)
                    clearTimeout(timeOut);
                timeOut = setTimeout(function () {
                    $(item).center(isRelative, parant);
                }, 50);
            });
        }

        return this;
    }

}(jQuery));