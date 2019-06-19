
import logger from "../logging";


class PositionConstraint {
    constructor(tableMap) {
        this.tableMap = tableMap;
    }
    check(position) { return true; }
}

class RestrictToTableConstraint extends PositionConstraint {

    check(position) {
        const ok = this.tableMap.containsPosition(position);
        logger.debug('RestrictToTableConstraint %s for position %s', ok ? 'passed' : 'failed', position);
        return ok;
    }
}

export { RestrictToTableConstraint }