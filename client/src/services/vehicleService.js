import requests from "./httpService";

const vehicleServices = {
    getVehicles:async()=>{
        return requests.get('/vehicles');
    }
}

export default vehicleServices;