import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose/dist/common";
import { Model } from "mongoose";
import { Product } from "./product.model";

@Injectable()
export class ProductsService{

    
    private products: Product[] = [];
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>)
    {}
    

    async insertProduct(title: String, desc: String, price: number){
        const prodId = Math.random().toString();
        const newProduct = new this.productModel({
            title,
            description: desc,
            price
        })

        const result = await newProduct.save();
        console.log(result)
        return "prodId"
    }

    getProducts(){
        return [...this.products];
    }

    getSingleProduct(productId: String)
    {
        const product = this.findProduct(productId)[0]
        return {...product}
    }

    updateProduct(productId: String, title: String, desc: String, price: number)
    {
        const [product, index] = this.findProduct(productId)
        const updatedProduct = {...product}

        if(title)
            updatedProduct.title = title
        if(desc)
            updatedProduct.description = desc
        if(price)
            updatedProduct.price = price

        this.products[index] = updatedProduct
        
    }

    deleteProduct(prodId: String)
    {
        const index = this.findProduct(prodId)[1]
        this.products.splice(index, 1);
    }

    private findProduct(id: String): [Product, number]
    {
        const productIndex = this.products.findIndex(prod => prod.id === id)
        const product = this.products[productIndex]
        if(!product)
            throw new NotFoundException('Could not find product!');
        return [product, productIndex]
    }
}