namespace SpriteKind {
    export const Ball = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Ball, function (sprite, otherSprite) {
    currentBall.vx = currentBall.vx * -1
})
function newBall () {
    currentBall = sprites.create(img`
        . . . . . 3 3 b 3 3 d d 3 3 . . 
        . . . . 3 1 1 d 3 d 1 1 1 1 3 . 
        . . . 3 d 1 1 1 d 1 1 1 d 3 1 3 
        . . 3 d d 1 1 1 d d 1 1 1 3 3 3 
        . 3 1 1 d 1 1 1 1 d d 1 1 b . . 
        . 3 1 1 1 d 1 1 1 1 1 d 1 1 3 . 
        . b d 1 1 1 d 1 1 1 1 1 1 1 3 . 
        . 4 b 1 1 1 1 d d 1 1 1 1 d 3 . 
        . 4 4 d 1 1 1 1 1 1 d d d b b . 
        . 4 d b d 1 1 1 1 1 1 1 1 3 . . 
        4 d d 5 b d 1 1 1 1 1 1 1 3 . . 
        4 5 d 5 5 b b d 1 1 1 1 d 3 . . 
        4 5 5 d 5 5 d b b b d d 3 . . . 
        4 5 5 5 d d d d 4 4 b 3 . . . . 
        . 4 5 5 5 4 4 4 . . . . . . . . 
        . . 4 4 4 . . . . . . . . . . . 
        `, SpriteKind.Ball)
    serveLeftRight = randint(0, 1)
    if (serveLeftRight == 0) {
        currentBall.setVelocity(-50, randint(-75, 75))
    } else {
        currentBall.setVelocity(50, randint(-75, 75))
    }
}
let serveLeftRight = 0
let currentBall: Sprite = null
let player1 = sprites.create(img`
    2 2 2 . . . . . . . . . . . . . 
    2 2 2 . . . . . . . . . . . . . 
    2 2 2 . . . . . . . . . . . . . 
    2 2 2 . . . . . . . . . . . . . 
    2 2 2 . . . . . . . . . . . . . 
    2 2 2 . . . . . . . . . . . . . 
    2 2 2 . . . . . . . . . . . . . 
    2 2 2 . . . . . . . . . . . . . 
    2 2 2 . . . . . . . . . . . . . 
    2 2 2 . . . . . . . . . . . . . 
    2 2 2 . . . . . . . . . . . . . 
    2 2 2 . . . . . . . . . . . . . 
    2 2 2 . . . . . . . . . . . . . 
    2 2 2 . . . . . . . . . . . . . 
    2 2 2 . . . . . . . . . . . . . 
    2 2 2 . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(player1, 0, 100)
player1.x = 0
player1.setFlag(SpriteFlag.StayInScreen, true)
info.setScore(0)
let player2 = sprites.create(img`
    . . . . . . . . . . . . . 8 8 8 
    . . . . . . . . . . . . . 8 8 8 
    . . . . . . . . . . . . . 8 8 8 
    . . . . . . . . . . . . . 8 8 8 
    . . . . . . . . . . . . . 8 8 8 
    . . . . . . . . . . . . . 8 8 8 
    . . . . . . . . . . . . . 8 8 8 
    . . . . . . . . . . . . . 8 8 8 
    . . . . . . . . . . . . . 8 8 8 
    . . . . . . . . . . . . . 8 8 8 
    . . . . . . . . . . . . . 8 8 8 
    . . . . . . . . . . . . . 8 8 8 
    . . . . . . . . . . . . . 8 8 8 
    . . . . . . . . . . . . . 8 8 8 
    . . . . . . . . . . . . . 8 8 8 
    . . . . . . . . . . . . . 8 8 8 
    `, SpriteKind.Player)
controller.player2.moveSprite(player2, 0, 100)
player2.x = scene.screenWidth()
player2.setFlag(SpriteFlag.StayInScreen, true)
info.player2.setScore(0)
newBall()
game.onUpdate(function () {
    // Bounces the ball off the top and bottom of screen
    if (currentBall.y <= 0) {
        currentBall.y = 0
        currentBall.vy = currentBall.vy * -1
    } else if (currentBall.y >= scene.screenHeight()) {
        currentBall.y = scene.screenHeight()
        currentBall.vy = currentBall.vy * -1
    }
    if (currentBall.x > scene.screenWidth()) {
        currentBall.destroy()
        info.player1.changeScoreBy(1)
        newBall()
    } else if (currentBall.x < 0) {
        currentBall.destroy()
        info.player2.changeScoreBy(1)
        newBall()
    }
})
