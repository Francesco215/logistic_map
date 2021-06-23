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
var len=70;
var x_0=0.3;
displayR1.innerHTML="\\(r = "+r+"\\)";


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

var ym1 = d3.scaleLinear()
    .domain([height,0])
    .range([0,1])



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

g1.append("circle")
    .attr("cx",0)
    .attr("cy",y(x_0))
    .attr("r",7.5)
    .attr("id","dragx_1")
    .style("fill",'#ff7300')

var drag2=d3.drag()
    .on("drag", function(){
        x_0=ym1(d3.event.y);
        updateX0(x_0);
    })
drag2(g1.selectAll("#dragx_1"));


const syncR = function(){
    r = sliderR1.value;
    updateR(r);
    }

sliderR1.addEventListener("mousemove", syncR)

g1.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

g1.append("g")
    .call(d3.axisLeft(y));