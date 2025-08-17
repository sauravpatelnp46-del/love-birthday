// Lightweight confetti using requestAnimationFrame. Exposes startConfetti()
(function(){
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
  
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
  
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let particles = [];
    let animId = null;
  
    function resize(){
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize, {passive:true});
  
    function rand(min,max){ return Math.random()*(max-min)+min; }
  
    function createParticles(count=120){
      particles = [];
      for (let i=0;i<count;i++){
        particles.push({
          x: rand(0,W),
          y: rand(-H,0),
          r: rand(2,7),
          color: `hsl(${rand(0,360)},100%,55%)`,
          tilt: rand(-0.3,0.3),
          vx: rand(-0.6,0.6),
          vy: rand(1.5,4),
          spin: rand(-0.05,0.05)
        });
      }
    }
  
    function draw(){
      ctx.clearRect(0,0,W,H);
      for (const p of particles){
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.tilt);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r*1.6);
        ctx.restore();
      }
    }
  
    function update(){
      for (const p of particles){
        p.x += p.vx;
        p.y += p.vy;
        p.tilt += p.spin;
        p.vy += 0.02; // gravity
        if (p.y > H + 20 || p.x < -50 || p.x > W + 50){
          p.x = rand(0,W);
          p.y = rand(-H, -10);
          p.vy = rand(1.5,4);
        }
      }
    }
  
    function loop(){
      update();
      draw();
      animId = requestAnimationFrame(loop);
    }
  
    function startConfetti(count=140){
      createParticles(count);
      if (animId) cancelAnimationFrame(animId);
      loop();
      // auto-stop after 8s to conserve battery
      setTimeout(()=> stopConfetti(), 8000);
    }
  
    function stopConfetti(){
      if (animId) cancelAnimationFrame(animId);
      animId = null;
      ctx.clearRect(0,0,W,H);
    }
  
    // expose globally
    window.startConfetti = startConfetti;
    window.stopConfetti = stopConfetti;
  })();
  