(function ($) {

    $.fn.contextMenu = function (options) {
        var settings = $.extend({
            // [{ Text, id }]
            dataSource: [],
            click: function (item) { },
            onLoad: function (settings) { }
        }, options);
        var container = $(this);
        var ini = false;
        container.attr("title", "Right click to edit");
        function buildContext(e) {
            $(".contextMenu").remove();
            if (settings.onLoad)
                settings.onLoad(settings);
            var context = $("<div class='contextMenu'></div>");
            $.each(settings.dataSource, function () {
                var x = this;
                var div = $("<div class='contextItem'></div>");
                function loadItem(item, parent) {
                    if (typeof item.text === "string")
                        parent.html(item.text);
                    else {
                        parent.append(item.text);
                        parent.parent().mouseover(function () {
                            var offset = this.getBoundingClientRect();
                            parent.css({ "width": $(item.text).width(), "height": $(item.text).height(), top: offset.top, left: offset.left + offset.width });

                        });
                    }

                    if (!item.children || item.children.length <= 0) {
                        parent.click(function () {
                            if (settings.click)
                                settings.click(item);
                            context.remove();
                        });
                    } else {
                        var y = $("<div class='contextsubItem'></div>");
                        parent.addClass("hasChildren")
                        parent.append(y);
                        $.each(item.children, function () {
                            loadItem(this, y);
                        });

                    }
                }
                context.append(div);
                loadItem(x, div);
            });
            var iFrame = undefined;
            try {
                iFrame = container.closest("html").parent();
                if (iFrame.length <= 0)
                    iFrame = undefined;
                //else iFrame = container.offset()
            } catch (ee) {



            }
            context.css({
                left: e.pageX,
                top: e.pageY
            });
            if (!iFrame)
                $("body").append(context);
            else {
                iFrame.find("body").find(".contextMenu").remove();
                iFrame.find("body").append(context);
                iFrame.find("body").mousedown(function (e) {
                    var target = $(e.target);
                    if (!(target.hasClass("contextItem") || target.hasClass("contextMenu"))) {
                        context.remove();
                        iFrame.find("body").find(".contextMenu").remove();

                    }

                });
            }

            context.slideDown("slow");
            context.width(Math.max.apply(Math,
                $.map(context.find("div"),
                    function (o) {
                        return o.getBoundingClientRect().width;
                    })));
            context.children(".contextItem").css("max-width", context.width() - (context.children(".contextItem").outerWidth(true) - context.width()));
            ini = true;
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

}(jQuery));