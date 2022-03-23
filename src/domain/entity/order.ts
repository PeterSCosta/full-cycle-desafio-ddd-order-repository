import OrderItem from "./orderItem";

export default class Order{
    private _id:string;
    private _customerId:string;
    private _itens: OrderItem[];
    private _total: number;

    constructor(
        id:string,
        custormerId:string,
        itens: OrderItem[]
    ){
        this._id=id;
        this._customerId=custormerId;
        this._itens=itens;
        this._total=this.total();

        this.validate();
    }

    get id():string{
        return this._id;
    }

    get customerId():string{
        return this._customerId;
    }

    get itens():OrderItem[]{
        return this._itens;
    }

    changeCustomer(customerId:string){
        this._customerId=customerId;
    }

    validate(){
        if(this._id.length === 0)
        {
            throw new Error("Id is required.");
        }
        if(this._customerId.length === 0)
        {
            throw new Error("CustomerId is required.");
        }
        if(this._itens.length === 0)
        {
            throw new Error("Itens are required.");
        }
    }

    total():number{
        return this._itens.reduce((acc,item)=> acc+item.total,0);
    }
}