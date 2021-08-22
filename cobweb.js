// parte dello slider
var sliderR2 = document.getElementById("r2");
var sliderL2 = document.getElementById("l_2");
var displayR2 = document.getElementById("displayR2");
var displayL2 = document.getElementById("displayL_2");

var len=70;
var l2=Math.pow(10,sliderL2.value);
displayR2.innerHTML="r = "+r;
displayL2.innerHTML="l = "+l2.toPrecision(3);

data2=curve(r);
web=cobweb(x_0,r,l2);

// set the dimensions and margins of the graph
var marginCobweb = {top: 10, right: 30, bottom: 30, left: 60},
    widthCobweb = 700 - marginCobweb.left - marginCobweb.right,
    heightCobweb = 400+240 - marginCobweb.top - marginCobweb.bottom;

var x2 = d3.scaleLinear()
    .domain([0,1])
    .range([ 0, widthCobweb ]);

var x2m1 = d3.scaleLinear()
    .domain([0,widthCobweb])
    .range([0,1])

    // Add Y axis
var y2 = d3.scaleLinear()
    .domain([0,1])
    .range([heightCobweb, 0]);

const line2=d3.line()
    .x(function(d){return x2(d.x);})
    .y(function(d){return y2(d.y);})


// append the svg object to the body of the page
var g2 = d3.select("#cobweb")
    .append("svg")
    .attr("width", widthCobweb + marginCobweb.left + marginCobweb.right)
    .attr("height", heightCobweb + marginCobweb.top + marginCobweb.bottom)
    .append("g")
    .attr("transform","translate(" + marginCobweb.left + "," + marginCobweb.top + ")");
   
//bisectrix
g2.append("line")
    .attr("x1","0")
    .attr("y1",heightCobweb)
    .attr("x2",widthCobweb)
    .attr("y2","0")
    .style("fill",'none')
    .style("stroke",'#79b0e0')
    .style("stroke-width","2px");


// Add the curve
g2.append("path")
    .data([data2])
    .attr("d",line2)
    .attr("id","curve_2")
    .style("fill",'none')
    .style("stroke",'#ff7300')
    .style("stroke-width","3px");

// Add the cobweb
g2.append("path")
    .data([web])
    .attr("d",line2)
    .attr("id","web")
    .style("fill",'none')
    .style("stroke",'#898989')
    .style("stroke-width","1px");

g2.append("circle")
    .attr("cx",x2(x_0))
    .attr("cy",heightCobweb)
    .attr("r",7.5)
    .attr("id","dragx_2")
    .style("fill",'#898989')

var drag2=d3.drag()
    .on("drag", function(){
        x_0=x2m1(d3.event.x);
        updateX0(x_0);
    })

drag2(g2.selectAll("#dragx_2"));

const syncR2 = function(){
    r = sliderR2.value;
    g2.select("#curve_2").data([curve(r)]).attr("d", line2);
    g2.select("#web").data([cobweb(x_0,r,l2)]).attr("d", line2);
    displayR2.innerHTML="r = "+r;
}

const syncL2 = function(){
    l2 =Math.pow(10 ,sliderL2.value);
    displayL2.innerHTML="l = "+l2.toPrecision(3);
    web=cobweb(x_0,r,l2);
    g2.select("#web").data([web]).attr("d", line2);
}


sliderR2.addEventListener("input", syncR2)
sliderL2.addEventListener("input",syncL2)



g2.append("g")
    .attr("id","xaxis0")
    .attr("transform", "translate(0," + heightCobweb + ")")
    .call(d3.axisBottom(x2));

g2.append("g")
    .attr("transform", "translate(0,0)")
    .call(d3.axisLeft(y2));

