(function () {
    'use strict';


    app.controller('SignupController', SignupController);

    SignupController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function SignupController(UserService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/log-in');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
