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
        user.feedCliente.push(feed);
        await user.save();
        res.status(201).json()
        
    } catch (err) {}
}

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

exports.deleteFeedback = async(req, res) => {
    console.log("teste");
    db.collection('posts', function(err, collection) {
        collection.deleteOne({_id: new mongodb.ObjectID('userId')},
            function(err, results) {
                if (err){
                    console.log("failed");
                    throw err;
                }
                console.log("success");
            }
        );
     });
    //const userId = req.body.userId || req.query.userId;
    //FeedbackSchema.remove({userId},
    /*FeedbackSchema.deleteOne({_id: new mongodb.ObjectID('userId')}, 
        function(err, res) {
            if (err) {
                res.json({"err": err});
            } else {
                res.json({success: true});
            };
        }
    );*/
}