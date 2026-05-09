const { addUserProfileDetailsQuery } = require("./userProfile.query");

const addUserProfile = async (req, res,next) => {

  try {
    const userData = req.body;
    await addUserProfileDetailsQuery({...userData,userId:req.user.id});


    return res.json({ message: "Working" });
  }
  catch (err) {
    console.log("err", err)
    next(err)
  }
};


module.exports = { addUserProfile }