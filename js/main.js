/* =========================================
   CINEMATIC BLACK HOLE
========================================= */

const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext("2d");

let width;
let height;
let particles = [];

const BLACK_HOLE = {
    x: 0,
    y: 0,
    radius: 75
};


/* =========================================
   RESIZE
========================================= */

function resizeCanvas() {

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    BLACK_HOLE.x = width * 0.82;
    BLACK_HOLE.y = height * 0.28;

    createParticles();
}

window.addEventListener("resize", resizeCanvas);


/* =========================================
   PARTICLE CREATION
========================================= */

function createParticles() {

    particles = [];

    const amount =
        width < 600 ? 180 : 420;

    for (let i = 0; i < amount; i++) {

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            95 + Math.random() * 360;

        particles.push({

            angle: angle,

            distance: distance,

            speed:
                0.0008 +
                Math.random() * 0.0025,

            size:
                0.5 +
                Math.random() * 1.8,

            brightness:
                0.35 +
                Math.random() * 0.65,

            color:
                Math.random() > 0.72
                    ? "255,190,245"
                    : "185,190,255"
        });
    }
}


/* =========================================
   BLACK HOLE
========================================= */

function drawBlackHole() {

    const x = BLACK_HOLE.x;
    const y = BLACK_HOLE.y;

    /* Outer gravitational glow */

    const glow =
        ctx.createRadialGradient(
            x,
            y,
            BLACK_HOLE.radius * 0.7,
            x,
            y,
            220
        );

    glow.addColorStop(
        0,
        "rgba(170,110,255,0.18)"
    );

    glow.addColorStop(
        0.35,
        "rgba(120,80,220,0.10)"
    );

    glow.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    ctx.fillStyle = glow;

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        220,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /* Accretion disk */

    ctx.save();

    ctx.translate(x, y);

    ctx.rotate(-0.22);

    const disk =
        ctx.createRadialGradient(
            0,
            0,
            BLACK_HOLE.radius * 0.65,
            0,
            0,
            170
        );

    disk.addColorStop(
        0,
        "rgba(0,0,0,1)"
    );

    disk.addColorStop(
        0.48,
        "rgba(15,8,30,0.98)"
    );

    disk.addColorStop(
        0.65,
        "rgba(185,100,255,0.18)"
    );

    disk.addColorStop(
        0.78,
        "rgba(80,130,255,0.08)"
    );

    disk.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    ctx.scale(1, 0.38);

    ctx.fillStyle = disk;

    ctx.beginPath();

    ctx.arc(
        0,
        0,
        180,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.restore();


    /* Event horizon */

    const horizon =
        ctx.createRadialGradient(
            x - 15,
            y - 15,
            5,
            x,
            y,
            BLACK_HOLE.radius
        );

    horizon.addColorStop(
        0,
        "#000000"
    );

    horizon.addColorStop(
        0.75,
        "#000000"
    );

    horizon.addColorStop(
        1,
        "rgba(8,4,18,0.2)"
    );

    ctx.fillStyle = horizon;

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        BLACK_HOLE.radius,
        0,
        Math.PI * 2
    );

    ctx.fill();
}


/* =========================================
   SPIRALING STARS
========================================= */

function drawParticles() {

    const x = BLACK_HOLE.x;
    const y = BLACK_HOLE.y;

    for (const p of particles) {

        /*
           Slowly spiral toward
           the black hole
        */

        p.angle += p.speed;

        p.distance -=
            p.speed * 18;


        /* Reset particle */

        if (p.distance < 82) {

            p.distance =
                350 +
                Math.random() * 180;

            p.angle =
                Math.random() * Math.PI * 2;
        }


        /*
           Elliptical gravitational
           distortion
        */

        const px =
            x +
            Math.cos(p.angle) *
            p.distance;

        const py =
            y +
            Math.sin(p.angle) *
            p.distance *
            0.42;


        /* Draw star */

        const alpha =
            Math.min(
                1,
                p.brightness *
                (p.distance / 300)
            );

        ctx.fillStyle =
            `rgba(${p.color},${alpha})`;

        ctx.beginPath();

        ctx.arc(
            px,
            py,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fill();


        /*
           Motion streak
        */

        if (p.distance < 240) {

            const trail =
                5 +
                (240 - p.distance) *
                0.07;

            const tx =
                x +
                Math.cos(p.angle - 0.06) *
                (p.distance + trail);

            const ty =
                y +
                Math.sin(p.angle - 0.06) *
                (p.distance + trail) *
                0.42;

            ctx.strokeStyle =
                `rgba(${p.color},${alpha * 0.35})`;

            ctx.lineWidth =
                Math.max(
                    0.4,
                    p.size * 0.5
                );

            ctx.beginPath();

            ctx.moveTo(
                px,
                py
            );

            ctx.lineTo(
                tx,
                ty
            );

            ctx.stroke();
        }
    }
}


/* =========================================
   ANIMATION LOOP
========================================= */

function animate() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    drawParticles();

    drawBlackHole();


    requestAnimationFrame(
        animate
    );
}


/* =========================================
   START
========================================= */

resizeCanvas();

animate();

/* =========================================
   ELLIPTICAL PLANET ORBIT
========================================= */

const planet = document.querySelector(".planet");

let orbitStart = performance.now();

function animatePlanet(time) {

    const elapsed = time - orbitStart;

    /*
       Orbit speed
       Higher = slower
    */
    const duration = 26000;

    /*
       0 → 1 continuous progress
    */
    const progress =
        (elapsed % duration) / duration;

    /*
       Full elliptical angle
    */
    const angle =
        progress * Math.PI * 2;


    /*
       Ellipse center
    */

    const centerX =
        window.innerWidth * 0.50;

    const centerY =
        window.innerHeight * 0.50;


    /*
       Ellipse dimensions

       Planet will travel
       around almost the
       entire screen.
    */

    const radiusX =
        window.innerWidth * 0.57;

    const radiusY =
        window.innerHeight * 0.42;


    /*
       Elliptical coordinates
    */

    const x =
        centerX +
        Math.cos(angle) * radiusX;

    const y =
        centerY +
        Math.sin(angle) * radiusY;


    /*
       Depth simulation

       Back side = smaller
       Front side = larger
    */

    const depth =
        (Math.sin(angle) + 1) / 2;

    const scale =
        0.55 +
        depth * 0.65;


    /*
       Smooth orbital position
    */

    planet.style.left =
        `${x - planet.offsetWidth / 2}px`;

    planet.style.top =
        `${y - planet.offsetHeight / 2}px`;


    /*
       Size changes with depth
    */

    planet.style.transform =
        `scale(${scale})`;


    requestAnimationFrame(
        animatePlanet
    );
}


requestAnimationFrame(
    animatePlanet
);