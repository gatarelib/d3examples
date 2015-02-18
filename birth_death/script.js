// Generated by CoffeeScript 1.9.0
(function() {
  var buttons, gap, generate_point, h, h_button, n, note, points, rect, svg, update, w, w_button;

  w = 960;

  h = 500;

  h_button = 50;

  w_button = 120;

  gap = 25;

  svg = d3.select("div#figure").append("svg").attr("height", h + gap + h_button).attr("width", w);

  rect = svg.append("rect").attr("height", h).attr("width", w).attr("class", "background");

  buttons = svg.selectAll("empty").data([0, 1]).enter().append("rect").attr("x", function(d) {
    return gap + (w_button + gap) * d;
  }).attr("y", function(d) {
    return h + gap;
  }).attr("height", h_button).attr("width", w_button).attr("class", "button");

  svg.selectAll("empty").data([0, 1]).enter().append("text").attr("class", "button").attr("x", function(d) {
    return gap + (w_button + gap) * d + w_button / 2;
  }).attr("y", function(d) {
    return h + gap + h_button / 2;
  }).text(function(d) {
    return ["birth", "death"][d];
  });

  n = 10;

  generate_point = function() {
    return {
      x: Math.random() * w,
      y: Math.random() * h
    };
  };

  points = d3.range(n).map(function(i) {
    return generate_point();
  });

  update = function(data, time) {
    var circles;
    if (time == null) {
      time = 3000;
    }
    circles = svg.selectAll("circle.points").data(data).attr("cx", function(d) {
      return d.x;
    }).attr("cy", function(d) {
      return d.y;
    }).attr("r", 10).attr("class", "points");
    circles.enter().append("circle").attr("cx", function(d) {
      return d.x;
    }).attr("cy", function(d) {
      return d.y;
    }).attr("r", 0).attr("class", "points").transition().duration(time).attr("r", 10);
    return circles.exit().classed({
      "dead": true
    }).transition().duration(time).attr("r", 0).transition().delay(time).remove();
  };

  update(points);

  note = svg.append("text").attr("x", 20).attr("y", 20);

  buttons.on("click", function(d) {
    if (d === 1) {
      points.pop();
      note.text("death to number " + (points.length + 1));
      console.log(points.length);
    } else {
      points.push(generate_point());
      note.text("birth to number " + (points.length + 1));
    }
    return update(points);
  });

}).call(this);