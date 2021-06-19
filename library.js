const logistic = (x,r) => r*x*(1-x);



const line=d3.line()
    .x(function(d){return x(d.x);})
    .y(function(d){return y(d.y);})


