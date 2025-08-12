setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 2 + "s";
    heart.innerText = "💖";
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 5000);
}, 300);

const style = document.createElement('style');
style.innerHTML = `
.heart {
    position: fixed;
    bottom: 0;
    font-size: 20px;
    animation: floatUp linear forwards;
}
@keyframes floatUp {
    to {
        transform: translateY(-100vh);
        opacity: 0;
    }
}`;
document.head.appendChild(style);
