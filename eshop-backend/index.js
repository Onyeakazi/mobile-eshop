const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http"); 
const { Server } = require("socket.io"); 

const productsRouter = require("./routes/products.js");
const cartRouter = require("./routes/cart.js");
const reviewRoutes = require("./routes/reviews");
const ordersRouter = require("./routes/orders.js");

dotenv.config();

const app = express();

// CREATE HTTP SERVER
const server = http.createServer(app);

// INIT SOCKET.IO
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

// ROUTES (unchanged)
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/reviews", reviewRoutes);
app.use("/orders", ordersRouter);


// SOCKET.IO LOGIC
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // JOIN ROOM (USER OR ADMIN)
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log("JOIN ROOM:", room, socket.id);
  });

  // SEND MESSAGE
  socket.on("send_message", (data) => {
    console.log("BACKEND RECEIVED:", data);

    const { userId, message, sender } = data;

    if (!userId || !message) {
        console.log("INVALID MESSAGE");
        return;
    }

    const newMessage = {
        id: Date.now(),
        text: message,
        sender,
        userId, 
        time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        }),
    };

    console.log("SENDING TO ROOM:", userId);

    io.to(userId).emit("receive_message", newMessage);
    });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


// USE server.listen (NOT app.listen)
const PORT = process.env.PORT || 5000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});