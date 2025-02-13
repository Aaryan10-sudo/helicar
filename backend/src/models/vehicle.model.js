import mongoose, { Schema } from 'mongoose';

const vehicleSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    type:{
        type: Schema.ObjectId,
        ref: "VehicleType",
        required: true
    },
    category:{
        type:Schema.ObjectId,
        ref: "Category",
        required: true
    },
    capacity:{
        passengers:{
            type: Number,
            required: true
        },
        luggage:{
            type: Number,
            required: true
        }
    },
    transmission:{
        type: String,
        required: true
    },
    doors:{
        type: Number,
        required: true
    },
    pricing: {
        perDay: {
            type: Number,
            required: true,
            min: 1 
        },
        seasonalDiscounts: [
            {
                season: {
                    type: String,
                    required: true,
                    enum: ["Winter", "Summer", "Monsoon", "Spring", "Autumn"] 
                },
                discountPercentage: {
                    type: Number,
                    required: true,
                    min: 0, 
                    max: 100 
                }
            }
        ]
    },
    locationCovered:[
        {
            type: String,
        }
    ],
    features:{
        audioDevice:{
            type: Boolean,
            required: true
        },
        blutooth:{
            type: Boolean,
            required: true
        },
        ac:{
            type: Boolean,
            required: true
        },
        insurance:{
            type: Boolean,
            required: true
        },
        selfDrive:{
            type: Boolean,
            required: true
        },
        smoking:{
            type: Boolean,
            required: true
        },
    },
    imageUrl:{
        type: String,
    }
    
},{
    timestamps: true
})

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;