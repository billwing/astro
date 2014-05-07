CKEDITOR.dialog.add('knowledge', function (editor) {
    return {
        title: '选择知识点',
        minWidth: 910,
        minHeight: 500,
        contents: [
			{
			    id: 'tab1',
			    label: 'First Tab',
			    title: 'First Tab',
			    elements: [
                    {
                        id: 'knowledgePanel',
                        type: 'html',
                        html:
                            "<div id='pointSelectorPanel'>" +
                                "<div class='cke_questions_know_content'>" +
                                "</div>"+
                            "</div>",
                    }
			    ]
			}
        ],
        onShow: function () {
            $(".cke_dialog_footer").hide();

           
            var pointPart = this._.editor.currentKnowledgePointPart;
            //第一步，显示框架
            var _self = this;
            var multiSelector =  new pointMultiSelector({
                confirmCallback: function () {
                    //获得选择的数据
                    var points = $(multiSelector.selectedItems || new Array()).map(function () {
                        return {
                            PointCode: this.id,
                            PointName: this.name,
                            NeedLevel: $("li[rel=" + this.id + "] span a.curr").attr("rel")
                        };
                    }).get();

                    //给外部赋值
                    pointPart.setValue(points);
                    _self.hide();
                }
            });

            multiSelector.selectedItems = pointPart.children[1].getValue() || new Array();
            multiSelector.show(subject.ID, subject.name);
        }
    };
});

var getDataPath = "";

//学科版本选择器 （单元+章节+小节+知识点 多级下拉框）
var versionSelector = function (settingOptions) {
    var self = this;
    self.settings = {
        periodExpr: "#period",
        gradeExpr: "#grade",
        semesterExpr: "#semester",
        subjectExpr: "#subject",
        versionExpr: "#version",
        PeriodId: "",
        GradeId: "",
        SemesterId: "",
        SubjectId: "",
        VersionId: ""
    };
    $.extend(true, self.settings, settingOptions || {});

    self.value = function () {
        return {
            PeriodId: self.settings.PeriodId,
            GradeId: self.settings.GradeId,
            SemesterId: self.settings.SemesterId,
            SubjectId: self.settings.SubjectId,
            VersionId: self.settings.VersionId
        };
    };

    self.appendOptions = function (elemExpr, array, acquireValue, acquireText, categoryName) {
        var item = $(elemExpr);

        item.empty();

        if (categoryName) {
            item.append(string.Format("<option value=''>{0}</option>", categoryName));
        }

        $(array).each(function () {
            item.append(string.Format("<option  value='{0}'>{1}</option>", acquireValue(this), acquireText(this)));
        });
    };

    self.periodInit = function () {
        self.appendOptions(self.settings.periodExpr, PeriodList.Period, function (i) { return i.PeriodID; }, function (i) { return i.name; }, "学段");
    };

    self.gradeInit = function () {
        var gradeArray = [];
        if (self.settings.PeriodId) {
            gradeArray = FindGradeBy(self.settings.PeriodId);
        };

        self.appendOptions(self.settings.gradeExpr, gradeArray, function (i) { return i.ID; }, function (i) { return i.name; }, "年级");
    };

    self.semesterInit = function () {
        var semesterArray = [];
        if (self.settings.GradeId) {
            semesterArray = QuestionSemester.Semester;
        };
        self.appendOptions(self.settings.semesterExpr, semesterArray, function (i) { return i.Value; }, function (i) { return i.name; }, "学期");
    };

    self.subjectInit = function () {
        self.appendOptions(self.settings.subjectExpr, CurriculumList.Curriculum, function (i) { return i.ID; }, function (i) { return i.name; }, "学科");
    };

    self.versionInit = function () {

        var url = string.Format(urlConfig.getVersion_url || "/API/GetQuestionBookVersion?PeriodID={0}&GradeID={1}&CurriculumID={2}&QuestionSemester={3}",
            self.settings.PeriodId,
            self.settings.GradeId,
            self.settings.SubjectId,
            self.settings.SemesterId);

        var esUrl = getDataPath == "" ? url : escape(url);
        $.post(getDataPath + esUrl, {}, function (data) {
            if (getDataPath != "") {
                data = JSON.parse(data);
            }

            self.appendOptions(self.settings.versionExpr, data, function (i) { return i.DKey; }, function (i) { return i.DValue; }, "版本");
        });
    };

    $(string.Format("{0},{1},{2},{3}", self.settings.periodExpr, self.settings.gradeExpr, self.settings.semesterExpr, self.settings.subjectExpr, self.settings.versionExpr)).change(function () {
        var val = $(this).val();
        $(this).nextAll().attr("disabled", "disabled");
        if (val) {
            $(this).next().removeAttr("disabled");
        }
    }).eq(0).change();

    $(self.settings.periodExpr).change(function () {
        self.settings.PeriodId = $(this).val();
        self.gradeInit();
        self.versionInit();
    });

    $(self.settings.gradeExpr).change(function () {
        self.settings.GradeId = $(this).val();
        self.semesterInit();
        self.versionInit();
    });

    $(self.settings.semesterExpr).change(function () {
        self.settings.SemesterId = $(this).val();
        self.versionInit();
    });

    $(self.settings.subjectExpr).change(function () {
        self.settings.SubjectId = $(this).val();
        self.versionInit();
    });

    self.init = function() {
        self.periodInit();
        self.gradeInit();
        self.semesterInit();
        self.subjectInit();
        self.versionInit();
    };

    return self;
};

///用来展示选择知识点。它里边包含两个MultiSelector对象
//MultiSelector1：根据知识点树查询知识点
//MultiSelector2：根据学科版本树选择知识点
var pointMultiSelector = function(settingOptions) {
    var self = this;
    self.settings = {
        title: "选择知识点",
        tabPanelExpr: "#pointTabs",
        maxPointNumber: 20,
        contentTemplate: "<h4 class='f_14'>添加知识点(已添加 <span id='pointCount'>0</span> 个知识点)</h4>" +
            "<ul id='multiSelected' class='list_zsd cf mt5'></ul>" +
            "<div id='pointTabs' id='menu_12' class='menu_02 mt20'>" +
            "<ul class='fl'>" +
            "<li><a href='javascript:void(0);'>按知识点搜索</a></li>" +
            "<li class='curr'><a href='javascript:void(0);'>按课文搜索</a></li>" +
            "</ul>" +
            "</div>" +
            "<div>" +
            "<div class='con_12' style='display:none;'>" +
            "<div id='searchPanel' class='mt10 mb10' style='width:864px;display:block;overflow:hidden;'>" +
            "<div style='display:inline-block;width:216px;_display:inline;_zoom:1;'>" +
            "<input type='text' class='w_150 h_20 lh_20 vam mr10' style='height:20px;line-height:20px;border:1px solid #999;margin:0 5px 0 0' />" +
            "<a class='btnSearch btn_01' data-level='0'><span>搜索</span></a>" +
            "</div>" +
            "<div style='display:inline-block;width:216px;_display:inline;_zoom:1;'>" +
            "<input type='text' class='w_150 h_20 lh_20 vam mr10' style='height:20px;line-height:20px;border:1px solid #999;margin:0 5px 0 0' />" +
            "<a class='btnSearch btn_01' data-level='1'><span>搜索</span></a>" +
            "</div>" +
            "<div style='display:inline-block;width:216px;_display:inline;_zoom:1;'>" +
            "<input type='text' class='w_150 h_20 lh_20 vam mr10' style='height:20px;line-height:20px;border:1px solid #999;margin:0 5px 0 0' />" +
            "<a class='btnSearch btn_01' data-level='2'><span>搜索</span></a>" +
            "</div>" +
            "<div style='display:inline-block;width:216px;_display:inline;_zoom:1;'>" +
            "<input type='text' class='w_150 h_20 lh_20 vam mr10' style='height:20px;line-height:20px;border:1px solid #999;margin:0 5px 0 0'/>" +
            "<a class='btnSearch btn_01'  data-level='3'><span>搜索</span></a>" +
            "</div>" +
            "</div>" +
            "<dl id='pointSelectPanel1' class='dl_lsit cf'>" +
            "<dd><ul data-level='0'></ul></dd>" +
            "<dd><ul data-level='1'></ul></dd>" +
            "<dd><ul data-level='2'></ul></dd>" +
            "<dd><ul data-level='3'></ul></dd>" +
            "</dl>" +
            "</div>" +
            "<div class='con_12'>" +
            "<div style='margin:10px 0'>{0}：" +
            "<select id='period' style='width:130px;margin:0 10px 0 0;'></select>" +
            "<select id='grade' style='width:130px;margin:0 10px 0 0;'></select>" +
            "<select id='semester' style='width:130px;margin:0 10px 0 0;'></select>" +
            "<select id='version' style='width:130px;margin:0 10px 0 0;'></select>" +
            "</div>" +
            "<dl id='pointSelectPanel2' class='dl_lsit cf'><dd><ul></ul></dd><dd><ul></ul></dd><dd><ul></ul></dd><dd><ul></ul></dd></dl>" +
            "</div>" +
            "</div>" +
            "<div class='tc pt15'><a id='pointSelectorConfirm' class='btn_yes'>确定</a></div>",
        confirmCallback: function() { //dlg.cls("pointSelectorPanel");
        }
    };
    $.extend(true, self.settings, settingOptions || {});

    //当前已选择的知识点集合,MultiSelector1与MultiSelector2共用此集合
    self.selectedItems = new Array();
    self.MultiSelector1 = null;
    self.MultiSelector2 = null;

    self.tabs = function() {
        $(self.settings.tabPanelExpr).find("a").click(function() {
            $(this).parent().addClass("curr");
            $(this).parent().siblings().removeClass("curr");

            var currentIndex = $(this).parent().index();
            var target = $(this).parents("div:first").next().find(">div").eq(currentIndex);
            target.siblings().hide();
            target.show();
        });
    };

    self.bindConfirmAndCancelClick = function() {
        $("#pointSelectorConfirm,#pointSelectorCancel").click(self.settings.confirmCallback);
    };

    $('#searchPanel a.btnSearch').live('click', function() {
        var searchKey = $(this).prev('input').val();


        var level = $(this).attr('data-level');
        var items = self.MultiSelector1.findItemPanel(level).children();

        if (!searchKey || !searchKey.trim()) {
            items.show();
        } else {
            for (var i = items.length; i > 0; i--) {
                var item = $(items[i - 1]);
                if (item.text().indexOf(searchKey) == -1) {
                    item.hide();
                } else {
                    item.show();
                }
            }
        }
    });

    $('#pointSelectPanel1 a').live('click', function() {
        var nextLevel = parseInt($(this).parents('ul:first').attr('data-level')) + 1;
        $('#searchPanel a.btnSearch[data-level=' + nextLevel + ']').prev('input').val('');
    });

    $("#version").live("change", function() {
        self.MultiSelector2.settings.otherParam.bookVersionId = $(this).val();
        self.MultiSelector2.init();
    });

    self.removeAt = function(index) {
        self.selectedItems.splice(index, 1);
    };

    self.itemChangeCallback = function(items) {
        $("#pointCount").html(items.length);
    };

    self.show = function(subjectId, subjectName, renderHtmlCallback) {

        if (!subjectName)
            subjectName = "";

        if (!renderHtmlCallback) {
            renderHtmlCallback = function(settings, html) {
                $(".cke_questions_know_content").html(html);
            };
        }

        renderHtmlCallback(self.settings, string.Format(self.settings.contentTemplate, subjectName));

        new versionSelector({ SubjectId: subjectId }).init();

        self.tabs();

        self.bindConfirmAndCancelClick();

        self.MultiSelector1 = $("#pointSelectPanel1").MultiSelector({ maxPointNumber: self.settings.maxPointNumber, otherParam: { subjectId: subjectId }, itemChangeCallback: self.itemChangeCallback });
        self.MultiSelector2 = $("#pointSelectPanel2").MultiSelector({ maxPointNumber: self.settings.maxPointNumber, getChildrenUrlFormat: urlConfig.getChildNodes_url || "/PointAPI/GetChildNodes?referenceId={0}&level={1}", otherParam: { subjectId: subjectId }, itemChangeCallback: self.itemChangeCallback });
        self.MultiSelector1.items = self.selectedItems;
        self.MultiSelector2.items = self.selectedItems;
        self.MultiSelector1.init();
        self.MultiSelector2.init();

        self.itemChangeCallback(self.selectedItems);
    };
};

jQuery.fn.extend({
    MultiSelector: function(settingOptions) {
        var self = this;
        self.settings = {
            title: "选择知识点",
            getChildrenUrlFormat: urlConfig.getChildPointNodes_url || "/Question/GetChildPointNodes?pointCode={0}&level={1}",
            otherParam: {},
            selectedItemPanelExpr: "#multiSelected",
            selectedItemTemplate: "<li>" +
                "<h4 class='t_elli f_14'>{0}</h4>" +
                "<div class='cf mt5'>" +
                "<span class='fl menu_04'>" +
                "<a class='ratingDevice curr' href='javascript:;' rel='1'>了解</a>" +
                "<a class='ratingDevice' href='javascript:;' rel='2'>理解</a>" +
                "<a class='ratingDevice' href='javascript:;' rel='3'>掌握</a>" +
                "</span>" +
                "<a class='fr link_1 btn_cls' href='javascript:;'>删除</a>" +
                "</div>" +
                "</li>",
            selectedItemRemoveButtonExpr: "a.btn_cls",
            selectedItemRatingDeviceButtonExpr: "a.ratingDevice",
            itemPanelExpr: "ul",
            itemTemplate: "<li><a class='{1}'>{0}</a></li>",
            loadingTemplate: "<li>加载中…</li>",
            currentItemClass: "curr",
            parentItemClass: "next",
            maxPointNumber: 20,
            itemChangeCallback: function(items) {}
        };
        self.items = new Array();

        $.extend(true, self.settings, settingOptions || {});

        self.buildSelectedPanelByItems = function() {
            var selectedPanel = $(self.settings.selectedItemPanelExpr);
            selectedPanel.find($(self.settings.selectedItemTemplate).get(0).tagName).remove();
            $.each(self.items, function() {
                selectedPanel.append(self.buildSelectedShowItem(this));
            });
        };

        self.buildSelectedShowItem = function(dataItem) {
            var itemHtml = $(string.Format(self.settings.selectedItemTemplate, dataItem.name));
            itemHtml.attr("rel", dataItem.id);
            itemHtml.find(self.settings.selectedItemRemoveButtonExpr).click(function() {
                self.remove(dataItem);
            });
            itemHtml.find(self.settings.selectedItemRatingDeviceButtonExpr).click(function() {
                dataItem.ratingDevice = parseInt($(this).attr("rel"));
                $(this).addClass("curr");
                $(this).siblings(self.settings.selectedItemRatingDeviceButtonExpr).removeClass("curr");
            });

            //dataItem.ratingDevice && itemHtml.find(self.settings.selectedItemRatingDeviceButtonExpr).filter(':[rel=' + dataItem.ratingDevice + ']').click();
            return itemHtml;
        };

        self.add = function(data) {
            if (self.items.length >= self.settings.maxPointNumber) {
                alert(string.Format("最多只能选择{0}个知识点。", self.settings.maxPointNumber));
                return;
            }

            var idArray = $(self.items).map(function() {
                return this.id;
            }).get();

            if ($.inArray(data.id, idArray) == -1) {
                self.items.push(data);
                self.buildSelectedPanelByItems();
                self.settings.itemChangeCallback(self.items);
            } else {
                alert("不能添加重复知识点。");
            }
        };

        self.remove = function(data) {
            var index = $.inArray(data, self.items);
            if (index >= 0) {
                self.removeAt(index);
            }
        };
        self.removeAt = function(index) {

            if (index >= self.items.length)
                return;

            $(self.settings.selectedItemPanelExpr).find(string.Format("[rel='{0}']", self.items[index].id)).remove();

            self.items.splice(index, 1);
            self.settings.itemChangeCallback(self.items);
        };

        self.findItemPanel = function(level) {
            return self.find(self.settings.itemPanelExpr).eq(level == null ? 0 : level);
        };

        self.loadingLock = function(content) {
            content.empty();
            content.append(self.settings.loadingTemplate);
        };

        self.loadedUnlock = function(content) {
            content.empty();
        };

        self.getChildren = function(currentId, level) {
            var childLevel = level == null ? 0 : level + 1;
            var childItemPanel = self.findItemPanel(childLevel);
            self.find(self.settings.itemPanelExpr).filter(string.Format(":gt({0})", childLevel - 1)).empty();
            self.loadingLock(childItemPanel);

            var versionIdParam = "";
            if (typeof (self.settings.otherParam.bookVersionId) != "undefined") {
                versionIdParam = "&bookVersionId=" + self.settings.otherParam.bookVersionId;
            } else {
                versionIdParam = "";
            }

            var esUrl = getDataPath == "" ? string.Format(self.settings.getChildrenUrlFormat, currentId, level) + "&subjectId=" + self.settings.otherParam.subjectId + versionIdParam : escape(string.Format(self.settings.getChildrenUrlFormat, currentId, level) + "&subjectId=" + self.settings.otherParam.subjectId + versionIdParam);

            $.get(getDataPath + esUrl, function(data) {

                self.loadedUnlock(childItemPanel);

                if (data && data.length > 0) {
                    if (getDataPath != "") {
                        data = JSON.parse(data);
                    }

                    $.each(data, function(index, itemData) {
                        var item = $(string.Format(self.settings.itemTemplate, itemData.name, itemData.isParent ? self.settings.parentItemClass : ""));

                        item.click(function() {

                            if (itemData.isParent) {
                                self.getChildren(itemData.id, childLevel);
                            } else {
                                self.add(itemData);
                            }

                            $(this).addClass(self.settings.currentItemClass).siblings().removeClass(self.settings.currentItemClass);
                        });

                        childItemPanel.append(item);
                    });
                }
            });
        };

        self.init = function() {
            self.getChildren("", null);
            self.buildSelectedPanelByItems();
            return self;
        };

        return self;
    }
});
