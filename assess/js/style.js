
    const images = [
        "./assess/css/bau.png", 
        "./assess/css/ca.png", 
        "./assess/css/cua.png", 
        "./assess/css/ga.png", 
        "./assess/css/huou.png", 
        "./assess/css/tom.png"
    ];
    const imgElements = document.querySelectorAll('.img-container img');
    const icons = document.querySelectorAll('.icon');
    const betPoints = Array(icons.length).fill(0);
    const turnBtn = document.getElementById('turnBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultMessage = document.getElementById('resultMessage');
    
    let totalBetPoints = 0;
    let spinning = false;
    
    function getRandomImage() {
        return images[Math.floor(Math.random() * images.length)];
    }

    function updateBetDisplay() {
        icons.forEach((img, index) => {
            img.nextElementSibling.innerHTML = betPoints[index];
        });
    }

    function resetBets() {
        betPoints.fill(0);
        totalBetPoints = 0;
        updateBetDisplay();
    }

    function startSpinning() {
        let spinCount = 0;
        const intervalId = setInterval(() => {
            imgElements.forEach(img => {
                img.src = getRandomImage();
            });
            spinCount++;
            if (spinCount >= 100) {
                clearInterval(intervalId);
                spinning = false;
                checkResult();
            }
        }, 50);
    }

    function checkResult() {
        const results = Array.from(imgElements).map(img => img.index);
        console.log(results);
        const betResults = Array.from(icons).map(img => images[parseInt(img.dataset.index)]);

        let success = true;
        for (let i = 0; i < betResults.length; i++) {
            if (betPoints[i] > 0 && !results.includes(betResults[i])) {
                success = false;
                break;
            }
        }
        resultMessage.innerHTML = success ? 
            'Bạn đã đoán đúng với kết quả: ' + results.join(', ') : 
            'Bạn đã đoán sai với kết quả: ' + results.join(', ');
    }

    icons.forEach(img => {
        img.addEventListener('click', () => {
            if (spinning || totalBetPoints >= 3) return;
            const index = parseInt(img.dataset.index);
            if (betPoints[index] < 3 && totalBetPoints < 3) {
                betPoints[index]++;
                totalBetPoints++;
                updateBetDisplay();
            }
        });
    });

    turnBtn.addEventListener('click', () => {
        if (spinning) return;
        spinning = true;
        startSpinning();
    });

    resetBtn.addEventListener('click', () => {
        if (spinning) return;
        resetBets();
    });

    resetBets(); // Initialize the bets to 0
