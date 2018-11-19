var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    {
      path: '/about/',
      url: 'about.html',
    },
  ],
  // ... other parameters
});

var mainView = app.views.create('.view-main');


$("#about").click(function()
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
