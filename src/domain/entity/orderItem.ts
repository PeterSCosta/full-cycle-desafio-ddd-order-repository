export default class OrderItem {
    private _id:string;
    private _price:number;
    private _productId:string;
    private _quantity:number;

    constructor(
        id:string,
        price:number,
        productId:string,
        quantity:number
    ){
        this._id=id;
        this._productId=productId;
        this._price=price;
        this._quantity=quantity;

        this.validate();
    }

    validate(){
        if(this._id.length === 0)
        {
            throw new Error("Id is required.");
        }
        if(this._productId.length === 0)
        {
            throw new Error("ProductId is required.");
        }
        if(this._price <= 0)
        {
            throw new Error("Price must be greather than 0.");
        }
        if(this._quantity <= 0)
        {
            throw new Error("Quantity must be greather than 0.");
        }
    }

    get id():string{
        return this._id;
    }

    get productId():string{
        return this._productId;
    }

    get quantity():number{
        return this._quantity;
    }

    get price():number{
        return this._price;
    }

    get total():number{
        return this._price * this._quantity;
    }
}