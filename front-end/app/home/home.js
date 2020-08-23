'use strict';

angular.module('myApp.home', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'home/home.html',
      controller: 'HomeCtrl',
      css: 'home/home.css'
    });
  }])

  .controller('HomeCtrl', ['$scope', function ($scope) {


    /**
     * ATTRIBUTES
     */

    var markerList = [];

    $scope.marker = {}


    /**
     * MAP INIT
     */
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([51.5, -0.09]).addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();



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

        $scope.$apply();

      }
      map.on('click', onMapClick);

      $('.toast').toast('show');


    }



    $scope.saveMarker = function () {

      $('#myModal').modal('hide');

      var dynamicMarker = L.ExtraMarkers.icon({
        icon: 'none',
        markerColor: this.marker.color,
        svg: true,
      });
  

      L.marker([this.marker.lat, this.marker.lng], { icon: dynamicMarker}).addTo(map).bindPopup(getMarkerDescription(this.marker))


    }



    let getMarkerDescription = function (marker) {

      let description = "<b> " + marker.name + " </b><br>"

      description += marker.attributeList.map((attribute) => { return (attribute.key || "") + ": " + (attribute.value || "") + "<br>" }).join("")

      return description;
    }



    $('.toast').toast('show');





  }]);