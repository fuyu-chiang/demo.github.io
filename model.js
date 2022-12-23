let img, imgred, imgblue, imgyellow;
let g, d;
let mobilenet; 
let video;
let classlabel = [''];
let probability;
let classifier;

//*可自行增加類別* new label
let labelNum = 3;			// 總共有幾組分類
let btnA, btnB, btnC;	
let spanA, spanB, spanC;
let countA=0, countB=0, countC=0;

let trainBtn;
let trainSpan;
let br;

let saveBtn;

/// log after model ready
function modelReady() {
    console.log('Model is ready!!!'); 
}

// return result from classifier
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

// let streamRdy = false;

function streamReady(){
  console.log('Stream Ready!!!')
  // streamRdy = true;
  // const options = { numLabels: labelNum };
  // mobilenet = ml5.featureExtractor('MobileNet', video, modelReady);
  // classifier = mobilenet.classification(video, options, videoReady);
}

function whileTraining(loss) {
    if (loss == null) {
				trainSpan.html("Training Complete!")
        classifier.classify(gotResults);
				saveBtn = createButton('save model');
	  		saveBtn.mouseClicked(function() {
        classifier.save();
    		});
    } else {
			  trainSpan.html("loss: "+loss.toString())
    }
}

function preload(){

	img = loadImage('asset/tree.png');
  imgred = loadImage('asset/red.png');
  imgblue = loadImage('asset/blue.png');
  imgyellow = loadImage('asset/yellow.png');

}


function setup() {

  createCanvas(400, 400);
  background(154,18,0)
 
  /// create video
  video = createCapture(VIDEO, streamReady);
  video.hide();

  // while(true){
  /// create ml5 classifier
  // if(streamRdy){
  const options = { numLabels: labelNum };
  mobilenet = ml5.featureExtractor('MobileNet', video, modelReady);
  classifier = mobilenet.classification(video, options, videoReady);
  // streamRdy = false;
  // break;
  // }
  // }
  
  ///*以下可自行增加分類* -----------------------------------
  /// label a
  btnA = createButton('add red images');
  spanA = createSpan('0 images');
  btnA.mousePressed(function() {
      classifier.addImage('red');
      spanA.html(countA.toString()+" images");
      countA+=1;
      console.log("image input...");
  });
  br = createElement('br');

  /// label b
  btnB = createButton('add yellow images');
  spanB = createSpan('0 images');
  btnB.mousePressed(function() {
      classifier.addImage('yellow');
      spanB.html(countB.toString()+" images");
      countB+=1;
      console.log("image input...");

  });
  br = createElement('br');

  /// label c
  btnC = createButton('add blue images');
  spanC = createSpan('0 images');
  btnC.mousePressed(function() {
      classifier.addImage('blue');
      spanC.html(countC.toString()+" images");
      countC+=1;
      console.log("image input...");

  });
  br = createElement('br');

  ///*以上可自行增加分類* -----------------------------------

  /// train button
  trainBtn = createButton('train');
  trainSpan = createSpan('');
  trainBtn.mouseClicked(function() {
      classifier.train(whileTraining);
  });

  image(img, -width*.1,-height*0.3,width*1.8,height*1.8);

}

function draw() {
  
  image(video, 0, 0, 80, 56);

  push();
    fill(255);
    stroke(0);
    strokeWeight(3);
    textSize(32);
    text(classlabel[0], 10, height - 40);
	  textSize(18);
	  text(probability,10,height-14)
	
		if (mouseIsPressed === true) {
    if (classlabel[0] === 'red') {
      image(imgred, mouseX-25,mouseY-20,50,40);
    }
    if (classlabel[0] === 'yellow') {
      image(imgyellow, mouseX-10,mouseY-10,20,20);
    }
    if (classlabel[0] === 'blue') {
      image(imgblue, mouseX-18,mouseY-14,36,28);
    }
  }
	  pop();

//我要做的事：1. 確定球球正確擺放 2. 認真做一個model，改成另一個檔案
//3. output使用botton（bottn function 開始做的條件，要和宣告bottn配合，加上文字和雪人
// 4. 手機版merry xmas!
	  
//   fill(255)
//     rect(0,0,width,height)
//   fill(0)
// // text(frameCount,100,100);
// text(millis(),100,100)
//     // fill(255)
//     // rect(0,0,width,height)
//   fill(0)
//   circle(mouseX,mouseY,30)
//   // image(img, 0,0,width,height);


}
