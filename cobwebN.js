// parte dello slider
var sliderR3 = document.getElementById("r3");
var sliderL3 = document.getElementById("l_3");
var sliderN3 = document.getElementById("n_3");

var displayR3 = document.getElementById("displayR3");
var displayL3 = document.getElementById("displayL_3");
var displayN3 = document.getElementById("displayN_3");


var len=70;
var l3=Math.pow(10,sliderL3.value);
var n3=sliderN3.value;
displayR3.innerHTML="\\(r = "+r+"\\)";
displayL3.innerHTML="\\(l = "+l3.toPrecision(3)+"\\)";
displayN3.innerHTML="\\(n = "+n3+"\\)";

data2=curve(r,n3);
web=cobweb(x_0,r,l3,n3);

// append the svg object to the body of the page
var g3 = d3.select("#cobwebN")
    .append("svg")
    .attr("width", widthCobweb + marginCobweb.left + marginCobweb.right)
    .attr("height", heightCobweb + marginCobweb.top + marginCobweb.bottom)
    .append("g")
    .attr("transform","translate(" + marginCobweb.left + "," + marginCobweb.top + ")");
   
//bisectrix
g3.append("line")
    .attr("x1","0")
    .attr("y1",heightCobweb)
    .attr("x2",widthCobweb)
    .attr("y2","0")
    .style("fill",'none')
    .style("stroke",'#79b0e0')
    .style("stroke-width","2px");


// Add the curve
g3.append("path")
    .data([data2])
    .attr("d",line2)
    .attr("id","curve_3")
    .style("fill",'none')
    .style("stroke",'#ff7300')
    .style("stroke-width","3px");

// Add the cobweb
g3.append("path")
    .data([web])
    .attr("d",line2)
    .attr("id","web3")
    .style("fill",'none')
    .style("stroke",'#898989')
    .style("stroke-width","1px");

g3.append("circle")
    .attr("cx",x2(x_0))
    .attr("cy",heightCobweb)
    .attr("r",7.5)
    .attr("id","dragx_3")
    .style("fill",'#898989')

var drag3=d3.drag()
    .on("drag", function(){
        x_0=x2m1(d3.event.x);
        updateX0(x_0);
        console.log("suca")
    })

drag3(g3.selectAll("#dragx_3"));

const syncR3 = function(){
    r = sliderR3.value;
    g3.select('#curve_3').data([curve(r,n3)]).attr("d",line2);
    g3.select('#web3').data([cobweb(x_0,r,l3,n3)]).attr("d",line2);
    displayR3.innerHTML="\\(r = "+r+"\\)";
    MathJax.typesetPromise([displayR3]);//slow
}

const syncL3 = function(){
    l3 =Math.pow(10 ,sliderL3.value);
    displayL3.innerHTML="\\(l = "+l3.toPrecision(3)+"\\)";
    MathJax.typesetPromise([displayL3]);//slow
    g3.select("#web3").data([cobweb(x_0,r,l3,n3)]).attr("d", line2);
}

const syncN3= function(){
    n3 =sliderN3.value;
    displayN3.innerHTML="\\(n = "+n3+"\\)";
    MathJax.typesetPromise([displayN3]);//slow
    g3.select("#web3").data([cobweb(x_0,r,l3,n3)]).attr("d", line2);
    g3.select("#curve_3").data([curve(r,n3)]).attr("d",line2);
}

sliderR3.addEventListener("mousemove", syncR3);
sliderL3.addEventListener("mousemove",syncL3);
sliderN3.addEventListener("mousemove",syncN3);



g3.append("g")
    .attr("id","xaxis0")
    .attr("transform", "translate(0," + heightCobweb + ")")
    .call(d3.axisBottom(x2));

g3.append("g")
    .attr("transform", "translate(0,0)")
    .call(d3.axisLeft(y2));

