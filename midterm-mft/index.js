const questions=[
    {question:"آرامگاه صائب تبریزی کجاست ؟", answer: "اصفهان"},
    {question:"پهناورترین کشور جهان کجاست؟" ,answer:"روسیه"},
    {question:"آرژانتین بزرگترین تولید کننده این میوه میباشد؟", answer: "گلابی"},
    {question:"آبشاری زیبا و معروف در استان فارس؟",answer:"مارگون"},
    {question:"آخرین شاه قاجار چه نام داشت؟", answer:"احمدشاه"},
    {question:"در قدیم به علم شیمی میگفتند؟", answer:"کیمیا"},
    {question:"در قطب به عنوان وسیه نقلیه از آن استفاده میشود؟",answer:"سورتمه"},
    {question:"در گذشته از این ماده به عنوان بیهوشی استفاده میکردند؟",answer:"اتر"},
    {question:"در موسیقی به فاصله دو نت هم نام متوالی میگویند؟", answer:"اکتاو"},
    {question:"درختی که سرش را بزنی مثل انسان میمیرد؟",answer:"نخل"},
    {question:"دورترین سیاره منظومه شمسی چه نام دارد؟",answer:"پلوتون"},
    {question:"دریاچه ممرز مربوط به کدام شهر ایران است؟",answer:"نوشهر"},
    {question:"دوران بارداری این حیوان بیست و یک ماه میباشد؟",answer:"فیل"},
    {question:"در قدیم به نانوا میگفتند؟",answer:"خباز"},
    {question:"دانشمندی که جایزه صلح نوبل را دریافت کرد؟",answer:"انیشتین"}
];
function displayerror(errormessage){
  let error_box=document.getElementById("error-box")
  error_box.innerHTML=errormessage;
  error_box.style.display="block"
  setTimeout(function() {
    error_box.style.display="none";
  
  }, 2000);
}

function login(){
    let userhandle=document.getElementById("username")
    let passhandle=document.getElementById("password")
    let emailhandle=document.getElementById("email")
    let user=userhandle.value;
    let pass=passhandle.value;
    let email=emailhandle.value;

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    let passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 

    if(user=="" || pass=="" || email==""){
        displayerror("لطفا تمامی فیلدها را وارد کنید!!!")
        return
    }
    else if(!passRegex.test(pass)){
        displayerror("پسورد باید شامل 8 کاراکتر باشد و حداقل یک حرف و یک عدد داشته باشد")
        return
    }
    else if(!emailRegex.test(email)){
        displayerror("فرمت ایمیل وارد شده صحیح نیست")
        return
    }
    
    // userhandle.value=""
    // passhandle.value=""
    
    document.getElementById("login-form").style.display="none"
    document.getElementById("container-start").style.display="block"
}

let currentQuestionIndex=0;
let score=0
let incorrect=0

function start(){
    document.getElementById("container-start").style.display="none"
    document.getElementById("game-page").style.display="block"

    let questionElement=document.getElementById("question");
    questionElement.textContent=questions[currentQuestionIndex].question;
    let answerhandle=document.getElementById("answer")

    answerhandle.innerHTML=""
    for(let i=0;i<questions[currentQuestionIndex].answer.length;i++){
        let answerspan=document.createElement('span')

        answerspan.innerText=" - "
        answerhandle.appendChild(answerspan)
    }
    let hintButton = document.getElementById("hint-button");
    hintButton.addEventListener("click", giveHint);
    activateAlphabetButtons()
    document.getElementById("hint-button").disabled = false;
  
}
function activateAlphabetButtons() {
    let alphabetButtons = document.getElementsByClassName("alphabet");
    for (let i = 0; i < alphabetButtons.length; i++) {
      alphabetButtons[i].disabled = false; 
    }
   
  }

function nextbutton(){
    currentQuestionIndex++
    if(currentQuestionIndex<questions.length){
        start()
        activateAlphabetButtons();
    
    }
    
}

function winmessage() {
    let winPopup = document.getElementById("win-popup");
    let restartButton = document.getElementById("restart-button");
      
    winPopup.style.display = "block";
    restartButton.addEventListener("click", restartGame);
    }
      
function restart() {
    let winPopup = document.getElementById("win-popup");
      winPopup.style.display = "none";
      currentQuestionIndex = 0;
      incorrectguess=0
      score = 0;
      start();
      }
function word() {
    let alphabetBox = document.getElementById("alphabet-box");
    let answerText = document.getElementById("answer");
    let score_handle = document.getElementById("score");
    let incorrectHandle=document.getElementById("incorrect")
    let incorrectguess=0
      
      alphabetBox.addEventListener("click", function (event) {
        if (event.target.classList.contains("alphabet")) {
          const letter = event.target.textContent;
          let answerBoxes = answerText.getElementsByTagName("span");
          let isCorrect = false;
      
          for (let i = 0; i < answerBoxes.length; i++) {
            if (answerBoxes[i].textContent === " - " && questions[currentQuestionIndex].answer[i] === letter) {
              answerBoxes[i].textContent = letter;
              isCorrect = true;
                break;
                }
              }
      
          if (isCorrect) {
            score += 5;
            score_handle.innerText = 'امتیاز: ' + score;
                }
          else {
            if (!questions[currentQuestionIndex].answer.includes(letter)) {
              event.target.disabled = true;
              incorrectguess++
              } }
            // let restartdiv=document.getElementById("start-again")
            // restartdiv.addEventListener("click",restart)
            // if(incorrectguess>=5){
              // displayerror("باختی!!!")
              // let restartgain=document.getElementById("start-again")
              // restartgain.style.display="block"
              // // incorrectguess=0
              // restart()
              // location.reload()
            // }
  let isAnswerComplete = true;
    for (let i = 0; i < answerBoxes.length; i++) {
      if (answerBoxes[i].textContent === " - ") {
        isAnswerComplete = false;
          break;
          }}
      
      if (isAnswerComplete) {
        if (currentQuestionIndex < questions.length - 1) {
           currentQuestionIndex++;
           start();
           activateAlphabetButtons();
           } 
        else {
          let allCorrect = false;
          for (let i = 0; i < questions.length; i++) {
            let answer = questions[i].answer;
            let userAnswer = answerBoxes[i].textContent.trim();
            if (userAnswer !== answer) {
                allCorrect = true;
                break;
                }}
      if (allCorrect) {
        winmessage()
          }}
        }
      }
    });     
  }
     
function giveHint() {
  let answerBoxes = document.getElementById("answer").getElementsByTagName("span");
  let unguessedIndex = -1;
    for (let i = 0; i < answerBoxes.length; i++) {
      if (answerBoxes[i].textContent == " - ") {
        unguessedIndex = i;
        break;
        }}
      
    if(score<30){
      displayerror("امتیاز شما برای استفاده از راهنما کافی نیست!!!")
      return
      }
      
    if (unguessedIndex >= 0) {
      answerBoxes[unguessedIndex].textContent = questions[currentQuestionIndex].answer[unguessedIndex];
      score -= 30;
      document.getElementById("score").textContent = 'امتیاز: ' + score;
      }
        // document.getElementById("hint-button").disabled = true;
    }


      
      
    
