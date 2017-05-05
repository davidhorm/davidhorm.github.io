String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }

    return s;
}

var RollTable = RollTable || {

    gsIdentifier: 'gsx$',
    tableNames: [],
    tableData: {},

    GROUP_NAMES: {
        TAVERN: "Tavern",
        NPC: "NPC"
    },

    load: function () {
        ko.applyBindings(RollTable.ViewModel);
        RollTable.loadData();
    },

    loadData: function () {
        //https://spreadsheets.google.com/feeds/worksheets/1Z7fw4F97NzxhXaLdrHutlZ-RdaVQxgtNETlflF12SKA/private/full to determine new tabs
        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/list/1Z7fw4F97NzxhXaLdrHutlZ-RdaVQxgtNETlflF12SKA/od45auw/public/values?alt=json";
        $.getJSON(url, function (data) {
            var rows = data.feed.entry;
            RollTable.loadTableNames(rows[0]);
            RollTable.loadTableData(rows);
            //console.log(RollTable.tableData);
        });
    },

    loadTableNames: function (row) {
        for (columnName in row) {
            if (columnName.indexOf(RollTable.gsIdentifier) === 0) {
                var tableName = columnName.substring(RollTable.gsIdentifier.length);
                RollTable.tableNames.push(tableName);
                RollTable.tableData[tableName] = [];
            }
        }
    },

    loadTableData: function (rows) {

        for (var i = 0; i < RollTable.tableNames.length; i++) {
            var tableName = RollTable.tableNames[i];
            var propertyName = RollTable.gsIdentifier + tableName;

            for (var j = 0; j < rows.length; j++) {
                var cellValue = rows[j][propertyName].$t;
                if (cellValue !== '') {
                    RollTable.tableData[tableName].push(cellValue);
                }
                else {
                    break;
                }
            }
        }

    },

    updateDisplayText: function () {
        switch (RollTable.ViewModel.selectedGroupName()) {

            case RollTable.GROUP_NAMES.TAVERN:
                var newDisplayText = String.format('{0} {1}, {2}',
                    RollTable.getItem('tavernname1'),
                    RollTable.getItem('tavernname2'),
                    RollTable.getItem('tavernenvironment'));
                RollTable.ViewModel.displayText(newDisplayText);
                break;

            case RollTable.GROUP_NAMES.NPC:
                RollTable.ViewModel.displayText('hello my name is david');
                break;

            default:
                break;
        }
    },

    getItem: function (tableName) {
        var table = RollTable.tableData[tableName];

        if (typeof (table) !== 'undefined') {
            var randomIndex = Math.floor((Math.random() * table.length));
            return table[randomIndex];
        }
        else {
            return '';
        }
    }
};

RollTable.ViewModel = RollTable.ViewModel || {

    selectedGroupName: ko.observable(),
    groupNameClickHandler: function (name) { RollTable.ViewModel.selectedGroupName(name); },
    groupNames: [
        { groupName: RollTable.GROUP_NAMES.TAVERN },
        { groupName: RollTable.GROUP_NAMES.NPC }
    ],
    displayText: ko.observable()
};

RollTable.ViewModel.selectedGroupName.extend({ notify: 'always' });
RollTable.ViewModel.selectedGroupName.subscribe(function (newValue) {
    RollTable.updateDisplayText();
});