let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let xCenter = canvas.width / 2;
let yCenter = canvas.height / 2;
let angle = 0;
let radius = yCenter * 0.95;
let playerArr = [];

let noSeg = 4; // Initial number of segments
document.getElementById("add").addEventListener('click', () => {
    noSeg++;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    circle();
    center();
    line();
    number();
});

document.getElementById("remove").addEventListener('click', () => {
    noSeg--;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    circle();
    center();
    line();
    number();
});

circle();
center();
line();
number();

// Draw circle
function circle() {
    ctx.beginPath();
    ctx.arc(xCenter, yCenter, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
}

//Draw center
function center() {
    ctx.beginPath();
    ctx.arc(xCenter, yCenter, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

//Draw number
function number() {
    ctx.beginPath();
    ctx.font = radius * 0.15 + "px Arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    // make array empty
    playerArr.length = 0;

    for (let num = 1; num <= noSeg; num++) {
        let ang = (num * Math.PI / (noSeg / 2 )) - (Math.PI / (noSeg / 4));
        let x = 150 + (radius * 0.85 * Math.cos(ang));
        let y = 150 + (radius * 0.85 * Math.sin(ang));
        ctx.fillText(num.toString(), x, y);
        // push all segments into array 
        playerArr.push(num);
    }
}

// //Draw line
function line(a = 150, b = 40) {
    ctx.beginPath();
    ctx.moveTo(xCenter, yCenter);
    ctx.lineTo(a, b);
    ctx.stroke();
    ctx.closePath();
}

// Click spin button to spin the line and stop randomly
let spinBtn = document.getElementById("spin");
spinBtn.addEventListener('click', () => {
    let spinInterval = setInterval(function () {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //Draw circle
        circle();
        //Draw center
        center();
        //Draw number
        number();

        let x = 150 + 105 * Math.sin(angle);
        let y = 150 - 105 * Math.cos(angle);
        //Draw line
        line(x, y);

        result();

        //Increment angle 
        angle += Math.PI / 100;

        // Stop spinning randomly
        if (Math.random() < 0.01) { // 1% chance of stopping on each spin
            clearInterval(spinInterval);
        }
    }, 10);
});

//Show result
function result() {
    //Degree per slice
    let degree = (Math.PI / noSeg) * 2;
    // degree = degree * (180 / Math.PI); //Change to degree
    let spinAngle = angle / degree;
    // spinAngle = spinAngle * (180 / Math.PI);
    let i = Math.floor(spinAngle);
    if (angle > Math.PI * 2) {
        angle = 0;
        i = 0;
    }
    let player = document.querySelector(".showPlayer");
    player.style.display = "block";
    player.innerHTML = "Player " + playerArr[i] + ": Truth or Dare?";
}