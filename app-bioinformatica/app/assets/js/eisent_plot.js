var myDiagram;
var myLocation = {  // this controls the data properties used by data binding conversions
  x: "sepalLength",
  y: "sepalWidth"
}
var lastStroked = null;  // this remembers the last highlit Shape

function eisen_plot() {
//      if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
  var $ = go.GraphObject.make;  // for conciseness in defining templates

  myDiagram =
    $(go.Diagram, "eisen_plot",  // create a Diagram for the DIV HTML element
      {
        "animationManager.isEnabled": false,  // don't bother with layout animation
        contentAlignment: go.Spot.Center,  // content is always centered in the viewport
        autoScale: go.Diagram.Uniform,  // scale always has all content fitting in the viewport
        isReadOnly: true,  // don't let users modify anything
        mouseOver: doMouseOver,  // this event handler is defined below
        click: doMouseOver  // this event handler is defined below
      });

  // define a simple Node template
  myDiagram.nodeTemplate =
    $(go.Node, "Auto",
      {
        selectable: false,
        mouseOver: doMouseOver  // this event handler is defined below
      },
      new go.Binding("location", "", function(nothing, elt) {
        return new go.Point(elt.data[myLocation.x]*200,
          elt.data[myLocation.y]*200)
      }),

      $(go.Shape, "Hexagon",
        {
          name: "SHAPE",
          width: 20, height: 20,
          strokeWidth: 4, stroke: null
        },
        new go.Binding("fill", "species", function(name) {
          switch (name) {
            case "Iris-setosa":     return "rgba(240, 120,  50, .6)";
            case "Iris-versicolor": return "rgba(240, 230, 120, .6)";
            case "Iris-virginica":  return "rgba(125, 200, 120, .6)";
          }
          return "black";
        }))
    );

  // This is the fundamental data set, taken from:
  // https://en.wikipedia.org/wiki/Iris_flower_data_set
  var irisData = [
    [ 5.1, 3.5, 1.4, 0.2, "Iris-setosa" ],
    [ 4.9, 3.0, 1.4, 0.2, "Iris-setosa" ],
    [ 4.7, 3.2, 1.3, 0.2, "Iris-setosa" ],
    [ 4.6, 3.1, 1.5, 0.2, "Iris-setosa" ],
    [ 5.0, 3.6, 1.4, 0.2, "Iris-setosa" ],
    [ 5.4, 3.9, 1.7, 0.4, "Iris-setosa" ],
    [ 4.6, 3.4, 1.4, 0.3, "Iris-setosa" ],
    [ 5.0, 3.4, 1.5, 0.2, "Iris-setosa" ],
    [ 4.4, 2.9, 1.4, 0.2, "Iris-setosa" ],
    [ 4.9, 3.1, 1.5, 0.1, "Iris-setosa" ],
    [ 5.4, 3.7, 1.5, 0.2, "Iris-setosa" ],
    [ 4.8, 3.4, 1.6, 0.2, "Iris-setosa" ],
    [ 4.8, 3.0, 1.4, 0.1, "Iris-setosa" ],
    [ 4.3, 3.0, 1.1, 0.1, "Iris-setosa" ],
    [ 5.8, 4.0, 1.2, 0.2, "Iris-setosa" ],
    [ 5.7, 4.4, 1.5, 0.4, "Iris-setosa" ],
    [ 5.4, 3.9, 1.3, 0.4, "Iris-setosa" ],
    [ 5.1, 3.5, 1.4, 0.3, "Iris-setosa" ],
    [ 5.7, 3.8, 1.7, 0.3, "Iris-setosa" ],
    [ 5.1, 3.8, 1.5, 0.3, "Iris-setosa" ],
    [ 5.4, 3.4, 1.7, 0.2, "Iris-setosa" ],
    [ 5.1, 3.7, 1.5, 0.4, "Iris-setosa" ],
    [ 4.6, 3.6, 1.0, 0.2, "Iris-setosa" ],
    [ 5.1, 3.3, 1.7, 0.5, "Iris-setosa" ],
    [ 4.8, 3.4, 1.9, 0.2, "Iris-setosa" ],
    [ 5.0, 3.0, 1.6, 0.2, "Iris-setosa" ],
    [ 5.0, 3.4, 1.6, 0.4, "Iris-setosa" ],
    [ 5.2, 3.5, 1.5, 0.2, "Iris-setosa" ],
    [ 5.2, 3.4, 1.4, 0.2, "Iris-setosa" ],
    [ 4.7, 3.2, 1.6, 0.2, "Iris-setosa" ],
    [ 4.8, 3.1, 1.6, 0.2, "Iris-setosa" ],
    [ 5.4, 3.4, 1.5, 0.4, "Iris-setosa" ],
    [ 5.2, 4.1, 1.5, 0.1, "Iris-setosa" ],
    [ 5.5, 4.2, 1.4, 0.2, "Iris-setosa" ],
    [ 4.9, 3.1, 1.5, 0.2, "Iris-setosa" ],
    [ 5.0, 3.2, 1.2, 0.2, "Iris-setosa" ],
    [ 5.5, 3.5, 1.3, 0.2, "Iris-setosa" ],
    [ 4.9, 3.6, 1.4, 0.1, "Iris-setosa" ],
    [ 4.4, 3.0, 1.3, 0.2, "Iris-setosa" ],
    [ 5.1, 3.4, 1.5, 0.2, "Iris-setosa" ],
    [ 5.0, 3.5, 1.3, 0.3, "Iris-setosa" ],
    [ 4.5, 2.3, 1.3, 0.3, "Iris-setosa" ],
    [ 4.4, 3.2, 1.3, 0.2, "Iris-setosa" ],
    [ 5.0, 3.5, 1.6, 0.6, "Iris-setosa" ],
    [ 5.1, 3.8, 1.9, 0.4, "Iris-setosa" ],
    [ 4.8, 3.0, 1.4, 0.3, "Iris-setosa" ],
    [ 5.1, 3.8, 1.6, 0.2, "Iris-setosa" ],
    [ 4.6, 3.2, 1.4, 0.2, "Iris-setosa" ],
    [ 5.3, 3.7, 1.5, 0.2, "Iris-setosa" ],
    [ 5.0, 3.3, 1.4, 0.2, "Iris-setosa" ],
    [ 7.0, 3.2, 4.7, 1.4, "Iris-versicolor" ],
    [ 6.4, 3.2, 4.5, 1.5, "Iris-versicolor" ],
    [ 6.9, 3.1, 4.9, 1.5, "Iris-versicolor" ],
    [ 5.5, 2.3, 4.0, 1.3, "Iris-versicolor" ],
    [ 6.5, 2.8, 4.6, 1.5, "Iris-versicolor" ],
    [ 5.7, 2.8, 4.5, 1.3, "Iris-versicolor" ],
    [ 6.3, 3.3, 4.7, 1.6, "Iris-versicolor" ],
    [ 4.9, 2.4, 3.3, 1.0, "Iris-versicolor" ],
    [ 6.6, 2.9, 4.6, 1.3, "Iris-versicolor" ],
    [ 5.2, 2.7, 3.9, 1.4, "Iris-versicolor" ],
    [ 5.0, 2.0, 3.5, 1.0, "Iris-versicolor" ],
    [ 5.9, 3.0, 4.2, 1.5, "Iris-versicolor" ],
    [ 6.0, 2.2, 4.0, 1.0, "Iris-versicolor" ],
    [ 6.1, 2.9, 4.7, 1.4, "Iris-versicolor" ],
    [ 5.6, 2.9, 3.6, 1.3, "Iris-versicolor" ],
    [ 6.7, 3.1, 4.4, 1.4, "Iris-versicolor" ],
    [ 5.6, 3.0, 4.5, 1.5, "Iris-versicolor" ],
    [ 5.8, 2.7, 4.1, 1.0, "Iris-versicolor" ],
    [ 6.2, 2.2, 4.5, 1.5, "Iris-versicolor" ],
    [ 5.6, 2.5, 3.9, 1.1, "Iris-versicolor" ],
    [ 5.9, 3.2, 4.8, 1.8, "Iris-versicolor" ],
    [ 6.1, 2.8, 4.0, 1.3, "Iris-versicolor" ],
    [ 6.3, 2.5, 4.9, 1.5, "Iris-versicolor" ],
    [ 6.1, 2.8, 4.7, 1.2, "Iris-versicolor" ],
    [ 6.4, 2.9, 4.3, 1.3, "Iris-versicolor" ],
    [ 6.6, 3.0, 4.4, 1.4, "Iris-versicolor" ],
    [ 6.8, 2.8, 4.8, 1.4, "Iris-versicolor" ],
    [ 6.7, 3.0, 5.0, 1.7, "Iris-versicolor" ],
    [ 6.0, 2.9, 4.5, 1.5, "Iris-versicolor" ],
    [ 5.7, 2.6, 3.5, 1.0, "Iris-versicolor" ],
    [ 5.5, 2.4, 3.8, 1.1, "Iris-versicolor" ],
    [ 5.5, 2.4, 3.7, 1.0, "Iris-versicolor" ],
    [ 5.8, 2.7, 3.9, 1.2, "Iris-versicolor" ],
    [ 6.0, 2.7, 5.1, 1.6, "Iris-versicolor" ],
    [ 5.4, 3.0, 4.5, 1.5, "Iris-versicolor" ],
    [ 6.0, 3.4, 4.5, 1.6, "Iris-versicolor" ],
    [ 6.7, 3.1, 4.7, 1.5, "Iris-versicolor" ],
    [ 6.3, 2.3, 4.4, 1.3, "Iris-versicolor" ],
    [ 5.6, 3.0, 4.1, 1.3, "Iris-versicolor" ],
    [ 5.5, 2.5, 4.0, 1.3, "Iris-versicolor" ],
    [ 5.5, 2.6, 4.4, 1.2, "Iris-versicolor" ],
    [ 6.1, 3.0, 4.6, 1.4, "Iris-versicolor" ],
    [ 5.8, 2.6, 4.0, 1.2, "Iris-versicolor" ],
    [ 5.0, 2.3, 3.3, 1.0, "Iris-versicolor" ],
    [ 5.6, 2.7, 4.2, 1.3, "Iris-versicolor" ],
    [ 5.7, 3.0, 4.2, 1.2, "Iris-versicolor" ],
    [ 5.7, 2.9, 4.2, 1.3, "Iris-versicolor" ],
    [ 6.2, 2.9, 4.3, 1.3, "Iris-versicolor" ],
    [ 5.1, 2.5, 3.0, 1.1, "Iris-versicolor" ],
    [ 5.7, 2.8, 4.1, 1.3, "Iris-versicolor" ],
    [ 6.3, 3.3, 6.0, 2.5, "Iris-virginica" ],
    [ 5.8, 2.7, 5.1, 1.9, "Iris-virginica" ],
    [ 7.1, 3.0, 5.9, 2.1, "Iris-virginica" ],
    [ 6.3, 2.9, 5.6, 1.8, "Iris-virginica" ],
    [ 6.5, 3.0, 5.8, 2.2, "Iris-virginica" ],
    [ 7.6, 3.0, 6.6, 2.1, "Iris-virginica" ],
    [ 4.9, 2.5, 4.5, 1.7, "Iris-virginica" ],
    [ 7.3, 2.9, 6.3, 1.8, "Iris-virginica" ],
    [ 6.7, 2.5, 5.8, 1.8, "Iris-virginica" ],
    [ 7.2, 3.6, 6.1, 2.5, "Iris-virginica" ],
    [ 6.5, 3.2, 5.1, 2.0, "Iris-virginica" ],
    [ 6.4, 2.7, 5.3, 1.9, "Iris-virginica" ],
    [ 6.8, 3.0, 5.5, 2.1, "Iris-virginica" ],
    [ 5.7, 2.5, 5.0, 2.0, "Iris-virginica" ],
    [ 5.8, 2.8, 5.1, 2.4, "Iris-virginica" ],
    [ 6.4, 3.2, 5.3, 2.3, "Iris-virginica" ],
    [ 6.5, 3.0, 5.5, 1.8, "Iris-virginica" ],
    [ 7.7, 3.8, 6.7, 2.2, "Iris-virginica" ],
    [ 7.7, 2.6, 6.9, 2.3, "Iris-virginica" ],
    [ 6.0, 2.2, 5.0, 1.5, "Iris-virginica" ],
    [ 6.9, 3.2, 5.7, 2.3, "Iris-virginica" ],
    [ 5.6, 2.8, 4.9, 2.0, "Iris-virginica" ],
    [ 7.7, 2.8, 6.7, 2.0, "Iris-virginica" ],
    [ 6.3, 2.7, 4.9, 1.8, "Iris-virginica" ],
    [ 6.7, 3.3, 5.7, 2.1, "Iris-virginica" ],
    [ 7.2, 3.2, 6.0, 1.8, "Iris-virginica" ],
    [ 6.2, 2.8, 4.8, 1.8, "Iris-virginica" ],
    [ 6.1, 3.0, 4.9, 1.8, "Iris-virginica" ],
    [ 6.4, 2.8, 5.6, 2.1, "Iris-virginica" ],
    [ 7.2, 3.0, 5.8, 1.6, "Iris-virginica" ],
    [ 7.4, 2.8, 6.1, 1.9, "Iris-virginica" ],
    [ 7.9, 3.8, 6.4, 2.0, "Iris-virginica" ],
    [ 6.4, 2.8, 5.6, 2.2, "Iris-virginica" ],
    [ 6.3, 2.8, 5.1, 1.5, "Iris-virginica" ],
    [ 6.1, 2.6, 5.6, 1.4, "Iris-virginica" ],
    [ 7.7, 3.0, 6.1, 2.3, "Iris-virginica" ],
    [ 6.3, 3.4, 5.6, 2.4, "Iris-virginica" ],
    [ 6.4, 3.1, 5.5, 1.8, "Iris-virginica" ],
    [ 6.0, 3.0, 4.8, 1.8, "Iris-virginica" ],
    [ 6.9, 3.1, 5.4, 2.1, "Iris-virginica" ],
    [ 6.7, 3.1, 5.6, 2.4, "Iris-virginica" ],
    [ 6.9, 3.1, 5.1, 2.3, "Iris-virginica" ],
    [ 5.8, 2.7, 5.1, 1.9, "Iris-virginica" ],
    [ 6.8, 3.2, 5.9, 2.3, "Iris-virginica" ],
    [ 6.7, 3.3, 5.7, 2.5, "Iris-virginica" ],
    [ 6.7, 3.0, 5.2, 2.3, "Iris-virginica" ],
    [ 6.3, 2.5, 5.0, 1.9, "Iris-virginica" ],
    [ 6.5, 3.0, 5.2, 2.0, "Iris-virginica" ],
    [ 6.2, 3.4, 5.4, 2.3, "Iris-virginica" ],
    [ 5.9, 3.0, 5.1, 1.8, "Iris-virginica" ]
  ];

  // now convert that data into an Array of JavaScript Objects,
  // to be used as the Model.nodeDataArray
  var array = [];
  for (var i = 0; i < irisData.length; i++) {
    var line = irisData[i];
    var data = {
      sepalLength: line[0],
      sepalWidth:  line[1],
      petalLength: line[2],
      petalWidth:  line[3],
      species:     line[4]
    };
    array.push(data);
  }

  // create the Model for the Diagram to display
  myDiagram.model = new go.Model(array);


  // Called when the mouse is over the diagram's background
  function doMouseOver(e) {
    if (e === undefined) e = myDiagram.lastInput;
    var doc = e.documentPoint;
    // find all Nodes that are within 100 units
    var list = myDiagram.findObjectsNear(doc, 100, null, function(x) { return x instanceof go.Node; });
    // now find the one that is closest to e.documentPoint
    var closest = null;
    var closestDist = 999999999;
    list.each(function(node) {
      var dist = doc.distanceSquaredPoint(node.getDocumentPoint(go.Spot.Center));
      if (dist < closestDist) {
        closestDist = dist;
        closest = node;
      }
    });
    highlightNode(e, closest);
  }

  // Called with a Node (or null) that the mouse is over or near
  function highlightNode(e, node) {
    if (node !== null) {
      var shape = node.findObject("SHAPE");
      shape.stroke = "white";
      if (lastStroked !== null && lastStroked !== shape) lastStroked.stroke = null;
      lastStroked = shape;
      updateInfoBox(e.viewPoint, node.data);
    } else {
      if (lastStroked !== null) lastStroked.stroke = null;
      lastStroked = null;
      document.getElementById("infoBoxHolder").innerHTML = "";
    }
  }

  // Make sure the infoBox is momentarily hidden if the user tries to mouse over it
  var infoBoxH = document.getElementById("infoBoxHolder");
  infoBoxH.addEventListener("mousemove", function() {
    var box = document.getElementById("infoBoxHolder");
    box.style.left = parseInt(box.style.left) + "px";
    box.style.top = parseInt(box.style.top)+30 + "px";
  }, false);

  var diagramDiv = document.getElementById("eisen_plot");
  // Make sure the infoBox is hidden when the mouse is not over the Diagram
  diagramDiv.addEventListener("mouseout", function(e) {
    if (lastStroked !== null) lastStroked.stroke = null;
    lastStroked = null;

    var infoBox = document.getElementById("infoBox");
    var elem = document.elementFromPoint(e.clientX, e.clientY);
    if (elem !== null && (elem === infoBox || elem.parentNode === infoBox)) {
      // do nothing
    } else {
      var box = document.getElementById("infoBoxHolder");
      box.innerHTML = "";
    }
  }, false);

} // end init

// This function is called to update the tooltip information
// depending on the bound data of the Node that is closest to the pointer.
function updateInfoBox(mousePt, data) {
  var x =
    "<div id='infoBox'>" +
    "<div>" + data.species + "</div>" +
    "<div class='infoTitle'>Sepal Length</div>" +
    "<div class='infoValues'>" + data.sepalLength + "</div>" +
    "<div class='infoTitle'>Sepal Width</div>" +
    "<div class='infoValues'>" + data.sepalWidth + "</div>" +
    "<div class='infoTitle'>Petal Length</div>" +
    "<div class='infoValues'>" + data.petalLength + "</div>" +
    "<div class='infoTitle'>Petal Width</div>" +
    "<div class='infoValues'>" + data.petalWidth + "</div></div>"

  var box = document.getElementById("infoBoxHolder");
  box.innerHTML = x;

  box.style.left = mousePt.x + 160 + "px";
  box.style.top = mousePt.y + 750 + "px";
}