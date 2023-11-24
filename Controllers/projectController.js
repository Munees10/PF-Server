const projects = require('../Models/projectSchema')

//add project
exports.addProjects = async (req,res)=>{
    console.log("inside add project function");
    const {title,langauges,overview,github,website} = req.body
    const projectImage = req.file.filename
    const userId = req.payload
    // console.log(`${title},${langauges},${overview},${github},${website},${projectImage},${userId}`);
    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("project already exists!!!")
        }else{
            const newProject = new projects({
                title,langauges,overview,github,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }

    }catch(err){
        res.status(401).json(`Request failed, Error:${err}`)
    }
    
}

//get user projects - token required
exports.allUserProjects = async (req,res) =>{
    const userId = req.payload
    try {
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

//get all projects - token required
exports.getallProjects = async (req,res)=>{
    const searchKey = req.query.search
    const query = {
        langauges:{$regex:searchKey , $options:"i"}
    }
    
    try {
        const allprojects = await projects.find(query)
        res.status(200).json(allprojects)
    } catch (err) {
        res.status(401).json(err)
    }
} 

//get home projects
exports.getHomeProjects = async (req,res)=>{
    try {
        const homeprojects = await projects.find().limit(3)
        res.status(200).json(homeprojects)
    } catch (err) {
        res.status(401).json(err)
    }
}