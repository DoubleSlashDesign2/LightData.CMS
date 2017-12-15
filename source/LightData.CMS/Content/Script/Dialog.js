(function ($) {
    $.fn.loader = function () {

        var container = $(this);
        var className = "LightDataTableLoader LightDataTableLoader" + $(".LightDataTableLoader").length;
        var loader = $("<div class='" + className + "'></div>");

        var canvas = document.createElement('canvas');
        canvas.id = "CursorLayer";
        canvas.width = 46;
        canvas.height = 46;
        loader.append(canvas);

        function drawDivisionLoader(timestamp) {
            var start = null;
            var duration = 3000;
            var boundaryIncrementer = duration / 6;
            // Timing Setup
            if (!start) {
                start = timestamp;
            }

            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw inner orange circle
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = '#d89747';
            ctx.beginPath();
            ctx.arc(22, 22, 13, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();

            // Draw outer circle
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#363537';
            ctx.beginPath();
            ctx.arc(22, 22, 20.5, 0, 2 * Math.PI);
            ctx.stroke();

            // Draw animating arcs
            ctx.lineWidth = 2.5;

            // Find the remainder
            var remainder = (timestamp - start) % 3000;

            // Find out where the remainder lies within the boundaries
            if (remainder >= 0 && remainder <= (boundaryIncrementer)) {
                // Arc 1
                ctx.strokeStyle = '#d89747';
                ctx.beginPath();
                ctx.arc(22, 22, 17, (332 * Math.PI) / 180, (27 * Math.PI) / 180);
                ctx.stroke();

                // Arc 2
                ctx.strokeStyle = '#363537';
                ctx.beginPath();
                ctx.arc(22, 22, 17, (32 * Math.PI) / 180, (87 * Math.PI) / 180);
                ctx.stroke();

                // Arc 3
                ctx.beginPath();
                ctx.arc(22, 22, 17, (92 * Math.PI) / 180, (147 * Math.PI) / 180);
                ctx.stroke();

                // Arc 4
                ctx.beginPath();
                ctx.arc(22, 22, 17, (152 * Math.PI) / 180, (207 * Math.PI) / 180);
                ctx.stroke();

                // Arc 5
                ctx.beginPath();
                ctx.arc(22, 22, 17, (212 * Math.PI) / 180, (267 * Math.PI) / 180);
                ctx.stroke();

                // Arc 6
                ctx.beginPath();
                ctx.arc(22, 22, 17, (272 * Math.PI) / 180, (327 * Math.PI) / 180);
                ctx.stroke();
            }

            if (remainder > (boundaryIncrementer) && remainder <= (boundaryIncrementer * 2)) {
                // Arc 1
                ctx.beginPath();
                ctx.arc(22, 22, 17, (332 * Math.PI) / 180, (27 * Math.PI) / 180);
                ctx.stroke();

                // Arc 2
                ctx.strokeStyle = '#d89747';
                ctx.beginPath();
                ctx.arc(22, 22, 17, (32 * Math.PI) / 180, (87 * Math.PI) / 180);
                ctx.stroke();

                // Arc 3
                ctx.strokeStyle = '#363537';
                ctx.beginPath();
                ctx.arc(22, 22, 17, (92 * Math.PI) / 180, (147 * Math.PI) / 180);
                ctx.stroke();

                // Arc 4
                ctx.beginPath();
                ctx.arc(22, 22, 17, (152 * Math.PI) / 180, (207 * Math.PI) / 180);
                ctx.stroke();

                // Arc 5
                ctx.beginPath();
                ctx.arc(22, 22, 17, (212 * Math.PI) / 180, (267 * Math.PI) / 180);
                ctx.stroke();

                // Arc 6
                ctx.beginPath();
                ctx.arc(22, 22, 17, (272 * Math.PI) / 180, (327 * Math.PI) / 180);
                ctx.stroke();
            }

            if (remainder > (boundaryIncrementer * 2) && remainder <= (boundaryIncrementer * 3)) {
                // Arc 1
                ctx.beginPath();
                ctx.arc(22, 22, 17, (332 * Math.PI) / 180, (27 * Math.PI) / 180);
                ctx.stroke();

                // Arc 2
                ctx.beginPath();
                ctx.arc(22, 22, 17, (32 * Math.PI) / 180, (87 * Math.PI) / 180);
                ctx.stroke();

                // Arc 3
                ctx.strokeStyle = '#d89747';
                ctx.beginPath();
                ctx.arc(22, 22, 17, (92 * Math.PI) / 180, (147 * Math.PI) / 180);
                ctx.stroke();

                // Arc 4
                ctx.strokeStyle = '#363537';
                ctx.beginPath();
                ctx.arc(22, 22, 17, (152 * Math.PI) / 180, (207 * Math.PI) / 180);
                ctx.stroke();

                // Arc 5
                ctx.beginPath();
                ctx.arc(22, 22, 17, (212 * Math.PI) / 180, (267 * Math.PI) / 180);
                ctx.stroke();

                // Arc 6
                ctx.beginPath();
                ctx.arc(22, 22, 17, (272 * Math.PI) / 180, (327 * Math.PI) / 180);
                ctx.stroke();
            }

            if (remainder > (boundaryIncrementer * 3) && remainder <= (boundaryIncrementer * 4)) {
                // Arc 1
                ctx.beginPath();
                ctx.arc(22, 22, 17, (332 * Math.PI) / 180, (27 * Math.PI) / 180);
                ctx.stroke();

                // Arc 2
                ctx.beginPath();
                ctx.arc(22, 22, 17, (32 * Math.PI) / 180, (87 * Math.PI) / 180);
                ctx.stroke();

                // Arc 3
                ctx.beginPath();
                ctx.arc(22, 22, 17, (92 * Math.PI) / 180, (147 * Math.PI) / 180);
                ctx.stroke();

                // Arc 4
                ctx.strokeStyle = '#d89747';
                ctx.beginPath();
                ctx.arc(22, 22, 17, (152 * Math.PI) / 180, (207 * Math.PI) / 180);
                ctx.stroke();

                // Arc 5
                ctx.strokeStyle = '#363537';
                ctx.beginPath();
                ctx.arc(22, 22, 17, (212 * Math.PI) / 180, (267 * Math.PI) / 180);
                ctx.stroke();

                // Arc 6
                ctx.beginPath();
                ctx.arc(22, 22, 17, (272 * Math.PI) / 180, (327 * Math.PI) / 180);
                ctx.stroke();
            }

            if (remainder > (boundaryIncrementer * 4) && remainder <= (boundaryIncrementer * 5)) {
                // Arc 1
                ctx.beginPath();
                ctx.arc(22, 22, 17, (332 * Math.PI) / 180, (27 * Math.PI) / 180);
                ctx.stroke();

                // Arc 2
                ctx.beginPath();
                ctx.arc(22, 22, 17, (32 * Math.PI) / 180, (87 * Math.PI) / 180);
                ctx.stroke();

                // Arc 3
                ctx.beginPath();
                ctx.arc(22, 22, 17, (92 * Math.PI) / 180, (147 * Math.PI) / 180);
                ctx.stroke();

                // Arc 4
                ctx.beginPath();
                ctx.arc(22, 22, 17, (152 * Math.PI) / 180, (207 * Math.PI) / 180);
                ctx.stroke();

                // Arc 5
                ctx.strokeStyle = '#d89747';
                ctx.beginPath();
                ctx.arc(22, 22, 17, (212 * Math.PI) / 180, (267 * Math.PI) / 180);
                ctx.stroke();

                // Arc 6
                ctx.strokeStyle = '#363537';
                ctx.beginPath();
                ctx.arc(22, 22, 17, (272 * Math.PI) / 180, (327 * Math.PI) / 180);
                ctx.stroke();
            }

            if (remainder > (boundaryIncrementer * 5) && remainder < (boundaryIncrementer * 6)) {
                // Arc 1
                ctx.beginPath();
                ctx.arc(22, 22, 17, (332 * Math.PI) / 180, (27 * Math.PI) / 180);
                ctx.stroke();

                // Arc 2
                ctx.beginPath();
                ctx.arc(22, 22, 17, (32 * Math.PI) / 180, (87 * Math.PI) / 180);
                ctx.stroke();

                // Arc 3
                ctx.beginPath();
                ctx.arc(22, 22, 17, (92 * Math.PI) / 180, (147 * Math.PI) / 180);
                ctx.stroke();

                // Arc 4
                ctx.beginPath();
                ctx.arc(22, 22, 17, (152 * Math.PI) / 180, (207 * Math.PI) / 180);
                ctx.stroke();

                // Arc 5
                ctx.beginPath();
                ctx.arc(22, 22, 17, (212 * Math.PI) / 180, (267 * Math.PI) / 180);
                ctx.stroke();

                // Arc 6
                ctx.strokeStyle = '#d89747';
                ctx.beginPath();
                ctx.arc(22, 22, 17, (272 * Math.PI) / 180, (327 * Math.PI) / 180);
                ctx.stroke();
            }

            window.requestAnimationFrame(drawDivisionLoader);

        }


        container.Start = function () {
            container.append(loader);
            $(canvas).center(true, container);

            window.requestAnimationFrame(drawDivisionLoader);

            return container;

        }

        container.Stop = function () {
            window.cancelAnimationFrame(drawDivisionLoader);
            loader.remove();
        }
        return container;
    };

    $.fn.dialog = function (options) {
        var settings = $.extend({
            onSave: undefined,
            onCancel: undefined,
            onDelete: undefined,
            deleteText: "Delete",
            saveText: "Save",
            cancelText: "Cancel",
            content: undefined,
            title: undefined,
            autoFillDataUrl: undefined
        }, options);

        var dialog = $("<div class='lightDataDialog'><h1>" + (settings.title ? settings.title : "&nbsp;") + "<span class='cancel'>X</span></h1><nav></nav></div>");

        dialog.settings = settings;
        if ($(".lightDataDialog").length > 0)
            dialog.css("zIndex", ($(".lightDataDialog").css("z-index")) + $(".dim").length);

        function dimScreen() {
            var dimClass = "dim" + $(".dim").length + "dim dim";
            var dim = $("<div class='" + dimClass + "'></div>");
            if ($(".dim").length > 0)
                dim.css("zIndex", ($(".dim").css("z-index")) + $(".dim").length);
            return dim;
        }

        dialog.resize = function (bound) {

            setTimeout(function () {
                dialog.center(true);
                if (!bound)
                    dialog.find("h1").width(dialog[0].getBoundingClientRect().width);
                else {
                    dialog.find("h1").css("min-width", dialog[0].getBoundingClientRect().width);
                    if (bound.width)
                        dialog.find("h1").css("width", bound.width);
                    if (bound.height)
                        dialog.find("h1").css("height", bound.height);

                    dialog.center(true);
                }
            }, 1);
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

            if (settings.onCancel) {
                dialog.find("span.cancel").remove();
                dialog.find("h1").append("<span class='cancel'>" + settings.cancelText + "</span>");
                dialog.find("h1> .cancel").click(function () {
                    if (settings.onCancel(dialog) !== false) {
                        dialog.remove();
                        dim.remove();
                    }
                });
            }

            if (settings.onSave) {
                dialog.find("h1").append("<span class='save'>" + settings.saveText + "</span>");
                dialog.find("h1> .save").click(function () {
                    if (settings.onSave(dialog) !== false) {
                        dialog.remove();
                        dim.remove();
                    }
                });
            }

            if (settings.onDelete) {
                dialog.find("h1").append("<span class='delete'>" + settings.deleteText + "</span>");
                dialog.find("h1> .delete").click(function () {
                    if (settings.onDelete(dialog) !== false) {
                        dialog.remove();
                        dim.remove();
                    }
                });
            }

            $("body").append(dialog).append(dim);

            dialog.resize();
        }

        return dialog;
    };

}(jQuery));