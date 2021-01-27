
// var element = $("#imageDIV"); // global variable
// var getCanvas; // global variable
// $('document').ready(function(){
//   html2canvas(element, {
//     onrendered: function (canvas) {
//       $("#previewImage").append(canvas);
//       getCanvas = canvas;
//     }
//   });
// });
// $("#download").on('click', function () {
//   var imgageData = getCanvas.toDataURL("image/png");
//   // Now browser starts downloading it instead of just showing it
//   var newData = imageData.replace(/^data:image\/png/, "data:application/octet-stream");
//   $("#download").attr("download", "image.png").attr("href", newData);
// });


{/* <div id="my-node">
  You will get a image downloaded.
</div>

<button id="foo">download img</button>

<script>
var node = document.getElementById('my-node');
var btn = document.getElementById('foo');
btn.onclick = function() {
node.innerHTML = "I'm an image now."
  domtoimage.toBlob(document.getElementById('my-node'))
    .then(function(blob) {
      window.saveAs(blob, 'my-node.png');
    });
}
</script> */}
var moonRayArray=[];
var sunRayArray=[];

$('.sun').on('mouseover',event=>{
  $('.shield').addClass('rotateShield')
  $('.gearOne').addClass('rotateGearRight')
  $('.gearTwo').addClass('rotateGearRight')
  $('.gearOne').addClass('rotateGearRight')
  $('.sun').attr('value','on');
  rayExpand();


})

$('.sun').on('mouseleave',event=>{
  $('.shield').removeClass('rotateShield')
  $('.gearOne').removeClass('rotateGearRight')
  $('.gearTwo').removeClass('rotateGearRight')
  $('.gearOne').removeClass('rotateGearRight')
  $('.sun').attr('value','off');
  $('.rayStick').attr('style','');
})

function rayExpand(){
var rayArray = $('.rayStick');
var rayLength= rayArray.length;
for(i=0; i<rayLength; i++){
  var red = Math.floor(Math.random()*250+100)
  var green = Math.floor(Math.random()*100+60)
  var blue = Math.floor(Math.random()*50+20)
  $(rayArray[i]).attr('style', 'transform:scale(7)rotate('+i*7.5+'deg);background-color:rgb('+red+','+green+','+blue+')')
  }
}

$('.moon').on('mouseover', event=>{
  $('.moonShadow').addClass('fullMoon')
  moonGlow();
})

$('.moon').on('mouseleave', event=>{
  $('.moonShadow').removeClass('fullMoon')
  $('.ray').attr('style','');
})

$('.moon').on('click',event=>{
  event.stopPropagation();
  event.preventDefault();
  glowFade();

})

function glowFade(){
  var rayArray= $('.ray')
  var rayLength= rayArray.length;
  for(let i=0; i<rayLength; i++){
    setTimeout(() => {
      var style = $(rayArray[i]).attr('style');
      styleArray=style.split(';');
      color=styleArray[1]
      moonRayArray.push(color);
      console.log(moonRayArray);
      $(rayArray[i]).attr('style', 'transform:scale('+(1+((6-i)*.3))+');'+color+';opacity:30%')
      var star=$('<div>');
      var height=Math.floor(Math.random()*100);
      var width=Math.floor(Math.random()*100);
      var size=Math.floor(Math.random()*30+10);
      $(star).addClass('star');
      $(star).attr('style', color+'; height:'+size+"px;width:"+size+"px;left:"+width+"%;top:"+height+"%")
      $('.sky').append(star);
      setTimeout(() => {
        $(rayArray[i]).attr('style', '')
      }, 200);
  }, i*50);
 }
}


function moonGlow(){
  var rayArray= $('.ray')
  var rayLength= rayArray.length;
  for(i=0; i<rayLength; i++){
    var red = Math.floor(Math.random()*50+40)
    var green = Math.floor(Math.random()*100+60)
    var blue = Math.floor(Math.random()*250+100)
    $(rayArray[i]).attr('style', 'transform:scale('+(1+((6-i)*.1))+');background-color:rgb('+red+','+green+','+blue+')')


  }
}

$(document).on("mouseover",".star",event=>{
  event.preventDefault();
  event.stopPropagation();
  $(event.target).removeClass('star');
  $(event.target).addClass('fallStar')
  var style = $(event.target).attr('style');
  style=style.split(';');
  color=style[0];
  sizeOne=style[1];
  sizeTwo=style[2];

  setTimeout(() => {
    $(event.target).remove()
    var stone = $('<div>');
    var randHeight=Math.floor(Math.random()*95+5)
    var halfsize= sizeOne.split(':');
    halfsize=halfsize[1];
    halfsize=halfsize.split('p');
    halfsize=halfsize[0];
    $(stone).addClass('stone')

    $(stone).attr("style", color+';'+sizeOne+';'+sizeTwo+";left:"+event.pageX+"px;top:"+randHeight+"%")
    $('.ground').append(stone);


    
  }, 500);


})

$('.sun').on('click',event=>{
  event.stopPropagation();
  event.preventDefault();
  $('.rays').addClass('rayExpand')
  setTimeout(() => {
    $('.rays').removeClass('rayExpand')
    creategradientsky();
    creategradientground();

    
  }, 500);
})


var creategradientsky= function( ){
  $(".day").html("");
  
  var rays=$('.rayStick')
  var rayLength=rays.length;
  for(i=0; i<rayLength;i++){
  // $(rayArray[i]).attr('style', 'transform:scale(7)rotate('+i*7.5+'deg);background-color:rgb('+red+','+green+','+blue+')')

  var colors = $(rays[i]).attr('style');
  colors = colors.split(";");
  colors=colors[1];
  colors=colors.split('(');
  colors=colors[1].split(',');
  var red=colors[0];
  var green = colors[1];
  var blue = colors[2].split(')');
  blue=blue[0]
  console.log(blue);
  console.log(red);
  console.log(green);
   var skystripe=$('<div>')
    $(skystripe).addClass('skystrip');
    $(skystripe).attr("style", "background-color:rgb("+red+","+green+","+blue+",.3);height:"+ Math.pow(rayLength-i,2)/200+"%")
    $(".day").append(skystripe);
  };
}
var creategradientground= function( ){
  $(".ground").html("");
  var rays=$('.rayStick')
  var rayLength=rays.length;
  for(i=0; i<rayLength;i++){
  // $(rayArray[i]).attr('style', 'transform:scale(7)rotate('+i*7.5+'deg);background-color:rgb('+red+','+green+','+blue+')')

  var colors = $(rays[i]).attr('style');
  colors = colors.split(";");
  colors=colors[1];
  console.log(colors);
  var skystripe=$('<div>')
    $(skystripe).addClass('skystrip');
    $(skystripe).attr("style", colors+";height:"+ Math.pow(i,2)/200+"%")
    $(".ground").append(skystripe);
  };
}