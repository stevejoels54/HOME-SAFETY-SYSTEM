const setChart = (xAxis, yAxis) => {
  const { temperature , smoke , lpg , carbonmonoxide } = yAxis;
  const ctx = document.getElementById('charts').getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: xAxis,
      datasets: [
        {
          label: temperature.label,
          data: temperature.temperatureYAxis,
          borderColor: temperature.borderColor,
          borderWidth: 2,
        },
        {
          label: smoke.label,
          data: smoke.smokeYAxis,
          borderColor: smoke.borderColor,
          borderWidth: 2,
        },
        {
          label: lpg.label,
          data: lpg.lpgYAxis,
          borderColor: lpg.borderColor,
          borderWidth: 2,
        },
        {
          label: carbonmonoxide.label,
          data: carbonmonoxide.carbonmonoxideYAxis,
          borderColor: carbonmonoxide.borderColor,
          borderWidth: 2,
        }
      ], //
    },
    options: {
      animation: {
        duration: 0, // general animation time
      },
      hover: {
        animationDuration: 0, // duration of animations when hovering an item
      },
      responsiveAnimationDuration: 0, // animation duration after a resize
    },
  });
};

const fetchChartData = () => {
 //create empty arrays so that they are refreshed evefry time a request to the server is made
  const timeXAxisArray = [];
  const temperatureArray = [];
  const lpgArray = [];
  const carbonmonoxideArray = [];
  const smokeArray = [];
//send an ajax request to controller to query db fo chart data
  $.ajax({
    url: "src/controllers/home/chartController.php",
    method: "Get",
    success: (res) => {
      //push response from chart controller to individual arrays 
      res.forEach((e) => {
        const time = new Date(e.date);
        timeXAxisArray.push(time.toLocaleTimeString());
        temperatureArray.push(e.temp);
        lpgArray.push(e.lpg);
        carbonmonoxideArray.push(e.carbonmonoxide);
        smokeArray.push(e.smoke);
      });
      //chart configuartion 
      const chartsYAxis = {
        temperature: {
          temperatureYAxis:temperatureArray,
          label:'Temperature',
          borderColor:'#8b0000'
        },
        smoke: {
          smokeYAxis:smokeArray,
          label:'Smoke',
          borderColor:'rgba(0,0,0)'
        },
        lpg: {
          lpgYAxis: lpgArray,
          label: 'LPG',
          borderColor:'cornflowerblue'
        },
        carbonmonoxide: {
          carbonmonoxideYAxis: carbonmonoxideArray,
          label:'Carbon monoxide',
          borderColor:'gray'
        }
      }
      //set chart data
      setChart(timeXAxisArray, chartsYAxis);
    },
    error: (err) => {
      console.log(err);
    },
  });
};

$(document).ready(() => {
  setInterval(() => {
    fetchChartData();
  }, 3000);
});
