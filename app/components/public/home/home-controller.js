(function () {
    'use strict';


    app.controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope'];
    function HomeController(UserService, $rootScope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.addTask = addTask;
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            loadCurrentUser();
            //loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function addTask(id, task) {
            UserService.Add(id, task)
            .then(function() {
                loadCurrentUser();
            })

        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function (user) {
                //vm.user = user;
                loadCurrentUser();
            });
        }
    }

})();
