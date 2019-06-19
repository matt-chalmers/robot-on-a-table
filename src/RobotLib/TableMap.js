
export class TableMap {

    constructor(config) {
        this.height = config.height;
        this.width = config.width;
    }

    /**
     * Determine if a given position within the bounds of this table
     * @param {Position} position
     * @return {boolean}
     */
    containsPosition(position) {
        return (position.x >= 0) &&
            (position.x <= this.height -1) &&
            (position.y >= 0) &&
            (position.y <= this.width -1);
    }
}
