

// Model ( stored Data)

var markers = [];
var imageResource;
var places = [
  {title: 'Tea Factory', location: {lat: -20.426329, lng: 57.525659}},
  {title: 'Nature Park', location: {lat: -20.499704, lng: 57.562998}},
  {title: 'Casela World of Adventures', location: {lat: -20.290841, lng: 57.404287}},
  {title: 'Aux Cerf Island', location: {lat: -20.272354, lng: 57.804111}},
  {title: 'Seven Coloured Earth', location: {lat: -20.440271, lng: 57.373708}},
  {title: 'Chamarel Waterfall', location: {lat: -20.443222, lng: 57.385779}},
  {title: 'Blue Bay Marine Park Bodies', location: {lat: -20.444848, lng: 57.709801}}
];


ko.applyBindings(viewModel);

var viewModel ={
  
}

      function initMap(){
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -20.308922, lng: 57.572333},
        zoom: 13
      });



      var largeInfowindow = new google.maps.InfoWindow();
      var bounds = new google.maps.LatLngBounds();

//
      for (var i = 0; i < places.length; i++){
        var position = places[i].location;
        var title = places[i].title;

        // create markers

        var marker = new google.maps.Marker({
          map: map,
          position: position,
          title: title,
          animation: google.maps.Animation.DROP,
          id: i
        });

        markers.push(marker);
        marker.addListener('click', function() {
          populateInfoWindow(this, largeInfowindow);
        });
        bounds.extend(markers[i].position);
      }
        map.fitBounds(bounds);
      }//end initMap()


    function populateInfoWindow(marker, infowindow) {
      // Check to make sure the infowindow is not already opened on this marker.
      if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.width
        infowindow.open(map, marker);
        infowindow.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){ marker.setAnimation(null); }, 750);

        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick',function(){
          infowindow.setMarker = null;

        });
      }
    }

  var accessToken= "390243344.ea87cab.bf439d7abd714d4492b429e38b17ef71";
  var instaUrl = "https://api.instagram.com/v1/media/search?lat="+48.858844+"&lng="+2.294351+"&access_token="+accessToken+
  "&count=1";


  // function getInstagramImages(){
  //
  //   for (var i = 0; i < 7; i++){
  //
  //
  //   }
  //
  //
  //
  //
  //
  // }


  $.ajax({

    'url': instaUrl,
    'type': "GET",
    'dataType': "jsonp",
    success: function(response){
      console.log(response);

    }

  });//end ajax
