path = `${apppath}/json/Examples.json`;
var hudExamples = [];
var options = {
    valueNames: ['name', 'type'],
    item: '<li class="mdl-list__item mdl-list__item--two-line Example-li" onclick="openExample(this);">'+
    '<span class="mdl-list__item-primary-content"><i class="icn icn-docs mdl-list__item-icon"></i><span class="name"></span>'+
    '<span class="mdl-list__item-sub-title type"></span></span>'+
    '</li>'
};
var json;
fs.stat(path, function (err, stats) {
    if (err) {
        alert(err);
    }
})
json = fs.readFileSync(path, "utf8");
obj = JSON.parse(json);


obj.examples.forEach(function (node) {
    hudExamples.push({
        'caption': node.name,
        'command': 'openExample'
    })
})

var values = obj.examples;
var userList = new List('users', options, values);

function openExample(element) {
    var filename = element.querySelectorAll('.name')[0].innerHTML;
    addExampleTab(filename);
}
function addExampleTab(filename){
    var path = ".\\Examples\\" + filename + '.bas';
    openFile(path, true);
}