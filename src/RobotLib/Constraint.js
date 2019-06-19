/*
    This module provides Constraint classes, which are used to provide flexible and extensible
    constrain checking when the robot attempts to move. This allows different robots to be
    configured with different strategies, something I intend to the system to handle shortly...
 */

import logger from "../logging";


class AbstractPositionConstraint {
    constructor(tableMap) {
        this.tableMap = tableMap;
    }

    /**
     * Check if the robot is allowed to visit this position
     * @param {Pose} pose
     * @return {boolean}
     */
    check(pose) { return true; }
}


// Concrete position constraint classes:

class RestrictToTableConstraint extends AbstractPositionConstraint {

    check(pose) {
        const ok = this.tableMap.containsPosition(pose.x, pose.y);
        logger.debug('RestrictToTableConstraint %s for pose %s', ok ? 'passed' : 'failed', pose);
        return ok;
    }
}

export { RestrictToTableConstraint }