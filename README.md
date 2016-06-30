# Project_2

This site consists of 2 pages:
1- Dashboard (1 map, 19 charts, 8 big numbers)
2- Detailed data table with 8 select menus

Dashboard content ______________________
- Us map
	* This map shows the bic picture of donation in USD by state.
    * Colour shades represent USD donated.
    * Title info: state and its donation in USD.

- Volume of donation 
    * This chart shows the volume of donations.
    * The brush lets filter time periods. 

- Big figures 
	* Summary of big figures in absolute and relative terms.
		- Number of donations (default: all)
		- Percentage of donations (default: 100%)
		- Donations in USD (default: all)
		- Average donations in USD (default: all)
		- Number of students reached (default: all)
		- Average students reached (default: all)
		- Number of donors (default: all)
		- Average donors (default: all)

- Line chart with zoom that shows number of donations and US dollars donated.
    * Brush option: deactivated

- Pie chart that shows number of donations by funding status.
    * Title info: funding status, its number of donation and its percentage.

- Stack line chart that shows price excluding optional support disaggregated by ranges.
    * 3 ranges: <$500; between $500 and <$1000; >=$1000
    * Zoom: deactivates.
    * Title info: date and its number. 

- Pie chart that shows number of projects clasified by teacher prefix.
    * Title info: teacher prefix, its number of donation and its percentage.

- Row chart that shows donations in USD clasified by resource type.
    * Title info: resource type, its donations in USD.

- Row chart that shows donations in USD clasified by poverty level.
    * Title info: poverty level, its donations in USD.

- Row chart that shows donations in USD clasified by primary focus area.
    * Title info: primary focus area, its donations in USD.

- Row chart that shows donations in USD clasified by grade level.
    * Title info: grade level, its donations in USD.

- Pie chart that shows number of projects clasified by resource type.
    * Title info: resource type, its number of donation and its percentage.

- Pie chart that shows number of projects clasified by poverty level.
    * Title info: poverty level, its number of donation and its percentage.

- Pie chart that shows number of projects clasified by primary focus area.
    * Title info: primary focus area, its number of donation and its percentage.

- Pie chart that shows number of projects clasified by grade level.
    * Title info: grade level, its number of donation and its percentage.

- Bar chart that shows donations in USD by state.
    * Title info: state and its donation in USD.

- Pie chart that shows number of doantions clasified by state.
    * Title info: state, its donation in USD and its percentage.

- Bubble chart that shows 3 variables related to primary focus area: 
    * Bubble -> Primary focus area
    * X axis -> Students reached
    * Y axis -> Donations in USD 
    * Bubble size -> Average donors
    * Title info: Primary focus area, students reaches, donations in USD and average donors.

- Pie chart that shows number of projects clasified by metro area.
    * Title info: metro area, its number of donation and its percentage.

- Scatter plot that shows relation between number of students reached and number of donors.

- Bar chart months that shows donations in USD clasified by month.
     * Title info: month, its donations in USD.


Detailed data table & select menus ______________________

- Table with 12 columns:
	* State
	* Resource type
	* Poverty level
	* Donors
	* Donation ($)
	* Funding status
	* Grade level
	* Students reached
	* Primary focus subject
	* Primary focus area
	* Metro area
	* Teacher prefix

- Select menus:
    * State
    * Resource type
    * Primary focus area
    * Primary focus subject
    * Poverty level
    * Funding status
    * Metro area
    * teacher prefix

------------------------------------------

Components:

17 dimensions
15 groups
21 group - reduce
9 max & min 
3 formats (number and date)
1 record counter

------------------------------------------

D3 
DC 
Crossfilter
Flask
JavaScript
jQuery 
Python
MongoDB
Intro 
Bootstrap
HTML
CSS




