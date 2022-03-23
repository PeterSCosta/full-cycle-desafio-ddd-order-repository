import OrderService from "./order.service";
import Order from "../entity/order";
import OrderItem from "../entity/orderItem";
import Customer from "../entity/customer";

describe("Order service unit tests",()=>{

    it("should get total of all orders",()=>{

        const orderItem1 = new OrderItem("o1",10,"p1",2);
        const orderItem2 = new OrderItem("o2",20,"p2",4);

        const order1 = new Order("o1","c1",[orderItem1]);
        const order2 = new Order("o2","c2",[orderItem2]);

        const total = OrderService.total([order1,order2]);

        expect(total).toBe(100);
    });

    it("should place an order",()=>{

        const customer = new Customer("c1","Cliente 1");

        const orderItem1 = new OrderItem("i1",10,"p1",2);
        const orderItem2 = new OrderItem("i2",20,"p2",4);

        const order = OrderService.placeOrder(customer,[orderItem1,orderItem2]);

        expect(customer.rewardPoints).toBe(50);

        expect(order.total()).toBe(100);
    });

})