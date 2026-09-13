const ummahApiKey = "umh_2b52c986447e952be4d61a6fa6d835aba4191c4d";
const apiUrl = `https://ummahapi.com/api/asma-ul-husna?apikey=${ummahApiKey}`;

const arTitle = document.getElementById("ar-title");
const enTitle = document.getElementById("en-title");
const desc = document.getElementById("desc");

const arabic = document.getElementById("arabic");
const english = document.getElementById("english");
const meaning = document.getElementById("meaning");

const previous = document.getElementById("previous");
const next = document.getElementById("next");
const play = document.getElementById("play");

const counter = document.getElementById("current-number");
const total = document.getElementById("total-number");

const progressBar = document.querySelector(".progress-bar");

let names = [];
let currentIndex = 0;

let slideShow;

async function fetchNames(){

    try{

        const response = await fetch(apiUrl);

        const result = await response.json();

        if(!response.ok){

            throw new Error("Unable to fetch API");

        }

        arTitle.textContent = result.data.arabic_title;
        enTitle.textContent = result.data.english_title;
        desc.textContent = result.data.description;

        names = result.data.names;

        total.textContent = names.length;

        showName();

        startSlideShow();

    }

    catch(error){

        console.log(error);

    }

}

function showName(){

    arabic.textContent = names[currentIndex].arabic;

    english.textContent = names[currentIndex].english;

    meaning.textContent = names[currentIndex].meaning;

    counter.textContent = currentIndex + 1;

}

next.onclick = ()=>{

    currentIndex++;

    if(currentIndex >= names.length){

        currentIndex = 0;

    }

    showName();

}

previous.onclick = ()=>{

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = names.length - 1;

    }

    showName();

}

function startSlideShow(){

    slideShow = setInterval(()=>{

        currentIndex++;

        if(currentIndex >= names.length){

            currentIndex = 0;

        }

        showName();

    },3000);

}

fetchNames();
document.addEventListener("keydown", function(event){

    if(event.ctrlKey && event.key.toLowerCase() === "u"){

        event.preventDefault();

        alert("Viewing source is disabled.");

    }

});
document.addEventListener("contextmenu", function(event){

    event.preventDefault();

});
document.addEventListener("keydown", function(event){

    if(event.key === "F12"){

        event.preventDefault();

    }

    if(event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "i"){

        event.preventDefault();

    }

});