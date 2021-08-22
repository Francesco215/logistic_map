// parte dello slider
var sliderR0 = document.getElementById("r0");
var displayR0 = document.getElementById("displayR0");

var len=70;
r=sliderR0.value;
displayR0.innerHTML="r = "+r;

data0=curve(r);



// append the svg object to the body of the page
var g0 = d3.select("#curve0")
    .append("g")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");


var x0 = d3.scaleLinear()
    .domain([0,1])
    .range([ 0, width ]);

    // Add Y axis
var y0 = d3.scaleLinear()
    .domain([0,1])
    .range([height, 0]);

const line0=d3.line()
    .x(function(d){return x0(d.x);})
    .y(function(d){return y0(d.y);})


// Add the line
g0.append("path")
    .data([data0])
    .attr("d",line0)
    .attr("id","curve")
    .style("fill",'none')
    .style("stroke",'#ff7300')
    .style("stroke-width","3px");

/*
vecchia versione del codice, funzionava solo con firefox.
Però era bella perchè aveva le cose formattate per benino

const syncR0 = function(){
    r = this.value;
    console.log(r);
    g0.select("#curve").data([curve(r)]).attr("d", line0);    
    displayR0.innerHTML="\\(r = "+r+"\\)";
    MathJax.typesetPromise([displayR0]);//slow
}

*/

const syncR0 = function(){
    r = this.value;
    g0.select("#curve").data([curve(r)]).attr("d", line0); 
    displayR0.innerHTML="r = "+r;   
}

sliderR0.addEventListener("input", syncR0)

g0.append("g")
    .attr("id","xaxis0")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x0));

g0.append("g")
    .attr("transform", "translate(0,0)")
    .call(d3.axisLeft(y0));