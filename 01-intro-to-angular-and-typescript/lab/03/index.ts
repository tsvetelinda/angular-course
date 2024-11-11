class Employee {
    name: string;
    age: number;
    salary: number;
    tasks: string[];

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
        this.salary = 0;
        this.tasks = [];
    }

    public work() : void { }
    public collectSalary() : void { }
}

class Junior extends Employee {
    constructor(name: string, age: number) {
        super(name, age);

        this.tasks = [`${this.name} is working on a simple task.`];
    }

    work() : void {
        console.log(this.tasks[0]);
    }

    collectSalary() : void {
        console.log(`${this.name} received ${this.salary} this month.`);
    }
}

class Senior extends Employee {
    taskIndex: number;

    constructor(name: string, age: number) {
        super(name, age);

        this.tasks = [`${this.name} is working on a complicated task.`,
            `${this.name} is taking time off work.`,
            `${this.name} is supervising junior workers.`
        ];
        this.taskIndex = 0;
    }

    work() : void {
        if (this.taskIndex > this.tasks.length) {
            this.taskIndex = 0;
        }
        console.log(this.tasks[this.taskIndex]);
        this.taskIndex++;
    }

    collectSalary() : void {
        console.log(`${this.name} received ${this.salary} this month.`);
    }
}

class Manager extends Employee {
    divident: number;
    taskIndex: number;

    constructor(name: string, age: number) {
        super(name, age);

        this.tasks = [`${this.name} scheduled a meeting.`,
            `${this.name} is preparing a quarterly report.`
        ];
        this.taskIndex = 0;
        this.divident = 0;
    }

    work() : void {
        if (this.taskIndex > this.tasks.length) {
            this.taskIndex = 0;
        }
        console.log(this.tasks[this.taskIndex]);
        this.taskIndex++;
    }

    collectSalary() : void {
        console.log(`${this.name} received ${this.salary + this.divident} this month.`);
    }
}

const junior = new Junior('Alice', 22);
junior.salary = 2500; 
junior.work();
junior.collectSalary();

const senior = new Senior('Bob', 35);
senior.salary = 5000; 
senior.work(); 
senior.work();
senior.work(); 
senior.collectSalary();

const manager = new Manager('Charlie', 40);
manager.salary = 8000;
manager.divident = 2000; 
manager.work();
manager.work(); 
manager.collectSalary(); 