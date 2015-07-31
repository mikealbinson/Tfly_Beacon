//SdSearch.js

/******************************************************************************
 * SD Search Definition
 ******************************************************************************/
console.log('SDSearch up');
var lineReader = require('line-reader');
var fs = require('fs');
var LaB = require ('./LedsAndBuzzer.js');
var oled = require ('./OledDisplay.js');
var Ultrasonic = require('./UltrasonicSensor.js');

var timeoutFlag = false;
var __filePathToUse = "";
var __sdFilepath = "/media/sdcard/"

oled.beginOled();
oled.displayAdmit();

var __defaultFile = "/media/sdcard/UUID_Strings.txt";
Ultrasonic.initUltrasonic();
__startUsingUltrasonic();
console.log("US Started");
__fileName();

//main search function
exports.searchForTicketString = function (stringToFind, typeToSearch){
	var foundFlag = false;
  lineReader.eachLine(__filePathToUse, function(line, last) {
    var lengthString = line.length
    var commaIndex1 = line.indexOf(',');
    var commaIndex2 = line.indexOf(',', commaIndex1+1);
    if (foundFlag == false){
      if (typeToSearch == 1){
        var TicketNumberRetrieve = line.substring (0, commaIndex1);
        console.log(TicketNumberRetrieve);
        if (stringToFind == TicketNumberRetrieve){
          foundFlag = true;
          var TicketTypeRetrieve = line.substring (commaIndex2+1, lengthString-1);
          __TypeLogic(TicketTypeRetrieve)
        }
      }
      else if (typeToSearch == 2){
        var TicketNameRetrieve = line.substring (commaIndex1+1, commaIndex2);
        console.log(TicketNameRetrieve);
        if (stringToFind == TicketNameRetrieve){
          foundFlag = true;
          __successfulSearch();
        }
      }
      /*  --really no need for this implementation... doesn't really serve a purpose
      //  but I'll leave it in case someone wants the base logic. __TypeLogic goes 
      // through everything more exhaustively-- but hey, here this is
      else if (typeToSearch == 3){
        var TicketTypeRetrieve = line.substring (commaIndex2+1, lengthString);
        console.log(TicketTypeRetrieve);
        if (stringToFind == TicketTypeRetrieve){
          foundFlag = true;
          __successfulSearch();
        }
      }
      */
      else{
        console.log('unacceptable search type');
      }
      if(last){
        if (foundFlag == false){
          console.log('no match found');
          LaB.ledFlashNoAdmit();
          LaB.buzzNoAdmit();
          oled.displayNoAdmit();
          timeoutFlag = true;
          setTimeout(__resetTimeoutFlag, 1000);
        }
        else {
          foundFlag == false;
        }
      }
    }
  });
}

// SDSearch result functions
function __successfulSearch(){
  console.log('success--General');
  timeoutFlag = true;
  setTimeout(__resetTimeoutFlag, 1000);
  LaB.ledFlashAdmit();
  LaB.buzzAdmit();
  oled.displayAdmit();
}

function __successfulSearchVIP(){
  console.log('success--VIP');
  timeoutFlag = true;
  setTimeout(__resetTimeoutFlag, 1000);
  LaB.ledFlashAdmit();
  LaB.buzzAdmit();
  oled.displayAdmitVIP();
}

function __successfulSearchVOID(){
  console.log('success--VOID');
  timeoutFlag = true;
  setTimeout(__resetTimeoutFlag, 1000);
  LaB.ledFlashAdmit();
  LaB.buzzAdmit();
  oled.displayNoAdmitVoid();
}

//a brief check to the ticket type to give the correct kind of response
function __TypeLogic (TicketTypeRetrieve){
  console.log(TicketTypeRetrieve);
  if (TicketTypeRetrieve == "VIP"){
    __successfulSearchVIP();
  }
  else if (TicketTypeRetrieve == "General"){
     __successfulSearch();
  }
  else if (TicketTypeRetrieve == "Void") {
    __successfulSearchVOID();
  }
  else {
    console.log ("unacceptable ticket type")
  }
}

function __fileName(){
  var arguments = process.argv;
  var actualArguments = arguments.slice(2);
  if (actualArguments[0] != undefined){
    __filePathToUse = __sdFilepath+actualArguments[0];
    console.log(__filePathToUse);
  }
  else {
    console.log("no extra arguments supplied--filename set to default")
    __filePathToUse = __defaultFile;
    console.log(__filePathToUse);
  }

}

/******************************************************************************
 * High level Ultrasonic Tasks
 * ~~~Included here because reading the ultrasonic needs to be stopped
 *    temporarily in order for the person to walk through without getting
 *    flagged as "No Admit"
 ******************************************************************************/
function __startUsingUltrasonic(){
  if (timeoutFlag == false) {
    Ultrasonic.takeUSReading();
  }
  setTimeout(__startUsingUltrasonic, 5);
}

function __resetTimeoutFlag (){
  console.log("US armed")
  timeoutFlag = false;
}