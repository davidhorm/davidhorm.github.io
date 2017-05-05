var RollTable = RollTable || {
	
	gsIdentifier:'gsx$',
	tableNames:[],
	tableData:{},
	
	loadData: function(){
		//https://spreadsheets.google.com/feeds/worksheets/1Z7fw4F97NzxhXaLdrHutlZ-RdaVQxgtNETlflF12SKA/private/full to determine new tabs
        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/list/1Z7fw4F97NzxhXaLdrHutlZ-RdaVQxgtNETlflF12SKA/od45auw/public/values?alt=json";

        $.getJSON(url, function (data) {

            var rows = data.feed.entry;

			RollTable.loadTableNames(rows[0]);
			RollTable.loadTableData(rows);
			
            console.log(RollTable.tableData);

        });
	},
	
	loadTableNames: function(row){
		for(columnName in row){
			if(columnName.indexOf(RollTable.gsIdentifier)===0){
				var tableName = columnName.substring(RollTable.gsIdentifier.length);
				RollTable.tableNames.push(tableName);
				RollTable.tableData[tableName] = [];
			}
		}
	},
	
	loadTableData: function(rows){
		
		for(var i=0; i < RollTable.tableNames.length; i++){
			var tableName = RollTable.tableNames[i];
			var propertyName = RollTable.gsIdentifier + tableName;
			
			for(var j = 0; j< rows.length; j++){
				var cellValue = rows[j][propertyName].$t;
				if(cellValue !== ''){
						RollTable.tableData[tableName].push(cellValue);
				}
				else{
					break;
				}
			}
		}
		
	}
};
