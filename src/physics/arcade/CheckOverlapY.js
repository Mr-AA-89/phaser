/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2019 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var IntersectsRect = require('./IntersectsRect');

/**
 * Calculates and returns the vertical overlap between two arcade physics bodies.
 * 
 * We know the bodies are intersecting based on a previous check, so the point of this function
 * is to determine which face the overlap is occurring on and at what depth.
 *
 * @function Phaser.Physics.Arcade.CheckOverlapY
 * @since 3.17.0
 *
 * @param {Phaser.Physics.Arcade.Body} body1 - The first Body to separate.
 * @param {Phaser.Physics.Arcade.Body} body2 - The second Body to separate.
 * @param {number} [padding=0] - 
 *
 * @return {boolean} 
 */
var CheckOverlapY = function (body1, body2, padding)
{
    if (padding === undefined) { padding = 0; }

    var distance1 = body1.bottom - body2.y;
    var distance2 = body2.bottom - body1.y;

    var prevDistance1 = (body1.prev.y + body1.height) - body2.prev.y;
    var prevDistance2 = (body2.prev.y + body2.height) - body1.prev.y;

    var topFace = (distance1 > distance2 && prevDistance1 > prevDistance2);

    var intersects = IntersectsRect(body1, body2, padding);

    if (intersects && !topFace)
    {
        if (body1.checkCollision.up && body2.checkCollision.down)
        {
            body1.setTouchingDown();
            body2.setTouchingUp();

            body1.setBlockedDown(body2, false);
            body2.setBlockedUp(body1, false);
        }
    }
    else if (intersects && topFace)
    {
        if (body1.checkCollision.down && body2.checkCollision.up)
        {
            body1.setTouchingUp();
            body2.setTouchingDown();

            body1.setBlockedUp(body2, false);
            body2.setBlockedDown(body1, false);
        }
    }

    return intersects;
};

module.exports = CheckOverlapY;
