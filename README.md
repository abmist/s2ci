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

![Dashboard_intro](https://github.com/abmist/Project_2/blob/master/static/images/dashboard_2_intro.jpg)

As it has been mentioned before, all charts are interrelated. Any filter applied in any chart affects the rest of charts. For that purpose, the dashboard has a **button to reset filters**. It also has a **counter** that shows the records selected and the total amount of records.

![Dashboard_map](https://github.com/abmist/Project_2/blob/master/static/images/dashboard_1_map.jpg)

![Dashboard_line_charts](https://github.com/abmist/Project_2/blob/master/static/images/dashboard_3_line_charts.jpg)

![Dashboard_bubble_chart_and_scatter_plot](https://github.com/abmist/Project_2/blob/master/static/images/dashboard_4_bubble_chart_scatter_plot.jpg)

![Dashboard_bar_charts_and_circle_charts](https://github.com/abmist/Project_2/blob/master/static/images/dashboard_5_bar_charts_circle_chats.jpg)


**List of charts**
* **Map**: Donation in USD by state
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

![Dashboard_detailed_data_table](https://github.com/abmist/Project_2/blob/master/static/images/dashboard_6_detailed_data_table.jpg)

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
* [D3.js] (https://d3js.org/)
* [DC.js] (https://dc-js.github.io/dc.js/)
* [Crossfilter.js] (http://square.github.io/crossfilter/)
* [Queue.js] (https://github.com/d3/d3-queue)
* [Flask] (http://flask.pocoo.org/)
* [MongoDB] (https://www.mongodb.com/)
* [Intro.js] (https://www.http://introjs.com/)
* [Bootstrap] (https://www.http://getbootstrap.com//)
* Python
* JavaScript
* jQuery
* HTML5
* CSS3
