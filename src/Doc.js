path = `${apppath}/json/Doc.json`;

var list = "";

fs.stat(path, function (err, stats) {
    if (err) {
        alert(err);
    }
})
var json = fs.readFileSync(path, "utf8");
obj = JSON.parse(json);

var hudJson = [];
obj.doc.forEach(function (node) {
    if (typeof (node) == "string") {
        list += '<li onclick="openDocs(this)"><span class="nav-group-item"><span class="fa fa-file-o"></span><span class="name">' + node + '</span></span></li>'
        hudJson.push({
            'caption': node,
            'command': 'openDocs'
        })
    }
    else if (typeof (node) == "object") {
        list += '<li onclick="openDocs(this)"><span class="nav-group-item" style="padding-left:0px;"><span class="fa fa-folder-open-o"></span><span class="name">' + node.name + '</span></span></li>'
        hudJson.push({
            'caption': node.name,
            'command': 'openDocs'
        })
        node.data.forEach(function (subnode) {
            if (typeof (subnode) == "string") {
                list += '<li onclick="openDocs(this)"><span class="nav-group-item" style="padding-left:10px;"><span class="fa fa-file-o"></span><span class="name">' + subnode + '</span></span></li>'
                hudJson.push({
                    'caption': subnode,
                    'command': 'openDocs'
                })
            }
            else if (typeof (subnode) == "object") {
                list += '<li onclick="openDocs(this)"><span class="nav-group-item" style="padding-left:10px;"><span class="fa fa-folder-open-o"></span><span class="name">' + subnode.name + '</span></span></li>'
                hudJson.push({
                    'caption': subnode.name,
                    'command': 'openDocs'
                })
                subnode.data.forEach(function (sub_subnode) {
                    list += '<li onclick="openDocs(this)"><span class="nav-group-item" style="padding-left:30px;"><span class="fa fa-file-o"></span><span class="name">' + sub_subnode + '</span></span></li>'
                    hudJson.push({
                        'caption': sub_subnode,
                        'command': 'openDocs'
                    })
                }, this);
            }
        }, this);
    }
}, this);

document.getElementById('doc-list').innerHTML = list;
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function openDocs(element) {
    var firstSpan = element.getElementsByTagName('span')[0]
    var name = firstSpan.getElementsByTagName('span')[1].innerHTML;
    addDocTab(name);
}
function addDocTab(name){
    if (name == "Language Guide" ||
        name == "Calculations and maths" ||
        name == "Devices and files" ||
        name == "Language reference" ||
        name == "Operators" ||
        name == "Errors and Messages" ||
        name == "Technical reference" ||
        name == "Keycodes" ||
        name == "Acknowledgements" ||
        name == "Statements")
        console.info(`No documenation available for '${name}' `);

    else if (name == "DEFINT, DEFDBL, DEFSNG, DEFSTR") {
        addtab("defint_", 'DEFINT, DEFDBL, DEFSNG, DEFSTR', `Docs/DEFINT_.html`);
        return
    }
    else if (name == "LPRINT" || name == "PRINT") {
        addtab("PRINT_tabli", 'PRINT and LPRINT', `Docs/PRINT.html`);
        return
    }
    else if (name == "TRON and TROFF") {
        addtab("TR_tabli", 'TRON and TROFF', `Docs/TRON.html`);
        return
    }
    else if (name == "SCREEN (statement)") {
        addtab("SCREEN_st_tabli", 'SCREEN (statement)', `Docs/SCREEN_st.html`);
        return
    }
    else if (name == "BEEP (switch)") {
        addtab("BEEP_sw_tabli", 'BEEP (switch)', `Docs/BEEP_sw.html`);
        return
    }
    else if (name == "PcBasic" || name=="EasyBasic") {
        addtab("GNU_GPL_tabli", 'GNU GPL v3', `Docs/GNU GPL.html`);
        return
    }
    else if (name == "PcBasic Documenation") {
        addtab("CC_tabli", 'Creative Common 4.0', `Docs/CC.html`);
        return
    }

    var id = ((String(name).replaceAll(" ", "_") + "_tabli").replaceAll("$", "_s")).replaceAll("(", "").replaceAll(")", "");
    addtab(id, name, `Docs/${name}.html`);
}
