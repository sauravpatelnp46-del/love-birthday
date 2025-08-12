const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];
for(let i=0; i<200; i++){
    confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 2,
        d: Math.random() * 10 + 10,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`
    });
}

function drawConfetti(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
        ctx.beginPath();
        ctx.fillStyle = c.color;
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();
    });
    updateConfetti();
}

function updateConfetti(){
    confetti.forEach(c => {
        c.y += Math.cos(c.d) + 1;
        c.x += Math.sin(c.d);
        if(c.y > canvas.height){
            c.y = -10;
            c.x = Math.random() * canvas.width;
        }
    });
}

setInterval(drawConfetti, 20);
