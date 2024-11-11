class Box<T> {
    private content: T[] = [];
    count: number = 0;

    add(element: T) : void {
        this.content.push(element);
        this.count++;
    }

    remove() : void {
        this.content.pop();
        this.count--;
    }
}

let box = new Box<Number>();
box.add(1);
box.add(2);
box.add(3);
console.log(box.count)     //3

let secondBox = new Box<String>();
secondBox.add("Pesho");
secondBox.add("Gosho");

console.log(secondBox.count);   //2

secondBox.remove(); 
console.log(secondBox.count);     //1