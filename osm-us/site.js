var map = mapbox.map('map'),
layers = document.getElementById('layers'); 
/*
var layer_ito = new MM.Layer(new MM.MapProvider(function(coord) {
    var img = parseInt(coord.zoom) +'/'+  parseInt(coord.column) +'/'+ parseInt(coord.row)+ '.png';
    return  "http://tile.openstreetmap.us/osm_tiger_compare/"+img;
  }));*/

var template = 'http://tile.openstreetmap.us/osm_tiger_compare/{Z}/{X}/{Y}.png';
var layer_osm_us = new MM.TemplatedLayer(template);


map.addLayer(mapbox.layer().id('ruben.map-jy3krua7').composite(false));
map.addLayer(layer_osm_us); 

map.zoom(12).center({ lat: 37.4504, lon: -77.5858 });
map.setZoomRange(3, 17);
map.ui.hash.add();
map.ui.attribution.add()
      .content('<a href="http://mapbox.com/about/maps">Satellite imagery provided by MapBox </a> | <a href="http://www.openstreetmap.org">Road data ©OpenStreetMap contributors</a>'); 
map.ui.zoomer.add();
map.ui.zoombox.add();
show();
function show(){
  var l_parent = map.getLayerAt(1).parent,
      handle = document.getElementById('handle'),
      dragging = false;
 
  handle.onmousedown = function() { dragging = true; return false;}
  document.onmouseup = function() { dragging = false; }
  document.onmousemove = function(e) {
      if (!dragging) return;
      setDivide(MM.getMousePoint(e, map).x);
  }
  function setDivide(x) {
      x = Math.max(0, Math.min(x, map.dimensions.x));
      handle.style.left = (x) + 'px';
      l_parent.style.clip = 'rect(3px ' + x + 'px 9999999px 3px)';
  }
  setDivide(700);
};
 
function openIn(editor) {
    if (map.getZoom() < 14){
        alert("zoom in a little so we don't have to load a huge area from the API.");
        return false;
    };
    var mapzoom=map.getZoom();
    var locations =(map.getExtent()+'').split(',');
    if(editor == 'j'){    
    var JOSMurl = "http://127.0.0.1:8111/load_and_zoom?left=" + locations[1] + "&right=" + locations[3] + "&top=" + locations[0] + "&bottom=" + locations[2];
    $.ajax({
        url: JOSMurl,
        complete: function(t) {
            if (t.status!=200) {
              msg("JOSM remote control did not respond ("+t.status+"). Do you have JOSM running?", 2);
            } else {
              setTimeout("j", 4000);
            }
            marcar(locations);
      }
    });  
}else if (editor == 'p') { 
    var PotlatchURL = 'http://www.openstreetmap.org/edit?editor=potlatch2&bbox='+ locations[1] +',' + locations[2] +',' + locations[3] +',' + locations[0];
    window.open(PotlatchURL);
      setTimeout("p", 4000)
   }else if (editor == 'i') { 
    var ideditorURL = 'http://geowiki.com/iD/#layer=Bing&map='+mapzoom +'/'+( parseFloat(locations[1]) + parseFloat(locations[3]))/2+'/'+(parseFloat(locations[2]) +parseFloat(locations[0]))/2 ;
    window.open(ideditorURL);
      setTimeout("i", 4000)
}

}; 

if (map.zoom()>=3 && map.zoom()<4) {
  map.getLayerAt(0).parent.style.opacity = 0.1;}

  else if (map.zoom()>=4 && map.zoom()<5)
{map.getLayerAt(0).parent.style.opacity = 0.2;}

  else if (map.zoom()>=6 && map.zoom()<6)
{map.getLayerAt(0).parent.style.opacity = 0.3;}

else if (map.zoom()>=6 && map.zoom()<7)
{map.getLayerAt(0).parent.style.opacity = 0.3;}

else if (map.zoom()>=7 && map.zoom()<8)
{map.getLayerAt(0).parent.style.opacity = 0.3;}

else if (map.zoom()>=9 && map.zoom()<10)
{map.getLayerAt(0).parent.style.opacity = 0.3;}

else if (map.zoom()>=10 && map.zoom()<11)
{map.getLayerAt(0).parent.style.opacity = 0.4;}

else if (map.zoom()>=11 && map.zoom()<12)
{map.getLayerAt(0).parent.style.opacity = 0.5;}

else if (map.zoom()>=12 && map.zoom()<13)
{map.getLayerAt(0).parent.style.opacity = 0.6;}

else if (map.zoom()>=13 && map.zoom()<14)
{map.getLayerAt(0).parent.style.opacity = 0.7;}

else if (map.zoom()>=14 && map.zoom()<15)
{map.getLayerAt(0).parent.style.opacity = 0.8;}

else if (map.zoom()>=15)
{map.getLayerAt(0).parent.style.opacity = 1;}

map.addCallback("zoomed", function(map, zoomOffset) {
if (map.zoom()>=3 && map.zoom()<4) {
  map.getLayerAt(0).parent.style.opacity = 0.1;}

  else if (map.zoom()>=4 && map.zoom()<5)
{map.getLayerAt(0).parent.style.opacity = 0.2;}

  else if (map.zoom()>=6 && map.zoom()<6)
{map.getLayerAt(0).parent.style.opacity = 0.3;}

else if (map.zoom()>=6 && map.zoom()<7)
{map.getLayerAt(0).parent.style.opacity = 0.3;}

else if (map.zoom()>=7 && map.zoom()<8)
{map.getLayerAt(0).parent.style.opacity = 0.3;}

else if (map.zoom()>=9 && map.zoom()<10)
{map.getLayerAt(0).parent.style.opacity = 0.3;}

else if (map.zoom()>=10 && map.zoom()<11)
{map.getLayerAt(0).parent.style.opacity = 0.4;}

else if (map.zoom()>=11 && map.zoom()<12)
{map.getLayerAt(0).parent.style.opacity = 0.5;}

else if (map.zoom()>=12 && map.zoom()<13)
{map.getLayerAt(0).parent.style.opacity = 0.6;}

else if (map.zoom()>=13 && map.zoom()<14)
{map.getLayerAt(0).parent.style.opacity = 0.7;}

else if (map.zoom()>=14 && map.zoom()<15)
{map.getLayerAt(0).parent.style.opacity = 0.8;}

else if (map.zoom()>=15)
{map.getLayerAt(0).parent.style.opacity = 1;}
});


function marcar(location){

var lat=(parseFloat(location[0])+parseFloat(location[2]))/2;
var lon=(parseFloat(location[1])+parseFloat(location[3]))/2;

var features = [];
var feature = {
      geometry: {
      type: 'Point',
      coordinates: [lon, lat]
      },
      properties: {
          'marker-color': '#000',
          'marker-symbol': 'star-stroked',
          title: 'YOU ARE WORKING HERE'       
       }
  };
//console.log(feature);
  features.push(feature);
  var markerLayer = mapbox.markers.layer().features(features);
  var  interaction = mapbox.markers.interaction(markerLayer);
  map.addLayer(markerLayer);
  map.draw();
};

$(document).ready(function(){
    $('#josm').click(function (e){
    openIn('j');
    });
    $('#potlatch').click(function (e){
    openIn('p');
    });
    $('#ideditor').click(function (e){
    openIn('i');
    });
    $('#virginia').click(function (e){
        $('#colorado').removeClass('active');
        $('#virginia').addClass('active');
        map.ease.location({ lat: 38.000, lon: -78.203  }).zoom(8).optimal();
        return false;
    });
    $('#virginia').click(function (e){
        $('#colorado').removeClass('active');
        $('#virginia').addClass('active');
        map.ease.location({ lat: 38.000, lon: -78.203  }).zoom(8).optimal();
        return false;
    });    
    $('#colorado').click(function (e){
        $('#virginia').removeClass('active');
        $('#colorado').addClass('active');
        map.ease.location({ lat: 39.177, lon: -106.386}).zoom(8).optimal();
        return false;
    });
    $('a[href="#about"]').click(function (e) {
        $('#backdrop').fadeIn(200);
        $('#about, #close').show();
        return false;
    });
    $('#close').click(function (e) {
        $('#backdrop').fadeOut(200);
        $('#about, #close').hide();
        return false;
    });
});   