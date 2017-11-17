var app = angular.module("app", ['ngRoute', 'LocalStorageModule']);
app.config(function($routeProvider){

    $routeProvider.when("/addPrepod", {
        templateUrl:'templates/addPrepod.html',
        controller:'menuOneController'

    })

    $routeProvider.when("/addStudent", {
        templateUrl:'templates/addStudent.html',
        controller:'menuTwoController'

    })

    $routeProvider.otherwise({redirectTo: '/'});
})
var group = [];


app.controller('menuOneController', function($scope,localStorageService){

    document.getElementById("groupsList").innerHTML = localStorageService.get('key');
    $scope.addNewPrepodavatel = function() {

        var groupIndex;
        for (var i = 0; i < group.length; i++)
            if (group[i].getName() === $scope.group)
                groupIndex = i;
        group[groupIndex].setPrepod(new Prepodavatel($scope.prepId,$scope.prepSurname,$scope.prepName));


    }
})

app.controller('menuTwoController', function($scope, localStorageService){
    document.getElementById("groupsList").innerHTML = localStorageService.get('key');
    $scope.addNewStudent = function () {
        var groupIndex;
        for (var i = 0; i < group.length; i++)
            if (group[i].getName() === $scope.group)
                groupIndex = i;
        group[groupIndex].addStudent(new Student( $scope.studSurname, $scope.studName,$scope.studKurs, $scope.studGpa));


 }

})



app.controller('AppCtrl', function ($scope,localStorageService) {

    $scope.addNewGroup=function () {

        group.push(new Group($scope.grupTitle, $scope.grupShifr));
        var options = "";
        for (var i = 0; i < group.length; i++)
            options += "<option value = " + group[i].getName() + " />";
        document.getElementById("groupsList").innerHTML = options;
        localStorageService.set('key',options);
    }

    $scope.information=function () {
        var groupIndex;
        for (var i = 0; i < group.length; i++)
            if (group[i].getName() === $scope.group)
                groupIndex = i;

        $scope.infTitle =  group[groupIndex].getName();
        $scope.infshifr =  group[groupIndex].getShifr();

        var p = group[groupIndex].getPrepod();
         $scope.prepod = p.getSurname() + " " + p.getName();
        var slist = "";
        var students = group[groupIndex].getStudents();
        for (var i = 0; i < students.length; i++)
        {
            var s = students[i];
            slist +=  "Фамилия: "+ s.getSurname() +", " + " Имя:" + s.getName() +", " + "Курс: " + s.getkurs() + " GPA: " + s.getGpa() + "\n";
        }

        $scope.students = slist;





    }
    /*this.getAverageGpa = function()
    {
        var averageGpa = 0.0;
        for (var i = 0; i < students.length; i++)
            averageGpa += Number(students[i].getGpa());
        return (averageGpa / students.length).toFixed(4);
    }
*/

});

function Student( surname, name, kurs, gpa)
{
    var fam = surname;
    var nam = name;
    var course = kurs;
    var gpaa = gpa;

    this.getSurname = function()      {
        return surname; }

    this.getName    = function()      {
        return name; }


    this.getGpa     = function()      {
        return gpa;  }
    this.getkurs    = function()      {
        return kurs; }

}
function Prepodavatel(prepid,surname, name)
{
    this.id = prepid;
    this.surname = surname;
    this.name = name;
    this.getSurname    = function()      { return surname; }
    this.getName       = function()      { return name; }


}

function Group(title, shifr) {
    var title1 = title;
    var shifr1 = shifr;
    var Prepodavatel = null;
    var students = [];
    var studentsCounter = 0;

    this.getName     = function()      {
        return title; }
    this.getShifr     = function()      {
        return shifr; }
    this.getStudents = function()      { return students; }

    this.setPrepod = function(prepod)
    {
        Prepodavatel = prepod;
    }
    this.getPrepod  = function()      {
        return Prepodavatel;
    }
    this.addStudent = function(student)
    {
        students[studentsCounter] = student;
        studentsCounter++;

    }
}

