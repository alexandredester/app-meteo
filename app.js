const weatherIcons = {
  "Rain": "wi wi-day-rain",
  "Clouds": "wi wi-day-cloudy",
  "Clear": "wi wi-day-sunny",
  "Snow": "wi wi-day-snow",
  "mist": "wi wi-day-fog",
  "Drizzle" : "wi wi-day-sleet",

}
const ip = 'votre adresse IP';
const access_key = '12a309b811b38ccf858839590a5f371a'; 

function capitalize(str){
  return str[0].toUpperCase()+ str.slice(1);
}

async function main(WithIP = true){

  if(WithIP){
    const ip = await fetch('https://api.ipify.org?format=json')
    .then(resultat => resultat.json())
    .then(json =>json.ip); 
   
      ville = await fetch("http://api.ipstack.com/json/' + ip + '?access_key=' + access_key")
      .then(resultat => resultat.json())
      .then(json => json.city); 
        
  }else{
   ville = document.querySelector('#ville').textContent;
  }
  
      const meteo = await fetch('http://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=33119b4a3fa1ad278805578d27ea15de&lang=fr&units=metric')
      .then(resultat => resultat.json())
      .then(json => json)
       
   
 displayWeatherInfos(meteo)
  console.log(ville);

}



function displayWeatherInfos(data){
  const name = data.name;
  const temperature = data.main.temp;
  const conditions = data.weather[0].main;
  const description = data.weather[0].description;

  document.querySelector('#ville').textContent = name;
  document.querySelector('#temperature').textContent = Math.round(temperature);
  document.querySelector('#condition').textContent = capitalize(description);
  document.querySelector('i.wi').className = weatherIcons[conditions];
  document.body.className = conditions.toLowerCase();

}


// const ville = document.querySelector('#ville');

// ville.addEventListener('click', () =>{
//   ville.contentEditable = true;
// });

// ville.addEventListener('keydown', (e) =>{
//   if (e.keyCode === 13) {
//     e.preventDefault();
//     ville.contentEditable = false;
//     main(false);
//   }
// });

main();