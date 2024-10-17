import data from "../tabs.json" with { type: "json" };
var selected = "";
var currentPath = []; //path should be ["thing", "next thing"] all the way to where user is selected like data["thing"]

window.addEventListener("load", function () {
  var mainTabGroup = document.querySelector(".tab_group_1");
  //console.log(Object.values(data));
  var temp = "";
  for (let i = 0; i < Object.keys(data).length; i++) {
    var tempTabName = Object.keys(data)[i];
    temp += `<div class="tab_item" onClick="onTabClick('${tempTabName}')">${tempTabName}</div>`;
  }
  mainTabGroup.innerHTML = temp;
  onTabClick("Main"); //on page load go to main. change this to the ?path=awef thing eventually
});

window.onTabClick = onTabClick;
function onTabClick(name) {
  selected = name;
  //console.log("");
  if (getRecursive(currentPath.concat(selected)) != false) {
    currentPath = currentPath.concat(selected);
  } else if (getRecursive(currentPath.concat(selected)).length == 0) {
    currentPath = currentPath.concat(selected);
  } else {
    currentPath = [selected];
    var tempFind = selected;
    while (true) {
      var tempFound = false;
      for (const a of document.querySelectorAll(".tab_item")) {
        if (a.textContent == tempFind) {
          tempFound = true;
          //console.log(`.tab_group_${a.parentElement.className.split("tab_group_")[1].split(" ")[0]}`);

          if (a.parentElement.className.split("tab_group_")[1].split(" ")[0] == 0) {
            tempFound = false;
            break;
          }

          tempFind = document
            .querySelector(`.tab_group_${a.parentElement.className.split("tab_group_")[1].split(" ")[0] - 1}`)
            .querySelector(".was_selected").textContent;

          //console.log(tempFind);

          currentPath.unshift(tempFind);
          break;
        }
      }
      if (!tempFound) {
        //console.log("tempfind", tempFind);
        break;
      }
    }
    //console.log("currentpath", currentPath);
  }

  var allTabsWrapper = document.querySelector(".top_tabs");
  //var groupIndex = currentPath.length + 1; //how many rows of things there should be
  var temp = "";
  var newTabGroup = ""

  /* ?? why do i have this chunk of code here
  for (let i = 0; i < getRecursive(currentPath).length; i++) {
    var tempTabName = getRecursive(currentPath)[i];
    temp += `<div class="tab_item" onClick="onTabClick('${tempTabName}')">${tempTabName}</div>`;
  }
  if (!document.querySelector(`.tab_group_${groupIndex}`)) {
    newTabGroup = `<div class="tab_group_${groupIndex} tab_group">${temp}</div>`;
  }
  allTabsWrapper.innerHTML = allTabsWrapper.innerHTML + newTabGroup;*/

  //new stuff

  allTabsWrapper.innerHTML = "";
  for (let i = 0; i < currentPath.length + 1; i++) {
    //add tabs for user to click
    temp = "";
    for (let j = 0; j < getRecursive(currentPath.slice(0, i)).length; j++) {
      var tempTabName = getRecursive(currentPath.slice(0, i))[j];
      temp += `<div class="tab_item" onClick="onTabClick('${tempTabName}')">${tempTabName}</div>`;
    }

    //add a group of tabs for each "layer" in the json that the user can see
    var newTabGroup = ""
    if (temp != "" || i != currentPath.length){
      newTabGroup = `<div class="tab_group_${i} tab_group">${temp}</div>`;
    }

    allTabsWrapper.innerHTML = allTabsWrapper.innerHTML + newTabGroup;
  }

  //color the tabs if they are selected
  for (const a of document.querySelectorAll(".tab_item")) {
    if (a.textContent == selected) {
      a.classList.add("selected");
    }
    if (currentPath.includes(a.textContent)) {
      a.classList.add("was_selected");
    }
  }

  //this is the part that changes the page to the tab selected
  var mainContentWrapper = document.querySelector(".main_content_wrapper");
  mainContentWrapper.innerHTML = `<include class="main_content" src="./pages/${currentPath.join("/")}.html">Loading...</include>`;
  const includes = document.getElementsByTagName("include");
  [].forEach.call(includes, (i) => {
    let filePath = i.getAttribute("src");
    fetch(filePath).then((file) => {
      file.text().then((content) => {
        i.insertAdjacentHTML("afterend", content);
        i.remove();
      });
    });
  });
}

function getRecursive(path) {
  var tempString = "";
  for (let i = 0; i < path.length; i++) {
    tempString = tempString + `['${path[i]}']`;
  }
  try {
    if (eval(`data${tempString}`)) {
    }
    eval(`Object.keys(data${tempString})`);
    return eval(`Object.keys(data${tempString})`);
  } catch (err) {
    return false;
  }
}
