"use strict";
const DISPLAY = document.getElementById("timerDisplay");
const START_BUTTON = document.getElementById("timerStart");
const STATUS = document.getElementById("status");
let newTimerDone = true;
let counter;

START_BUTTON.addEventListener("click", function() {
    switch (START_BUTTON.innerHTML) {
        case "Start timer":
            START_BUTTON.innerHTML = "Stop timer";
            break;
        case "Stop timer":
            START_BUTTON.innerHTML = "Start timer";
            STATUS.innerHTML = "Timer";
            clearInterval(counter);
            return;
        default:
            START_BUTTON.innerHTML = "Stop timer";
            break;
    }
    const START_TIME = DISPLAY.innerHTML;
    const TIME = START_TIME.split(":", 2);
    let totalTimeSeconds = (parseInt(TIME[0]) * 60) + parseInt(TIME[1]);
    if (totalTimeSeconds > 0) totalTimeSeconds--;
    counter = setInterval(function() {
        const MINTUES = Math.floor(totalTimeSeconds / 60);
        const SECONDS = totalTimeSeconds - (MINTUES * 60);
        let separator = ":";
        let toPrepend = "";
        
        if (SECONDS < 10) {
            separator += "0";
        }
        
        if (MINTUES < 10) {
            toPrepend += "0";
        }
        
        DISPLAY.innerHTML = toPrepend + MINTUES + separator + SECONDS;
        if (totalTimeSeconds > 0) {
            totalTimeSeconds--;
        } else {
            if (newTimerDone) {
                switch (STATUS.innerHTML) {
                    case "Timer":
                        STATUS.innerHTML = "Timer done ! Timer done ! ";
                        break;
                    default:
                        const N = STATUS.innerHTML.length - 1;
                        let nextStatus = "";
                        nextStatus += STATUS.innerHTML[N];
                        for (let i = 0; i < N; i++) {
                            nextStatus += STATUS.innerHTML[i];
                        }
                        STATUS.innerHTML = nextStatus;
                        break;
                }
            } else {
                switch (STATUS.innerHTML) {
                    case "Timer done":
                    case "Timer":
                        STATUS.innerHTML = "!!! Timer done !!!";
                        break;
                    case "!!! Timer done !!!":
                        STATUS.innerHTML = "!! Timer done !!";
                        break;
                    case "!! Timer done !!":
                        STATUS.innerHTML = "! Timer done !";
                        break;
                    case "! Timer done !":
                        STATUS.innerHTML = "Timer done";
                        break;
                }
            }
        }
    }, 1000);
});