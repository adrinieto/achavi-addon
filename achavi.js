console.log("start");
var ACHAVI_URL = 'https://overpass-api.de/achavi/?changeset='

var changesets = document.querySelector('#sidebar_content ol.changesets')
                .getElementsByTagName("li");


for (var i = 0; i < changesets.length; i++) {
    var changeset_id = changesets[i].id.replace("changeset_","");
    var achavi_link = createLink(changeset_id);
    changesets[i].querySelector(".details").appendChild(achavi_link);
}

function createLink(changeset_id) {
    var achavi_link = document.createElement("a")
    achavi_link.text = "Open in Achavi"
    achavi_link.href = ACHAVI_URL + changeset_id;
    achavi_link.setAttribute('target', '_blank');
    achavi_link.style.background = "#7092FF";
    achavi_link.style.color = "#eee";
    achavi_link.style.fontWeight = "bold";
    achavi_link.style.padding = "2px";
    achavi_link.style.borderRadius = "4px";
    return achavi_link;
}

