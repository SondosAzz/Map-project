// Model ( stored Data)
var markers = [];
var imageResource, position;
var places = [{
        title: "Black River Gorges National Park",
        location: {
            lat: -20.416667,
            lng: 57.416667
        }
    },
    {
        title: 'Port Louis',
        location: {
            lat: -20.166667,
            lng: 57.516667
        }
    },
    {
        title: 'Blue Penny Museum',
        location: {
            lat: -20.1609,
            lng: 57.4975
        }
    },
    {
        title: 'Curepipe',
        location: {
            lat: -20.318775,
            lng: 57.526294
        }
    },
    {
        title: 'Seven Coloured Earth',
        location: {
            lat: -20.440271,
            lng: 57.373708
        }
    },
    {
        title: 'Chamarel',
        location: {
            lat: -20.443222,
            lng: 57.385779
        }
    },

];



function initMap() {

    var map = new google.maps.Map(document
        .getElementById('map'), {
            center: {
                lat: -20.318775,
                lng: 57.526294
            },
            zoom: 16
        });

    var largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    function callback() {
      return function() {
        populateInfoWindow(this,largeInfowindow);
      }
    }
    for (var i = 0; i < places.length; i++) {
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
        places[i].marker = marker; // 1
        marker.addListener('click',callback());
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
    ko.applyBindings(new ViewModel());
} //end initMap()

function populateInfoWindow(marker,
    infowindow) {

    var wikiURL =
        'https://en.wikipedia.org/w/api.php?action=opensearch&search=' +
        marker.title +
        '&format=json&callback=wikiCallback';
    var timeout = setTimeout(function() {
        alert(
            "failed to load wikipedia page");
    }, 4000);
    $.ajax({
        url: wikiURL,
        dataType: "jsonp",
        success: function(response) {
            var articleList = response[3];
            var about = response[2][0];
            var articleName = response[0];
            console.log(response);

            if (infowindow.marker != marker) {
                infowindow.marker = marker;
                infowindow.open(map, marker);
                infowindow.addListener(
                    'closeclick',
                    function() {
                        infowindow.setMarker(null);
                    });
                infowindow.setContent('<div>' +
                    marker.title + '</br>' + about +
                    ' Wiki Page: <a class="text-danger" href ="' +
                    articleList + '">' +
                    articleName + ' </div>');

                // marker animation

                infowindow.marker.setAnimation(
                    google.maps.Animation.BOUNCE);
                setTimeout(function() {
                    marker.setAnimation(null);
                }, 750);

                clearTimeout(timeout);
            }
        }
    });
} // end populate

//View Model +knockout
function ViewModel() {
    var self = this;
    this.filter = ko.observable();

    this.places = ko.observableArray(
        places);

    this.visiblePlaces = ko.computed(
        function() {
            return this.places().filter(
                function(place) {
                    if (!self.filter() || place.title
                        .toLowerCase().indexOf(self.filter()
                            .toLowerCase()) !== -1) {
                        place.marker.setVisible(true);
                        return place;
                    } else {
                        place.marker.setVisible(false);
                    }

                });
        }, this);

    self.showMarker = function(place) {
        google.maps.event.trigger(place.marker,
            'click');
    };
}
