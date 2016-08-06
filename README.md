# Project 2 for Code Institute - School Donations Dashboard  

## Introduction
This project is a **data visualization that contains interactive charts** which use a dataset from DonorsChoose.org -*a US based non-profit organization that allows individuals to donate money directly to public school classroom projects*-.  **This dashboard enables exploring and filtering data stored in a non-relational database**. 

## Notes
* **All charts are interrelated, so any filter applied in any chart will affect the remainder charts**. That way, **unless you wanted to apply several filters together, it’s better to reset filter after each query**.  
 
* Given the large amount of data stored in the database, **are necessary several seconds for the data being loaded**.

* Not all charts displayed have a *specific meaning* (no meaningful relationship between variables used). Some of them were displayed just in order to practise and create as many different kind of charts as possible. That is the case of the bubble chart and the scatter plot.   

## Data

The original data -which come from a CSV file- are imported to a non relational database -MongoDB- and converted into JSON format. 

## Description

Apart from data, vendors libraries and CSS files used, this project basically consists of three parts:
* **graph.js**: where data and charts are handled.
* **school_donations.py**: where routes and data connection are managed.
* **html templates** (index.html, main.html and details.html): where data and graphs are showed.

## Main steps to create this project

__*graph.js*__

**1. Data section**

* Load the data: **dataset from DonorsChoose.org** and a **geojson file -necessary to create the US map**. Although it is not strictly necessary for this project, it's been used a *queue()* function to wait until the data is available from each api before passing on the combined data for processing (it can be handy if the data source is changed).

* Add a helper function to check the work with Crossfilter.js in the console. 

* Carry out some transformations to clean the dataset: 
	* Parse the date data type (from string to datetime objects).
	* Set all projects date days to 1 using `.setDate(1)`, and use `.getMonth() +1` for months.
	* Ensure to work with numbers, using a unary operator `+` to coerce string representation of numbers from variables such as *total_donations* or *num_donors* to number values. 

**2. Crossfilter section**

* Create a Crossfilter instance and the dimensions based on that instance. In this project, there're 17 dimensions. Note: The dimension for the scatter plot needs two variables. 

* Define data groups based on dimensions (15).

* Calculate the metrics (17) that will be represented later. Some of these metrics are calculated over dimensions and others over the total. Depending on the case, there can be used more than one of these metrics in the same chart. That's what happens with *priceLayer1*, *priceLayer2* and *priceLayer3* which represent three ranges of price in the stacked line chart.  

* Calculate max and min values (9) that are used in the *domains* of some charts such as stacked lines chart or the map, among others.

* Make some calculations for the big number charts (like averages) and the bubble chart.

**3. DC and D3 section**

* Define **date and number formats** that will be used in the titles of charts (when the mouse over them), to make them more readable.

* Add a **counter** that shows the amount of records selected when filters are applied.

* Create the DC.js chart objects (map, charts, big numbers, data selectors and data table), which will be binded to HTML elements of  the templates (*main.html* and *detail.html*) by means of CSS ID selectors.

* Configure each individual chart passing the necessary parameters.

* To renderthhe charts, use: `dc.renderAll();`

__*school_donations.py*__

* Import the required modules.
* This project uses the micro framework Flask.
* Set the connection to database (database name, fields that will be used, etc.) The current configuration is for working locally.   
* Set the routes to render the templates. 

__*html templates*__

* Create *index.html* which acts as a shell where the other templates are injected.
* Cretate divs in *main.html* and *details.html* with ID where DC.js charts will be binded. 
* It will be use Keen.js for the dashboard template.
* The chart template will also include a *step-by-step guide* built with [Intro.js](https://www.http://introjs.com/).



**Some comments on specific charts**:

* Almost all charts include titles that are displayed when the mouse over any element of them. These titles show different kind of information like donations in USD, percentages, dates, etc.

* In some charts can be activated functionalities like the brush (to select periods of time) or the zoom (to focus the analysis in a specific point of time).    
	* **US map**
		* It needs a geojson file for render the map. 
		* 







## Structure 

This site consists of **two parts** separated into different pages, **one for charts** and **the other one for a detailed data table**. 

### PART 1 – Charts 

* 1 map
* 19 charts
* Summary of 8 big numbers


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
* **Map**: Donation in USD by state. *It additionally needs a geojson file*.
* **Bar chart**: Volume of donations with a brush to filter time periods.
* **Big numbers**:  Summary of big figures in absolute and relative terms
	* Number of donations (default: all)
	* Percentage of donations (default: 100%)
	* Donations in USD (default: all)
	* Average donations in USD (default: all)
	* Number of students reached (default: all)
	* Average students reached (default: all)
	* Number of donors (default: all)
	* Average donors (default: all)
* **Line chart with zoom**: Number of donations and US dollars donated.
* **Pie chart**: Number of donations by funding status.
* **Stack line chart**:  Price excluding optional support disaggregated by ranges (<$500; $500-$1000; >=$1000)
* **Pie chart**: Number of projects classified by teacher prefix.
* **Row chart**: Donations in USD classified by resource type.
* **Row chart**: Donations in USD classified by poverty level.
* **Row chart**: Donations in USD classified by primary focus area.
* **Row chart**: Donations in USD classified by grade level.
* **Pie chart**: Number of projects classified by resource type.
* **Pie chart**: Number of projects classified by poverty level.
* **Pie chart**: Number of projects classified by primary focus area.
* **Pie chart**: Number of projects classified by grade level.
* **Bar chart**: Donations in USD by state.
* **Pie chart**: Number of donations classified by state.
* **Bubble chart**: Relation between students reached, donations in USD and primary focus area.
* **Pie chart**: Number of projects classified by metro area.
* **Scatter plot**: Relation between number of students reached and number of donors.
* **Bar chart**: Donations in USD classified by month.



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


## Visit the site
Note: Due to some limitations of the platform used to deploy the project, it's better to lower the limit of results. Charts would look different if all data would be loaded. Likewise, some axis may need to be adjusted. 

Deployed thanks to Heroku.

*Click on*: [School Donations Dashboard] (https://hidden-journey-74967.herokuapp.com/) 
