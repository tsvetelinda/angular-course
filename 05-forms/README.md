# Directives and Forms
In this folder, you'll find the notes I've taken while studying the topic (primarily based on SoftUni lectures). I've enriched the content and organized it in a simple yet clear manner for easy understanding. 

Feel free to explore the material, whether for learning or practicing!
<hr>

## Directives
### Structural Directives
* `Structural directives` modify the DOM by adding or removing elements.
* The original structural directives: `*ngIf`, `*ngFor`:
```
<div *ngIf="isVisible">This element is conditionally rendered.</div>
```
* Angular introduced the new `control flows`, which provide a clearer syntax, but work identically - `@if`, and `@for`:
```
@if (isVisible) {
    <div>This element is conditionally rendered.</div>
}
``` 
### Attribute Directives
* `Attribute directives` modify the appearance or behavior of an element.
```
<div [style.background]="backgroundColor"></div>
```
### Creating a Custom Directive:
**1. Set Up the Directive**
* Create a new folder named `/directives`, then generate a directive file (e.g., `highlight.directive.ts`).
* `ng g d highlight --skip-tests` - command for generating a directive
* Directives need to be explicitly declared as `standalone`, because otherwise, they can't be imported and used in other components.
```
@Directive({
    selector: '[appHighlight]',
    standalone: true,
})
export class HighlightDirective implements OnInit {
    ngOnInit: void { }
}
```
**2. Using the directive in a component**
* Import the directive class into the component's .ts file: (e.g., `HighlightDirective`).
* Apply the directive as an attribute:
```
<p appHighlight>home works!</p>
```

### Accessing and Manipulating Elements in Directives
**1. Constructor Injection**
* To interact with DOM elements and ensure best practices, inject `ElementRef` and `Renderer2` in the directive's `constructor`:
```
constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
```
**2. Styling with Renderer**
* Avoid directly manipulating the DOM (`document.getElementById` is forbidden in Angular to maintain reactivity).
* Example of good and bad practices:
```
ngOnInit: void {
    // Bad practice: Direct DOM manipulation
    this.elementRef.nativeElement.style.background = 'orange';

    // Good practice: Use Renderer2 for safe DOM manipulation
    this.renderer.setStyle(this.elementRef.nativeElement, 'background', 'pink');
}
```
### Handling Events in Directives
**1. Mouse Events with Renderer**
* Example: Changing background color on hover.
```
this.renderer.listen(this.elementRef.nativeElement, 'mouseenter', this.mouseEnterHandler.bind(this));
this.renderer.listen(this.elementRef.nativeElement, 'mouseleave', this.mouseLeaveHandler.bind(this));
```
* **Important Note:** Never forget to: `bind(this)`, since we are working in a class, not using an arrow function. When working in a class in TypeScript or JavaScript, `this` refers to the current instance of the class. However, when passing a class method as a callback (e.g., for an event listener), the context of this can be lost. This happens because functions in JavaScript have dynamic this binding, and the this inside the method may no longer point to the instance of the class.

* Define the event handlers:
```
mouseEnterHandler() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background', 'orange');
}

mouseLeaveHandler() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background', 'blue');
}
```
* Common Events in Angular:
    * `mouseenter`
    * `mouseleave`
    * `click`
    * `dblclick`
    * `mousemove`

**2. Adding/Removing Classes**
* Use the renderer to manage classes dynamically:
```
this.renderer.addClass(this.elementRef.nativeElement, 'highlight');
```

### Best Practices
**1. Cleaning Up**
* Always clean up event listeners to prevent memory leaks.
* Example: Use `OnDestroy` lifecycle hook:
```
export class HighlightDirective implements OnInit, OnDestroy {
    private unsubEventArray: (() => void)[] = [];

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    ngOnInit(): void {
        const mouseEnterEvent = this.renderer.listen(this.elementRef.nativeElement, 'mouseenter', this.mouseEnterHandler.bind(this));

        const mouseLeaveEvent = this.renderer.listen(this.elementRef.nativeElement, 'mouseleave', this.mouseLeaveHandler.bind(this));

        this.unsubEventArray.push(mouseEnterEvent, mouseLeaveEvent);
    }

    ngOnDestroy(): void {
        this.unsubEventArray.forEach((eventFn) => eventFn());
    }
}
```
* All functions, collected in the `unsubEventArray` have the `removeEventListener` method attached to them. Therefore, they can be executed in `ngOnDestroy` to perform proper clean-up.

**2. `@HostListener` Decorator**
* For listening to events, you can use `@HostListener` as a cleaner alternative. It automatically handles cleanup:
```
@HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background', 'orange');
}

@HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background', 'blue');
}
```
**3. Handling Input Changes**
* Use the `OnChanges` lifecycle hook to detect input changes:
```
ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputProperty']) {
        // React to changes
    }
}
```

## Forms
### Template-Driven Forms
* Template-Driven Forms rely heavily on Angular's directives like `ngModel`, `ngForm`, and validators defined in the template.

**1. Key Components of Template-Driven Forms**
* `ngForm`: Tracks the state and validity of the entire form.
* `ngModel`: Two-way data binding for input fields, allowing Angular to track field values and apply validation.
```
<div class="form-container">
    <h3>Login Form:</h3>

    <form #loginForm="ngForm" (ngSubmit)="formSubmitHandler()">
        <div>
            <label for="email">Email</label>
            <input type="text" id="email" name="email" ngModel #emailInput="ngModel">
        </div>
        @if (emailInput.touched) {
            <div>
                @if (emailInput.errors?.['required']) {
                    <div>Email is required!</div>
                }
            </div>
        }
        <div>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" ngModel #passwordInput="ngModel">
        </div>
        <button>Login</button>
    </form>
</div>
```
* Example explained:
```
@if (emailInput.touched) {
    <div>
        @if (emailInput.errors?.['required']) {
            <div>Email is required!</div>
        }
    </div>
}
```
* `touched`: Checks if the user interacted with the field.
* `errors['required']`: A validation error exists for the required rule.

```
export class LoginComponent {
    @ViewChild('loginForm') form: NgForm | undefined;

    formSubmitHandler() {
        if (this.form?.valid) {
            // Handle form submission
            console.log(this.form.value);

            // Resets the form
            this.form.reset(); 
        }
    }
}
```

**2. Adding Custom Validators (e.g., Max Count)**
```
@Directive({
    selector: '[appMaxCount]',
    standalone: true,
    providers: [{
        provide: NG_VALIDATORS,
        multi: true,
        useExisting: MaxCountDirective
    }]
})

export class MaxCountDirective implements Validator {
    @Input() appMaxCount: number | undefined;

    validate(control: AbstractControl): ValidationErrors | null {
        const len = control.value?.length || 0;

        if (!this.appMaxCount || len <= this.appMaxCount) {
            return null;
        } 
        return { appMaxCount: this.appMaxCount };
    }
}
```
* `validate()` returns an error if there is such, and null if there are none.
* The new directive then needs to be attached to an input file:
```
<div class="form-group">
    <label for="password">Password</label>
    <input type="password" id="password" name="password" ngModel #passwordInput="ngModel" [appMaxCount]="maxCountNumber">
</div>

@if (passwordInput.errors?.['appMaxCount']) {
    <div style="color: red;">Password is longer than {{ maxCountNumber }}</div>
}
```

### Reactive Forms
* `Reactive Forms` focus on explicitly defining the form structure and validations programmatically in the component class. These are more suited for complex forms or dynamic validation scenarios.

**1. Key Components of Reactive Forms**
* `FormGroup`: Represents the entire form or a group of controls.
* `FormControl`: Represents a single form input.
```
export class RegisterComponent {
    registerForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.maxLength(5)]),
    });

    handleSubmit() { 
        if (this.registerForm.invalid) {
            return;
        }
        this.registerForm.reset();
    }
}
```
* To work with reactive forms, `ReactiveFormsModule` needs to be imported. 
* `registerForm.invalid` - returns if the form is invalid, based on the validators that we've set for the different fields.
```
<form [formGroup]="registerForm" (ngSubmit)="handleSubmit()">   
    <div>
        <label for="email">Email</label>
        <input type="text" id="email" name="email" formControlName="email">
    </div>
    @if (registerForm.get('email')?.touched) {
        <div>
        @if (registerForm.get('email')?.errors?.['email']) {
            <div>Email is invalid!</div>
        }
        </div>
        }
    <div>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" formControlName="password">
    </div>
    <button>Register</button>
</form>
```
* `[formGroup]="registerForm"` - this name matches the registerForm variable we created in the corresponding .ts file.
* `formControlName="email"` - this matches the form control, that we set up in the corresponding .ts file:
```
email: new FormControl('', [Validators.required, Validators.email]),
```