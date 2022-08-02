const $ = (s) => document.querySelector(s);

let difficulty = "easy";

window.onload = function () {
  lolstartannouncer();
  randomberakjaakepeketatablazatba();
  randomberakjaakepeketatablazatbamarmegint();
}
function lolstartannouncer() {
  var audio = new Audio('img/Welcome_Rift.mp3');
  audio.volume = 0.1;
  audio.play();
}

let johelyen = 0;
function gyozelem() {
  $("#all").style.display = "block";
  $("#video").style.display = "block";
  $("#newgame").style.display = "block";

  setTimeout(function () {
        window.location.replace("index.html");
    }, 15000);
}

function haasikergarantalt() {
  johelyen++;
  if (johelyen == 8) {
    var audio2 = new Audio('img/Victory.mp3');
    audio2.volume = 0.1;
    audio2.play();
    gyozelem();
  }
}

function randomberakjaakepeketatablazatba() {
  let randomkep;
  let jatekostabla = $('#first');
  let simatabla = "";

  for (let i = 0; i < 3; i++) {
    simatabla += "<tr>";
    for (let j = 0; j < 3; j++) {
      simatabla += "<td>";
      let valid = false;
      let alreadyUsed = false;
      randomkep = randompic();
      if (randomkep == 9) {
        simatabla += `<img src="img/ran9.png" id="ran${randomkep}">`;
      } else {
        simatabla += `<img src="img/ran${randomkep}bw.png" class="dropzone" id="ran${randomkep}">`;
      }
      simatabla += "</td>";
    }
    simatabla += "</tr>";
  }
  jatekostabla.innerHTML += simatabla;
}

function randomberakjaakepeketatablazatbamarmegint() {
  let randomkep;
  let jatekostabla = $('#second');
  let simatabla = "";

  for (let i = 0; i < 3; i++) {
    simatabla += "<tr>";
    for (let j = 0; j < 3; j++) {
      simatabla += "<td>";
      let valid = false;
      let alreadyUsed = false;
      randomkep = randompicpic();
      if (randomkep == 9) {

      } else {
        simatabla += `<img src="img/ran${randomkep}.png" class="draggable" id="ran${randomkep}">`;
      }
      simatabla += "</td>";
    }
    simatabla += "</tr>";
  }
  jatekostabla.innerHTML += simatabla;
}

let tombneve = [];

function randompic() {
  let voltegykep = false;
  let megegykep;
  let noname = false;
  while (!voltegykep) {
    noname = false;
    megegykep = Math.floor(Math.random() * 9) + 1;

    for (let i = 0; i < tombneve.length; i++) {
      if (tombneve[i] == megegykep) {
        noname = true;
      }
    }
    if (!noname) {
      voltegykep = true;
      tombneve.push(megegykep);
    }
  }
  return megegykep;
}

let marmegintegytomb = [];

function randompicpic() {
  let voltegykep = false;
  let megegykep;
  let noname = false;
  while (!voltegykep) {
    noname = false;
    megegykep = Math.floor(Math.random() * 9) + 1;

    for (let i = 0; i < marmegintegytomb.length; i++) {
      if (marmegintegytomb[i] == megegykep) {
        noname = true;
      }
    }
    if (!noname) {
      voltegykep = true;
      marmegintegytomb.push(megegykep);
    }
  }
  return megegykep;
}

function delegate(parent, type, selector, fn) {

  function delegatedFunction(e) {
    if (e.target.matches(`${selector},${selector} *`)) {
      let target = e.target;
      while (!target.matches(selector)) {
        target = target.parentNode;
      }
      e.delegatedTarget = target;
      return fn(e);
    }
  }

  parent.addEventListener(type, delegatedFunction, false);
}

const container = document.querySelector('#container');
const header = document.querySelector('#header');
let activeDropZone;

delegate(container, 'pointerdown', '.draggable', onPointerDown);
delegate(container, 'pointermove', '.draggable', onPointerMove);
delegate(container, 'pointerup', '.draggable', onPointerUp);

function onPointerDown(e) {
  container.classList.add('dragging');
  e.target.classList.add('active');
  e.target.setPointerCapture(e.pointerId);
}

function onPointerMove(e) {
  e.preventDefault();
  if (e.target.hasPointerCapture(e.pointerId)) {
    const { clientX: x, clientY: y } = e;
    const element = document.elementFromPoint(x, y);

    if (element.matches('.dropzone')) {
      if (!activeDropZone) {
        activeDropZone = element;
        element.classList.add('active');
      }
      else if (element != activeDropZone) {
        activeDropZone.classList.remove('active');
        activeDropZone = element;
        element.classList.add('active');
      }
    }
    else {
      if (activeDropZone) {
        activeDropZone.classList.remove('active');
        activeDropZone = undefined;
      }
    }
    e.target.style.left = `${x - e.target.offsetWidth / 2}px`;
    e.target.style.top = `${y - e.target.offsetHeight / 2}px`;
  }
}

function onPointerUp(e) {
  let ix = e.clientX;
  let ipszilon = e.clientY;
  let egerfole = document.elementFromPoint(ix, ipszilon);
  container.classList.remove('dragging');
  if (activeDropZone) {
    if (egerfole.id == e.target.id && difficulty == "easy") {
      activeDropZone.appendChild(e.target);
      console.log(activeDropZone.id);
      activeDropZone.parentNode.innerHTML = `<img id="${activeDropZone.id}" src="img/${activeDropZone.id}.png">`;
      activeDropZone.classList.remove('active');
      activeDropZone.classList.remove('dropzone');
      activeDropZone = undefined;
      haasikergarantalt();
    }

    if (egerfole.id == e.target.id && difficulty == "hard") {
      activeDropZone.appendChild(e.target);
      console.log(activeDropZone.id);
      activeDropZone.parentNode.innerHTML = `<img id="${activeDropZone.id}" src="img/${activeDropZone.id}.png">`;
      activeDropZone.classList.remove('active');
      activeDropZone.classList.remove('dropzone');
      activeDropZone = undefined;
      haasikergarantalthrd();
    }

    if (egerfole.id != e.target.id && difficulty == "hard") {
      activeDropZone.appendChild(e.target);
      activeDropZone.parentNode.innerHTML = `<img id="${activeDropZone.id}" src="img/${e.target.id}.png">`;
      activeDropZone.classList.remove('active');
      activeDropZone.classList.remove('dropzone');
      activeDropZone = undefined;
      haasikergarantalthrd();
    }
  }
  e.target.classList.remove('active');
}

let elhelyezett = 0;

function haasikergarantalthrd() {
  let valtozo1 = $("#ran1");
  let valtozo2 = $("#ran2");
  let valtozo3 = $("#ran3");
  let valtozo4 = $("#ran4");
  let valtozo5 = $("#ran5");
  let valtozo6 = $("#ran6");
  let valtozo7 = $("#ran7");
  let valtozo8 = $("#ran8");
  console.log(valtozo1.getAttribute("src"));
  elhelyezett++;
  if (valtozo1.getAttribute("src") == "img/ran1.png" && valtozo2.getAttribute("src") == "img/ran2.png" && valtozo3.getAttribute("src") == "img/ran3.png" && valtozo4.getAttribute("src") == "img/ran4.png" &&
    valtozo5.getAttribute("src") == "img/ran5.png" && valtozo6.getAttribute("src") == "img/ran6.png" && valtozo7.getAttribute("src") == "img/ran7.png" && valtozo8.getAttribute("src") == "img/ran8.png") {
    var audio2 = new Audio('img/Victory.mp3');
    audio2.volume = 0.1;
    audio2.play();
    gyozelem();
  }
  else {
    if (elhelyezett == 8) {
      let second = $("#second");
      second.innerHTML = "<table>";
      for (let i = 0; i < 8; i++) {
        let segged = $(`#ran${i+1}`);
        console.log(segged);
        if (segged.getAttribute("src") != `img/ran${i + 1}.png`) {
          segged.src = `img/ran${i + 1}bw.png`;
          segged.className = "dropzone";
          second.innerHTML += `<tr><td><img src="img/ran${i + 1}.png" class="draggable" id="ran${i + 1}"></td></tr>`;
          
          elhelyezett--;
        }        
      }
      second.innerHTML += "</table>";
    }
  }
}

document.addEventListener('click', function (e) {
  if (e.target.id == "easy") {
    difficulty = "easy";
    $("#stage").style.display = "none";
    console.log("asfa");
  }

  if (e.target.id == "hard") {
    difficulty = "hard";
    $("#stage").style.display = "none";
  }
});