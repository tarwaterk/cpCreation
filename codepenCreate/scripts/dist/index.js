function authenticationSuccess(){console.log("Successful authentication")}function authenticationFailure(){console.log("Failed authentication")}function successfulPost(e){window.close()}function failedPost(e){window.alert("POST FAILED: THE WORLD WILL NOW EXPLODE...")}if("codepen.io"===window.location.hostname){var jQ=document.createElement("script");jQ.src="https://code.jquery.com/jquery-1.7.1.min.js";var trelloScript=document.createElement("script");trelloScript.src="https://api.trello.com/1/client.js?key=4e1be9ba84b16573428e1bdad0d89772";var body=document.getElementsByTagName("body")[0];body.appendChild(jQ),body.appendChild(trelloScript);var trelloLink=document.getElementsByName("twitter:description")[0].content.replace(/\.\.\./,""),codepenId=window.location.pathname.match(/\w+$/)[0],trelloSlug=trelloLink.match(/\w+$/)[0];trelloScript.onload=function(){Trello.authorize({type:"popup",name:"Codepen Comment Creation Authorization",scope:{read:!0,write:!0},expiration:"never",success:authenticationSuccess,error:authenticationFailure}),Trello.post("/cards/"+trelloSlug+"/actions/comments",{text:"CODEPEN: https://codepen.io/team/bwswebdev/pen/"+codepenId+"?editors=1000"},function(){console.log("Comment creation successful")}).then(successfulPost,failedPost)}}else if("trello.com"===window.location.hostname){var penTitle=document.querySelector(".card-detail-title-assist").innerHTML,trelloLink=window.location.href.match(/https:\/\/trello\.com\/c\/\w+/);console.log(penTitle+" : "+trelloLink);var formInput=document.createElement("input"),cpForm=document.createElement("form");cpForm.action="https://codepen.io/pen/define",cpForm.method="POST",cpForm.target="_blank",formInput.type="hidden",formInput.name="data",formInput.value='{"title":"'+penTitle+'","description":"'+trelloLink+'","private":true}',cpForm.appendChild(formInput),cpForm.submit()}