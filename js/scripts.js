#map {
 position: absolute;
 height: 100%;
 width: 100%;
}

#electiondistrictlegend {
 position: absolute;
 top: 530px;
 right: 10px;
 z-index: 1000;
 padding: 10px;
 font: 18px Arial;
 background: rgba(255,255,255,0.8);
 box-shadow: 0 0 15px rgba(0,0,0,0.2);
 border-radius: 5px;
}

#mflegend {
 position: absolute;
 top: 550px;
 right: 10px;
 z-index: 1000;
 padding: 10px;
 font: 18px Arial;
 background: rgba(255,255,255,0.8);
 box-shadow: 0 0 15px rgba(0,0,0,0.2);
 border-radius: 5px;
}

#statbutton {
 position: absolute;
 top: 130px;
 right: 10px;
 z-index: 1000;
 padding: 5px;
 font: 14px Arial;
 font-weight: bold;
 background: rgba(255,255,255,0.8);
 box-shadow: 0 0 15px rgba(0,0,0,0.2);
 border-radius: 5px;
}

.colorbox {
 height: 10px;
 width: 10px;
 float: left;
 margin: 3px 4px 0 0;
 opacity: .6;
}

.mfcolorbox {
 height: 10px;
 width: 10px;
 float: left;
 margin: 3px 4px 0 0;
 opacity: .6;
}

.edinfo {
   padding: 5px;
   margin: 5px;
   font: 14px/16px Arial, Helvetica, sans-serif;
   background: rgba(255,255,255,0.8);
   box-shadow: 0 0 15px rgba(0,0,0,0.2);
   border-radius: 5px;
}

.edinfo h4 {
   margin: 0 2px 5px 2px;
   color: #777;
}

.femaleinfo {
   padding: 5px;
   margin: 5px;
   font: 14px/16px Arial, Helvetica, sans-serif;
   background: rgba(255,255,255,0.8);
   box-shadow: 0 0 15px rgba(0,0,0,0.2);
   border-radius: 5px;
}

.femaleinfo h4 {
   margin: 0 2px 5px 2px;
   color: #777;
}

.maleinfo {
   padding: 5px;
   margin: 5px;
   font: 14px/16px Arial, Helvetica, sans-serif;
   background: rgba(255,255,255,0.8);
   box-shadow: 0 0 15px rgba(0,0,0,0.2);
   border-radius: 5px;
}

.maleinfo h4 {
   margin: 0 2px 5px 2px;
   color: #777;
}
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
