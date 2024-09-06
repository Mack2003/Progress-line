const nextButton = document.getElementById('next');
let barIndicator = document.getElementById('bar_indic');
const points = document.getElementsByClassName('points');
const crossLogo = document.querySelector('.crossLogo');
const DataAddingPanel = document.querySelector('.add_panel');
const addPanelOpenBtn = document.getElementById('newPics');
const detailsInput = document.getElementById('details');
const add_logo = document.querySelector('.add_logo');
const listBox = document.getElementById('listBox');
const insertBTN = document.getElementById('insert');
const mainContainer = document.querySelector('.main');
const music = new Audio('./mixkit-retro-game-notification-212.wav');
let ProgressLineData = [];
let pointsCount = 5;
let parclickDist = 0;
let totalLength = 0;
let clicks = 0;




const moveBar = (totalPoints, screenSize = window.innerWidth) => {
    parclickDist = Math.round(100/(totalPoints-1));
    totalLength += parclickDist;
    clicks++
    music.play();
    if (screenSize >= 500) {
        barIndicator.style.width = `${totalLength}%`;
    } else {
        barIndicator.style.height = `${totalLength}%`;
    }
    points[clicks]?.classList.add('glow');
};

nextButton.addEventListener('click', ()=> clicks!==pointsCount-1? moveBar(pointsCount):'');

crossLogo.addEventListener('click', () => {
    DataAddingPanel.classList.remove('showAddPanel');
    ProgressLineData = [];
    listBox.innerHTML = '';
});

addPanelOpenBtn.addEventListener('click', () => {
    DataAddingPanel.classList.add('showAddPanel');
});

add_logo.addEventListener('click', () => {
    if (detailsInput.value) {
        ProgressLineData.push({id: Math.floor(1000 + Math.random() * 9000), data: detailsInput.value});
        detailsInput.value = '';
        lodeCardsInDiv()
    } else {
        alert('Please fill the input !!!');
    }
});

const lodeCardsInDiv = () => {
    listBox.innerHTML = '';
    ProgressLineData.forEach((item, index) => {
        let card = document.createElement('div');
        card.classList.add('listCard');
        card.innerHTML = `
        <span>${index+1}</span>
                <span>${item.data}</span>
                <i onclick="deletCard(${item.id})" id="listDeletBTN" class="bi bi-trash-fill"></i>
        `
        listBox.appendChild(card);
    });
};

const deletCard = ( id ) => {
    ProgressLineData = ProgressLineData.filter(item => item.id !== id);
    lodeCardsInDiv()
};

insertBTN.addEventListener('click', () => {
    if (ProgressLineData.length>1) {
        mainContainer.innerHTML = `
        <div class="bar_con">
                <div id="bar_indic" class="bar_indic"></div>   
            </div>
        `
        ProgressLineData.forEach((item, index) => {
            let pointElement = document.createElement('div');
            pointElement.classList.add('points_con');
            if (index == 0) {
                pointElement.innerHTML = `
                <div class="content">${item.data}</div>
                        <div class="points glow"></div>
                `
            } else {
                pointElement.innerHTML = `
                <div class="content">${item.data}</div>
                        <div class="points"></div>
                `
            };
            mainContainer.appendChild(pointElement);
        });
        document.documentElement.style.setProperty("--maincontainerStrach", `${100*ProgressLineData.length}px`);
        pointsCount = ProgressLineData.length;
        clicks = 0;
        totalLength = 0;
        parclickDist = 0;
        barIndicator = document.getElementById('bar_indic');
        DataAddingPanel.classList.remove('showAddPanel');
    } else {
        alert("Please add minimum 2 points");
    };
});