function setProject(e){projectType=e}function showWhich(e){var t=window.getSelection(),n=document.createRange();$("#trelloName").html(trelloName),0===e?($("#showEmail .trelloLink").html(trelloLink),n.selectNodeContents(document.getElementById("showDefault"))):$("#showDefault").css("display","none"),1===e?($("#showEmail .previewLink").html(previewLink),$("#showEmail .passoffLink").html(passoffLink),$("#showEmail .trelloLink").html(trelloLink),$("#showEmail").css("display","block"),n.selectNodeContents(document.getElementById("showEmail"))):2===e?($("#showStg .previewLink").html(previewLink),$("#showStg .passoffLink").html(passoffLink),$("#showStg .adminUrl").html(whichBrand.adminUrl),$("#showStg .trelloLink").html(trelloLink),$("#showStg").css("display","block"),n.selectNodeContents(document.getElementById("showStg"))):3===e?($("#showMon .monLink").html(monLink),$("#showMon .trelloLink").html(trelloLink),$("#showMon").css("display","block"),n.selectNodeContents(document.getElementById("showMon"))):4===e&&($("#showLogo .trelloLink").html(trelloLink),$("#showLogo").css("display","block"),n.selectNodeContents(document.getElementById("showLogo"))),t.removeAllRanges(),t.addRange(n)}function selectBrand(e){whichBrand=e}function authenticationSuccess(){console.log("Successful Authentication"),showInstructions()}function authenticationFailure(){console.log("Failed authentication")}function constructLinks(){switch(console.log("constructLinks has been run"),projectType){case 1:previewLink="http://www.codepen.io/bwswebdev/debug/"+codepenId,passoffLink="http://www.codepen.io/bwswebdev/pen/"+codepenId+"?editors=1000",showWhich(projectType);break;case 2:previewLink="http://stg."+whichBrand.website+"/en-US/Content/Dev_Asset_Previewer.aspx?codepenid="+codepenId+"&locationid=header","Dr. Scholl's"===whichBrand.name&&(previewLink=previewLink.replace("header","fixed-header")),"Via Spiga"===whichBrand.name&&(previewLink=previewLink.replace("header","tippyTopBanner")),passoffLink="http://www.codepen.io/bwswebdev/pen/"+codepenId+"?editors=1000",showWhich(projectType);break;case 3:case 4:showWhich(projectType);break;default:console.log("nothing selected"),showWhich(0)}}function showInstructions(){Trello.get("/cards/"+trelloSlug+"?fields=name,desc",function(e){trelloName=e.name;var t=e.name.slice(6,10);/email|S1|S2|banner|logo/i.test(e.desc)||console.log("Unable to verify type of asset. Showing default passoff");var n=e.desc.match(/banner|S1|S2|email|logo/i)[0].toLowerCase();switch(/https:\/\/marketer.*/.test(e.desc)&&(n="banner"),t){case"FAM":selectBrand(brands.famous);break;case"NAT":case"NCA":selectBrand(brands.naturalizer);break;case"FRA":selectBrand(brands.francosarto);break;case"RYK":selectBrand(brands.ryka);break;case"CAR":selectBrand(brands.carlos);break;case"DRS":selectBrand(brands.scholls);break;case"FER":selectBrand(brands.fergie);break;case"LIF":selectBrand(brands.lifestride);break;case"VIA":selectBrand(brands.viaspiga)}switch(n){case"email":case"s1":case"s2":projectType=1;break;case"banner":projectType="NAT"!==t&&"NCA"!==t?2:3;break;case"logo":projectType=4}console.log(t+" : "+n+" : "+projectType)}).then(function(){3!==projectType&&4!==projectType?Trello.get("/cards/"+trelloSlug+"?actions=commentCard",function(e){var t=e.actions.filter(function(e){return/codepen\.io/g.test(e.data.text)});console.log(t[0].data.text.match(/\w+(?=\/?\?editors)/g)[0]),codepenId=t[0].data.text.match(/\w+(?=\/?\?editors)/g)[0]}).then(function(){constructLinks()}):3===projectType?Trello.get("/cards/"+trelloSlug+"?fields=desc",function(e){console.log(e.desc.match(/https:\/\/marketer.*/)),monLink=e.desc.match(/https:\/\/marketer.*/)[0]}).then(function(){constructLinks()}):constructLinks()})}var projectType=0,codepenId="",trelloSlug=document.location.search.match(/trelloSlug=([0-9a-z]+)/i)[1],trelloLink="https://trello.com/c/"+trelloSlug,trelloName="",monLink="",previewLink="",passoffLink="",whichBrand={},brands={famous:{name:"Famous",id:1,website:"www.famousfootwear.com",adminUrl:"{Undefined}"},naturalizer:{name:"Naturalizer",id:2,website:"www.naturalizer.com",adminUrl:"{Undefined}"},francosarto:{name:"Franco Sarto",id:3,website:"www.francosarto.com",adminUrl:"{Undefined}"},ryka:{name:"Ryka",id:4,website:"www.ryka.com",adminUrl:"https://admin.caleres.com/ContentAdmin/shopcontent.aspx?contentID=20022_Template_Header&siteId=20022"},carlos:{name:"Carlos",id:5,website:"www.carlosshoes.com",adminUrl:"https://admin.caleres.com/ContentAdmin/ShopContent.aspx?contentID=20007_Template_Header&siteId=20007"},scholls:{name:"Dr. Scholl's",id:6,website:"www.drschollsshoes.com",adminUrl:"https://admin.caleres.com/ContentAdmin/ShopContent.aspx?contentID=20010_sitewideBanner&siteId=20010"},fergie:{name:"Fergie",id:7,website:"www.fergieshoes.com",adminUrl:"https://admin.caleres.com/ContentAdmin/ShopContent.aspx?contentID=20013_Template_Header&siteId=20013"},lifestride:{name:"Life Stride",id:8,website:"www.lifestride.com",adminUrl:"https://admin.caleres.com/ContentAdmin/ShopContent.aspx?contentID=20004_Template_Header&siteId=20004"},viaspiga:{name:"Via Spiga",id:9,website:"www.viaspiga.com",adminUrl:"https://admin.caleres.com/ContentAdmin/ShopContent.aspx?contentID=99099_Template_SitewideBanner&siteId=99099"}};Trello.authorize({type:"popup",name:"L1 Passoff Application",scope:{read:!0,write:!0},expiration:"never",success:authenticationSuccess,error:authenticationFailure}),$("#cpButton").click(function(){document.execCommand("copy"),parent.postMessage("closeWindow","https://trello.com")});