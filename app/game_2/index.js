
class GameManager {
    constructor(){

        this.Bird = new Bird();
        this.Map = new Map();
        this.#gameWindow = this.Bird.birdLogo.parentElement;
        this.#gameWindow.addEventListener("click", this.Bird.flyBird.bind(this.Bird));
        document.addEventListener("keydown", (event) => {
            if (event.key === " " || event.code === "Space") {
                event.preventDefault();
                this.Bird.flyBird();
            }
        });
        this.startButton.addEventListener("click", (event) => {this.startGame()})
        this.startButton.classList.add("show");
    }
    startGame(){
        this.Map.stopObstacles();
        this.Bird.resetBird();
        this.Bird.stopMovement();
        this.Map.initializeMap();
        this.Map.moveObstacles();
        this.Map.startCollisionDetection(this.Bird.birdLogo, () => {
            console.log("collision with obstacle triggered");
            this.Map.stopObstacles();
            this.Bird.stopMovement();
            this.#gameGoing = false;
            this.startButton.classList.add("show");
        });

        this.#gameGoing = true;
        this.startButton.classList.remove("show");
        //the empty function inside birdMovement is used to check if the bird is alive
        //as soon as the bird lands the gameOver() function performs the stopObstacles function(game ends)
        this.Bird.birdMovement(() => {
            console.log("game over triggered");
            this.Map.stopObstacles();
            this.#gameGoing = false;
            this.startButton.classList.add("show");
            console.log(" game over button appearing triggered");
        });

    }

    Bird;
    startButton = document.getElementById("start")
    Map;
    #gameGoing = false;
    #gameWindow;

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


            console.log(this.#birdTop);

            if (this.#birdTop + this.#birdHeight >= this.#parentHeight) {
                this.#birdTop = this.#parentHeight - this.birdLogo.offsetHeight;
                console.log("inside the if statement" + this.#birdTop);
                this.#velocityY = 0;
                clearInterval(moveInterval);
                console.log("gameover");
                if(gameOver) gameOver();
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

    }
    #gameInterval;

    stopObstacles(){
        clearInterval(this.#gameInterval);
        clearInterval(this.#collisionInterval);
    }

    getRandomNumber(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    initializeMap(){
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
        }
        if(pair2leftValue <= -10){

            this.#pair2.style.top = this.getRandomNumber(0,30) + "%"
            this.#pair2.style.left = 100 + "%";
            pair2leftValue = 100;
        }
        if(pair3leftValue <= -10){

            this.#pair3.style.top = this.getRandomNumber(0,30) + "%"
            this.#pair3.style.left = 100 + "%";
            pair3leftValue = 100;
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
                console.log("birdRect.right: "+birdRect.right);
                console.log("obstRect.left"+ obsRect.left);

                const isCollision =
                    adjustedBirdRect.left < obsRect.right &&
                    adjustedBirdRect.right > obsRect.left &&
                    adjustedBirdRect.top < obsRect.bottom &&
                    adjustedBirdRect.bottom > obsRect.top;

                if (isCollision) {
                    clearInterval(this.#collisionInterval);
                    if (onCollision) onCollision();
                    break;
                }
            }
        }, 10);
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
    #collisionInterval;
}
const game = new GameManager();

