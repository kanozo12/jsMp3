const MODE = {
    "NO":0,
    "ONE":1,
    "LIST":2
};

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
        this.fileName = this.playerDom.querySelector(".file-name");

        this.playable = false; //현재 플레이가 가능한가?

        this.repeatMode = MODE.NO; //최초에는 반복 없음으로
        this.modeBtnList = document.querySelectorAll(".repeat-btn");

        this.addListener();
        requestAnimationFrame(this.frame.bind(this));
    }

    addListener(){
        this.playBtn.addEventListener("click",  this.play.bind(this));
        this.stopBtn.addEventListener("click",  this.stop.bind(this));
        this.progress.addEventListener("click", this.changeSeeking.bind(this));
        this.audio.addEventListener("ended", this.musicEnd.bind(this));

        this.modeBtnList.forEach(btn => {
            btn.addEventListener("click", (e)=>{
                this.repeatMode = e.target.value * 1;
            });
        });
    }
    
    musicEnd(){
        //음악이 끝났을 때 해야할 일 
        //모드에 따라서 다음곡을 재생할지 이곡을 반복할지를 결정해야 한다.
        if(this.repeatMode == MODE.ONE){ //한곡반복 모드
            this.audio.play();
        }else if(this.repeatMode == MODE.LIST) {
            this.app.playList.getNextMusic(true); //루프를 적용해서 다음음악
        }else if(this.repeatMode == MODE.NO){
            this.app.playList.getNextMusic(false); //루프 미적용
        }
    }

    changeSeeking(e){
        if(!this.playable) return;  //재생불가능할 경우 실행하지 않는다.
        let target = e.offsetX / this.progress.clientWidth * this.audio.duration;
        this.audio.currentTime = target;
    }

    play(){
        if(!this.playable) return;
        this.audio.play();
    }

    stop(){
        if(!this.playable) return;
        this.audio.pause();
    }

    frame(timestamp){
        requestAnimationFrame(this.frame.bind(this));
        this.render();
    }

    render(){
        if(!this.playable) return;
        let current = this.audio.currentTime;
        let duration = this.audio.duration;
        this.progressBar.style.width = `${current / duration * 100}%`;

        this.currentSpan.innerHTML = current.timeFormat();
        this.totalSpan.innerHTML = duration.timeFormat();
    }

    loadMusic(musicFile) {
        let fileURL = URL.createObjectURL(musicFile);
        this.audio.pause();
        this.audio.src = fileURL;
        
        this.audio.addEventListener("loadeddata", ()=>{
            this.fileName.innerHTML = musicFile.name;
            this.playable = true;
            this.audio.play();
        });
    }
}