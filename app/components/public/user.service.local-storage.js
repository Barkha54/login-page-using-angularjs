(function () {
    'use strict';

    app.factory('UserService', UserService);

    UserService.$inject = ['$timeout', '$filter', '$q'];
    function UserService($timeout, $filter, $q) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.Add = Add;

        return service;

        function GetAll() {
            var deferred = $q.defer();
            deferred.resolve(getUsers());
            return deferred.promise;
        }

        function GetById(id) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { id: id });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }

        function GetByUsername(username) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { email: username });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }

        function Create(user) {
            var deferred = $q.defer();

            // simulate api call with $timeout
            $timeout(function () {
                GetByUsername(user.email)
                    .then(function (duplicateUser) {
                        if (duplicateUser !== null) {
                            deferred.resolve({ success: false, message: 'Username "' + user.email + '" is already taken' });
                        } else {
                            var users = getUsers();
                            user.notes = [
                                {done: true,
                                task: 'Do nothing',
                                id : 1
                              },
                                {
                                  done: false,
                                  task: 'Show some tasks',
                                  id: 2
                                },
                                {
                                  done: false,
                                  task: 'Add a task',
                                  id : 3
                                },
                                {
                                done: false,
                                task: 'Walk the dog',
                                id:4
                              }
                          ];

                            // assign id
                            var lastUser = users[users.length - 1] || { id: 0 };
                            user.id = lastUser.id + 1;
                            console.log(user);
                            // save to local storage
                            users.push(user);
                            setUsers(users);

                            deferred.resolve({ success: true });
                        }
                    });
            }, 1000);

            return deferred.promise;
        }

        function Update(user) {
            var deferred = $q.defer();

            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                if (users[i].id === user.id) {
                    users[i] = user;
                    break;
                }
            }
            setUsers(users);
            deferred.resolve();

            return deferred.promise;
        }

        function Delete(UserId, noteId) {
            var deferred = $q.defer();

            var users = getUsers();

                var user = users[UserId-1];
                console.log(user);
                if (user['notes'][noteId] === noteId) {
                    //users.splice(i, 1);
                    var userNotes = user['notes'];
                    //users.splice(user['notes'][noteId-1], 1);
                    //users.pop(user['notes'][noteId]);
                    users[UserId-1].notes.splice({
                        id : noteId
                    }, 1)
                }

            setUsers(users);
            deferred.resolve();

            return deferred.promise;
        }

        function Add(id, data) {
            var deferred = $q.defer();
            var users = getUsers();
            users[id-1].notes.push({
                task : data,
                done : false,
                id: users[id-1].notes.length+1
            });
            setUsers(users);
            deferred.resolve();

            return deferred.promise;
        }

        // private functions

        function getUsers() {
            if(!localStorage.users){
                localStorage.users = JSON.stringify([]);
            }

            return JSON.parse(localStorage.users);
        }

        function setUsers(users) {
            localStorage.users = JSON.stringify(users);
        }

    }
})();
