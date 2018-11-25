var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'GePoulpe',
  // App id
  id: 'gepoulpe',
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
var boolLocate = false;

if (EmptyDatabase() == 0) {
  console.log("database empty");
  getJsonFromDatabase();
}
else {
  console.log("database full");
}


$("#about").click(function () {
  alert("Ge-Poulpe");
}
);

$("#refresh").click(function () {
  PullDatabaseServe();
});

$("#sendCoords").click(function () {

  //console.log(boolLocate);

  if (boolLocate == false) {

    AffichePosition();
    console.log(tmpLat);
    setMarkerInDatabase(tmpLat, tmpLong, 1);

    let tmpText = $("#textInfo").val();
    let tmpName = $("#nameInfo").val();
    console.log(tmpText);
    setInfoInDatabase(tmpText, tmpName);

  }
  else {
    //console.log("manuel");
    let tmpText = $("#textInfo").val();
    let tmpName = $("#nameInfo").val();
    console.log(tmpText);
    setInfoInDatabase(tmpText, tmpName);

    let tmpLat = $("#latitude").val();
    let tmpLong = $("#longitude").val();
    console.log(tmpLat);
    setMarkerInDatabase(tmpLat, tmpLong, 1);


  }

});

$("#btnTab-1").click(function () {

  $("#latitude").val() = localStorage.getItem("latitude");
  $("#longitude").val() = localStorage.getItem("longitude");

});

$("#autolocate").click(function () {

  if (boolLocate == true) {
    $("#latitude").prop('disabled', true);
    $("#longitude").prop('disabled', true);
    boolLocate = !boolLocate;
  }
  else {
    $("#latitude").prop('disabled', false);
    $("#longitude").prop('disabled', false);
    boolLocate = !boolLocate;
  }
});


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
    date.getMonth() + 1,
    date.getDate(),
    date.getHours() + "h",
    date.getMinutes() + "m",
    date.getSeconds() + "s",
  ];
  alert(new Date(position.timestamp));
}


function DbTransaction(position, datetime) {

  db.transaction(function (tx) {
    tx.executeSql("INSERT INTO INFO (longitude,latitude,date) VALUES (" + position.coords.longitude + "," + position.coords.latitude + ",'" + datetime + "')");
  }
  );

}

function PullDatabaseServe(data) {
  $.getJSON("http://127.0.0.1", function () {
  }).done(function (data) {
    data[0].forEach(element => {
      console.log(element);
      setInfoInDatabase(element.text, element.name);
    });
  });

  $.getJSON("http://127.0.0.1", function () {
  }).done(function (data) {
    data[1].forEach(element => {
      setMarkerInDatabase(element.latitude, element.longitude, element.idInfo);
    });
  });
}

function getJsonFromDatabase() {
  $.getJSON("http://127.0.0.1", function (data) {
    return data;
  });
}

function EmptyDatabase() {
  let val = 0;
  db.transaction(function (tx) {
    tx.executeSql("SELECT count(idMarker) as number FROM marker", [], function (tx, reponse) {
      val = (reponse.rows.item(0)['number']) ? 1 : 0;
    }, null);
  }
  );
  return val;
}


function setMarkerInDatabase(latitude, longitude, idInfo) {
  let request = "INSERT INTO marker (latitude,longitude,idInfo) VALUES (?,?,?)";
  this.db.transaction(function (tx) {
    tx.executeSql(request, [latitude, longitude, idInfo]);
  });
}

function setInfoInDatabase(text, name) {
  let request = "INSERT INTO info (text,name) VALUES (?,?)";
  this.db.transaction(function (tx) {
    tx.executeSql(request, [text, name]);
  });
}


function getNameFromIdInfo(idInfo) {
  let request = "SELECT (text,name) FROM info WHERE idInfo = (?)";
  this.db.transaction(function (tx) {
    tx.executeSql(request, [idInfo]);
  });
}

function getAllLocalDatabase() {
  let val = [[], []];
  db.transaction(function (tx) {
    tx.executeSql("SELECT * FROM info", [], function (tx, reponse) {

      for (let i = 0; i < reponse.rows.length; i += 1) {
        val[0].push(reponse.rows.item(i));
      }
    }, null);
  }
  );


  db.transaction(function (tx) {
    tx.executeSql("SELECT * FROM marker", [], function (tx, reponse) {

      for (let i = 0; i < reponse.rows.length; i += 1) {
        val[1].push(reponse.rows.item(i));
      }

    }, null);
  }
  );
  return val;
}

function getAllLocalMarkerDatabase(value) {

  let val = [];

  db.transaction(function (tx) {
    tx.executeSql("SELECT * FROM marker", [], function (tx, reponse) {

      for (let i = 0; i < reponse.rows.length; i += 1) {
        val.push(reponse.rows.item(i));
      }
      return val;

    }, null);
  }
  );

}


function getInfoFromId(idInfo) {
  let val = 0;
  let request = "SELECT text FROM info WHERE idInfo = (?)";
  db.transaction(function (tx) {
    tx.executeSql(request, [idInfo], function (tx, reponse) {
      val = reponse;
    }, null);
  }
  );

  return val;
}


function getNumberOfMarker() {
  let val = 0;
  db.transaction(function (tx) {
    tx.executeSql("SELECT count(*) as number FROM marker", [], function (tx, reponse) {
      val = reponse.rows.length;
    }, null);
  }
  );
  return val;
}
