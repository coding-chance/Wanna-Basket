# Wanna Basket?
This is a web application to support street basket players to organize information of basket courts around your house.
- Show the list of courts
- Record the state of basket court
- Get information about the local basket court such as location, distance from your house, quality of its facility, etc.
- Calculate how many user occupys courts by recording number of users

This app runs on Google Apps Script, therefore no cost for hosting is required. In addition, everything from the stored data to the user interface of the application is customizable.

<br>

## User Interface

### Top
You can select either `Court User Data` or `Court List` page.

![top](https://github.com/coding-chance/Wanna-Basket/blob/master/ui/top.jpg?raw=true)

### Number of Users
On this page, you can check how many user occupys the court and you can register the number of users through the app.

![court-info-top](https://github.com/coding-chance/Wanna-Basket/blob/master/ui/court-info-top.jpg?raw=true)

<br>

You can see the user count data by selecting the court and pressing the green button.

![court-info-chart-1](https://github.com/coding-chance/Wanna-Basket/blob/master/ui/court-info-chart.jpg?raw=true)

<br>

You can register the user count data by typing the number of user and pressing register button.

![court-info-chart-1](https://github.com/coding-chance/Wanna-Basket/blob/master/ui/court-info-register.jpg?raw=true)

<br>


### Court List
You can check list of basket court and itenerary.

![court-list-top](https://github.com/coding-chance/Wanna-Basket/blob/master/ui/court-list-top.jpg?raw=true)

<br>

You can check itenerary by clicking on a blue button.

![court-list-map-gif](https://github.com/coding-chance/Wanna-Basket/blob/master/ui/court-list-map-link-click.gif?raw=true)

<br>



## Installation
This app is written in GAS (Google Apps Script) and this is container-bound script which is bound to a spread sheet. Please set up by following the steps below.

- Create spread sheet.
- Create container-bound GAS script by clicking on `Tools` and click `Script Editor`
- Duplicate all the files in this repository on your GAS rditor.
- Modify spread sheet. You need following sheet
    - cour-list: GAS script refers to this sheet to get the court data
    - files that store details of each court
- Publish the app by clicking `Deploy` button on top of GAS editor, and copy the `URL` displayed after deployment
- Access to URL on your browser. When you access to the app, you'll see a message such as `This app isn't verified` or `Authorization Required`. To use the app, you have to authenticate script attached to spreadsheet so please follow the steps below.
    - Click on `Advanced` on bottom left
    - Click on `Go to { App Name } (unsafe)` on bottom left
    - Click on `Authorize` button on the right
- Create sheets on spreadsheet and fill in the cells as follows

### Sheet 1. court-list
This sheet saves all the information of court and list them up. The app refers to this sheet when it shows the list of courts.

| A | B | C | D | E | F | G | H | I | J | K | L | M | 
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| Name of Court | Address | Distance from Home [km] | Internal / External | Number of Courts | Number of Baskets | Notice | Latitude | Longitude | Embed GMap iframe Link | site-officiel | reference | Google Map External Link | 
| Wonder Park | 1, Wonder street, 4950, Coutnry | 2.3 | External | 2 | 3 | Court with clean basket rings | 50.84225535372029 | 4.382280568217475 | <i frame src="https://www.google.com/maps/link" /i frame>[^1] | https://official-site.c.o.m | https://reference.c.o.m | No need to type cuz it's automatically filled with two values of coordinates |

> *The embedded map iframe link (column J) can be obtained on Google map. Only thing you have to do is to click on a location and click on share button, after that, choose `Embedd Map`.
 
<br>

### Sheet 2...  : detail sheet for each court
This sheet is to gather details of the court. Quality of facility, environment, users' characteristics and so on. This sheet must accumulate all the data that will help you decide which court you will practice in the future.
Values in columns 'A' through 'I' are automatically populated by the app operation, while the values in columns K through R must be entered manually by you.

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | 
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| Date <br> (Auto) | Mon <br> (Auto) | Tue <br> (Auto) | Wed <br> (Auto) | Thu <br> (Auto) | Fri <br> (Auto) | Sat <br> (Auto) | Sun <br> (Auto) | Timestamp <br> (Auto) | (Empty) | Hour | User Count | Distance | Pollen | Ring Net | with Fence or without Fence | Ground Quality | Others |
| 2023/09/01 | 1 | 4 | 30 | 10 | 2 | 1 | 0 | 2023/05/26 19:46:00 |  | 19:30 - 21:00 | 5 | Easy (400m from home) | Be careful of Kaplan in April | One ring has no net | Small (1m) | Dents or holes were found | There's free waterserver near the court |

<br>

Now, you're ready to use the app.

<br>


## Usage
Access to the URL of web app automatically generated by GAS (You can see the URL anytime by clicking on `Deploy` button on GAS editor). The functionalities of the app are as follows.

### Get Court Data
- Location
- Quality of Court
- Number of users

### Register Court info
- Facility assesment
- How busy courts are

<br>

## Trouble Shoot
If the app doesn't work, let me know of the details in `issue` page on github.