# Components
In this folder, you'll find the notes I've taken while studying the topic (primarily based on SoftUni lectures). I've enriched the content and organized it in a simple yet clear manner for easy understanding.

Feel free to explore the material, whether for learning or practicing!
<hr>

## How to start my Angular project?
* `ng new demo-app` - the command, initiating the project
* `AppComponent` is the main component that starts the app, bootstrapped in `main.ts`
* `ng serve` - the command, starting the app
* `localhost:4200` - the default address to view the app in the browser after starting
* `Bootstrapping` = `starting or initializing the application`. Specifically, it refers to the process of loading the root module (AppModule) and its root component (AppComponent) when the application launches.

## Components
* a `component` controls part of the screen
* each component has it's own HTML and CSS template
* application logic is defined in the component

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-item',
  standalone: true,
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.css'
})
export class UserItemComponent {}
```
* standalone components are promoted by Angular 18 as the default approach, which simplifies architecture and enhances modularity. This means that components can now exist independently.

## How to add a new component?
* `ng generate component user-list` - a command for generating the component `user-list`
* `ng g c user-list` = shorthand for generating a component
* Once the component is created, it has to be `imported` to the main AppComponent, if it needs to be used elsewhere and it is standalone.
* `@Component` = a decorator that tells Angular we are creating a component rather than a regular class. It allows us to add metadata to the component, such as `standalone`, `selector`, `template`, and `styles`.
* Angular components can be self-closing, if they do not have any children: `<app-navigation-bar />`
* To add dynamic content:
```
<div>{{title}}</div>
```
```
export class NavigationBarComponent {
    title = 'My Navigation Component';
}
```
* in the components, we are not writing HTML code, but HTML-like JS. 
* Angular applies the concept of `high-cohesion` and `low coupling`, meaning that components are focused on specific tasks or features, and components are independent and interact minimally, making them reusable and easy to manage.

## Data Bindings & Templates
* `Conditional display`: @if, @else
* `Looping`: @for

### Attaching events
```
<button (click)="showContent($event)">Show Content</button>
```
```
export class GamesComponent {
    public games: Game[];
    showContent: boolean;

    constructor() {
        this.games = [ // Array of games ]
    }

    showContent($event) {
        this.showContent = true;
    }
}
```
When the button is clicked, Angular calls the `showContent() method` and passes in the $event object, which contains information about the click event.
When called, this method sets `showContent` to true, which you could use in your template to conditionally display content.

### Binding Attributes
* `attribute binding` allows you to dynamically set or update the value of an HTML attribute based on the value of a component property.
```
<img [attr.src]="imgUrl" />
```
```
export class GamesComponent {
    imgUrl: string;
    
    constructor() {
        this.imgUrl = "https://example.com/image.jpg"
    }   
}
```

### Binding Classes
```
<button [class.active]="isActive">Toggle Active</button>
```
```
export class SomeComponent {
    isActive: boolean = true;
}
```
* This example `binds the active class to the button` only if isActive is true.

### Binding Styles
```
<button [style.color]="isSpecial ? 'red': 'green'">Red</button>
<button [style.background-color]="canSave ? 'cyan': 'grey'" >
Save
</button>
```

### Reference and null-safe operator
* `reference other elements` - this syntax is used to reference an HTML element directly in the template so that you can access its properties or values in your component's methods.
```
<input #phone placeholder="phone number">
<button (click)="callPhone(phone.value)">Call</button>
```
* The `#phone` syntax is a template reference variable. This variable (named phone) refers to the `<input>` element directly within the template.
* You can think of `#phone` as a `“handle”` to the `<input>` element. It allows you to access the element’s properties (like value) directly in the HTML template.
* Inside the parentheses, `phone.value` refers to the value property of the input element (#phone), which contains the text that the user entered.
* `null-safe operator = optional chaining`. It allows you to safely access properties of an object that might be null or undefined without causing an error.
```
<div>The current hero's name is {{game?.title}}</div>
<div>The null hero's name is {{game && game.name}}</div>
```

## Template Expressions
* the text between the curly brackets is evaluated to a string
* template expressions are not pure JavaScript. You cannot use these:
    * Assignments (=, +=, -=)
    * The new operator
    * Multiple expressions
    * Increment or decrement operations (++ or --)
    * Bitwise operators

## Lifecycle Hooks
* A component has a lifecycle, managed by Angular
* Angular offers `lifecycle hooks` that provide control
over life moments of a component
* `ngOnInit`
    * This hook is called once when the component is initialized, right after Angular has set up the input properties.
    * It's commonly used for initialization tasks, such as `fetching data from a server or setting up initial values`.
    ```
    import { Component, OnInit } from '@angular/core';

    @Component({
        selector: 'app-game',
        template: `<div>The current game title is {{gameTitle}}</div>`
    })

    export class GameComponent implements OnInit {
        gameTitle: string;

        ngOnInit(): void {
            this.gameTitle = "Super Mario";
            console.log("GameComponent initialized!");
        }
    }
    ```
    * In this example, the `ngOnInit` method sets the gameTitle property to "Super Mario" when the component is initialized. This ensures the title is set when the component is created. `ngOnInit` runs only once.
* `ngOnDestroy`
    * This hook is called just before Angular destroys the component. It is often used to clean up resources like subscriptions, event listeners, or timers that were set up during the component's lifecycle.
    * It's useful for preventing memory leaks by ensuring that resources are properly released when the component is destroyed.

## Component Interaction
### From Parent to Child
* In Angular, `@Input` is the decorator that allows `the child component to receive data from the parent`. It’s like giving the child a way to access what the parent wants to share with it. Here is an example:
1. Say we have a child component called MessageComponent that is responsible for displaying a message.
```
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  template: `<p>{{ message }}</p>`
})
export class MessageComponent {
  @Input() message: string; // This is the input property
}
```
* Here, `@Input()` decorator allows `message to be set by the parent` component.
* `message: string;` means this property is a string that the child component expects to receive.
2. Now, in the parent component, we want to display this MessageComponent and pass a specific message to it.
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Welcome to the Message Board</h1>
    <app-message [message]="parentMessage"></app-message>
  `
})
export class AppComponent {
  parentMessage = 'Hello from the Parent Component!';
}
```
* `[message]="parentMessage"` binds the parent’s parentMessage property to the child’s message property using the `@Input` decorator.
* `Explained`: 
1. The parent component has a property parentMessage with the value `"Hello from the Parent Component!"`.
2. It uses `[message]="parentMessage"` to pass that value to the child component’s message property.
3. In the child component (MessageComponent), `@Input() message: string;` means message can now hold the string value the parent provides.
4. Finally, `<p>{{ message }}</p>` displays "Hello from the Parent Component!" in the child component's template.

### From Child to Parent
* `@Output` is a decorator that lets the child component create an event that the parent component can listen to.
* `EventEmitter` is a special Angular class that allows the child component to "emit" an event with a value, triggering any listener in the parent component to respond to it.
* It’s like the child saying, "Hey, something happened here, and here’s some info about it!"
* Applies the concept of the Pub-Sub Pattern, namely: the child component acts as the publisher, and the parent component acts as the subscriber. 
    * The `child component uses EventEmitter` to emit events (like publishing messages). Each event can include some data payload. 
    * The `parent component listens for these events` by binding to them with () syntax. When it receives an event, it can respond to it, typically by calling a method and handling any data that comes with the event.
* Here is an example:
1. The child component (CounterComponent) lets the user increment a counter. Each time the counter is incremented, the child component emits the updated counter value to the parent component.
2. The child component has a button to increase a counter value. When the button is clicked, it sends the updated count to the parent.
```
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <button (click)="increment()">Increment</button>
  `
})
export class CounterComponent {
  count = 0;

  @Output() countChanged = new EventEmitter<number>();

  increment() {
    this.count++;
    this.countChanged.emit(this.count);
  }
}
```
3. The parent component listens for the countChanged event and responds to it by updating its own currentCount.
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Counter App</h1>
    <app-counter (countChanged)="updateCount($event)"></app-counter>
    <p>Current Count: {{ currentCount }}</p>
  `
})
export class AppComponent {
  currentCount = 0;

  updateCount(newCount: number) {
    this.currentCount = newCount;
  }
}
```






