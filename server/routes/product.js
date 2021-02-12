const router= require('express').Router()
const Product=require('../models/product')
const cloudinary=require('../middelwares/cloudinary.js')
const upload= require("../middelwares/multer.js")




//post request create new product
router.post('/products',upload.single("image"),async(req,res)=>{
    try{

      const result = await cloudinary.uploader.upload(req.file.path)
    console.log(result)
     


    let product= new Product()
        product.title=req.body.title
        product.description=req.body.description
        product.avatar=result.secure_url
        product.photo=result.public_id
        product.stockQuantity=req.body.stockQuantity
        product.price=req.body.price

        await product.save()

        res.json({
           product
        })



    }catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        })

    }
})


//get request get all products
router.get("/products", async(req,res)=>{
    try{
        let products = await Product.find()
        res.json({
            success:true,
            products: products
        })
    } catch(err){

        res.status(500).json({
            success: false,
            message:err.messager
        })

    }


    
})


//get request get a single product
router.get("/products/:id", async(req,res)=>{
    try{
        let product = await Product.findOne({_id : req.params.id})
        res.json({
            success:true,
            product: product
        })
    } catch(err){

        res.status(500).json({
            success: false,
            message:err.messager
        })

    }


    
})



// put request  update single product

router.put("products/:id", /*upload.single("image"),*/async (req,res) => {
    try{
        let product = await Product.findById(req.params.id)
      // console.log(product)
        //await cloudinary.uploader.destroy(product.photo)
       // const result =await cloudinary.uploader.upload(req.file.path)
       
        const data ={
            title: req.body.title,
            description: req.body.description,
          //  avatar: result.secure_url,
          //  photo: result.public_id,
            stockQuantity: req.body.stockQuantity,
            price: req.body.price,
            owner: req.body.ownerID,
            category: req.body.categoryID 

        }
          console.log(data)

        product = await Product.findByIdAndUpdate(req.params.id, data)
        res.json(product)
    }catch(err){
        console.log(err)
    }

})





// delete request  delete single product

router.delete("/products/:id",async (req,res)=>{
    try{
        let product = await Product.findById(req.params.id)

        await cloudinary.uploader.destroy(product.photo)

        await product.remove()

        res.json(product)
    } catch(err){
        console.log(err)
    }
} )



module.exports=router