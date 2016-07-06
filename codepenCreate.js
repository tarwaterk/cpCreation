//REMEMBER TO RUN THE API CALL FOR AUTHENTICATION OF THE DEV KEY

if(window.location.hostname === "codepen.io") {

  //inject scripts needed for Trello API
  var jQ = document.createElement("script");
  jQ.src = "https://code.jquery.com/jquery-1.7.1.min.js";
  var trelloScript = document.createElement("script");
  trelloScript.src = "https://api.trello.com/1/client.js?key=4e1be9ba84b16573428e1bdad0d89772";
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(jQ);
  body.appendChild(trelloScript);

  var authenticationSuccess = function() { console.log("Successful authentication"); };
  var authenticationFailure = function() { console.log("Failed authentication"); };

  window.setTimeout(function() {
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

    Trello.post("/cards/"+trelloSlug+"/actions/comments", {"text":"CODEPEN: https://codepen.io/team/bwswebdev/pen/"+codepenId+"?editors=1000"}, function() {console.log("Comment creation successful")});
  },1000);


  //create comment here: need trello link, which is in the description for the pen
  var trelloLink = document.getElementsByName('twitter:description')[0].content.replace(/\.\.\./ , "");
  var codepenId = window.location.pathname.match(/\w+$/)[0];
  var trelloSlug = trelloLink.match(/\w+$/)[0];

  

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
//docBody.append('<form action="http://codepen.io/pen/define" method="POST" target="penFrame" id="penForm"><input type="hidden" name="data" value=\'{"title":"New Pen!","description":"This is a description"}\'></form>');
//document.getElementById('penFrame').submit();

//var http = new XMLHttpRequest();
//http.open("POST", "https://api.trello.com/1/cards/"+ trelloSlug +"/actions/comments", true);
//http.send("?text=" + encodeURI("http://codepen.io/team/bwswebdev/pen/"+ codepenId +"?editors=1000"));





