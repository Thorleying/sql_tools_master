const express=require('express');
const app=express()
const port=4512;
const cors=require('cors')
const useFieldRouter=require('./router/field')
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use('/api',useFieldRouter)
app.listen(port, () => {
    console.log(`端口号为 http://localhost:${port}`)
})
