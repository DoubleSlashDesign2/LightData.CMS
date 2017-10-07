(function ($) {
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
      
            setTimeout(function () {
                    dialog.center(true);
                    dialog.find("h1").width(dialog[0].getBoundingClientRect().width);
                },
                1);


        }

        return dialog;
    };

}(jQuery));