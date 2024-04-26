class Calculator {
    constructor() {
        this.value = value
        this.history = []
    }


    /**
     * We'll accept a command such as an AddCommand.
     * Then we execute the command, passing in our current
     * value. For example if it as an new AddCommand(10),
     * doing .execute(this.value) would just add 10 to our current
     * value and return it.
     * 
     * Then we record the command in our calculator's history
     * 
     * @param {any} command
     */
    executeCommand(command) {
        this.value = command.execute(this.value);
    }


    // Undo the previous command
    undo() {
        // Get the previous command 
        const command = this.history.pop();

        // Undo it. So if the command was AddCommand(10), we'd pass our 
        // current value to undo it, so subtract 10 from our current, or value at the time.
        this.value = command.undo(this.value);
    }

}


class AddCommand() {
    constructor(valueToAdd) {
        // This doesn't change
        this.valueToAdd = valueToAdd;
    }

    // Add together valueToAdd and currentValue
    // then return the result. 
    execute(currentValue) {
        return this.valueToAdd + currentValue;
    }

    // Reverses, so takes away valueToAdd
    undo(currentValue) {
        return currentValue - this.valueToAdd;
    }
}


class SubtractCommand {
    constructor(valueToSubtract) {
        this.valueToSubtract = valueToSubtract
    }

    execute(currentValue) {
        return currentValue - this.valueToSubtract
    }

    undo(currentValue) {
        return currentValue + this.valueToSubtract
    }
}

class MultiplyCommand {
    constructor(valueToMultiply) {
        this.valueToMultiply = valueToMultiply
    }

    execute(currentValue) {
        return currentValue * this.valueToMultiply
    }

    undo(currentValue) {
        return currentValue / this.valueToMultiply
    }
}

class DivideCommand {
    constructor(valueToDivide) {
        this.valueToDivide = valueToDivide
    }

    execute(currentValue) {
        return currentValue / this.valueToDivide
    }

    undo(currentValue) {
        return currentValue * this.valueToDivide
    }
}


class AddThenMultiplyCommand {
    constructor(valueToAdd, valueToMultiply) {
        this.addCommand = new AddCommand(valueToAdd)
        this.multiplyCommand = new MultiplyCommand(valueToMultiply)
    }

    /*
    - If we have a sequence of commands. We can easily undo those commands by working backwards!
    */
    execute(currentValue) {
        const newValue = this.addCommand.execute(currentValue)
        return this.multiplyCommand.execute(newValue)
    }

    undo(currentValue) {
        const newValue = this.multiplyCommand.undo(currentValue)
        return this.addCommand.undo(newValue)
    }
}

const calculator = new Calculator();

// Let's add 10. Create a command and pass it to executeCommand
calculator.executeCommand(new AddCommand(10));


