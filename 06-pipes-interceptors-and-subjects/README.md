# Pipes, Interceptors and Subjects
In this folder, you'll find the notes I've taken while studying the topic (primarily based on SoftUni lectures). I've enriched the content and organized it in a simple yet clear manner for easy understanding. 

Feel free to explore the material, whether for learning or practicing!
<hr>

## Pipes
* **Pipes** are functions that **modify or transform data directly within an Angular template**. They help format data in a readable or desired way before displaying it.
* The `@Pipe` decorator marks this class as an Angular Pipe, which allows it to be used for transforming data in templates.
* The pipe is **standalone**, meaning it doesn't need to be declared in an `NgModule`. You can directly import and use it in components.
* To apply a pipe, use the `|` (pipe operator) in the template. For example, to display a title in uppercase:
```
<h3>Hello! {{ title | uppercase }}</h3>
```
* To use **built-in Angular pipes** (e.g., `uppercase`, `lowercase`, `date`, etc.), you need to import `CommonModule` into your component's module. However, if you're only using one or two pipes, it's better to import them individually rather than the entire `CommonModule` to optimize performance.
* **Chaining pipes** - Multiple pipes can be applied in sequence, with each transformation affecting the next.
* Common Built-in Pipes:
    * `AsyncPipe` - Automatically subscribes to and retrieves data from an Observable or Promise.
    * `JSONPipe` - Converts an object into a JSON-formatted string for debugging.
* For a full list of Angular pipes, refer to the official documentation: [🔗 Angular Pipes Guide](https://angular.dev/guide/templates/pipes)
---
* To generate a custom pipe using Angular CLI, run: `ng g pipe reduce --skip-tests`
* Custom pipes need to be imported in the components, where they are used.
* `PipeTransform` is an Angular interface that enforces the `transform()` method (which actually performs the transformation). The new pipe is required to define its own version of the `transform()` method. By implementing `PipeTransform`, your class is required to have a `transform()` method, but Angular does not provide any built-in logic for it.
* This pipe performs an array reduction using a callback function and an initial value:
```
@Pipe({
    name: 'reduce',
    standalone: true
})
export class ReducePipe<T> implements PipeTransform {
    transform(array: T[], callbackFn:(acc: T, current: T) => T, initialValue: T): T {
        return array.reduce(callbackFn, initialValue);
    }
}
```
* Using this pipe in a template:
```
<div>{{ user.grades | reduce : sum : 0 }}</div>
```

## JSON Web Token (JWT)
* JWT is an open standard that defines a compact and self-contained way of securely transmitting information **as a JSON object** between parties.
* It is commonly used for authentication and authorization in web applications. Unlike cookies, **JWTs are stateless** and do not require server-side storage, making them ideal for distributed systems.
* JWTs are not inherently encrypted, meaning anyone with access to the token can read its contents. However, the information is digitally signed, ensuring its authenticity and integrity.
* When something is `digitally signed`, it means that it has been processed using a **secret key** (in the case of symmetric cryptography) or a **private key** (in asymmetric cryptography) to create a unique signature. This allows others to verify that the data has not been altered and that it comes from a trusted source.
### Common Use Cases
**1. Authorization (Most Common Use Case)**

* After a user logs in, the server generates a JWT and sends it to the client.
* The client includes this token in the Authorization header in subsequent requests.
* The server verifies the token and grants access to protected routes, services, or resources.

**2. Information Exchange**
* JWTs are useful for transmitting information between parties securely because they are digitally signed.
* The signature ensures that the data has not been tampered with.

### Structure of a JWT
A JWT consists of three parts, separated by dots (.):
* **Header** – Specifies the token type (JWT) and the signing algorithm (e.g., HS256).
* **Payload** – Contains claims (user data, expiration time, etc.).
* **Signature** – Ensures the token’s integrity by signing the header and payload using a secret key or public/private key pair.

### JWT vs. Cookies
* JWTs are stateless, meaning the server does not store session data.
* Cookies store session data on the server, requiring session management.
* JWTs can be stolen if stored in local storage (prone to XSS attacks).
* Cookies with httpOnly flag prevent JavaScript access and help mitigate XSS.
* Session hijacking can be a risk if cookies are not secured properly.
* **Interview Takeaway:** They're not competing concepts! Instead, JWT is an authentication method, and cookies are a transport/storage mechanism. The best practice is to use them together for a secure and scalable authentication solution.

### JWTs and Cookies: How They Work Together
**JWT is the authentication mechanism (token-based auth).**
* JWT is a self-contained token that stores user authentication data.
* The server issues a JWT after a user logs in.
* The client sends this JWT with every request to access protected routes.

**Cookies are a storage & transport mechanism.**
* Cookies allow storing data on the client and sending it automatically with requests.
* Instead of storing the JWT in localStorage (which is vulnerable to XSS attacks), we can store it in an HTTP-only, secure cookie.
* The browser automatically sends the cookie with every request to the backend.

### Using JWTs Inside Cookies – Best Practice
**1. User logs in.**
* The backend verifies credentials and generates a JWT.
* The JWT is stored inside a cookie (`Set-Cookie` header).

**2️. Browser stores the cookie.**
* The cookie has attributes like `HttpOnly`, `Secure`, and `SameSite` for security.

**3️. Client makes requests.**
* The browser automatically sends the JWT cookie in the request to the backend.
* The backend verifies the JWT before granting access.

## Interceptors
* An interceptor in Angular is **a service that intercepts and modifies HTTP requests** and responses globally.
* Interceptors allow you to handle logic that applies to all HTTP requests in one place, instead of duplicating the same logic across components or services.
* Interceptors can catch and handle errors for all HTTP requests in a centralized manner.

They are commonly used for:
* Automatically attaching authentication information (e.g., JWT tokens).
* Logging requests and responses for debugging and analytics.
* Handling errors globally (e.g., redirecting users on 401 errors).
* Modifying request URLs (e.g., replacing `/api` with an environment variable).
* Interceptors in Angular are implemented using `HttpInterceptor`. You can generate an interceptor using the Angular CLI: `ng g interceptor http --skip-tests`
* In the `app.config.ts`: `provideHttpClient(withInterceptors([httpInterceptor]))`. As a result, Angular automatically:
    * Injects the interceptor into the HttpClient.
    * Runs the interceptor on every outgoing HTTP request.
    * Modifies requests or responses based on the interceptor logic.
* Since Angular now uses functions instead of classes for interceptors, you need to provide them properly:
```
export const httpInterceptor: HttpInterceptorFn = (req, res) => {
    if (req.url.startsWith('/api')) {
        req = req.clone({
            url: req.url.replace('/api', API_URL),
        });
    }
    return next(req).pipe(
        tap((req) => {
            if (req instanseof HttpRequest) {
                // Advanced logging mechanism
            }
        }), 
        catchError((err) => {
            if (err.status === 0) {
                console.log('Error from interceptor: ', err);
                return EMPTY;
            }
            return [err];
        })
    );
}
```

### Lazy Loading
* Lazy loading is a technique where components or modules are loaded only when they are needed, instead of loading them at the initial application startup.
* In Angular, we split the application into separate feature components for efficient loading. Feature components are only loaded when the user navigates to the specific route.
* In `app.routes.ts`, we are going to make the Lazy component load only on demand in chunks:
```
export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
    }, 
    {
        path: 'lazy',
        loadComponent: () => import('./lazy/lazy.component').then((c) => c.LazyComponent)
    }
];
```
* Now, if we open the Network tab in the browser, we can see that a chunk has been loaded.
* The `import()` in `loadComponent` returns a `Promise` that resolves to the module. This is why `then` is needed to access the actual component after the module is loaded.
* By lazy loading components we can still use **route guards**, by applying them to the `canLoad` property.

#### Preloading Strategy
```
providers: [provideRouter(routes, withPreloading(PreloadAllModules))]
```
* The `withPreloading(PreloadAllModules)` is a preloading strategy in Angular that allows for **preloading lazy-loaded modules in the background after the initial app load**. 
* This contrasts with the standard lazy loading, where the module is only loaded when it's actually needed (i.e., when the user navigates to a specific route).
* It loads the lazy-loaded modules in the background so they’re ready when the user navigates to those routes, without the delay of loading the module at that time.

**Benefits:**
* `Improving perceived performance`: If your app has multiple lazy-loaded modules that the user is likely to visit soon after loading the app, preloading them in the background can improve the user experience by reducing load times when navigating to those modules.
* `Good for apps with several modules`: In apps where different routes correspond to distinct parts of the app and where users are likely to navigate to various sections, this strategy can ensure that resources are available without delays.

#### `WithDebugTracing`
* `withDebugTracing` is an Angular **router strategy** used to enable **detailed logging** for route changes, helping developers debug the routing process. 
* It logs the lifecycle of route transitions, such as navigation events, guards, and resolvers, to the console, making it easier to track how the app navigates between routes.
```
providers: [provideRouter(routes, withDebugTracing())]
```

### Subjects
* A special type of `observable` in RxJS.
* A subject can be both an `observable` and an `observer`, meaning it can **emit values and also listen for them**.
* It allows `multicasting of values` to multiple observers (`subscribers`). **When the subject emits a value, all subscribed observers will receive that value.**
* Subjects are similar to event emitters, where events can be broadcasted to multiple listeners.
---
#### Example
```
const subject$$ = new Subject();
subject$$.subscribe(data => console.log('Tsveti:', data));
subject$$.next('The movie has started!');
```
* This will output: `Tsveti: The movie has started!` because `subject$$` **emits** the value using `next()`, and **Tsveti subscribes to listen for that value**.
* If there is no call to `next()`, nothing will be emitted, and the subscriber will not get any data.
---
#### Let's extend the example a bit:
```
const subject$$ = new Subject();
subject$$.subscribe(data => console.log('Tsveti:', data));
subject$$.next('The movie has started!');

subject$$.subscribe(data => console.log('Peter:', data));
subject$$.next('It's the middle of the movie!');

subject$$.subscribe(data => console.log('Maria:', data));
subject$$.next('It's the end of the movie!');
```
Result:
```
Tsveti: The movie has started!
Tsveti: It's the middle of the movie!
Peter: It's the middle of the movie!
Tsveti: It's the end of the movie!
Peter: It's the end of the movie!
Maria: It's the end of the movie!
```
* **Explanation:** Subjects emit values to all subscribers at the time the value is emitted. The order of subscription matters: **the earlier a subscriber subscribes, the more values it will receive because it will get all values emitted after it subscribes.**
* A subject does not "remember" previous values once new subscribers join. If a subscriber subscribes after the first value is emitted, it will only receive the values emitted after its subscription, not the previous ones.
---
#### BehaviorSubject 
* `BehaviorSubject` is a type of Subject in RxJS that stores and emits the **most recent value to new subscribers**.
* Unlike a regular Subject, which doesn't remember previous values, a BehaviorSubject always holds the latest emitted value and immediately sends that value to new subscribers upon subscription.
* It is commonly used when you need to **fetch data from somewhere and ensure that the most recent value is always available to subscribers** (even if they subscribe later).
```
const bSubject$$ = new BehaviorSubject(100);
bSubject$$.subscribe(data => console.log('Subscribe', data));

setTimeout(() => {
    bSubject$$.next(200);
    bSubject$$.next(300);
    bSubject$$.next(400);
    bSubject$$.next(500);

    bSubject$$.subscribe((data) => console.log('Sub 2:', data));

    setTimeout(() => {
        bSubject$$.next(900);
        bSubject$$.subscribe((data) => console.log('Sub 3: ', data));
    }, 2000);
}, 3000);
```
**Result:** All subscribers are subscribed only to the last value: `900`.
```
Sub 1: 100
Sub 1: 200
Sub 1: 300
Sub 1: 400
Sub 1: 500
Sub 2: 500
Sub 1: 900
Sub 2: 900
Sub 3: 900
```
* `BehaviorSubject` does not hold a queue of all emitted values; it only remembers the latest value. So, if new values are emitted (`900` in this case), all subscribers, including those who subscribe later (like Sub 3), will receive that latest value immediately.
* This makes `BehaviorSubject` a good choice when you want to share the most recent state or value across multiple components or parts of an application.

#### ReplaySubject
* A `ReplaySubject` stores a specified number of previous emitted values and replays them to any new subscribers.
* For example, if the buffer size is 5, it will remember the last 5 values and replay those values to any new subscriber.
```
const rSubject$$ = new ReplaySubject(5);
rSubject$$.next(1000);
rSubject$$.subscribe((data) => console.log('Sub 1', data));
```
#### AsyncSubject
* An `AsyncSubject` only emits the last value after it completes. So it will emit the last value only when `.complete()` is called. If `.next()` is called after `.complete()`, those values will not be emitted to subscribers.
```
const asyncSubject$$ = new AsyncSubject();
asyncSubject$$.next(100);
asyncSubject$$.next(200);
asyncSubject$$.next(300);
asyncSubject$$.subscribe((data) => console.log('Sub 1: ', data));
asyncSubject$$.next(5);
asyncSubject$$.subscribe((data) => console.log('Sub 2: ', data));
asyncSubject$$.complete();
```
* `AsyncSubject` is typically used when you are only interested in the final value emitted before the observable is completed.

#### `user$` vs. `user$$`
* **Subjects** (`user$$`) are **private** to the service, meaning they are often used internally to emit values.
* **Observables** (`user$`) are **public**, often exposed as read-only to external components/services via a getter or direct subscription. They cannot emit new values, they can only listen to emitted values.