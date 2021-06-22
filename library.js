const logistic = (x,r,n=1) => {
    for (i=0;i<n;i++){
       x=r*x*(1-x);
    }
    return x;
}

const updateR = (r) =>{
    displayR0.innerHTML="\\(r = "+r+"\\)";
    displayR1.innerHTML="\\(r = "+r+"\\)";
    displayR2.innerHTML="\\(r = "+r+"\\)";
    MathJax.typesetPromise([displayR0]);//slow
    MathJax.typesetPromise([displayR1]);//slow
    MathJax.typesetPromise([displayR2]);//slow
    sliderR0.value=r;
    sliderR1.value=r;
    sliderR2.value=r;
    data0=curve(r);
    g0.select("#curve").data([data0]).attr("d", line0);
    g1.select("#zigzag").data([sequence(x_0,r,len)]).attr("d", line);
    data2=curve(r);
    web=cobweb(x_2,r,l2);
    g2.select("#curve_2").data([data2]).attr("d", line2);
    g2.select("#web").data([web]).attr("d", line2);


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

