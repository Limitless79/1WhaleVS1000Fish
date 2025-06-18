const canvas = document.getElementById('matrixRain');
if (!canvas) {
  console.error('Canvas #matrixRain not found!');
} else {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  const bubbles = [];

  function createBubble() {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      size: Math.random() * 15 + 5,
      speed: Math.random() * 4 + 1,
      opacity: Math.random() * 0.3 + 0.2,
      sway: Math.random() * 2 - 1,
    };
  }

  function animateBubbles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bubbles.forEach((bubble, index) => {
      bubble.y -= bubble.speed;
      bubble.x += Math.sin(bubble.y * 0.05) * bubble.sway;
      bubble.opacity -= 0.001;

      if (bubble.y < -bubble.size || bubble.opacity <= 0) {
        bubbles.splice(index, 1);
        return;
      }

      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity})`;
      ctx.strokeStyle = `rgba(0, 229, 255, ${bubble.opacity * 0.5})`;
      ctx.lineWidth = 1;
      ctx.fill();
      ctx.stroke();
    });

    if (Math.random() < 0.1) {
      bubbles.push(createBubble());
    }

    requestAnimationFrame(animateBubbles);
  }

  for (let i = 0; i < 150; i++) {
    bubbles.push(createBubble());
  }

  animateBubbles();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

window.addEventListener('scroll', () => {
  const heroImage = document.querySelector('.hero-image');
  const scrollPosition = window.scrollY;
  heroImage.style.transform = `translateY(${scrollPosition * 0.3}px)`; // Slower movement
});