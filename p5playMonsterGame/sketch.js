let player, floor, wizard, title;
let wizimg;
let question;

let tButton, fButton, restarButton;
let qNum = 1;

let hp = 50;
let moving = 0.5;
let vel = -.9;

// 2:1 is == to 1000x500

// just testing
// questions (Sorce : https://quizlet.com/267925498/computer-science-truefalse-flash-cards/)
let questions = [
  { text: "A compiler transfers your text format into a binary ", answer: true },
  { text: "Input Is Data that has been processed by the CPU into a useful format that humans can understand ", answer: false },

  { text: "The CPU is responsible for executing instructions for the computer ", answer: true },
  { text: " One benefit to the use of symbolic languages is improved programming efficiency compared to a machine language ", answer: true },
  { text: " Writing code is the first step in the waterfall model of developing software ", answer: false }, // planning

];

function preload() {
  wizimg = loadImage('assets/monsterThing.png');
}

function setup() {
  new Canvas('window');
  //TODO add make sprites change size based off of window size
  world.gravity.y = 10;
  
  // True Option
  tButton = createButton("True");
  tButton.position(562.5, 170);

  // False Option
  fButton = createButton("False");
  fButton.position(875, 170);

  //restart Button
  restarButton = createButton("Play Again!");
  restarButton.position(710, 250);
  restarButton.hide();

  // Questions
  question = new Sprite();

  question.textSize = 27;
  question.text = questions[qNum].text;
  question.x = 750;
  question.y = 100;
  question.image = 'assets.png';
  question.collider = 'static';



  // Flooring
  floor = new Sprite();
  floor.y = 600;
  floor.w = 3000;
  floor.h = 200;
  floor.color = "lightgreen";
  strokeWeight(4);
  floor.stroke = "darkgreen";
  floor.collider = 'static';

  // Title
  title = new Sprite();
  title.x = 750;
  title.y = 600;
  title.image = 'assets/betterTitle.png';
  title.collider = 'static';

   // Player
   player = new Sprite();
   player.width = 50;
   player.height = 50;
   player.x = 50;
   player.y = 470;
   player.image = 'assets/Player1.png';

 
   // Enemy
   wizard = new Sprite();
   wizard.width = 50;
   wizard.height = 50;
   wizard.x = 1400;
   wizard.y = 470
   wizard.image = wizimg;
 
  // turns red or green when wrong or right
  check = new Sprite();
  check.x = 750;
  check.y = 210;
  check.collider = 'static';
  check.text = "N/a";


  // buttons
  tButton.mousePressed(trueButton);
  fButton.mousePressed(falseButton);

  // restart
  restarButton.mousePressed(restart);

}

function draw() {
  background("lightblue");

  wizard.velocity.x = vel;
  wizard.speed = moving

  player.velocity.x = 0;
  player.speed = 0;


  // You Lost
  if (player.collides(wizard)) {
    moving = 0;
    vel = 0;
    question.text = "You Lost!";
    qNum = 0;
    wizard.x = 1400;
    hp = 50;
    restarButton.show();
    tButton.hide();
    fButton.hide();
  }

  // You Won
  if (hp == 0) {
    moving = 0;
    vel = 0;
    question.text = "You Won!";
    qNum = 0;
    wizard.x = 1400;
    hp = 50;
    restarButton.show();
    tButton.hide();
    fButton.hide();
  }
}


// Correct
function correct() {
  wizard.image = 'assets/monsterDamage.png';
  check.color = 'green';
  check.text = "Correct!";
  hp = hp - 10;
  nextQuestion();
}

// Wrong
function wrong() {
  wizard.image = 'assets/monsterThing.png';
  check.color = 'red';
  check.text = "Incorect!"
  moving += 0.5;
  console.log(wizard.speed.x )
  nextQuestion();
}

// Moves to the next question
function nextQuestion() {
  qNum = (qNum + 1) % questions.length;
 
  question.text = questions[qNum].text;

}

// True button
function trueButton() {
  if (qNum <= questions.length) {
    if (questions[qNum].answer) {
      correct();
    } else {
      wrong();
    }
  }
}

// False button
function falseButton() {
  if (qNum <= questions.length) {
    if (!questions[qNum].answer) {
      correct();
    } else {
      wrong();
    }
  }
}


function restart() {
  vel = -.9;
  moving = .5;

  player.velocity.x = 0;
  player.speed = 0;
  restarButton.hide();
  tButton.show();
  fButton.show();
  nextQuestion();
}
