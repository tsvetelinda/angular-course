abstract class Melon {
    weight: number;
    melonSort: string;

    constructor(weight: number, melonSort: string) {
        this.weight = weight;
        this.melonSort = melonSort;
    }
}

class Watermelon extends Melon {
    private elementIndex: number;

    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);

        this.elementIndex = this.weight * (this.melonSort.length);
    }

    getElementIndex() : number {
        return this.elementIndex;
    }

    toString() : string {
        return `Element: Water\nSort: ${this.melonSort}\nElement Index: ${this.getElementIndex()}\n`;
    }
}

class Firemelon extends Melon {
    private elementIndex: number;

    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);

        this.elementIndex = this.weight * (this.melonSort.length);
    }

    getElementIndex() : number {
        return this.elementIndex;
    }

    toString() : string {
        return `Element: Fire\nSort: ${this.melonSort}\nElement Index: ${this.getElementIndex()}\n`;
    }
}

class Earthmelon extends Melon {
    private elementIndex: number;

    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);

        this.elementIndex = this.weight * (this.melonSort.length);
    }

    getElementIndex() : number {
        return this.elementIndex;
    }

    toString() : string {
        return `Element: Earth\nSort: ${this.melonSort}\nElement Index: ${this.getElementIndex()}\n`;
    }
}

class Airmelon extends Melon {
    private elementIndex: number;
    element: string;

    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);

        this.elementIndex = this.weight * (this.melonSort.length);
        this.element = 'Air';
    }

    getElementIndex() : number {
        return this.elementIndex;
    }

    toString() : string {
        return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.getElementIndex()}\n`;
    }
}

class Melolemonmelon extends Airmelon {
    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
        this.element = 'Water';
    }
    morph() : void {
        switch(this.element) {
            case 'Water': this.element = 'Fire'; break;
            case 'Fire': this.element = 'Earth'; break;
            case 'Earth': this.element = 'Air'; break;
            case 'Air': this.element = 'Water'; break;
        }
    }
}

//let test : Melon = new Melon(100, "Test"); // Should be underlined with an error

let watermelon : Watermelon = new Watermelon(12.5, "Kingsize");

console.log(watermelon.toString());
// Element: Water
// Sort: Kingsize
// Element Index: 100

// Create an instance of Melolemonmelon with initial values for weight and melonSort
const melolemonmelon = new Melolemonmelon(15, "Delicious");

// Display initial state
console.log(melolemonmelon.toString()); // Should show "Water" as the initial element

// Call morph and display state after each change
melolemonmelon.morph();
console.log(melolemonmelon.toString()); // Should show "Fire"

melolemonmelon.morph();
console.log(melolemonmelon.toString()); // Should show "Earth"

melolemonmelon.morph();
console.log(melolemonmelon.toString()); // Should show "Air"

melolemonmelon.morph();
console.log(melolemonmelon.toString()); // Should show "Water" (cycle restarts)