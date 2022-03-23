import { Sequelize } from "sequelize-typescript"
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import {v4 as uuid} from 'uuid';
import CustomerRepository from "./customer.repository";
import Address from "../../domain/entity/address";

describe("Customer repository test",()=>{

    let sequelize: Sequelize;

    beforeEach(async ()=>{
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    it("should create a Customer", async ()=>{
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

        const customerModel = await CustomerModel.findOne({where: {id: customer.id}});
        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            city: customer.address.city,
            street: customer.address.street,
            number: customer.address.number,
            zipcode: customer.address.zipcode,
            rewardPoints: customer.rewardPoints
        });
    });

    it("should update a Customer", async ()=>{
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

        const customerModel = await CustomerModel.findOne({where: {id: customer.id}});
        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: "Customer 1",
            active: customer.isActive(),
            city: customer.address.city,
            street: customer.address.street,
            number: customer.address.number,
            zipcode: customer.address.zipcode,
            rewardPoints: customer.rewardPoints
        });

        customer.changeName("Customer 2");

        await customerRepository.update(customer);

        const updatedCustomerModel = await CustomerModel.findOne({where: {id: customer.id}});

        expect(updatedCustomerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: "Customer 2",
            active: customer.isActive(),
            city: customer.address.city,
            street: customer.address.street,
            number: customer.address.number,
            zipcode: customer.address.zipcode,
            rewardPoints: customer.rewardPoints
        });
    });

    it("should find a Customer", async ()=>{
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

        const customerModel = await CustomerModel.findOne({where: {id: customer.id}});
        
        const foundCustomer = await customerRepository.find(customer.id);
        expect(customerModel.toJSON()).toStrictEqual({
            id: foundCustomer.id,
            name: foundCustomer.name,
            active: foundCustomer.isActive(),
            city: foundCustomer.address.city,
            street: foundCustomer.address.street,
            number: foundCustomer.address.number,
            zipcode: foundCustomer.address.zipcode,
            rewardPoints: foundCustomer.rewardPoints
        });
    });

    it("should thrown an error when customer is not found", async ()=>{
        const customerRepository = new CustomerRepository();

        expect(async()=>{
            await customerRepository.find("123ASD");
        }).rejects.toThrow("Customer not found.");
    });

    it("should find all Customers", async ()=>{
        const customerRepository = new CustomerRepository();

        const customer1 = new Customer(uuid(),"Customer 1");
        const address1 = new Address(
            "Rua teste",
            123,
            "88304401",
            "Itajai"
        );
        customer1.address=address1;
        await customerRepository.create(customer1);
        const customer2 = new Customer(uuid(),"Customer 2");
        const address2 = new Address(
            "Rua teste",
            123,
            "88304401",
            "Itajai"
        );
        customer2.address=address2;
        await customerRepository.create(customer2);

        const foundCustomers = await customerRepository.findAll();

        expect(foundCustomers).toHaveLength(2);
        expect(foundCustomers).toContainEqual(customer1);
        expect(foundCustomers).toContainEqual(customer2);
    });

    afterEach(async()=>{
        await sequelize.close();
    });
})