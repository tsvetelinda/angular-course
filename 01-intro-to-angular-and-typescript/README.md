# Intro to Angular and TypeScript
In this folder, you'll find the notes I've taken while studying the topic (primarily based on SoftUni lectures). I've enriched the content and organized it in a simple yet clear manner for easy understanding. You'll also find a collection of exercises related to this lecture topic. The solutions are my own, while the exercise descriptions remain the property of SoftUni.

Feel free to explore the material, whether for learning or practicing!
<hr>

## HTTP Basics
* `HTTP (Hypertext Transfer Protocol)` is a foundational, text-based protocol for the web that enables communication between a client (like a browser) and a server.
    * **Client-Server Architecture**: HTTP is based on a request-response model, where the client sends a request, and the server provides a response.
    * **Stateless Protocol**: Each HTTP request is independent, meaning no information is retained between requests unless session management is implemented.
    * **HTTPS (Hypertext Transfer Protocol Secure)**: The "S" stands for SSL/TLS encryption, which secures data transmission. By encrypting data, HTTPS prevents unauthorized access and ensures the privacy and integrity of information sent over the network. **HTTP** should ideally be used **only for local projects** or **development environments**, as it does not provide encryption.

### HTTP Request Methods
HTTP defines several methods that specify the action intended on a resource, commonly associated with CRUD operations:

* `GET`: Retrieves or loads a resource. GET requests are typically safe, as they don't alter server data.
* `POST`: Sends data to the server to create or store a resource. Often used for form submissions, **POST requests may change server state**.
* `PUT`: Replaces a resource or creates it if it doesn't exist.
* `DELETE`: Removes a resource.
* `PATCH`: **Partially updates** a resource, only modifying specific fields rather than the entire resource.
* `HEAD`: Similar to GET, but only retrieves the resource's headers, often used to check metadata (like content type or last modification date) without downloading the content.
* `OPTIONS`: Returns the HTTP methods that the server supports for the specified URL. This is often used in Cross-Origin Resource Sharing (CORS) to check if a client from a different origin has permission to access a resource. For example:
```
HTTP/1.1 204 No Content
Date: Wed, 06 Nov 2024 12:00:00 GMT
Server: Apache/2.4.41 (Ubuntu)
Allow: OPTIONS, GET, POST, PUT, DELETE
Access-Control-Allow-Origin: https://another-origin.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
```

### CRUD operations 
* `CRUD` stands for `Create, Read, Update, and Delete`. These operations are fundamental to managing data in applications:
    * `Create (POST), Read (GET), Update (PUT or PATCH), Delete (DELETE)`.
    * **Note**: GET requests traditionally do not include a body. If a body is included, many servers will ignore it, or it may cause an error, as it's not part of the GET specification.

### Pagination
* Pagination is a recommended approach when handling `large datasets`, as it prevents performance issues and optimizes server response times.
* Instead of loading all records at once, pagination divides the data into manageable chunks (pages). Users can request each chunk individually, reducing server load and improving response time.
* Pagination is not needed if the dataset is minimal and unlikely to grow significantly.
* Web apps using pagination:
    * E-commerce Websites (e.g. Amazon)
    * Social Media Feeds (e.g. Twitter)
    * Search Engines (e.g. Google)

### OSI Model
The `OSI Model (Open Systems Interconnection Model)` is a conceptual framework used to understand and standardize `how different networking devices communicate over a network`. It divides the communication process into `seven distinct layers`, each with its own functions and protocols.

Here's a breakdown of each layer, starting from the lowest (physical) layer up to the highest (application) layer.

### 1. Physical Layer (Layer 1)
* **Purpose**: Handles the physical connection between devices and the transmission and reception of raw bitstreams over a physical medium, like cables or radio waves.
* **Functions**: Manages data encoding, modulation, and hardware components (e.g., cables, switches, network adapters).
* **Examples**: Ethernet cables, fiber optics, Wi-Fi standards (e.g., IEEE 802.11).

### 2. Data Link Layer (Layer 2)
* **Purpose**: Establishes a direct link between two nodes on the same network, ensuring data transfer is reliable and free from errors.
* **Functions**: Handles error detection, correction, and flow control. It also organizes data into frames and manages MAC (Media Access Control) addresses.
* **Examples**: Ethernet (IEEE 802.3), Wi-Fi (IEEE 802.11), and ARP (Address Resolution Protocol).

### 3. Network Layer (Layer 3)
* **Purpose**: Responsible for data routing and forwarding, managing the paths data packets take to reach their destination across different networks.
* **Functions**: Addresses data packets, routes them based on IP addresses, and handles packet fragmentation and reassembly.
* **Examples**: IP (Internet Protocol), ICMP (Internet Control Message Protocol), and routers.

### 4. Transport Layer (Layer 4)
* **Purpose**: Ensures complete data transfer and manages error correction, flow control, and reliability in data delivery.
* **Functions**: Segments data, reassembles it at the destination, and handles end-to-end error recovery and flow control.
* **Examples**: TCP (Transmission Control Protocol) for reliable transmission, and UDP (User Datagram Protocol) for faster, connectionless communication.

### 5. Session Layer (Layer 5)
* **Purpose**: Manages sessions or connections between applications, establishing, managing, and terminating communication sessions.
* **Functions**: Synchronizes data exchange, maintains connections during data transfer, and handles session checkpoints.
* **Examples**: RPC (Remote Procedure Call), NetBIOS.

### 6. Presentation Layer (Layer 6)
* **Purpose**: Translates data between the application layer and the network, ensuring that data is in a usable format.
* **Functions**: Handles data encryption, decryption, compression, and formatting.
* **Examples**: SSL/TLS (for encryption), data format conversions like JPEG or GIF.

### 7. Application Layer (Layer 7)
* **Purpose**: Provides network services to end-user applications and directly interfaces with software applications.
* **Functions**: Facilitates networked applications, manages user authentication, data communication, and provides file transfer, email, and other services.
* **Examples**: `HTTP, FTP, SMTP, DNS`.

### How the OSI Model Works
When data is sent from one device to another, it flows down the OSI layers on the sending device, starting from the application layer down to the physical layer. Each layer packages the data with necessary information for the corresponding layer on the receiving device to interpret. The data then travels over the physical network to the receiving device, where it moves up the layers from the physical layer back to the application layer, being unpacked and processed at each stage.

### OSI Model vs. TCP/IP Model
While the OSI model is a theoretical framework, the TCP/IP model is more practical and commonly used on the internet. The TCP/IP model has four layers that correspond to OSI layers: Application, Transport, Internet, and Link. It's simpler, but the OSI model is still valuable for understanding network functionality at a detailed level.

### HTTP/1 vs HTTP/2 vs HTTP/3

`HTTP/1.1`
* Introduced: 1997
* Features: Text-based protocol, persistent connections, and pipelining.
* Limitations: Head-of-line blocking (only one request at a time per connection), often requiring multiple connections to improve load times.
    * `Head-of-Line Blocking`: In HTTP/1.1, only one request can be processed at a time on a single connection. If you send multiple requests, they get processed in the order they're sent. If one request takes a while to complete, it holds up (or "blocks") the requests behind it.
    * `Multiple Connections`: To work around this, browsers often open multiple TCP connections (e.g., 4-6) to fetch different resources (like images, scripts, and styles) simultaneously. However, this approach increases server load and is less efficient.
    * `Example`: Imagine you're at a checkout counter, and only one person can check out at a time. If a person has many items, everyone behind has to wait. So, you open more counters (connections), which works but adds complexity.

`HTTP/2`
* Introduced: 2015
* Features: Binary protocol with multiplexing (multiple requests on one connection), header compression, and server push.
* Benefits: Reduced latency, faster performance by avoiding multiple TCP connections.
* Limitations: Still affected by TCP-level head-of-line blocking when there's packet loss.
    * `Binary Protocol with Multiplexing`: HTTP/2 allows multiple requests to be sent and received simultaneously over a single connection. Each request is split into small, manageable packets, which are then reassembled on the receiving end. `This eliminates the head-of-line blocking issue at the HTTP level.`
    * `Benefits of Multiplexing`: Multiplexing makes HTTP/2 faster because it can handle multiple requests without opening extra connections or waiting for one request to finish before starting the next.
    * `Example`: Think of a single, fast checkout lane where multiple people can add items to the conveyor belt at the same time. Everyone's items are processed in parallel, without blocking anyone else.

`HTTP/3`
* Introduced: 2020
* Features: Built on QUIC (UDP-based protocol) instead of TCP, which eliminates head-of-line blocking at the transport level.
* Benefits: Faster, more resilient connections over unreliable networks, with improved performance for modern web applications.

## Routing Overview
### SPA (Single-Page Application) vs MPA (Multiple-Page Application)
* SPA
    * Loads a single, mostly empty HTML file initially; content is then dynamically injected as the user navigates.
    * May have a slightly slower initial load, but subsequent interactions are fast due to content loading without full page refreshes.
    * Mimics traditional multi-page navigation through JavaScript and browser history.
    * Maintains state across "pages," providing a responsive, app-like experience.
    * Suitable for building fast, interactive interfaces.
* MPA
    * Each page has its own HTML file, which fully reloads with every navigation.
    * Loads new headers, scripts, body content, fonts, etc., every time a new page is accessed or refreshed.
    * Simpler to implement but generally slower for navigation, as each page load is a separate request to the server.

### Routing
* Enables navigation within an app without full-page reloads.
* Updates the URL to reflect the current "page," making it clear where the user is.
* Essential for SPAs to allow deep linking, browser history, and back/forward navigation
* `In SPAs`: Routing typically happens client-side. When a user navigates, JavaScript dynamically updates the view without reloading the page, and the URL changes to reflect the new "page." This is key to maintaining a smooth, app-like experience.
* `In MPAs`: Routing is usually server-side. Each navigation request loads a new HTML page, which may involve additional assets. The URL updates with each page load, but it results in a full page refresh.

## Angular Overview
* `Web application platform`: Angular is a comprehensive platform for building modern web applications.
* `Maintainable and replaceable code`: Angular's architecture promotes clean, modular code that's easier to maintain and scale.
* `Cross-platform`: Angular code can be easily adapted to build mobile apps, server-side applications, and client-side web apps.
* `Framework`: Angular is a framework, meaning it provides a comprehensive structure for developing applications (including features like routing, forms, HTTP requests, and more) out of the box.
* `Defines both structure and architecture`: Angular follows a structured architecture based on modules, components, and services, helping developers organize their code effectively.
* `Angular vs React`: Unlike React (a library), Angular is a complete framework that offers more built-in solutions for application needs (e.g., forms, routing, dependency injection). React often requires additional libraries to match Angular's functionality.
* `Enforces good practices`: Angular enforces conventions and design patterns (e.g., MVC—Model View Controller) to help developers follow best practices, ensuring consistency and maintainability.
* `Developed by Google`: Angular is maintained and developed by Google.

### Angular Versions:
* AngularJS (1.x): The first version of Angular, based on the MVC (Model-View-Controller) architecture. The MVC pattern separates an app into three interconnected components:
    * Model: Represents the data of the application.
    * View: The user interface that displays the data.
    * Controller: Handles the logic for updating the model and view.
* Angular 2 and Later (Angular 2 to 18): Starting from Angular 2, the framework adopted a component-based architecture (instead of MVC) for better modularity and maintainability.
* Angular 17 and 18: These versions introduced standalone components, allowing components to exist without being part of an Angular module (similar to how React works with components).

## Introduction to TypeScript
* TypeScript is a tool that adds static typing to JavaScript, helping developers catch errors early and improve code quality.
* `A superset of JavaScript`: TypeScript is built on top of JavaScript. Any valid JavaScript code is also valid TypeScript, but TypeScript introduces additional features like type annotations and interfaces. This means you can write JavaScript code in a .ts file, and it will work just like in JavaScript.
* `Not directly supported by browsers or Node.js`: Browsers and Node.js do not natively understand TypeScript. Therefore, TypeScript code must be transpiled (not compiled) into JavaScript before it can be executed.
    * To compile/convert a TypeScript file, use the TypeScript compiler (tsc):
    ```
    tsc index.ts
    ```
    * This command converts the .ts file into a .js file. After that, you can run it with Node.js:
    ```
    node index.js
    ```
* The core idea in TypeScript is to `give variables explicit types`. For example, a variable is declared as a number and is expected to always be used as a number throughout its lifecycle.
    * `let x: number = 123;`-> x is a number and must always be treated as a number
    * `let x: number | string = 123`; -> a variable can be declared to hold multiple types using a `union type`.
* In contrast, JavaScript is dynamically typed, which means the type of a variable can change over time, leading to potential runtime errors.
* `Transpiling vs Compiling`:
    * `Compilation` refers to the process of converting high-level code into a lower-level language, often machine code (e.g., C++ to machine code).
    * `Transpiling` means translating one high-level language to another high-level language (e.g., TypeScript to JavaScript), preserving the abstraction level.
* An `interface in TypeScript` defines a **contract for the structure** that an object must follow. It specifies the types of the properties that an object should have.
```
interface User {
    name: string;
    age: number;
}

const peshoUser: User = {
    name: 'Pesho',
    age: 23
}
```
* In TypeScript, `classes can implement interfaces`. When a class implements an interface, it must adhere to the structure defined by the interface. This ensures that the class has the required properties and methods.
```
interface Human{
    firstName: string;
    lastName: string;
    age: number;
}

class Person implements Human {
    firstName: string;
    lastName: string;
    age: number = 10;

    constructor(firstName:string, lastName:string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    getAgeMsg():string {
        return `This human is ${this.age} years old!`;
    }
    getDetails():void {
        console.log(`Person details: ${this.firstName} ${this.lastName}`);
    }
}
```

### Angular
* `Angular CLI (Command Line Interface)`: A tool to help create, develop, and maintain Angular applications with commands like `ng serve` to start the app. It is installed via the following command: `npm install -g @angular/cli`
* `Installation`: Angular can be installed through Node Package Manager (npm) using the CLI, which sets up the project environment.
* `Styling Options`: Angular supports various styling languages: CSS, SCSS, LESS, SASS.
* `Starting the Application`: Use `ng serve` to compile and run the app locally, accessible on http://localhost:4200 by default.
* `Hydration`: A process often used in server-side rendering (SSR) where HTML is initially rendered on the server, and Angular re-renders or "hydrates" the page on the client to make it interactive.
* `Command`: `ng g c home --standalone` generates a new component named home in a standalone format, meaning it doesn’t rely on a module file for configuration. Standalone components simplify component organization and reduce dependencies.

## Additional Insights, Gained While Working on the Lab Exercises
* In TypeScript, an `abstract class` is a class that cannot be instantiated directly and serves as a blueprint for other classes. It is primarily used to define a common structure and behavior that other classes should inherit, while also allowing for certain methods to be left undefined, so that subclasses are required to implement them.
* A `public member of a class` in TypeScript (and other object-oriented languages) is a property or method that is accessible from outside the class. This means you can access it freely from any instance of the class or even from other parts of your code. Public members are the default in TypeScript, so if you don’t specify an access modifier, a member is considered public.






