// This is for the front page

var old_query;

function searchTermChanged() {
  if(!window.specs) return
  
  var query = document.getElementById("pod_search").value
  if(query == old_query) return
  old_query = query
  
  var filtered_results = []
  var results
  
  if (query.length){
    document.getElementById("about").style.display = "none"
    
    for ( var i = 0; i < specs.length; i++ ){
  
      var library_name = specs[i]["name"];
      var score = library_name.score(query);
      
      if (score > 0.2){
        specs[i]["score"] = score
      	filtered_results.push( specs[i] )
      } 
    }

    // sort by score
    results = filtered_results.sort(function(a, b){
      return b["score"] - a["score"]
    })
    
    var showNotFound = (results.length != 0) ? "none" : "block"
    document.getElementById("no_results").style.display = showNotFound
  }

  var documents = ""
  if(results) {
    for ( var i = 0; i < results.length; i++ ){
      var spec = results[i]
      if(i == 0){
        documents += "<li class='selected'>"
      } else {
        documents += "<li>"
      }

      documents += "<a href='" + spec["doc_url"] + "'>"
    
      documents += "<h2>" + spec["name"] + "</h2>"
      documents += "<h3>" + spec["main_version"] + "</h3>"
      documents += "<p>" + spec["summary"] + "</p>"
    
      documents += "</a></li>"    
    }
  }  
  
  document.getElementById("loading").style.display = "none"
  document.getElementById("results").innerHTML = documents   
}

document.onclick = function(){ 
  var x = window.scrollX, y = window.scrollY;
  document.getElementById('pod_search').focus();
  window.scrollTo(x, y);
}

el = document.body;
if (typeof el.addEventListener != "undefined") {
    el.addEventListener("keydown", function(evt) {
        doThis(evt.keyCode);
    }, false);
} else if (typeof el.attachEvent != "undefined") {
    el.attachEvent("onkeydown", function(evt) {
        doThis(evt.keyCode);
    });
}

function doThis(key) {
    switch (key) {
        // Enter
        case 13:
            openCurrentSelection()
            break;
        // Escape
        case 27:
            resetSelection()
            break;
        // Up
        case 38:
            gotoPreviousSelection()
            break;
        // Down
        case 40:
            gotoNextSelection()
            break;
    }
}

function gotoNextSelection(){
  var results = document.getElementById("results").children
  for ( var i = 0; i < results.length; i++ ){
    
    var child = results[i]
    if(child.className == "selected"){
      if(i == results.length - 1) return;

      var nextSelection = results[i + 1];
      child.className = ""
      
      nextSelection.className = "selected"
      return;
    }
  }
  results[0].className = "selected"
}

function gotoPreviousSelection(){
  var results = document.getElementById("results").children
  for ( var i = 0; i < results.length; i++ ){
    
    var child = results[i]
    if(child.className == "selected"){
      if(i == results.length - 0) return;
      var nextSelection = results[i - 1];
      child.className = ""
      
      nextSelection.className = "selected"
      return;
    }
  }
}
 
function resetSelection(){
  var input = document.getElementById('pod_search')
  input["value"] = ""
  input.focus()
}

function openCurrentSelection(){
  var selectedItemArray = document.getElementsByClassName("selected")

  if (selectedItemArray.length) {
    var item = selectedItemArray[0]
    var link = item.childNodes[0]
    window.document.location.href = link.href;
  }
} 