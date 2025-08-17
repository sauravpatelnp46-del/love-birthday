// Efficient floating hearts: creates minimal DOM nodes, uses requestAnimationFrame
(function(){
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
  
    const maxHearts = 12;
    const spawnInterval = 420; // ms
  
    function random(min,max){ return Math.random()*(max-min)+min; }
  
    function createHeart(){
      const el = document.createElement('div');
      el.className = 'heart';
      el.textContent = '💖';
      el.style.left = `${random(8,92)}vw`;
      el.style.fontSize = `${random(16,36)}px`;
      el.style.opacity = `${random(0.7,1)}`;
      el.style.transform = `translateY(0) rotate(${random(-30,30)}deg)`;
      const duration = random(3500,6000);
      el.dataset.duration = duration;
      document.body.appendChild(el);
  
      let start = null;
      function frame(ts){
        if (!start) start = ts;
        const t = ts - start;
        const progress = t / duration;
        el.style.transform = `translateY(${ -progress * (window.innerHeight + 120)}px) rotate(${progress*360}deg)`;
        el.style.opacity = `${1 - progress}`;
        if (progress < 1) requestAnimationFrame(frame);
        else el.remove();
      }
      requestAnimationFrame(frame);
    }
  
    // spawn loop
    let running = true;
    setInterval(()=> {
      if (!running) return;
      const existing = document.querySelectorAll('.heart').length;
      if (existing < maxHearts) createHeart();
    }, spawnInterval);
  
    // stop when page hidden to save battery
    document.addEventListener('visibilitychange', ()=> {
      running = document.visibilityState === 'visible';
    }, {passive:true});
  })();
  