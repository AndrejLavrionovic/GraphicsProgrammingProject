## Graphics Programming Project 2015
You have just started working for a games company called GaCo, and as your first task you have been asked to create a small addictive 2D game using HTML5 and JavaScript. The game will, for the time being, be focused only on players accessing the game through their desktop browser. GaCo hopes the game will become popular, so that they can then sell advertisements on the webpage where the game is available.

# F1 - an addictive 2D game - TANK BATTLE

This is a canvas game called **Tank Battle**.
######Game goal.
The goal is to clear the way from enemies for the following army attack.

######Game description.
On the road placed tank with left and right movement functionality ranged from left road edge to the right road edge.

Game has four levels and starts from *level 0*. At this level tank must to avoid single puddles.
From *level 1* walls included to the enemies object. Tank can destroy the walls by shooting them.
On the *level 2* two puddles coming up in one row.
On the last level enemy soldiers try to destroy the tank by shooting it. Your tank can also kill the soldier but need to be carefully and avoid soldier's bullets.

######Game control.
Game controls by keyboard buttons.

1. **Up-arrow button** - starts the movement forward if the game begins or if it continue after losing the live. While tank is going *Up-arrow button* used for shooting.
2. **Down-arrow button** - stops the tank if it is moving.
3. **Left-arrow and Right-arrow buttons** - are move the tank left and right.
4. **S-button** - repeats the game if your tank was killed and you still have lives left.
5. **A-button** - starts the game again after game over.

######Game rules.
**Lives** - The player is given 3 lives in the beginning. Every time when the player’s tank is killed the he uses another live to continue the game. If no lives left - the Game is over.
**Scores** - During the game player’s tank must avoid or destroy the enemy or enemies obstacles. Every time if player successfully avoid the enemy's object he got the scores. If the obstacles are destroyable such as soldiers or walls, and tank kill them with accurate shoot the scores are much higher than if just avoid them.

| Description | Score |
|------------------|-----------|
| Wall avoided| 200 |
| Puddle avoided | 100 |
| Double puddle avoided | 400 |
| Soldier avoided | 800 |
| Wall destroyed | 1000 |
| Soldier destroyed | 2000 |

**Levels** - The game starts from *Level 0* and goes up to *Level 3*

| Level | Done | Features |
|----------|----------|--------------|
| 0 | Up to 500 m. | Puddles that you need to avoid |
| 1 | Up to 1000 m. | Walls could be destroyed or avoided |
| 2 | Up to 2000 m. | Double puddles that must be avoided |
| 3 |  Up to 3500 m. | Soldiers could be killed or avoided |

As the all Levels are done the game is Done and Player is win.

###Enjoy the game.

