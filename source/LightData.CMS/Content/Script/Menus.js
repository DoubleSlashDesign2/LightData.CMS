(function ($) {
    $.fn.menus = function (options) {
        var settings = $.extend({
            getUri: undefined,
            saveUri: undefined,
            deleteUri: undefined,
            header: undefined
        }, options);

        var container = $(this);
        container.addClass("tableTree");

        container.render = function () {
            container.LightDataAjax({
                contentType: "application/json",
                dataType: "json",
                type: "POST",
                url: settings.getUri,
                success: function (data) {
                    container.html("");
                    container.append("<h2>" + settings.header + "<span title='Add new Menus' class='addItem'></span></h2>");

                    function renderChildren(items, parent) {
                        $.each(items, function () {
                            var tItem = this;
                            var div = $("<li></li>");
                            div.append("<div itemId='" + this.id + "' class='arrow-down'></div><span class='sp'><span class='text'>" + this.displayName + "</span></span>");
                            bindEdit(div.find(".text"), this);
                            if (this.children && this.children.length > 0) {
                                var ul = $("<ul class='subItem'></ul>");
                                ul.hide();
                                GetValue(this.id.toString(),
                                    function (data) {
                                        if (data === true)
                                            div.find("div[itemId='" + tItem.id + "']").click();
                                    });
                                div.append(ul);
                                renderChildren(this.children, ul);
                            } else div.find("div[itemId='" + tItem.id + "']").css("visibility", "hidden");

                            parent.append(div);
                        });
                    }
                    var ulContainer = $("<ul></ul>");
                    container.append(ulContainer);
                    $(data).each(function () {
                        var tItem = this;
                        var div = $("<li></li>");
                        div.append("<div itemId='" + this.id + "' class='arrow-down'></div><span class='sp'><span class='text'>" + this.displayName + "</span></span>");
                        bindEdit(div.find(".text"), this);
                        if (this.children && this.children.length > 0) {
                            var ul = $("<ul class='subItem'></ul>");
                            ul.hide();
                            GetValue(this.id.toString(),
                                function (t) {
                                    if (t === true)
                                        div.find("div[itemId='" + tItem.id + "']").first().click();

                                });

                            div.append(ul);
                            renderChildren(this.children, ul);
                        } else div.find("div[itemId='" + tItem.id + "']").css("visibility", "hidden");

                        ulContainer.append(div);
                    });

                    container.find("li> span").mouseover(function (e) {
                        if ($(e.target).hasClass("sp") || $(e.target).hasClass("text"))
                            $(this).find(".text").addClass("selected");
                    }).mouseout(function () {
                        $(this).find(".text").removeClass("selected");
                    });

                    function folder() {
                        container.find(".arrow-up, .arrow-down").click(function () {
                            if ($(this).hasClass("arrow-up")) {
                                $(this).parent().children("ul").hide();
                                $(this).removeClass("arrow-up").addClass("arrow-down");
                                SetValue($(this).attr("itemId"), false);
                            } else {
                                $(this).parent().children("ul").show();
                                $(this).removeClass("arrow-down").addClass("arrow-up");
                                SetValue($(this).attr("itemId"), true);
                            }
                        });


                        container.find("span.addItem").click(function () {
                            container.create();
                        });
                    }

                    function bindEdit(li, item) {
                        li.contextMenu({
                            dataSource: [
                                {
                                    text: "Edit",
                                    id: 0
                                }, {
                                    text: "Delete",
                                    id: 1
                                }
                            ],
                            click: function(tItem) {
                                if (tItem.id === 0)
                                    container.create(item);
                                else container.delete(item);
                            }
                        });
                    }

                    folder();
                }

            });
        }

        container.delete = function(item) {
            container.dialog({
                content: "You will be deleting this item and all its children.<br> Are you sure?",
                saveText: "OK",
                onCancel: function () { },
                cancelText: "NO",
                onSave: function () {
                    container.LightDataAjax({
                        contentType: "application/json",
                        dataType: "json",
                        type: "POST",
                        async: false,
                        data: JSON.stringify(item),
                        url: settings.deleteUri,
                        success: function (data) {
                            container.render();
                            return true;
                        }
                    });
                }
            }).show();
        }

        container.create = function (item) {
            if (!item)
                item = { displayName: "", children: [], id: 0, parentId: null, uri: "", publish: false, description: "" }

            var editContainer = $("<div class='inputContainer'></div>");
            editContainer.append("<label>Name:</label>");
            editContainer.append("<input type='text' class='txtname' value='" + item.displayName + "' />");
            editContainer.append("<label>Choose Parent:</label>");
            editContainer.append("<input type='text' class='txtparent' value='None' />");

            editContainer.append("<label>Url:</label>");
            editContainer.append("<input type='text' class='txtUri' value='" + item.uri + "' />");
            editContainer.append("<label>Visible:</label>");
            editContainer.append("<input type='checkbox' class='chkPublished' checkType='Yes,NO' label='Publish' />");
            editContainer.append("<label>Description:</label>");
            editContainer.append("<textarea class='txtDescription'></textarea>");
            editContainer.find(".txtDescription").val(item.description);

            editContainer.find(".chkPublished").prop("checked", item.publish && item.publish === true);
            editContainer.dialog({
                content: editContainer,
                title: item.id > 0 ? "Edit/Delete" : "Add new",
                onSave: function () {
                    return container.save(item, editContainer);
                }
            }).show();
            var hideValues = [item.id];
            $.each(item.children,
                function () {
                    hideValues.unshift(this.id);
                });
            editContainer.find(".txtparent").autoFill({
                ajaxUrl: settings.autoFillDataUrl,
                textField: "displayName",
                valueField: "id",
                selectedValue: item.parentId,
                hideValues: hideValues,
                additionalValues: [{ displayName: "None", id: "" }]
            });

            return editContainer;
        }

        container.save = function (item, editContainer) {

            if (!isNullOrEmpty(editContainer.find(".txtparent").attr("selectedValue")))
                item.parentId = eval(editContainer.find(".txtparent").attr("selectedValue"));
            else {
                item.parentId = null;
            }

            item.displayName = editContainer.find(".txtname").val();
            item.uri = editContainer.find(".txtUri").val();
            item.publish = editContainer.find(".chkPublished").is(":checked");
            item.description = editContainer.find(".txtDescription").val();
            container.LightDataAjax({
                contentType: "application/json",
                dataType: "json",
                type: "POST",
                async: false,
                data: JSON.stringify(item),
                url: settings.saveUri,
                success: function (data) {
                    container.render();
                    return true;
                }
            });
        }

        container.render();
        //container.center()
        return container;
    }

}(jQuery));