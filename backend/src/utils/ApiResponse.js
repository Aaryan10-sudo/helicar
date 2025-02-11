class ApiResponse {
    constructor(
        message = "Operation successful",
        data = null
    ) {
        this.message = message;
        this.data = data;
        this.success = true;
    }
}

export { ApiResponse };
