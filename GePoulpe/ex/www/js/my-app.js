// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    //myApp.alert('Here comes About page');
})


$$("#about").click(function()
{
  alert("Ge-Poulpe");
}
);

//setInterval(AffichePosition, 1000);


function AffichePosition() {
  if (navigator.geolocation) {
    let tmp = navigator.geolocation.getCurrentPosition(getPosition);
    return tmp;
  }
}


function getPosition(position) {
  alert(position);
  //sessionStorage
  localStorage.setItem("latitude", position.coords.latitude);
  localStorage.setItem("longitude", position.coords.longitude);
  date = new Date(position.timestamp), datevalues = [
    date.getFullYear(),
    date.getMonth()+1,
    date.getDate(),
    date.getHours()+ "h",
    date.getMinutes()+ "m",
    date.getSeconds() + "s",
  ];
  alert(new Date(position.timestamp));
  //localStorage.setItem("Time",datevalues);
}


function DbTransaction(position,datetime)
{

  db.transaction(function (tx)
  {
    tx.executeSql("INSERT INTO INFO (longitude,latitude,date) VALUES (" + position.coords.longitude +"," + position.coords.latitude +",'" + datetime + "')");
  }
);

}


function GetJsonOnServe()
{


}

function PullDatabaseServe(data)
{
  for(let i = 0;i < data.length;i+=1)
  {
    db.transaction(function (tx)
    {
      tx.executeSql("INSERT INTO Marker (latitude,longitude,idInfo,idUser) VALUES (" + data[0] +"," + data[1] +"," + data[2] + "," +  data[3] + "')");
    });
  }

}
