const router= require("express").Router()
const Category= require("../models/category.js")


//post request
 
router.post('/categories',async(req,res)=>{
    try{
        const category = new Category()

        console.log(category)

        category.type = req.body.type

        console.log(req.body)


        await category.save()

        res.json({
            success:true,
            message:"successfuly created"
        })
    }catch(err){

        res.status(500).json({
            success: false,
            message:err.messager
        })

    }

})

// Get request

router.get("/categories", async(req,res)=>{
    try{
        let categories = await Category.find()
        res.json({
            success:true,
            categories: categories
        })
    } catch(err){

        res.status(500).json({
            success: false,
            message:err.messager
        })

    }


    
})

module.exports = router