var speed = 120;
var interval = 2000;
var delay = 100;

var typingSpeedArr = [];
var deleteSpeedArr = [];

var rotate = true;
var shouldDelete = true;

var targetEl = $("#typetext");

var deleteText = function() {
    var txt = targetEl.text();
    if(txt.length === 0){
        typeNext();
    }else{
        txt = currentLine().substring(0, txt.length - 1);
        targetEl.text(txt);
        setTimeout(function() {
            deleteText();
        }, deleteSpeedArr[ currentLineIndex ]);
    }
};

var typeText = function() {
    var txt = targetEl.text();
    var cLine = currentLine();
    if(cLine){
        if(txt.length === cLine.length){
            if(shouldDelete){
                setTimeout(function() {
                    deleteText();
                }, interval);
            }else{
                typeNext();
            }
        }else{
            txt = cLine.substring(0, txt.length + 1);
            targetEl.text(txt);
            setTimeout(function() {
                typeText();
            }, typingSpeedArr[ currentLineIndex ] );
        }
    }
};

var currentLineIndex = 0;

function nextLine(){
    return lines[ currentLineIndex++ ];
}

function currentLine(){
    if(currentLineIndex === lines.length){
        if(rotate) currentLineIndex = 0;
        else return;
    }
    return lines[ currentLineIndex ];
}

function startTyping() {

    for(var i = 0; i < lines.length; i++){
        var line = lines[i];
        typingSpeedArr.push( speed - line.length );
        if( typingSpeedArr[i] < 1 ) typingSpeedArr[i] = 2;

        deleteSpeedArr.push( (speed / 2)  - line.length );
        if( deleteSpeedArr[i] < 1 ) deleteSpeedArr[i] = 2;
    }
    typeNext();
};


function typeNext(){
    var line = nextLine();
    line && (
        setTimeout(function() {
            targetEl.text('');
            typeText() ;
        }, interval)
    );
}

var lines = [
    'Research Enthusiastic',
    'Active Open Source Developer',
    'Security is Priority',
    'Not a big fan of Windows OS',
    'Helping many developers in opensource contribution',
    'Have worked in India, Japan, and England',
    'Loves Regular Expressions and SQL',
    'Prefers to write algorithms than supporting maintenance projects.',
    'Less talkative but loves talking',
    'Not much active on Facebook',
    'I want to make a big collections of books. But don\'t have the pateince to read them',
    'Supporting many opensource projects',
    'Prefer to work on Python, Node JS, and Java',
    'Don\'t play games',
    'I hate watching TV',
    'I would be happy to know more about you',
    'My contact detail is behind the computer screen',
];

setTimeout(startTyping, delay);

$(".typetext").each(function(){
    setTimeout(startTyping, delay);
})