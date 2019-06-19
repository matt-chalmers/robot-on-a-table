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
    check(position) { return true; }
}


// Concrete position constraint classes:

class RestrictToTableConstraint extends AbstractPositionConstraint {

    check(position) {
        const ok = this.tableMap.containsPosition(position);
        logger.debug('RestrictToTableConstraint %s for position %s', ok ? 'passed' : 'failed', position);
        return ok;
    }
}

export { RestrictToTableConstraint }