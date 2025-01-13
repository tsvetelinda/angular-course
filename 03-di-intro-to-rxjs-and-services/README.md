# DI, Intro to RxJS and Services
In this folder, you'll find the notes I've taken while studying the topic (primarily based on SoftUni lectures). I've enriched the content and organized it in a simple yet clear manner for easy understanding.

Feel free to explore the material, whether for learning or practicing!
<hr>

## Change Detection Strategy
* `Change Detection` is the process that determines when a component's view should be updated to reflect new data or state. It's a powerful feature, but as applications become more complex, efficient change detection strategies are important to keep apps fast and responsive.
### Change Detection Mechanism
* Angular `automatically runs change detection on all components`, from the top of the component tree to the bottom, whenever something changes in the app.
* This is handled by a library called `zone.js`, which tracks asynchronous events (like setTimeout, API calls, etc.) and triggers change detection at the right time.
### Zone.js
* `Zone.js` is a library that Angular uses to “patch” or wrap asynchronous operations and detect changes that occur during these operations.
* It enables Angular to "know" when it should check for updates even for asynchronous operations, which Angular otherwise would not detect.
* Examples of async functions triggering `zone.js`: `setTimeout`, `setInterval`, the Async pipe, API calls, and DOM events.
* Synchronous operations don’t require zone.js, as Angular can track those changes directly.
### Change Detection Strategies
* `Default`: This strategy runs change detection for every component in the component tree whenever Angular thinks there could be changes.
  * Suitable for simple or moderately complex apps, but it can become inefficient in larger applications with many components.
* `OnPush`: This strategy tells Angular to run change detection only if the component's inputs have changed.
  * This strategy is more efficient as it prevents unnecessary checks and is useful in components where inputs don’t frequently change.
### Zoneless Mode
  * Zoneless mode disables `zone.js`, meaning Angular won’t automatically perform change detection for asynchronous events.
  * This setup can improve performance but requires a more manual approach to trigger change detection as needed.

## SOLID Principles
* `S = Single Responsibility Principle`
  * every class should have only one responsibility
  * promotes:
    * stronger cohesion
    * looser coupling
    * better readability
    * lower complexity
  * `Example`: Separate `User` and `Wallet` classes, where each handles its specific role.
* `O = Open-Closed Principle`
  * Software entities (classes, modules and functions) are:
    * `Open for extension`: New behavior can be added.
    * `Closed for modification`: Existing code should not require alteration.
  * This principle allows new functionality without changing the core code, preserving stability while enhancing flexibility.
  * `Example`: The decorator pattern in Angular adheres to OCP by extending functionality without modifying the original component class.
* `L = Liskov Substitution Principle`
  * Derived classes must be fully substitutable for their base classes, meaning:
    * Derived classes only `extend the functionality of the base class`.
    * They do not alter or remove any existing behavior from the base class.
  * `Example`: Coffee machines: A base `CoffeeMachine` class defines a general `brewCoffee()` method. Specialized machines like `LavazzaMachine` or `SpetemaMachine` inherit this base functionality (brewing coffee) and may add extra capabilities (e.g., making cappuccinos or other drinks) without altering the basic brewing behavior.
* `I = Interface Segregation Principle`
  * A class should not be forced to implement methods it doesn’t use.
  * Large, "fat" interfaces should be broken down into smaller, more specific "role" interfaces.
  * It’s preferable to have multiple smaller, focused interfaces than a few broad ones.
  * `Example`: Suppose we have an interface `Printer` with methods like `print()`, `scan()`, and `fax()`. Not all classes implementing Printer may need all these methods. A simple `BasicPrinter` class, for instance, might only need `print()` and not scan() or fax().
* `D = Dependency Inversion Principle`

## SOLID: Dependency Inversion Principle 
* `Dependency Inversion` is the `principle`, while `Dependency Injection` is `a design pattern that realizes it`.
* `Core Idea`: High-level modules (general business logic) should not depend on low-level modules (detailed implementations); instead, both should rely on abstractions (interfaces or abstract classes).
* `Example`: If a `User` class depends directly on specific `Wallet` and `Car` instances, any changes to `Wallet` or `Car` properties require modifying the `User` class. This creates tight coupling and violates DIP.
* `Worst Practice`: Instantiating dependencies within the User class constructor `(using new)` creates hard-coded dependencies.
* `Solution`: Introduce abstractions and pass in dependencies through the constructor (Dependency Injection). This approach allows the User class to work with any object that adheres to the Wallet and Car interfaces without needing to know their details.
```
class User {
    name: string;
    wallet: Wallet;
    car: Car;

    constructor(name: string, wallet: Wallet, car: Car) {
      this.name = name;
      this.wallet = wallet;
      this.car = car;
    }
}
```

## Services
### Separation of Concerns
* Components should not handle data fetching or saving directly. Their primary responsibility is to present data. Data access, manipulation, and business logic should be handled by `services`.
### Purpose
* Services are used to `share data or functionality across multiple components`, `preventing code duplication`.
* They provide a centralized place for data handling, which promotes reusability and maintainability.
### Structure
* Services are `regular TypeScript classes` that encapsulate logic for data manipulation, API calls, or other business functionality.
* Services are injected into components using `constructor injection`, ensuring a clean and modular approach to dependency management.
* They must be provided inside the @Component or @NgModule decorator in the providers array.
```
@Component({
  selector: 'app-my-component',
  providers: [MyService] // Service is provided here
})
export class MyComponent {
  constructor(private myService: MyService) {}
}
```
### Nestable Services
* Services can be nested or injected into other services, which supports complex business logic and data manipulation workflows.
### The @Injectable Decorator
* The `@Injectable() decorator` marks a class as a service that can be injected into other components or services.
```
@Injectable({
  providedIn: 'root' // Service available throughout the app
})
export class MyService {}
```
### Service Generation Command
* `ng g s {my-service}` - to generate a service, use the Angular CLI command.
### Feature-Based Architecture
* Angular encourages a `feature-based architecture`, where services are grouped by feature rather than by type. For example, services related to "user authentication" would be grouped within the same feature module, improving organization and scalability.
### Lifecycle Hook
* Services have one lifecycle hook: `ngOnDestroy`. This is called when the service is destroyed, and it's used for cleanup tasks, such as unsubscribing from observables or cancelling ongoing HTTP requests.
### Example: Simple Angular Service for User Data
**1. Step 1: Generate the Service**
```
ng g s user
```
-> This creates a `user.service.ts` file.
```
import { Injectable } from '@angular/core';

// Injectable decorator allows this service to be injected into components or other services
@Injectable({
  providedIn: 'root' // This means the service is available throughout the whole application
})
export class UserService {
  private users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  ];

  constructor() { }

  getUsers() {
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find(user => user.id === id);
  }
}
```
**2. Step 2: Create the Component to Display User Data**
```
ng g c user-list
```
-> This creates a `user-list.component.ts` file:
```
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; // Importing the UserService

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users = [];

  // Injecting the UserService into the component's constructor
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // Call the UserService's method to get the users when the component initializes
    this.users = this.userService.getUsers();
  }
}
```
**3. Step 3: Use it in the Component Template**

## RxJS and Observables
### What is RxJS?
* RxJS stands for `Reactive Extensions for JavaScript`. It’s a library that helps manage asynchronous data streams and events, commonly used in Angular to handle complex data flows.
* **The Concept:** RxJS implements the idea of reactive programming, allowing you to handle asynchronous data as a stream.
* **The Framework:** RxJS provides tools (observables, operators, and schedulers) for working with these streams.
* You could still process asynchronous events in Angular without RxJS. However, you’d rely on lower-level APIs like Promises, async/await, or event listeners. These work fine but lack the composability and power of RxJS.

### Observables and Their Unique Qualities
* Observables are a core feature of RxJS, enabling a powerful way to `work with asynchronous data` by handling streams of information over time.
* Observables follow the `Observer Pattern`, where observers listen to streams and react to new data values, transformations, and events.

| Feature | Promises | Observables |
|------------|------------|------------|
| **Laziness** | Not lazy (executes immediately) | Lazy (executes only when subscribed to) |
| **Cancellation** | Cannot be canceled | Can be canceled by unsubscribing |
| **Streams** | Handle a single value or error | Handle multiple values over time |
* **Important Note**: A `Promise` in JavaScript is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. It acts as a placeholder for a value that is not immediately available but will be resolved in the future.
  * `async/await` is a syntax built on top of Promises to make asynchronous code easier to write and read, making it look more like synchronous code while still behaving asynchronously.
  * The `async` keyword is used to define a function that will `always return a Promise`, even if the function doesn’t explicitly return one. This allows you to use `await` inside that function to pause execution until a Promise is resolved or rejected.
  * Without `async/await`, you use `.then()` and `.catch()` to work with Promises.

### Key Characteristics of Observables
* `Lazy Execution`: Code within an observable is not executed until it is subscribed to, making it a "lazy" construct. This means no action happens until you explicitly tell it to.
* `Cancellable`: Every observable can return a function to unsubscribe or clear the stream when it’s no longer needed.
* `Support for Multiple Streams`: Observables can handle multiple streams of data, allowing you to combine, filter, map, and otherwise manipulate these streams in real time.
* In short, if you only need a snapshot of data (one-time fetch), you can use either observables or promises. But if you need a continuous stream of data, Observables are built for exactly that (live updates, for example).

#### 1. What is an Observable?
An Observable is `an object that produces a stream of data or events`. It’s like a TV channel that broadcasts signals (data) to anyone who wants to listen. But nothing actually happens until you decide to turn on the TV and start watching. Similarly, in an Observable, `the data doesn’t start flowing until you subscribe to it.`

#### 2. How You “Listen” to an Observable
To start receiving data from an Observable, you have to subscribe to it. `Subscribing` is like tuning into the TV channel—once you subscribe, the Observable begins sending data, which `could be a single value` (like a response from a server) or `multiple values over time` (like updates from a live feed).

#### 3. Observable vs. Function
Think of a regular function, which you call and immediately get a result back. But an Observable is like a function that you call and say, “Let me know whenever you have a new result.” This is why Observables are helpful for asynchronous actions—anything that takes time, like waiting for a response from a server, or handling user actions over time.

#### 4. A Simple Example
```
import { Observable } from 'rxjs';

// Creating an Observable that emits data
const tvChannel$ = new Observable(observer => {
  observer.next('News at 10');      // Emitting a value
  observer.next('Live Sports');     // Emitting another value
  observer.complete();              // No more data after this
});

// Subscribing to the Observable to start receiving data
tvChannel$.subscribe({
  next: (data) => console.log(data), // Logs each new value
  complete: () => console.log('End of transmission') // Called when the Observable is done
});
```
* When you `subscribe to tvChannel$`, it starts `"broadcasting" the messages` it contains, like “News at 10” and “Live Sports.”

### Observables, Async, and Await
* Although async/await syntax is traditionally used with Promises, Observables are often preferable in cases where multiple asynchronous events are emitted over time (e.g., user input or data streams).
* In Angular, async/await is typically applied to single-value Promises, while Observables are favored for managing continuous or complex data streams.

### Common RxJS Operators
* Operators let you manipulate and transform streams in different ways. Some commonly used operators include:
  * `map`: Transforms the data in the stream (e.g., double each number in a stream of numbers).
  * `filter`: Filters the stream, allowing only specific data values through.
  * `reduce`: Combines all values emitted by a stream into a single value.
  * `interval`: Creates a stream of numbers emitted at regular intervals.
```
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

// Create an interval stream that emits every second
const interval$ = interval(1000).pipe(
  map(value => value * 2) // Each emitted value is doubled
);

// Subscribe to the stream and log the output
interval$.subscribe(value => console.log(value));
```
* **Important Note**: In the example above, the Observable itself just defines the stream of data, but the data is only actually generated or processed when you subscribe to it.
* `interval$` = an indication that the variable represents a stream.

### Hot vs. Cold Observables
* `Cold Observables`: The data producer (such as an HTTP request) is created inside the observable, meaning each observer receives the data individually.
* `Hot Observables`: The data source exists outside the observable, so all observers receive the same data stream. For example, an event listener emits events to multiple subscribers.

### Functional Reactive Programming (FRP)
* Functional Reactive Programming (FRP) is a programming paradigm that treats data streams as central to the entire program, allowing it to be written declaratively.
* In FRP, you avoid managing complex application states directly. Instead, you build and manipulate streams of data that automatically update the application state, resulting in a more predictable and maintainable codebase.

### Example for Observables Usage in Angular
```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }

  // This method returns an Observable that emits user data
  getUsers(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
      .pipe(
        map(users => users.filter(user => user.id % 2 === 0))
      );
  }
}
```
```
export class UserListComponent implements OnInit {
  users = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.error('Error fetching users', error)
    );
  }
}
```

## HTTP Client
* a powerful `service` used for making HTTP requests to interact with backend servers. It allows you to send data to the server (such as forms, JSON, or files) and receive data in return, all while handling various aspects like error handling, request/response manipulation, and more. 
* Key Features:
  * `Making HTTP Requests` - GET, POST, DELETE, PUT, PATCH, etc.
  * `Observables` - the HTTP Client methods return observables. This means you can subscribe to the response and handle the result asynchronously.
