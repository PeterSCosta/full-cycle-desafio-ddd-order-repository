import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/orderItem";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface{

    async create(entity: Order): Promise<void> {
        try{
            await OrderModel.create({
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                itens: entity.itens.map((item)=>({
                    id: item.id,
                    price: item.price,
                    quantity: item.quantity,
                    product_id: item.productId
                }))
            },
            {
                include: [{model: OrderItemModel}],
            });
        }
        catch(error){
            throw new Error("Order couldnt be created."+error);
        }
    }

    async update(entity: Order): Promise<void> {
        try{
            await OrderModel.update({
                customer_id: entity.customerId,
                total: entity.total(),
                itens: entity.itens.map((item)=>({
                    id: item.id,
                    price: item.price,
                    quantity: item.quantity,
                    product_id: item.productId
                }))
            },
            {
                where: { id: entity.id },
            });
        }
        catch(error){
            throw new Error("Order couldnt be updated."+error);
        }

    }

    async find(id: string): Promise<Order> {
        let orderModel;

        try{
            orderModel = await OrderModel.findOne({
                where:{
                    id: id
                },
                rejectOnEmpty: true,
                include: [{model: OrderItemModel}],
            });
        } catch(error){
                throw new Error("Order not found.");
        }

        const order = new Order(
            orderModel.id,
            orderModel.customer_id,
            orderModel.itens.map((item)=>
                new OrderItem(
                    item.id,
                    item.price,
                    item.product_id,
                    item.quantity,
                )
            )
        );

        return order;
    }

    async findAll(): Promise<Order[]> {
        let orderModels;

        try{
            orderModels = await OrderModel.findAll({
                include: [{model: OrderItemModel}],
            });
        } catch(error){
                throw new Error("Order not found.");
        }

        const orders =
            orderModels.map((order)=>
                new Order(
                    order.id,
                    order.customer_id,
                    order.itens.map((item)=>
                        new OrderItem(
                            item.id,
                            item.price,
                            item.product_id,
                            item.quantity,
                        )
                    )
                )
            );

        return orders;
    }
}