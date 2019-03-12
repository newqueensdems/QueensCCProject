var mymap = L.map('map');

mymap.setView([40.674649,-73.844261], 11);

L.tileLayer('https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

// passing through new baselayer based on M_Status through same json
var M_Status_Layer = L.geoJson(QueensCC, {
  style: function(feature) {
    var malefillColor = feature.properties.QnsCountyCommitteeList_M_Status;

    switch(malefillColor)
    {
      case "Both":
        malefillColor = "#66a8ff";
        break;
      case "Petitioned":
        malefillColor = "#9fff89";
        break;
      case "Appointed":
        malefillColor = "#ff1ee4";
        break;
      case "N/A":
        malefillColor = "Black";
        break;
      default:
        malefillColor = "Black";
        break;
    }
    return {color: "Black", weight: 0, fillColor: malefillColor, fillOpacity: .6};
    },
    onEachFeature: maleonEachFeature
});

// creating a div control that contains male county committee person
var maleinfo = L.control();

maleinfo.onAdd = function () {
    this._div = L.DomUtil.create('div', 'maleinfo');
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
maleinfo.update = function (props) {
    this._div.innerHTML = '<h4>Find out who is a Queens Democratic Party County Committee Person</h4>' +
        (props ? '<b>' + 'Election District' + ' ' + props.ElectDist +
        '</b><br/>' + 'Male Person' + ' ' + props.QnsCountyCommitteeList_M_Name
        : 'Hover over an Electrion District to see who is the male County Committee person');
};

maleinfo.addTo(mymap);

$('.maleinfo').hide()

// creating a function that highlights each ED when it's hovered over
function malehighlightFeature(m) {
    var M_Status_Layer = m.target;

    // the custom control that was made above is updated
    maleinfo.update(M_Status_Layer.feature.properties);

    M_Status_Layer.setStyle({
        weight: 2,
        color: '#666',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        M_Status_Layer.bringToFront();
    }
}

// creating a function that resets the map when user hovers out
function maleresetHighlight(m) {
    M_Status_Layer.resetStyle(m.target);

    // updating custom control based on mouseout
    maleinfo.update();
}

// creating zoom on election district click
function malezoomToFeature(m) {
    mymap.fitBounds(m.target.getBounds());
}

// creating a function that groups together the all hover events and the zoom funciton that was created
function maleonEachFeature(feature, M_Status_Layer) {
    M_Status_Layer.on({
        mouseover: malehighlightFeature,
        mouseout: maleresetHighlight,
        click: malezoomToFeature
    });
}

// passing through new baselayer based on F_Status through same json
var F_Status_Layer = L.geoJson(QueensCC, {
  style: function(feature) {
    var femalefillColor = feature.properties.QnsCountyCommitteeList_F_Status;

    switch(femalefillColor)
    {
      case "Both":
        femalefillColor = "#66a8ff";
        break;
      case "Petitioned":
        femalefillColor = "#9fff89";
        break;
      case "Appointed":
        femalefillColor = "#ff1ee4";
        break;
      case "N/A":
        femalefillColor = "Black";
        break;
      default:
        femalefillColor = "Black";
        break;
    }
    return {color: "Black", weight: 0, fillColor: femalefillColor, fillOpacity: .6};
    },
    onEachFeature: femaleonEachFeature
});

// creating a div control that contains female county committee person
var femaleinfo = L.control();

femaleinfo.onAdd = function () {
    this._div = L.DomUtil.create('div', 'femaleinfo');
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
femaleinfo.update = function (props) {
    this._div.innerHTML = '<h4>Find out who is a Queens Democratic Party County Committee Person</h4>' +
        (props ? '<b>' + 'Election District' + ' ' + props.ElectDist +
        '</b><br/>' + 'Female Person' + ' ' + props.QnsCountyCommitteeList_F_Name
        : 'Hover over an Electrion District to see who is the female County Committee person');
};

femaleinfo.addTo(mymap);

$('.femaleinfo').hide()

// creating a function that highlights each ED when it's hovered over
function femalehighlightFeature(f) {
    var F_Status_Layer = f.target;

    // the custom control that was made above is updated
    femaleinfo.update(F_Status_Layer.feature.properties);

    F_Status_Layer.setStyle({
        weight: 2,
        color: '#666',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        F_Status_Layer.bringToFront();
    }
}

// creating a function that resets the map when user hovers out
function femaleresetHighlight(f) {
    F_Status_Layer.resetStyle(f.target);

    // updating custom control based on mouseout
    femaleinfo.update();
}

// creating zoom on election district click
function femalezoomToFeature(f) {
    mymap.fitBounds(f.target.getBounds());
}

// creating a function that groups together the all hover events and the zoom funciton that was created
function femaleonEachFeature(feature, F_Status_Layer) {
    F_Status_Layer.on({
        mouseover: femalehighlightFeature,
        mouseout: femaleresetHighlight,
        click: femalezoomToFeature
    });
}

// creating a function that styles election districts by whether each ed is full, partially vacant, or fully vacant
var ElectionDistrictLayer = L.geoJson(QueensCC, {
  style: function(feature) {
    var fillColor = feature.properties.QnsCountyCommitteeList_Seat_Description;

    switch(fillColor)
    {
      case "Full":
        fillColor = "#94ff7c";
        break;
      case "1 Vacancy":
        fillColor = "#ffff20";
        break;
      case "Fully Vacant":
        fillColor = "#ff2020";
        break;
      default:
        fillColor = "Black";
        break;
    }
    return {color: "blue", weight: 0, fillColor: fillColor, fillOpacity: .6};
    },
    onEachFeature: onEachFeature
}).addTo(mymap);

$("#mflegend").hide()

// creating a div control that contains county committee person names
var edinfo = L.control();

edinfo.onAdd = function () {
    this._div = L.DomUtil.create('div', 'edinfo');
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
edinfo.update = function (props) {
    this._div.innerHTML = '<h4>Find out who is a Queens Democratic Party County Committee Person</h4>' +
        (props ? '<b>' + 'Election District' + ' ' + props.ElectDist +
        '</b><br/>' + 'Female Person' + ' ' + props.QnsCountyCommitteeList_F_Name +
        '</b><br/>' + 'Male Person' + ' ' + props.QnsCountyCommitteeList_M_Name
        : 'Hover over an Electrion District to see who is on County Committee');
};

edinfo.addTo(mymap);

// creating a function that highlights each ED when it's hovered over
function highlightFeature(e) {
    var ElectionDistrictLayer = e.target;

    // the custom control that was made above is updated
    edinfo.update(ElectionDistrictLayer.feature.properties);

    ElectionDistrictLayer.setStyle({
        weight: 2,
        color: '#666',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        ElectionDistrictLayer.bringToFront();
    }
}

// creating a function that resets the map when user hovers out
function resetHighlight(e) {
    ElectionDistrictLayer.resetStyle(e.target);

    // updating custom control based on mouseout
    edinfo.update();
}

// creating zoom on election district click
function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
}

// creating a function that groups together the all hover events and the zoom funciton that was created
function onEachFeature(feature, ElectionDistrictLayer) {
    ElectionDistrictLayer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

// establishing the assembly district overlay
var QueensAssemblyDistricts = L.geoJSON(AssemblyDistricts, {
  style: assemblystyle
}).bindPopup('Poutses').addTo(mymap);

// grouping together all the layers intended to be baselayers
var baselayers = {
  "Election District Layer": ElectionDistrictLayer,
  "Female Petitioned or Appointed Layer": F_Status_Layer,
  "Male Petitioned or Appointed Layer": M_Status_Layer,
};

// grouping together all the layers intended to be overlays
var overlays = {
  "Assembly District Layer": QueensAssemblyDistricts
};

function assemblystyle() {
  return {
    fillColor: "none",
    color: "#2b2e5e",
    weight: 2,
  };
}

// adding baselayers and overlays to mymap
L.control.layers(baselayers, overlays).addTo(mymap);

// creating a function which shows and hide info divs created above based on baselayer selection
mymap.on('baselayerchange', function(eventLayer) {
  if (eventLayer.name === 'Election District Layer'){
  $('.edinfo').show()
  }
  if (eventLayer.name === 'Election District Layer'){
  $('.femaleinfo').hide()
  }
  if (eventLayer.name === 'Election District Layer'){
  $('.maleinfo').hide()
  }
  if (eventLayer.name === 'Election District Layer'){
  $("#electiondistrictlegend").show()
  }
  if (eventLayer.name === 'Election District Layer'){
  $("#mflegend").hide()
  }
  if (eventLayer.name === 'Female Petitioned or Appointed Layer'){
  $('.femaleinfo').show()
  }
  if (eventLayer.name === 'Female Petitioned or Appointed Layer'){
  $('.edinfo').hide()
  }
  if (eventLayer.name === 'Female Petitioned or Appointed Layer'){
  $('.maleinfo').hide()
  }
  if (eventLayer.name === 'Female Petitioned or Appointed Layer'){
  $("#mflegend").show()
  }
  if (eventLayer.name === 'Female Petitioned or Appointed Layer'){
  $("#electiondistrictlegend").hide()
  }
  if (eventLayer.name === 'Male Petitioned or Appointed Layer'){
  $('.maleinfo').show()
  }
  if (eventLayer.name === 'Male Petitioned or Appointed Layer'){
  $('.edinfo').hide()
  }
  if (eventLayer.name === 'Male Petitioned or Appointed Layer'){
  $('.femaleinfo').hide()
  }
  if (eventLayer.name === 'Male Petitioned or Appointed Layer'){
  $("#mflegend").show()
  }
  if (eventLayer.name === 'Male Petitioned or Appointed Layer'){
  $("#electiondistrictlegend").hide()
  }
});
