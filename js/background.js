document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('egyptian-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Colors that fit the Egyptian theme (Gold, Sandstone, Terracotta)
    const colors = [
        { r: 197, g: 160, b: 89 },   // Gold
        { r: 238, g: 222, b: 197 },  // Sandstone
        { r: 166, g: 104, b: 68 },   // Terracotta
        { r: 218, g: 165, b: 32 }    // Goldenrod
    ];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * -0.8 - 0.2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            
            this.baseOpacity = Math.random() * 0.4 + 0.1;
            this.opacity = this.baseOpacity;
            this.fadeSpeed = Math.random() * 0.01 + 0.005;
            this.fadingOut = Math.random() > 0.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Twinkling effect
            if (this.fadingOut) {
                this.opacity -= this.fadeSpeed;
                if (this.opacity <= 0.05) this.fadingOut = false;
            } else {
                this.opacity += this.fadeSpeed;
                if (this.opacity >= this.baseOpacity + 0.4) this.fadingOut = true;
            }

            // Wrap around the screen
            if (this.y < -10) {
                this.y = height + 10;
                this.x = Math.random() * width;
            }
            if (this.x < -10) this.x = width + 10;
            if (this.x > width + 10) this.x = -10;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
            
            // Add a glowing effect
            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.8})`;
            
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        // Responsive particle count based on screen size
        const numParticles = Math.floor((width * height) / 12000); 
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });

    resize();
    initParticles();
    animate();
});
