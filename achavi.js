var ACHAVI_URL = 'https://overpass-api.de/achavi/?changeset='

function createLink(changesetId) {
    var achaviLink = document.createElement("a")
    achaviLink.text = "Achavi";
    achaviLink.href = ACHAVI_URL + changesetId;
    achaviLink.setAttribute('target', '_blank');
    achaviLink.style.background = "#7092FF";
    achaviLink.style.color = "#eee";
    achaviLink.style.fontWeight = "bold";
    achaviLink.style.padding = "2px";
    achaviLink.style.borderRadius = "4px";
    return achaviLink;
}

function searchChangesets() {
    var changesetsList = document.querySelectorAll('#sidebar_content ol.changesets');

    for (var j = 0; j < changesetsList.length; j++) {
        var changesets = changesetsList[j].getElementsByTagName("li");
        for (var i = 0; i < changesets.length; i++) {
            var details = changesets[i].querySelector(".details");
            //Don't add the button again
            if (details.innerHTML.indexOf("Achavi") != -1) {
                continue;
            }

            var changesetId = changesets[i].id.replace("changeset_", "");
            var achaviLink = createLink(changesetId);
            details.innerHTML += " · ";
            details.appendChild(achaviLink);
        }
    }
}

function showButtonInChangesetDetailPage() {
    var changesetId = window.location.pathname.replace("/changeset/", "");

    var details = document.querySelector('#sidebar_content h2');
    var achaviLink = createLink(changesetId);
    details.appendChild(achaviLink);
}

function scanPage() {
    if (isChangesetDetailPage()) {
        showButtonInChangesetDetailPage();
    } else {
        searchChangesets();
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
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type == 'attributes') {
                return;
            }
            scanPage();
        });
    });

    var config = { attributes: true, childList: true, characterData: true };
    var sidebarContent = document.querySelector('#sidebar_content');
    observer.observe(sidebarContent, config);
}

/**
 * Add a listener to the changeset list. It's need to  search for new changesets 
 * when the user click the "Load more" button
 */
function addChangesetsObserver() {
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type == 'attributes') {
                return;
            }
            searchChangesets();
        });
    });

    var config = { attributes: true, childList: true, characterData: true };
    var changesets = document.querySelector('#sidebar_content div.changesets');
    observer.observe(changesets, config);
}

scanPage();
addSidebarObserver();