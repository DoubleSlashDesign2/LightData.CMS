(function ($) {
    jQuery.fn.center = function (isRelative) {
        var item = this;
        this.css("position", "absolute");
        this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
            $(window).scrollTop()) + "px");
        this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
            $(window).scrollLeft()) + "px");

        if (isRelative) {
            $(window).resize(function () {
                $(item).center();
            });

            $(window).scroll(function () {
                $(item).center();
            });
        }
        return this;
    }



    $.fn.dialog = function (options) {
        var settings = $.extend({
            onSave: undefined,
            onCancel: undefined,
            saveText: "Save",
            cancelText: "Cancel",
            content: undefined,
            title: undefined,
            autoFillDataUrl: undefined
        }, options);

        var dialog = $("<div class='lightDataDialog'><h1>" + (settings.title ? settings.title : "&nbsp;") + "<span class='cancel'>X</span></h1><nav></nav></div>");

        dialog.settings = settings;

        function dimScreen() {
            var dimClass = "dim" + $(".dim").length + "dim dim";
            var dim = $("<div class='" + dimClass + "'></div>");
            return dim;
        }

        dialog.show = function () {
            var dim = dimScreen();
            dialog.find("nav").append(settings.content);

            dialog.draggable({ handle: "h1" });

            dialog.find("span.cancel").click(function () {
                dialog.remove();
                dim.remove();
                if (settings.onCancel)
                    settings.onCancel();
            });

            if (settings.onSave) {
                dialog.find("h1").append("<span class='save'>" + settings.saveText + "</span>");
                dialog.find("h1> .save").click(function () {
                    if (settings.onSave(dialog) !== false) {
                        dialog.remove();
                        dim.remove();
                    }
                });
            }

            $("body").append(dialog).append(dim);
            dialog.center(true);
            dialog.find("h1").width(dialog[0].getBoundingClientRect().width);

        }

        return dialog;
    };


    $.fn.menus = function (options) {
        var settings = $.extend({
            getUri: undefined,
            saveUri: undefined,
            deleteUri: undefined,
            header: undefined
        }, options);

        var container = $(this);
        container.addClass("tableTree");
        container.append("<h2>" + settings.header + "</h2>");
        container.render = function () {

            $.ajax({
                contentType: "application/json",
                dataType: "json",
                type: "POST",
                url: settings.getUri,
                success: function (data) {
                    function renderChildren(items, parent) {
                        $.each(items, function () {
                            var div = $("<li></li>");
                            div.append("<div class='arrow-down'></div><span class='sp'><span class='text'>" + this.displayName + "</span> <a class='edit'><span></span> edit</a></span>");
                            bindEdit(div.find(".edit").last(), this);
                            if (this.children && this.children.length > 0) {
                                var ul = $("<ul class='subItem'></ul>");
                                ul.hide();
                                div.append(ul);
                                renderChildren(this.children, ul);
                            } else div.find(".arrow-down").hide();
                            parent.append(div);
                        });
                    }
                    var ulContainer = $("<ul></ul>");
                    container.append(ulContainer);
                    $(data).each(function () {
                        var div = $("<li></li>");
                        div.append("<div class='arrow-down'></div><span class='sp'><span class='text'>" + this.displayName + "</span> <a class='edit'><span></span> edit</a></span>");

                        bindEdit(div.find(".edit").last(), this);
                        if (this.children && this.children.length > 0) {
                            var ul = $("<ul class='subItem'></ul>");
                            ul.hide();
                            div.append(ul);
                            renderChildren(this.children, ul);
                        } else div.find(".arrow-down").hide();
                        ulContainer.append(div);
                    });
                    container.find("li> span").mouseover(function (e) {
                        if ($(e.target).hasClass("sp") || $(e.target).hasClass("text"))
                            $(this).addClass("selected");
                    }).mouseout(function () {
                        $(this).removeClass("selected");
                    });

                    function folder() {
                        container.find(".arrow-up, .arrow-down").click(function () {
                            if ($(this).hasClass("arrow-up")) {
                                $(this).parent().children("ul").hide();
                                $(this).removeClass("arrow-up").addClass("arrow-down");
                            } else {
                                $(this).parent().children("ul").show();
                                $(this).removeClass("arrow-down").addClass("arrow-up");
                            }

                        });
                    }

                    function bindEdit(li, item) {
                        li.click(function () {
                            var editContainer = $("<div class='inputContainer'></div>");
                            editContainer.append("<label>Name:</label>");
                            editContainer.append("<input type='text' class='txtname' value='" + item.displayName + "' />");
                            editContainer.append("<label>Choose Parent:</label>");
                            editContainer.append("<input type='text' class='txtparent' value='None' />");

                            $(this).dialog({ content: editContainer, title: "test", onSave: function () { return true; } }).show();
                            editContainer.find(".txtparent").autoFill({
                                ajaxUrl: settings.autoFillDataUrl,
                                textField: "displayName",
                                valueField: "id"
                            });
                        });
                    }

                    folder();
                }

            });
        }
        container.render();
        //container.center()
        return container;
    }

}(jQuery));