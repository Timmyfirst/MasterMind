//  CONSTANTES //
var combinaison = [];

var numeroligne = 1;

var colors = ["red", "yellow", "green", "blue", "orange", "white", "purple", "fuchsia"];

var changeC = [];

// Fonction d'initialisation
function init() {
  Generer();

  for (let j = 0; j <= 3; j++) {
    combinaison.push(colors[Math.floor(Math.random() * 8)]);
  }
}

// Fonction qui génère une nouvelle ligne
function Generer() {
  // On ajoute une ligne
  ajouteConteneur(numeroligne);
  // A laquelle on ajoute la div pour le set de couleur jouable
  ajouteLigne(numeroligne);
  // Et le bouton de validation
  ajouteVal(numeroligne);
  // Ajout des couleurs dans la div (les 4 boules à colorer)
  for (let j = 1; j <= 4; j++) {
      ajoutePion(j, numeroligne);
  }
}

// Fonction qui crée les pions à colorer
function ajoutePion(num, line) {
  var pion = 'pion' + line + num;
  var line = 'ligne' + line;
  maDiv = document.createElement("div");
  maDiv.id = pion;
  maDiv.className = 'pion';
  maDiv.style.backgroundColor = colors[0];
  document.getElementById(line).appendChild(maDiv);

  changeC[pion] = function(){
      changeColor(pion);
  };

  document.getElementById(pion).addEventListener('click', changeC[pion], false);
}

function ajouteConteneur(num) {
  var container = 'container' + num;
  maDiv = document.createElement("div");
  maDiv.id = container;
  maDiv.className = 'container';
  document.getElementById('jeu').appendChild(maDiv);
}

function ajouteLigne(num) {
  var line = 'ligne' + num;
  maDiv = document.createElement("div");
  maDiv.id = line;
  maDiv.className = 'ligne';
  document.getElementById('container'+num).appendChild(maDiv);
}

function ajouteVal(num) {
  var val = 'cline' + num;
  DivVal = document.createElement("div");
  DivVal.id = val;
  DivVal.className = 'val';
  document.getElementById('container'+num).appendChild(DivVal);
  console.log('div val ajouté');

  var btnval = 'val' + num;
  BtnVal = document.createElement("div");
  BtnVal.id = btnval;
  BtnVal.className = 'btnVal';
  document.getElementById(val).appendChild(BtnVal);

  Img = document.createElement("img");
  Img.src = 'ic_valid.png';
  Img.className = 'valid';
  document.getElementById(btnval).appendChild(Img);

  document.getElementById(btnval).addEventListener('click', function(e){
      valider(numeroligne);
    }, false);
}

function changeColor(id) {
  var nextColor = colors.indexOf(document.getElementById(id).style.backgroundColor) + 1;

  if (document.getElementById(id).style.backgroundColor == 'fuchsia') {
    document.getElementById(id).style.backgroundColor = 'red';
  }
  if (colors.indexOf(document.getElementById(id).style.backgroundColor) == -1) {
    document.getElementById(id).style.backgroundColor = colors[1];
  }
  else {
    document.getElementById(id).style.backgroundColor= colors[nextColor];
  }
}

function valider(numligne) {
  for (let j = 1; j <= 4; j++) {
    var pion = "pion" + numligne + j;
    document.getElementById(pion).removeEventListener('click', changeC[pion], false);
    console.log(pion);
  }
  result();
  if (comparer(numligne) == true) {
    alert('Tu as gagné ! Tu as mis ' + numeroligne + ' essais.');
  }
  else {
    if (numeroligne == 12) {
      alert('Tu as perdu, tu es nul(le) !');
    }
    else {
      numeroligne++;
      Generer();
    }
  }
}

function comparer(numligne) {
  var results= [];
  var test;
  for (let j = 1; j <= 4; j++) {
    var pion = "pion" + numligne + j;
    if (document.getElementById(pion).style.backgroundColor == combinaison[j-1]) {
      var rbBall = 'rb' + numligne + j;
      results.push(true);
      console.log(rbBall);
      document.getElementById(rbBall).style.backgroundColor = 'red';
    }
    else {
      var rbBallB = "rb" + numligne + j;
      for (let h = 1; h <= 4; h++) {
        if (document.getElementById(pion).style.backgroundColor == combinaison[h-1]) {
          document.getElementById(rbBallB).style.backgroundColor = 'white';
        }
      }
      if (document.getElementById(pion).style.backgroundColor == combinaison[j-1]) {

      }
      results.push(false);
    }
  }
  if (results[0] == true && results[1] == true && results[2] == true && results[3] == true) {
    return true;
  }
  else {
    return false;
  }
}

function result() {
  numligne = 'cline' + numeroligne;
  valnum = 'val' + numeroligne;
  parent = document.getElementById(numligne);
  enfant = document.getElementById(valnum);
  parent.removeChild(enfant);

  for (let j = 1; j <= 4; j++) {
    var rb = 'rb' + numeroligne + j;
    rbBall = document.createElement("div");
    rbBall.id = rb;
    rbBall.className = 'resultBall';
    document.getElementById(numligne).appendChild(rbBall);
  }
}
