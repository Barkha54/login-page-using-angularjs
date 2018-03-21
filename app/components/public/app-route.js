app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/log-in');

    $stateProvider
        // public pages
        .state('home', {
            url: '/home',
            templateUrl: 'app/components/public/home/home.html',
            controller: 'HomeController',
            controllerAs: 'vm'
        })
        .state('log-in', {
            url: '/log-in',
            templateUrl: 'app/components/public/log-in/logIn.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        })
        .state('sign-up', {
            url: '/sign-up',
            templateUrl: 'app/components/public/sign-up/sign-up.html',
            controller: 'SignupController',
            controllerAs: 'vm'//,
        })
        .state('help-general', {
            url: '/help-general',
            templateUrl: 'app/components/public/help/help-general.html',
            controller: 'HelpController',
            controllerAs: 'vm'
        })
        // .state('help-howItWorks', {
        //     url: '/help-howItWorks',
        //     templateUrl: 'app/components/public/help/help-howItWorks.html'
        // })

        // private pages
        .state('private/welcome', {
            url: '/private/welcome',
            templateUrl: 'app/components/protected/welcome/welcome.html',
            data : { requiresLogin: true }
        });
});

app.run(function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, toState) {
        var isAuthenticationRequired = toState.data && toState.data.requiresLogin;

        if (isAuthenticationRequired == true) {
            //loginFactory.setToState(toState);
            event.preventDefault();
            $state.go('/log-in');
        }
    });
 });
