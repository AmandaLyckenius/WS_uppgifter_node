import express from "express"
import type {Request, Response} from "express"
import "dotenv/config"
import {closeDB, runDB} from "./database/database.js"
import type {User} from "./types/User.js"


const app = express()
const port: number = 3000



app.get("/:id", (req: Request, res: Response) => {
    const id: number = Number(req.params.id)

    if (isNaN(id)){
        res.status(400).send("not a number")
        return
    }
    
    res.send({ id: id })

})

app.post("/user", (req:Request, res: Response) => {
    const newUser: User = {
        name: "Amanda",
        id: 2
    }

    res.status(201).send(newUser)
})


async function startServer() {
    try {
        await runDB()
        app.listen(port, () => {
            console.log("listening on port: " + port)
            console.log(`Start the app: http://localhost:${port}`)
        })
        process.on("SIGINT", async () => {
            console.log("cleaning up..")
            await closeDB()
            process.exit(0)
        })
        
    } catch (error) {
        console.log(error)
    }
}

startServer()

/*
app.get("/", (req,res) => {
    res.status(200).send({ message: "Hello world!" })
})
*/