namespace SpriteKind {
    export const asteroid = SpriteKind.create()
    export const Text = SpriteKind.create()
}
function mkStarDestroyer () {
    Star_Destroyer = sprites.create(img`
        ................................
        .......ffff.....................
        ......ffbf......................
        ..fff.fbbf......................
        ..fbbfffff....fff...............
        ..fbbbbbbfffff...ff.............
        ..fb1bbbbbbbbbffff..............
        ..fbbbbbbbbbbbbbbbfffff.........
        ..fbbbbb1bbb1bbbbbbbbbbffff.....
        ..fbbbbbbbbbbbbbbbbbb1bbbbbfff..
        ..fbbbbbbbbbbbbbfffffffffffff...
        ..ffffffffffffff................
        ................................
        ................................
        ................................
        ................................
        `, SpriteKind.Enemy)
    Star_Destroyer.setPosition(0, randint(16, 40))
    Star_Destroyer.setVelocity(randint(50, 90), 0)
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    droid += 1
    if (droid > 1) {
        droid = 0
        ship.sayText("autopilot disengaged")
    } else {
        ship.sayText("autopilot engaged")
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    doLaser()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.asteroid, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
    music.knock.play()
    scene.cameraShake(4, 500)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.asteroid, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.asteroid, SpriteKind.asteroid, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
function doLaser () {
    Laser = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 2 . . . . . . . 2 . . . 
        . . . . 2 . . . . . . . 2 . . . 
        . . . . 2 . . . . . . . 2 . . . 
        . . . . 2 . . . . . . . 2 . . . 
        . . . . 2 . . . . . . . 2 . . . 
        . . . . 2 . . . . . . . 2 . . . 
        . . . . 2 . . . . . . . 2 . . . 
        . . . . 2 . . . . . . . 2 . . . 
        . . . . 2 . . . . . . . 2 . . . 
        . . . . 2 . . . . . . . 2 . . . 
        . . . . 2 . . . . . . . 2 . . . 
        . . . . 2 . . . . . . . 2 . . . 
        . . . . 2 . . . . . . . 2 . . . 
        . . . . 2 . . . . . . . 2 . . . 
        `, SpriteKind.Projectile)
    Laser.x = ship.x
    Laser.y = ship.y
    Laser.setVelocity(0, -100)
    Laser.setFlag(SpriteFlag.AutoDestroy, true)
    music.pewPew.play()
}
function mkStarDestroyer2 () {
    Star_Destroyer = sprites.create(img`
        ................................
        .....................ffff.......
        ......................fbff......
        ......................fbbf.fff..
        ...............fff....fffffbbf..
        .............ff...fffffbbbbbbf..
        ..............ffffbbbbbbbbb1bf..
        .........fffffbbbbbbbbbbbbbbbf..
        .....ffffbbbbbbbbbb1bbb1bbbbbf..
        ..fffbbbbb1bbbbbbbbbbbbbbbbbbf..
        ...fffffffffffffbbbbbbbbbbbbbf..
        ................ffffffffffffff..
        ................................
        ................................
        ................................
        ................................
        `, SpriteKind.Enemy)
    Star_Destroyer.setPosition(160, randint(16, 40))
    Star_Destroyer.setVelocity(randint(-90, -50), 0)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    info.changeScoreBy(3)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.asteroid, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    music.knock.play()
    scene.cameraShake(4, 500)
})
let mySprite: Sprite = null
let a = 0
let pause2 = 0
let Laser: Sprite = null
let Star_Destroyer: Sprite = null
let ship: Sprite = null
let droid = 0
let ascnt = 0
droid = 0
game.splash("Pilot the Falcon to avoid asteroids! ", "How long can you last???")
effects.starField.startScreenEffect()
let asts = [
assets.image`as1`,
assets.image`as2`,
assets.image`as0`,
assets.image`as3`
]
ship = sprites.create(img`
    ..............................
    .........1....1...............
    .........111..11.111..........
    .........11...1111.1..........
    .........111.1111111..........
    .......11111..1111.1..........
    ......11111111111111..........
    ......111111b1bbb111..........
    .....111b111bb.bb111..........
    .....111b111bb.bb111..........
    .....1b1111111.1b111..........
    .....111b111bbb.b111..........
    .....1111111111.1111..........
    .....11111bbbbb11111..........
    .....111111222211111..........
    ......1111b11111111...........
    ......1111bbbbb1111...........
    .......11111111111............
    .........1111111..............
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    `, SpriteKind.Player)
controller.moveSprite(ship)
ship.setStayInScreen(true)
info.setLife(10)
game.onUpdateInterval(2000, function () {
    if (7 < randint(0, 10)) {
        mkStarDestroyer()
    }
    if (7 < randint(0, 10)) {
        mkStarDestroyer2()
    }
})
forever(function () {
    pause2 = 1000 - ascnt
    if (pause2 < 300) {
        pause(300)
    } else {
        pause(pause2)
    }
    a = randint(0, 3)
    mySprite = sprites.create(asts[a], SpriteKind.asteroid)
    mySprite.setFlag(SpriteFlag.AutoDestroy, true)
    mySprite.setPosition(randint(0, 160), randint(0, 120))
    mySprite.setVelocity(randint(-60, 60), randint(-60, 60))
    ascnt += 1
})
forever(function () {
    if (1 == droid) {
        doLaser()
        pause(100 + randint(0, 500))
        if (6 < randint(0, 10)) {
            ship.x += randint(-20, 20)
        }
        if (6 > randint(0, 10)) {
            ship.y += randint(-5, 5)
        }
    }
})
