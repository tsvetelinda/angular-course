class Ticket {
    destination: string;
    price: number;
    status: string;

    constructor(destination: string, price: number, status: string) {
        this.destination = destination;
        this.price = price;
        this.status = status;
    }
}

function sortTickets(tickets: string[], criteria: string) {
    let ticketsArr: Ticket[] = tickets.map(ticket => {
        const [ destination, price, status ] = ticket.split('|');
        return new Ticket(destination, Number(price), status); 
    });

    let sortedTickets: Ticket[];

    if (criteria === 'destination' || criteria === 'status') {
        sortedTickets = ticketsArr.sort((a, b) => (a[criteria]).localeCompare(b[criteria]));
    } else if (criteria == 'price') {
        sortedTickets = ticketsArr.sort((a, b) => a.price - b.price);
    } else {
        console.error('Invalid criteria!');
        return;
    }

    for (let ticket of sortedTickets) {
        console.log(ticket);
    }
}

sortTickets(['Philadelphia|94.20|available', 
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'
    ],
    'status');