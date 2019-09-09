class Player {
    constructor(el, app){
        this.app = app;
        this.playerDom = document.querySelector(el);
        this.audio = this.playerDom.querySelector("audio");
        this.playBtn = this.playerDom.querySelector(".play");
        this.stopBtn = this.playerDom.querySelector(".stop");

        this.progressBar = this.playerDom.querySelector(".bar");

        this.currentSpan = this.playerDom.querySelector(".current-time");
        this.totalSpan = this.playerDom.querySelector(".total-time");

        this.progress = this.playerDom.querySelector(".progress");

        this.addListener();
        requestAnimationFrame(this.frame.bind(this));
    }

    addListener(){
        this.playBtn.addEventListener("click",  this.play.bind(this));
        this.stopBtn.addEventListener("click",  this.stop.bind(this));
        this.progress.addEventListener("click", this.changeSeeking.bind(this));
    }

    changeSeeking(e){
        let target = e.offsetX / this.progress.clientWidth * this.audio.duration;
        this.audio.currentTime = target;
    }

    play(){
        this.audio.play();
    }

    stop(){
        this.audio.pause();
    }

    frame(timestamp){
        requestAnimationFrame(this.frame.bind(this));
        this.render();
    }

    render(){
        let current = this.audio.currentTime;
        let duration = this.audio.duration;
        this.progressBar.style.width = `${current / duration * 100}%`;

        this.currentSpan.innerHTML = current.timeFormat();
        this.totalSpan.innerHTML = duration.timeFormat();
    }

}