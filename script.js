class SchulteGame {
    constructor() {
        this.gridSize = 5;
        this.gameMode = 'free'; // 'free' hoặc 'timed'
        this.timeLimit = 60; // giây
        this.isPlaying = false;
        this.startTime = null;
        this.timerInterval = null;
        this.currentNumber = 1;
        this.totalNumbers = 0;
        this.foundNumbers = 0;
        this.gridNumbers = [];
        
        this.initializeElements();
        this.bindEvents();
        this.updateUI();
    }

    initializeElements() {
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.gridSizeSelect = document.getElementById('gridSize');
        this.gameModeRadios = document.querySelectorAll('input[name="gameMode"]');
        this.timeLimitGroup = document.getElementById('timeLimitGroup');
        this.timeLimitInput = document.getElementById('timeLimit');
        this.timerDisplay = document.getElementById('timer');
        this.nextNumberText = document.getElementById('nextNumberText');
        this.gridContainer = document.getElementById('gridContainer');
        this.results = document.getElementById('results');
        this.status = document.getElementById('status');
    }

    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.stopBtn.addEventListener('click', () => this.stopGame());
        this.gridSizeSelect.addEventListener('change', () => this.updateGridSize());
        
        this.gameModeRadios.forEach(radio => {
            radio.addEventListener('change', () => this.updateGameMode());
        });
        
        this.timeLimitInput.addEventListener('change', () => this.updateTimeLimit());
    }

    updateGridSize() {
        this.gridSize = parseInt(this.gridSizeSelect.value);
        this.totalNumbers = this.gridSize * this.gridSize;
        this.createGrid(); // Tạo lại bảng khi thay đổi kích thước
    }

    updateGameMode() {
        this.gameMode = document.querySelector('input[name="gameMode"]:checked').value;
        this.timeLimitGroup.style.display = this.gameMode === 'timed' ? 'block' : 'none';
    }

    updateTimeLimit() {
        this.timeLimit = parseInt(this.timeLimitInput.value);
    }

    generateRandomNumbers() {
        const numbers = [];
        for (let i = 1; i <= this.totalNumbers; i++) {
            numbers.push(i);
        }
        
        // Shuffle array
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        
        return numbers;
    }

    createGrid() {
        this.gridContainer.innerHTML = '';
        const grid = document.createElement('div');
        grid.className = 'grid';
        grid.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;
        
        this.gridNumbers = this.generateRandomNumbers();
        
        for (let i = 0; i < this.totalNumbers; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.textContent = this.gridNumbers[i];
            cell.dataset.number = this.gridNumbers[i];
            cell.addEventListener('click', () => this.handleCellClick(cell));
            grid.appendChild(cell);
        }
        
        this.gridContainer.appendChild(grid);
    }

    handleCellClick(cell) {
        if (!this.isPlaying) {
            this.showStatus('Nhấn "Bắt đầu" để bắt đầu trò chơi!', 'info');
            return;
        }
        
        const clickedNumber = parseInt(cell.dataset.number);
        
        if (clickedNumber === this.currentNumber) {
            // Đúng số
            cell.classList.add('correct');
            this.currentNumber++;
            this.foundNumbers++;
            
            this.updateNextNumberText();
            this.showStatus(`Tuyệt vời! Tìm được số ${clickedNumber}`, 'success');
            
            // Kiểm tra hoàn thành
            if (this.currentNumber > this.totalNumbers) {
                this.completeGame();
            }
        } else {
            // Sai số
            cell.classList.add('wrong');
            this.showStatus(`Sai! Bạn cần tìm số ${this.currentNumber}`, 'error');
            
            // Xóa class wrong sau 1 giây
            setTimeout(() => {
                cell.classList.remove('wrong');
            }, 1000);
        }
    }

    updateNextNumberText() {
        if (this.currentNumber <= this.totalNumbers) {
            this.nextNumberText.textContent = `Tìm số: ${this.currentNumber}`;
        } else {
            this.nextNumberText.textContent = 'Hoàn thành!';
        }
    }

    startGame() {
        this.isPlaying = true;
        this.startTime = Date.now();
        this.currentNumber = 1;
        this.foundNumbers = 0;
        
        this.updateGridSize();
        this.createGrid();
        this.updateNextNumberText();
        this.hideResults();
        this.hideStatus();
        
        this.startBtn.disabled = true;
        this.stopBtn.disabled = false;
        this.gridSizeSelect.disabled = true;
        
        // Bắt đầu timer
        this.startTimer();
        
        this.showStatus('Trò chơi bắt đầu! Tìm số 1', 'info');
    }

    stopGame() {
        this.isPlaying = false;
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        this.gridSizeSelect.disabled = false;
        
        this.showStatus('Trò chơi đã dừng', 'info');
    }

    completeGame() {
        this.isPlaying = false;
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        const endTime = Date.now();
        const totalTime = (endTime - this.startTime) / 1000;
        
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        this.gridSizeSelect.disabled = false;
        
        this.showResults(`Hoàn thành trong ${totalTime.toFixed(2)} giây!`);
        this.showStatus('Chúc mừng! Bạn đã hoàn thành trò chơi!', 'success');
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            const now = Date.now();
            const elapsed = (now - this.startTime) / 1000;
            
            if (this.gameMode === 'free') {
                // Chế độ tự do - đếm tăng
                this.updateTimerDisplay(elapsed);
            } else {
                // Chế độ giới hạn thời gian - đếm ngược
                const remaining = this.timeLimit - elapsed;
                this.updateTimerDisplay(remaining);
                
                if (remaining <= 0) {
                    this.endTimedGame();
                }
            }
        }, 10); // Cập nhật mỗi 10ms để có độ chính xác cao
    }

    updateTimerDisplay(time) {
        const minutes = Math.floor(Math.abs(time) / 60);
        const seconds = Math.floor(Math.abs(time) % 60);
        const milliseconds = Math.floor((Math.abs(time) % 1) * 100);
        
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
        this.timerDisplay.textContent = timeString;
        
        // Đổi màu khi sắp hết thời gian (chế độ timed)
        if (this.gameMode === 'timed' && time < 10) {
            this.timerDisplay.style.color = '#f44336';
        } else {
            this.timerDisplay.style.color = '#667eea';
        }
    }

    endTimedGame() {
        this.isPlaying = false;
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        this.gridSizeSelect.disabled = false;
        
        this.showResults(`Hết giờ! Bạn tìm được ${this.foundNumbers}/${this.totalNumbers} số.`);
        this.showStatus('Hết thời gian! Hãy thử lại để cải thiện kết quả.', 'error');
    }

    showResults(message) {
        this.results.innerHTML = `
            <h3>Kết quả</h3>
            <p>${message}</p>
        `;
        this.results.style.display = 'block';
    }

    hideResults() {
        this.results.style.display = 'none';
    }

    showStatus(message, type = 'info') {
        this.status.textContent = message;
        this.status.className = `status ${type}`;
        this.status.style.display = 'block';
        
        // Tự động ẩn sau 3 giây
        setTimeout(() => {
            this.hideStatus();
        }, 3000);
    }

    hideStatus() {
        this.status.style.display = 'none';
    }

    updateUI() {
        this.updateGridSize();
        this.updateGameMode();
        this.updateTimeLimit();
        this.updateNextNumberText();
        this.createGrid(); // Tạo bảng ngay từ đầu
    }
}

// Khởi tạo trò chơi khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    new SchulteGame();
});
