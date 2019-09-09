Number.prototype.timeFormat = function(){
    let h = "0" + Math.floor(this / 3600);
    h = h.substring(h.length - 2, h.length);
    let m = "0" + Math.floor(this % 3600 / 60);
    m = m.substring(m.length - 2, m.length);
    let s = "0" + Math.floor(this % 3600);
    s = s.substring(s.length - 2, s.length);
    return `${h} : ${m} : ${s}`;
}

class App {
    constructor(playerEL, listEL) {
        this.player = new Player(PlayerEL, this);
        this.playList = new playList(listEL, this);
    }
}

window.addEventListener("load", ()=>{
    let player = new Player("#player");
});