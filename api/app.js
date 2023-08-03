const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

require("./config/mongo.config");
const routes = require("./routes");
const events = require("./events/index");

app.use(events);

app.use('/assets', express.static(process.cwd()+"/uploads"));

app.use('/uploads', express.static('/uploads'));

app.set('view engine', 'pug');
app.set('views', process.cwd()+"/views");

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))

app.use("/api/v1",  routes);

app.use((req,res,next) => {
    next({
        status: 404,
        msg: "Not found"
    })
})

// Error handling Middleware
app.use((err, req, res, next) => {
    console.log(err);
    let status_code = err?.status || 500;
    let msg = err?.msg || "Error";

    res.status(status_code).json({
        result: null,
        status: false,
        msg: msg
    });
    /**
     * {
     *      result: null,
     *      status: false, 
     *      msg: {
     *              'title': "Title is required"
     *      }
     * }
     * 
     * 
     */
});

app.set("PORT", 3002);

app.listen(app.get('PORT'), "localhost", (err) => {
    if(err){
        console.log("Server connection error");
    } else {
        console.log("Server is listening to port: 3002")
        console.log("Press CTRL+C to end server connection.")
    }
});

    // Request 
//  =================>
//Route =====Middleware======> Action <=============> Data 
// <====================
//      Response 
//                  View / Response 