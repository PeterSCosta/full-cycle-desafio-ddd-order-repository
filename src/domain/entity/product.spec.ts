import Order from "./order";
import OrderItem from "./orderItem";
import Product from "./product";

describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(()=>{
            let product = new Product("","",0)
        }).toThrowError("Id is required.");
    });

    it("should throw error when name is empty", () => {
        expect(()=>{
            let product = new Product("i1","",0)
        }).toThrowError("Name is required.");
    });

    it("should throw error when price is not grather than 0", () => {
        expect(()=>{
            let product = new Product("i1","Item 1",0)
        }).toThrowError("Price must be greather than 0.");
    });
});