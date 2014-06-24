var scotchTodo = angular.module('scotchTodo', []);  //We create our Angular module 'scotchTodo'

function mainController($scope, $http) {            //We create our controller 'mainController'
    $scope.formData = {};

    $http.get('/api/todos')                         //When landing on a page, get all the todos and show them
        .success(function(data){
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data){
            console.log('Error: '+data);
        });

    $scope.createTodo = function() {                //When submitting the add form, send the text to the node API
        $http.post('/api/todos', $scope.formData)
            .success(function(data){
                $scope.formData = {}                //clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data){
                console.log('Error: '+data);
            });
    }

    $scope.deleteTodo = function(id) {              //Delete a to-do after checking it
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data){
                console.log('Error: '+data);
            });
    };
}