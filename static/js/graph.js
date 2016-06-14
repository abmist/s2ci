queue()
    .defer(d3.json, "/donorsUS/projects")
    .defer(d3.json, "static/geojson/us-states.json")
    .await(makeGraphs);

function makeGraphs(error, projectsJson, statesJson) {

    
    // Helper function
    function print_filter(filter){
        var f = eval(filter);
        if (typeof(f.length) != "undefined") {}else{}
        if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
        if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
        console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
    }

    var donorsUSProjects = projectsJson;

    var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
    donorsUSProjects.forEach(function (d) {
        d["date_posted"] = dateFormat.parse(d["date_posted"]);
        d["date_posted"].setDate(1);
        d["total_donations"] = +d["total_donations"];
        d["total_price_excluding_optional_support"] = +d["total_price_excluding_optional_support"];
        d["num_donors"] = +d["num_donors"];
        d["students_reached"] = +d["students_reached"];
        d.year = d["date_posted"].getFullYear();
        d.month = d["date_posted"].getMonth() +1;
    });

    // Crossfilter instance
    var ndx = crossfilter(donorsUSProjects);

    // Dimensions
    var dateDim = ndx.dimension(function (d) { return d["date_posted"]; });   
    var resourceTypeDim = ndx.dimension(function (d) { return d["resource_type"]; }); 
    var povertyLevelDim = ndx.dimension(function (d) { return d["poverty_level"]; }); 
    var stateDim = ndx.dimension(function (d) { return d["school_state"]; }); 
    var totalDonationsDim = ndx.dimension(function (d) { return d["total_donations"]; });
    var fundingStatus = ndx.dimension(function (d) { return d["funding_status"]; });
    var areaDim = ndx.dimension(function (d) { return d["primary_focus_area"]; });
    var gradeLevelDim = ndx.dimension(function (d) { return d["grade_level"]; });
    var teacherPrefixDim = ndx.dimension(function (d) { return d["teacher_prefix"]; });
    var priceDim = ndx.dimension(function (d) { return d["total_price_excluding_optional_support"]; });
    var donorsNumDim = ndx.dimension(function (d) { return d["num_donors"]; });
    var studentsDim = ndx.dimension(function (d) { return d["students_reached"]; });
    var subjectDim = ndx.dimension(function (d) { return d["primary_focus_subject"]; });
    var metroDim = ndx.dimension(function (d) { return d["school_metro"]; });
    var yearDim = ndx.dimension(function(d) {return +d.year;});
    var monthDim = ndx.dimension(function(d) {return +d.month;});
    var forScatterDim = ndx.dimension(function (d) {return [+d.students_reached, +d.num_donors];});

    // Groups
    var numProjectsByDate = dateDim.group();
    var numProjectsByResourceType = resourceTypeDim.group();
    var numProjectsByPovertyLevel = povertyLevelDim.group();
    var numProjectsByFundingStatus = fundingStatus.group();
    var numProjectsByDonors = donorsNumDim.group();
    var numProjectsByMetro = metroDim.group();
    var numProjectsByArea = areaDim.group();
    var numProjectsBySubject = subjectDim.group();
    var groupForScatter = forScatterDim.group();
    var numProjectsByGradeLevel = gradeLevelDim.group();
    var numProjectsByTeacherPrefix = teacherPrefixDim.group();
    var numProjectsByPrice = priceDim.group();
    var numProjectsByStudents = studentsDim.group();
    var stateGroup = stateDim.group();

    // All
    var all = ndx.groupAll();  


    // Reduce
    var totalDonationsByState = stateDim.group().reduceSum(function (d) { return d["total_donations"]; });  
    var totalDonations = ndx.groupAll().reduceSum(function (d) { return d["total_donations"]; });
    var layer1 = dateDim.group().reduceSum(function(d) {if (d.total_price_excluding_optional_support > 0 && d.total_price_excluding_optional_support < 500) {return d.num_donors;}else{return 0;}});
    var layer2 = dateDim.group().reduceSum(function(d) {if (d.total_price_excluding_optional_support >= 500 && d.total_price_excluding_optional_support < 1000) {return d.num_donors;}else{return 0;}});
    var layer3 = dateDim.group().reduceSum(function(d) {if (d.total_price_excluding_optional_support >= 1000) {return d.num_donors;}else{return 0;}});
    var totalDonors = ndx.groupAll().reduceSum(function (d) { return d["num_donors"]; });
    var totalStudents = ndx.groupAll().reduceSum(function (d) { return d["students_reached"]; });
    var totalDonationsByDate = dateDim.group().reduceSum(function (d) { return d["total_donations"]; });
    var numberDonationsByState = stateDim.group().reduceSum(function (d) { return d["total_donations"]; });
    var usdProjectsByArea = areaDim.group().reduceSum(function (d) { return d["total_donations"]; });
    var usdProjectsByPovertyLevel = povertyLevelDim.group().reduceSum(function (d) { return d["total_donations"]; });
    var usdProjectsByResourceType = resourceTypeDim.group().reduceSum(function (d) { return d["total_donations"]; });
    var usdProjectsByGradeLevel = gradeLevelDim.group().reduceSum(function (d) { return d["total_donations"]; });
    var year_total = yearDim.group().reduceSum(function(d) {return d.total_donations;});
    var totalDonationsByMonth = monthDim.group().reduceSum(function(d) {return d.total_donations;});   

    // Max and Min
    var max_state = totalDonationsByState.top(1)[0].value;
    var minDate = dateDim.bottom(1)[0]["date_posted"];
    var maxDate = dateDim.top(1)[0]["date_posted"];
    var minStudents = studentsDim.bottom(1)[0]["students_reached"];
    var maxStudents = studentsDim.top(1)[0]["students_reached"];
    var minTotalDonations = totalDonationsDim.bottom(1)[0]["total_donations"];
    var maxTotalDonations = totalDonationsDim.top(1)[0]["total_donations"];
    var minDonors = donorsNumDim.bottom(1)[0]["num_donors"];
    var maxDonors = donorsNumDim.top(1)[0]["num_donors"];

    // Formats
    var dateFormat = d3.time.format("%d/%m/%Y");
    var numberFormat = d3.format(",");
    var numberFormat2 = d3.format(".3n");
 
    // Calculus for average donations
    var meanDonationsGroup = ndx.groupAll().reduce(
        function (p, v) {
            ++p.n;
            p.tot += v.total_donations;
            return p;
        },
        function (p, v) {
            --p.n;
            p.tot -= v.total_donations;
            return p;
        },
        function () { return {n:0,tot:0}; }
    );

    // Calculus for average donors
    var meanDonorsGroup = ndx.groupAll().reduce(
        function (p, v) {
            ++p.n;
            p.tot += v.num_donors;
            return p;
        },
        function (p, v) {
            --p.n;
            p.tot -= v.num_donors;
            return p;
        },
        function () { return {n:0,tot:0}; }
    );
    
    // Calculus for average students
    var meanStudentsGroup = ndx.groupAll().reduce(
        function (p, v) {
            ++p.n;
            p.tot += v.students_reached;
            return p;
        },
        function (p, v) {
            --p.n;
            p.tot -= v.students_reached;
            return p;
        },
        function () { return {n:0,tot:0}; }
    );

    // Groups for bubbles 
    var bubblesVars = areaDim.group().reduce( 
        function (p,v) {
            ++p.count
            p.a += v.students_reached;
            p.b += v.total_donations;
            p.c += v.num_donors/p.count;
            return p;
        },
        function (p,v) {
            --p.count
            p.a -= v.students_reached;
            p.b -= v.total_donations;
            p.c -= v.num_donors/p.count;
            return p;
        },
        function () {
            return {count:0, a:0, b:0, c:0};
        }
    );

    var average = function(d) { return d.n ? d.tot / d.n : 0; };
    var expCount = function(d) { return d.n; };

    // Records counter
    dc.dataCount('.dc-data-count')
        .dimension(ndx)
        .group(all)
        .html({
        some: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records',
        all: 'All records selected. Please click on the graph to apply filters.'}); 

    // Charts variables
    var numberProjectsND = dc.numberDisplay("#number-projects-nd");
    var totalDonationsND = dc.numberDisplay("#total-donations-nd");
    var fundingStatusChart = dc.pieChart("#funding-chart");
    var resourceTypeChart = dc.rowChart("#resource-type-row-chart");
    var povertyLevelChart = dc.rowChart("#poverty-level-row-chart");
    var areaChart = dc.rowChart("#area-chart");
    var usdGradeChart = dc.rowChart("#usd-grade-chart");
    var teacherPrefixChart = dc.pieChart("#teacher-chart");
    var gradePieChart = dc.pieChart("#grade-chart");
    var usChart = dc.geoChoroplethChart("#us-chart");
    var stackLinesChart = dc.lineChart("#stack-lines-chart");
    var usdStateDonationsChart = dc.barChart("#usd-state-donations-chart"); 
    var bubbleChart  = dc.bubbleChart("#bubble-chart");
    var moveChart = dc.compositeChart("#zoom-line-chart");
    var donorsProjectsND = dc.numberDisplay("#donors-nd");
    var usdAvgDonationsND = dc.numberDisplay("#usd-avg-donations-nd");
    var avgDonorsProjectsND = dc.numberDisplay("#avg-donors-nd");
    var avgStudentsProjectsND = dc.numberDisplay("#avg-students-nd")
    var ratioNumberProjectsND = dc.numberDisplay("#ratio-donations-nd");
    var studentsProjectsND = dc.numberDisplay("#students-nd");
    var resourcePieChart = dc.pieChart("#resource-pie-chart");
    var povertyPieChart = dc.pieChart("#poverty-pie-chart");
    var areaPieChart = dc.pieChart("#area-pie-chart");
    var statesPieChart = dc.pieChart("#states-pie-chart");
    var volumeChart = dc.barChart("#volume-chart");
    var metroChart = dc.rowChart("#metro-chart");
    var scatterChart1 = dc.scatterPlot("#scatter1-chart");
    var donationsMonthChart = dc.barChart("#month-chart");
    var tableData = dc.dataTable("#data-table");

    // Charts
    usChart
        .width(1000)
        .height(330)
        .dimension(stateDim)
        .group(totalDonationsByState)
        .colors(d3.scale.quantize().range(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"]))
        .colorDomain([0, max_state])
        .colorCalculator(function (d) { return d ? usChart.colors()(d) : '#ccc'; })
        .overlayGeoJson(statesJson["features"], "state", function (d) { return d.properties.name; })
        .projection(d3.geo.albersUsa()
        .scale(600)
        .translate([300, 170]))
        .title(function (p) { return "State: " + p["key"] + "\n" + "$" + numberFormat(Math.round(p["value"]));});

     volumeChart
        .width(600)
        .height(40)
        .margins({top: 0, right: 50, bottom: 20, left: 40})
        .dimension(dateDim)
        .group(numProjectsByDate)
        .rangeChart(stackLinesChart)
        .centerBar(true)
        .gap(0)
        .elasticX(true)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .round(d3.time.month.round)
        .xUnits(d3.time.months)
        .renderlet(function (chart) {
            chart.select("g.y").style("display", "none");
            moveChart.filter(chart.filter());
        })
        /*.on("filtered", function (chart) {
            dc.events.trigger(function () {
                moveChart.focus(chart.filter());
            });
        })*/;

    numberProjectsND
        .formatNumber(d3.format(","))
        .valueAccessor(function (d) { return d; })
        .group(all);

    totalDonationsND
        .valueAccessor(function (d) { return d; })
        .group(totalDonations)
        .formatNumber(d3.format("$.3s"));

    donorsProjectsND
        .valueAccessor(function (d) { return d; })
        .group(totalDonors)
        .formatNumber(d3.format(","));

    studentsProjectsND
        .valueAccessor(function (d) { return d; })
        .group(totalStudents)
        .formatNumber(d3.format(","));

    avgDonorsProjectsND
        .group(meanDonorsGroup)
        .valueAccessor(average)
        .formatNumber(d3.format(".3s"));

    avgStudentsProjectsND
        .group(meanStudentsGroup)
        .valueAccessor(average)
        .formatNumber(d3.format(".3s"));

    usdAvgDonationsND
        .valueAccessor(average)
        .group(meanDonationsGroup)
        .formatNumber(d3.format("$.3s"));

    ratioNumberProjectsND
        .formatNumber(d3.format(",.2%"))
        .valueAccessor(function (d) { return d/55000;})
        .group(all);

    selectField = dc.selectMenu('#menu-select')
        .dimension(stateDim)
        .group(stateGroup);

    selectField2 = dc.selectMenu('#menu2-select')
        .dimension(resourceTypeDim)
        .group(numProjectsByResourceType);

    selectField3 = dc.selectMenu('#menu3-select')
        .dimension(areaDim)
        .group(numProjectsByArea);

    selectField4 = dc.selectMenu('#menu4-select')
        .dimension(subjectDim)
        .group(numProjectsBySubject);

    selectField5 = dc.selectMenu('#menu5-select')
        .dimension(povertyLevelDim)
        .group(numProjectsByPovertyLevel);

    selectField6 = dc.selectMenu('#menu6-select')
        .dimension(fundingStatus)
        .group(numProjectsByFundingStatus);

    selectField7 = dc.selectMenu('#menu7-select')
        .dimension(metroDim)
        .group(numProjectsByMetro);

    selectField8 = dc.selectMenu('#menu8-select')
        .dimension(teacherPrefixDim)
        .group(numProjectsByTeacherPrefix);

    moveChart
        .width(950)
        .height(200)
        .transitionDuration(1000)
        .margins({top: 30, right: 70, bottom: 25, left: 70})
        .dimension(dateDim)
        .rangeChart(volumeChart)
        .mouseZoomable(true)
        .shareTitle(false)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .elasticY(true)
        .renderHorizontalGridLines(true)
        .legend(dc.legend().x(90).y(20).itemHeight(13).gap(5))
        .brushOn(false)
        .compose([
            dc.lineChart(moveChart)
                .group(totalDonationsByDate, "Donations in USD")
                .valueAccessor(function (d) {
                    return d.value;
                })
                .title(function (d) {
                var value = d.value;
                    if (isNaN(value)) value = 0;
                       return dateFormat(d.key) + "\n" + "$" + numberFormat(d.value);}),
            dc.lineChart(moveChart)
                .group(numProjectsByDate, "Number of donations")
                .valueAccessor(function (d) {
                    return d.value;
                })
                .title(function (d) {
                var value = d.value;
                    if (isNaN(value)) value = 0;
                       return dateFormat(d.key) + "\n" + numberFormat(d.value) + " donations";})
                .ordinalColors(["orange"])
                .useRightYAxis(true)
        ])
        .yAxisLabel("Donations in USD")
        .rightYAxisLabel("Number of donations")
        .renderHorizontalGridLines(false);

    fundingStatusChart
        .height(200)
        .radius(90)
        .innerRadius(40)
        .externalLabels(1)
        .transitionDuration(1500)
        .dimension(fundingStatus)
        .group(numProjectsByFundingStatus)
        .label(function(d) { return d.key; })
        .renderLabel(true)
        .title(function(d) { return d.key + "\n" + numberFormat(d.value) + " donations" + "\n" + Math.floor(d.value / all.value() * 100) + "%"; })
        .renderTitle(true);

    stackLinesChart
        .width(930)
        .height(200)
        .dimension(dateDim)
        .rangeChart(moveChart)
        .mouseZoomable(false)
        .margins({top: 10, right: 50, bottom: 30, left: 70})
        .group(layer1, "Price excluding optional support lower than $500")
        .stack(layer2, "Price excluding optional support between $500 and $1000")
        .stack(layer3, "Price excluding optional support higher $1000")
        .renderArea(true)
        .brushOn(false)
        .elasticY(true)
        .elasticX(false)
        .title(function (d) {
                    var value = d.value;
                    if (isNaN(value)) value = 0;
                       return dateFormat(d.key) + "\n" + numberFormat(d.value) + " donations";})
        .renderTitle(true)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .legend(dc.legend().x(90).y(20).itemHeight(13).gap(5))
        .yAxisLabel("Donations");

    teacherPrefixChart
        .height(200)
        .radius(90)
        .innerRadius(40)
        .externalLabels(1)
        .transitionDuration(1500)
        .dimension(teacherPrefixDim)
        .group(numProjectsByTeacherPrefix)
        .label(function(d) { return d.key; })
        .renderLabel(true)
        .title(function(d) { return d.key + "\n" + numberFormat(d.value) + " donations" + "\n" + Math.floor(d.value / all.value() * 100) + "%"; })
        .renderTitle(true);

    resourceTypeChart
        .width(300)
        .height(200)
        .dimension(resourceTypeDim)
        .group(usdProjectsByResourceType)
        .title(function(d) { return d.key + "\n" +"$" + numberFormat(d.value); })
        .renderTitle(true)
        .xAxis().ticks(4);

    povertyLevelChart
        .width(300)
        .height(200)
        .dimension(povertyLevelDim)
        .group(usdProjectsByPovertyLevel)
        .title(function(d) { return d.key + "\n" +"$" + numberFormat(d.value); })
        .renderTitle(true)
        .xAxis().ticks(4);

    areaChart
        .width(300)
        .height(200)
        .dimension(areaDim)
        .group(usdProjectsByArea)
        .title(function(d) { return d.key + "\n" +"$" + numberFormat(d.value); })
        .renderTitle(true)
        .xAxis().ticks(4);

    usdGradeChart
        .width(300)
        .height(200)
        .dimension(gradeLevelDim)
        .group(usdProjectsByGradeLevel)
        .title(function(d) { return d.key + "\n" +"$" + numberFormat(d.value); })
        .renderTitle(true)
        .xAxis().ticks(4);

    resourcePieChart
        .height(200)
        .radius(90)
        .innerRadius(40)
        .externalLabels(1)
        .transitionDuration(1500)
        .dimension(resourceTypeDim)
        .group(numProjectsByResourceType)
        .label(function(d) { return d.key; })
        .renderLabel(true)
        .title(function(d) { return d.key + "\n" + numberFormat(d.value) + " donations" + "\n" + Math.floor(d.value / all.value() * 100) + "%"; })
        .renderTitle(true);

    povertyPieChart
        .height(200)
        .radius(90)
        .innerRadius(40)
        .externalLabels(1)
        .transitionDuration(1500)
        .dimension(povertyLevelDim)
        .group(numProjectsByPovertyLevel)
        .label(function(d) { return d.key; })
        .renderLabel(true)
        .title(function(d) { return d.key + "\n" + numberFormat(d.value) + " donations" + "\n" + Math.floor(d.value / all.value() * 100) + "%"; })
        .renderTitle(true);

    areaPieChart
        .height(200)
        .radius(90)
        .innerRadius(40)
        .externalLabels(1)
        .transitionDuration(1500)
        .dimension(areaDim)
        .group(numProjectsByArea)
        .label(function(d) { return d.key; })
        .renderLabel(true)
        .title(function(d) { return d.key + "\n" + numberFormat(d.value) + " donations" + "\n" + Math.floor(d.value / all.value() * 100) + "%"; })
        .renderTitle(true);

    gradePieChart
        .height(200)
        .radius(90)
        .innerRadius(40)
        .externalLabels(1)
        .transitionDuration(1500)
        .dimension(gradeLevelDim)
        .group(numProjectsByGradeLevel)
        .label(function(d) { return d.key; })
        .renderLabel(true)
        .title(function(d) { return d.key + "\n" + numberFormat(d.value) + " donations" + "\n" + Math.floor(d.value / all.value() * 100) + "%"; })
        .renderTitle(true);

    usdStateDonationsChart
        .width(1000)
        .height(200)
        .margins({top: 10, right: 50, bottom: 30, left: 70})
        .dimension(stateDim)
        .group(totalDonationsByState)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("States")
        .yAxisLabel("Donations in USD")
        .title(function(d) { return d.key + "\n" +"$" + numberFormat(d.value); })
        .renderTitle(true)
        .yAxis().ticks(4);

    statesPieChart
        .height(200)
        .radius(90)
        .innerRadius(40)
        .externalLabels(1)
        .transitionDuration(1500)
        .dimension(stateDim)
        .group(stateGroup)
        .label(function(d) { return d.key; })
        .renderLabel(true)
        .title(function(d) { return d.key + "\n" + numberFormat(d.value) + " donations" + "\n" + Math.floor(d.value / all.value() * 100) + "%"; })
        .renderTitle(true);

    bubbleChart
        .dimension(areaDim)
        .group(bubblesVars)
        .x(d3.scale.linear().domain([minStudents, 1500000]))
        .y(d3.scale.linear().domain([-2000000, 10000000]))
        .r(d3.scale.linear().domain([minDonors, maxDonors]))
        .elasticY(false)
        .elasticX(false)
        .width(1000)
        .height(200)
        .margins({top: 10, right: 50, bottom: 30, left: 70})
        .yAxisPadding(50)
        .xAxisPadding(50)
        .xAxisLabel('Students reached')
        .yAxisLabel('Donations in USD')
        .label(function (p) { return p.key; })
        .renderLabel(true)
        .title(function (p) {
            return [
                p.key + "\n" +
                "Students: " + numberFormat(p.value.a),
                "Donations: $" + numberFormat(p.value.b),
                "Average donors: " + numberFormat2(p.value.c),
            ]
            .join("\n");
        })
        .renderTitle(true)
        .renderHorizontalGridLines(false)
        .renderVerticalGridLines(false)
        .maxBubbleRelativeSize(0.3)
        .keyAccessor(function (p) {
            return p.value.a;
        })
        .valueAccessor(function (p) {
            return p.value.b;
        })
        .radiusValueAccessor(function (p) {
            return p.value.c;
        });

    metroChart
        .width(300)
        .height(200)
        .dimension(metroDim)
        .group(numProjectsByMetro)
        .title(function(d) { return d.key + "\n" + numberFormat(d.value) + " donations"; })
        .renderTitle(true)
        .xAxis().ticks(4);

    scatterChart1
        .width(650)
        .height(200)
        .x(d3.scale.linear().domain([0, 2500]))
        .y(d3.scale.linear().domain([0, 70]))
        .elasticY(false)
        .elasticX(false)
        .yAxisLabel("Donors")
        .xAxisLabel("Students reached")
        .clipPadding(10)
        .dimension(forScatterDim)
        .excludedOpacity(0.5)
        .group(groupForScatter);

     donationsMonthChart
        .width(650)
        .height(200)
        .margins({top: 10, right: 50, bottom: 30, left: 70})
        .dimension(monthDim)
        .group(totalDonationsByMonth)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Month")
        .yAxisLabel("Donations in USD")
        .title(function(d) { return "Month: " + d.key + "\n" +"$" + numberFormat(d.value); })
        .renderTitle(true)
        .yAxis().ticks(4);

    tableData
        .width(650)
        .height(800)
        .dimension(dateDim)
        .group(function(d) {return d.year;})
        .size(10)
        .columns([
            function(d) {return d.school_state;},
            function(d) {return d.resource_type;},
            function(d) {return d.poverty_level;},
            function(d) {return d.num_donors;},
            function(d) {return d.total_donations;},
            function(d) {return d.funding_status;},
            function(d) {return d.grade_level;},
            function(d) {return d.students_reached;},        
            function(d) {return d.primary_focus_subject;},
            function(d) {return d.primary_focus_area;}        
        ])
        .sortBy(function(d){ return d.students_reached; })
        .order(d3.descending);


    dc.renderAll();

}


