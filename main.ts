/**
 * Joshy's Glasses Grab
 */
// Hit by enemy
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (player2, enemy) {
    info.changeLifeBy(-1)
    music.zapped.play()
    pause(500)
})
// Collect glasses
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (player2, item) {
    item.destroy()
    info.changeScoreBy(1)
    music.baDing.play()
    if (info.score() == 12) {
        game.over(true, effects.confetti)
    }
})
let enemy: Sprite = null
let glasses: Sprite = null
// Create Joshy sprite
let joshy = sprites.create(img`
    . . . . . . . . . . . . . . 
    . . . . . 5 5 5 5 . . . . . 
    . . . . 5 5 5 5 5 5 . . . . 
    . . . f f f 5 5 f f f . . . 
    . . . f 9 f f f f 9 f . . . 
    . . . f 9 f d d f 9 f . . . 
    . . . f f f f f f f f . . . 
    . . . f f 4 4 4 4 f f . . . 
    . . . f 4 4 4 4 4 4 f . . . 
    . . . f 4 4 4 4 4 4 f . . . 
    . . . d 4 4 . . 4 4 d . . . 
    . . . . f f . . f f . . . . 
    . . . f f f . . f f f . . . 
    . . . f f . . . . f f . . . 
    . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
// Movement
controller.moveSprite(joshy)
scene.cameraFollowSprite(joshy)
scene.setBackgroundColor(9)
// Create tilemap
tiles.setTilemap(tilemap`level1`)
// Set up life and score
info.setLife(3)
info.setScore(0)
// Spawn 12 black glasses
for (let index = 0; index < 12; index++) {
    glasses = sprites.create(img`
        . . . . . . . . . . . . 
        . . f f f . . f f f . . 
        . . f 1 f . . f 1 f . . 
        f f f 1 f f f f 1 f f f 
        . . f f f . . f f f . . 
        . . . . . . . . . . . . 
        `, SpriteKind.Food)
    tiles.placeOnRandomTile(glasses, assets.tile`transparency16`)
}
// Enemy spawns every 2 seconds
game.onUpdateInterval(2000, function () {
    enemy = sprites.create(img`
        . . . . e e e e . . . . 
        . . e e 2 2 2 2 e e . . 
        . e 2 2 2 2 2 2 2 2 e . 
        . e 2 2 f f f f 2 2 e . 
        . e 2 f 1 f f 1 f 2 e . 
        . e f f f f f f f f e . 
        . . f f 1 f 1 f 1 f . . 
        . . . 1 f 1 f 1 f . . . 
        `, SpriteKind.Enemy)
    tiles.placeOnRandomTile(enemy, assets.tile`transparency16`)
    enemy.follow(joshy, 30)
})
