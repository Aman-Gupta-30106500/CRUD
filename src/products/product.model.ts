import * as mongoose from 'mongoose'


export const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true}
})

export interface Product{

    id: String;
    title: String;
    description: String; 
    price: number;
    
}