// Global State
let introTyped = false;

// Typewriter Function
function typeWriter(elementId, text, speed, callback) {
    let i = 0;
    const element = document.getElementById(elementId);
    element.innerHTML = "";
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

// Unlock Logic
function unlock() {
    const screen = document.getElementById('unlock-screen');
    const heart = screen.querySelector('.unlock-heart');
    const music = document.getElementById('bg-music');
    
    // Start music with ultra-smooth fade-in (5 seconds)
    music.volume = 0; 
    music.play().then(() => {
        let vol = 0;
        const fadeInterval = 50; 
        const fadeStep = 0.01;   
        const fadeIn = setInterval(() => {
            if (vol < 1) {
                vol += fadeStep;
                music.volume = Math.min(vol, 1);
            } else {
                clearInterval(fadeIn);
            }
        }, fadeInterval);
    }).catch(e => console.log("Audio play blocked", e));

    heart.style.transform = 'scale(100)';
    heart.style.opacity = '0';
    screen.style.opacity = '0';
    
    setTimeout(() => {
        screen.style.visibility = 'hidden';
        nextSection('intro');
        startIntroTypewriter();
    }, 1200);
}

function startIntroTypewriter() {
    if (introTyped) return;
    introTyped = true;
    typeWriter("intro-title", "It started at Nalanda...", 80, () => {
        typeWriter("intro-p", "I remember a girl in a green dress. She didn't know it then, but she became my whole world. Since that day, every moment with you, Nisha, has felt like magic...", 40);
    });
}

function nextSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    
    setTimeout(() => {
        const target = document.getElementById(sectionId);
        target.classList.add('active');
        
        if(sectionId === 'promise') {
            initNoButton();
        }
    }, 100);
}

// Ultra Sparkle Cursor
document.addEventListener('mousemove', (e) => {
    const container = document.getElementById('sparkle-container');
    for (let i = 0; i < 2; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        const size = Math.random() * 10 + 5;
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        
        const offset = Math.random() * 20 - 10;
        sparkle.style.left = (e.pageX + offset) + 'px';
        sparkle.style.top = (e.pageY + offset) + 'px';
        
        container.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
});

function showStarMsg(starEl, msg) {
    const msgEl = document.getElementById('star-message');
    msgEl.style.opacity = 0;
    
    starEl.style.transform = 'scale(1.5) rotate(15deg)';
    setTimeout(() => starEl.style.transform = 'scale(1) rotate(0deg)', 300);

    setTimeout(() => {
        msgEl.innerText = msg;
        msgEl.style.opacity = 1;
    }, 300);
}

function initNoButton() {
    const noBtn = document.getElementById('no-btn');
    const container = noBtn.parentElement;
    
    const moveButton = () => {
        // Move within the glass-card instead of the whole screen
        const rect = container.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();
        
        const maxX = rect.width - btnRect.width;
        const maxY = rect.height - btnRect.height;
        
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;
        
        noBtn.style.position = 'absolute';
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
        noBtn.style.margin = '0';
    };

    // Trigger when mouse gets near
    document.addEventListener('mousemove', (e) => {
        const btnRect = noBtn.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;
        
        const distance = Math.sqrt(Math.pow(e.clientX - btnCenterX, 2) + Math.pow(e.clientY - btnCenterY, 2));
        
        // If cursor is within 100px, escape!
        if (distance < 100) {
            moveButton();
        }
    });

    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveButton();
    });
}

function accepted() {
    nextSection('success');
    
    // Play celebration sound for 10 seconds
    const celebSound = document.getElementById('celebration-sound');
    const bgMusic = document.getElementById('bg-music');
    
    celebSound.volume = 0.7;
    celebSound.play().catch(e => console.log("Celebration sound blocked", e));
    
    // Fade out background music slightly during celebration
    bgMusic.volume = 0.3;
    
    // Stop celebration after 10 seconds
    setTimeout(() => {
        let fadeOut = setInterval(() => {
            if (celebSound.volume > 0.05) {
                celebSound.volume -= 0.05;
            } else {
                celebSound.pause();
                celebSound.currentTime = 0;
                clearInterval(fadeOut);
                bgMusic.volume = 1.0; 
            }
        }, 100);
    }, 10000);
    
    const end = Date.now() + (20 * 1000);
    const colors = ['#ff4d6d', '#ffd700', '#ffffff', '#ffb3c1'];

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// Background Atmosphere & Parallax
function initAtmosphere() {
    const layer = document.getElementById('star-layer');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'floating-item';
        star.innerHTML = i % 2 === 0 ? '✨' : '💖';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.animationDuration = (Math.random() * 10 + 10) + 's';
        star.style.animationDelay = (Math.random() * 10) + 's';
        star.style.fontSize = Math.random() * 20 + 10 + 'px';
        layer.appendChild(star);
    }
}

initAtmosphere();
