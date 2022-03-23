import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        
        expect(()=>{
            let customer = new Customer("","John");
        }).toThrowError("Id is required.");

    });

    it("should throw error when name is empty", () => {
        
        expect(()=>{
            let customer = new Customer("1","");
        }).toThrowError("Name is required.");

    });

    it("should change name", () => {
        const customer = new Customer("1","John");
        customer.changeName("John2");

        expect(customer.name).toBe("John2");
    });

    it("should activate customer", () => {
        const customer = new Customer("1","John");
        const address = new Address("Street",123,"88304401","Itajai");
        customer.address=address;

        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("should throw error when activate and address is undefined", () => {
        expect(()=>{
            const customer = new Customer("1","John");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer.");
    });

    it("should deactivate customer", () => {
        const customer = new Customer("1","John");

        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });

    it("should reward customer", () => {
        const customer = new Customer("1","John");
        expect(customer.rewardPoints).toBe(0);

        customer.reward(10);
        expect(customer.rewardPoints).toBe(5);

        customer.reward(20);
        expect(customer.rewardPoints).toBe(15);
    });
});