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
                    if(countdown.supersititious && i === 7) {
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

const c = new Countdown(9, true).
    on('tick', function(i){
        if(i>0) console.log(i + '...');
    });
    
c.go()
    .then(function () {
        console.log("GO!");
    })
    .catch(function(err) {
        console.error(err.message);
    });
