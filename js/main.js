function startWindowClick() {
  let startWindow = document.getElementById("startWindow");
  let smenuEditWindow = document.getElementById("smenuEditWindow");

  startWindow.animate([
    { opacity: 0 }
  ], {
    duration: 1000,
    fill: "forwards",
    easing: "cubic-bezier(0.075, 0.82, 0.165, 1)"
  });

  smenuEditWindow.style.visibility = "visible";
  smenuEditWindow.animate([
    { top: 0 }
  ], {
    duration: 1000,
    fill: "forwards",
    easing: "cubic-bezier(0.075, 0.82, 0.165, 1)"
  });

  setInterval(() => {
    startWindow.remove();
  }, 800);
}

function smenuWindowTabOnClick() {
  let collection = document.getElementsByClassName("smenuWindowTabWindow");
  for (const element of collection) {
    element.style.display = "none";
  }

  collection = document.getElementsByClassName("smenuWindowTabActive");
  for (const element of collection) {
    element.className = "smenuWindowTab";
  }
  this.className = "smenuWindowTabActive"
  this.ldiv.style.display = "block";
}

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter++;
  }
  return result;
}

function smenuCreateNewMenu(name, ext, key) {
  if (name == null || name.length <= 0) {
    name = makeid(8);
  }

  let tabDiv = document.createElement("div");
  tabDiv.className = "smenuWindowTabWindow";
  tabDiv.id = name;
  tabDiv.style.display = "none";

  let menuTab = document.createElement("button");
  menuTab.className = "smenuWindowTab";
  menuTab.textContent = name;
  menuTab.id = `${name}Tab`;
  menuTab.ldiv = tabDiv;
  menuTab.onclick = smenuWindowTabOnClick;

  document.getElementById("smenuWindowTabs").append(menuTab)
  document.getElementById("smenuWindowTabsWindow").append(tabDiv)
  document.getElementById("smenuWindowTabs").scrollBy(100000000000, 0);

  let list = document.createElement('ul');
  list.style.padding = "0px";

  let cmdList = document.createElement('ul');
  cmdList.style.paddingLeft = "0";
  menuTab.cmdlist = cmdList

  let commandsList = document.createElement('nav');
  commandsList.style.overflowY = "scroll";
  commandsList.style.scrollbarWidth = "none";
  commandsList.style.height = "88vh";
  commandsList.style.zIndex = 1;
  commandsList.append(cmdList)

  topBar = document.createElement('li')
  topBar.style.paddingTop = "15px";
  topBar.style.paddingBottom = "0px";
  topBar.style.marginLeft = "0px";
  topBar.style.zIndex = 25;

  let menuNameLabel = document.createElement('input')
  menuNameLabel.placeholder = "Menu name...";
  menuNameLabel.style.marginLeft = "-5px";
  menuNameLabel.style.marginRight = "10px";

  menuNameLabel.onchange = (e) => {
    menuTab.textContent = e.target.value.replaceAll(" ", "_");
    menuNameLabel.value = menuTab.textContent;
  }
  menuNameLabel.value = menuTab.textContent.replaceAll(" ", "_");
  menuNameLabel.className = "smenuWindowTextInput"

  topBar.append(menuNameLabel);
  list.appendChild(topBar);

  let keybindButton = document.createElement('input')
  keybindButton.style.marginRight = "15px";
  keybindButton.style.marginLeft = "0px";
  keybindButton.style.width = "fit-content";
  keybindButton.className = "smenuWindowTextInput"
  keybindButton.key = "none"
  if (key != undefined) { keybindButton.key = key; }
  keybindButton.readOnly = true;
  keybindButton.value = keybindButton.key;

  keybindButton.onclick = () => {
    let kb = document.getElementById("KeyboardMenu")
    kb.style.visibility = "visible"

    let items = document.getElementsByClassName("key")

    for (let element of items) {
      let ovk = element.getAttribute("ovkey")
      let key = (ovk ?? (`${element.textContent}`).toLowerCase())
      if (key === keybindButton.key) {
        element.style.color = "rgb(127, 255, 212, 1)";
      } else {
        element.style.color = "rgb(202, 202, 202)";
      }
    }

    /**
     * @param {MouseEvent} ev The date
     */
    let click = (ev) => {
      if (kb.style.visibility === "visible" && (["key", "keyDisabled", "keyboardRow", "keyboard"].includes(ev.target.className))) {
        if (ev.target.className === "key") {
          let ovk = ev.target.getAttribute("ovkey")
          keybindButton.key = (ovk ?? (`${ev.target.textContent}`).toLowerCase())
          //console.log(keybindButton.key)
          keybindButton.value = keybindButton.key
          kb.style.visibility = "hidden";
          document.removeEventListener("click", click);
        }
      } else if (ev.target.key === undefined) {
        kb.style.visibility = "hidden";
        document.removeEventListener("click", click);
      }
    }

    document.addEventListener("click", click)
  }

  menuTab.keyBind = keybindButton
  topBar.append(keybindButton);

  let checkBoxExtMenu = document.createElement('input');
  topBar.style.marginLeft = "33px";
  checkBoxExtMenu.type = 'checkbox';

  if (ext != undefined) { checkBoxExtMenu.checked = ext; }
  checkBoxExtMenu.style.accentColor = "rgb(70, 165, 139, 1)";
  checkBoxExtMenu.style.color = "rgb(70, 165, 139, 1)";
  menuTab.extmenu = checkBoxExtMenu;
  topBar.appendChild(checkBoxExtMenu)

  {
    let label = document.createElement('label')
    label.textContent = "Extended menu";
    label.style.paddingLeft = "10px";

    topBar.append(label);
  }
  {
    let label = document.createElement('label')
    label.textContent = "(?)";
    label.className = "tooltip"
    label.style.color = "rgb(127, 255, 212, 0.6)";
    label.style.zIndex = 1;

    let image = document.createElement("img");
    image.className = "tooltiptext";
    image.src = "https://cdn.discordapp.com/attachments/1046784782194974771/1264619448468504668/krita_mwjE38Gic3.png?ex=669e8824&is=669d36a4&hm=2162e7c6836c0cecd61a74c0decfd778fcabbb5b031e28f1f25b11052fa07f06&";
    label.append(image);
    topBar.append(label);
    list.appendChild(topBar);
  }

  let deleteCommandButton = document.createElement('button');
  deleteCommandButton.className = "smenuButton";
  deleteCommandButton.textContent = "Delete menu";
  deleteCommandButton.style.paddingLeft = "15px";
  deleteCommandButton.style.paddingRight = "29px";
  deleteCommandButton.style.float = "right"

  deleteCommandButton.onclick = () => {
    if (!confirm("Are you sure you want to delete " + menuTab.textContent + "?")) {
      return;
    }
    tabDiv.remove();
    menuTab.remove();
    let el = document.getElementsByClassName("smenuWindowTab")
    if (el.length > 0) {
      el[0].onclick();
    }
  }
  topBar.append(deleteCommandButton);

  let addCommandButton = document.createElement('button');
  addCommandButton.className = "smenuButton";
  addCommandButton.textContent = "Add command";
  addCommandButton.style.paddingLeft = "35px";
  addCommandButton.onclick = (_, keepMenuV, commandNameV, commandInputV, commandCfgV) => {
    let cmdli = document.createElement('li')
    cmdli.style.opacity = "0";
    cmdli.style.marginLeft = "5px";
    cmdli.tagName = "commandDiv";
    cmdli.animate([{ opacity: 1 }], {
      duration: 500,
      fill: "forwards",
      easing: "ease"
    });
    let commandDiv = document.createElement('div')
    commandDiv.className = "smenuCommandWindow";

    commandDiv.style.height = "450px";

    cmdli.append(commandDiv);

    let commanTopBar = document.createElement('div')
    commandDiv.append(commanTopBar);

    let commandButton = document.createElement('button')
    commandButton.className = "smenuButton";
    commandButton.textContent = "✖"
    commandButton.onclick = () => {
      if (confirm("Are you sure you want to delete " + commandName.value + "?")) {
        cmdli.remove();
      }
    };
    commanTopBar.append(commandButton);

    let commandButtonUp = document.createElement('button')
    commandButtonUp.className = "smenuButton";
    commandButtonUp.textContent = "⮝"
    commandButtonUp.onclick = function () {
      if (cmdList.children.length <= 1) { return; }
      const sortedList = Array.from(cmdList.children);
      let ind = sortedList.findIndex((el) => el == cmdli)
      let tmp = sortedList[ind];
      sortedList[ind] = sortedList[ind - 1];
      sortedList[ind - 1] = tmp;

      for (let item of sortedList) {
        cmdList.appendChild(item);
      }
      this.focus();
    };
    commanTopBar.append(commandButtonUp);

    let commandButtonDown = document.createElement('button')
    commandButtonDown.className = "smenuButton";
    commandButtonDown.textContent = "⮟"
    commandButtonDown.onclick = function () {
      if (cmdList.children.length <= 1) { return; }
      const sortedList = Array.from(cmdList.children);
      let ind = sortedList.findIndex((el) => el == cmdli)
      let tmp = sortedList[ind];
      sortedList[ind] = sortedList[ind + 1];
      sortedList[ind + 1] = tmp;

      for (let item of sortedList) {
        cmdList.appendChild(item);
      }

      this.focus();
    };
    commanTopBar.append(commandButtonDown);

    let checkbox = document.createElement('input');
    topBar.style.paddingLeft = "0px";
    checkbox.type = 'checkbox';
    checkbox.checked = keepMenuV ?? false;

    checkbox.style.accentColor = "rgb(70, 165, 139, 1)";
    cmdli.keepMenu = checkbox;
    commanTopBar.appendChild(checkbox)

    let label = document.createElement('label')
    label.textContent = "Keep menu after command execution";
    label.style.paddingLeft = "10px";
    commanTopBar.append(label);

    let commandName = document.createElement('input')
    commandName.className = "smenuInput";
    commandName.style.marginTop = "5px";
    commandName.style.marginLeft = "5px";

    commandName.placeholder = "Command name...";
    commandName.value = (`${(commandNameV ?? cmdList.children.length + 1)}`).replaceAll(" ", "_");
    commandName.style.width = "calc(100% - 15px)";
    commandName.onchange = function(e)
    {
      commandName.value = e.target.value.replaceAll(" ", "_");
    }

    cmdli.commandName = commandName;
    commandDiv.append(commandName);

    let commandInput = document.createElement('textarea')
    commandInput.className = "smenuInput";
    commandInput.style.marginTop = "5px";
    commandInput.style.marginLeft = "5px";
    commandInput.textContent = "echo \"CURRMENU_NAME CURRCMD_PAGE CURRCMD_LPAGE CURRCMD_SLOT CURCMD_NAME\";Fire1";
    commandInput.placeholder = "Inline command";
    commandInput.style.width = "calc(100% - 15px)";
    commandInput.style.height = "40.4%";
    commandInput.style.textAnchor = "none";
    commandInput.style.resize = "none";
    commandInput.value = commandInputV ?? "echo \"CURRMENU_NAME CURRCMD_PAGE CURRCMD_LPAGE CURRCMD_SLOT CURCMD_NAME CURRCMD_NAMEA\";Fire1";
    commandDiv.append(commandInput);
    cmdli.commandInput = commandInput;

    let cfgInput = document.createElement('textarea')
    cfgInput.className = "smenuInput";
    cfgInput.style.marginTop = "5px";
    cfgInput.style.marginLeft = "5px";
    cfgInput.placeholder = "CFG";
    cfgInput.textContent = "alias Fire1 +attack;wait 1000;-attack";
    cfgInput.style.width = "calc(100% - 15px)";
    cfgInput.style.height = "40.4%";
    cfgInput.style.textAnchor = "none";
    cfgInput.style.resize = "none";
    cfgInput.value = commandCfgV ?? "alias Fire1 \"say 1\"";
    commandDiv.append(cfgInput);
    cmdList.appendChild(cmdli);

    cmdli.cfgInput = cfgInput;

    if (commandCfgV === undefined) {
      commandName.focus();
      commandsList.scrollBy(0, 10000000000000000000);
    }
  }

  topBar2 = document.createElement('li')
  topBar2.style.paddingTop = "0px";
  topBar2.style.paddingBottom = "0px";
  topBar2.style.marginLeft = "0px";
  topBar2.style.zIndex = 25;
  topBar2.append(addCommandButton);
  list.appendChild(topBar2);
  list.appendChild(commandsList);

  if (ext === undefined) {
    addCommandButton.onclick()
  }

  tabDiv.append(list);
  smenuWindowTabOnClick.call(menuTab)
  return addCommandButton.onclick;
}

function parseSMENU(data) {
  let smenuo = JSON.parse(data)
  for (let index = 0; (smenuo[index] != undefined); index++) {
    const menu = smenuo[index];

    let addCommand = smenuCreateNewMenu(menu.name, menu.ext, menu.key);

    for (let cindex = 0; menu.cmds[cindex] != undefined; cindex++) {
      let cmd = menu.cmds[cindex];
      addCommand(undefined, cmd.checked, cmd.commandName, cmd.commandInput, cmd.cfgInput);
    }
  }
}

function parseSMenuFile(file) {
  if (!file.name.endsWith(".smenu")) {
    alert(`Wrong file type ${file.name}`)
    return;
  }

  if (document.getElementById("smenuEditWindow")) {
    document.getElementById("smenuEditWindow").style.visibility = "visible";
    document.getElementById("smenuEditWindow").style.top = 0;
  }
  if (document.getElementById("startWindow")) { document.getElementById("startWindow").style.visibility = "hidden"; }

  const reader = new FileReader();
  reader.readAsText(file);
  reader.addEventListener('load', () => {
    parseSMENU(reader.result.toString())
  })
}

function loadExample()
{
  // 💀
  parseSMENU('{"0":{"name":"Main","ext":true,"key":"f3","cmds":{"0":{"checked":false,"commandName":"HeadbangMode","commandInput":"smenu_HeadbangMode","cfgInput":""},"1":{"checked":false,"commandName":"Spy_as","commandInput":"smenu_Spy_as","cfgInput":""},"2":{"checked":false,"commandName":"GG","commandInput":"maisaygg","cfgInput":"alias maisaygg \\"say ⡔⭘ﾐﾐﾐﾐﾐﮞﻝ GG ⡔⭘ﾐﾐﾐﾐﾐﮞﻝ\\""}}},"1":{"name":"HeadbangMode","ext":false,"key":"none","cmds":{"0":{"checked":true,"commandName":"Headbang.Mode[OFF]","commandInput":"cmdheadbang","cfgInput":"alias cmdheadbang_activate \\"m_yaw 0; sensitivity 5; bind mouse1 cmdheadbang_deactivate; alias cmdheadbang cmdheadbang_deactivate;cmdheadbang_on;smenu_updatepage\\"\\nalias cmdheadbang_deactivate \\"m_yaw 0.022; sensitivity 0.5;bind mouse1 +attack; alias cmdheadbang cmdheadbang_activate;cmdheadbang_off;smenu_updatepage\\"\\nalias cmdheadbang cmdheadbang_activate\\n\\nalias cmdheadbang_on \\"alias  CURRCMD_NAMEA echo CURRCMD_SLOT.Headbang.Mode.[ON]\\"\\nalias cmdheadbang_off \\"alias CURRCMD_NAMEA echo CURRCMD_SLOT.Headbang.Mode.[OFF]\\"\\ncmdheadbang_off"}}},"2":{"name":"Spy_as","ext":true,"key":"none","cmds":{"0":{"checked":false,"commandName":"Scout","commandInput":"say_team \\"!!! SPY AS SCOUT!!!\\";voicemenu 1 1","cfgInput":""},"1":{"checked":false,"commandName":"Soldier","commandInput":"say_team \\"!!! SPY AS SOLDIER !!!\\";voicemenu 1 1","cfgInput":""},"2":{"checked":false,"commandName":"Pyro","commandInput":"say_team \\"!!! SPY AS PYRO!!!\\";voicemenu 1 1","cfgInput":""},"3":{"checked":false,"commandName":"DEMO","commandInput":"say_team \\"!!! SPY AS DEMO!!!\\";voicemenu 1 1","cfgInput":""},"4":{"checked":false,"commandName":"Heavy","commandInput":"say_team \\"!!! SPY AS HEAVY!!!\\";voicemenu 1 1","cfgInput":""},"5":{"checked":false,"commandName":"Engineer","commandInput":"say_team \\"!!! SPY AS ENGINEER !!!\\";voicemenu 1 1","cfgInput":""},"6":{"checked":false,"commandName":"Medic","commandInput":"say_team \\"!!! SPY AS MEDIC !!!\\";voicemenu 1 1","cfgInput":""},"7":{"checked":false,"commandName":"Sniper","commandInput":"say_team \\"!!! SPY AS SNIPER !!!\\";voicemenu 1 1","cfgInput":""},"8":{"checked":false,"commandName":"Spy","commandInput":"say_team \\"!!! SPY AS SPY !!!\\";voicemenu 1 1","cfgInput":""}}}}')
}

document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("smenuWindowTabs").addEventListener('wheel', function(event) {
    this.scrollBy(-event.deltaY, 0);
  }, false);

  document.getElementById("smenuWindowTabs").addEventListener('dblclick', (event) => {
    smenuCreateNewMenu();
  }, false);

  document.body.addEventListener("dragover", (ev) => {
    ev.preventDefault();
  })

  document.body.addEventListener("drop", (ev) => {
    ev.preventDefault();
    if (ev.dataTransfer.items) {
      [...ev.dataTransfer.items].forEach((item, i) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          parseSMenuFile(file)
        }
      });
    } else {
      [...ev.dataTransfer.files].forEach((file, i) => {
        parseSMenuFile(file)
      });
    }
  })

  // console.log(document.URL);

  if (document.URL.includes("example")) {
    if (document.getElementById("startWindow")) { document.getElementById("startWindow").style.visibility = "hidden"; }
    if (document.getElementById("smenuEditWindow")) {
      document.getElementById("smenuEditWindow").style.visibility = "visible";
      document.getElementById("smenuEditWindow").style.top = 0;
    }

    //smenuCreateNewMenu();
  }
})