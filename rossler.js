// parte dello slider
var sliderC = document.getElementById("c");
var displayC = document.getElementById("displayC");

var c=sliderC.value;
displayC.innerHTML="c = "+c;


// set the dimensions and margins of the graph
var marginCobweb = {top: 10, right: 30, bottom: 30, left: 60},
    widthCobweb = 700 - marginCobweb.left - marginCobweb.right,
    heightCobweb = 400+240 - marginCobweb.top - marginCobweb.bottom;

var x3 = d3.scaleLinear()
    .domain([-14,14])
    .range([ 0, widthCobweb ]);

    // Add Y axis
var y3 = d3.scaleLinear()
    .domain([-14,14])
    .range([heightCobweb, 0]);

const line3=d3.line()
    .x(function(d){return x3(d.x);})
    .y(function(d){return y3(d.y);})


// append the svg object to the body of the page
var g4 = d3.select("#rossler")
    .append("svg")
    .attr("width", widthCobweb + marginCobweb.left + marginCobweb.right)
    .attr("height", heightCobweb + marginCobweb.top + marginCobweb.bottom)
    .append("g")
    .attr("transform","translate(" + marginCobweb.left + "," + marginCobweb.top + ")");

const T=200;
const dT=1e-2;

const rossCurve = (c,t=T,dt=dT) =>{
    a=0.2;
    b=0.2;
    let p=[3.,3.,0]
    let pp1=[0,0,0];
    const traj=[];
    for(i=0;i<t/dt;i++){
        pp1[0]=-p[1]-p[2];
        pp1[1]=p[0]+a*p[1];
        pp1[2]=b+p[2]*(p[0]-c);
        for (j=0;j<3;j++){
            p[j]=p[j]+pp1[j]*dt;
        }
        traj.push({x:p[0],y:p[1],i:i*dt}); 
    }
    return traj;
}   
/*
const color=d3.scaleLinear()
    .domain([0,T/dT])
    .range(["blue","red"])
    */

// Add the curve

data=rossCurve(c)
var sl=50

g4.append("path")
    .data([data.slice(sl/dT,-1)])
    .attr("d",line3)
    .attr("id","curveRoss")
    .style("fill",'none')
    .style("stroke",'#ff7300')
    //.style("stroke",d=>color(d.i))
    .style("stroke-width","2px");




g4.append("g")
    .attr("id","xaxis0")
    .attr("transform", "translate(0," + heightCobweb + ")")
    .call(d3.axisBottom(x3));

g4.append("g")
    .attr("transform", "translate(0,0)")
    .call(d3.axisLeft(y3));


