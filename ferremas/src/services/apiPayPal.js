export const apiCreateOrderPaypal = async (data = {}) => {
    try {
        console.log("Sending request to create order...");
        const response = await fetch('http://127.0.0.1:8000/api/orders', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const order = await response.json();
        console.log("Order created:", order);
        return order.id;
    } catch (error) {
        console.error("Failed to create order", error);
        throw error;
    }
};

export const apiOnApprovePaypal = async (orderID) => {
    try {
        console.log("Sending request to capture order...");
        const response = await fetch(`http://127.0.0.1:8000/api/orders/${orderID}/capture`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ 'orderID': orderID })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const details = await response.json();
        console.log("Order captured:", details);
        return details;
    } catch (error) {
        console.error("Failed to capture order", error);
        throw error; 
    }
};
