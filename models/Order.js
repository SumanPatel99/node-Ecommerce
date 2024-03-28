// Order.js
class Order {
    constructor(id, userId, products) {
        this.id = id;
        this.userId = userId;
        this.products = products;
        this.status = 'Pending'; // Assuming all orders start with a 'Pending' status
    }
}

module.exports = Order;
