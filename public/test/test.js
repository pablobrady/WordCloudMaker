var expect = chai.expect;
var should = chai.should();



describe('Build a testable WordCloudMaker Class (PsuedoClassical)', function() {


  // Test isUpperCase() Tester. 
  var testV1 = new WordCloudMaker('apple apple apple');

  it('"Apple" is uppercase.', function() {
    expect(true).to.equal(testV1.isUpperCase('Apple'));
  })

  it('"apple" is NOT uppercase.', function() {
    expect(false).to.equal(testV1.isUpperCase('apple'));
  })

  it('"APPLE" is uppercase.', function() {
    expect(true).to.equal(testV1.isUpperCase('APPLE'));
  })


  // Test logic results - Set 1
  var testLogicV1 = new WordCloudMaker('apple apple apple');
  var testLogicOutV1 = testLogicV1.buildWordCloud();
  var testLogicMaxCountV1 = testLogicV1.getInputWordCount();

  it('Three words ("apple apple apple") detected in input string.', function() {
    expect(3).to.equal(testLogicMaxCountV1);
  })

  it('Counted 3 "apple" strings.', function() {
    expect(3).to.equal(testLogicV1.getWordCount('apple'));
  })

  it('Counted 0 "Apple" strings.', function() {
    expect(0).to.equal(testLogicV1.getWordCount('Apple'));
  })


  // Test logic results - Set 2
  var testLogicV2 = new WordCloudMaker();
  var discard = testLogicV2.buildWordCloud('Banana Banana Banana Banana');

  it('Counted 4 "Banana" strings.', function() {
    expect(4).to.equal(testLogicV2.getWordCount('Banana'));
  })

  it('Counted 0 "banana" strings.', function() {
    expect(0).to.equal(testLogicV2.getWordCount('banana'));
  })


  // Test logic results - Set 3
  it('Counted 2 "cantelope" strings.', function() {
    discard = testLogicV2.buildWordCloud('Cantelope cantelope');
    expect(2).to.equal(testLogicV2.getWordCount('cantelope'));
  })

  it('Counted 0 "Cantelope" strings.', function() {
    discard = testLogicV2.buildWordCloud('Cantelope cantelope');
    expect(0).to.equal(testLogicV2.getWordCount('Cantelope'));
  })


  // Test logic results - Set 3
  it('Counted 3 "elderberry" strings.', function() {
    discard = testLogicV2.buildWordCloud('elderberry Elderberry elderberry');
    expect(3).to.equal(testLogicV2.getWordCount('elderberry'));
  })

  it('Counted 0 "Elderberry" strings.', function() {
    discard = testLogicV2.buildWordCloud('elderberry Elderberry elderberry');
    expect(0).to.equal(testLogicV2.getWordCount('Elderberry'));
  })


  // Test logic results - Set 4
  it('Counted 6 "fig" strings.', function() {
    discard = testLogicV2.buildWordCloud('fig FIG Fig fig FIG Fig');
    expect(6).to.equal(testLogicV2.getWordCount('fig'));
  })

  it('Counted 0 "Fig" strings.', function() {
    discard = testLogicV2.buildWordCloud('fig FIG Fig fig FIG Fig');
    expect(0).to.equal(testLogicV2.getWordCount('Fig'));
  })

  it('Counted 0 "FIG" strings.', function() {
    discard = testLogicV2.buildWordCloud('fig FIG Fig fig FIG Fig');
    expect(0).to.equal(testLogicV2.getWordCount('FIG'));
  })

});

