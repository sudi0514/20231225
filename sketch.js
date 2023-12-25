function preload(){
  sound1 = loadSound("X2Download (mp3cut.net).mp3")
}

var face_colors = "e5e5e5-8d99ae-415a77-c9184a-9a031e".split("-").map(a=>"#"+a)
var eye_colors = "ffc8dd-ff4d6d-fff0f3-22223b-f7ede2".split("-").map(a=>"#"+a)
// var pos_x=[200,500]
// var pos_y=[400,600]
// var sizes=[0.6,0.2]
// var colors=["#ffb5a7","#fcd5ce"]
var pos_x=[]
var pos_y=[]
var sizes=[]
var colors=[]
var v_y=[]
var v_x=[]
var txts  //宣告一個變數，變數存放著文字框內容
var face_move_var = false
var lang = navigator.language ||en-US   //取的瀏覽器的語系
var myRec = new p5.SpeechRec(lang)
var face_Rot_var = false
function setup() {
  createCanvas(windowWidth, windowHeight);
  analyzer = new p5.Amplitude();
  analyzer.setInput(sound1);
  intputElement = createInput("412730060蘇娣")
  intputElement.position(10,10)  //把文字方塊放到(10,10)
  intputElement.size(160,40)  //文字的寬與高
  //以下的style，可以搜尋 html input css找到相關資料
  intputElement.style("font-size","20px")  //文字框內的大小
  intputElement.style("color","#780000")   //文字顏色
  intputElement.style("background","#fce2d4")  //文字框的背景顏色
  intputElement.style("border","none")  //


  //按鈕的設定
  btnMoveElement = createButton("移動")  //產生一個按鈕，按鈕上有移動的字眼
  btnMoveElement.position(170,10)  //按鈕的位置
  btnMoveElement.size(80,40)
  btnMoveElement.style("font-size","20px")
  btnMoveElement.style("color","#edf2f4")
  btnMoveElement.style("background-color","#6d597a")
  btnMoveElement.mousePressed(face_move)


  btnStopElement = createButton("暫停")
  btnStopElement.position(270,10)  //按鈕的位置
  btnStopElement.size(80,40)  
  btnStopElement.style("font-size","20px")
  btnStopElement.style("color","#edf2f4")
  btnStopElement.style("background-color","#6d597a")
  btnStopElement.mousePressed(face_stop)

  //radio的設定，多個選項，只能選擇一個(單選題)
  radioElement = createRadio()
  radioElement.option("暫停")
  radioElement.option("旋轉")
  radioElement.option("移動")
  radioElement.position(370,10)  //選鈕的位置
  radioElement.size(200,40)
  radioElement.style("font-size","20px")
  radioElement.style("color","#d90429")
  radioElement.style("background-color","#ffffff")
  radioElement.mousePressed(face_move)
  
  btnVoiceElement = createButton("音樂")  //產生一個按鈕，按鈕上有移動的字眼
  btnVoiceElement.position(600,10)  //按鈕的位置
  btnVoiceElement.size(80,40)
  btnVoiceElement.style("font-size","20px")
  btnVoiceElement.style("color","#edf2f4")
  btnVoiceElement.style("background-color","#6d597a")
  btnVoiceElement.mousePressed(voice_go)

//checkBox的設定，多個選項，可以選多個(複選題)
// for(var i = 0;i<20;i=i+1){
// drawface(face_clr[int(random(face_clr.length))],eye_clr[int(random(eye_clr.length))],random(0.3,1.2))
// }
}

function draw() {
 background("#4a4e69");
 mode= radioElement.value();
 for(var i=0;i<pos_x.length;i=i+1)
 {
    push()
     txts = intputElement.value();  //把文字框的文字內容，放到txts變數內
       translate(pos_x[i],pos_y[i])
       if(sound1.isPlaying()){
        AudioContext=getAudioContext();
        amplitude=map(analyzer.getLevel(),0,1,0,100)
        angle=sin(amplitude*v_y[i])
        rotate(angle)
        drawface(colors[i],0,sizes[i])
        }
      else{
        drawface(colors[i],0,sizes[i])
      }


       if(mode=="旋轉" || face_Rot_var){
        rotate(sin(frameCount/20*v_y[i]))
       }
       drawface(colors[i],0,sizes[i])

   pop()
   if(face_move_var|| mode=="移動"){ //在face_move_var為ture的時候，臉物件會移動
   pos_y[i] = pos_y[i] + v_y[i]   //移動
  }
   }

   if(pos_y[i]>height  || pos_y[i]<0) 
   {
    pos_x.splice(i,1)
    pos_y.splice(i,1)
    sizes.splice(i,1)
    colors.splice(i,1)
    v_y.splice(i,1)
  
  }
}


function drawface (face_clr=255,eye_clr=0,size=1) {  //255與0為預設的值
  push()  //自行設定格式
  // translate(random(width),random(height))  //把原點(0,0)移動到(200,200)
  //文字框的顯示格式
  scale(size)  //先宣告放大縮小的比例尺
  fill("#fff")
  fill(face_clr)
  scale(size)
  fill(face_clr)
  ellipse(330, 330, 200,150);	//目前此圓，仍以圓心為座標點
  ellipseMode(CORNER)   // 設定以左上角為座標點上的座標
  ellipse(230,405, 200, 300); //身體
  fill(eye_clr)
  ellipse(350,305,50,25) //眼睛
  fill(eye_clr)
  ellipse(270,305,50,25) //眼睛
  fill("#000000")
  ellipse(320,325,25,20) //嘴巴
  

pop() //把原本設定的格式全部取消  
}


function mousePressed(){
  if(mouseY>60){  //設定y軸為設定0~60間的座標值
    //產生一個新的物件
  push()
  pos_x.push(mouseX)
  pos_y.push(mouseY)
  sizes.push(random(0.5,0,3))
  colors.push(face_colors[int(random(face_colors.length))])
  v_y.push(random(-1,1))
pop()
}
}


function face_move(){
  face_move_var = true
  sound1.play();
}


function face_stop(){
  face_move_var = false
  sound1.stop();
}

function voice_go(){
  myRec.onResult = showResult //取的語音辨識後去執行function
  myRec.start()  //開始辨識
 
}

function showResult(){
  if(myRec.resultValue == true)
{
    print(myRec.resultString)
    let lowStr = myRec.resultString.toLowerCase();
    let mostrecentword = lowStr.split(' ').pop();
    //
    if(myRec.resultString.indexOF("走") !== -1){
      face_move_var = true
}
    if(myRec.resultString.indexOF("停") !== -1){
      face_move_var = false
      face_Rot_var = false
}
    if(myRec.resultString.indexOF("轉") !== -1){
     face_Rot_var = true
}
    }
}


