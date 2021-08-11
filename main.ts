let mySprite: Sprite = null
let a = 0
effects.starField.startScreenEffect()
let asts = [assets.image`as1`, assets.image`as2`, assets.image`as0`, assets.image`as3`]
let ship = sprites.create(img`
    ................f.............
    ................f.............
    ................f..f..........
    ..........1111111ff...........
    ..........1bbbbbb1.f.f........
    ....11111111bbbbb1..f.........
    ....1bbbbb11bbbbb1............
    ....1b88bb11bbbbb1............
    ....1b88bb11bbbbb1............
    ....1bbbbb11bbbbb1............
    ....1bbbb1111111b1............
    ....1bbbb111bbb1b1............
    ....11111111111111............
    .........1bbbbb1..............
    .........1222221..............
    .........1bbbbb1..............
    ........11bbbbb1..............
    .......1.11111111.............
    .......1.........1............
    ......1...........1...........
    ....1111.........111..........
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
forever(function () {
    pause(500)
    a = randint(0, 3)
    mySprite = sprites.create(asts[a], SpriteKind.Projectile)
    mySprite.setPosition(randint(0, 160), randint(0, 120))
    mySprite.setVelocity(randint(-60, 60), randint(-60, 60))
})
