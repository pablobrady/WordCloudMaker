
var WordCloudMaker = function(iStr) {
  this.wordCloud = {
    inputString: iStr,
    outputString: "",
    maxCount: 0
  };

  this.inputWordArray = [];
  this.wordObj = {};
}

WordCloudMaker.prototype.resetWordCloudMaker = function() {
  this.wordCloud = {
    inputString: "",
    outputString: "",
    maxCount: 0
  }
  this.inputWordArray = [];
  this.wordObj = {};

}

WordCloudMaker.prototype.buildWordCloud = function ( aString ) {
  if(!aString || aString.length<1) {
    aString = this.wordCloud.inputString;
  }

  this.resetWordCloudMaker();

  var retVal = "";
  var tempStr = aString.replace(/[.,:;(){}\[\]?!]/g, '');
  this.inputWordArray = tempStr.split(' ');

  // Count the word occurences
  this.wordCloud.maxCount = 0;
  this.wordObj = this.countTheWords(this.inputWordArray);


  // Populate the output (reading the workObj this time...)
  for(var element in this.wordObj) {
    var count = this.wordObj[element];
    if(count>6) count=6;
    var hCount = this.wordCloud.maxCount - count + 1;

    // console.log('VALUE ' + element + ' COUNT: ' + count );
    var newWord = '<h' + hCount + ' class=tag>' + element + '</h' + hCount + '> ';
    retVal = retVal.concat( newWord );
  }

  // Set Final Values
  this.wordCloud.outputString = retVal;

  return this.wordCloud.outputString;
};


WordCloudMaker.prototype.countTheWords = function( inputWordArray ) {
  // Only make a word uppercase if it is ALWAYS uppercase in the original string.
  for(var i=0; i<inputWordArray.length; i++){

    var wordA = inputWordArray[i];

    if( this.isUpperCase(wordA) ) {
      if(this.wordObj[ wordA.toLowerCase() ]) {
        wordA = wordA.toLowerCase();
        this.wordObj[ wordA ]++;;
      } else if(this.wordObj[ wordA ]) {
        this.wordObj[wordA]++;
      } else {
        this.wordObj[wordA] = 1; // First (uppercase) word encountered.
      }
    } else {
      // LowerCase WordA
      var wordAfirstUpper = this.toFirstUpperCase( wordA );
      if(this.wordObj[ wordAfirstUpper ]) {
        var cnt = this.wordObj[ wordAfirstUpper ];
        this.wordObj[ wordA ] = cnt + 1;
        delete this.wordObj[ wordAfirstUpper ]; // Delete the old Uppercase counter
      } else if(this.wordObj[ wordA ]) {
        this.wordObj[wordA]++;
      } else {
        this.wordObj[wordA] = 1; // First (lowercase) word encountered.
      }
    }

    this.wordCloud.maxCount = (this.wordObj[wordA] > this.wordCloud.maxCount) ? this.wordObj[wordA] : this.wordCloud.maxCount;
  }

  return this.wordObj;
};

WordCloudMaker.prototype.toFirstUpperCase = function( aWord ) {
  if( !aWord || aWord.length<1 ) return "";

  return aWord[0].toUpperCase() + aWord.substr(1);
};

WordCloudMaker.prototype.isUpperCase = function( aWord ) {
  if( !aWord || aWord.length<1 ) return false;

  if( aWord[0] === aWord[0].toUpperCase() ) return true;

  return false;
};

WordCloudMaker.prototype.getInputWordCount = function() {
  return this.wordCloud.maxCount;
}

WordCloudMaker.prototype.getWordCount = function(aWordKey) {
  // The key is Case-sensitive.
  return this.wordObj[ aWordKey ] ? this.wordObj[ aWordKey ] : 0;
}
