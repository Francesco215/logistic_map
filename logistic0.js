const curve = (r0) =>{
    var out=[];
    var detail=300;
    for (let i=0;i<=detail;i++){
        out.push({x:i/detail,y:logistic(i/detail,r0)});
    }
    return  out
}

// parte dello slider
var sliderR0 = document.getElementById("r0");
var displayR0 = document.getElementById("displayR0");

var len=70;
var r0=sliderR0.value;
displayR0.innerHTML="\\(r = "+r0+"\\)";

data0=curve(r0);



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


const syncR0 = function(){
    r0 = sliderR0.value;
    displayR0.innerHTML="\\(r = "+r0+"\\)";
    data0=curve(r0);
    MathJax.typesetPromise([displayR0]);//slow
    g0.select("#curve").data([data0]).attr("d", line0);
}

sliderR0.addEventListener("mousemove", syncR0)



g0.append("g")
    .attr("id","xaxis0")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x0));

g0.append("g")
    .attr("transform", "translate(0,0)")
    .call(d3.axisLeft(y0));