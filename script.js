function getWeather() {
  let city = document.getElementById("city").value;
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  fetch(`https://kksharma.free.nf/backend.php?city=${city}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        document.getElementById("error").innerText = data.error;
        document.getElementById("weather-result").innerHTML = "";
        document.getElementById("forecast-result").innerHTML = "";
      } else {
        document.getElementById("error").innerText = "";
        document.getElementById("weather-result").innerHTML = `
                    <h2>${data.city}</h2>
                    <p>Temperature: ${data.temperature}°C</p>
                    <p>Humidity: ${data.humidity}%</p>
                    <p>Weather: ${data.description}</p>`;
        let forecastHtml = "<h3>5-Day Forecast</h3>";
        data.forecast.forEach((day) => {
          forecastHtml += `<p>${day.date}: ${day.temp}°C - ${day.desc}</p>`;
        });
        document.getElementById("forecast-result").innerHTML = forecastHtml;
      }
    })
    .catch((err) => {
      console.error("Error fetching weather:", err);
      document.getElementById("error").innerText =
        "Failed to fetch weather data.";
    });
}
