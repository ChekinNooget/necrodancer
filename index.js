import data from "./tabs.json" with { type: "json" };
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
  onTabClick("Main") //on page load go to main
}, 50);

window.onTabClick = onTabClick;
function onTabClick(name) {
  selected = name;
  console.log("");
  //console.log("current path", currentPath);
  //console.log("selected", selected);
  if (getRecursive(currentPath.concat(selected)) != false) {
    currentPath = currentPath.concat(selected);
  } else if (getRecursive(currentPath.concat(selected)).length == 0) {
    currentPath = currentPath.concat(selected);
  } else {
    currentPath = [selected];
    var tempFind = selected
    while (true) {
        var tempFound = false
        for (const a of document.querySelectorAll(".tab_item")) {
          if (a.textContent == tempFind) {
            tempFound = true
            console.log(`.tab_group_${a.parentElement.className.split("tab_group_")[1].split(" ")[0]}`)

            if (a.parentElement.className.split("tab_group_")[1].split(" ")[0] == 0){
                tempFound = false
                break
            }

            tempFind = document.querySelector(`.tab_group_${a.parentElement.className.split("tab_group_")[1].split(" ")[0]-1}`).querySelector(".was_selected").textContent
            
            console.log(tempFind)
            
            currentPath.unshift(tempFind)
            break;
          }
        }
        if (!tempFound){
            console.log("tempfind", tempFind)
            break
        }
    }
    console.log("currentpath", currentPath)
  }
  //console.log("get recursive", getRecursive(currentPath.concat(selected)));
 // console.log("get recursive no concat", getRecursive(currentPath));

  //kil lme now
  //ugh

  //console.log(selected);
  var allTabsWrapper = document.querySelector(".top_tabs");
  var mainContent = document.querySelector(".main_content_wrapper");
  var groupIndex = currentPath.length + 1; //how many rows of things there should be
  var temp = "";

  for (let i = 0; i < getRecursive(currentPath).length; i++) {
    var tempTabName = getRecursive(currentPath)[i];
    temp += `<div class="tab_item" onClick="onTabClick('${tempTabName}')">${tempTabName}</div>`;
  }
  if (!document.querySelector(`.tab_group_${groupIndex}`)) {
    var newTabGroup = `<div class="tab_group_${groupIndex} tab_group">${temp}</div>`;
  }
  allTabsWrapper.innerHTML = allTabsWrapper.innerHTML + newTabGroup;

  //newf stuff

  allTabsWrapper.innerHTML = "";
  for (let i = 0; i < currentPath.length + 1; i++) {
    temp = "";
    for (let j = 0; j < getRecursive(currentPath.slice(0, i)).length; j++) {
      var tempTabName = getRecursive(currentPath.slice(0, i))[j];
      temp += `<div class="tab_item" onClick="onTabClick('${tempTabName}')">${tempTabName}</div>`;
    }

    var newTabGroup = `<div class="tab_group_${i} tab_group">${temp}</div>`;
    allTabsWrapper.innerHTML = allTabsWrapper.innerHTML + newTabGroup;
  }

  for (const a of document.querySelectorAll(".tab_item")) {
    if (a.textContent == selected) {
      a.classList.add("selected");
    }
    if (currentPath.includes(a.textContent)) {
      a.classList.add("was_selected");
    }
  }
  //console.log(document.querySelector(`.${selected}`).classList)
  //document.querySelector(`.${selected}`).classList.add("selected")

  //sets the page to the html file
  console.log(currentPath.slice(0, currentPath.length).join("/"));
  mainContent.innerHTML = `<iframe class="tab_page" type="text/html" src="./pages/${currentPath.join("/")}.html"></iframe>`;
}

function getRecursive(path) {
  var tempString = "";
  for (let i = 0; i < path.length; i++) {
    tempString = tempString + `['${path[i]}']`;
  }
  //console.log(eval(`data${tempString}`))
  //console.log(eval(`Object.keys(data${tempString})`));
  try {
    if (eval(`data${tempString}`)) {
    }
    eval(`Object.keys(data${tempString})`);
    return eval(`Object.keys(data${tempString})`);
  } catch (err) {
    return false;
  }
}
