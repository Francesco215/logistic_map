var sequence = (x,r,len) =>{
    var data=[]
    for (let i=0;i<len;i++){
        data.push({x:i,y:x});
        x=logistic(x,r);
    }
    return  data
}

// parte dello slider
var sliderR1 = document.getElementById("r1");
var sliderX_0 = document.getElementById("x_0");
var displayR1 = document.getElementById("displayR1");
var displayX_0 = document.getElementById("displayX_0");

var len=70;
var x_0=sliderX_0.value;
displayR1.innerHTML="\\(r = "+r+"\\)";
displayX_0.innerHTML='\\(x_0 = '+x_0+'\\)';


data=sequence(x_0,r,len);



// append the svg object to the body of the page
var g1 = d3.select("#zigzag")
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



const line=d3.line()
    .x(function(d){return x(d.x);})
    .y(function(d){return y(d.y);})


// Add the line
g1.append("svg:path")
    .data([data])
    .attr("id","zigzag")
    .attr("d",line)
    .style("fill",'none')
    .style("stroke",'#ff7300')
    .style("stroke-width","3px");


const syncR = function(){
    r = sliderR1.value;
    updateR(r);
    }

const syncX_0 = function(){
    x_0 = sliderX_0.value;
    displayX_0.innerHTML='\\(x_0 = '+x_0+'\\)';
    MathJax.typesetPromise([displayX_0]);//slow
    g1.select("#zigzag").data([sequence(x_0,r,len)]).attr("d", line);
    }

sliderR1.addEventListener("mousemove", syncR)
sliderX_0.addEventListener("mousemove",syncX_0 )

g1.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

g1.append("g")
    .call(d3.axisLeft(y));