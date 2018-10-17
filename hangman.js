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

    $scope.hint = function() {
        console.log('hint is working');
        Word = $scope.original;
        console.log(Word);
        if (Word === 'Canidae')
            $scope.hints = 'The biological family that includes domestic dogs, wolves, coyotes, foxes, jackals, dingoes, and many other extant and extinct dog-like mammals.';
        if (Word  === 'Felidae')
            $scope.hints = 'Another name of cats';
    };
    console.log($scope.hints);

    $scope.try = function(guess) {
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

        if (!$scope.win && $scope.numMisses === $scope.missesAllowed) {
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