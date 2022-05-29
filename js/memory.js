let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
//libreria per icone
//https://html-css-js.com/html/character-codes/




let arrayComparison = [];

document.body.onload = startGame();

// mi serviranno alcune variabili 1. interval 2. una agganciata alla classe find 
// 3. una agganciata al'id modal 4. una agganciata alla classe timer

var interval;
var modal = document.querySelector("#modal");
var timer = document.querySelector(".timer");
var iconsFind = document.getElementsByClassName("find");    //NON FUNZIONA CON QUERYSELECTOR










//una funzione che serve a mescolare in modo random gli elementi dell'array che viene passato 
// (l'array contiene le icone degli animali)
function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}
// una funzione che rimuove la classe active e chiama la funzione startGame()
function playAgain() {
  modal.classList.remove("active");
  startGame();
}
/* +IMPORTANTE DA LEZ VEN+: startGame RICHIAMA 1 FUNZIONE CHE PULISCE timer, RICHIAMA shuffle QUINDI 1 ALTRA FUNZIONE
*/

//___________________________________________________________________________________________________

// la funzione startGame che pulisce il timer, dichiara un array vuoto, mescola casualmente l'array degli animali
// (var arrayShuffle = shuffle(arrayAnimali);), aggancia il contenitore con id griglia, 
// pulisce tutti gli elementi che eventualmente contiene
// poi fa ciclo per creare i 24 div child -> aggiunge la class e l'elemento dell'array in base all'indice progressivo
// chiama la funzione timer e associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto

function startGame(){  
    clearInterval(interval);
    arrayComparison = [];
    var arrayShuffle = shuffle(arrayAnimali);
  
   let griglia = document.querySelector("#griglia");
     while (griglia.hasChildNodes()) {
     griglia.removeChild(griglia.firstChild);
    } 

     for(let i = 0; i < 24; i++) {    
        let box = document.createElement('div');
        let card = document.createElement('div');
        card.className = 'icon';
        document.querySelector('#griglia').appendChild(box).appendChild(card);
        card.innerHTML = arrayShuffle[i];
      }

    startTimer();
    let icon = document.getElementsByClassName("icon");     //NO querySelector
    let icons = [...icon];
  
    for (let i = 0; i < icons.length; i++){
      icons[i].addEventListener("click", displayIcon);
      icons[i].addEventListener("click", openModal);
    }
  }


//_________________________________________________________________

function displayIcon() {

    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];




    /*
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    è uguale a 
    var icons = document.getElementsByClassName("icon");
    //var icons = [...icon];
    è un operatore che serve per passare un array come argomento:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
    https://www.tutorialspoint.com/es6/es6_operators.htm (cerca spread nella pagina)
    */

    //mette/toglie la classe show
    this.classList.toggle("show");      //SI RIFERISCE ALL'OGGETTO CLICCATO, ALLA CARD CLICCATA: QUANDO CLICCHI SU CARTA this DIVENTA CARD CLICCATA E show LA MOSTRA
    //aggiunge l'oggetto su cui ha cliccato all'array del confronto
    arrayComparison.push(this);

    var len = arrayComparison.length;
    //se nel confronto ci sono due elementi
    if (len === 2) {
        //se sono uguali aggiunge la classe find
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison = [];
        } else {
            //altrimenti (ha sbagliato) aggiunge solo la classe disabled
            (arrayComparison[0].innerHTML !== arrayComparison[1].innerHTML)
            arrayComparison[0].classList.add("disabled");
            arrayComparison[1].classList.add("disabled");
            
/*             icons.forEach(function(item) {
                item.classList.add('disabled');       //HO DOVUTO LEVARE QUESTA E CAMBIARE COME SOPRA ALTRIMENTI NON MI FUNZIONA
            }); */


            // con il timeout rimuove  la classe show per nasconderli
            setTimeout(function() {
                arrayComparison[0].classList.remove("show");
                arrayComparison[1].classList.remove("show");
                icons.forEach(function (item) {
                item.classList.remove('disabled');
                  for (var i = 0; i < iconsFind.length; i++) {
                      iconsFind[i].classList.add("disabled");
                } 
                });
                arrayComparison = [];
            }, 700);
        }
    }
}

//_________________________________________________________________


//una funzione che viene mostrata alla fine quando sono tutte le risposte esatte
function openModal(){  
  if (iconsFind.length == 24){
      clearInterval(interval);
      modal.classList.add("active");
      document.querySelector("#tempoTrascorso").innerHTML = timer.innerHTML;
      startGame();
  }
}
// una funzione che nasconde la modale alla fine e riavvia il gioco
 function closeModal(){  
  closeicon.addEventListener("click", function(param){
      modal.classList.remove("active");
      startGame();
  });
} 
// una funzione che calcola il tempo e aggiorna il contenitore sotto
function startTimer(){
  var s = 0; 
  var m = 0;
  interval = setInterval(function(){
  timer.innerHTML = 'Tempo: ' + m + " min " + s + " sec";
    s++;
    if(s == 60){
      m++;
      s = 0;
    }
  },1000);
}