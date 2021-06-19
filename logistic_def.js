// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


//Create the data


const curve = (r,detail=300) =>{
    var out=[]
    for (let i=0;i<=detail;i++){
        x=i/detail;
        out.push({x:i/detail,y:logistic(x,r)});
    }
    return  out
}

// parte dello slider
var sliderR0 = document.getElementById("r0");
var displayR0 = document.getElementById("displayR0");

var r=sliderR0.value;
displayR0.innerHTML="\\(r = "+r+"\\)";


data=curve(r);



// append the svg object to the body of the page
var svg = d3.select("#curve0")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");


// Add X axis --> it is a date format
var x = d3.scaleLinear()
    .domain([0,1])
    .range([ 0, width ]);

    // Add Y axis
var y = d3.scaleLinear()
    .domain([0,1])
    .range([height, 0]);




// Add the line
svg.append("path")
    .data([data])
    .attr("d",line)
    .style("fill",'none')
    .style("stroke",'#ff7300')
    .style("stroke-width","3px");



const syncR0 = function(){
    r = sliderR0.value;
    displayR0.innerHTML="\\(r = "+r+"\\)";
    data=curve(r);
    MathJax.typesetPromise([displayR0]);//slow
    //svg.selectAll("path").data([data]).attr("d", line); //QUA ESCE UN ERROREEE
    }
sliderR0.addEventListener("mousemove", syncR0)


//non so che fa    
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

svg.append("g")
    .call(d3.axisLeft(y));