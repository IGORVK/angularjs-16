//Изолированный скоуп в директиве гарантирует что вы не поменяете случайно значения в контроллере. 
//В этом уроке мы разберем как изолированная директива может взаимодействовать с контроллером.
//Изолированный scope хорош когда мы создаем директивы которые мы будем повторно использовать много раз
// создадим как обычно ng-controller внутри него создадим директиву fooBar
// <div ng-controller = 'firstCtrl'>
    // <foo-bar></foo-bar>
// </div>

//Опишем контроллер заиджектим $scope и опишем директиву
// app.controller('firstCtrl', function($scope){
           // console.log('$scope Ctrl', $scope);
//         
// });
// 
// app.directive('fooBar', function(){
    // return {
        // link : function(scope, element, attrs){
            // console.log('scope fooBar', scope);
        // }
    // };
// });

// посмотрим в консоли браузера все работает записи и консоли мы видим

// теперь давайте запишем в firstCtrl переменную name
 //$scope.name = 'HI';
 // теперь в шаблоне выведем её контроллере html Файла
 //<div>my ctrl name is {{{name}}}</div>
 
 // внутри директивы опишем шабон
 // template : "<div>My name is {{name}} </div>"
 // и отделим директиву от контроллера чтобы было видно
 // так как у нас Scope по умолчанию стоит в false а значит у нас сразу доступен scope контроллера
 // давайте попробуем добавить scope как объект
 // как только мы добавили скоуп как объект для директивы. Это значит что мы создали ИЗОЛИРОВАННЫЙ СКОУП
          // scope: {
      // name: '@',
      // color: '=',
      // reverse: '&'
    // },

// ТЕПЕРЬ ПЕРЕМЕННАЯ HARRY НАМ УЖЕ НЕ ДОСТУПНА!!!!! ЭТО ВИДНО В БРАУЗЕРЕ 
//ВО ВТОРОЙ СТРОКЕ My name is ИМЯ HARRY УЖЕ НЕ ВЫВОДИТСЯ

// ЭТОТ        // scope: {
      // name: '@',
      // color: '=',
      // reverse: '&'
    // }, ПОЛНОСТЬЮ ИЗОЛИРОВАННЫЙ В НЕМ НЕТ ПРОТОТИПНОГО НАСЛЕДОВАНИЯ НАШЕГО 
    //КОНТРОЛЛЕРА И ЛЮБЫЕ ПЕРЕМЕННЫЕ КОТОРЫЕ МЫ В НЕМ БУДЕМ ОБЪЯВЛЯТЬ БУДУТ НЕДОСТУПНЫ
    // это очень хорошо с одной стороны поскольку мы никогда не изменим контроллер
   // но с другой строны как же нам общаться с контроллером
   // Есть несколько вариантов
   //****** ПЕРВЫЙ ВАРИАНТ с помощью  знака собачки @ напишем name: '@',
   // Что это дает?
   // в переменную name после этого мы ожидаем получить read only т.е. она будет доступна у нас только для чтения
   // для того чтобы эта переменная  у нас заработала нам нужно передать в директиву  fooBar атрибут name="{{name}}"
   //    <foo-bar name="{{name}}"></foo-bar>
   // и это будет переменная name из контроллера доступная только для чтения
   // если теперь мы посмотрим в браузер то увидим что переменная доступна 
   // My name is  HARRY вывелась
   
   // теперь попробуем добавить инпут через шаблон
    //template : "<div>My name is {{name}} <input type='text' ng-model='name'></div>",
    // посмотрим в браузер 
    // мы можем через инпут менять name директивы контроллер же остается без изменений
    //Если же вам нужна переменная в директиве только для чтения из контроллера и мы не собираемся ее менять тогда всегда надо использовать собачку @
    
    //****** ВТОРОЙ ВАРИАНТ это использование знака равно =
    // например возьмём color: '=',
    // Знак равно = означает двухсторонний биндинг между этой переменной в контроллере и директиве
    //Давайте в контроллере запишем  $scope.color = '#333333'; и добавим в контроллер html  <div>My ctrl color is: {{color}}</div>
    // точно также color который мы хотим использовать нам необходимо описать как атрибут color="color" в директиве
    // <foo-bar name="{{name}}" color="color"></foo-bar>
    // как мы видим тут уже двойных фигурных скобок нет. Они используются только при собачке.
    // теперь давайте используем эту переменную у нас в коде
    // смотрим в браузер 
    // унас появилась строка My color is #333333 #333333
    // через инпут мы можем менять значение переменной т.е. используется двусторонний биндинг
    // как только мы меняем переменную в директиве она меняется и выше в контроллере
    // и наоборот если бы мы поменяли ее в контроллере она бы поменялась сразу и в директиве
    
    //Т.е. основное различие такое:
    // @ - переменная доступна только для чтения и двустороннего биндинга нет
    // = - переменная доступна по двухстороннему биндингу и сможем менять её как из контроллера так и из директивы
    
   //****** ТРЕТИЙ ВАРИАНТ - это выполнение выражения из родительского контроллера  - reverse : '&'. 
   //Знак амперсант &  - означает выполнить выражение из родительского контроллера
   // это используется когда нам нужно вызвать какую-то функцию
   // Давайте в firstCtrl напишем функцию reverse которая будет переварачивать слово
    // $scope.reverse = function () {
    // $scope.name = $scope.name.split('')-разбиваем переменную посимвольно.reverse() - переварачиваем набор символов.join('')- склеиваем эти символы обратно в одну строку;
  // };
  // добавляем атрибут в директиву <foo-bar name="{{name}}" color="color" reverse='reverse()'></foo-bar>
// теперь напишем в шаблоне template  кнопку с обработчиком в описанным в контроллере "<button ng-click='reverse()'>Reverse</button>"
//и в html добавим тоже самое <div><button ng-click='reverse()'>Reverse name</button></div>
// и в директиву добавляем  reverse: '&'

//Смотрим что у нас получилось 
//Т.е. когда нам нужно в изолированном скоуп передать функцию только для read only мы используем собачку @
// когда нам нужен двустороний датабиндинг с переменной с контроллера мы используем  = 
// когда нам нужно выполнить какое-то выражение например вызвать функцию
// тогда мы используем знак амперсанд &

    




var app = angular.module('app', []);



app.controller('firstCtrl', function($scope){
           console.log('$scope Ctrl', $scope);
           $scope.name = 'Harry';
           $scope.color = '#333333';
           
           $scope.reverse = function () {
    $scope.name = $scope.name.split('').reverse().join('');
  };
        
});

app.directive('fooBar', function(){
    return {
          scope: {
      name: '@',
      color: '=',
      reverse: '&'
    },
        
       template : "<div>My name is {{name}} <input type='text' ng-model='name'></div>" + "<div>My color is {{color}} <input type='text' ng-model='color'></div>" + "<button ng-click='reverse()'>Reverse</button>",
        link : function(scope, element, attrs){
            console.log('scope fooBar', scope);
        }
    };
});












