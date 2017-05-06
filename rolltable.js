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
    isDataLoaded: false,

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
            RollTable.isDataLoaded = true;
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
        if (RollTable.isDataLoaded) {
            switch (RollTable.ViewModel.selectedGroupName()) {

                case RollTable.GROUP_NAMES.TAVERN:
                    var newDisplayText = String.format('{0} {1}, {2}',
                                            RollTable.getItem('tavern-name-1'),
                                            RollTable.getItem('tavern-name-2'),
                                            RollTable.getItem('tavern-environment')
                                         );
                    RollTable.ViewModel.displayText(newDisplayText);
                    break;

                case RollTable.GROUP_NAMES.NPC:
                    var newDisplayText = RollTable.getItem('arctic-random');
                    RollTable.ViewModel.displayText(newDisplayText);
                    break;

                default:
                    break;
            }
        }
    },

    getItem: function (tableName) {
        var table = RollTable.tableData[tableName];

        if (typeof (table) !== 'undefined') {
            var randomIndex = Math.floor((Math.random() * table.length));
            var initialText = table[randomIndex].replace(/\n/g, '<br />'); //globally replace all '\n' characters with <br />
            return RollTable.getRecursiveText(initialText);
        }
        else {
            return '';
        }
    },

    getRecursiveText: function (initialText) {
        var firstBracket = initialText.indexOf('{');
        var lastBracket = initialText.indexOf('}');
        if (firstBracket >= 0 && lastBracket > firstBracket) {
            var recursiveTableName = initialText.substring(firstBracket + 1, lastBracket);
            var newItem = RollTable.getItem(recursiveTableName);

            if (newItem === '') { return initialText; } //couldn't find table

            var replaceKey = new RegExp('{' + recursiveTableName + '}', 'g');
            var newText = initialText.replace(replaceKey, newItem);//globally replace all '{tableName}' with the new rolled item
            return RollTable.getRecursiveText(newText);
        }
        else {
            return initialText;
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