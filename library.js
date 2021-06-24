const logistic = (x,r,n=1) => {
    for (i=0;i<n;i++){
       x=r*x*(1-x);
    }
    return x;
}

const curve = (r0,n=1) =>{
    var out=[];
    var detail=300*n;
    for (let i=0;i<=detail;i++){
        out.push({x:i/detail,y:logistic(i/detail,r0,n)});
    }
    return  out
}

var x_0=0.3;

const updateR = (r) =>{
    display=[displayR0,displayR1,displayR2,displayR3];
    slider=[sliderR0,sliderR1,sliderR2,sliderR3];
    for(i=0;i<4;i++){
        display[i].innerHTML="\\(r = "+r+"\\)";
        MathJax.typesetPromise([display[i]]);//slow
        slider[i].value=r;
    }
    g0.select("#curve").data([curve(r)]).attr("d", line0);
    g1.select("#zigzag").data([sequence(x_0,r,len)]).attr("d", line);
    g2.select("#curve_2").data([curve(r)]).attr("d", line2);
    g2.select("#web").data([cobweb(x_0,r,l2)]).attr("d", line2);
    g3.select('#curve_3').data([curve(r,n3)]).attr("d",line2);
    g3.select('#web3').data([cobweb(x_0,r,l3,n3)]).attr("d",line2);
}

const updateX0 = (x_0) =>{
    let delta=0.001
    if (x_0>1-delta) x_0=1-delta;
    if (x_0<0+delta) x_0=0+delta;
    d3.select("#dragx_1").attr("cy",y(x_0));
    d3.select("#dragx_2").attr("cx",x2(x_0));  
    d3.select("#dragx_3").attr("cx",x2(x_0));  
    g1.select("#zigzag").data([sequence(x_0,r,len)]).attr("d", line);
    g2.select("#web").data([cobweb(x_0,r,l2)]).attr("d", line2);
    g3.select("#web3").data([cobweb(x_0,r,l3,n3)]).attr("d",line2);
}


// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


const cobweb = (x,r,l,n=1) =>{
    x=parseFloat(x);
    const vertex=[{x:x, y:0}];
    xp1=logistic(x,r,n);
    if (x<xp1){
        if (l<x){
            vertex.push({x:x,y:l});
            return vertex;
        }
        l=l-x;
    }else{
        if (l<xp1){
            vertex.push({x:x,y:l});
            return vertex;
        }if (l<x){
            l=l-xp1;
            vertex.push({x:x,y:xp1});
            vertex.push({x:x-l,y:xp1});
            return vertex;
        }
        vertex.push({x:x,y:xp1});
        vertex.push({x:xp1,y:xp1});
        l=l-x;
        x=xp1;
    }
    for (var i=0;i<200; i++){
        xp1=logistic(x,r,n);
        if (l<Math.abs(xp1-x)){
            vertex.push({x:x,y:(x+l*Math.sign(xp1-x))});
            return vertex;
        }
        if (l<2*Math.abs(xp1-x)){
            vertex.push(
                {x:x,y:xp1},
                {x:x+l*Math.sign(xp1-x)/2,y:xp1});
            return vertex;
        }
        vertex.push({x:x,y:xp1},{x:xp1,y:xp1});
        l=l-2*Math.abs(xp1-x);
        x=xp1;
    }
    return vertex;
}

body=document.getElementById("article");
body.addEventListener("mouseup",function(){updateR(r)});