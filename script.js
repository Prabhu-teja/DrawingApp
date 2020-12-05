let canvas=document.getElementById("drawHere");
let ctx=canvas.getContext("2d");
let mouseHold=false;
let size=10;
let toDraw=true;
let bgColor="#ffffff";
let textColor="#000000";
let toWrite=false;
$(document).ready(function(){
    $('[data-toggle="popover"]').popover();
});
document.getElementById("bgColorPicker").value=bgColor;
document.getElementById("textColorPicker").value=textColor;
function updateSize(tempSize){
    document.getElementById("size").innerText=tempSize;
}
document.querySelector("#clear").addEventListener("click",()=>{
    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
})
document.querySelector("#text").addEventListener("click",()=>{
    if(document.getElementById("text").classList.contains("active")){
        toDraw=true;
        toWrite=false;
        document.getElementById("text").classList.remove("active");
        document.getElementById("textToEnter").classList.add("hide");
    }
    else{
        toWrite=true;
        toDraw=false;
        document.getElementById("text").classList.add("active");
        document.getElementById("textToEnter").classList.remove("hide");
    }
})
setInterval(()=>{
    bgColor=document.getElementById("bgColorPicker").value;
    canvas.style.backgroundColor=bgColor;
    textColor=document.getElementById("textColorPicker").value;
    canvas.fillStyle=textColor;
})
document.querySelector("#increase").addEventListener("click",()=>{
    size+=5;
    if(size>=30){
        size=30;
    }
    updateSize(size);
})
document.querySelector("#decrease").addEventListener("click",()=>{
    size-=5;
    if(size<=5){
        size=5;
    }
    updateSize(size);
})
updateSize(size);
canvas.addEventListener("mousedown",()=>{
    mouseHold=true;
})
canvas.addEventListener("mouseup",()=>{
    mouseHold=false;
})
canvas.addEventListener("click",(e)=>{
    if(toDraw){
        ctx.beginPath();
        ctx.arc(e.offsetX,e.offsetY,size,0,2*Math.PI);
        ctx.fill();
    }
    if(toWrite){
        ctx.font=`normal ${size*4}pt Calibri`;
        ctx.fillText(document.getElementById("textToEnter").value,e.offsetX,e.offsetY);
        ctx.fill();
    }
})
canvas.addEventListener("mousemove",(e)=>{
    if(mouseHold){
        if(toDraw){
            ctx.beginPath();
            ctx.arc(e.offsetX,e.offsetY,size,0,2*Math.PI);
            ctx.fill();
            ctx.fillStyle=textColor;
        }
        if(toWrite){
            ctx.font=`normal ${size*4}pt Calibri`;
            ctx.fillText(document.getElementById("textToEnter").value,e.offsetX,e.offsetY);
            ctx.fill();
            ctx.fillStyle=textColor;
        }
    }
})