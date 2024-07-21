function saveCFG() {
    let items = document.getElementById("smenuWindowTabs").children;
    let cfg =
        `
alias smenu_restore_19 "bind 1 slot1;bind 2 slot2;bind 3 slot3;bind 4 slot4;bind 5 slot5;bind 7 slot7;bind 8 slot8;bind 9 slot9; bind 0 slot10;bind - disguiseteam; bind = smenu_donothing"
alias smenu_donothing ""
alias smenu_overrideEx "bind 0 smenu_prev;bind - smenu_next; bind = smenu_close;"
alias smenu_override   "bind 4 smenu_prev;bind 5 smenu_next; bind 6 smenu_close;"
alias smenu_printpageEx "alias smenu_updatepage "smenu_printpageEx";clear;smenu_overrideEx;developer 1;con_notifytime 10000;con_filter_enable 0;wait 5;smenuname;smenu_slot1;smenu_slot2;smenu_slot3;smenu_slot4;smenu_slot5;smenu_slot6;smenu_slot7;smenu_slot8;smenu_slot9;echo "0.PREV";echo "-.NEXT";smenu_slotL;wait 5;con_filter_enable 1;"
alias smenu_printpage   "alias smenu_updatepage "smenu_printpage";clear;smenu_override  ;developer 1;con_notifytime 10000;con_filter_enable 0;wait 5;smenuname;smenu_slot1;smenu_slot2;smenu_slot3;echo "4.PREV";echo "5.NEXT";smenu_slotL;wait 5;con_filter_enable 1;"

alias smenu_updatepage ""
alias smenu_close "alias smenu_updatepage "";developer 0;con_filter_enable 0;con_notifytime 8;smenu_restore_19"
alias smenu_next ""
alias smenu_prev ""

alias smenu_slot1 echo "1.EMPTY"
alias smenu_slot2 echo "2.EMPTY"
alias smenu_slot3 echo "3.EMPTY"
alias smenu_slot4 echo "4.EMPTY"
alias smenu_slot5 echo "5.EMPTY"
alias smenu_slot6 echo "6.EMPTY"
alias smenu_slot7 echo "7.EMPTY"
alias smenu_slot8 echo "8.EMPTY"
alias smenu_slot9 echo "9.EMPTY"
alias smenu_slotL echo "6.EXIT"

con_filter_text 0
con_filter_text_out 0
contimes 25
`;

    for (const element of items) {
        if (element.cmdlist.children.length === 0) { continue; }

        cfg = cfg + "\n///////// Menu: " + element.textContent + "\n"
        let vl = element.keyBind.key

        cfg = cfg + "alias smenu_" + element.textContent + "\" smenu_restore_19; smenu_" + element.textContent + "_1\"\n"
        if (vl != "none") {
            cfg = cfg + "\nbind " + vl + " smenu_" + element.textContent + " \n"
        }

        for (const cmd of element.cmdlist.children) {
            if (cmd.commandName.value.length === 0) {
                element.onclick();
                cmd.commandName.focus();
                let int = setInterval(() => {
                    clearInterval(int);
                    alert("Name required");
                }, 25);
                throw new Error("");
            }
        }

        let menuLinesCount = element.extmenu.checked ? 9 : 3;
        let pageInd = 0;
        let pageCount = Math.ceil(element.cmdlist.children.length / menuLinesCount);
        let indp = 0;
        let runPreprocessor = (input, cmdname) => { 
            return input
                        .replaceAll("CURRMENU_NAME", `${element.textContent}`)
                        .replaceAll("CURRCMD_PAGE", `${pageInd}`)
                        .replaceAll("CURRCMD_LPAGE", `${pageCount}`)
                        .replaceAll("CURRCMD_NAMEA", `smenu_${element.textContent}_${pageInd.toString()}_slot${indp.toString()}`)
                        .replaceAll("CURRCMD_SLOT", `${indp}`)
                        .replaceAll("CURCMD_NAME", `${cmdname}`);
        }

        let cmdindex = 0;
        while (pageInd < pageCount) {
            pageInd = pageInd + 1;
            for (let index = 0; index < menuLinesCount; index++) {
                indp = index + 1;
                if (cmdindex < element.cmdlist.children.length) {
                    const cmd = element.cmdlist.children[cmdindex];
                    console.log(runPreprocessor(cmd.cfgInput.value, cmd.commandName.value));
                    cfg = cfg + "alias smenu_" + element.textContent + "_" + pageInd.toString() + "_slot" + indp.toString() + ' echo\"' + indp.toString() + '.' + cmd.commandName.value.replace(" ", ".") + "\"\n";
                    cfg = cfg + "alias smenu_" + element.textContent + "_" + pageInd.toString() + "_" + indp.toString() + "\"" + (!cmd.keepMenu.checked ? "smenu_close;wait 5;" : "") + runPreprocessor(cmd.commandInput.value, cmd.commandName.value) + "\;" + "\"\n"; 
                    cfg = cfg + runPreprocessor(cmd.cfgInput.value, cmd.commandName.value) + "\n"
                } else {
                    cfg = cfg + "alias smenu_" + element.textContent + "_" + pageInd.toString() + "_slot" + indp.toString() + ' echo\"' + indp.toString() + ".EMPTY\"\n";
                    cfg = cfg + "alias smenu_" + element.textContent + "_" + pageInd.toString() + "_" + indp.toString() + "\"smenu_close\"\n";
                }
                cmdindex = cmdindex + 1;
            }

            cfg = cfg + "alias smenu_" + element.textContent + "_" + pageInd.toString() + "_prev" + " smenu_" + element.textContent + "_" + ((pageInd == 1 ? pageCount : pageInd - 1)) + "\n";
            cfg = cfg + "alias smenu_" + element.textContent + "_" + pageInd.toString() + "_next" + " smenu_" + element.textContent + "_" + ((pageInd == pageCount ? 1 : pageInd + 1)) + "\n";
            let slt = "smenu_" + element.textContent + "_" + pageInd.toString() + "_slot";
            cfg = cfg + "alias smenu_" + element.textContent + "_" + pageInd + "\"" + "alias smenuname \"echo " + element.textContent + "\";smenu_" + element.textContent + "_" + pageInd + "binds;alias smenu_currentpage " + "smenu_" + element.textContent + "_" + pageInd
                + ";alias smenu_slot1 " + slt + 1
                + ";alias smenu_slot2 " + slt + 2
                + ";alias smenu_slot3 " + slt + 3;

            let binds = "alias smenu_" + element.textContent + "_" + pageInd + "binds"
                + "\"bind 1 smenu_" + element.textContent + "_" + pageInd.toString() + "_" + "1;"
                + "bind 2 smenu_" + element.textContent + "_" + pageInd.toString() + "_" + "2;"
                + "bind 3 smenu_" + element.textContent + "_" + pageInd.toString() + "_" + "3;"
                + "alias smenu_prev smenu_" + element.textContent + "_" + pageInd.toString() + "_prev;"
                + "alias smenu_next smenu_" + element.textContent + "_" + pageInd.toString() + "_next;";

            if (element.extmenu.checked) {
                cfg = cfg + ";alias smenu_slot4 " + slt + 4;
                cfg = cfg + ";alias smenu_slot5 " + slt + 5;
                cfg = cfg + ";alias smenu_slot6 " + slt + 6
                cfg = cfg + ";" + "smenu_" + element.textContent + "_" + pageInd + "extraalias"
                cfg = cfg + ";alias smenu_slotL " + "echo \"+.EXIT.[" + pageInd + "/" + pageCount + "]\";smenu_printpageEx\"\n";

                cfg = cfg + "alias smenu_" + element.textContent + "_" + pageInd + "extraalias\""
                cfg = cfg + ";alias smenu_slot7 " + slt + 7;
                cfg = cfg + ";alias smenu_slot8 " + slt + 8;
                cfg = cfg + ";alias smenu_slot9 " + slt + 9 + "\"\n";

                binds = binds
                    + "bind 4 smenu_" + element.textContent + "_" + pageInd.toString() + "_" + "4;"
                    + "bind 5 smenu_" + element.textContent + "_" + pageInd.toString() + "_" + "5;"
                    + "bind 6 smenu_" + element.textContent + "_" + pageInd.toString() + "_" + "6;"
                    + "bind 7 smenu_" + element.textContent + "_" + pageInd.toString() + "_" + "7;"
                    + "bind 8 smenu_" + element.textContent + "_" + pageInd.toString() + "_" + "8;"
                    + "bind 9 smenu_" + element.textContent + "_" + pageInd.toString() + "_" + "9"
            } else {
                cfg = cfg + ";alias smenu_slotL " + "echo \"6.EXIT.[" + pageInd + "/" + pageCount + "]\";smenu_printpage\"\n";
            }

            cfg = cfg + binds + "\"\n"
            cfg = cfg + "///////\n";
        }
    }
    console.log(cfg);
    let a = document.createElement("a");
    let blob = new Blob([cfg], { type: "text/plain" })
    a.href = window.URL.createObjectURL(blob)
    a.download = "menu.cfg"
    a.click();
    a.remove();
}

function generateSMENU() {
    let items = document.getElementById("smenuWindowTabs").children;
    let menus = []

    for (const element of items) {
        
        if (element.cmdlist.children.length === 0) {
            continue;
        }

        let tab = [];
        tab.name = element.textContent;
        tab.ext = element.extmenu.checked;
        tab.key = element.keyBind.key;
        tab.cmds = [];
        menus.push(tab)

        for (const cmd of element.cmdlist.children) {
            console.log(cmd.commandName.value);
            if (cmd.commandName.value.length === 0) {
                element.onclick();
                cmd.commandName.focus();
                let int = setInterval(() => {
                    clearInterval(int);
                    alert("Name required")
                }, 25);
                throw new Error("");
            }

            let cmds = []
            cmds.checked = cmd.keepMenu.checked
            cmds.commandName = cmd.commandName.value
            cmds.commandInput = cmd.commandInput.value
            cmds.cfgInput = cmd.cfgInput.value
            tab.cmds.push(cmds);
        }
    }

    let conletrToObj = (array) => {
        let thisEleObj = new Object();
        if (typeof array == "object") {
            for (let i in array) {
                let thisEle = conletrToObj(array[i]);
                thisEleObj[i] = thisEle;
            }
        } else {
            thisEleObj = array;
        }
        return thisEleObj;
    };
    return [JSON.stringify(conletrToObj(menus))];
}

function saveSMENU() {
    let a = document.createElement("a");
    let blob = new Blob(generateSMENU(), { type: "text/plain" })
    a.href = window.URL.createObjectURL(blob)
    a.download = "menu.smenu"
    a.click();
    a.remove();
}

//document.addEventListener("click", function()
//{
//    let url = new URL(window.location.href)
//
//    history.replaceState({}, '', "?data=" + btoa(generateSMENU()));
//})
