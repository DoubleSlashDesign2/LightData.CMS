(function ($) {
    $.fn.autoFill = function (options) {
        var settings = $.extend({
            datasource: [],
            textField: undefined,
            valueField: undefined,
            childrenField: undefined,
            ajaxUrl: undefined,
            param: undefined,
            onSelect: undefined,
            selectedValue: undefined,
            selectedItem: undefined
        }, options);
        $(this).addClass("autofillInput");
        var container = $("<div class='autoFill'></div>");
        container.insertAfter($(this));
        container.append($(this));
        var dataContainer = $("<nav class='autofilldataContainer'></nav>");
        dataContainer.hide();
        container.append(dataContainer);

        container.select = function (setValueOnly) {
            if (!settings.selectedItem) {
                if (!setValueOnly)
                    dataContainer.hide();
                return;
            }
            container.find("input").val(settings.selectedItem[settings.textField]);
            container.find("input").attr("selectedValue", settings.selectedItem[settings.valueField]);
            if (!setValueOnly) {
                if (settings.onSelect) {
                    settings.onSelect(settings);
                 
                }
                container.find("input").trigger("change");
                dataContainer.hide();
            }
        }

        container.setItemBySelectedLi = function () {
            var li = dataContainer.find(".selected");
            if (li.length <= 0) {
                settings.selectedItem = undefined;
                settings.selectedValue = undefined;
                return;
            }
            settings.selectedItem = {};
            settings.selectedItem[settings.textField] = li.text();
            settings.selectedValue = settings.selectedItem[settings.valueField] = li.attr("fieldValue");

        }

        container.render = function (data, isFocus) {
            if (!data)
                return;

            data.sort(function (a, b) {
                if (a[settings.textField] < b[settings.textField]) return -1;
                if (a[settings.textField] > b[settings.textField]) return 1;
                return 0;
            });

            var value = container.find("input").val();
            data = $.grep(data, function (a, i) { return ( isFocus || a[settings.textField] && a[settings.textField].toString().toLowerCase().indexOf(value.toLowerCase()) !== -1) && i <= 300 });
            dataContainer.html("");

            $.each(data, function () {
                var item = this;
                function render(tItem) {
                    var li = $("<span></span>");
                    li.html(tItem[settings.textField]);
                    li.attr("fieldValue", tItem[settings.valueField]);

                    if (settings.selectedValue && settings.selectedValue === tItem[settings.valueField]) {
                        if (!settings.selectedItem || settings.selectedItem[settings.textField] === tItem[settings.textField]) {
                            li.addClass("selected");
                            settings.selectedValue = tItem[settings.valueField];
                            settings.selectedItem = tItem;
                            container.select(true);
                        }
                    }

                    li.click(function () {
                        settings.selectedValue = tItem[settings.valueField];
                        settings.selectedItem = tItem;
                        container.select();
                    });

                    li.mouseover(function () {
                        dataContainer.find(".selected").removeClass("selected");
                        li.addClass("selected");
                    });

                    dataContainer.append(li);
                    if (settings.childrenField && tItem[settings.childrenField] && tItem[settings.childrenField].length>0) {
                        $(tItem[settings.childrenField]).each(function() {
                            render(this);
                        });
                    }

                }

                render(item);
            });

            if (dataContainer.find("span").length > 0) {
                var offset = container.find("input")[0].getBoundingClientRect();
                dataContainer.css({
                    top: offset.top + offset.height,
                    left: offset.left,
                    "min-width": offset.width,
                    position: "fixed"
                });
                dataContainer.show("slow");
                if (isFocus)
                    container.find("input").select();
            } else dataContainer.hide();
        }
        var timeOut = undefined;
        container.GetData = function (isFocus) {
            if (timeOut)
                clearTimeout(timeOut);
            timeOut = setTimeout(function () {
                if (settings.datasource && settings.datasource.length > 0)
                    container.render(settings.datasource);

                if (!settings.ajaxUrl)
                    return;
                if (!settings.param)
                    settings.param = {};
                settings.param["value"] = !isFocus ? container.find("input").val() : "";
                $.ajax({
                    contentType: "application/json",
                    dataType: "json",
                    type: "POST",
                    url: settings.ajaxUrl,
                    data: JSON.stringify(settings.param),
                    success: function (data) {
                        container.render(data, isFocus);
                    }
                });
            }, 100);
        }

        container.getKey = function (e) {
            if (e.keyCode === 13)
                return "Enter";

            if (e.keyCode === 27)
                return "Esc";

            if (e.keyCode === 40)
                return "Down";

            if (e.keyCode === 38)
                return "Up";

            return false;
        }

        container.bind = function (data) {
            var input = container.find("input");
            input.keyup(function (e) {
                if (!container.getKey(e))
                    container.GetData();
            }).keydown(function (e) {
                var index;
                var selectedli;
                switch (container.getKey(e)) {
                    case "Enter":
                        container.setItemBySelectedLi();
                        container.select();
                        return false;
                    case "Esc":
                        container.select();
                        return false;
                    case "Down":
                        if (dataContainer.is(":hidden")) {
                            container.GetData();
                            return false;
                        }

                        selectedli = dataContainer.find(".selected");
                        if (selectedli.length <= 0) {
                            selectedli = dataContainer.find("span").first();
                            selectedli.addClass("selected");
                            return false;
                        }

                        dataContainer.find(".selected").removeClass("selected");
                        index = selectedli.index();
                        if (index + 1 <= dataContainer.find("span").length - 1)
                            dataContainer.find("span").eq(index + 1).addClass("selected");
                        else {
                            dataContainer.find("span").eq(0).addClass("selected");
                        }

                        return false;

                    case "Up":
                        if (dataContainer.is(":hidden")) {
                            container.GetData();
                            return false;
                        }

                        selectedli = dataContainer.find(".selected");
                        if (selectedli.length <= 0) {
                            selectedli = dataContainer.find("span").first();
                            selectedli.addClass("selected");
                            return false;
                        }

                        dataContainer.find(".selected").removeClass("selected");
                        index = selectedli.index();
                        if (index - 1 >= 0)
                            dataContainer.find("span").eq(index - 1).addClass("selected");
                        else {
                            dataContainer.find("span").eq(0).addClass("selected");
                        }

                        return false;


                    default:
                        container.GetData();
                        break;
                }

                return true;
            });

            $("body").mousedown(function (e) {
                var target = $(e.target);
                if (target.hasClass("autofillInput"))
                    return;

                if (target.parent().hasClass("autoFill") || target.parent().hasClass("autofilldataContainer"))
                    return;
                dataContainer.hide("slow");
            });

            input.focus(function() {
                container.GetData(true);
            });
        }
        container.bind();
        return container;

    };

}(jQuery));