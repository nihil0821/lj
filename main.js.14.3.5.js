const EventEmitter = require('events').EventEmitter;

class Countdown extends EventEmitter {
    constructor(seconds, supersititious) {
        super();
        this.seconds = seconds;
        this.supersititious = !!supersititious;
    }
    go() {
        const countdown = this;
        const timeoutIds = []; //
        return new Promise(function(resolve, reject) {
            for(let i = countdown.seconds; i>=0; i--) {
                timeoutIds.push(setTimeout(function() {
                    if(countdown.supersititious && i === 10) {
                        // 대기 중인 타임아웃 모두 취소
                        timeoutIds.forEach(clearTimeout);
                        return reject(new Error("Oh my god"));
                    }
                    countdown.emit('tick', i);
                    if(i===0) resolve();
                }, (countdown.seconds - i)*1000));
            }
        });
    }
}

//카운트 함수가 끝나면 실행
function launch() {
    return new Promise (function(resolve, reject) {
        console.log("Lift off!");
        setTimeout(function() {
            resolve("In orbit!");
        }, 2*1000)
    });
}

// 결정되지 않은 프라미스 방지하기
function launch2() {
    return new Promise(function(resolve, reject) {
        if(Math.random() < 0.5) return;
        console.log("Lift off!");
        setTimeout(function() {
            resolve("In orbit");
        }, 2*1000);
    });
}

const c = new Countdown(9, true).
    on('tick', i => console.log(i + '...'));
    
c.go()
    .then(addTimeout(launch2, 5*1000))
    .then(function(msg) {
        console.log(msg);
    })
    .catch(function(err) {
        console.error("Houston, we have a problem...");
    });


//프라미스에 타임아웃 걸기
function addTimeout(fn, timeout) {
    if(timeout === undefined) timeout = 1000;
    return function(...args) {
        return new Promise(function(resolve, reject) {
            const tid = setTimeout(reject, timeout, 
                new Error("promise timed out"));
            fn(...args)
                .then(function(...args) {
                    clearTimeout(tid);
                    resolve(...args);
                })
                .catch(function(...args) {
                    clearTimeout(tid);
                    reject(...args);
                });
        });
    }
}

