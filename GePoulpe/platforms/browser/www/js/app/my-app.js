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
	{
      path: '/settings/',
      url: 'settings.html',
    },
	{
      path: '/marker/',
      url: 'marker.html',
    },
    {
      path: '/home/',
      url: 'index.html',
    },
  ],
  // ... other parameters
});

var mainView = app.views.create('.view-main');


console.log("Check database");
if(EmptyDatabase()==0)
{
  console.log("database empty");
  getJsonFromDatabase();
}
else
{
  console.log("database full");
}


$("#about").click(function()
{
  alert("Ge-Poulpe");
}
);

$("#refresh").click(function()
{
  $.getJSON("htp://127.0.0.1",function()
  {
    console.log("json");
  }).done(function(data)
  {
    data.forEach(element => {
      console.log(element);
    });
  });
});


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

function PullJSONtoDatabaseServe(data)
{
  for (let i = 0; i < data.length;i+=1)
  {
    
  }
}

function getJsonFromDatabase()
{
  $.getJSON("http://127.0.0.1",function(data){
    return data;
  });
}

function EmptyDatabase()
{
  let val = 0;
  db.transaction(function (tx)
  {
    tx.executeSql("SELECT count(idMarker) as number FROM marker", [], function(tx, reponse){
        val = (reponse.rows.item(0)['number']) ? 1: 0;
    }, null);
  }
  );
  return val
}
