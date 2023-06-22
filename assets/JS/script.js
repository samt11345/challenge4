var startBtn = document.getElementById("start-btn")
var questionContainer = document.getElementById("question-container")
var Q =0
function startGame(){
    //on click start game
    //when you click the button the start screen hides
    document.getElementById("start-container").classList.add("hide")
    //and the question screen loads
    questionContainer.classList.remove("hide")
    askQuestion()
}

function askQuestion (){
    document.getElementById("question").textContent=questions[Q].title
    document.getElementById("anwser-buttons").innerHTML=""
    questions[Q].choices.forEach(function(choice,index){
var button=document.createElement("button")
button.textContent=choice
button.setAttribute("value",choice)
button.addEventListener("click",function(){
    console.log (this)
    if(this.value === questions[Q].correct){
        console.log("correct")
    }
    else{console.log("incorrect")}
    Q++;
    askQuestion()
})
document.getElementById("anwser-buttons").append(button)
    })
}




startBtn.addEventListener("click",startGame)