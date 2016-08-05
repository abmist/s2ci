# Project 2 for Code Institute - School Donations Dashboard  

## Introduction
This project is a **data visualization that contains interactive charts** which use a dataset from DonorsChoose.org -*a US based non-profit organization that allows individuals to donate money directly to public school classroom projects*-.  **This dashboard enables exploring and filtering data stored in a non-relational database**. 

## Notes
* **All charts are interrelated, so any filter applied in any chart will affect the remainder charts**. That way, **unless you wanted to apply several filters together, it’s better to reset filter after each query**.  
 
* Given the large amount of data stored in the database, **are necessary several seconds for the data being loaded**.

* Not all charts displayed have a *specific meaning* (no meaningful relationship between variables used). Some of them were displayed just in order to practise.

* Almost all charts include titles that are displayed when the mouse over any element of them. These titles show different kind of information like donations in USD, percentages, dates, etc.

* In some charts can be activated functionalities like the brush (to select periods of time) or the zoom (to focus the analysis in a specific point of time).   

## Structure 

This site consists of **two parts** separated into different pages, **one for charts** and **the other one for a detailed data table**. 

### PART 1 – Charts 

* 1 map
* 19 charts
* Summary of 8 big numbers


**Charts introduction**  
This part also includes a **step-by-step guide** (built with [Intro.js](https://www.http://introjs.com/)) that assigns an interactive pop-up tooltip to graphs where can be displayed helpful information to the user who is going to use the dashboard.

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
	* This JavaScript library has been used to manipulate the donations data (filter, get totals, etc.) stored in the database. It enables two way data binding and slicing data easily.
* [D3.js] (https://d3js.org/)
	* This JavaScript library has been employed to render the interactive graphs, using HTML, CSS and SVG. 
* [DC.js] (https://dc-js.github.io/dc.js/)
	* This charting JavaScript library relies on Crossfilter.js and D3.js. As it's mentioned in its documentation, it allows exploration on large multi-dimensional dataset and leverages D3.js engine to render charts, providing instant feedback on user's interaction.
* [Queue.js] (https://github.com/d3/d3-queue)
	* This is an asynchronous helper library. Its job is to wait until the data is available from each api before passing on the combined data for processing. That functionality was not needed specifically for this project, but it’s handy having it ready for a possible modification. 
* [Keen.js] (https://keen.io/)
	* This JavaScript library is employed for the template of the dashboard.  
* [Flask] (http://flask.pocoo.org/)
	* Given that the aim of this project was to create a dashboard just for practising purpose, only two routes have been created: the first one for presenting all the charts; and the second one for a detailed table with data. Another option would have been to distribute the charts by topic creating multiple routes. However, due to the goal of the project, it seems more handy to have all of them togheter to get easily the big picture.    
* [MongoDB] (https://www.mongodb.com/)
	* Non relational database to work in JSON format.
* [Intro.js] (https://www.http://introjs.com/)
	* This library enables to create a step-by-step guide that assigns an interactive pop-up tooltip to graphs where can be displayed helpful information to the user who is going to use the dashboard.
* [Bootstrap] (https://www.http://getbootstrap.com//)
* Python
* JavaScript
* jQuery
* HTML
* CSS
