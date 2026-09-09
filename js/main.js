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

/* =====================================================
   DEVELOPER INTRO → LOCK SCREEN → PASSWORD
   COUNTDOWN + PHOTO SPOTLIGHT + EMOJI
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const developerIntro =
        document.getElementById("developerIntro");

    const rajputIntro =
        document.getElementById("rajputIntro");

    const rajputEnterBtn =
        document.getElementById("rajputEnterBtn");

    const logoShards =
        document.getElementById("logoShards");

    const lockScreen =
        document.getElementById("developerLockScreen");

    const lockTimer =
        document.getElementById("lockTimer");

    const passwordInput =
        document.getElementById("developerPassword");

    const unlockBtn =
        document.getElementById("unlockBtn");

    const passwordMessage =
        document.getElementById("passwordMessage");

    const passwordEmoji =
        document.getElementById("passwordEmoji");

    const hintCards =
        document.querySelectorAll(".hint-card");


    /* =========================================
       SAFETY CHECK
    ========================================= */

    if (!lockScreen) return;


    /* =========================================
       LOCK SCREEN INITIAL STATE
    ========================================= */

    lockScreen.style.display = "none";
    lockScreen.classList.remove("active");

    if (passwordInput) {
        passwordInput.disabled = true;
    }


    /* =========================================
       RAJPUT LOGO SHARDS
    ========================================= */

    if (logoShards) {

        // Duplicate shards prevent karo
        logoShards.innerHTML = "";

        for (let i = 1; i <= 12; i++) {

            const shard =
                document.createElement("div");

            shard.className =
                "logo-shard shard-" + i;

            logoShards.appendChild(shard);
        }
    }


    /* =========================================
       SHOW LOCK SCREEN
    ========================================= */

    function showLockScreen() {

        if (rajputIntro) {
            rajputIntro.style.display = "none";
        }

        if (developerIntro) {
            developerIntro.style.display = "none";
        }

        lockScreen.style.display = "flex";

        // Browser ko display apply karne ka time
        requestAnimationFrame(function () {
            lockScreen.classList.add("active");
            lockScreen.style.opacity = "1";
        });

        startAccessTimer();
    }


    /* =========================================
       ENTER EXPERIENCE BUTTON
    ========================================= */

    if (rajputEnterBtn) {

        rajputEnterBtn.addEventListener("click", function () {

            rajputEnterBtn.disabled = true;

            if (rajputIntro) {
                rajputIntro.classList.add("logo-shatter");
            }

            // Shatter ke baad lock screen
            showLockScreen();

        });

    } else {

        // Agar Rajput intro use nahi ho raha
        showLockScreen();

    }


    /* =========================================
       ACCESS TIMER
    ========================================= */

    let countdown = 5;
    let timerStarted = false;

    function startAccessTimer() {

        if (timerStarted) return;

        timerStarted = true;
        countdown = 5;

        if (lockTimer) {
            lockTimer.textContent = "05";
        }

        const timer =
            setInterval(function () {

                countdown--;

                if (lockTimer) {
                    lockTimer.textContent =
                        String(Math.max(countdown, 0))
                            .padStart(2, "0");
                }

                if (countdown <= 0) {

                    clearInterval(timer);

                    if (lockTimer) {
                        lockTimer.textContent = "READY";
                    }

                    if (passwordInput) {
                        passwordInput.disabled = false;
                    }

                }

            }, 1000);
    }


    /* =========================================
       BIRTHDAY COUNTDOWN
    ========================================= */

    const birthdayDate =
        new Date("October 16, 2026 00:00:00").getTime();

    function updateBirthdayCountdown() {

        const now =
            new Date().getTime();

        const distance =
            birthdayDate - now;

        const daysElement =
            document.getElementById("countdownDays");

        const hoursElement =
            document.getElementById("countdownHours");

        const minutesElement =
            document.getElementById("countdownMinutes");

        const secondsElement =
            document.getElementById("countdownSeconds");

        if (
            !daysElement ||
            !hoursElement ||
            !minutesElement ||
            !secondsElement
        ) {
            return;
        }

        if (distance <= 0) {

            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";

            return;
        }

        const days =
            Math.floor(
                distance / (1000 * 60 * 60 * 24)
            );

        const hours =
            Math.floor(
                (distance % (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );

        const minutes =
            Math.floor(
                (distance % (1000 * 60 * 60)) /
                (1000 * 60)
            );

        const seconds =
            Math.floor(
                (distance % (1000 * 60)) / 1000
            );

        daysElement.textContent =
            String(days).padStart(2, "0");

        hoursElement.textContent =
            String(hours).padStart(2, "0");

        minutesElement.textContent =
            String(minutes).padStart(2, "0");

        secondsElement.textContent =
            String(seconds).padStart(2, "0");
    }

    updateBirthdayCountdown();

    setInterval(
        updateBirthdayCountdown,
        1000
    );


/* =========================================
   PHOTO FLIP + MOVING SPOTLIGHT FOCUS
========================================= */

let spotlightAnimation;
let spotlightX = 0;
let spotlightDirection = 1;
let spotlightFocused = false;
let spotlightTimer;

function moveSpotlight() {

    if (spotlightFocused) return;

    spotlightX += spotlightDirection * 0.25;

    if (spotlightX >= 100) {
        spotlightX = 100;
        spotlightDirection = -1;
    }

    if (spotlightX <= 0) {
        spotlightX = 0;
        spotlightDirection = 1;
    }

    lockScreen.style.setProperty(
        "--spot-x",
        `${spotlightX}%`
    );

    lockScreen.style.setProperty(
        "--spot-y",
        "50%"
    );

    spotlightAnimation =
        requestAnimationFrame(moveSpotlight);
}

// Spotlight continuously left-to-right chalega
moveSpotlight();


hintCards.forEach(function (card) {

    card.addEventListener("click", function () {

        // Ek photo focus hone par doosri photo click na ho
        if (spotlightFocused) return;

        spotlightFocused = true;

        cancelAnimationFrame(spotlightAnimation);
        clearTimeout(spotlightTimer);

        const lockRect =
            lockScreen.getBoundingClientRect();

        const cardRect =
            card.getBoundingClientRect();

        // Clicked photo ka exact centre
        const focusX =
            (
                (
                    cardRect.left +
                    cardRect.width / 2 -
                    lockRect.left
                ) / lockRect.width
            ) * 100;

        const focusY =
            (
                (
                    cardRect.top +
                    cardRect.height / 2 -
                    lockRect.top
                ) / lockRect.height
            ) * 100;

        // Spotlight ko clicked photo ke centre par le jao
        lockScreen.style.setProperty(
            "--spot-x",
            `${focusX}%`
        );

        lockScreen.style.setProperty(
            "--spot-y",
            `${focusY}%`
        );

        // Focus mode on
        lockScreen.classList.add("photo-focus");
        card.classList.add("focused");

        // Photo ko flip karo
        card.classList.add("flipped");

        // 2.5 second baad automatically flip back
        spotlightTimer = setTimeout(function () {

            card.classList.remove("flipped");
            card.classList.remove("focused");
            lockScreen.classList.remove("photo-focus");

            spotlightFocused = false;

            // Spotlight clicked photo se phir move kare
            spotlightX = focusX;
            spotlightDirection = 1;

            moveSpotlight();

        }, 2500);

    });

});


    /* =========================================
       PASSWORD EMOJI
    ========================================= */

    if (passwordInput && passwordEmoji) {

        passwordInput.addEventListener("focus", function () {

            passwordEmoji.textContent = "🙈";
            passwordEmoji.classList.add("blink");

        });

        passwordInput.addEventListener("input", function () {

            if (passwordInput.value.length > 0) {

                passwordEmoji.textContent = "🙈";
                passwordEmoji.classList.add("blink");

            } else {

                passwordEmoji.textContent = "🙂";
                passwordEmoji.classList.remove("blink");

            }

        });

        passwordInput.addEventListener("blur", function () {

            if (passwordInput.value.length === 0) {

                passwordEmoji.textContent = "🙂";
                passwordEmoji.classList.remove("blink");

            }

        });

    }


    /* =========================================
       PASSWORD CHECK
    ========================================= */

    const correctPassword = "1610";

    function unlockWebsite() {

        if (!passwordInput) return;

        const enteredPassword =
            passwordInput.value.trim();

        if (enteredPassword === correctPassword) {

            if (passwordEmoji) {

                passwordEmoji.textContent = "🥳";
                passwordEmoji.classList.remove("blink");
                passwordEmoji.classList.add("happy");

            }

            if (passwordMessage) {

                passwordMessage.textContent =
                    "ACCESS GRANTED ✨";

                passwordMessage.className =
                    "success";

            }

            if (unlockBtn) {
                unlockBtn.disabled = true;
            }

            passwordInput.disabled = true;

            lockScreen.classList.remove("active");
            lockScreen.style.opacity = "0";

            setTimeout(function () {

                lockScreen.style.display = "none";

                // Original opening screen show
                const openingScreen =
                    document.querySelector(".opening-screen");

                if (openingScreen) {
                    openingScreen.style.display = "flex";
                    openingScreen.style.opacity = "1";
                }

                document.body.style.overflow = "auto";

            }, 1000);


        } else {

            if (passwordEmoji) {

                passwordEmoji.textContent = "😕";
                passwordEmoji.classList.remove("blink");
                passwordEmoji.classList.add("sad");

            }

            if (passwordMessage) {

                passwordMessage.textContent =
                    "WRONG PASSWORD — FIND ALL DIGITS";

                passwordMessage.className =
                    "error";

            }

            passwordInput.value = "";

            setTimeout(function () {

                if (passwordEmoji) {

                    passwordEmoji.textContent = "🙂";
                    passwordEmoji.classList.remove("sad");

                }

            }, 1200);

        }

    }


    if (unlockBtn) {

        unlockBtn.addEventListener(
            "click",
            unlockWebsite
        );

    }

    if (passwordInput) {

        passwordInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {
                    unlockWebsite();
                }

            }
        );

    }

});