// Função de Colisão de tela
function inThereScreen(P) {
    // Verificando se o personagem saiu da tela
    // caso não, ele retorna true e desenha ele
    if ((P.x+P.w) > screen.width || P.x < 0 ) {
        perdeu("fora");
    } else {
        if ((P.y+P.h) > screen.height || P.y < 0) {
            perdeu("fora");
        } else {
            return true;
        } 
    }
}

// Função de Colisão com a Maça(Apple)
function collision(P) {
    if (apple.x >= P.x && apple.x <= (P.x+P.w) || (apple.x+apple.w) >= P.x && (apple.x+apple.w) <= (P.x+P.w)) {
        if (apple.y >= P.y && apple.y <= (P.y+P.h) || (apple.y+apple.h) >= P.y && (apple.y+apple.h) <= (P.y+P.h)) {
            
            // ganha um ponto novo e a maçã ganha novas coordenadas
            newPoint(P);
            apple.x = Math.random()*575;
            apple.y = Math.random()*575;
        }
    }
}

// função de adicionar mais 1 ponto
const l = document.querySelector("#level");
function newPoint(P) {
    P.level += 1;
    // criando inimigo if(P.level>=3) { newEnemie() }
    l.innerHTML = `Level ${P.level}`
}

// Função para fracasso
function perdeu(err) {
    // resete das posições
    p1.x = 0;
    p1.y = 0;
    p1.direction = null;

    // mensagem de erro pre-programada
    switch (err) {
        case "fora":
            window.alert("Voce saiu do mapa!")
    }

    // reload de página
    window.location.reload();
}

// Funções de Canvas principais
const screen = document.getElementById("screen");
const ctx = screen.getContext("2d");

// criando obstaculos para player
function newEnemie() {
    // criou
}

// player
const p1 = {
    x: 0,
    y: 0,
    w: 50,
    h: 50,
    direction: null,
    vel: 50,
    level: 1,
}
// maça
const apple = {
    x: Math.random()*575,
    y: Math.random()*575,
    w: 25,
    h: 25
}

// evento do teclado
document.body.onkeydown = () => {
    let k = event.keyCode;
    
    if (k == 37) {
        p1.direction = "left"
    }
    if (k == 38) {
        p1.direction = "up"
    }
    if (k == 39) {
        p1.direction = "right"
    }
    if (k == 40) {
        p1.direction = "down"
    }

    draw();
}

// caminhar do elemento
setInterval(() => {
    walk(p1);
    draw();
}, 300)

// walk
function walk(P) {
    switch (P.direction) {
        case "left":
            P.x -= P.vel;
            break;
        case "up":
            P.y -= P.vel;
            break;
        case "right":
            P.x += P.vel;
            break;
        case "down":
            P.y += P.vel;
    }
}


// desenho
function draw() {
    ctx.clearRect(0, 0, screen.width, screen.height);
    collision(p1);
    
    if (inThereScreen(p1)) {
        ctx.fillStyle = "rgb(52, 235, 119)"
        ctx.fillRect(p1.x, p1.y, p1.w, p1.h);
    }

    ctx.fillStyle = "rgb(224, 51, 45)"
    ctx.fillRect(apple.x, apple.y, apple.w, apple.h);
}
