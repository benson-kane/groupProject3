var words = ['Canidae', 'Felidae',, 'Cat', 'Cattle', 'Dog', 'Donkey', 'Goat',
    'Guinea pig', 'Horse', 'Pig', 'Rabbit', 'Sheep', 'Water buffalo',
    'Chicken', 'Duck', 'Goose', 'Pigeon', 'Ape', 'Alligator', 'Ant', 'Whale', 'Jellyfish'];
var alphabet = "abcdefghijklmnopqrstuvwxyz";
angular.module([], [])
    .controller('hangmanController', hangmanController)

function hangmanController($scope) {

    $scope.missesAllowed = 6;
    $scope.hints ='';
    var randomWord = function() {
        var index = Math.floor(Math.random() * words.length);
        $scope.original = words[index];
        return words[index];
    };

    var makeLetters = function(word) {
        return _.map(word.split(''), function(letter) {
            return { name: letter, chosen: false };
        });
    };

    $scope.letters = makeLetters(alphabet);

    $scope.myFunct = function(keyEvent) {
        for (var i= 0; i < $scope.letters.length; i++) {
            if ($scope.letters[i].name == keyEvent.key) {
                guessLetter($scope.letters[i])
                break;
            }
        }
    }
    
    $scope.hint = function() {
        console.log('hint is working');
        var Word = $scope.original;
        console.log('Word: ' + Word);
        console.log(Word);
        if (Word === 'Canidae')     //TODO: make a Word object with members wordText, hintText
            $scope.hints = 'The biological family that includes domestic dogs, wolves, coyotes, foxes, jackals, dingoes, and many other extant and extinct dog-like mammals.';
        if (Word  === 'Felidae')
            $scope.hints = 'Another name of cats';
        if (Word  === 'Cat')
            $scope.hints = 'Another name for Felidae';
        if (Word  === 'Cattle')
            $scope.hints = 'mass noun referring to animals raised in a grazing environment';  
        if (Word  === 'Dog')
            $scope.hints = "Man's best friend";  
        if (Word  === 'Donkey')
            $scope.hints = 'Best Supporting Actor in Shrek';  
        if (Word  === 'Goat')
            $scope.hints = 'Greatest of All Time';  
        if (Word  === 'Guinea Pig')
            $scope.hints = "Tbh I don't really know what this is";
        if (Word  === 'Horse')
            $scope.hints = 'Equestrian';  
        if (Word  === 'Pig')
            $scope.hints = 'Taylor Swift had a baby ___ as a pet';  
        if (Word  === 'Rabbit')
            $scope.hints = 'Probably has really good eyesight';  
        if (Word  === 'Sheep')
            $scope.hints = 'Bahhhh!'; 
        if (Word  === 'Water buffalo')
            $scope.hints = 'Veggie Tales song';  
        if (Word  === 'Chicken')
            $scope.hints = 'Everything tastes like';  
        if (Word  === 'Duck')
            $scope.hints = 'Quack';  
        if (Word  === 'Goose')
            $scope.hints = 'Surprisingly mean bird';  
        if (Word  === 'Pigeon')
            $scope.hints = 'Used to be used to carry letters';  
        if (Word  === 'Ape')
            $scope.hints = 'Almost human';  
        if (Word  === 'Alligator')
            $scope.hints = 'Bites';  
        if (Word  === 'Ant')
            $scope.hints = 'Industrious';  
        if (Word  === 'Whale')
            $scope.hints = 'Really really big ocean thing';  
        if (Word  === 'Jellyfish')
            $scope.hints = 'Stingy floating plastic bag thing';  
            
        console.log('Scope.hints: ' + $scope.hints);
    };
    

    $scope.try = function(guess) {
        guessLetter(guess);
    };
    
    function guessLetter(guess) {
        guess.chosen = true;
        var found = false;
        _.each($scope.secretWord,
            function(letter) {
                if (guess.name.toUpperCase() === letter.name.toUpperCase()) {
                    letter.chosen = true;
                    found = true;
                }
            });
        if (!found) {
            $scope.numMisses++;
        }
        checkForEndOfGame();
    };

    var checkForEndOfGame = function() {
        $scope.win = _.reduce($scope.secretWord, function(acc, letter) {
            return acc && letter.chosen;
        }, true);

        if (!$scope.win && $scope.numMisses >= $scope.missesAllowed) {
            $scope.lost = true;
            revealSecret();
        }
    }

    var revealSecret = function() {
        _.each($scope.secretWord, function(letter) {
            letter.chosen = true;
        });
    };

    $scope.reset = function() {
        _.each($scope.letters, function(letter) {
            letter.chosen = false;
        });
        $scope.secretWord = makeLetters(randomWord());
        $scope.numMisses = 0;
        $scope.win = false;
        $scope.lost = false;
    };

    $scope.reset();

};