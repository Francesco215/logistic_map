g5= d3.select("#rossler1D")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

var x4 = d3.scaleLinear()
    .domain([0,T])
    .range([ 0, width ]);

var y4 = d3.scaleLinear()
    .domain([-14,14])
    .range([height, 0]);

const line4=d3.line()
    .x(function(d){return x4(d.i);})
    .y(function(d){return y4(d.x);})

g5.append("path")
    .data([data])
    .attr("d",line4)
    .attr("id","curveRoss1D")
    .style("fill",'none')
    .style("stroke",'#ff7300')
    //.style("stroke",d=>color(d.i))
    .style("stroke-width","2px");

const syncC = function(){
    c = sliderC.value;
    data=rossCurve(c);
    g4.select('#curveRoss').data([data.slice(sl/dT,-1)]).attr("d",line3);
    g5.select('#curveRoss1D').data([data]).attr("d",line4);
    displayC.innerHTML="c = "+c;
}

sliderC.addEventListener("mousemove", syncC);



g5.append("g")
    .attr("id","xaxis0")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x4));

g5.append("g")
    .attr("transform", "translate(0,0)")
    .call(d3.axisLeft(y4));