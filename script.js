var RWord;
var z;
var q;
var k;
var mySound;
var right;
var result;
var CrImg;
var CrMenu = document.createElement("div");
document.body.appendChild(CrMenu);
CrMenu.id="menu";
var logo = document.createElement("h1");
CrMenu.appendChild(logo);
var TL="lingo";
logo.innerText=TL;
var button = document.createElement("input");
CrMenu.appendChild(button);
button.type=button.name="button";;
button.value=button.id="start";
button.onclick=lingo;

function lingo(){
	CrMenu.remove();
	var CrLingo = document.createElement("div");  //Ik creeër het element div
	document.body.appendChild(CrLingo);           //Ik voeg die toe aan het html bestand;
	CrLingo.setAttribute("id", "lingo");       //Ik voeg de class lingo to aan het gemaakte bestand
	var time = 30;
	var clock = document.createElement("h2");
	CrLingo.appendChild(clock);
	var colors = ["red", "orange", "yellow", "green", "blue"];
	for (var i = 0; i < 2; i++) {
		var CrUL = document.createElement("ul");
		CrLingo.appendChild(CrUL);
		CrUL.id="UL"+i;
		for (var x = 0; x < TL.length; x++) {
			var CrLI = document.createElement("li");
			CrUL.appendChild(CrLI);
			var resTL = TL.toUpperCase();
			CrLI.innerText=resTL[x];
			CrLI.style.color=colors[x];
		}
	}
	/*for (var i = 0; i < 2; i++) {
		var CrDImg = document.createElement("img");
		CrLingo.appendChild(CrDImg);
		CrDImg.src="denker.png";
	}*/
	clock.innerText = "tijd: " + time;
	clock.id="clock";
	var CrBox = document.createElement("div");
	CrLingo.appendChild(CrBox);                   //Ik voeg een div element toe aan het div element gemaakt met CrLingo
	CrBox.setAttribute("class", "BLingo");        //Met setAttribute wordt er een attribute toegevoegd aan het element gemaakt met CrBox, in dit geval een class met de naam BLingo
	var CrLB;
	var IW = document.createElement("div");
	CrLingo.appendChild(IW);
	IW.setAttribute("class", "IW");
	var CrInput = document.createElement("input");
	IW.appendChild(CrInput);
	CrInput.type = "text";
	CrInput.name = "text";
	CrInput.id="InputA";
	var answer;
	var CrButton = document.createElement("input");
	IW.appendChild(CrButton);
	CrButton.type = "button";                    //Met type  ik van de input element gemaakt met CrButton in een soort button element
	CrButton.name = "button";
	CrButton.value = "CHECK";
	CrButton.onclick = check;                    //Met onclick ik zorg ik ervoor dat de functie check word uitgevoerd als er op het element gemaakt door CrButton word geklikt

	for (var i = 0; i < 5; i++) {               //Ik maak een div bestand 5 keer, voeg elke toe aan het div element gemaakt met CrBox en geef ze elk de class letters
		CrRow = document.createElement("div");
		CrBox.appendChild(CrRow);
		CrRow.setAttribute("class", "row");
		for (var x = 0; x < 5; x++) {               
			CrLB = document.createElement("div");
			CrRow.appendChild(CrLB);
			CrLB.setAttribute("class", "letters");
		}
	}

	RWord=words[Math.floor(Math.random()*words.length)];
	var letters = document.getElementsByClassName("letters");
	letters[0].innerText=RWord[0];
	letters[0].style.backgroundColor = "green";

	var row = document.getElementsByClassName("row");

	var WArray;

	var points;
	var chances = 0;

	var EI = setInterval(timer, 1000);

	function check() {
		WArray = RWord.split('');                                 //Met .split('') worden de letters in RWord opgesplitst en opgeslagen als een array in WArray
		/*for (var i = 0; i < RWord.length; i++) {
			WArray.push(RWord[i])
		}*/
		right=[];
		time = 30;
		points = 0;
		q = 0

		CrButton.onclick=undefined;
		answer = CrInput.value;

		for (var i = 0; i < WArray.length; i++) {                  //Met for herhaal ik codes zolang er wordt voldaan aan een bepaalde voorwaarde.
			                                                       //In dit geval, zolang i kleiner (<) is dan WArray.length. Met .length wordt er
			                                                       //gekeken hoeveel indexen WArray heeft.
			row[chances].getElementsByClassName("letters")[i].innerText = answer[i];
			row[chances].getElementsByClassName("letters")[i].style.backgroundColor = "white";
		}
		clearInterval(EI);
		EI = setInterval(checkRP, 500);
	}
	function checkRP(){
		if (answer[q]==WArray[q]) {   //met if wordt de code tussen de braken uitgevoerd als er wordt voldaan aan de functies tussen de haakjes
									  //In dit geval, of answer[q] gelijk is aan WArray[q]. De q is eerder aangegeven als 0. De cijfer dat tussen de
									  //blokhaakjes staat geeft aan welke letter er wordt gebruikt. Des te hoger de cijfer, des te later de letter voorkomt
									  //Het begint bij 0.
			mySound = undefined;
			mySound = new Audio("correct.wav");
			mySound.play();
			row[chances].getElementsByClassName("letters")[q].style.backgroundColor = "green";
			row[chances].getElementsByClassName("letters")[q].style.borderRadius = "0px";
			right.push(answer[q]);
			delete WArray[q];
			points++;
		}
		q++;
		if (q==5) {
			q=0;
			clearInterval(EI);
			EI = setInterval(checkRL, 500);
			if (points==5) {
				outcome();
			}
		}
	}
	function checkRL(){
		z = WArray.indexOf(answer[q]);
		if (z>=0 && row[chances].getElementsByClassName("letters")[q].style.backgroundColor != "green") {
			mySound = undefined;
			mySound = new Audio("almost.wav");
			mySound.play();
			right.push(answer[q]);
			delete WArray[z];
			row[chances].getElementsByClassName("letters")[q].style.backgroundColor = "yellow";
			row[chances].getElementsByClassName("letters")[q].style.borderRadius = "20px";
		}
		q++;
		if (q==5) {
			q=0;
			clearInterval(EI);
			EI = setInterval(checkNot, 500);
		}
	}

	function checkNot(){
		if (row[chances].getElementsByClassName("letters")[q].style.backgroundColor == "white") {
			mySound = undefined;
			mySound = new Audio("not.wav");
			mySound.play();
			row[chances].getElementsByClassName("letters")[q].style.backgroundColor = "red";
			row[chances].getElementsByClassName("letters")[q].style.borderRadius = "0px";
		}
		q++;
		if (q==5) {
			q=0;
			chances++;                               //Met ++ verhoog ik het getal toegevoegd aan de variabele chances met 1 elke keer dat de functie check word uitgevoerd			
			clearInterval(EI);
			CrButton.onclick=check;
			EI = setInterval(timer, 1000);
			if (chances==5) {
				outcome();
			}
		}
	}
	function outcome(){
		CrLingo.remove();
		CrMenu = document.createElement("div");
		document.body.appendChild(CrMenu);
		CrMenu.id="menu";
		CrMenu.style.width="400px";
		result = document.createElement("h1");
		CrMenu.appendChild(result);
		result.id="outcomeL"
		result.style.fontSize="100px";
		button = document.createElement("input");
		CrMenu.appendChild(button);
		button.type=button.name="button";
		button.id=button.value="start";
		button.onclick=lingo;
		CrImg = document.createElement("img");
		CrMenu.appendChild(CrImg);
		CrImg.id="emoji";
		clearInterval(EI);
		if (points==5) {
			result.innerText="gewonnen";
			CrImg.src = "smiley.jpg";
			CrImg.alt="smiley";
		}
		else if (chances==5) {
			var rightW = document.createElement("h2");
			CrMenu.appendChild(rightW);
			rightW.id="answerL";
			result.innerText="verloren";
			rightW.innerText="Het correcte woord is: " + RWord;
			CrImg.src = "huilen.jpg";
			CrImg.alt="huilen";
		}
	}
	function timer(){
		time--
		clock.innerText = "tijd: " + time;
		if (time==0) {
			chances=5;
			outcome();
		}
	}
}


