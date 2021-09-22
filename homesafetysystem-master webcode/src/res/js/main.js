//set temperature message
const setTemparatureConditionMessage = (temp) => {
  if (temp >= 30) {
    $("#tempMessage").html("High temperature");
    $("#tempMessage").css("color", "#8b0000");
  } else if (temp >= 18 && temp < 30) {
    $("#tempMessage").html("Normal temperature");
    $("#tempMessage").css("color", "green");
  } else if (temp < 18) {
    $("#tempMessage").html("Low temperature");
    $("#tempMessage").css("color", "cornflowerblue");
  }
};
//set smoke message
const setSmokeConditionMessage = (smokeValue) => {
  if (smokeValue >= 1000) {
    $("#smokeMessage").html("Danger: fire detected");
    $("#smokeMessage").css("color", "#8b0000");
  } else if (smokeValue >= 150 && smokeValue < 1000) {
    $("#smokeMessage").html("Warning: Rising smoke levels detected");
    $("#smokeMessage").css("color", "#ff8c00");
  } else if (smokeValue > 50 && smokeValue < 150) {
    $("#smokeMessage").html("Warning: Smoke levels higher than normal levels");
    $("#smokeMessage").css("color", "#ff8c00");
  } else if (smokeValue < 50) {
    $("#smokeMessage").html("Normal Levels");
    $("#smokeMessage").css("color", "green");
  } else if (smokeValue < 0) {
    $("#smokeMessage").html("Smoke below 0");
    $("#smokeMessage").css("color", "rbg(0,0,0)");
  }
};

//set carbon monoxide condition message
const setCoConditionMessage = (coValue) => {
  if (coValue >= 50) {
    $("#coMessage").html("Danger: High levels of carbon monoxide");
    $("#coMessage").css("color", "#8b0000");
  } else if (coValue >= 30 && coValue < 50) {
    $("#coMessage").html("Warning: Rising carbon monoxide levels detected");
    $("#coMessage").css("color", "#ff8c00");
  } else if (coValue > 15 && coValue < 30) {
    $("#coMessage").html(
      "Warning: carbon monoxide is higher than normal levels"
    );
    $("#coMessage").css("color", "#ff8c00");
  } else if (coValue <= 15) {
    $("#coMessage").html("Normal Levels");
    $("#coMessage").css("color", "green");
  } else if (coValue < 0) {
    $("#coMessage").html("Carbon Monoxide below 0");
    $("#coMessage").css("color", "rgb(0,0,0)");
  }
};

//set lpg condition message
const setLpgConditionMessage = (lpgValue) => {
  if (lpgValue >= 195) {
    $("#lpgMessage").html("Danger: Gas Leakage");
    $("#lpgMessage").css("color", "#8b0000");
  } else if (lpgValue >= 120 && lpgValue < 195) {
    $("#lpgMessage").html("Warning: rising levels of LPG detected");
    $("#lpgMessage").css("color", "#ff8c00");
  } else if (lpgValue >= 50 && lpgValue < 120) {
    $("#lpgMessage").html("Warning: LPG levels are higher than normal values");
    $("#lpgMessage").css("color", "#ff8c00");
  } else if (lpgValue < 50) {
    $("#lpgMessage").html("Normal Levels");
    $("#lpgMessage").css("color", "green");
  } else if (lpgValue < 0) {         
    $("#lpgMessage").html("LPG below 0");
    $("#lpgMessage").css("color", "rgb(0,0,0)");
  }
};
//set home Card Data
const setCardData = (data) => {
  $("#lpgValue").html(data.lpg);
  $("#smokeValue").html(data.smoke);
  $("#coValue").html(data.carbonmonoxide);
  $("#tempValue").html(data.temp);

  for (const prop in data) {
    if (Object.hasOwnProperty.call(data, prop)) {
      data[prop] = parseInt(data[prop]);
    }
  }
  setTemparatureConditionMessage(data.temp);
  setSmokeConditionMessage(data.smoke);
  setCoConditionMessage(data.carbonmonoxide);
  setLpgConditionMessage(data.lpg);
};

//fetch card data from database
const fetchCardData = () => {
  $.ajax({
    method: "GET",
    url: "src/controllers/home/cardController.php",
    success: (res) => {
      setCardData(res.data[0]);
    },
  });
};
//logout user
const logoutUser = () => {
  $("#logoutButton").click(() => {
    $.ajax({
      url: "src/controllers/auth/logoutController.php",
      method: "get",
      success: () => {
        window.location = "login.php";
      },
    });
  });
};

const getLatestRecordFromDb = async () => {
  const data = await $.ajax({
    url: "src/controllers/home/getLatestRecordController.php",
    method: "get",
    success: (res) => res,
    error: (err) => {
      console.error(err);
    },
  });
  return data.data;
};

const addSensorValuesDataToDb = async (apiDate, apiData) => {
  const lastdbData = await getLatestRecordFromDb();
  const lastDbDate = new Date(lastdbData);

  $.ajax({
    url: "src/controllers/home/addSensorValuesController.php",
    method: "post",
    data: apiData,
    success: (res) => {
      JSON.stringify(res);
      console.log(res);
    },
    error: (err) => {
      console.error(err);
    },
  });
};

const getDataFromApi = async () => {
  const data = await $.ajax({
    url: "https://api.waziup.io/api/v2/devices/6017c842784524000682c6d8",
    method: "get",
    success: (res) => res,
    error: async (err) => {
      console.error(err);
    },
  });
  console.log(data);
  const apiData = {
    temp: data.sensors[0].value.value,
    lpg: data.sensors[1].value.value,
    co: data.sensors[3].value.value,
    smoke: data.sensors[2].value.value,
    apiDateModified: new Date(data.date_modified),
  };
  addSensorValuesDataToDb(apiData.apiDateModified, apiData);
};

$(document).ready(() => {
  //remove loader
  setTimeout(() => {
    $(".loader-container").css("display", "none");
  }, 1000);
  setInterval(() => {
    fetchCardData();
    getDataFromApi();
  }, 3000);

  //date
  const timeElapsed = Date.now();
  const todaysDate = new Date(timeElapsed).toDateString();
  $("#date").html(todaysDate);
  //logout ajax request user
  logoutUser();
});
