//<editor-fold desc="draw bar">

var margin = {top: 20, right: 50, bottom:100, left: 70},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var dataAge = {
    labels: ['0-10',
        '11-20',
        '21-40',
        '41-60',
        '61-80',
        '> 80'
    ],
    series: [
        {
            label: 'Male',
            values: [65, 29, 34, 22, 46, 88] //write a fundtion here to calculate numbers
        },
        {
            label: 'Female',
            values: [78, 19, 24, 35, 45, 86]//write a fundtion here to calculate numbers
        },
    ]
};


var chartWidth       = 400,
    barHeight        = 20,
    groupHeight      = barHeight * dataAge.series.length,
    gapBetweenGroups = 10,
    spaceForLabels   = 100,
    spaceForLegend   = 100;

// Zip the series data together (first values, second values, etc.)
var zippedData = [];
for (var i=0; i<dataAge.labels.length; i++) {
    for (var j=0; j<dataAge.series.length; j++) {
        zippedData.push(dataAge.series[j].values[i]);
    }
}

// Color scale

var padding=0;
var head_height=padding;
var title = "hehe";
var foot_height=padding;


var color = d3.scale.ordinal()
    .range(["#3bd5f7","#ff6347"]);



var chartHeight = barHeight * zippedData.length + gapBetweenGroups * dataAge.labels.length;

var x = d3.scale.linear()
    .domain([0, d3.max(zippedData)])
    .range([0, chartWidth]);

var y = d3.scale.linear()
    .range([chartHeight + gapBetweenGroups, margin.top]);

var yAxis = d3.svg.axis()
    .scale(y)
    .tickFormat('')
    .tickSize(0)
    .orient("left");

var	xAxis = d3.svg.axis()
    .scale(x)
    .ticks(dataAge.length)
    .orient("bottom");
;

// Specify the chart area and dimensions
var chart = d3.select(".chart");

// Create bars
var bar = chart.selectAll("g")
    .data(zippedData)
    .enter().append("g")
    .attr("transform", function(d, i) {
        return "translate(" + margin.left + "," + (i * barHeight + gapBetweenGroups * (2 + Math.floor(i/dataAge.series.length))) + ")";
    });

// Create rectangles of the correct width
bar.append("rect")
    .attr("fill", function(d,i) { return color(i % dataAge.series.length); })
    .attr("class", "bar")
    .attr("width", x)
    .attr("height", barHeight -1);


bar.append("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("fill", "red")
    .attr("dy", ".35em")
    .text(function(d) { return d; });



// Add text label in bar
/*
*/
// Draw labels
bar.append("text")
    .attr("class", "label")
    .attr("x", function(d) { return - 10; })
    .attr("y", groupHeight / 2)

    .text(function(d,i) {
        if (i % dataAge.series.length === 0)
            return dataAge.labels[Math.floor(i/dataAge.series.length)];
        else
            return ""});



chart.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(yAxis);



chart.append("g")
    .attr("class", "x axis")
    . attr("transform", "translate(" + margin.left + ",  309 )")
    .call(xAxis);

//axix label
chart.append('g')
    .append('text')
    .attr('class','axixL')
    .attr("x",margin.left+250)
    .attr('y',height+70)
    .html('Number of Deaths');

chart.append('g')
    .attr("transform",'rotate(90,'+(margin.left-50)+','+(height+30)+')')
    .append('text')
    .attr('class','axixL')
    .attr("x",margin.left-170)
    .attr('y',height+40)
    .html('Ages');
//</editor-fold>
/////////////////////////////////////////////////map/////////////////////////////////////////////////////////////

var margin = {top: 0, right: 0, bottom: 80, left: 0},
    width = 850 - margin.left - margin.right,
    height = 880 - margin.top - margin.bottom;


var	parseDate = d3.time.format("%d-%b").parse;


var svgContainer = d3.select("#map");

svgContainer
    .attr("width", 800)
    .attr("height", 800)
    .call(d3.behavior.zoom().on("zoom", function () {
        svgContainer.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
//    svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
    }))
    .append("g");

// svg align center
//d3.select("#chart").attr("align","left"); //  thanks & +1 to chaitanya89
var LoopStreet = svgContainer.selectAll("line")
    .data(jsonStreet)
    .enter()
    .append("line");

var LoopStreetAttributes = LoopStreet
    .attr("x1", function (d) { return d.x1*40-98; })
    .attr("y1", function (d) { return height-d.y1*40; })
    .attr("x2", function (d) { return d.x2*40-98; })
    .attr("y2", function (d) { return height-d.y2*40; })
    .attr("stroke-width", 1)
    .attr("stroke", "grey");


//var LoopPump = svg.selectAll("rect")
var LoopPump = svgContainer.selectAll("rect")
//	.attr("clip-path", "url(#chart-area)")
    .data(jsonPump)
    .enter()
    .append("rect");

var LoopPumpAttributes = LoopPump
    .attr("x", function (d) { return d.x*40-d.width*2-98; })
    .attr("y", function (d) { return height-d.y*40-d.height*2; })
    .attr("width", function (d) { return d.width*4; })
    .attr("height", function (d) { return d.height*4; })
    .style("fill", function(d) { return d.color; });


console.log("jsonDeath:");
console.log(jsonDeath);
var LoopDeath = svgContainer.selectAll("circle")
//	.attr("clip-path", "url(#chart-area)")
    .data(jsonDeath)
    .enter()
    .append("circle");

var LoopDeathAttributes = LoopDeath
    .attr("cx", function (d) { return d.x_axis*40-98; })
    .attr("cy", function (d) { return height-d.y_axis*40; })
    .attr("r", function (d) { return d.radius*2; })
    .attr("stroke", "black")
    .attr("stroke-width", 0.5)
    .style("fill", "red");


//add name of path
svgContainer.append('svg:image')
    .attr({
        'xlink:href': 'img/st.png',  // can also add svg file here

        x: 100*0.4,

        y: 77*0.4,

        width: 1651*0.4,

        height: 1650*0.4
    });


var age_color = d3.scale.ordinal().domain([0,1,2,3,4,5]).range([
    "#f1eef6",
    "#d4b9da",
    "#c994c7",
    "#df65b0",
    "#dd1c77",
    "#980043"
]);

var gender_color = d3.scale.ordinal().domain([0,1]).range(["#3bd5f7","#ff6347"]);




//legend
var legend = d3.selectAll(".legend");
	legend.on('mousedown',function () {
    d3.select(this).style("box-shadow",'0px 0px 0px rgba(0,0,0,.6)')
});
	legend.on('mouseup',function () {
    d3.select(this).style("box-shadow",'5px 5px 5px rgba(0,0,0,.6)')
});


$(".legend").click(function (){
    LoopDeath.style('fill','red');
    var $this = $(this);
    var flag = $this.attr("data-switch");
    /*$(".legend").attr("data-switch","off");
    $(".hid").hide();*/
    if(flag === 'off'){
        var hid = $this.parent().find('.hid');
        hid.find('.legend_img').each(function (i, div) {
            if(hid.attr("data-flag") === 'age'){
                $(div).css("border-color",age_color(i));
            }else {
                $(div).css("border-color",gender_color(i));
            }
            //$(div).css("border-color",age_color(i));
        });
        LoopDeath.style('fill',function (d) {
            if(hid.attr("data-flag") === 'age'){
                return age_color(d.age);
            }else {
                return gender_color(d.gender);
            }
        });
        /*hid.show();
        $this.attr("data-switch","on");*/

    }else {
        LoopDeath.style('fill','red');
        /*$this.parent().find('.hid').hide();
        $this.attr("data-switch","off");*/
    }

});



/////////////////////////////////////////////line chart///////////////////////////////////////
//death number with date
var margin = {top: 50, right: 5, bottom:100, left: 50},
    /*width = 540 - margin.left - margin.right,
    height = 880 - margin.top - margin.bottom;*/
    width = 500 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

var	svg = d3.select("#lineChart");

/*svg
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


//age0 visible on map
svg.append("text")
    .attr("x", 100)
    .attr("y", height + margin.top + 20)
    .attr("class", "legend")
    .style("fill", "steelblue")
    .on("click", function(){
        //determine if we the dots will be impacted
        var	LoopDeath = svgContainer.selectAll("circle")
            .data(jsonDeath.filter (function(d) { return d.age==0; }))

            .transition()
            .duration(2000)
            .each("start", function() {
                d3.select(this)
                    .style({fill:"steelblue"})
                    .attr("r", function (d) { return 5; });})

            .each("end", function() {
                d3.select(this)
                    .style({fill:"red"})
                    .attr("r", function (d) { return d.radius*2; });});

    })
    .text("age0");

//age=1 visible on map
svg.append("text")
    .attr("x", 150)
    .attr("y", height + margin.top + 20)
    .attr("class", "legend")
    .style("fill", "yellow")
    .on("click", function(){
        //determine if we the dots will be impacted
        var	LoopDeath = svgContainer.selectAll("circle")
            .data(jsonDeath.filter (function(d) { return d.age==1; }))

            .transition()
            .duration(2000)
            .each("start", function() {
                d3.select(this)
                    .style({fill:"grey"})
                    .attr("r", function (d) { return 5; });})

            .each("end", function() {
                d3.select(this)
                    .style({fill:"red"})
                    .attr("r", function (d) { return d.radius*2; });
            });
    })
    .text("age1");

//age=2 visible on map
svg.append("text")
    .attr("x", 200)
    .attr("y", height + margin.top + 20)
    .attr("class", "legend")
    .style("fill", "yellow")
    .on("click", function(){
        //determine if we the dots will be impacted
        var	LoopDeath = svgContainer.selectAll("circle")
            .data(jsonDeath.filter (function(d) { return d.age==2; }))

            .transition()
            .duration(2000)
            .each("start", function() {
                d3.select(this)
                    .style({fill:"black"})
                    .attr("r", function (d) { return 5; });})

            .each("end", function() {
                d3.select(this)
                    .style({fill:"red"})
                    .attr("r", function (d) { return d.radius*2; });
            });
    })
    .text("age2");
//age=3 visible on map
svg.append("text")
    .attr("x", 250)
    .attr("y", height + margin.top + 20)
    .attr("class", "legend")
    .style("fill", "yellow")
    .on("click", function(){
        //determine if we the dots will be impacted
        var	LoopDeath = svgContainer.selectAll("circle")
            .data(jsonDeath.filter (function(d) { return d.age==3; }))

            .transition()
            .duration(2000)
            .each("start", function() {
                d3.select(this)
                    .style({fill:"green"})
                    .attr("r", function (d) { return 5; });})

            .each("end", function() {
                d3.select(this)
                    .style({fill:"red"})
                    .attr("r", function (d) { return d.radius*2; });
            });
    })
    .text("age3");
//age=4 visible on map
svg.append("text")
    .attr("x", 300)
    .attr("y", height + margin.top + 20)
    .attr("class", "legend")
    .style("fill", "yellow")
    .on("click", function(){
        //determine if we the dots will be impacted
        var	LoopDeath = svgContainer.selectAll("circle")
            .data(jsonDeath.filter (function(d) { return d.age==4; }))

            .transition()
            .duration(2000)
            .each("start", function() {
                d3.select(this)
                    .style({fill:"blue"})
                    .attr("r", function (d) { return 5; });})

            .each("end", function() {
                d3.select(this)
                    .style({fill:"red"})
                    .attr("r", function (d) { return d.radius*2; });
            });
    })
    .text("age4");
//age=5 visible on map
svg.append("text")
    .attr("x", 350)
    .attr("y", height + margin.top + 20)
    .attr("class", "legend")
    .style("fill", "yellow")
    .on("click", function(){
        //determine if we the dots will be impacted
        var	LoopDeath = svgContainer.selectAll("circle")
            .data(jsonDeath.filter (function(d) { return d.age==5; }))

            .transition()
            .duration(2000)
            .each("start", function() {
                d3.select(this)
                    .style({fill:"yellow"})
                    .attr("r", function (d) { return 5; });})

            .each("end", function() {
                d3.select(this)
                    .style({fill:"red"})
                    .attr("r", function (d) { return d.radius*2; });
            });

    })
    .text("age5");*/

// Get the data
data.forEach(function(d) {
    d.originD = d.Date,
    d.Date = parseDate(d.Date);
    d.Total = +d.Total;
    d.Male = +d.Male;
    d.Female = +d.Female;
});



// Parse the date / time
//var	parseDate = d3.time.format("%d-%b").parse;
var formatTime = d3.time.format("%e %B");

// Set the ranges
var x = d3.time.scale().range([margin.left, width]);
var y = d3.scale.linear().range([height, margin.top]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    //.attr("transfrom",'translate('+margin.left+',0)')
    .orient("bottom").ticks(7);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(10);



// Define the line
var valueline = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Total); });

// Get the data

// Scale the range of the data
x.domain(d3.extent(data, function(d) { return d.Date; }));
y.domain([0, d3.max(data, function(d) { return d.Total; })]);

// Add the X Axis
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

// Add the Y Axis
svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate("+margin.left+",0)")
    .call(yAxis);

// Add the valueline path.
svg.append("path")
    .attr("class", "line")
    .attr("d", valueline(data))
    .style('fill','url(#lg)');

// Add the scatterplot
svg.selectAll("dot")
    .data(data)
    .enter().append("circle")
    .attr("r", 5)
    .attr("cx", function(d) { return x(d.Date); })
    .attr("cy", function(d) { return y(d.Total); })
    .style('stroke',"#fff")
    .style('stroke-width',2)
    .style('fill','red')
    .on("mouseover", function(d) {
        console.log(d);
        var loc = d3.mouse(d3.select("body")[0][0]);
        var tips = d3.select("#tips");
        tips.style("left",(loc[0]+20)+"px").style('top',loc[1]+"px");
        tips.select("#date").html("Dates of Deaths: "+formatTime(d.Date));
        tips.select("#d_n").html("Number of Deaths: "+d.Total);
        tips.style("display",'block');
        d3.selectAll("#lineChart circle")
            .attr('r',5);
        d3.select(this)
            .transition()
            .duration(500)
            .ease(d3.ease("bounce"))
            .attr('r',10);

        svgContainer.selectAll("circle")
            .attr('r',function (md) {
                return md.date == d.originD? md.radius*2 : 0;
            });
    })
    .on("mouseout", function(d) {
        d3.selectAll("#lineChart circle")
            .attr('r',5);
        d3.select("#tips").style("display",'none');

        svgContainer.selectAll("circle")
            .attr('r',function (md) {
                return md.radius*2;
            });
    });

//axix label
svg.append('g')
    .append('text')
    .attr('class','axixL')
    .attr("x",190)
    .attr('y',height+40)
    .html('Dates of Deaths');

svg.append('g')
    .attr("transform",'rotate(90,'+(margin.left+10)+',80)')
    .append('text')
    .attr('class','axixL')
    .attr("x",margin.left+40)
    .attr('y',130)
    .html('Number of Deaths');


//add brush
//var x = d3.scale.linear().domain([0, 50]).range([0, 500]);
var brush = d3.svg.brush().x(x);
brush(svg);

brush.on('brushend',function () {
    var times = brush.extent();
    svgContainer.selectAll("circle")
        .attr('r',function (md) {
            var pd = parseDate(md.date);
            if(pd>= times[0] && pd<= times[1])
                return md.radius*2;
            return 0;
            //return parseDate(md.date) == d.originD? md.radius*2 : 0;
        });

});
//drag cage
svg.selectAll('rect').attr({
    "height": height,
});
var ms = d3.select("#ms");
ms.on('mousedown',function () {
    d3.select(this).style("box-shadow",'0px 0px 0px rgba(0,0,0,.6)')
});
ms.on('mouseup',function () {
    d3.select(this).style("box-shadow",'5px 5px 5px rgba(0,0,0,.6)')
});
ms.on('click',function () {
    var _this = d3.select(this);
    var flag = _this.attr("flag");
    if(flag =='open'){
        _this.attr("flag",'close');
        d3.select('.background').style('display','none');
        d3.select('.extent').style('display','none');
        _this.html('open multi_sel');
    }else {
        d3.select('.background').style('display','block');
        d3.select('.extent').style('display','block');
        _this.attr("flag",'open');
        _this.html('close multi_sel');
    }

})
