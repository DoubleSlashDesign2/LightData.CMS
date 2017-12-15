(function ($) {
    $.fn.articles = function (options) {
        var settings = $.extend({
            getUri: undefined,
            saveUri: undefined,
            deleteUri: undefined,
            header: undefined,
            allchecked: false,
            autoFillMenusDataUrl: undefined,
            themeUrl: undefined
        }, options);
        var container = $(this);


        container.delete = function (artikelsIds) {
            if (!artikelsIds || artikelsIds.length <= 0)
                return;
            container.dialog({
                content: "You are about to delete this/those items. <br> do you wish to continue?",
                onSave: function () {
                    container.LightDataAjax({
                        contentType: "application/json",
                        dataType: "json",
                        type: "POST",
                        data: JSON.stringify({ items: artikelsIds }),
                        url: settings.deleteUri,
                        success: function (data) {
                            container.render();
                        }
                    });
                }
            }).show();


        }

        container.generateIFrame = function (onDataLoaded) {
            var iframe = $('<iframe src="' + settings.themeUrl + '" id="frameDemo"></iframe>');
            iframe[0].onload = function () {
                if (onDataLoaded)
                    onDataLoaded(iframe);
            }
            return iframe;

        }

        container.save = function (item) {
            if (!item)
                item = { articleName: "", metaKeywords: [], published: false, articleNodes: [], MenusId: 0 }
            var dialog = undefined;
            var editContainer = $("<div class='inputContainer'></div>");
            var tabControl = editContainer.tabs({
                onSelect: function () {
                    tabControl.setPos();
                }
            });

            var tabBasicValues = tabControl.add("Basic", "Basic settings");
            var tabContent = tabControl.add("Article", "Content");
            tabControl.selectTab("Basic");
            tabBasicValues.content.addClass("inputContainer");
            tabBasicValues.content.append("<label>Name:</label>");
            tabBasicValues.content.append("<input type='text' class='txtname' value='" + item.articleName + "' />");
            tabBasicValues.content.append("<label>Visible:</label>");
            tabBasicValues.content.append("<input type='checkbox' class='chkPublished' checkType='Yes,NO' label='Publish' />");
            tabBasicValues.content.append("<label>Choose Menu:</label>");
            tabBasicValues.content.append("<input type='text' class='txtMenus' value='None' />");

            tabBasicValues.content.find(".chkPublished").prop("checked", item.published && item.published === true);
            tabBasicValues.content.find(".txtMenus").autoFill({
                ajaxUrl: settings.autoFillMenusDataUrl,
                textField: "displayName",
                valueField: "id",
                selectedValue: item.MenusId,
                hideValues: undefined,
                additionalValues: [{ displayName: "None", id: "" }]
            });

            var countries = base.getActiveCountries();

            $.each(countries, function () {
                var node = $.grep(item.articleNodes, function (a) { return a.languageId == this.id });
                if (node.length <= 0) {
                    item.articleNodes.push({ languageId: this.id, pageHeader: "", content: "", tags: "" });
                    node = $(item.articleNodes).last()[0];
                } else node = node[0];

                tabBasicValues.content.append("<label>Header:</label>");
                tabBasicValues.content.append("<input type='text' class='txtheader' value='" + node.pageHeader + "' />");
            });


            tabContent.content.append(container.generateIFrame(function (iframe) {
                dialog.resize({ width: "97vw" });
                var tags = iframe.contents().find("tag");
                tags.click(function () {
                    var tag = $(this);
                    var tagContent = $("<div><textarea style='width:100%; height:800px;'></textarea></div>");
                    var editor = undefined;
                    tagContent.find("textarea").val(tag.html());
                    dialog.dialog({
                        content: tagContent,
                        title: "Tag content",
                        onSave: function () {
                            tag.html(editor.val());
                        }
                    }).show();
                    editor = tagContent.find("textarea").htmlarea();

                });

            }));

            dialog = editContainer.dialog({
                content: tabControl,
                title: item.id > 0 ? "Edit/Delete" : "Add new",
                onSave: function () {
                    //return container.save(item, editContainer);
                }
            });

            dialog.show();

        }

        container.render = function () {
            container.html("");
            var table = $("<table><thead><tr></tr><tr></tr></thead><tbody></tbody></table>");
            table.find("thead >tr").first().append("<th colspan='5'><h2 class='header'>" +
                settings.header +
                "<a title='Delete selected items' class='delete'><span></span></a><span title='Add new item' class='addItem'></span></h2></th>");
            table.find("thead >tr").last().append("<th><input type='checkbox' /></th>")
                .append("<th>Name</th>")
                .append("<th>Published</th>")
                .append("<th>Menu</th>")
                .append("<th style='width: 40px;'></th>");


            table.find("thead").find(".addItem").click(function () {
                container.save(undefined);
            });

            table.find("thead").find(".delete").click(function () {
                var ids = [];
                table.find("tbody").find("input.item:checked").each(function () {
                    ids.push(eval($(this).attr("itemId")));
                });
                container.delete(ids);
            });
            container.append(table);

            table.find("thead >tr").last().find("input[type='checkbox']").change(function () {
                settings.allchecked = $(this).is(":checked");
                $.checkBox({ items: table.find("tbody").find(".item") }).prop(settings.allchecked);
            });

            container.LightDataAjax({
                contentType: "application/json",
                dataType: "json",
                type: "POST",
                data: JSON.stringify({ pageNr: 1, value: "" }),
                url: settings.getUri,
                success: function (data) {
                    function renderItem(item, tr) {
                        tr
                            .append("<td><input itemId='" + item.id + "' type='checkbox' class='item' /></td>")
                            .append("<td>" + item.articleName + "</td>")
                            .append("<td><input disabled='disabled' type='checkbox' value='" + item.published + "' /></td>")
                            .append("<td>" + item.menus.displayName + "</td>")
                            .append("<td><a class='delete'><span></span></a><a class='edit'><span></span></a></td>");

                        tr.find(".delete").click(function () {
                            container.delete([item.id]);
                        });

                    }

                    $.each(data, function () {
                        var tr = $("<tr></tr>");
                        renderItem(this, tr);
                        table.find("tbody").append(tr);

                    });
                    container.tableFix();
                }
            });
        }

        container.render();
    };
}(jQuery));