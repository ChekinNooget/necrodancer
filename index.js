import data from "/tabs.json" with { type: "json" };
var selected = "";
var currentPath = []; //path should be ["thing", "next thing"] all the way to where user is selected like data["thing"]

setTimeout(() => {
  //change this away from timeout lol
  var mainTabGroup = document.querySelector(".tab_group_1");
  console.log(Object.values(data));
  var temp = "";
  //this barely works. need to make it recursive and check for list
  for (let i = 0; i < Object.keys(data).length; i++) {
    var tempTabName = Object.keys(data)[i];
    temp += `<div class="tab_item" onClick="onTabClick('${tempTabName}')">${tempTabName}</div>`;
  }
  mainTabGroup.innerHTML = temp;

  //mainContent.innerHTML = "/main.html"
}, 50);

/*fetch('page.html')
  .then(response=> response.text())
  .then(text=> document.getElementById('elementID').innerHTML = text);
*/

window.onTabClick = onTabClick;
function onTabClick(name) {
    selected = name;
  if(getRecursive(currentPath.concat(selected)) != false){
    currentPath = currentPath.concat(selected)
    console.log(currentPath)
  }
  //else if (getRecursive(currentPath) == [""]){
  //  console.log(selected, currentPath)}
   else{
    currentPath = []
    console.log(selected, currentPath)
  }
  //kil lme now
  //ugh

  //console.log(selected);
  var allTabsWrapper = document.querySelector(".top_tabs");
  var mainContent = document.querySelector(".main_content_wrapper");
  var groupIndex = currentPath.length + 1//how many rows of things there should be

  mainContent.innerHTML = `<object type="text/html" data="${selected}.html"></object>`;

  //i hate myself for this (temporary)

  //var mainTabGroup = document.querySelector(".tab_group_2"); //needs to not be hardcoded

  //also do append instead of setting it

  //hhhhhhhh

  //console.log(Object.values(data));
  var temp = "";
  //this barely works. need to make it recursive and check for list
  /*for (let i = 0; i < Object.keys(data[selected]).length; i++) {
        var tempTabName = Object.keys(data[selected])[i]
        temp += `<div class="tab_item" onClick="onTabClick('${tempTabName}')">${tempTabName}</div>`
    }*/
  for (let i = 0; i < getRecursive(currentPath).length; i++) {
    var tempTabName = getRecursive(currentPath)[i];
    temp += `<div class="tab_item" onClick="onTabClick('${tempTabName}')">${tempTabName}</div>`;
  }
  if(!document.querySelector(`.tab_group_${groupIndex}`)){
    var newTabGroup = `<div class="tab_group_${groupIndex} tab_group">${temp}</div>`
  }
  allTabsWrapper.innerHTML = allTabsWrapper.innerHTML + newTabGroup

//newf stuff


  allTabsWrapper.innerHTML = ""
  for (let i = 0; i < currentPath.length + 1; i++) {
    temp = ""
    //console.log(getRecursive(currentPath.slice(0,i)))
    for (let j = 0; j < getRecursive(currentPath.slice(0,i)).length; j++) {
      var tempTabName = getRecursive(currentPath.slice(0,i))[j];
      temp += `<div class="tab_item" onClick="onTabClick('${tempTabName}')">${tempTabName}</div>`;
    }

      var newTabGroup = `<div class="tab_group_${i} tab_group">${temp}</div>`
      allTabsWrapper.innerHTML = allTabsWrapper.innerHTML + newTabGroup
  }
}

function getRecursive(path) {
  var tempString = "";
  for (let i = 0; i < path.length; i++) {
    tempString = tempString + `['${path[i]}']`;
  }
    //console.log(eval(`data${tempString}`))
    //console.log(eval(`Object.keys(data${tempString})`));
  try {
    if(eval(`data${tempString}`)){
        
    }
    eval(`Object.keys(data${tempString})`)
    return eval(`Object.keys(data${tempString})`);
  } catch(err){
    return false
  }
}
