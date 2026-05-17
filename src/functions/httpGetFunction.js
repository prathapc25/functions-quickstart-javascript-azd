module.exports = async function (context, req) {
    const path = (req.url || '').toLowerCase();
    const method = req.method;

    context.log(`Mock request: ${method} ${path}`);

    if (path.includes("/users/v1/get-user")) {
        const id = path.split('/').pop() || "unknown";
        context.res = {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: { id: id, name: "John Doe", email: "john.doe@example.com" }
        };
    }
    else if (path.includes("/orders/v1/create-order") && method === "POST") {
        context.res = {
            status: 201,
            headers: { "Content-Type": "application/json" },
            body: { orderId: "ORD-" + Math.random().toString(36).substring(2,10).toUpperCase(), status: "created" }
        };
    }
    else {
        context.res = {
            status: 404,
            body: { error: "Mock not found", path: path }
        };
    }
};
