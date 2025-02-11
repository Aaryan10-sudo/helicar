import Booking from "../models/booking.model.js";
import PendingBooking from "../models/pendingBooking.model.js";
// Create and Save a new Booking

const createBooking = async (booking) => {
    try {
        return await Booking.create(booking);
    } catch (err) {
        throw err;
    }
};

const createPendingBooking = async (booking) => {
    try {
        return await PendingBooking.create(booking);
    } catch (err) {
        throw err;
    }
};

const getBookingByVerificationToken = async( verificationToken ) => {
    try {
        return await PendingBooking.findOne({ verificationToken });
    } catch (err) {
        throw err;
    }
};

const getAllBookings = async({page,limit,status,price}  ) => {
    try {
        let query = {};
        if(status) query.status = status;
        if(price) query.price = { $lte: price };
        const totalCount = await Booking.countDocuments(query);
        const bookings = await Booking.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit);
        const totalPages = totalCount/page;
        return { bookings, totalPages,page };
        
    } catch (error) {
        throw error;
        
    }

}

const getBookingById = async (bookingId)=>{
    try {
        return await Booking.findById(bookingId);
    } catch (error) {
        throw error;
    }
}

const deleteBooking = async (bookingId)=>{
    try {
        return await Booking.findByIdAndDelete(bookingId);
    } catch (error) {
        throw error;
    }
}
const changeStatus = async ({bookingId,status})=>{
    try {
        return await Booking.findByIdAndUpdate(bookingId, {status}, {new: true});
    } catch (error) {
        throw error;
    }
 }


export { createBooking, createPendingBooking, getBookingByVerificationToken, getAllBookings,getBookingById,deleteBooking,changeStatus};