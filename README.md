# Tfly_Beacon
###An implementation of iBeacon technology to take ticket information, verify that the information exists in a database and display the result

I'll break this down by file. If there are any questions/issues, feel free to drop me a line.

##iBeaconWrite_V2_7.js
The highest up in the file heirarchy of the program. This is where the magic happens. This portion has three main tasks:
1. Performing two shell commands that reset the bluetooth daemon of the Edison
2. Beginning the intialiazation of the rest of the files in the heirarchy
3. Initalizing and managing the iBeacon and BLE services and events of the beacon

##SDReplaceFunction.js
An unimplemented function for the SdSearch module

| Function Name            | Description                                               | Arguments                                                                                                                                                   | Returns | Note |
|--------------------------|-----------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|------|
| changeTicketStatusVoid() | Changes the status of the selected ticket line to "Void"  | line: the ticket line from the file being read TicketTypeRetrieve: the ticket type of the ticket you found filePath: the path to the ticket containing file | N/A     |      |

##SdSearch.js
Manages the search of the SD card for a specific ticket string. Also manages the upper level ultrasonic tasks as we want to stop taking measurements for a period of time if a 

####SD functions
| Function Name            | Description                                                                                                                                                 | Arguments                                                                                                                                                                        | Returns | Note                                                                                                                                                                             |
|--------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| searchForTicketString()  | Searches the selected file for the input search string and uses the __TypeLogic() function to display the proper system reaction if a ticket match is found | *stringToFind*: the string received by the BLE beacon to be searched in the database *typeToSearch*: the type of input string, either (1) ticket UUID, or (2) ticket holder name | N/A     | N/A                                                                                                                                                                              |
| __successfulSearch()     | Displays the admit signals if a search is successful                                                                                                        | N/A                                                                                                                                                                              | N/A     | Cannot be called outside the SDSearch.js file                                                                                                                                    |
| __successfulSearchVIP()  | Displays the VIP specific admit signals if a search is successful                                                                                           | N/A                                                                                                                                                                              | N/A     | Cannot be called outside the SDSearch.js file                                                                                                                                    |
| __successfulSearchVoid() | Displays the Void specific admit signals if a search is successful                                                                                          | N/A                                                                                                                                                                              | N/A     | Cannot be called outside the SDSearch.js file                                                                                                                                    |
| __TypeLogic()            | Performs type logic to determine what kind of successful search response to throw if a ticket UUID/name is a match                                          | N/A                                                                                                                                                                              | N/A     | Cannot be called outside the SDSearch.js file                                                                                                                                    |
| __fileName()             | Reassigns the name of the file to be searched based off of the arguments from the command line                                                              | N/A                                                                                                                                                                              | N/A     | When beginning the program, add a third argument to the command line call, i.e. `node iBeaconWrite_V2_7.js yourTicketdatabase.txt` Cannot be called outside the SDSearch.js file |

##UltrasonicSensor.js
Controls and sets up reading the ultrasonic. 

| Function Name          | Description                                                                                                                                                                                                                                                         | Arguments | Returns | Note |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|---------|------|
| initUltrasonic()       | Initiate the voltage reading pin to read from the ultrasonic (US).                                                                                                                                                                                                  | N/A       | N/A     | N/A  |
| takeUSReading()        | Calibrates the US on startup. Then takes readings from the US and heavily filters the data to avoid large deviations in US readings. Displays a no admit if a consistent deviation less than the calibrated value of the sensor is detected and set a flag to true. | N/A       | N/A     |      |
| __resetIndicatorFlag() | Reset the indicator flag to true in order to display no admit again if another deviation is detected.                                                                                                                                                               | N/A       | N/A     | N/A  |

## UUID_Strings.txt
An example file of the structures necessary to read ticket strings with the SdSearch module

##Images
The necessary images for the OledDisplay module

##Node_Indicators
The OLED driver and bindings

##node_modules
* **Bleno**:
  The javascript beacon API
* **line-reader**:
  As it sounds, used in SdSearch to 
* **png-to-lcd**:
  Used to convert png images to lcd compatible bitmaps
* **replace**:
  Used to aid the unimplemented SDReplaceFunction
* **segfault-handler**:
  Used to catch and manage unexpected segfaults
* **exec**:
  Used to execute shell commands from within the script
* **javascript-state-machine**:
  State machine--overall controller for state changes

#Future suggestions
See the issues section


#Relevant Documentation 

Maxsonar EZ: http://www.maxbotix.com/documents/HRLV-MaxSonar-EZ_Datasheet.pdf
