const express = require('express')
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const app = express();



app.use(express.json())
app.use(cors());



const quotesRouter = require("./routes/quotesRoutes")

app.use("/quotes", quotesRouter)

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});
