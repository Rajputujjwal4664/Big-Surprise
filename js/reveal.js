/* =========================================================
   REVEAL.JS — STABLE VERSION
   FLOW:

   ENTER
      ↓
   HACK SCAN
      ↓
   HAPPY BIRTHDAY
      ↓
   MEMORIES
      ↓
   LETTER
      ↓
   CAKE
      ↓
   🔒 BLOW CANDLES
      ↓
   WRITE WISH
      ↓
   SEND WISH
      ↓
   🔓 BLOW CANDLES
      ↓
   CANDLES BLOW
      ↓
   FLOWER RAIN
      ↓
   SECRET VIDEO
      ↓
   BIRTHDAY MUSIC STOPS
========================================================= */


document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const enterButton =
        document.querySelector(".enter-btn");

    const openingScreen =
        document.querySelector(".opening-screen");

    const warningScreen =
        document.getElementById("warningScreen");

    const scanningContent =
        document.getElementById("scanningContent");

    const finalHackScreen =
        document.getElementById("finalHackScreen");

    const warningText =
        document.getElementById("warningText");

    const warningProgress =
        document.getElementById("warningProgress");

    const terminalLast =
        document.getElementById("terminalLast");

    const birthdayScene =
        document.getElementById("birthdayScene");

    const continueBtn =
        document.getElementById("continueBtn");

    const memoriesScene =
        document.getElementById("memoriesScene");

    const letterScene =
        document.getElementById("letterScene");

    const letterOpenBtn =
        document.getElementById("letterOpenBtn");

    const letterContinueBtn =
        document.getElementById("letterContinueBtn");

    const cakeScene =
        document.getElementById("cakeScene");

    const birthdayMusic =
        document.getElementById("birthdayMusic");

    const musicButton =
        document.getElementById("musicButton");

    const wishInput =
        document.getElementById("wishInput");

    const wishCount =
        document.getElementById("wishCount");

    const sendWishBtn =
        document.getElementById("sendWishBtn");

    const wishStatus =
        document.getElementById("wishStatus");

    const wishLockMessage =
        document.getElementById("wishLockMessage");

    const blowMessage =
        document.getElementById("blowMessage");

    const petalContainer =
        document.getElementById("petalContainer");

    const secretVideo =
        document.getElementById("secretVideo");

    const revealVideoBtn =
        document.getElementById("revealVideoBtn");


    /* =====================================================
       WISH API
    ===================================================== */

    const WISH_API =
        "https://script.google.com/macros/s/AKfycbyzItOp6TJzFVSPEyR34BplDWksWUJVuITYjniYJeAhYDbny-sqtpe-sSg6f8sjT3Smpg/exec";


    /* =====================================================
       BLOW BUTTON
       Duplicate button ho to sirf FIRST rakhenge.
    ===================================================== */

    const blowButtons =
        document.querySelectorAll("#blowCandlesBtn");

    let blowCandlesBtn = null;

    if (blowButtons.length > 0) {

        blowCandlesBtn = blowButtons[0];

        for (let i = 1; i < blowButtons.length; i++) {

            blowButtons[i].remove();

        }

    }


    /* =====================================================
       STATE
    ===================================================== */

    let wishSent = false;
    let candlesBlown = false;
    let currentMemory = 0;


    /* =====================================================
       MUSIC INITIAL STATE
    ===================================================== */

    if (musicButton) {

        musicButton.style.display = "none";

        musicButton.classList.remove(
            "visible",
            "playing"
        );

    }


    /* =====================================================
       ENTER → HACK
    ===================================================== */

 /* =====================================================
   ENTER → INSTANT LOCK / HACK SCREEN
===================================================== */

function startReveal() {
    const openingScreen = document.querySelector(".opening-screen");
    const warningScreen = document.querySelector("#warningScreen");

    // Opening screen ko turant hide karo
    if (openingScreen) {
        openingScreen.style.display = "none";
    }

    // Lock/hack screen ko turant show karo
    if (warningScreen) {
        warningScreen.style.display = "flex";
        warningScreen.style.visibility = "visible";
        warningScreen.style.opacity = "1";
    }

    // Background aur scanning turant start
    if (typeof startMatrix === "function") {
        startMatrix();
    }

    if (typeof startScanning === "function") {
        startScanning();
    }
}

/* =====================================================
   OPENING → HACK SCAN
===================================================== */

enterButton?.addEventListener("click", () => {
    startReveal();
});

    /* =====================================================
       MATRIX
    ===================================================== */

    function startMatrix() {

        const canvas =
            document.getElementById(
                "matrixCanvas"
            );

        if (!canvas) {
            return;
        }

        const ctx =
            canvas.getContext("2d");

        let width = 0;
        let height = 0;
        let columns = 0;
        let drops = [];

        const chars =
            "01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


        function resize() {

            width =
                window.innerWidth;

            height =
                window.innerHeight;


            const dpr =
                Math.min(
                    window.devicePixelRatio || 1,
                    2
                );


            canvas.width =
                width * dpr;

            canvas.height =
                height * dpr;


            canvas.style.width =
                width + "px";

            canvas.style.height =
                height + "px";


            ctx.setTransform(
                dpr,
                0,
                0,
                dpr,
                0,
                0
            );


            columns =
                Math.floor(
                    width / 20
                );


            drops =
                Array(columns)
                    .fill(0)
                    .map(
                        () =>
                            Math.random() *
                            -height / 20
                    );

        }


        function draw() {

            ctx.fillStyle =
                "rgba(0,0,0,0.08)";

            ctx.fillRect(
                0,
                0,
                width,
                height
            );


            ctx.font =
                "16px monospace";


            for (
                let i = 0;
                i < drops.length;
                i++
            ) {

                const char =
                    chars[
                        Math.floor(
                            Math.random() *
                            chars.length
                        )
                    ];


                const x =
                    i * 20;

                const y =
                    drops[i] * 20;


                ctx.fillStyle =
                    Math.random() > 0.94
                        ? "#ff7777"
                        : "#9b0000";


                ctx.shadowBlur =
                    12;

                ctx.shadowColor =
                    "#ff0000";


                ctx.fillText(
                    char,
                    x,
                    y
                );


                ctx.shadowBlur =
                    0;


                if (
                    y > height &&
                    Math.random() > 0.965
                ) {

                    drops[i] = 0;

                }


                drops[i] +=
                    0.7 +
                    Math.random() * 0.9;

            }


            requestAnimationFrame(
                draw
            );

        }


        resize();


        window.addEventListener(
            "resize",
            resize
        );


        draw();

    }


    /* =====================================================
       HACK SCAN
    ===================================================== */

    function startScanning() {

        if (
            !warningText ||
            !warningProgress
        ) {
            return;
        }


        const messages = [

            "INITIALIZING SECURITY CHECK...",
            "SCANNING DEVICE...",
            "ANALYZING ENVIRONMENT...",
            "SEARCHING DATABASE...",
            "BYPASSING SECURITY...",
            "VERIFYING ACCESS...",
            "FINALIZING SCAN..."

        ];


        let index = 0;
        let progress = 0;


        warningText.textContent =
            messages[0];

        warningProgress.style.width =
            "0%";


        const messageTimer =
            setInterval(() => {

                index++;


                if (
                    index <
                    messages.length
                ) {

                    warningText.textContent =
                        messages[index];

                } else {

                    clearInterval(
                        messageTimer
                    );

                }

            }, 650);


        const progressTimer =
            setInterval(() => {

                progress++;

                warningProgress.style.width =
                    progress + "%";


                if (progress >= 100) {

                    clearInterval(
                        progressTimer
                    );

                    clearInterval(
                        messageTimer
                    );


                    warningText.textContent =
                        "✓ SCAN COMPLETE";


                    if (terminalLast) {

                        terminalLast.textContent =
                            "> SECURITY CHECK COMPLETE";

                    }


                    setTimeout(
                        showFinalHack,
                        1000
                    );

                }

            }, 55);

    }


    /* =====================================================
       FINAL HACK
    ===================================================== */

    function showFinalHack() {

        if (
            !scanningContent ||
            !finalHackScreen
        ) {
            return;
        }


        scanningContent.style.transition =
            "opacity .5s ease";

        scanningContent.style.opacity =
            "0";


        setTimeout(() => {

            scanningContent.style.display =
                "none";


            finalHackScreen.style.display =
                "flex";

            finalHackScreen.style.visibility =
                "visible";


            requestAnimationFrame(() => {

                finalHackScreen.classList.add(
                    "active"
                );

            });


            document.body.classList.add(
                "screen-shake"
            );


            setTimeout(() => {

                document.body.classList.remove(
                    "screen-shake"
                );

            }, 2400);


            setTimeout(
                showBirthday,
                3800
            );


        }, 500);

    }


    /* =====================================================
       BIRTHDAY SCREEN
    ===================================================== */

    function showBirthday() {

        if (
            !warningScreen ||
            !birthdayScene
        ) {
            return;
        }


        warningScreen.classList.add(
            "hide-warning"
        );


        setTimeout(() => {

            warningScreen.style.display =
                "none";


            birthdayScene.style.display =
                "flex";

            birthdayScene.style.visibility =
                "visible";

            birthdayScene.style.pointerEvents =
                "auto";

            birthdayScene.style.opacity =
                "0";

            birthdayScene.style.transform =
                "scale(1.05)";


            requestAnimationFrame(() => {

                requestAnimationFrame(() => {

                    birthdayScene.style.opacity =
                        "1";

                    birthdayScene.style.transform =
                        "scale(1)";

                });

            });


            startBirthdayAnimation();


            if (
                typeof startBirthdayParticles ===
                "function"
            ) {

                startBirthdayParticles();

            }

        }, 900);

    }


    /* =====================================================
       BIRTHDAY TEXT ANIMATION
    ===================================================== */

    function startBirthdayAnimation() {

        const small =
            document.querySelector(
                ".birthday-small"
            );

        const title =
            document.querySelector(
                ".birthday-content h1"
            );

        const message =
            document.querySelector(
                ".birthday-message"
            );

        const divider =
            document.querySelector(
                ".birthday-divider"
            );

        const wish =
            document.querySelector(
                ".birthday-wish"
            );

        const name =
            document.querySelector(
                ".birthday-name"
            );

        const button =
            document.querySelector(
                ".continue-btn"
            );


        const elements = [

            small,
            title,
            message,
            divider,
            wish,
            name,
            button

        ];


        elements.forEach(
            element => {

                element?.classList.remove(
                    "show"
                );

            }
        );


        setTimeout(
            () => small?.classList.add("show"),
            700
        );


        setTimeout(
            () => title?.classList.add("show"),
            1800
        );


        setTimeout(
            () => message?.classList.add("show"),
            3200
        );


        setTimeout(
            () => divider?.classList.add("show"),
            4300
        );


        setTimeout(
            () => wish?.classList.add("show"),
            5000
        );


        setTimeout(
            () => name?.classList.add("show"),
            5900
        );


        setTimeout(
            () => button?.classList.add("show"),
            6800
        );

    }


    /* =====================================================
       BIRTHDAY → MEMORIES
    ===================================================== */

    continueBtn?.addEventListener(
        "click",
        openMemories
    );


    function openMemories() {

        if (
            !birthdayScene ||
            !memoriesScene
        ) {
            return;
        }


        continueBtn?.classList.add(
            "clicked"
        );


        birthdayScene.style.transition =
            "opacity .8s ease, transform .8s ease";

        birthdayScene.style.opacity =
            "0";

        birthdayScene.style.transform =
            "scale(.96)";


        setTimeout(() => {

            birthdayScene.style.display =
                "none";


            memoriesScene.style.display =
                "flex";

            memoriesScene.style.visibility =
                "visible";

            memoriesScene.style.pointerEvents =
                "auto";

            memoriesScene.style.opacity =
                "0";


            if (musicButton) {

                musicButton.style.display =
                    "flex";

                musicButton.classList.add(
                    "visible"
                );

            }


            startBirthdayMusic();


            requestAnimationFrame(() => {

                memoriesScene.style.opacity =
                    "1";

            });

        }, 800);

    }


    /* =====================================================
       MUSIC
    ===================================================== */

    function startBirthdayMusic() {

        if (!birthdayMusic) {
            return;
        }


        birthdayMusic.volume =
            0.35;


        birthdayMusic.play()
            .then(() => {

                musicButton?.classList.add(
                    "visible",
                    "playing"
                );

            })
            .catch(() => {

                musicButton?.classList.add(
                    "visible"
                );

            });

    }


    function pauseBirthdayMusic() {

        if (!birthdayMusic) {
            return;
        }


        birthdayMusic.pause();


        musicButton?.classList.remove(
            "playing"
        );

    }


    function resumeBirthdayMusic() {

        if (!birthdayMusic) {
            return;
        }


        birthdayMusic.play()
            .then(() => {

                musicButton?.classList.add(
                    "visible",
                    "playing"
                );

            })
            .catch(() => {});

    }


    musicButton?.addEventListener(
        "click",
        () => {

            if (!birthdayMusic) {
                return;
            }


            if (
                birthdayMusic.paused
            ) {

                resumeBirthdayMusic();

            } else {

                pauseBirthdayMusic();

            }

        }
    );


    /* =====================================================
       MEMORIES
    ===================================================== */

    const memories = [

        {
            id: "photo1",
            type: "image",
            src: "assets/photo1.jpeg"
        },

        {
            id: "photo2",
            type: "image",
            src: "assets/photo2.jpeg"
        },

        {
            id: "video1",
            type: "video",
            src: "assets/video1.mp4"
        },

        {
            id: "photo3",
            type: "image",
            src: "assets/photo3.jpeg"
        },

        {
            id: "video2",
            type: "video",
            src: "assets/video2.mp4"
        }

    ];


    function openMemory(id) {

        const indexMap = {

            photo1: 0,
            photo2: 1,
            video1: 2,
            photo3: 3,
            video2: 4

        };


        if (
            indexMap[id] === undefined
        ) {
            return;
        }


        currentMemory =
            indexMap[id];


        pauseBirthdayMusic();

        showMemory();


        const viewer =
            document.getElementById(
                "memoryViewer"
            );


        if (!viewer) {
            return;
        }


        viewer.style.display =
            "flex";

        viewer.style.visibility =
            "visible";


        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                viewer.classList.add(
                    "active"
                );

            });

        });


        document.body.style.overflow =
            "hidden";

    }


    function showMemory() {

        const memory =
            memories[currentMemory];

        const content =
            document.getElementById(
                "viewerContent"
            );


        if (
            !memory ||
            !content
        ) {
            return;
        }


        content.innerHTML =
            "";


        if (
            memory.type ===
            "image"
        ) {

            const img =
                document.createElement(
                    "img"
                );


            img.src =
                memory.src;

            img.alt =
                "Birthday Memory";

            img.draggable =
                false;


            img.onerror = () => {

                content.innerHTML =
                    "<p>⚠️ Memory couldn't be loaded.</p>";

            };


            content.appendChild(
                img
            );

        }


        if (
            memory.type ===
            "video"
        ) {

            const video =
                document.createElement(
                    "video"
                );


            video.src =
                memory.src;

            video.controls =
                true;

            video.autoplay =
                true;

            video.playsInline =
                true;

            video.preload =
                "auto";


            content.appendChild(
                video
            );


            video.play().catch(
                () => {}
            );

        }

    }


    window.openMemory =
        openMemory;


    window.closeMemory =
        closeMemory;


    window.nextMemory =
        nextMemory;


    window.previousMemory =
        previousMemory;


    function closeMemory() {

        const viewer =
            document.getElementById(
                "memoryViewer"
            );


        const content =
            document.getElementById(
                "viewerContent"
            );


        if (!viewer) {
            return;
        }


        const video =
            viewer.querySelector(
                "video"
            );


        if (video) {

            video.pause();

            video.currentTime =
                0;

        }


        viewer.classList.remove(
            "active"
        );


        setTimeout(() => {

            viewer.style.display =
                "none";

            viewer.style.visibility =
                "hidden";


            if (content) {

                content.innerHTML =
                    "";

            }


            document.body.style.overflow =
                "";


            resumeBirthdayMusic();

        }, 350);

    }


    function nextMemory() {

        currentMemory++;


        if (
            currentMemory >=
            memories.length
        ) {

            currentMemory =
                0;

        }


        showMemory();

    }


    function previousMemory() {

        currentMemory--;


        if (
            currentMemory < 0
        ) {

            currentMemory =
                memories.length - 1;

        }


        showMemory();

    }


    /* =====================================================
       KEYBOARD
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            const viewer =
                document.getElementById(
                    "memoryViewer"
                );


            if (
                !viewer ||
                !viewer.classList.contains(
                    "active"
                )
            ) {
                return;
            }


            if (
                event.key ===
                "Escape"
            ) {

                closeMemory();

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                nextMemory();

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                previousMemory();

            }

        }
    );


    /* =====================================================
       TOUCH SWIPE
    ===================================================== */

    let touchStartX = 0;


    document.addEventListener(
        "touchstart",
        event => {

            if (
                event.changedTouches.length
            ) {

                touchStartX =
                    event.changedTouches[0]
                        .screenX;

            }

        },
        {
            passive: true
        }
    );


    document.addEventListener(
        "touchend",
        event => {

            const viewer =
                document.getElementById(
                    "memoryViewer"
                );


            if (
                !viewer ||
                !viewer.classList.contains(
                    "active"
                )
            ) {
                return;
            }


            const touchEndX =
                event.changedTouches[0]
                    .screenX;


            const difference =
                touchEndX -
                touchStartX;


            if (
                Math.abs(difference) < 60
            ) {
                return;
            }


            if (
                difference < 0
            ) {

                nextMemory();

            } else {

                previousMemory();

            }

        },
        {
            passive: true
        }
    );


    /* =====================================================
       MEMORIES → LETTER
    ===================================================== */

    letterOpenBtn?.addEventListener(
        "click",
        () => {

            letterOpenBtn.classList.add(
                "clicked"
            );

            openLetter();

        }
    );


    function openLetter() {

        if (!letterScene) {
            return;
        }


        if (memoriesScene) {

            memoriesScene.style.transition =
                "opacity .8s ease, transform .8s ease";

            memoriesScene.style.opacity =
                "0";

            memoriesScene.style.transform =
                "scale(.97)";

        }


        setTimeout(() => {

            if (memoriesScene) {

                memoriesScene.style.display =
                    "none";

            }


            letterScene.style.display =
                "block";

            letterScene.style.visibility =
                "visible";

            letterScene.style.pointerEvents =
                "auto";

            letterScene.style.opacity =
                "0";

            letterScene.style.transform =
                "scale(1.02)";


            requestAnimationFrame(() => {

                requestAnimationFrame(() => {

                    letterScene.style.opacity =
                        "1";

                    letterScene.style.transform =
                        "scale(1)";

                });

            });


            startLetterAnimation();

        }, 800);

    }


    /* =====================================================
       LETTER ANIMATION
    ===================================================== */

    function startLetterAnimation() {

        const small =
            letterScene?.querySelector(
                ".letter-small"
            );

        const title =
            letterScene?.querySelector(
                ".letter-title"
            );

        const lines =
            letterScene?.querySelectorAll(
                ".letter-line"
            );

        const sign =
            letterScene?.querySelector(
                ".letter-sign"
            );

        const button =
            letterScene?.querySelector(
                ".letter-continue-btn"
            );


        small?.classList.remove(
            "show"
        );

        title?.classList.remove(
            "show"
        );

        lines?.forEach(
            line =>
                line.classList.remove(
                    "show"
                )
        );

        sign?.classList.remove(
            "show"
        );

        button?.classList.remove(
            "show"
        );


        setTimeout(
            () =>
                small?.classList.add(
                    "show"
                ),
            500
        );


        setTimeout(
            () =>
                title?.classList.add(
                    "show"
                ),
            1200
        );


        lines?.forEach(
            (line, index) => {

                setTimeout(
                    () => {

                        line.classList.add(
                            "show"
                        );

                    },
                    2200 +
                    index * 1300
                );

            }
        );


        const signatureDelay =
            2200 +
            (lines?.length || 0) *
            1300;


        setTimeout(
            () =>
                sign?.classList.add(
                    "show"
                ),
            signatureDelay
        );


        setTimeout(
            () =>
                button?.classList.add(
                    "show"
                ),
            signatureDelay + 1000
        );

    }


    /* =====================================================
       LETTER → CAKE
    ===================================================== */

    letterContinueBtn?.addEventListener(
        "click",
        openCake
    );


    function openCake() {

        if (!cakeScene) {
            return;
        }


        letterContinueBtn?.classList.add(
            "clicked"
        );


        if (letterScene) {

            letterScene.style.transition =
                "opacity .8s ease, transform .8s ease";

            letterScene.style.opacity =
                "0";

            letterScene.style.transform =
                "scale(.96)";

            letterScene.style.pointerEvents =
                "none";

        }


        setTimeout(() => {

            if (letterScene) {

                letterScene.style.display =
                    "none";

            }


            cakeScene.style.display =
                "flex";

            cakeScene.style.visibility =
                "visible";

            cakeScene.style.pointerEvents =
                "auto";

            cakeScene.style.opacity =
                "0";

            cakeScene.style.transform =
                "scale(1.03)";


            requestAnimationFrame(() => {

                requestAnimationFrame(() => {

                    cakeScene.classList.add(
                        "show"
                    );

                    cakeScene.style.opacity =
                        "1";

                    cakeScene.style.transform =
                        "scale(1)";


                    setupCake();

                });

            });

        }, 800);

    }


    /* =====================================================
       CAKE SETUP
    ===================================================== */

    function setupCake() {

    if (!blowCandlesBtn) {
        return;
    }

    // =========================================
    // RESET STATE
    // =========================================

    wishSent = false;
    candlesBlown = false;


    // =========================================
    // BLOW BUTTON — LOCKED
    // =========================================

    blowCandlesBtn.disabled = true;

    blowCandlesBtn.classList.add("locked");
    blowCandlesBtn.classList.remove("unlocked");

    blowCandlesBtn.innerHTML =
        "🔒 Make your wish first";


    // =========================================
    // RESET WISH
    // =========================================

    if (wishInput) {
        wishInput.value = "";
    }

    if (wishCount) {
        wishCount.textContent = "0";
    }

    if (wishStatus) {
        wishStatus.textContent = "";
    }


    // =========================================
    // RESET LOCK MESSAGE
    // =========================================

    if (wishLockMessage) {

        wishLockMessage.textContent =
            "✨ Pehle dil se ek wish maango...";

        wishLockMessage.classList.remove(
            "unlocked"
        );
    }


    // =========================================
    // RESET BLOW MESSAGE
    // =========================================

    if (blowMessage) {

        blowMessage.classList.remove(
            "show"
        );

        blowMessage.textContent = "";
    }


    // =========================================
    // RESET FLOWERS
    // =========================================

    if (petalContainer) {

        petalContainer.innerHTML = "";

    }


    // =========================================
    // RESET VIDEO
    // =========================================

    if (secretVideo) {

        secretVideo.classList.remove("show");

        const video =
            secretVideo.querySelector("video");

        if (video) {

            video.pause();
            video.currentTime = 0;

        }
    }


    if (revealVideoBtn) {

        revealVideoBtn.style.display =
            "inline-flex";

    }


    // =========================================
    // RESET CANDLES
    // =========================================

    const candles =
        document.querySelectorAll(
            "#cakeScene .candle"
        );

    candles.forEach(candle => {

        candle.classList.remove("blown");

    });


    // =========================================
    // IMPORTANT
    // =========================================
    // YAHAN localStorage CHECK NAHI HOGA.
    //
    // Page open hote hi:
    // Wish → Send → Blow Unlock
    //
    // Purani saved wish se button unlock nahi hoga.

}

    /* =====================================================
       WISH CHARACTER COUNT
    ===================================================== */

    wishInput?.addEventListener(
        "input",
        () => {

            if (wishCount) {

                wishCount.textContent =
                    wishInput.value.length;

            }

        }
    );


    /* =====================================================
       SEND WISH
    ===================================================== */

    sendWishBtn?.addEventListener(
        "click",
        sendWish
    );


    async function sendWish() {

        if (
            !wishInput ||
            !sendWishBtn
        ) {
            return;
        }


        const wish =
            wishInput.value.trim();


        /*
         * EMPTY
         */

        if (!wish) {

            if (wishStatus) {

                wishStatus.textContent =
                    "✨ Pehle dil se ek wish likho...";

            }


            wishInput.focus();

            return;

        }


        /*
         * SEND LOCK
         */

        if (sendWishBtn.disabled) {
            return;
        }


        sendWishBtn.disabled =
            true;

        sendWishBtn.innerHTML =
            "🪷 Sending your wish...";


        if (wishStatus) {

            wishStatus.textContent =
                "✨ Sending your wish...";

        }


        try {

            /*
             * SAVE LOCALLY
             */

            localStorage.setItem(
                "birthdayWish",
                wish
            );


            /*
             * GOOGLE SHEET
             */

            await fetch(
                WISH_API,
                {
                    method: "POST",

                    mode: "no-cors",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body: JSON.stringify({

                        wish: wish,

                        time:
                            new Date()
                                .toLocaleString()

                    })

                }
            );


            wishSent =
                true;


            wishInput.value =
                "";


            if (wishCount) {

                wishCount.textContent =
                    "0";

            }


            sendWishBtn.innerHTML =
                "🪷 Wish Sent ❤️";


            if (wishStatus) {

                wishStatus.textContent =
                    "✨ Wish received... now blow the candles ❤️";

            }


            unlockBlowButton();

        } catch (error) {

            console.error(
                "Wish error:",
                error
            );


            if (wishStatus) {

                wishStatus.textContent =
                    "❌ Something went wrong. Try again.";

            }


            sendWishBtn.disabled =
                false;

            sendWishBtn.innerHTML =
                "🪷 Send My Wish ✨";

        }

    }


    /* =====================================================
       UNLOCK BLOW
    ===================================================== */

    function unlockBlowButton() {

        if (!blowCandlesBtn) {
            return;
        }


        wishSent =
            true;


        blowCandlesBtn.disabled =
            false;


        blowCandlesBtn.classList.remove(
            "locked"
        );


        blowCandlesBtn.classList.add(
            "unlocked"
        );


        blowCandlesBtn.innerHTML =
            "🌬️ Blow the Candles";


        if (wishLockMessage) {

            wishLockMessage.textContent =
                "✨ Wish received... now blow the candles ❤️";

            wishLockMessage.classList.add(
                "unlocked"
            );

        }

    }


    /* =====================================================
       BLOW CANDLES
    ===================================================== */

    blowCandlesBtn?.addEventListener(
        "click",
        blowCandles
    );


    function blowCandles() {

    /* Wish required */

    if (!wishSent) {

        if (wishStatus) {
            wishStatus.textContent =
                "✨ Pehle dil se ek wish maango aur Send My Wish dabao.";
        }

        return;
    }


    /* Already blown */

    if (candlesBlown) {
        return;
    }


    const candles =
        document.querySelectorAll(
            "#cakeScene .candle"
        );


    if (!candles.length) {
        return;
    }


    candlesBlown = true;


    if (blowCandlesBtn) {

        blowCandlesBtn.disabled = true;

        blowCandlesBtn.innerHTML =
            "🌬️ Blowing...";

    }


    if (wishStatus) {

        wishStatus.textContent =
            "🌬️ Make your wish...";

    }


    /* =========================================
       BLOW CANDLES ONE BY ONE
    ========================================= */

    candles.forEach((candle, index) => {

        setTimeout(() => {

            candle.classList.add("blown");

        }, index * 350);

    });


    /*
     * Wait until all candles are blown
     */

    const candlesDoneTime =
        (candles.length - 1) * 350 + 700;


    setTimeout(() => {

        if (blowMessage) {

            blowMessage.textContent =
                "✨ Wish made... Happy Birthday ❤️";

            blowMessage.classList.add("show");

        }


        if (blowCandlesBtn) {

            blowCandlesBtn.innerHTML =
                "✨ Wish Made ❤️";

        }


        if (wishStatus) {

            wishStatus.textContent =
                "🌸 Your wish is on its way...";

        }


        /* =========================================
           FLOWER SHOWER
        ========================================= */

        startFlowerRain();


    }, candlesDoneTime);

}


/* =========================================================
   FLOWER SHOWER — CAKE AREA
========================================================= */

function startFlowerRain() {

    if (!petalContainer) {
        console.error("petalContainer not found");
        return;
    }

    // Purane flowers clear
    petalContainer.innerHTML = "";

    // Flower container visible
    petalContainer.classList.add("active");

    const flowers = [
        "🌹",
        "🌸",
        "🌺",
        "🌷",
        "🌼",
        "🌻"
    ];

    // First flower shower
    for (let i = 0; i < 90; i++) {

        setTimeout(() => {
            createCakePetal(flowers);
        }, i * 55);

    }

    // Second flower shower
    setTimeout(() => {

        for (let i = 0; i < 45; i++) {

            setTimeout(() => {
                createCakePetal(flowers);
            }, i * 70);

        }

    }, 2200);

    // Flower shower ke 6.5 second baad Thank You
    setTimeout(() => {
        showThankYouScreen();
    }, 6500);

}

/* =========================================================
   CREATE FLOWER AROUND CAKE
========================================================= */

function createCakePetal(flowers) {

    if (!petalContainer) {
        return;
    }

    const petal =
        document.createElement("div");

    petal.className = "petal";

    petal.textContent =
        flowers[
            Math.floor(
                Math.random() * flowers.length
            )
        ];


    /*
     * Cake ke aas-paas X position
     */

    petal.style.left =
        (15 + Math.random() * 70) + "%";


    /*
     * Cake ke aas-paas se start
     * top se nahi
     */

    petal.style.top =
        (25 + Math.random() * 25) + "%";


    petal.style.fontSize =
        (18 + Math.random() * 24) + "px";


    /*
     * Neeche cake ke around fall karega
     */

    petal.style.setProperty(
        "--fall-x",
        ((Math.random() - 0.5) * 220) + "px"
    );


    petal.style.setProperty(
        "--fall-y",
        (180 + Math.random() * 250) + "px"
    );


    petal.style.animationDuration =
        (3.5 + Math.random() * 2.5) + "s";


    petal.style.animationDelay =
        (Math.random() * 0.3) + "s";


    petalContainer.appendChild(petal);


    /*
     * Remove after animation
     */

    setTimeout(() => {

        petal.remove();

    }, 7000);
}
    

    /* =====================================================
       INITIAL STATE
    ===================================================== */

    const savedWish =
        localStorage.getItem(
            "birthdayWish"
        );


    if (
        savedWish &&
        savedWish.trim()
    ) {

        wishSent =
            true;

    }


    console.log(
        "✅ Reveal.js loaded successfully"
    );

});

/* =========================================================
   RANDOM BACKGROUND STARS
========================================================= */

function createBackgroundStars() {

    const starContainer =
        document.querySelector(".stars");

    if (!starContainer) {
        return;
    }

    /* Purane generated stars remove */

    starContainer.innerHTML = "";


    /*
     * Desktop = 180 stars
     * Mobile = 100 stars
     */

    const starCount =
        window.innerWidth <= 600
            ? 100
            : 180;


    for (let i = 0; i < starCount; i++) {

        const star =
            document.createElement("div");

        star.className =
            "background-star";


        /*
         * Random position
         */

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";


        /*
         * Random size
         */

        const size =
            1 +
            Math.random() * 1.8;

        star.style.width =
            size + "px";

        star.style.height =
            size + "px";


        /*
         * Random brightness
         */

        star.style.opacity =
            0.25 +
            Math.random() * 0.65;


        /*
         * Different twinkle timing
         */

        star.style.animationDuration =
            (
                15 +
                Math.random() * 20
            ) + "s";


        star.style.animationDelay =
            (
                Math.random() * 20
            ) + "s";


        starContainer.appendChild(star);
    }
}


/*
 * Start stars when page loads
 */

document.addEventListener(
    "DOMContentLoaded",
    createBackgroundStars
);


  /* =========================================================
   THANK YOU SCREEN
========================================================= */

function showThankYouScreen() {

    // Agar screen pehle se bani hai toh dobara mat banao
    if (document.getElementById("thankYouScreen")) return;

    const screen = document.createElement("div");

    screen.id = "thankYouScreen";

    screen.style.cssText = `
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background:
            radial-gradient(circle at top, #5b006f 0%, transparent 45%),
            linear-gradient(135deg, #12001f, #350044, #090014);
        color: white;
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        overflow: hidden;
        font-family: Arial, sans-serif;
    `;

    screen.innerHTML = `
        <div class="thank-you-content">

            <div class="thank-you-om">ॐ</div>

            <h1>Thank You Riya Ji ❤️</h1>

            <p class="thank-you-main">
                Aapne meri chhoti si duniya ko<br>
                itna special bana diya ✨
            </p>

            <p class="thank-you-sub">
                Aapki smile hamesha aise hi chamakti rahe,<br>
                aur har wish sach ho jaaye 🌸
            </p>

            <div class="thank-you-line"></div>

            <p class="thank-you-footer">
                Made with love, just for you 💖
            </p>

            <p class="developer-text">
                Designed by Developer Rajput Ujjwal
            </p>

            <div class="close-countdown">
                This surprise will end in
                <span id="closeTimer">30</span>
            </div>

        </div>
    `;

    document.body.appendChild(screen);

    // Glowing stars
    for (let i = 0; i < 45; i++) {

        const star = document.createElement("span");

        star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: white;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.7 + 0.3};
            animation: thankYouTwinkle ${
                Math.random() * 3 + 2
            }s infinite alternate;
        `;

        screen.appendChild(star);
    }

    // Thank You screen ki CSS
    const style = document.createElement("style");

    style.textContent = `
        #thankYouScreen .thank-you-content {
            position: relative;
            z-index: 2;
            padding: 25px;
            animation: thankYouAppear 1.5s ease;
        }

        #thankYouScreen .thank-you-om {
            font-size: 70px;
            margin-bottom: 15px;
            animation: thankYouGlow 2s infinite alternate;
        }

        #thankYouScreen h1 {
            font-size: 42px;
            margin: 10px 0 20px;
            color: #ffd6ff;
            text-shadow: 0 0 15px #ff69d9;
        }

        #thankYouScreen .thank-you-main {
            font-size: 21px;
            line-height: 1.7;
            margin: 0;
        }

        #thankYouScreen .thank-you-sub {
            font-size: 18px;
            line-height: 1.7;
            margin-top: 20px;
            color: #ffd9f7;
        }

        #thankYouScreen .thank-you-line {
            width: 150px;
            height: 2px;
            margin: 28px auto;
            background: linear-gradient(
                90deg,
                transparent,
                #ff8de7,
                transparent
            );
        }

        #thankYouScreen .thank-you-footer {
            font-size: 16px;
            color: #ffc9f4;
            margin-bottom: 8px;
        }

        #thankYouScreen .developer-text {
            font-size: 14px;
            color: #d9b6d5;
            margin-bottom: 25px;
        }

        #thankYouScreen .close-countdown {
            font-size: 15px;
            color: #e8cde5;
        }

        #thankYouScreen #closeTimer {
            display: inline-block;
            min-width: 25px;
            font-weight: bold;
            color: #ff9de8;
        }

        @keyframes thankYouGlow {
            from {
                transform: scale(1);
                text-shadow: 0 0 10px #ff69d9;
            }

            to {
                transform: scale(1.08);
                text-shadow:
                    0 0 20px #ff69d9,
                    0 0 35px #c000ff;
            }
        }

        @keyframes thankYouTwinkle {
            from {
                opacity: 0.2;
                transform: scale(0.7);
            }

            to {
                opacity: 1;
                transform: scale(1.4);
            }
        }

        @keyframes thankYouAppear {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.9);
            }

            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        @media (max-width: 600px) {
            #thankYouScreen h1 {
                font-size: 30px;
            }

            #thankYouScreen .thank-you-main {
                font-size: 17px;
            }

            #thankYouScreen .thank-you-sub {
                font-size: 16px;
            }
        }
    `;

    document.head.appendChild(style);

    // 30 seconds countdown
    let timeLeft = 30;

    const timer = setInterval(() => {

        timeLeft--;

        const timerElement =
            document.getElementById("closeTimer");

        if (timerElement) {
            timerElement.textContent = timeLeft;
        }

        if (timeLeft <= 0) {

            clearInterval(timer);

            // Screen fade out
            screen.style.transition = "opacity 1s ease";
            screen.style.opacity = "0";

            setTimeout(() => {

                // Screen remove
                screen.remove();

                // Browser tab close karne ki request
                window.close();

                // Agar browser close na kare
                setTimeout(() => {

                    document.body.innerHTML = `
                        <div style="
                            background: #090014;
                            color: white;
                            height: 100vh;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            text-align: center;
                            font-family: Arial, sans-serif;
                            font-size: 22px;
                        ">
                            You can close this tab now ❤️
                        </div>
                    `;

                }, 500);

            }, 1000);
        }

    }, 1000);

}