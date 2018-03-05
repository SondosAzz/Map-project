

// Model ( stored Data)

var markers = [];
var imageResource, position;
var places = [
  {title: "Murr's Volcano", location: {lat: -20.315, lng: 57.505}},
  {title: 'Port Louis', location: {lat: -20.166667, lng: 57.516667}},
  {title: 'Casela World of Adventures', location: {lat: -20.290841, lng: 57.404287}},
  {title: 'Curepipe', location: {lat: -20.318775, lng: 57.526294}},
  {title: 'Seven Coloured Earth', location: {lat: -20.440271, lng: 57.373708}},
  {title: 'Chamarel', location: {lat: -20.443222, lng: 57.385779}},

];


      function initMap(){
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -20.318775, lng: 57.526294},
        zoom: 14
      });



      var largeInfowindow = new google.maps.InfoWindow();
      var bounds = new google.maps.LatLngBounds();

      //
      for (var i = 0; i < places.length; i++){
        position = places[i].location;
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
        ko.applyBindings(new ViewModel());
      }//end initMap()



      function populateInfoWindow(marker, infowindow) {

        var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';
            var timeout = setTimeout(function () {
      alert("failed to load wikipedia page");
    }, 4000);
      $.ajax({
                          url: wikiURL,
                          dataType: "jsonp",
                          success: function (response) {
                           var articleList = response[3];
                           var about = response[2][0];
                           var articleName = response[0];
                           console.log(response);

        if (infowindow.marker != marker)
        {
          infowindow.marker = marker;
          infowindow.open(map, marker);
          infowindow.addListener('closeclick', function(){
              infowindow.setMarker(null);
            });
            infowindow.setContent('<div>' + marker.title + '</br>' + about +
             ' check Wiki Page: <a class="text-danger" href ="' + articleList + '">' +
              articleName + ' </div>');

              // marker animation

              infowindow.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){ marker.setAnimation(null); }, 750);

             clearTimeout(timeout);
          }
        }
        });
      }// end populate

      //View Model

      // using knockout to make a live search
       function ViewModel(){
        var self =this;
        this.filter = ko.observable();

        this.places = ko.observableArray(places);

        this.visiblePlaces = ko.computed(function(){
             return this.places().filter(function(place){
                 if(!self.filter() || place.title.toLowerCase().indexOf(self.filter().toLowerCase()) !== -1)
                   return place;

             });
         },this);


         self.showMarker = function(place) {
             google.maps.event.trigger(place.marker, 'click');
           };
      }
