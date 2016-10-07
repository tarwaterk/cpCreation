
//Functions
function authenticationSuccess() { 
    console.log("Successful authentication"); 
  }

function authenticationFailure() { 
  console.log("Failed authentication"); 
}

function successfulPost(success) {
    window.close();
}

function failedPost(err) {
    window.alert("POST FAILED: THE WORLD WILL NOW EXPLODE...");
}

if(window.location.hostname === "codepen.io") {

  //inject scripts needed for Trello API
  var jQ = document.createElement("script");
  jQ.src = "https://code.jquery.com/jquery-1.7.1.min.js";
  var trelloScript = document.createElement("script");
  trelloScript.src = "https://api.trello.com/1/client.js?key=4e1be9ba84b16573428e1bdad0d89772";
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(jQ);
  body.appendChild(trelloScript);

  var trelloLink = document.getElementsByName('twitter:description')[0].content.replace(/\.\.\./ , "");
  var codepenId = window.location.pathname.match(/\w+$/)[0];
  var trelloSlug = trelloLink.match(/\w+$/)[0];

  //timeout to allow for page to load the scripts appended above
  trelloScript.onload = function() {
      Trello.authorize({
      type: "popup",
      name: "Codepen Comment Creation Authorization",
      scope: {
        read: true,
        write: true },
      expiration: "never",
      success: authenticationSuccess,
      error: authenticationFailure
    });
    
    Trello.post("/cards/"+trelloSlug+"/actions/comments", {"text":"ID: "+codepenId+"\nCODEPEN: https://codepen.io/team/bwswebdev/pen/"+codepenId+"?editors=1000"}, function() {console.log("Comment creation successful");})
          .then(successfulPost, failedPost);
  };

} else if(window.location.hostname === "trello.com"){

  var penTitle = document.querySelector('.card-detail-title-assist').innerHTML;
  var trelloLink = window.location.href.match(/https:\/\/trello\.com\/c\/\w+/);
  console.log(penTitle + " : " + trelloLink);

  //create pre-filled pen
  var formInput = document.createElement("input");
  var cpForm = document.createElement("form");

  cpForm.action = "https://codepen.io/pen/define";
  cpForm.method = "POST";
  cpForm.target = "_blank";

  formInput.type = "hidden";
  formInput.name = "data";
  formInput.value = '{"title":"'+ penTitle +'","description":"'+ trelloLink +'","private":true}';

  cpForm.appendChild(formInput);
  cpForm.submit();
}


// starter code for finding if there is already a codpen url on the trello card
//document.querySelectorAll(".js-friendly-links")[0].querySelector("p a").href;


