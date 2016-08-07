# Project 2 for Code Institute - School Donations Dashboard  

## Introduction
This project is a **data visualization that contains interactive charts** which use a dataset from DonorsChoose.org -*a US based non-profit organization that allows individuals to donate money directly to public school classroom projects*-.  **This dashboard enables exploring and filtering data stored in a non-relational database**. 

## Notes
* **All charts are interrelated, so any filter applied in any chart will affect the remainder charts**. That way, **unless you wanted to apply several filters together, it’s better to reset filter after each query**.  
 
* Given the large amount of data stored in the database, **are necessary several seconds for the data being loaded**.

* Not all charts displayed have a *specific meaning* (no meaningful relationship between variables used). Some of them were displayed just in order to practise and create as many different kind of charts as possible. That is the case of the bubble chart and the scatter plot.   

## Data

The original data -which come from a CSV file- are imported to a non relational database -MongoDB- and converted into JSON format. 

## Structure

Apart from data, vendors libraries and CSS files used, this project basically consists of three parts:
* **graph.js**: where data and charts are handled.
* **school_donations.py**: where routes and data connection are managed.
* **html templates** (*index.html*, *main.html* and *detail.html*): where data and graphs are showed.

Project tree:

![Dashboard_tree](https://github.com/abmist/Project_2/blob/master/static/images/tree_project_2.jpg)

## Main steps to create this project

__*graph.js*__

**1. Data section**

* Load the data: **dataset from DonorsChoose.org** and a **geojson file -necessary to create the US map**. Although it is not strictly necessary for this project, it's been used a *queue()* function to wait until the data is available from each api before passing on the combined data for processing (it can be handy if the data source is changed).

* Carry out some transformations to clean the dataset: 
	* Parse the date data type (from string to datetime objects).
	* Set all projects date days to 1 using `.setDate(1)`, and use `.getMonth() +1` for months.
	* Ensure to work with numbers, using a unary operator `+` to coerce string representation of numbers from variables such as *total_donations* or *num_donors* to number values. 

**2. Crossfilter section**

* Add a helper function to check the work with Crossfilter.js in the console. 

* Create a Crossfilter instance and the dimensions based on that instance. *Note*: The dimension for the scatter plot needs two variables. 

* Define data groups based on dimensions.

* Calculate the metrics that will be represented later. Some of these metrics are calculated over dimensions and others over the total. Depending on the case, there can be used more than one of these metrics in the same chart. That's what happens with *priceLayer1*, *priceLayer2* and *priceLayer3* which represent three ranges of price in the stacked line chart.  

* Calculate max and min values that are used in the *domains* of some charts such as stacked lines chart or the map, among others.

* Make some calculations for the big number charts (like averages) and the titles of bubble chart. *These calculations have been put here just to keep all crossfilter elements together. But they have to be created insofar they are needed.*

**3. DC and D3 section**

* Define **number formats** that will be used in the titles of charts (when the mouse over them), to make them more readable. *Again, these elements have been put here just to keep all the formats together. But they have to be created insofar they are needed.*

* Add a **counter** that shows the amount of records selected when filters are applied.

* Create the DC.js chart objects (map, charts, big numbers, data selectors and data table), which will be binded to HTML elements of  the templates (*main.html* and *detail.html*) by means of CSS ID selectors.

* Configure each individual chart passing the necessary parameters.

* To render the charts, use: `dc.renderAll();`

__*school_donations.py*__

* In this project it is used the micro framework Flask to build a server.
* Import the required modules.
* Set the connection to database (database name, port, fields that will be used, etc.) The current configuration is for working locally.   
* Set the routes to render the templates. 

__*html templates*__

* Create *index.html* which acts as a shell where the other templates are injected.
* Cretate divs in *main.html* and *detail.html* with ID where DC.js charts will be binded. 
* It will be use Keen.js for the dashboard template.
* The chart template will also include a *step-by-step guide* built with [Intro.js](https://www.http://introjs.com/).

**Note of folders**:  It’s important not to change the folder names *static* and *templates* because Flask expects files to be in those folders.

## Useful comments on charts

* The **map** needs a **geojson file**. 
	* To manage the data from that file it's used `.overlayGeoJson()`. 
	* To handle the map projection it's used `.projection()`. 
	* To show different colour tones depending on the number of donations, there have been employed `.colors()`, `.colorDomain()`, and `.colorCalculator()`.   
* Almost all charts include **titles** that are displayed when the mouse over any element of them. 
	* The data presented in titles (like *donations in USD, percentages, dates,* etc.) were rendered and customised using `.title()` and `.renderTitle()`. 
	* The **customisation** depends on each chart topic. Most of the times it consists in deciding which data you want to show, which format you want to use, if you want rounded figrues or not, etc. 
	* Apart from titles, some charts also include legends.
* In the **composite and line charts** there are available some **useful options**. *Depending on your needs you can activate them*. **Maybe it's not practical to have all of them activated in the same chart**.
	* `.brushOn()`: This option implements focus and context zooming when you click and drag to select a time period. 
	* `.mouseZoomable()`: This option also lets you select a time period when the mouse pointer over a point of chart.
	* `.rangeChart()`: This option lets you connect a chart to another one. That way, when a time period is selected -using `.brushOn()` or `.mouseZoomable()`- in any of the connected charts, the other reacts showing the same time period. If there are several line charts, they can be chained with this option.
* The **composite chart** consists of two line charts (*donations in USD* and *number of donations*), which details are set in `.compose()`. 
	* In this kind of charts it may be convenient to set a secondary axis using `.rightYAxisLabel()`.  
* The **volume chart** (below the map) shows data, but actually works more as time period selector. 
* The **scatter plot** needs a dimension with two variables (*students_reached* and *num_donors*). 
* The **bubble chart** uses metrics named *bubbleVars* for the information displayed in its titles.
* The **stacked line chart** uses `.stack()` to add additional lines to the one displayed with `group()`.

## Summary of main elements added to the initial project

 | Initial | __*Added*__ | Total
--- | --- | --- | ---
Dimensions | 5 | __*12*__ | 17
Groups | 5 | __*10*__ | 15
Metrics | 1 | __*16*__ | 17
Max - Min values | 3 |  __*6*__ | 9
Charts | 4 |  __*15*__ | 19
Big numbers | 2 | __*6*__ | 8
Data selector | 1 | __*7*__ | 8
Maps | - | __*1*__ | 1
Table| - | __*1*__ | 1
Record counter | - | __*1*__ | 1
Templates | 1 | __*1*__ | 2

Most of the elements that have been added appear in *graph.js* separated from the initial ones by a blank line, but not charts. Apart from a bar chart, two row charts and a pie chart, *the remainder charts have been added*. 

## Content 

This site consists of **two parts** separated into different pages, **one for charts** and **the other one for a detailed data table**. 

### PART 1 – Charts 

* 1 map
* 19 charts
* Summary of 8 big numbers (big figures in absolute and relative terms)


**Charts introduction**  
This part also includes a **step-by-step guide** (built with Intro.js) that assigns an interactive pop-up tooltip to graphs where can be displayed helpful information to the user who is going to use the dashboard.

![Dashboard_intro](https://github.com/abmist/Project_2/blob/master/static/images/dashboard_intro.jpg)


As it has been mentioned before, all charts are interrelated. Any filter applied in any chart affects the rest of charts. For that purpose, the dashboard has a **button to reset filters**. It also has a **counter** that shows the records selected and the total amount of records.

![Dashboard_reset_button_and_record_counter](https://github.com/abmist/Project_2/blob/master/static/images/dashboard_reset_and_counter.jpg)



**Screenshots of PART 1 - Charts**


![Dashboard_map](https://github.com/abmist/Project_2/blob/master/static/images/dashboard.jpg)

![Dashboard_line_charts](https://github.com/abmist/Project_2/blob/master/static/images/dashboard_2.jpg)

![Dashboard_bar_charts_and_circle_charts](https://github.com/abmist/Project_2/blob/master/static/images/dashboard_3.jpg)

![Dashboard_bubble_chart](https://github.com/abmist/Project_2/blob/master/static/images/dashboard_4.jpg)

![Dashboard_scatter_plot](https://github.com/abmist/Project_2/blob/master/static/images/dashboard_5.jpg)


**List of charts**

Type | Title |
--- | --- 
**Map** | Donation in USD by state
**Bar chart** | Volume of donations with a brush to filter time periods
**Big numbers** | Number of donations (default: all)
	| Percentage of donations (default: 100%)
	| Donations in USD (default: all)
	| Average donations in USD (default: all)
	| Number of students reached (default: all)
	| Average students reached (default: all)
	| Number of donors (default: all)
	| Average donors (default: all)
**Composite (line) chart** | Number of donations and US dollars donated
**Stacked line chart** |  Price excluding optional support disaggregated by ranges (<$500; $500-$1000; >=$1000)
**Bubble chart** | Relation between students reached, donations in USD and primary focus area
**Scatter plot** | Relation between number of students reached and number of donors
**Bar chart** | Donations in USD by state
 | Donations in USD by month
**Pie chart** | Number of donations by funding status
 | Number of projects by teacher prefix
 | Number of projects by resource type
 | Number of projects by poverty level
 | Number of projects by primary focus area
 | Number of projects by grade level
 | Number of donations by state
 | Number of projects by metro area
**Row chart** | Donations in USD by resource type
 | Donations in USD by resource type
 | Donations in USD by poverty level
 | Donations in USD by primary focus area
 | Donations in USD by grade level

### PART 2 - A detailed data table with 8 data selectors

**Screenshots of PART 2 - Data table**

![Dashboard_detailed_data_table](https://github.com/abmist/Project_2/blob/master/static/images/dashboard_detailed_data_table.jpg)


* Table with 12 columns:
	* State
	* Resource type
	* Poverty level
	* Donors
	* Donation (in USD)
	* Funding status
	* Grade level
	* Students reached
	* Primary focus subject
	* Primary focus area
	* Metro area
	* Teacher prefix
	
* Data selectors:
	* State
	* Resource type
	* Primary focus area
	* Primary focus subject
	* Poverty level
	* Funding status
	* Metro area
	* Teacher prefix

## Technology stack

* [Crossfilter.js] (http://square.github.io/crossfilter/)
	* This JavaScript library has been used to manipulate the donations data (filtering, grouping, aggregating, etc.) stored in the database. It usefull because it enables two way data binding and  allows slicing data easily.
* [D3.js] (https://d3js.org/)
	* This JavaScript library has been employed to render the interactive graphs -using HTML, CSS and SVG. 
* [DC.js] (https://dc-js.github.io/dc.js/)
	* This charting JavaScript library relies on Crossfilter.js and D3.js. It allows exploration on large multi-dimensional dataset (*in this case, school donations*) and leverages D3.js engine to render charts, providing instant feedback on user's interaction.
* [Queue.js] (https://github.com/d3/d3-queue)
	* This is an asynchronous helper library. Its job is to wait until the data is available from each api before passing on the combined data for processing. That functionality was not needed specifically for this project, but it’s handy having it ready for a possible modification. 
* [Keen.js] (https://keen.io/)
	* This JavaScript library is employed for the template of the dashboard.  
* [Flask] (http://flask.pocoo.org/)
	* Given that the aim of this project was a dashboard -just for practising purpose-, only two routes (with template) have been created to the final user with this micro framework: the first one for presenting all the charts; and the second one for a detailed table with data. Another option would have been to distribute the charts by topic creating multiple routes. However, due to the goal of the project, it seems more handy to have all of them together to see easily the big picture at one glance.    
* [MongoDB] (https://www.mongodb.com/)
	* Non relational database to work in JSON format with original data from a CSV file.
* [Intro.js] (https://www.http://introjs.com/)
	* This library enables to create a step-by-step guide that assigns an interactive pop-up tooltip to graphs where can be displayed helpful information to the user who is going to use the dashboard.
* [Bootstrap] (https://www.http://getbootstrap.com//)
* Python
* JavaScript
* jQuery
* HTML
* CSS


## Instructions

Open your terminal and use the git clone command:

`git clone https://github.com/abmist/Project_2.git`

Once the project is cloned, enter in project_2 directory:

`cd project_2`

It's recommended to use a virtual environment (to keep isolated the dependencies required by this project). If you don't have it installed, you can do it using *pip* `pip install virtualenv`. 

Here you have the instructions: [Virtual Environment - The Hitchhiker's Guide to Python] (http://docs.python-guide.org/en/latest/dev/virtualenvs/)

Create a virtual environment for this project and activate it. 

Install the dependencies:

`pip install -r requirements.txt`

In this project, we've used data that originally were in a CSV file called *opendata_projects_clean.csv*. It was upload to an instance of MongoDb running locally. In doing so, the content was be converted to JSON format.

To do that, open your terminal and run mongoDB by running the command:
 `mongod`

Leave it running as it is and open another terminal window. Then copy the CSV file to the same location as the directory opened in the second terminal window.

Enter the following command:

`mongoimport -d donorsUSA -c projects --type csv --file opendata_projects_clean.csv --headerline`

It will take a few minutes due to the big amount of records in the file. 

If you open Mongo Management Studio you can see the uploaded data (now, in JSON format).

Now you can open up your browser and in the URL bar enter `http://127.0.0.1:5000`


## Visit the site
Note: Due to some limitations of the platform used to deploy the project, it's better to lower the limit of results. Charts would look different if all data would be loaded. Likewise, some axis may need to be adjusted. 

Deployed thanks to Heroku.

*Click on*: [School Donations Dashboard] (https://hidden-journey-74967.herokuapp.com/) 
