import { Sequelize } from "sequelize-typescript"
import Product from "../../domain/entity/product";
import ProductModel from "../db/sequelize/model/product.model";
import {v4 as uuid} from 'uuid';
import ProductRepository from "./product.repository";

describe("Product repository test",()=>{

    let sequelize: Sequelize;

    beforeEach(async ()=>{
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async()=>{
        await sequelize.close();
    });

    it("should create a Product", async ()=>{
        const productRepository = new ProductRepository();

        const product = new Product(uuid(),"Product 1",10);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id: product.id}});
        expect(productModel.toJSON()).toStrictEqual({
            id: product.id,
            name: product.name,
            price: product.price
        });
    });

    it("should update a Product", async ()=>{
        const productRepository = new ProductRepository();

        const product = new Product(uuid(),"Product 1",10);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id: product.id}});
        expect(productModel.toJSON()).toStrictEqual({
            id: product.id,
            name: "Product 1",
            price: 10
        });

        product.changeName("Product 2");
        product.changePrice(20);

        await productRepository.update(product);

        const updatedProductModel = await ProductModel.findOne({where: {id: product.id}});

        expect(updatedProductModel.toJSON()).toStrictEqual({
            id: product.id,
            name: "Product 2",
            price: 20
        });
    });

    it("should find a Product", async ()=>{
        const productRepository = new ProductRepository();

        const product = new Product(uuid(),"Product 1",10);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id: product.id}});
        
        const foundProduct = await productRepository.find(product.id);
        expect(productModel.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price
        });
    });

    it("should find all Products", async ()=>{
        const productRepository = new ProductRepository();

        const product1 = new Product(uuid(),"Product 1",10);
        await productRepository.create(product1);
        const product2 = new Product(uuid(),"Product 2",20);
        await productRepository.create(product2);

        const foundProducts = await productRepository.findAll();
        const products = [product1,product2];

        expect(products).toEqual(foundProducts);
    });
})