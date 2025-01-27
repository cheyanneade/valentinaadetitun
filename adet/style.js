const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];
const stars = [];

function createHeart() {
    return {
        x: Math.random() * canvas.width,
        y: -50,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5
    };
}

function createStar() {
    return {
        x: Math.random() * canvas.width,
        y: -50,
        size: Math.random() * 10 + 5,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5
    };
}

function drawHeart(heart) {
    ctx.fillStyle = `rgba(255, 105, 180, ${heart.opacity})`;
    ctx.beginPath();
    ctx.moveTo(heart.x, heart.y);
    ctx.bezierCurveTo(heart.x - heart.size / 2, heart.y - heart.size / 2, heart.x - heart.size, heart.y + heart.size / 3, heart.x, heart.y + heart.size);
    ctx.bezierCurveTo(heart.x + heart.size, heart.y + heart.size / 3, heart.x + heart.size / 2, heart.y - heart.size / 2, heart.x, heart.y);
    ctx.fill();
}

function drawStar(star) {
    ctx.fillStyle = `rgba(255, 105, 180, ${star.opacity})`;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        ctx.lineTo(star.x + star.size * Math.cos((18 + i * 72) * Math.PI / 180), star.y - star.size * Math.sin((18 + i * 72) * Math.PI / 180));
        ctx.lineTo(star.x + star.size / 2 * Math.cos((54 + i * 72) * Math.PI / 180), star.y - star.size / 2 * Math.sin((54 + i * 72) * Math.PI / 180));
    }
    ctx.closePath();
    ctx.fill();
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.1) hearts.push(createHeart());
    if (Math.random() < 0.1) stars.push(createStar());

    hearts.forEach((heart, index) => {
        heart.y += heart.speed;
        drawHeart(heart);
        if (heart.y > canvas.height) hearts.splice(index, 1);
    });

    stars.forEach((star, index) => {
        star.y += star.speed;
        drawStar(star);
        if (star.y > canvas.height) stars.splice(index, 1);
    });

    requestAnimationFrame(update);
}

function createGlitter() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 1,
        opacity: Math.random() * 0.5 + 0.5,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2
    };
}

const glitters = [];

function drawGlitter(glitter) {
    ctx.fillStyle = `rgba(255, 192, 203, ${glitter.opacity})`;
    ctx.beginPath();
    ctx.arc(glitter.x, glitter.y, glitter.size, 0, Math.PI * 2);
    ctx.fill();
}

function updateGlitters() {
    glitters.forEach((glitter, index) => {
        glitter.x += glitter.speedX;
        glitter.y += glitter.speedY;

        if (glitter.x < 0 || glitter.x > canvas.width || glitter.y < 0 || glitter.y > canvas.height) {
            glitters.splice(index, 1);
        } else {
            drawGlitter(glitter);
        }
    });

    if (Math.random() < 0.2) glitters.push(createGlitter());
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.1) hearts.push(createHeart());
    if (Math.random() < 0.1) stars.push(createStar());

    hearts.forEach((heart, index) => {
        heart.y += heart.speed;
        drawHeart(heart);
        if (heart.y > canvas.height) hearts.splice(index, 1);
    });

    stars.forEach((star, index) => {
        star.y += star.speed;
        drawStar(star);
        if (star.y > canvas.height) stars.splice(index, 1);
    });

    updateGlitters();

    requestAnimationFrame(update);
    
}

update();