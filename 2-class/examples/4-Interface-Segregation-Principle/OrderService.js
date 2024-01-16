// have separate interfaces for BurgerOrderService and FriesOrderService:

// Interfaces
class BurgerOrderService {
    orderBurger(quantity) {
        throw new Error("Method not implemented");
    }
}

class FriesOrderService {
    orderFries(fries) {
        throw new Error("Method not implemented");
    }
}

// create the OrderServiceObjectAdapter class which holds a reference to the external OrderService
class OrderServiceObjectAdapter extends BurgerOrderService {
    constructor(adaptee) {
        super();
        this.adaptee = adaptee;
    }

    orderBurger(quantity) {
        this.adaptee.orderBurger(quantity);
    }
}

// when a client wants to use BurgerOrderService, we can use the OrderServiceObjectAdapter to wrap the external dependency:
class Main {
    static main() {
        // Assuming OrderService is a class or an object
        const orderService = /* ... */;
        const burgerService = new OrderServiceObjectAdapter(new ComboOrderService()); // Assuming ComboOrderService is an equivalent class
        burgerService.orderBurger(4);
    }
}

// Example class that might be adapted
class ComboOrderService {
    orderBurger(quantity) {
        console.log(`Ordering ${quantity} burgers.`);
    }
}

// Usage
Main.main();
