//GLOBAL VARIABLES
var projectType = 0;
var codepenId = "";
var trelloSlug = document.location.search.match(/trelloSlug=([0-9a-z]+)/i)[1];
var trelloLink = "https://trello.com/c/" + trelloSlug;
var trelloName = "";
var monLink = "";
var previewLink = "";
var passoffLink = "";
var whichBrand = {};
var brands = {
    famous: {
      name: "Famous",
      id: 1,
      website: "www.famousfootwear.com",
      adminUrl: "{Undefined}"
    },
    naturalizer: {
      name: "Naturalizer",
      id: 2,
      website: "www.naturalizer.com",
      adminUrl: "{Undefined}"
    },
    francosarto: {
      name: "Franco Sarto",
      id: 3,
      website: "www.francosarto.com",
      adminUrl: "{Undefined}"
    },
    ryka: {
      name: "Ryka",
      id: 4,
      website: "www.ryka.com",
      adminUrl: "https://admin.caleres.com/ContentAdmin/shopcontent.aspx?contentID=20022_Template_Header&siteId=20022"
    },
    carlos: {
      name: "Carlos",
      id: 5,
      website: "www.carlosshoes.com",
      adminUrl: "https://admin.caleres.com/ContentAdmin/ShopContent.aspx?contentID=20007_Template_Header&siteId=20007"
    },
    scholls: {
      name: "Dr. Scholl's",
      id: 6,
      website: "www.drschollsshoes.com",
      adminUrl: "https://admin.caleres.com/ContentAdmin/ShopContent.aspx?contentID=20010_sitewideBanner&siteId=20010"
    },
    fergie: {
      name: "Fergie",
      id: 7,
      website: "www.fergieshoes.com",
      adminUrl: "https://admin.caleres.com/ContentAdmin/ShopContent.aspx?contentID=20013_Template_Header&siteId=20013"
    },
    lifestride: {
      name: "Life Stride",
      id: 8,
      website: "www.lifestride.com",
      adminUrl: "https://admin.caleres.com/ContentAdmin/ShopContent.aspx?contentID=20004_Template_Header&siteId=20004"
    },
    viaspiga: {
      name: "Via Spiga",
      id: 9,
      website: "www.viaspiga.com",
      adminUrl: "https://admin.caleres.com/ContentAdmin/ShopContent.aspx?contentID=99099_Template_SitewideBanner&siteId=99099"
    }
  };

//FUNCTIONS
function setProject(selection) {
    projectType = selection;
}

function showWhich(selection) {
    var sel = window.getSelection();
    var range = document.createRange();
    $("#trelloName").html(trelloName);

    if (selection===0) {
      $("#showEmail .trelloLink").html(trelloLink);
      range.selectNodeContents(document.getElementById("showDefault"));
    } else {
      $("#showDefault").css("display","none");
    }

    if (selection===1) {
      $("#showEmail .previewLink").html(previewLink);
      $("#showEmail .passoffLink").html(passoffLink);
      $("#showEmail .trelloLink").html(trelloLink);
      $("#showEmail").css("display","block");
      range.selectNodeContents(document.getElementById("showEmail"));
    } else if (selection===2) {
      $("#showStg .previewLink").html(previewLink);
      $("#showStg .passoffLink").html(passoffLink);
      $("#showStg .adminUrl").html(whichBrand.adminUrl);
      $("#showStg .trelloLink").html(trelloLink);
      $("#showStg").css("display","block");
      range.selectNodeContents(document.getElementById("showStg"));
    } else if (selection===3) {
      $("#showMon .monLink").html(monLink);
      $("#showMon .trelloLink").html(trelloLink);
      $("#showMon").css("display","block");
      range.selectNodeContents(document.getElementById("showMon"));
    } else if (selection===4) {
      $("#showLogo .trelloLink").html(trelloLink);
      $("#showLogo").css("display","block");
      range.selectNodeContents(document.getElementById("showLogo"));
    }
    sel.removeAllRanges();
    sel.addRange(range);
}

function selectBrand(brand) {
    whichBrand = brand;
}

function authenticationSuccess() { 
    console.log("Successful Authentication");
    showInstructions();
}

function authenticationFailure() { 
  console.log("Failed authentication"); 
}

function constructLinks() {
  console.log("constructLinks has been run");
  switch (projectType) {
    case 1:
      previewLink = "http://www.codepen.io/bwswebdev/debug/" + codepenId;
      passoffLink = "http://www.codepen.io/bwswebdev/pen/" + codepenId + "?editors=1000";
      showWhich(projectType);
      break;
      case 2:
      previewLink = "http://stg." + whichBrand.website + "/en-US/Content/Dev_Asset_Previewer.aspx?codepenid=" + codepenId + "&locationid=header";
      if(whichBrand.name === "Dr. Scholl's") {
        previewLink = previewLink.replace('header','fixed-header');
      }
      if(whichBrand.name === "Via Spiga") {
        previewLink = previewLink.replace('header','tippyTopBanner');
      }
      passoffLink = "http://www.codepen.io/bwswebdev/pen/" + codepenId + "?editors=1000";
      showWhich(projectType);
      break;
    case 3:
    case 4:
      showWhich(projectType);
      break;
    default:
      console.log("nothing selected");
      showWhich(0);
      break;
  }
}

function showInstructions() {
    Trello.get("/cards/"+trelloSlug+"?fields=name,desc", function(data) {
        trelloName = data.name;
        var brandName = data.name.slice(6,10);
        console.log(data.name.slice(6,10));

        if(!/email|S1|S2|banner|logo/i.test(data.desc)) {
          console.log("Unable to verify type of asset. Showing default passoff");
        }
        var assetType = data.desc.match(/banner|S1|S2|email|logo/i)[0].toLowerCase();
        if(/https:\/\/marketer.*/.test(data.desc)) {
          assetType = 'banner';
        }

        switch(brandName) {
          case 'FAM':
            selectBrand(brands.famous);
            break;
          case 'NAT':
          case 'NCA':
            selectBrand(brands.naturalizer);
            break;
          case 'FRA':
            selectBrand(brands.francosarto);
            break;
          case 'RYK':
            selectBrand(brands.ryka);
            break;
          case 'CAR':
            selectBrand(brands.carlos);
            break;
          case 'DRS':
            selectBrand(brands.scholls);
            break;
          case 'FER':
            selectBrand(brands.fergie);
            break;
          case 'LIF':
            selectBrand(brands.lifestride);
            break;
          case 'VIA':
            selectBrand(brands.viaspiga);
            break;
        }

        switch(assetType) {
          case 'email':
          case 's1':
          case 's2':
            projectType = 1;
            break;
          case 'banner':
            if(brandName !== 'NAT' && brandName !== 'NCA') {
              projectType = 2;
            } else {
              projectType = 3;
            }
            break;
          case 'logo':
            projectType = 4;
            break;
        }
        console.log(brandName + " : " + assetType + " : " + projectType);
    })
    .then(function() {
      if(projectType !== 3 && projectType !== 4) {
        Trello.get("/cards/"+trelloSlug+"?actions=commentCard", function(data) {
          var codepenComment = data.actions.filter(function(item) {
          return /codepen\.io/g.test(item.data.text);
      });   
      console.log(codepenComment[0].data.text.match(/\w+(?=\/?\?editors)/g)[0]);
      codepenId = codepenComment[0].data.text.match(/\w+(?=\/?\?editors)/g)[0];
      })
        .then(function() {constructLinks();});
      } else if(projectType === 3) {
        Trello.get("/cards/"+trelloSlug+"?fields=desc", function(data) {
          console.log(data.desc.match(/https:\/\/marketer.*/));
          monLink = data.desc.match(/https:\/\/marketer.*/)[0];
        })
          .then(function() {constructLinks();});
      } else {
        constructLinks();
      }
    });
}


//MAIN CODE
Trello.authorize({
  type: "popup",
  name: "L1 Passoff Application",
  scope: {
    read: true,
    write: true },
  expiration: "never",
  success: authenticationSuccess,
  error: authenticationFailure
});

$("#cpButton").click(function() {
  document.execCommand("copy");
  parent.postMessage("closeWindow", "https://trello.com");
});







