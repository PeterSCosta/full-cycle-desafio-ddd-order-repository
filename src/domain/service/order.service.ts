import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/orderItem";
import {v4 as uuid} from 'uuid';

export default class OrderService{

    static total(
        orders: Order[]
    ):number{
        return orders.reduce((acc,order)=>acc+order.total(),0);
    };

    static placeOrder(
        customer: Customer,
        itens: OrderItem[]
    ):Order{
        
        var order = new Order(uuid(),customer.id,itens);
        customer.reward(order.total());

        return order;
    }
}