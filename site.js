var map = mapbox.map('map'),
layers = document.getElementById('layers'); 
map.addLayer(mapbox.layer().id('ruben.map-jy3krua7').composite(false));
map.addLayer(mapbox.layer().id('ruben.map-qbwgfdgj').composite(false));
     
map.zoom(12).center({ lat: 37.4504, lon: -77.5858 });
map.setZoomRange(3, 15);
map.ui.hash.add();
map.ui.attribution.add()
      .content('<a href="http://mapbox.com/about/maps">Terms &amp; Feedback</a>'); 
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
    $('#virginia').click(function (e){
        map.ease.location({ lat: 38.5608, lon: -78.3018  }).zoom(8).optimal();
        return false;
    });
    $('#colorado').click(function (e){
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