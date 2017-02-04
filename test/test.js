
// if and else conditions
// string.prototype.tolowercase
// string.prototype.indexof
// array.prototype.filter


function filterList(searchBox,bubbleTeas){
 if  (!searchBox){
   return bubbleTeas;
 }

 return bubbleTeas.filter(function getMatchTerms(value){
   return value.toLowerCase().indexOf(searchBox) >= 0;
 });
}
// end of filterList

function sayHello(){
  return "hello";
}
function checkIf(age) {
  var ages = age;
  if (ages >= 21 ) {
    return "you passed the legal drinking age";
  }
  else {
    return "you're underaged";
  }
}

function getMatch(str) {
  var terms = str;
  var sentenceArr = ["sophisticated","coffee","cunt" ];
}
QUnit.test("test if-else",function(assert) {
  var legalAge = checkIf(20);
  assert.equal(legalAge,"you're underaged","checking for underaged...");
  legalAge = checkIf(30);
  assert.equal(legalAge,"you passed the legal drinking age","cheking for overaged...");
});
QUnit.test("test toLowerCase",function(assert) {
  var str ="HELLO WORLD".toLowerCase();
  assert.equal(str,"hello world","converting strings to lowercased letters");
  str = "hello world";
  assert.equal(str,"hello world","strings are already lowercased");
});

QUnit.test( "hello test", function(assert) {
  var hello = sayHello();
  assert.equal(hello,"hello","Hello should be returned");
  assert.notEqual(hello,"cat","Hello shouldn't return cat");
});
QUnit.test( "test filterList", function( assert ) {
  var searchBox = "boba";
  var list = ["Boba guys" , "Plentea" , "Tpumps"];
  var search = filterList(searchBox,list);
  assert.deepEqual(search,["Boba guys"],"if boba is searched, only Boba guys returned");
  var actual = filterList("b",list);
  assert.deepEqual(actual,["Boba guys"],"if b is entered , Boba guys returned");
  actual = filterList("",list);
  assert.deepEqual(actual,list,"if nothing's entered the whole list should be returned");
  actual = filterList("tea",list);
  assert.deepEqual(actual,["Plentea"],"if tea is entered , Plentea returned");
  actual = filterList("t",list);
  assert.deepEqual(actual,["Plentea","Tpumps"],"if t is entered , Tpumps and Plenteareturned");
  actual = filterList("pump",list);
  assert.deepEqual(actual,["Tpumps"],"if pump is entered ,Tpumps returned");
  actual = filterList("pumps",list);
  assert.deepEqual(actual,["Tpumps"],"if pump is entered ,Tpumps returned");
});
