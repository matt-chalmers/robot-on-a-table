
export class TableMap {

    constructor(config) {
        this.height = config.height;
        this.width = config.width;
    }

    /**
     * Determine if a given position within the bounds of this table
     * @param {Number} x
     * @param {Number} y
     * @return {boolean}
     */
    containsPosition(x, y) {
        return (x >= 0) && (x <= this.height -1) &&
            (y >= 0) && (y <= this.width -1);
    }
}
