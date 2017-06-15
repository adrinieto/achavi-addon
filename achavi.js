var ACHAVI_URL = 'https://overpass-api.de/achavi/?changeset='

function createLink(changeset_id) {
    var achavi_link = document.createElement("a")
    achavi_link.text = "Achavi";
    achavi_link.href = ACHAVI_URL + changeset_id;
    achavi_link.setAttribute('target', '_blank');
    achavi_link.style.background = "#7092FF";
    achavi_link.style.color = "#eee";
    achavi_link.style.fontWeight = "bold";
    achavi_link.style.padding = "2px";
    achavi_link.style.borderRadius = "4px";
    return achavi_link;
}

function search_changesets() {
    var changesetsList = document.querySelectorAll('#sidebar_content ol.changesets');

    for (var j = 0; j < changesetsList.length; j++){
        var changesets = changesetsList[j].getElementsByTagName("li");
        for (var i = 0; i < changesets.length; i++) {
            var details = changesets[i].querySelector(".details");
            //Don't add the button again
            if (details.innerHTML.indexOf("Achavi") != -1) {
                continue;
            }
            
            var changeset_id = changesets[i].id.replace("changeset_","");
            var achavi_link = createLink(changeset_id);
            details.innerHTML += " · ";
            details.appendChild(achavi_link);
        }
    }
}

function showButtonInChangesetDetailPage() {
    console.log("showButtonInChangesetDetailPage");
    var changeset_id = window.location.pathname.replace("/changeset/", "");

    var details = document.querySelector('#sidebar_content h2');
    var achavi_link = createLink(changeset_id);
    details.appendChild(achavi_link);
    console.log("aaa");
}

function scanPage() {
    if (isChangesetDetailPage()) {
        showButtonInChangesetDetailPage();
    } else {
        search_changesets();
        addChangesetsObserver();
    }
}

function isChangesetDetailPage() {
    return window.location.pathname.indexOf("/changeset/") != -1;
}

/**
 * Add a listener to the sidebar changes. It's needed to search for new changesets
 * when the user clicks in the "History" button in the top bar or when the user clicks
 * on a changeset
 */
function addSidebarObserver() {
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type == 'attributes'){
                return;
            }
            scanPage();
        });    
    });

    var config = { attributes: true, childList: true, characterData: true };
    var sidebar_content = document.querySelector('#sidebar_content');
    observer.observe(sidebar_content, config);
}

/**
 * Add a listener to the changeset list. It's need to  search for new changesets 
 * when the user click the "Load more" button
 */
function addChangesetsObserver() {
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type == 'attributes'){
                return;
            }
            search_changesets();
        });    
    });

    var config = { attributes: true, childList: true, characterData: true };
    var changesets = document.querySelector('#sidebar_content div.changesets');
    observer.observe(changesets, config);
}

scanPage();
addSidebarObserver();