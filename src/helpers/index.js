    import { LEVEL, LEVELNUM } from '../constants';
    /**
     * 
     * @param {*} max max number of digits to generate
     * @param {*} withZero start from zero or non-zero
     */
    const shuffler = (max, withZero = false) => {
        const startZero = withZero ? 0 : 1;
        return parseInt(Math.random() * (max - startZero) + startZero);
    }

    /**
     * Returns the number of blocks to hide based on game difficulty
     * @param {*} level 
     */
    const gameDifficulty = (level) => {
        switch (level) {
            case LEVEL.EASY:
                return LEVELNUM.EASY;
            case LEVEL.NORMAL:
                return LEVELNUM.NORMAL;
            case LEVEL.HARD:
                return LEVELNUM.HARD;
            default:
                return LEVEL.EASY;
        }
    }

    export {
        shuffler,
        gameDifficulty
    }
