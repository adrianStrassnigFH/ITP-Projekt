class GameManager {
    constructor() {
        this.Bird = new Bird();
        this.Map = new Map();
        this.startButton = document.getElementById("start");
        this.#gameWindow = this.Bird.birdLogo.parentElement;

        this.#gameWindow.addEventListener("click", this.Bird.flyBird.bind(this.Bird));
        document.addEventListener("keydown", (event) => {
            if (event.key === " " || event.code === "Space") {
                event.preventDefault();
                this.Bird.flyBird();
            }
        });

        this.#setupDifficultyButtons(); // ⬅️ New setup method for difficulty buttons
        this.startButton.classList.add("show");
        this.#initializeScoreDisplay();
    }

    #setupDifficultyButtons() {
        const buttons = this.startButton.querySelectorAll("button");
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                this.difficulty = button.getAttribute("data-difficulty");
                this.startGame();
            });
        });
    }

    #initializeScoreDisplay() {
        let scoreDisplay = document.getElementById("score-display");
        if (!scoreDisplay) {
            scoreDisplay = document.createElement("div");
            scoreDisplay.id = "score-display";
            scoreDisplay.style.position = "absolute";
            scoreDisplay.style.top = "20px";
            scoreDisplay.style.left = "50%";
            scoreDisplay.style.transform = "translateX(-50%)";
            scoreDisplay.style.fontSize = "24px";
            scoreDisplay.style.fontWeight = "bold";
            scoreDisplay.style.color = "white";
            scoreDisplay.style.textShadow = "2px 2px 4px rgba(0,0,0,0.8)";
            scoreDisplay.style.zIndex = "1000";
            this.#gameWindow.appendChild(scoreDisplay);
        }
        this.scoreDisplay = scoreDisplay;
        this.updateScoreDisplay();
    }

    updateScoreDisplay() {
        //this.scoreDisplay.textContent = `Score : ${this.#score}`;
    }

    addPoint() {
        this.#score++;
        this.updateScoreDisplay();
    }

    resetScore() {
        this.#score = 0;
        this.updateScoreDisplay();
    }

    startGame() {
        console.log("Starting game with difficulty:", this.difficulty);
        this.#div_diff.innerHTML = this.difficulty;
        this.Map.stopObstacles();
        this.Bird.resetBird();
        this.Bird.stopMovement();
        this.Map.initializeMap();
        this.Map.moveObstacles();

        this.Map.startCollisionDetection(this.Bird.birdLogo, () => {
            this.Map.stopObstacles();
            this.Bird.stopMovement();
            this.#gameGoing = false;
            this.startButton.classList.add("show");
        });

        this.Map.startPointDetection(this.Bird.birdLogo, () => {
            this.addPoint();
        });

        this.#gameGoing = true;
        this.startButton.classList.remove("show");

        this.Bird.birdMovement(() => {
            this.Map.stopObstacles();
            this.#gameGoing = false;
            this.startButton.classList.add("show");
        });
    }


    Bird;
    Map;
    startButton;
    difficulty = null; // ⬅️ New variable to store chosen difficulty
    #gameGoing = false;
    #gameWindow;
    scoreDisplay;
    #score = 0;
    #div_diff = document.getElementById("chosen_diff");
}

class Bird{
    constructor(){
        this.birdLogo = document.getElementById("bird");
        this.#birdHeight = this.birdLogo.offsetHeight;
        this.#parentHeight = this.birdLogo.parentElement.offsetHeight;
        this.#gravity = 0.3
        this.#jumpStrength = 8.5
        this.#velocityY = 0;
        this.birdLogo.style.position = "absolute";
        this.birdLogo.style.left = 20 + "%"
        this.#birdTop = this.birdLogo.offsetHeight;

    }
    resetBird(){
        this.#birdTop = 100;
        this.#velocityY = 0;
        this.birdLogo.style.top =this.#birdTop + "px";
    }
    stopMovement(){
        clearInterval(this.#moveInterval);
    }
    flyBird(){
        this.#velocityY = -this.#jumpStrength;
    }
    birdMovement(gameOver){
        clearInterval(this.#moveInterval);
        this.#moveInterval = setInterval(() => {
            this.#velocityY += this.#gravity;
            this.#birdTop += this.#velocityY;

            if (this.#velocityY< 0) {
                this.birdLogo.setAttribute('class', 'up');
            } else {
                this.birdLogo.removeAttribute('class');
                this.birdLogo.setAttribute('class', 'down');
            }



            if (this.#birdTop + this.#birdHeight >= this.#parentHeight) {
                this.#birdTop = this.#parentHeight - this.birdLogo.offsetHeight;
                this.#velocityY = 0;
                clearInterval(moveInterval);
                if(gameOver) {
                    gameOver();
                }   
            }

            if (this.#birdTop < 0) {
                this.#birdTop = 0;
                this.#velocityY = 0;
            }

            this.birdLogo.style.top = this.#birdTop + "px";
        }, 10);

        // Return the interval ID so it can be cleared from outside if needed
        return moveInterval;
    }
    #velocityY;
    #gravity;
    #jumpStrength;
    birdLogo
    #birdTop
    #birdHeight
    #parentHeight
    #moveInterval
    }

class Map{
    constructor(){
        this.#obstacle1 = document.getElementById("obstacle1");
        this.#obstacle2 = document.getElementById("obstacle2");
        this.#obstacle3 = document.getElementById("obstacle3");
        this.#obstacle4 = document.getElementById("obstacle4");
        this.#obstacle5 = document.getElementById("obstacle5");
        this.#obstacle6 = document.getElementById("obstacle6");
        this.#pair1 = document.getElementById("pair1");
        this.#pair2 = document.getElementById("pair2");
        this.#pair3 = document.getElementById("pair3");

        this.#allObstacles = [
            this.#obstacle1,
            this.#obstacle2,
            this.#obstacle3,
            this.#obstacle4,
            this.#obstacle5,
            this.#obstacle6,
        ]
        this.#obstaclePairs = [
            this.#pair1,
            this.#pair2,
            this.#pair3
        ];
        this.#passedPairs = new Set();
    }


    stopObstacles(){
        clearInterval(this.#gameInterval);
        clearInterval(this.#collisionInterval);
    }

    getRandomNumber(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    initializeMap(){
        this.#count_stop_id = setInterval(() => {
            this.#count += 1;  // Increment the counter each second
            this.#score_div.innerHTML = this.#count;
            console.log(this.#count);  // Log the current counter value

            // Stop the counter when a condition is met (e.g., when count reaches 10)
            if (this.#count_stop == true) {
                this.stopCounter();
            }
        }, 1000); 


        this.#passedPairs.clear();

        for(let i = 0; i < this.#allObstacles.length; i++){
            if(i % 2 === 0){
                this.#allObstacles[i].style.transform = "rotate(180deg)";

            }
        }
        this.#pair1.style.left = "100%";
        this.#pair2.style.left = "140%";
        this.#pair3.style.left = "180%";
        this.#pair1.style.top = this.getRandomNumber(0,30) + "%"

        this.#pair2.style.top = this.getRandomNumber(0,30) + "%"

        this.#pair3.style.top = this.getRandomNumber(0,30) + "%"
        


    }
    moveObstacles(){
            const containerWidth = document.querySelector(".obstacle").clientWidth;
            let pair1leftValue = window.getComputedStyle(this.#pair1).getPropertyValue("left")
            let pair2leftValue = window.getComputedStyle(this.#pair2).getPropertyValue("left")
            let pair3leftValue = window.getComputedStyle(this.#pair3).getPropertyValue("left")
            pair1leftValue = parseInt(pair1leftValue);
            pair2leftValue = parseInt(pair2leftValue);
            pair3leftValue = parseInt(pair3leftValue);
            pair1leftValue = (pair1leftValue/ containerWidth) * 100;
            pair2leftValue = (pair2leftValue/ containerWidth) * 100;
            pair3leftValue = (pair3leftValue / containerWidth) * 100;
             this.#gameInterval = setInterval(()=>{

                this.#pair1.style.left = pair1leftValue + "%";
                this.#pair2.style.left = pair2leftValue + "%";
                this.#pair3.style.left = pair3leftValue + "%";
                
                 pair1leftValue-=0.1
                pair2leftValue-=0.1
                 pair3leftValue-=0.1
                //checks in each interval if the obstacles need to be regenerated,
                // if yes, that values get modified
                //otherwise they will be returned unchanged
                let results = this.regenerateObstacle(pair1leftValue, pair2leftValue, pair3leftValue);
                pair1leftValue = results[0];
                pair2leftValue = results[1];
                pair3leftValue = results[2];



            }, 10)
    }
    regenerateObstacle(pair1leftValue, pair2leftValue, pair3leftValue){
        if(pair1leftValue <= -10){
            this.#pair1.style.top = this.getRandomNumber(0,30) + "%"
            this.#pair1.style.left = 100 + "%";
            pair1leftValue = 100;
            this.#passedPairs.delete(this.#pair1)
        }
        if(pair2leftValue <= -10){

            this.#pair2.style.top = this.getRandomNumber(0,30) + "%"
            this.#pair2.style.left = 100 + "%";
            pair2leftValue = 100;
            this.#passedPairs.delete(this.#pair2)

        }
        if(pair3leftValue <= -10){

            this.#pair3.style.top = this.getRandomNumber(0,30) + "%"
            this.#pair3.style.left = 100 + "%";
            pair3leftValue = 100;
            this.#passedPairs.delete(this.#pair3)

        }
        return [pair1leftValue, pair2leftValue, pair3leftValue]
    }
    startCollisionDetection(birdLogo, onCollision) {
        this.#collisionInterval = setInterval(() => {
            const birdRect = birdLogo.getBoundingClientRect();
            const padding = 6;
            const adjustedBirdRect = {
                left: birdRect.left + padding,
                right: birdRect.right - padding,
                top: birdRect.top + padding,
                bottom: birdRect.bottom - padding
            };

            for (const obstacle of this.#allObstacles) {
                const obsRect = obstacle.getBoundingClientRect();

                const isCollision =
                    adjustedBirdRect.left < obsRect.right &&
                    adjustedBirdRect.right > obsRect.left &&
                    adjustedBirdRect.top < obsRect.bottom &&
                    adjustedBirdRect.bottom > obsRect.top;

                if (isCollision) {
                    clearInterval(this.#collisionInterval);
                     clearInterval(this.#count_stop_id);  // Stop the interval
                    console.log("Counter stopped");
                    console.log("Resetting score");  // Log the current counter value
                    //Add in DB
                    let final_count = this.#count;
                    getLoginStatus().then(data => {
                        if(data.status){
                            let difficulty_value;
                            switch(this.#difficulty_div.innerHTML){
                                case "easy":
                                    difficulty_value = 0;
                                    break;
                                case "medium":
                                    difficulty_value = 1;
                                    break;
                                case "hard":
                                    difficulty_value = 2;
                                    break;
                            }
                             console.log(this.#difficulty_div.innerHTML + "div");
                            console.log(difficulty_value);
                              console.log(final_count);

                            uploadScore(data.userID,2,difficulty_value,final_count);
                        }
                    } ); 
                    this.#count = 0;
                    if (onCollision) onCollision();
                    break;
                }
            }
        }, 10);
    }
    startPointDetection(birdLogo, onPoint){
        this.#pointInterval = setInterval(() =>{
            const birdRect = birdLogo.getBoundingClientRect();
            const birdMiddle = birdRect.left + birdRect.width/2;
            for(const pair of this.#obstaclePairs){
                if(this.#passedPairs.has(pair)){
                    continue;
                }
                const pairRect = pair.getBoundingClientRect();
                const pairMiddle = pairRect.left +pairRect.width/2;
                if(birdMiddle > pairMiddle){
                    this.#passedPairs.add(pair);
                    if(onPoint) onPoint();
                }
            }
        }, 10)
    }
    #pair1;
    #pair2;
    #pair3;
    #obstacle1;
    #obstacle2;
    #obstacle3;
    #obstacle4;
    #obstacle5;
    #obstacle6;
    #allObstacles;
    #obstaclePairs;
    #collisionInterval;
    #pointInterval;
    #passedPairs;
    #gameInterval;
    #my_score = 0;
    #score_div = document.getElementById("score");
    #count = 0; // Initial counter value
    #count_stop_id = null;  // To store the interval ID for clearing it
    #count_stop = false;
    #difficulty_div = document.getElementById("chosen_diff");
}
const game = new GameManager();

