const adminAuthenticator = async(req,res,next) => {
     try {
        const userAdmin = req.user[0].isAdmin;
        if(!userAdmin){
            res.status(400).json({message:"You are Unauthorized!"});
        }
        next();
     } catch (error) {
        res.status(400).json({message:"You are Unauthorized!"});
     }
}

module.exports = adminAuthenticator;