const rand_quote_url = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');


quoteInputElement.addEventListener('input', ()=> {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    let correct = true
    arrayQuote.forEach((charSpan,index) => {
        const character = arrayValue[index]
        if (character == null){
            charSpan.classList.remove('has-text-danger')
            charSpan.classList.remove('has-text-success')
            correct = false
        }else if (character === charSpan.innerText){
            charSpan.classList.remove('has-text-danger')  
            charSpan.classList.add('has-text-success')  
        }else{
            charSpan.classList.remove('has-text-success')  
            charSpan.classList.add('has-text-danger')  
            correct = false
        }
    })
    if (correct) stopTimer()
})

function getRandomQuote(){
    return fetch(rand_quote_url)
        .then(response => response.json())
        .then(data => data.content)
}

let wordCount;
async function renderNewQuote(){
    const quote = await getRandomQuote()
    wordCount = quote.split(' ').length;
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(char =>{
        const charSpan = document.createElement('span')
        charSpan.innerText=char
        quoteDisplayElement.appendChild(charSpan)
    })
    quoteInputElement.value = null
    startTimer()
}


//Reset Button Settings 
const resetbutton = document.getElementById('reset')
resetbutton.addEventListener('click',function(){
    renderNewQuote()
})

//Start Timer
const timer = document.getElementById('timer')

let startTime;
let interval;
function startTimer(){
    timer.innerText = 0
    startTime = new Date()
    interval = setInterval(()=>{
        timer.innerText = getTimerTime()
        current = getTimerTime
    },1000);
}

function stopTimer() {
    clearInterval(interval);
    console.log(`Word Count: ${wordCount}`)
    const finalTime = getTimerTime();
    const WPM = Math.floor((wordCount/finalTime)*60)
    timer.innerText = `You typed at a speed of ${WPM} words per minute!`;
    return finalTime
}

function getTimerTime(){
    return Math.floor((new Date() - startTime)/1000)
}