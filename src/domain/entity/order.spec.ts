import Order from "./order";
import OrderItem from "./orderItem";

describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(()=>{
            let order = new Order("","",[])
        }).toThrowError("Id is required.");

    });

    it("should throw error when customerId is empty", () => {
        
        expect(()=>{
            let order = new Order("123","",[])
        }).toThrowError("CustomerId is required.");

    });

    it("should throw error when there are no itens", () => {
        
        expect(()=>{
            let order = new Order("123","1",[])
        }).toThrowError("Itens are required.");

    });

    it("should calculate total", () => {
        
        const item1 = new OrderItem("i1",10,"p1",2);
        const item2 = new OrderItem("i2",15,"p2",3);

        const order = new Order("123","1",[item1,item2]);

        expect(order.total()).toBe(65);
    });

    it("should throw error when Price is not grather than 0", () => {
        expect(()=>{
            const item1 = new OrderItem("i1",-1,"p1",1);
        }).toThrowError("Price must be greather than 0.");
    });

    it("should throw error when Price is not grather than 0", () => {
        expect(()=>{
            const item1 = new OrderItem("i1",0,"p1",1);
        }).toThrowError("Price must be greather than 0.");
    });

    it("should throw error when Quantity is not grather than 0", () => {
        expect(()=>{
            const item1 = new OrderItem("i1",10,"p1",0);
        }).toThrowError("Quantity must be greather than 0.");
    });
});