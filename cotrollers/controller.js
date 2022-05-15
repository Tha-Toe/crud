const { json } = require("body-parser");
const Task = require("../models/Task");

const getAllTasks = async(req,res)=>{
    try {
        const task = await Task.find();
//        res.status(200).json({task});
        res.status(200).render("index",{
           title: task
        })
    } catch (err) {
        res.status(500).json({msg: err})
    }
}
const postTask = async(req,res)=>{
/*    try {
        const task = await Task.create(req.body.name);
        res.redirect([302],"/api/v1/tasks");
    } catch (err) {
        res.status(500).json({msg: err})
    }
*/      let name = await req.body.name;
        await Task.create({name})
        .then(console.log(req.body.name))
        .catch(err=> {
            console.log(err);
        })
        res.redirect(302,"/api/v1/tasks");
}
const getTask = async(req,res)=>{
    try {
        const { id:TaskId } = req.params;
        const task = await Task.findOne({_id:TaskId});
        if(!task) {
            return res.status(404).json({"Error":"Id not found"})
        }
        res.status(200).json({task});
    } catch (err) {
        res.status(500).json({msg: err})
    }
}
const updateTask = async(req,res)=>{
    
    let name = {name : await req.body.rename}
    const {id:TaskId} = await req.params;
    await Task.findOneAndUpdate({_id:TaskId},name,{
        new:true,
        runValidators: true,
    })
    .then(console.log(name))
    .catch(err=> {
        console.log(err);
    })
    res.redirect(302,"https://crudtestserver.herokuapp.com/api/v1/tasks");
/*
    try{
    
        const {id:TaskId} = req.params;
        const task = await Task.findOneAndUpdate({_id:TaskId},req.body.rename,{
            new:true,
            runValidators: true,
        })
        if(!task){
            return res.status(404).json({"Error": "Id not found"})
        }
    }catch(err){
        res.status(500).json({msg: err})
    }
*/

}
const deleteTask = async(req,res)=>{
    try{
        const { id:TaskId } = req.params;
        const task = await Task.findOneAndDelete({_id:TaskId});
        if(!task) {
            return res.status(404).json({"Error": "Id not found"})
        }
        res.redirect(302,"https://crudtestserver.herokuapp.com/api/v1/tasks");
    }catch (err){
        res.status(500).json({msg: err})
    }
}

const pageNotFound = (req,res)=>{
    res.status(404).send("404 Page Not Found");
}

module.exports = {
    getAllTasks,
    postTask,
    getTask,
    updateTask,
    deleteTask,
    pageNotFound
}