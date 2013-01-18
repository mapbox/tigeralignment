var map = mapbox.map('map'),
      layers = document.getElementById('layers');
 
  var d = new Date();
 
 map.addLayer(mapbox.layer().id('ruben.map-jy3krua7').composite(false));
 map.addLayer(mapbox.layer().id('ruben.map-lrxoq95j').composite(false));
     
 map.zoom(7).center({ lat: 38.861, lon: -105.875 });
 map.setZoomRange(3, 15);
 map.ui.hash.add();
 map.ui.attribution.add()
      .content('<a href="http://mapbox.com/about/maps">Terms &amp; Feedback</a>'); 
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
      handle.style.left = (x- 40) + 'px';
      l_parent.style.clip = 'rect(0px ' + x + 'px 9999999px 0px)';
  }
  setDivide(700);
};
 
function openIn(editor) {
    if (map.getZoom() < 14){
        alert("zoom in a little so we don't have to load a huge area from the API.");
        return false;
    };
 
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
      }
    });  
}else if (editor == 'p') { 
    var PotlatchURL = 'http://www.openstreetmap.org/edit?editor=potlatch2&bbox='+ locations[1] +',' + locations[2] +',' + locations[3] +',' + locations[0];
    window.open(PotlatchURL);
      setTimeout("p", 4000)
   }
}; 
$(document).ready(function(){
    $('#josm').click(function (e){
    openIn('j');
    });
    $('#potlatch').click(function (e){
    openIn('p');
    });
});   