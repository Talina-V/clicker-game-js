let input = document.querySelector('.input');

let btnStart = document.querySelector('.btn_start');
let btnBestResult = document.querySelector('.btn_br');
let btnBestResultAll = document.querySelector('.btn_br_all');
let btnResultClear = document.querySelector('.btn_clear');
let btnResultClearAll = document.querySelector('.btn_clear_all');
let countInP = document.querySelector('.click_res');
let countBestResult = document.querySelector('.best_result');
let btnClick = document.querySelector('.click_me');

let personalBD = { 
    nickname: {},
    clicks: 0,
    bestResult: 0,
    bestResultAll: 0
};

startGame = () => {

    function modalWindow (title) {
        let modal = document.createElement('div');
        modal.classList.add('modal');
        modal.style.display = "block";
        modal.innerHTML = `
            <div class="modal_content">
                <button class="btn_close"><i class="fa-solid fa-xmark"></i></button>
                <p class="modal_text">${title}</p>
            </div>
        `;
        document.body.appendChild(modal);
        // закрываем модальное окно
        let btnClose = document.querySelector('.btn_close');
            btnClose.addEventListener('click', () => {
                modal.remove();
        });
    }
    
    btnStart.addEventListener('click', () => {
        let nickname = input.value;
        if (nickname === '') {
            modalWindow('Empty nickname');
        } else {
            personalBD.nickname = nickname;
            personalBD.clicks = 0;
            console.log(personalBD);
            startTimer();
        };
    });

    function startTimer() {
        setTimeout(() => {
            modalWindow(`You clicked ${personalBD.clicks} times`);
        }, 3000);
    };

    btnClick.addEventListener('click', () => {
        personalBD.clicks +=1;
        countInP.innerHTML = `Your score is: ${personalBD.clicks}`;

        console.log(personalBD.clicks);
        
        if (personalBD.clicks > personalBD.bestResult) {
            personalBD.bestResult = personalBD.clicks;
            if (personalBD.bestResult > personalBD.bestResultAll) {
                personalBD.bestResultAll = personalBD.bestResult;
            }
            sessionStorage.setItem('bestResult', personalBD.bestResult);
            sessionStorage.setItem('bestResultAll', personalBD.bestResultAll);
            sessionStorage.setItem('nickname', personalBD.nickname);
        }
    });

    btnBestResult.addEventListener('click', () => {
        let bestResult = sessionStorage.getItem('bestResult');
        modalWindow(`Your best result is: ${bestResult}`);
    });

    btnBestResultAll.addEventListener('click', () => {
        let bestResultAll = sessionStorage.getItem('bestResultAll');
        let nickname = sessionStorage.getItem('nickname');
        modalWindow(`Best result for the time is: ${bestResultAll} by ${nickname}`);
    });

    btnResultClear.addEventListener('click', () => {
        let resultClear = 0;
        sessionStorage.setItem('bestResult', resultClear);
        modalWindow('Result cleared');
    });

    btnResultClearAll.addEventListener('click', () => {
        let resultClearAll = 0;
        sessionStorage.setItem('bestResultAll', resultClearAll);
        modalWindow('Result cleared');
    });
}

startGame();