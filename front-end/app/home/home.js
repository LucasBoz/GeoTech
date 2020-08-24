'use strict';

angular.module('myApp.home', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'home/home.html',
      controller: 'HomeCtrl',
      css: 'home/home.css'
    });
  }])

  .controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {


    /**
     * ATTRIBUTES
     */

    var markerList = [];

    $scope.marker = {}



    /**
     * INIT
     */

    $http.get('http://localhost:8005/api/marker').then(function (response) {
      $scope.markerList = response.data.data;

      $scope.markerList.forEach(marker => {
        showMarkerOnMap(marker);
      });


    }, function (err) {
      console.log(err);
    });


    /**
     * MAP INIT
     */
    var map = L.map('map').setView([-27, -50], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

 


    /**
     * MAP FUNCTIONS
     */



    /**
     * 
     */
    $scope.addMarker = function () {


      function onMapClick(e) {

        $scope.marker = {
          ...e.latlng,
          attributeList: [{}]
        };


        map.off('click', onMapClick);

        $('#myModal').modal('show')

        $('.toast').toast('hide');

        $scope.$apply();

      }
      map.on('click', onMapClick);

      $('.toast').toast('show');


    }



    $scope.saveMarker = function () {

      $('#myModal').modal('hide');
      this.markerList.push( this.marker );
      showMarkerOnMap(this.marker);

    }


    $scope.focusMarker = function (marker) {
      map.setView( [marker.lat, marker.lng] , 12);
    }

    let showMarkerOnMap = function (marker) {
      var dynamicMarker = L.ExtraMarkers.icon({
        icon: 'none',
        markerColor: marker.color,
        svg: true,
      });
      L.marker([marker.lat, marker.lng], { icon: dynamicMarker }).addTo(map).bindPopup(getMarkerDescription(marker))
    }



    let getMarkerDescription = function (marker) {

      let description = "<b> " + marker.name + " </b><br>"

      if (marker.attributeList) description += marker.attributeList.map((attribute) => { return (attribute.key || "") + ": " + (attribute.value || "") + "<br>" }).join("")

      return description;
    }



  }]);