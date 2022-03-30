let maxSize = 25;
let snakeMap = [];
let gameLoop = null;
let direction = "d";
let pickedUp = false;
let fruitsMap = [];

$(document).ready(function () {
    snakeMap.unshift({ x: 10, y: 10 }, { x: 10, y: 9 }, { x: 10, y: 8 });
    gameLoop = setInterval(function () {
        moveLoop();
        spawn();
        drawLoop();
    }, 100);

    $(document).on("keypress", function (event) {
        switch (event.key) {
            case 'X':
            case 'x':
                pickUp();
                break;
            case 'B':
            case 'b':
                fruitsMap.push({ x: Math.floor(Math.random() * maxSize), y: Math.floor(Math.random() * maxSize) });
                break;
            case 'A':
            case 'a':
                if (direction !== 'd') {
                    direction = 'a';
                }
                break;
            case 'W':
            case 'w':
                if (direction !== 's') {
                    direction = 'w';
                }
                break;
            case 'S':
            case 's':
                if (direction !== 'w') {
                    direction = 's';
                }
                break;
            case 'D':
            case 'd':
                if (direction !== 'a') {
                    direction = 'd';
                }
                break;
        }
    });
});

function spawn() {
    if (fruitsMap.length === 0) {
        fruitsMap.push({ x: Math.floor(Math.random() * maxSize), y: Math.floor(Math.random() * maxSize) });
    }
}

function pickUp() {
    if (pickedUp !== true) {
        pickedUp = true;
    }
}

function moveLoop() {
    if (pickedUp) {
        pickedUp = false;
    } else {
        snakeMap.pop();
    }

    let first = { x: snakeMap[0].x, y: snakeMap[0].y };
    switch (direction) {
        case 'd':
            first.y++;
            if (first.y >= maxSize) {
                first.y = 0;
            }
            break;
        case 'w':
            first.x--;
            if (first.x < 0) {
                first.x = maxSize;
            }
            break;
        case 's':
            first.x++;
            if (first.x >= maxSize) {
                first.x = 0;
            }
            break;
        case 'a':
            first.y--;
            if (first.y < 0) {
                first.y = maxSize;
            }
            break;
    }
    snakeMap.unshift(first);
    collisionDetection();
}

function collisionDetection() {
    let firstElement = snakeMap[0];

    for (let i = 1; i < snakeMap.length; i++) {
        let part = snakeMap[i];
        if (part.x === firstElement.x && part.y === firstElement.y) {
            if (i < 3) {
                alert("Csalás miatt vesztettél! A játék véget ért! A hátraarc nem megengedett!");
            } else {
                alert("Vesztettél! A játék véget ért!");
            }
            clearTimeout(gameLoop);
            break;
        }
    }

    for (let i = 0; i < fruitsMap.length; i++) {
        let fruit = fruitsMap[i];
        if (fruit.x === firstElement.x && fruit.y === firstElement.y) {
            pickUp();
            fruitsMap.splice(i, 1);
        }
    }
}

function drawLoop() {
    emptyScreen();
    $("#points").html(snakeMap.length - 3);
    snakeMap.forEach(c => {
        $(`#field-${c.x}-${c.y}`).css("background-color", "white");
    });

    fruitsMap.forEach(c => {
        $(`#field-${c.x}-${c.y}`).css("background-color", "red");
    });
}

function emptyScreen() {
    $("#snake-screen").css({
        'height': 600,
        'width': 600
    });

    let content = "";
    for (let row = 0; row < maxSize; row++) {
        for (let column = 0; column < maxSize; column++) {
            content += `<div class='field' id='field-${row}-${column}'></div>`;
        }
        content += "<div class='clear'></div>";
    }
    $("#snake-screen").html(content);
}