function receiveMessage(e){"closeWindow"===e.data&&(body.removeChild(document.getElementById("passoffFrame")),window.removeEventListener("message",receiveMessage,!1))}var body=document.getElementsByTagName("body")[0],trelloSlug=window.location.pathname.match(/\w+/g)[1],urlPath="https://devassembly.herokuapp.com/tools/bookmarklets/trelloBM/index.html?trelloSlug="+trelloSlug,passoffFrame=document.createElement("iframe");passoffFrame.name="passoffFrame",passoffFrame.id="passoffFrame",passoffFrame.style="position:fixed; top:0px; width:600px; height:600px; border: solid 2px #3333cc;background-color:#FFF; z-index:100",passoffFrame.src=urlPath,body.appendChild(passoffFrame),window.addEventListener("message",receiveMessage,!1);