# Modules, Signals and Routing
In this folder, you'll find the notes I've taken while studying the topic (primarily based on SoftUni lectures). I've enriched the content and organized it in a simple yet clear manner for easy understanding.

Feel free to explore the material, whether for learning or practicing!
<hr>

## Standalone Components
Standalone components are a feature introduced in Angular to simplify application structure and enhance flexibility in managing dependencies. They allow developers to build components, directives, and pipes without requiring a parent or shared module. (They were introduced in 2023 - Angular 17).
### Key Features
#### 1. Direct Import Mechanism
Standalone components, directives, and pipes can import one another directly within their metadata using the `imports` array. This eliminates the need for shared or parent modules to connect them.
#### 2. Independent Functionality
Standalone components can function independently, making them ideal for use in Angular applications without additional configurations.
#### 3. Backward Compatibility
Angular allows the use of standalone components alongside traditional module-based architecture, making it easy to incrementally adopt this feature in existing projects.
#### 4. Simplified Structure
By removing the reliance on modules, standalone components streamline Angular application structures, especially for small or medium-sized projects.
#### 5. Optimized Dependency Management
Each standalone component declares its own dependencies, avoiding tight coupling to a module and improving reusability.
#### 6. Reusable UI Elements
Standalone components are ideal for creating self-contained, reusable UI elements such as buttons, modals, or widgets.
#### 7. Enhanced @Component Decorator
Angular extends the functionalities of the `@Component` decorator to include a standalone flag. `This innovation enables the removal of modules for standalone components.`

### What Makes a Component Standalone?
A standalone component has the `standalone flag` set to true in its metadata. This flag signifies that the component does not belong to any Angular module.
#### Example of a Standalone Component:
```
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-greeting',
  standalone: true,             // Declares the component as standalone
  imports: [CommonModule],      // Import necessary Angular modules
  template: `
    <div class="greeting">
      <h2>{{ message }}</h2>
      <p>Welcome to our standalone Angular component!</p>
    </div>
  `,
  styles: [ ],
})
export class GreetingComponent {
  message: string = 'Hello, Angular!';
}
```
#### This same standalone component, written with Modules:
1. Component file:
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-greeting',
  template: `
    <div class="greeting">
      <h2>{{ message }}</h2>
      <p>Welcome to our Angular component inside a module!</p>
    </div>
  `,
  styles: [ ],
})
export class GreetingComponent {
  message: string = 'Hello, Angular!';
}
```
2. Module file:
```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GreetingComponent } from './greeting.component';

@NgModule({
  declarations: [GreetingComponent],          // Declare the component in the module
  imports: [CommonModule],                    // Import CommonModule to use common Angular directives
  exports: [GreetingComponent],               // Export the component to make it reusable
})
export class GreetingModule {}
```
3. App Module file:
```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GreetingModule } from './greeting/greeting.module';        // Import the module

@NgModule({
  declarations: [],
  imports: [BrowserModule, GreetingModule],        // Import the GreetingModule
  bootstrap: [GreetingComponent],                 // Bootstrap the GreetingComponent directly
})
export class AppModule {}
```

## Signals
* Signals introduce a new reactivity model in Angular, aimed at managing state efficiently.
* They are `an alternative to observables for local state management` in components.
* Signals reactively update views where needed, reducing unnecessary re-renders and improving performance.
* `Value Wrapper` - A signal wraps around a value and notifies any dependent parts of the application when this value changes.
* `Data Types` - Signals can hold any value—primitives (e.g., numbers, strings) or complex objects (e.g., arrays, objects).
* `Immutability` - Signal values are immutable and can only be updated using specific methods like `set`, `update`, or `mutate`:
    * set(value): Replaces the current value
    * update(fn): Updates the value based on the previous one
    * mutate(fn): Mutates the value if it's a mutable object (e.g., arrays, objects)
* `Automatic View Updates` - When a signal's value changes, Angular automatically updates the DOM, eliminating the need for manual change detection or subscriptions.
* `Simplicity in Syntax` - Signal values are read as if calling a function `(signalName())`, providing a clean and intuitive API.
* Example:
```
<h3>Hello from counter:{{ counter() }}</h3>
<button (click)="increment()">Increment</button>
```
```
export class AppComponent {
    counter = signal(0);

    increment() {
        const value = this.counter() + 1;
        this.counter.set(value);
    }
}
```
* **Important Note**: Since signals are not immutable, we cannot increment like this: `this.counter++;`
* Comparison between Zone.js and Signals:

| Feature          | Zone.js  | Signals |
|------------------|----------|---------|
| **Reactivity Type**  | Global   | Localized (on the spot)  |
| **Trigger Mechanism**  | Detects async operations automatically   | Triggered explicitly by updates to the signal |
| **Component Update**  | Re-renders the affected component tree   | Updates only the dependent parts of the view |
| **Performance**  | Less efficient due to global detection   | More efficient with fine-grained reactivity |
| **Predictability**  | Less predictable   | Better control of the developer |
| **State Management**  | Relies on Observables, Services, NgRx   | Managed directly via signals |
| **Best Use Case**  | Small to medium apps   | Ideal for high-performance apps with complex state needs |

* **Important Note**: Zone.js does not only detect async operations, but synchronous operations too when they cause changes to the Angular application's state. Angular's change detection is triggered automatically for:
* `Events`: DOM events (e.g., clicks, input changes).
* `Template Bindings`: Changes to variables or expressions bound in the template.
* `Asynchronous Tasks`: Operations like setTimeout, Promise, HTTP requests, etc., tracked by Zone.js.

## Computed Signals
* `read-only` signals that `derive their value` from other signals.
* defined using the `computed function` and specifying a derivation: `computed()`
* only recalculated when accessed, optimizing performance by avoiding unnecessary computations.
* Angular remembers the last computed value and recalculates it only when the signals it depends on change.
```
const count: WritableSignal<number> = signal(0);
const doubleCount: Signal<number> = computed(() => count() * 2);
```
* `WritableSignal` is a type of signal that can both hold a value and allow updates to it, typical for the `signal()`.
* `Signal` is a type of signal, which is read-only. This means you cannot modify the value directly, and it depends on other signals for its value, automatically updating when those dependent signals change.

## Router Module
* The Router Module in Angular allows for client-side navigation without page reloads, enabling Single Page Applications (SPA).
* The `<base href="/">` tag in the `index.html` ensures that the browser knows where to resolve relative URLs from. This is usually set up by the CLI.
* The `<router-outlet />` directive is where Angular will render the matched component's view.
* `app.routes.ts` - Routes are defined in an array of objects, specifying the paths and components to render:
```
export const routes: Routes = [
    {path: '', component: HomeComponent},   // Default path
    {path: 'users', component: UsersComponent}
];
```
* Instead of traditional anchor (`<a>`) tags with `href`, use the `routerLink` directive for navigation.
```
<div class="nav-btn" routerLink="/">Home</div>
<div class="nav-btn">User List</div>
```
* To pass dynamic parameters in a route (e.g., a user ID), bind the `routerLink` to an array of parameters.
```
@for (user of users; track $index) {
    <li [routerLink]="'/user', '/details', user.id">id: ${user.id}, name: ${user.name}</li>
}
```
* You can define `nested routes` with children in the route configuration. This allows for more complex routes with sub-components.
```
export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'users', children: [
            { path: '', component: UserComponent },  // Default path under 'users'
            { path: 'details/:id', component: UserDetailsComponent }  // Dynamic user details
        ]
    }
];
```
* In the component itself we need to add `'RouterLink'` to the imports array, so the routing can work.

### Fetching Parameters
* In the component that handles the dynamic route (e.g., UserDetailsComponent), you can access route parameters using the `ActivatedRoute service`.
* To access the current route's parameters, query parameters, or fragments, you first need to `inject the ActivatedRoute service` into your component.
```
constructor(private route: ActivatedRoute) { }
```
* The `snapshot` property of `ActivatedRoute` gives you immediate access to route parameters when the component is loaded:
```
ngOnInit() {
    const id = this.route.snapshot.params['id']
}
```
* You can attach `query parameters` and `fragments` to a route when navigating, using `queryParams` and `fragment` bindings.
```
<a
 [routerLink]="[ '/users', user.id, user.name ]"
 [queryParams]="{ search: 'Peter' }"
 fragment="loading"
</a>
```
* In the context of URLs, a `fragment` (also known as a "hash") is a part of the URL that comes `after the # symbol`. It's typically used to refer to a specific section or anchor within a page, allowing you to scroll to a particular element or trigger an action related to that section.
```
/users/123?search=Peter#loading
```
* `/users/123` is the path.
* `?search=Peter` is the query parameter.
* `#loading` is the fragment, directing the browser to a section with the ID `loading`.

### Using Wildcards
* If the requested URL doesn't match any paths for routes,
show a 404 Not Found Page
```
{ path: '**', component: PageNotFoundComponent }
```
* To redirect from one path to another
```
{ path: '', redirectTo: 'home', pathMatch: 'full' }
```
## Router Guards
* Router guards are used to protect routes, control navigation, and restrict access to certain parts of the application based on specific criteria, such as user authentication.
* The `CanActivate` guard checks whether a route should be activated based on specific conditions. It can be used to control access, such as ensuring only logged-in users can access certain pages:
```
export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.checkIfLogged(state.url);
  if (!isLoggedIn) {
    router.navigate(['/login']);  // Redirect to login if not logged in
  }
  return isLoggedIn;  // Allow access if logged in
};
```
* `Resolvers` allow you to fetch or pre-fetch data before activating a route. It ensures that the necessary data is available when the route is loaded.
* Here’s an example where we use a resolver to fetch user data before navigating to the `UserDetailsComponent`:
```
export const userResolver: ResolveFn<any> = (route) => {
  const usersService = inject(UsersService); 
  const userId = route.paramMap.get('id')!;  // Get the user ID from the route params
  return usersService.getUserById(userId);  // Fetch user data based on the ID
};
```
* You define the resolve property in the route configuration to specify which resolver to use for data fetching:
```
export const routes: Routes = [
  {
    path: 'users/:id',
    component: UserDetailsComponent,
    resolve: { user: userResolver },  // Resolving data before the component loads
  },
];
```
* Resolvers are useful for fetching data before the route is activated.
* They allow you to handle async operations (like HTTP requests) and prevent the route from loading until the necessary data is available.







