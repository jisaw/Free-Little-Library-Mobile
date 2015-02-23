var app = angular.module('APP', ['ngRoute', 'uiGmapgoogle-maps']);
	app.
	config(['$routeProvider', function($routeProvider){
		$routeProvider.
		when('/', {
			templateUrl: 'views/home.html',
			controller: "indexCont"
		}).
		when('/map', {
			templateUrl: 'views/map.html',
			controller: 'mapCont'
		}).
		when('/list', {
			templateUrl: 'views/list.html',
			controller: 'listCont'
		}).
		when('/about', {
			templateUrl: 'views/about.html',
			controller: 'aboutCont'
		}).
		when('/library/:id', {
			templateUrl: 'views/library.html',
			controller: 'libraryCont'
		}).
		otherwise({
			redirectTo: '/'
		});
	}]);


	app.controller('mainCont', function($scope, $http) {
		$http.get('libLocations.js', {cache:true}).success(function(data) {
			$scope.locations = data;
		})
		$scope.botNavClick = function(id) {
			document.getElementById(id).className = "tab-item active";
			for (i=0; i< $scope.botBtns.length;i++){
				if ($scope.botBtns[i] != id) {
					document.getElementById($scope.botBtns[i]).className = "tab-item";
				}
			}
		}
	})


	app.controller('indexCont', function($scope) {
		$scope.title = 'Home Page';
	})

	app.controller('mapCont', function($scope, $http) {
		$scope.title = 'Map';
		$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
	})

	app.controller('listCont', function($scope, $http) {
		$scope.title = 'List of Little Free Libs';
		$scope.currentPage = 0;
		$scope.pageSize = 20;

		$scope.numberOfPages = function() {
			return Math.floor($scope.locations.length/$scope.pagesize);
		};

	})
	app.controller('aboutCont', function($scope) {
		$scope.title = 'About';
	})

	app.controller('libraryCont', function($scope) {

	})

	app.filter('startFrom', function() {
		return function(input, start) {
			start = +start;
			return input.slice(start);
		};
	})