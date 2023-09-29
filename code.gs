/** Routing */
var Route = {};
Route.path = function(route, callback){
  Route[route] = callback;
}

function doGet(e){
  Route.path("court-user-data", loadCourtUserDataPage);
  Route.path("court-list", loadCourtListPage);
  if (Route[e.parameters.uri]){
    return Route[e.parameters.uri]();
  } else {
    return render(
      "index",
      {
        title: "Wanna Basket?"
      }
    );
  }
}

/** Render HTML */
function render(templateFileName, argsObject){
  var template = HtmlService.createTemplateFromFile(templateFileName);
  /** If second argument exists for render method, render it */
  if(argsObject){
    // extract keys from argsObject and save them as list
    var keys = Object.keys(argsObject);
    keys.forEach(function(key){
      template[key] = argsObject[key];
    });
  }
  return template.evaluate().setTitle(argsObject.title).setFaviconUrl("https://em-content.zobj.net/thumbs/240/apple/354/basketball_1f3c0.png");
}


/** Display number of court user */
function loadCourtUserDataPage(){
  /** Get list of court name */
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let dataSheet = ss.getSheetByName('court-list');
  let lastRow = dataSheet.getLastRow();
  let courtList = dataSheet.getRange(2,1,lastRow-1,1).getValues();
  let formattedCourtList = courtList.flat();
  return render(
    "court-user-data",
    { 
      title: "User Data",
      courtList: formattedCourtList
    }
  );
}
function loadCourtListPage(){
  return render(
    "court-list",
    {
      title: "Court List"
    }
  );
}
/** Get average number of court users */
function getAvgUser(sheetName){
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (sheetName) {
      var dataSheet = ss.getSheetByName(sheetName);
    } else {
      var dataSheet = ss.getSheetByName('Plaine de jeux Reine Astrid');
    }
    var getLastRow = dataSheet.getLastRow();
    var valuesArray = dataSheet.getRange(3,2,1,7).getValues();
    var values = valuesArray.flat();
    return values;
}


/** Get daily court user number */
function getSheetData(sheetName){
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    /** Refer to sheet */
    if ( sheetName ) {
      var dataSheet = ss.getSheetByName(sheetName);
    } else {
      var dataSheet = ss.getSheetByName('Plaine de jeux Reine Astrid');  // When sheet name isn't specified
    }
    var getLastRow = dataSheet.getLastRow();
    var values = dataSheet.getRange(4,1,getLastRow-1,8).getValues();
    var allData = [];  // Save daily number of court users
    values.forEach( (array, parentIndex) => {
      var temporaryArray = [];
    })
    return values;
}

function addValuesToSheet(selectedCourtName, values) {
    Logger.log("[addValuesToSheet()] fired.");
    let ss = SpreadsheetApp.getActiveSpreadsheet();
    if (selectedCourtName) {
      var dataSheet = ss.getSheetByName(selectedCourtName);
    } else {
      var dataSheet = ss.getSheetByName('Plaine de jeux Reine Astrid');
    }
    /** Extract information from sheet */
    var month = values[0];
    var day = values[1];
    var dayOfWeek = values[2];
    var userNum = values[3];
    /** Generate timestamp */
    var timestamp = Utilities.formatDate(new Date(), 'Europe/Paris', 'yyyy/MM/dd HH:mm');
    var date = `${month}/${day} (${dayOfWeek})`;  // replace date with specific format
    var processedValues = [date, userNum];
    Logger.log(`processedValues: ${processedValues}`);
    /** Write values to sheet */
    switch (dayOfWeek) {
      case 'Mon': // do nothing
        processedValues = [date, userNum, "", "", "", "", "", "", timestamp];
        break;
      case 'Tue':
        processedValues = [date,"", userNum, "", "", "", "", "", timestamp]; // arrayPushCount(numberOfTimesToPushEmptyStringTo processedValues) = 1;
        break;
      case 'Wed':
        processedValues = [date,"", "", userNum, "", "", "", "", timestamp]; // arrayPushCount = 2;
        break;
      case 'Thu':
        processedValues = [date,"", "", "", userNum, "", "", "", timestamp]; // arrayPushCount = 3;
        break;
      case 'Fri':
        processedValues = [date,"", "", "", "", userNum, "", "", timestamp]; // arrayPushCount = 4;
        break;
      case 'Sat':
        processedValues = [date,"", "", "", "", "", userNum, "", timestamp]; // arrayPushCount = 5;
        break;
      case 'Sun':
        processedValues = [date,"", "", "", "", "", "", userNum, timestamp]; // arrayPushCount = 6;
        break;
      default:  // Processes to be performed in cases other than the above
        Logger.log(`The process is aborted because the information of the day of the week is not normal. \nThe value of the retrieved day of the week(dayOfWeek): ${dayOfWeek}`);
        return;
        break;
    }
    dataSheet.appendRow(processedValues);
    return "[Message from server] Success";
}


function getScriptURL(e) {
  var url = ScriptApp.getService().getUrl();
  return url;
}

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getCourtListData(){
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let dataSheet = ss.getSheetByName('court-list');
  let lastRow = dataSheet.getLastRow();
  let values = dataSheet.getRange(2,1,lastRow-1,13).getValues();  // getRange( StartLineIndex, StartColumnIndex, LineRange, ColumnRange );
  var formattedDataArray = [];
  /** Format info */
  values.forEach( (value, index) => {
    let name = value[0];
    let address = value[1];
    let distance = value[2];
    let latitude = value[7];
    let longitude = value[8];
    let gMapEmbeddedLink = value[9];
    let siteLink = value[10];
    let gMapLink = value[12];
    let dataDictionary = {
      name: name,
      address: address,
      distance: distance,
      latitude: latitude,
      longitude: longitude,
      gMapEmbeddedLink: gMapEmbeddedLink,
      siteLink: siteLink,
      gMapLink: gMapLink
    };
    formattedDataArray.push(dataDictionary);
  });
  Logger.log(formattedDataArray);
  return formattedDataArray;
}