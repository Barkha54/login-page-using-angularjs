//
// app.factory('loginFactory', function($http) {
//     var loggedIn = false;
//     var toState;
//
//     return {
//         isLoggedIn: function() {
//             return loggedIn;
//         },
//
//         setToState: function(state) {
//             toState = state;
//         },
//
//         // callAuthService: function($location, $scope) {
//         //     var formData = 'username=' + $scope.user.username + '&password=' + $scope.user.password;
//         //     var response = $http({
//         //         method: 'POST',
//         //         url: 'http://...:8080/loginservlet/public/auth',
//         //         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//         //         data: formData})
//         //
//         //     .success(function (data, status, headers, config) {
//         //         loggedIn = true;
//         //
//         //         if (toState) {
//         //             $location.path(toState.url);
//         //             toState = undefined;
//         //         } else
//         //             $location.path('private/welcome');
//         //     })
//         //
//         //     .error(function (data, status, headers, config) {
//         //         loggedIn = false;
//         //     });
//         // }
//     };
// });
