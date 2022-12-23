let mobilenet;
let video;
let value;
let classlabel = [''];
let probability;
let classifier;
let labelNum = 3; // 總共有幾組分類
let nextBtn, snow;
let c;
let Snoww = 0, Textt = 0, done = 0, key =1;

let light=[];
let snowww = [];
let i = 0, h = 1;
let X, Y , color, number;

let img, imgred, imgblue, imgyellow, imgtext, imgstar;

let modeljson;
const options = { numLabels: labelNum };

class Light {
  constructor(arg) {  //這邊只接收一個 args 物件，而不是分別接收 r, clr, posX, posY...等多個參數
    this.x= arg.X;
    this.y = arg.Y;
    this.color = arg.color;
    this.number = arg.number;
  }

  display(){
    if(frameCount % 50 > 25 && ceil(this.x) % 2 ==0 ){
      if (this.color == 'red') {
        image(imgred, this.x-25,this.y-20,50,40);
      }
      if (this.color == 'yellow' ) {
        image(imgyellow, this.x-10,this.y-10,20,20);
      }
      if (this.color == 'blue') {
        image(imgblue,this.x-18,this.y-14,36,28);
      }
    }

    else if(frameCount % 50 <25 && ceil(this.y) % 2 ==1 ){
      if (this.color == 'red') {
        image(imgred, this.x-25,this.y-20,50,40);
      }
      if (this.color == 'yellow' ) {
        image(imgyellow, this.x-10,this.y-10,20,20);
      }
      if (this.color == 'blue') {
        image(imgblue,this.x-18,this.y-14,36,28);
      }
    }
  }
}


// class Snows{
//   constructor(arg) {  //這邊只接收一個 args 物件，而不是分別接收 r, clr, posX, posY...等多個參數
//         this.x= arg.X;
//         this.y = arg.Y;
//       }

//   display(){

//     push() //加入 push＆pop確保畫布不會亂跑
//     noStroke();
//     fill(255);
//     ellipse(this.x, this.y, 20);
//     pop();
//   }
// }
  



/// ml5 ----------------------------------------------------------
/// log after model ready
function modelReady() {
    console.log('Model is ready!!!');
    classifier.load('./model.json', customModelReady);
}

/// start to prediect after loading model
function customModelReady() {
    console.log('Custom model is ready!!!');
    classifier.classify(gotResults);

}

/// return result from predictor
function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        classlabel = results[0].label.split(',').map(s => s.trim());
        probability = results[0].confidence;
        classifier.classify(gotResults);
    }
}


function videoReady() {
    console.log('Video Ready!!!')
}

function streamReady(){
    console.log('Stream Ready!!!')
    // streamRdy = true;
    // const options = { numLabels: labelNum };
    // mobilenet = ml5.featureExtractor('MobileNet', video, modelReady);
    // classifier = mobilenet.classification(video, options, videoReady);
  }


function preload(){

	img = loadImage('asset/tree.png');
  imgred = loadImage('asset/red.png');
  imgblue = loadImage('asset/blue.png');
  imgyellow = loadImage('asset/yellow.png');
  imgtext = loadImage('asset/text.png');
  imgstar = loadImage('asset/star.png')

}


/// main ----------------------------------------------------------
function setup() {
    createCanvas(400, 400);
    background(154,18,0)

    /// create video
    video = createCapture(VIDEO);
    video.hide();

    /// create ml5 classifier
    mobilenet = ml5.featureExtractor('MobileNet', video, modelReady);
    classifier = mobilenet.classification(video, options, videoReady);

    image(img, -width*.1,-height*0.3,width*1.8,height*1.8);

    nextBtn = createButton('下一步');
    nextBtn.mousePressed(next);
    
}

function draw() {

    image(video, 0, 0,width*.4, height*.3);

    // textSize(18);
    // fill(0);
		// text(classlabel[0], 15, 15 + 180 + 18);

    // fill(154,frameCount/ 1000,0);
    // noStroke();
    // rect(15, 15 + 180 , 50, 50);
    
    //  有點醜但又需要，待處理
   
    if (mouseIsPressed == true && Snoww == 0) {
      i=i+1;
      if (classlabel[0] == 'red') {
          image(imgred, mouseX-25,mouseY-20,50,40);
          light[i] = i;
        }
      if (classlabel[0] == 'yellow') {
          image(imgyellow, mouseX-10,mouseY-10,20,20);
          light[i] = i;
        }
      if (classlabel[0] == 'blue') {
          image(imgblue, mouseX-18,mouseY-14,36,28);
          light[i] =i;
        }
      light[i] = new Light(
      {
            X : mouseX,
            Y : mouseY,
            color : classlabel[0],
            number : i
          }
        )
    }  

    // if (Snoww == 1){
    //   if (mouseIsPressed == true) {
    //     h=h+1;
    //     snowww[h] = new Snows(
    //       {
    //         X : mouseX,
    //         Y : mouseY
    //       });
    //   } 
    // }

    if (done == 1)  {
    circle(0,0,200);
    createCanvas(400, 400);
    background(154,18,0)

    image(imgtext, -80,-100,width*1.1,height*1.3);

    // for ( h=1;h<snowww.length ;h++){
    //     let ssnow = snowww[h];
    //     ssnow.display();
    // }

    image(img, -width*.1,-height*0.3,width*1.8,height*1.8);

    for ( j=1;j<light.length ;j++){
      let lightt = light[j]
      lightt.display();
    }

    image(imgstar, 268,10,width*.1,height*.1);

    }
  }
    // }
    //   if (Textt == 1)
    // {
    // fill(255);
    // let span = createSpan('如果還想加彩燈可以繼續喔');
    // span.position(0, 0);
    // }

    // rect(15, 15+180+8, 50, 50);
    //   if (Snoww == 0){
    //     let span = createSpan('this is some text');
    //     span.position(0, 0);
    //   }
   
    //接下來要做的事 一，蒐集class，顏色加位置，二，製作文字檔案，製作燈泡檔案
    //困難點：輸出 - 近一步做成gif 
    //重按按鈕會無限生成
        
    //魔名其妙的error，剩動畫還有美化尚未解決
    //閃亮亮的時候一直在雪的地方出錯

    

function next(){
      if (key == 1){
        snow = createButton('加點雪花吧');
        finish = createButton('雪花好了！');
        outpu = createButton('輸出點我！')
        snow.mousePressed(addsnow);
        finish.mousePressed(finishsnow);
        outpu.mousePressed(outputpic);
      }
      key = 0;
    }
    
function addsnow(){
    Snoww = 1;
}
function finishsnow(){
    Snoww=0;
}
function outputpic(){
  done = 1;
    
}