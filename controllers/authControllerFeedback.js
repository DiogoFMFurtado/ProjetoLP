const Feedback = require('../models/Feedback');
const User = require('../models/User');

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



