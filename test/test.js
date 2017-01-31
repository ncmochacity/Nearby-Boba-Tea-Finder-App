
// if and else conditions
// string.prototype.tolowercase
// string.prototype.indexof
// array.prototype.filter


function filterList(searchBox,bubbleTeas){
 if  (searchBox === ""){
   return bubbleTeas;
 }

 function getMatchTerms(value,index,array){
   if(value.toLowerCase().indexOf(searchBox) >= 0){
     return true;
  }
  else{
    return false;
  }
 }
 var result = bubbleTeas.filter(getMatchTerms);
 // end of getResult function
  return result;

}
// end of filterList

function sayHello(){
  return "hello";
}

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
