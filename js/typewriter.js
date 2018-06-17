var TxtType = function(toRotate, period) {
    this.toRotate = toRotate;
    this.el = $('#description');
    this.loopNum = 0;
    this.period = period || 2000;
    //this.period = speed;
    this.txt = '';
    this.isDeleting = false;
    this.tick();
};

TxtType.prototype.tick = function() {
 
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    var delta = this.period;
    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        delta = this.period / 2;
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        //delta = 200 - Math.random() * 10;
        var delta = this.period - fullTxt.length;
    }

    if(delta < 0){
        delta = 5;
    }

    $("#typetext").text(this.txt);
    var that = this;

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = deleteInterval;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

function startTyping() {
    var lines = txtArr;
    for (var i=0; i<lines.length; i++) {
        if (lines.length > 0) {
          new TxtType(lines, speed);
        }
    }
};

setTimeout(startTyping, 1000);
var txtArr = [
    'Research Enthusiastic',
    'Loves Art',
    'Do Spelling Mistakes',
    'Had worked in India, Japan, and United Kingdom',
    'Active Open Source Developer',
    ''
];
var speed = 120;
var deleteInterval = 2000;