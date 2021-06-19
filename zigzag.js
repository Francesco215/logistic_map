// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


//Create the data
const logistic = (x,r) => r*x*(1-x);

var zigzag = (x,r,len) =>{
    var data=[]
    for (let i=0;i<len;i++){
        data.push([i*width/len,x*height]);
        x=logistic(x,r);
    }
    return  data
}
var sequence = (x,r,len) =>{
    var data=[]
    for (let i=0;i<len;i++){
        data.push([i,x]);
        x=logistic(x,r);
    }
    return  data
}


var len=70;
data=zigzag(0.3,1,len);
console.log(data)

// append the svg object to the body of the page
var svg = d3.select("svg")
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



//var line=d3.line().x(d => d.index).y(d =>)


// Add the line
svg.append("svg:path")
    .data([data])
    .attr("d",d3.line())
    .style("fill",'none')
    .style("stroke",'red')
    .style("stroke-width","3px");




// parte dello slider


var sliderR = document.getElementById("r");
var displayR = document.getElementById("displayR");
var r;

sliderR.addEventListener("mousemove", function(){
    r = sliderR.value;
    displayR.innerHTML="r = "+r;
    data=zigzag(0.3,r,len);
    console.log(data[-1])
    svg.selectAll("path").data([data]).attr("d", d3.line());
})


//non so che fa    
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

svg.append("g")
    .call(d3.axisLeft(y));