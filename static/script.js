// Инициализация начального баланса при загрузке страницы
document.addEventListener('DOMContentLoaded', (event) => {
    updatePointsDisplay();
    checkTaskCompletion();
    updateLeaderboard();
});

// Функция для отображения текущего баланса
function updatePointsDisplay() {
    const points = localStorage.getItem('sharkPoints') || 0;
    document.getElementById('shark-points').textContent = points + ' $SHARK POINTS';
}

// Функция для выполнения задания и увеличения баланса
function completeTask() {
    if (!localStorage.getItem('taskCompleted')) {
        const currentPoints = parseInt(localStorage.getItem('sharkPoints') || 0);
        const newPoints = currentPoints + 5000;
        localStorage.setItem('sharkPoints', newPoints);
        localStorage.setItem('taskCompleted', true);
        updatePointsDisplay();
        document.getElementById('task-button').textContent = 'Claimed';
        document.getElementById('task-button').disabled = true;
        // Перенаправление на канал
        location.href = 'https://t.me/SharkCoinSolOriginal';
    } else {
        alert('Task already completed!');
    }
}

// Функция для проверки завершенности задания
function checkTaskCompletion() {
    if (localStorage.getItem('taskCompleted')) {
        document.getElementById('task-button').textContent = 'Claimed';
        document.getElementById('task-button').disabled = true;
    }
}

// Функция для копирования реферальной ссылки
function copyReferralLink() {
    const referralLink = "https://t.me/SharkCoinSol_bot/" + generateUniqueId();
    const currentPoints = parseInt(localStorage.getItem('sharkPoints') || 0);
    const newPoints = currentPoints + 3000; // Увеличение на 3000 за приглашенного друга
    localStorage.setItem('sharkPoints', newPoints);
    updatePointsDisplay();

    navigator.clipboard.writeText(referralLink).then(() => {
        alert('Referral link copied: ' + referralLink);
    });
}

// Функция для генерации уникального идентификатора
function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

// Функция для переключения вкладок
function showTab(tabId) {
    var tabs = document.getElementsByClassName('tab');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    document.getElementById(tabId).classList.add('active');

    var buttons = document.querySelectorAll('.nav-bar button');
    buttons.forEach(button => button.classList.remove('active'));
    event.target.classList.add('active');
}

// Функция для обновления списка лидеров и текущей позиции пользователя
function updateLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const userPoints = parseInt(localStorage.getItem('sharkPoints') || 0);
    
    // Обновление или добавление текущего пользователя в список лидеров
    let userExists = false;
    for (let i = 0; i < leaderboard.length; i++) {
        if (leaderboard[i].id === 'currentUser') {
            leaderboard[i].points = userPoints;
            userExists = true;
            break;
        }
    }
    if (!userExists) {
        leaderboard.push({id: 'currentUser', points: userPoints});
    }

    // Сортировка списка лидеров по количеству очков
    leaderboard.sort((a, b) => b.points - a.points);

    // Сохранение списка лидеров
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    // Обновление отображения списка лидеров и позиции пользователя
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = '';
    let userPosition = -1;

    for (let i = 0; i < leaderboard.length; i++) {
        const player = leaderboard[i];
        const listItem = document.createElement('p');
        listItem.textContent = (i + 1) + ' Player' + " " + player.id + " " + player.points + ' $SHARK POINTS';
        leaderboardList.appendChild(listItem);

        if (player.id === 'currentUser') {
            userPosition = i + 1;
        }
    }
    // Обновление позиции пользователя
    document.getElementById('leaderboard-position').textContent = 'Your Position:' + " " + userPosition;
}