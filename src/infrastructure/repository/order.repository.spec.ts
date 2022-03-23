import { Sequelize } from "sequelize-typescript"
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/orderItem";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import {v4 as uuid} from 'uuid';
import OrderRepository from "./order.repository";
import Address from "../../domain/entity/address";
import ProductModel from "../db/sequelize/model/product.model";
import Customer from "../../domain/entity/customer";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import CustomerRepository from "./customer.repository";
import CustomerModel from "../db/sequelize/model/customer.model";

describe("Order repository test",()=>{

    let sequelize: Sequelize;

    beforeEach(async ()=>{
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([
            CustomerModel,
            ProductModel,
            OrderModel,
            OrderItemModel
        ]);
        await sequelize.sync();
    });

    afterEach(async()=>{
        await sequelize.close();
    });

    it("should create an Order", async ()=>{
        const customerRepository = new CustomerRepository();

        const customer = new Customer(uuid(),"Customer 1");
        const address = new Address(
            "Rua teste",
            123,
            "88304401",
            "Itajai"
        );
        customer.address=address;

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product(uuid(),"Produto 1",10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            uuid(),
            product.price,
            product.id,
            3
        );

        const order = new Order(
            uuid(),
            customer.id,
            [orderItem]
        );

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id},
            include: ["itens"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            itens: [{
                id: orderItem.id,
                product_id: orderItem.productId,
                quantity: orderItem.quantity,
                price: orderItem.price,
                order_id: order.id
            }]
        });
    });

    it("should update an Order", async ()=>{
        const customerRepository = new CustomerRepository();

        const customer = new Customer(uuid(),"Customer 1");
        const address = new Address(
            "Rua teste",
            123,
            "88304401",
            "Itajai"
        );
        customer.address=address;

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product(uuid(),"Produto 1",10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            uuid(),
            product.price,
            product.id,
            3
        );

        const order = new Order(
            uuid(),
            customer.id,
            [orderItem]
        );

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id},
            include: ["itens"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            itens: [{
                id: orderItem.id,
                product_id: orderItem.productId,
                quantity: orderItem.quantity,
                price: orderItem.price,
                order_id: order.id
            }]
        });

        const customer2 = new Customer(uuid(),"Customer 2");
        const address2 = new Address(
            "Rua teste",
            123,
            "88304401",
            "Itajai"
        );
        customer2.address=address2;

        await customerRepository.create(customer2);
        order.changeCustomer(customer2.id);

        await orderRepository.update(order);

        const orderModelUpdated = await OrderModel.findOne({
            where: { id: order.id},
            include: ["itens"]
        });

        expect(orderModelUpdated.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer2.id,
            total: order.total(),
            itens: [{
                id: orderItem.id,
                product_id: orderItem.productId,
                quantity: orderItem.quantity,
                price: orderItem.price,
                order_id: order.id
            }]
        });
    });

    it("should find an Order", async ()=>{
        const customerRepository = new CustomerRepository();

        const customer = new Customer(uuid(),"Customer 1");
        const address = new Address(
            "Rua teste",
            123,
            "88304401",
            "Itajai"
        );
        customer.address=address;

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product(uuid(),"Produto 1",10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            uuid(),
            product.price,
            product.id,
            3
        );

        const order = new Order(
            uuid(),
            customer.id,
            [orderItem]
        );

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id},
            include: ["itens"]
        });
        
        const foundOrder = await orderRepository.find(order.id);
        
        expect(orderModel.toJSON()).toStrictEqual({
            id: foundOrder.id,
            customer_id: foundOrder.customerId,
            total: foundOrder.total(),
            itens: [{
                id: orderItem.id,
                product_id: orderItem.productId,
                quantity: orderItem.quantity,
                price: orderItem.price,
                order_id: foundOrder.id
            }]
        });
    });

    it("should find all Orders", async ()=>{
        const customerRepository = new CustomerRepository();

        const customer = new Customer(uuid(),"Customer 1");
        const address = new Address(
            "Rua teste",
            123,
            "88304401",
            "Itajai"
        );
        customer.address=address;

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product(uuid(),"Produto 1",10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            uuid(),
            product.price,
            product.id,
            3
        );

        const order = new Order(
            uuid(),
            customer.id,
            [orderItem]
        );
        
        const customer2 = new Customer(uuid(),"Customer 2");
        customer2.address=address;

        await customerRepository.create(customer2);

        const product2 = new Product(uuid(),"Produto 2",20);
        await productRepository.create(product2);

        const orderItem2 = new OrderItem(
            uuid(),
            product2.price,
            product2.id,
            5
        );

        const order2 = new Order(
            uuid(),
            customer2.id,
            [orderItem2]
        );

        const orderItem3 = new OrderItem(
            uuid(),
            product.price,
            product.id,
            1
        );

        const orderItem4 = new OrderItem(
            uuid(),
            product2.price,
            product2.id,
            2
        );

        const order3 = new Order(
            uuid(),
            customer.id,
            [orderItem3,orderItem4]
        );
        

        const orderRepository = new OrderRepository();

        await orderRepository.create(order);
        await orderRepository.create(order2);
        await orderRepository.create(order3);

        const foundOrders = await orderRepository.findAll();

        expect(foundOrders).toHaveLength(3);
        expect(foundOrders).toContainEqual(order);
        expect(foundOrders).toContainEqual(order2);
        expect(foundOrders).toContainEqual(order3);
    });
})