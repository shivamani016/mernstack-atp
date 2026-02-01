
const order = {
    orderId: "ORD1001",
    customer: {
        name: "Anita",
        address: {
            city: "Hyderabad",
            pincode: 500085
        }
    },
    items: [
        { product: "Laptop", price: 70000 }]
    };
    
    //Create a deep copy of order
    ordercopy=structuredClone(order)

    //Modify in copied object:
        //i. customer.address.city
        ordercopy.customer.address.city="Secundrabad"

        //ii. items[0].price
        ordercopy.items[0].price=50000

        //iii. Verify original object remains unchanged
        console.log(order)
        console.log(ordercopy)

        //Yes the original object remains unchanged as the structuredclone creates the nested objects its own reference.
