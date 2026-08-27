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

    enterButton?.addEventListener(
        "click",
        startReveal
    );


    function startReveal() {

        if (!openingScreen || !warningScreen) {
            return;
        }

        openingScreen.style.transition =
            "opacity .8s ease";

        openingScreen.style.opacity = "0";

        openingScreen.style.pointerEvents =
            "none";


        setTimeout(() => {

            openingScreen.style.display =
                "none";

            warningScreen.style.display =
                "flex";

            warningScreen.style.visibility =
                "visible";

            warningScreen.style.opacity =
                "1";


            startMatrix();

            startScanning();

        }, 800);

    }


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


        candlesBlown =
            false;


        /*
         * BLOW BUTTON LOCKED
         */

        blowCandlesBtn.disabled =
            true;

        blowCandlesBtn.classList.add(
            "locked"
        );

        blowCandlesBtn.classList.remove(
            "unlocked"
        );

        blowCandlesBtn.innerHTML =
            "🔒 Make your wish first";


        /*
         * RESET MESSAGE
         */

        blowMessage?.classList.remove(
            "show"
        );


        /*
         * RESET FLOWERS
         */

        if (petalContainer) {

            petalContainer.innerHTML =
                "";

        }


        /*
         * RESET VIDEO
         */

        if (secretVideo) {

            secretVideo.classList.remove(
                "show"
            );

            secretVideo.style.display =
                "";

        }


        if (revealVideoBtn) {

            revealVideoBtn.style.display =
                "none";

        }


        /*
         * RESET CANDLES
         */

        const candles =
            document.querySelectorAll(
                "#cakeScene .candle"
            );


        candles.forEach(
            candle => {

                candle.classList.remove(
                    "blown"
                );

            }
        );


        /*
         * CHECK SAVED WISH
         */

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

            unlockBlowButton();

        }

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

        /*
         * WISH CHECK
         */

        if (!wishSent) {

            if (wishStatus) {

                wishStatus.textContent =
                    "✨ Pehle apni wish likho aur Send My Wish dabao.";

            }

            return;

        }


        if (candlesBlown) {
            return;
        }


        const candles =
            document.querySelectorAll(
                "#cakeScene .candle"
            );


        if (!candles.length) {

            console.error(
                "No candles found inside #cakeScene"
            );

            return;

        }


        candlesBlown =
            true;


        blowCandlesBtn.disabled =
            true;

        blowCandlesBtn.classList.add(
            "unlocked"
        );


        blowCandlesBtn.innerHTML =
            "🌬️ Blowing...";


        if (wishStatus) {

            wishStatus.textContent =
                "🌬️ Making your wish...";

        }


        /*
         * CANDLES BLOW ONE BY ONE
         */

        candles.forEach(
            (candle, index) => {

                setTimeout(
                    () => {

                        candle.classList.add(
                            "blown"
                        );

                    },
                    index * 350
                );

            }
        );


        /*
         * AFTER CANDLES
         */

        const candleTime =
            candles.length * 350;


        setTimeout(
            () => {

                if (blowMessage) {

                    blowMessage.textContent =
                        "✨ Wish made... Happy Birthday ❤️";

                    blowMessage.classList.add(
                        "show"
                    );

                }


                blowCandlesBtn.innerHTML =
                    "✨ Wish Made ❤️";


                if (wishStatus) {

                    wishStatus.textContent =
                        "🌸 Something beautiful is coming...";

                }


                /*
                 * FLOWERS START
                 */

                startFlowerRain();


                /*
                 * VIDEO AFTER FLOWERS
                 */

                setTimeout(
                    openSecretVideo,
                    4500
                );


            },
            candleTime + 500
        );

    }


    /* =====================================================
       FLOWER RAIN
    ===================================================== */

    function startFlowerRain() {

        if (!petalContainer) {
            return;
        }


        const flowers = [

            "🌸",
            "🌺",
            "🌷",
            "🪷",
            "💮",
            "🌼",
            "🌻"

        ];


        /*
         * BIG WAVE
         */

        for (
            let i = 0;
            i < 80;
            i++
        ) {

            setTimeout(
                () => {

                    createPetal(
                        flowers
                    );

                },
                i * 65
            );

        }


        /*
         * SECOND WAVE
         */

        setTimeout(
            () => {

                for (
                    let i = 0;
                    i < 40;
                    i++
                ) {

                    setTimeout(
                        () => {

                            createPetal(
                                flowers
                            );

                        },
                        i * 100
                    );

                }

            },
            2500
        );

    }


    /* =====================================================
       CREATE PETAL
    ===================================================== */

    function createPetal(flowers) {

        if (!petalContainer) {
            return;
        }


        const petal =
            document.createElement(
                "div"
            );


        petal.className =
            "petal";


        petal.textContent =
            flowers[
                Math.floor(
                    Math.random() *
                    flowers.length
                )
            ];


        petal.style.left =
            Math.random() * 100 + "%";


        petal.style.fontSize =
            (
                16 +
                Math.random() * 22
            ) + "px";


        petal.style.animationDuration =
            (
                3 +
                Math.random() * 4
            ) + "s";


        petal.style.animationDelay =
            (
                Math.random() * .5
            ) + "s";


        petalContainer.appendChild(
            petal
        );


        setTimeout(
            () => {

                petal.remove();

            },
            8500
        );

    }


    /* =====================================================
       FLOWERS → SECRET VIDEO
    ===================================================== */

    function openSecretVideo() {

        if (!secretVideo) {

            console.error(
                "secretVideo not found"
            );

            return;

        }


        /*
         * STOP BIRTHDAY MUSIC
         */

        pauseBirthdayMusic();


        /*
         * HIDE MUSIC BUTTON
         */

        if (musicButton) {

            musicButton.classList.remove(
                "playing"
            );

            musicButton.style.display =
                "none";

        }


        /*
         * HIDE CAKE
         */

        if (cakeScene) {

            cakeScene.style.transition =
                "opacity 1s ease, transform 1s ease";

            cakeScene.style.opacity =
                "0";

            cakeScene.style.transform =
                "scale(.96)";

        }


        /*
         * SHOW VIDEO AFTER CAKE FADE
         */

        setTimeout(
            () => {

                if (cakeScene) {

                    cakeScene.style.display =
                        "none";

                }


                secretVideo.style.display =
                    "flex";

                secretVideo.style.visibility =
                    "visible";

                secretVideo.style.opacity =
                    "0";


                secretVideo.classList.add(
                    "show"
                );


                requestAnimationFrame(
                    () => {

                        secretVideo.style.opacity =
                            "1";

                    }
                );


                const video =
                    secretVideo.querySelector(
                        "video"
                    );


                if (video) {

                    video.currentTime =
                        0;


                    video.muted =
                        false;


                    video.volume =
                        1;


                    video.play()
                        .catch(
                            error => {

                                console.log(
                                    "Video autoplay blocked:",
                                    error
                                );

                            }
                        );

                }

            },
            1000
        );

    }


    /* =====================================================
       OPTIONAL VIDEO BUTTON
       Agar HTML mein button hai to manually bhi video
       open kar sakega.
    ===================================================== */

    revealVideoBtn?.addEventListener(
        "click",
        openSecretVideo
    );


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