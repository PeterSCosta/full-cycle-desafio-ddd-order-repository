import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface{

    async create(entity: Customer): Promise<void> {
        try{
            await CustomerModel.create({
                id: entity.id,
                name: entity.name,
                street: entity.address.street,
                number: entity.address.number,
                zipcode: entity.address.zipcode,
                city: entity.address.city,
                active: entity.isActive(),
                rewardPoints: entity.rewardPoints
            });
        }
        catch(error){
            throw new Error("Customer couldnt be created."+error);
        }
    }

    async update(entity: Customer): Promise<void> {
        try{
            await CustomerModel.update({
                name: entity.name,
                street: entity.address.street,
                number: entity.address.number,
                zipcode: entity.address.zipcode,
                city: entity.address.city,
                active: entity.isActive(),
                rewardPoints: entity.rewardPoints
            },
            {
                where:{
                    id: entity.id
                }
            });
        }
        catch(error){
            throw new Error("Customer couldnt be updated."+error);
        }
    }

    async find(id: string): Promise<Customer> {
        let customerModel;

        try{
        customerModel = await CustomerModel.findOne({
            where:{
                id: id
            },
            rejectOnEmpty: true,
        });
        } catch(error){
            throw new Error("Customer not found.");
        }

        const address = new Address(
            customerModel.street,
            customerModel.number,
            customerModel.zipcode,
            customerModel.city
        );

        const customer = new Customer(
            customerModel.id,
            customerModel.name
        );

        customer.address=address;

        return customer;
    }

    async findAll(): Promise<Customer[]> {
        let customerModels
        try{
            customerModels = await CustomerModel.findAll();
        }
        catch(error){
            throw new Error("Customer not found."+error);
        }
        return customerModels.map((customerModel) => {
            const address = new Address(
                customerModel.street,
                customerModel.number,
                customerModel.zipcode,
                customerModel.city
            );
            const customer = new Customer(
                customerModel.id,
                customerModel.name
            );

            customer.address = address;

            return customer;
        });
    }
}