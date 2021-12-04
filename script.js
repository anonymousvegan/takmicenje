"use strict"
const dugme = document.querySelector("#pretraga_ikona");
dugme.addEventListener("click", proveri);
function proveri(){
  document.querySelector("#ts").style.display="block";
  let grad = document.querySelector("#pretraga").value;
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
      let json_podaci = this.responseText;
      let rezultat = JSON.parse(json_podaci);
      const greska = document.querySelector(".alert");
      if(rezultat.status === 'error' ){
        greska.style.display = "block";
      }
      else{
        greska.style.display = "none";
        let res= rezultat.data;
        document.querySelector("#grad_out").innerHTML = res.city.name;
        document.querySelector("#ispis_aqi").innerHTML = res.aqi;
        document.querySelector("#ispis").style.display = "block";
        let strelica = "" + res.aqi / 3 + "%"
        document.querySelector("#l").style.left =  strelica;
        console.log(res)
        let o3 = document.querySelectorAll("#o3 td");
        o3[0].innerHTML = "Ozon";
        o3[1].innerHTML = res.forecast.daily.o3[0].min;
        o3[2].innerHTML = res.forecast.daily.o3[0].avg;  
        o3[3].innerHTML = res.forecast.daily.o3[0].max; 
        let p10 = document.querySelectorAll("#p10 td");
        p10[0].innerHTML = "pm10";
        p10[1].innerHTML = res.forecast.daily.pm10[0].min;
        p10[2].innerHTML = res.forecast.daily.pm10[0].avg;
        p10[3].innerHTML = res.forecast.daily.pm10[0].max;
        let p25 = document.querySelectorAll("#p25 td");
        p25[0].innerHTML = "pm25";
        p25[1].innerHTML = res.forecast.daily.pm25[0].min;
        p25[2].innerHTML = res.forecast.daily.pm25[0].avg;
        p25[3].innerHTML = res.forecast.daily.uvi[0].max;
        p25[0].innerHTML = "pm25";
        let uvi = document.querySelectorAll("#uvi td");
        uvi[0].innerHTML = "uvi";
        uvi[1].innerHTML = res.forecast.daily.uvi[0].min;
        uvi[2].innerHTML = res.forecast.daily.uvi[0].avg;
        uvi[3].innerHTML = res.forecast.daily.uvi[0].max;
      }
    }
    let req = "https://api.waqi.info/feed/"+grad+"/?token=30154d22b95dcf63cba0705fc096271f288d073b ";
  xhttp.open("GET", req, true);
  xhttp.send();
}

function plusDivs(n) {
  showDivs(slideIndex += n);
}

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
const node=document.getElementById("pretraga");
node.addEventListener("keyup",function(event){
  if(event.key=="Enter"){
    proveri()
  }
})