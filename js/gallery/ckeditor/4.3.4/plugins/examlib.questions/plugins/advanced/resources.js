var examlib;
if (!examlib) {
    examlib = {};
}

if (!examlib.resources) {

    examlib.resources = {
        //学段
        period: [
            { "id": "1001", "name": "小学" },
            { "id": "1003", "name": "初中" },
            { "id": "1005", "name": "高中" },
            { "id": "1007", "name": "大学" },
            { "id": "1009", "name": "幼儿" }
        ],
        //年级
        grade: [
            //小学
            { "periodId": "1001", "id": "1101", "name": "一年级" },
            { "periodId": "1001", "id": "1102", "name": "二年级" },
            { "periodId": "1001", "id": "1103", "name": "三年级" },
            { "periodId": "1001", "id": "1104", "name": "四年级" },
            { "periodId": "1001", "id": "1105", "name": "五年级" },
            { "periodId": "1001", "id": "1106", "name": "六年级" },
            //初中
            { "periodId": "1003", "id": "1107", "name": "一年级" },
            { "periodId": "1003", "id": "1108", "name": "二年级" },
            { "periodId": "1003", "id": "1109", "name": "三年级" },
            //高中
            { "periodId": "1005", "id": "1111", "name": "一年级" },
            { "periodId": "1005", "id": "1112", "name": "二年级" },
            { "periodId": "1005", "id": "1113", "name": "三年级" },
            //大学
            { "periodId": "1007", "id": "1118", "name": "一年级" },
            { "periodId": "1007", "id": "1119", "name": "二年级" },
            { "periodId": "1007", "id": "1120", "name": "三年级" },
            { "periodId": "1007", "id": "1121", "name": "四年级" },
            //幼儿
            { "periodId": "1009", "id": "1114", "name": "小班" },
            { "periodId": "1009", "id": "1115", "name": "中班" },
            { "periodId": "1009", "id": "1116", "name": "大班" },
            { "periodId": "1009", "id": "1117", "name": "大大班" }
        ],
        //科目
        subject: [
            { "id": "1", "name": "语文" },
            { "id": "2", "name": "数学" },
            { "id": "3", "name": "英语" },
            { "id": "4", "name": "英语II" },
            { "id": "5", "name": "思想品德" },
            { "id": "6", "name": "思想政治" },
            { "id": "7", "name": "历史" },
            { "id": "8", "name": "地理" },
            { "id": "9", "name": "物理" },
            { "id": "10", "name": "化学" },
            { "id": "11", "name": "生物" },
            { "id": "12", "name": "历史与社会" },
            { "id": "13", "name": "计算机" },
            { "id": "14", "name": "文科数学" },
            { "id": "15", "name": "理科数学" },
            { "id": "16", "name": "文综合" },
            { "id": "17", "name": "理综合" },
            { "id": "18", "name": "大综合" },
            { "id": "19", "name": "品德与社会" },
            { "id": "20", "name": "体音美劳" },
            { "id": "21", "name": "信息科学与技术" },
            { "id": "22", "name": "政治" },
            { "id": "23", "name": "代数" },
            { "id": "24", "name": "几何" },
            { "id": "25", "name": "普及类竞赛" },
            { "id": "26", "name": "科学" },
            { "id": "27", "name": "德育" },
            { "id": "28", "name": "百科苑" }
        ],
        //学期
        semester: [
            { "id": "1201", "name": "上学期" },
            { "id": "1202", "name": "下学期" },
            { "id": "1203", "name": "全册" }
        ],
        //地区
        area: [
            '京', '沪', '津', '渝', '鲁', '苏', '湘', '闽', '川', '赣', '皖', '浙', '陕', '宁', '辽', '鄂', '粤', '琼', '冀', '豫', '晋', '桂', '滇', '黔', '黑', '吉', '蒙', '青', '藏'
        ],
        //适用范围
        scope: [
            { id: '1', name: '课文同步' },
            { id: '2', name: '单元测试' },
            { id: '3', name: '期中考试' },
            { id: '4', name: '期末考试' },
            { id: '5', name: '小升初' },
            { id: '6', name: '中考' },
            { id: '7', name: '高考' },
            { id: '15', name: '暑假作业' },
            { id: '16', name: '寒假作业' }
        ],
        //难易度
        level: [
            { id: '1', name: '容易' },
            { id: '2', name: '中等' },
            { id: '3', name: '困难' }
        ]
    };

    examlib.resources.finder = {
        findBy: function (array, value, filter, index) {
            if (!filter) {
                filter = function (data) {
                    return data.id;
                }
            }

            var resultData = $(array).map(function () {
                if (parseInt(filter(this)) == parseInt(value)) {
                    return this;
                }
            });

            if (index != null && index != undefined) {
                if (resultData.length > index) {
                    return resultData.get(index)
                }
                else {
                    return null;
                }
            }
            else {
                return resultData.get();
            }
        },
        findPeriodById: function (periodId) {
            return examlib.resources.finder.findBy(examlib.resources.period, periodId, undefined, 0);
        },
        findGradeById: function (gradeId) {
            return examlib.resources.finder.findBy(examlib.resources.grade, gradeId, undefined, 0);
        },
        findSubjectById: function (subjectId) {
            return examlib.resources.finder.findBy(examlib.resources.subject, subjectId, undefined, 0);
        },
        findSemesterById: function (semesterId) {
            return examlib.resources.finder.findBy(examlib.resources.semester, semesterId, undefined, 0);
        },
        findGradeByPeriod: function (periodId) {
            return examlib.resources.finder.findBy(examlib.resources.grade, periodId, function (data) { return data.periodId; });
        },
        findSubjectByPeriod: function (periodId) {
            var period = examlib.resources.finder.findPeriodById(periodId);
            return $(period.subjects).map(function () {
                return examlib.resources.finder.findSubjectById(this);
            }).get();
        }
    };
}
