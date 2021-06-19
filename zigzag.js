// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


var sequence = (x,r,len) =>{
    var data=[]
    for (let i=0;i<len;i++){
        data.push({x:i,y:x});
        x=logistic(x,r);
    }
    return  data
}

// parte dello slider
var sliderR = document.getElementById("r");
var sliderX_0 = document.getElementById("x_0");
var displayR = document.getElementById("displayR");
var displayX_0 = document.getElementById("displayX_0");

var len=70;
var x_0=sliderX_0.value;
var r=sliderR.value;
displayR.innerHTML="\\(r = "+r+"\\)";
displayX_0.innerHTML='\\(x_0 = '+x_0+'\\)';


data=sequence(x_0,r,len);



// append the svg object to the body of the page
var svg = d3.select("#zigzag")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");


// Add X axis --> it is a date format
var x = d3.scaleLinear()
    .domain([0,len])
    .range([ 0, width ]);

    // Add Y axis
var y = d3.scaleLinear()
    .domain([0,1])
    .range([height, 0]);



// Add the line
svg.append("svg:path")
    .data([data])
    .attr("d",line)
    .style("fill",'none')
    .style("stroke",'#ff7300')
    .style("stroke-width","3px");


const syncR = function(){
    r = sliderR.value;
    displayR.innerHTML="\\(r = "+r+"\\)";
    data=sequence(x_0,r,len);
    MathJax.typesetPromise([displayR]);//slow
    svg.selectAll("path").data([data]).attr("d", line);
    }

const syncX_0 = function(){
    x_0 = sliderX_0.value;
    displayX_0.innerHTML='\\(x_0 = '+x_0+'\\)';
    data=sequence(x_0,r,len);
    MathJax.typesetPromise([displayX_0]);//slow
    svg.selectAll("path").data([data]).attr("d", line);
    }

sliderR.addEventListener("mousemove", syncR)
sliderX_0.addEventListener("mousemove",syncX_0 )

//non so che fa    
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

svg.append("g")
    .call(d3.axisLeft(y));