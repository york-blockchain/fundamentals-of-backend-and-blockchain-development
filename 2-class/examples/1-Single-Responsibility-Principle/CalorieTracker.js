class Logger {

    logger(message) {
        console.log(message);
    }

}

class CalorieTracker {

    constructor(maxCalories) {
        this.maxCalories = maxCalories;
        this.currentCalories = 0;
    }

    trackCalories(caloriesCount, log) {
        this.currentCalories += caloriesCount;
        if (this.currentCalories > this.maxCalories) {
            log.logger("Max calories exceeds");
        } else {
            log.logger("No calories exceeds");
        }
    }
}

new CalorieTracker(2000).trackCalories(6900, new Logger());