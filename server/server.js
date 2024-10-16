import express from "express"
import "dotenv/config.js"
import cors from "cors"
import connectDB from "./db/db.config.js"
const app = express()
const port = process.env.PORT || 5001;


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors());



// routes
import authroute from "./routes/auth/authroute.js"


app.use("/api/auth",authroute)






connectDB().then(() => {
    
    app.listen(port, () => {
        console.log(`i am listening on ${port}`)
    })
    
})

