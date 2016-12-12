if (!demo)
    var fs = require('fs');
var recentFilePath = `${apppath}/json/Recent.json`;
var Recentstr = "";
var icon = "";
var json;
fs.stat(recentFilePath, function (err, stats) {
    if (err) {
        alert(err);
    }
})

json = fs.readFileSync(recentFilePath, "utf8");
obj = JSON.parse(json);

if (obj.files.length == 0) {
    document.getElementById('RecentList').innerHTML = '<span class="nav-group-item" style="text-align: center;"><small><i>No file to display</i></small></span>';
}
else {
    obj.files.forEach(function (file) {
        if (file.extension.toUpperCase() == "BAS")
            icon = "fa fa-file-code-o"

        else if (file.extension.toUpperCase() == "TXT")
            icon = "fa fa-file-text-o"

        else if (file.extension.toUpperCase() == "BAZ" || file.extension.toUpperCase() == "ZIP")
            icon = "fa fa-file-archive-o"

        else
            icon = "fa fa-file-o"


        Recentstr = Recentstr + '<span class="nav-group-item" onclick="openRecent(this)">' +
            '<span class="' + icon + '"></span>' +
            file.Name + '<small class="hidden">' + file.Path + '</small>' +
            '</span>';
    }, this);
    document.getElementById('RecentList').innerHTML = Recentstr;
}


function openRecent(element) {
    var filename = element.getElementsByTagName('span')[0].innerHTML;
    var filepath = element.getElementsByTagName('small')[0].innerHTML;
    openFile(filepath);
}


Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};
function IsObjectPresent(array, Array2, Name) {
    var toFindName = (Array2[0])[Name];
    var foundIndex = 0;
    var found = false;
    for (var i = 0; i < array.length; i++) {
        if ((array[i])[Name] == toFindName) {
            foundIndex = i;
            found = true;
            break;
        }
    }
    return [found, foundIndex];
}

function addToRecent(path) {
    var recentFilePath = `${apppath}/json/Recent.json`;
    var json = fs.readFileSync(recentFilePath, "utf8");
    try {
        obj = JSON.parse(json);
        var name = path.toString().split("\\")[path.toString().split("\\").length - 1];
        var extension = name.split(".")[name.split(".").length - 1];
        var array = [{
            Name: name,
            Path: path,
            extension: extension
        }];
        var isAlreadyPresent = IsObjectPresent(obj.files, array, "Path")
        if (!isAlreadyPresent[0]) {
            if (obj.files) {
                obj.files.reverse();
                obj.files.push(array[0]);
                obj.files.reverse();
            }
            else {
                obj.files.push(array[0]);
            }
            if (obj.files.length <= 50)
                obj.files.splice(51, 1);
        }
        else {
            obj.files.move(isAlreadyPresent[1], 0);
        }
        var new_json = JSON.stringify(obj)
        fs.writeFile(recentFilePath, new_json, function (err) {
            if (err) {
                return alert(err);
            }
        });
    } catch (error) {
        alert(error);
    }

}
