const Feedback = require('../models/Feedback');
const User = require('../models/User');
var mongodb = require('mongodb');

exports.registerFeedbackHandle = async (req, res) => {
    
    const { name, feedback } = req.body;

    try {
        console.log(req.body);
        const feed = new Feedback({
            name,
            feedback
        });
        const user = await User.findById(req.user);
        feed.cliente = user;
        await feed.save();
        user.feedbacks.push(feed);
        await user.save();
        res.status(201).json()
        
    } catch (err) {}
}

//Funciona
exports.getFeedbacks = async(req, res) => {

    console.log("Getting all feedbacks...");
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json(feedbacks);
    } catch(err) {
        res.json({message:err});
    }
    console.log("Done!");
}


exports.getFeedBacksById = async(req,res) => {

    console.log("Getting feedbacks of client...");
    console.log(req.params, '1');

    try{
        console.log(req.params, '2');
        const userFeed = await User.findById(req.params).populate('feedbacks');
        console.log('Feedbacks User', userFeed);
        res.status(200).json(userFeed.feedbacks);
    }catch (err) {
        res.status(400).json({message:err});
    }

}


exports.deleteFeedback = async(req,res) => {

    console.log("Deleting Feedback..");
    console.log(req.params._id);
    try{
        
        const deletedFeed = await Feedback.deleteOne({_id: req.params._id});
        console.log(req.body);
        res.status(200).json(deletedFeed);
        console.log("Feedback Deleted");

    }catch(err) {
        res.status(400).json({message: err});
    }

}