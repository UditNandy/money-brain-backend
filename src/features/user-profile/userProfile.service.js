const addUserProfileData = async (userData) => {
    if(!userData || !userData.name)
    {
        throw new ApiError("Name is required", 400);
    }
    try {
        const result = await addUserProfileDetailsQuery(userData);
    }
    catch(err)
    {
        
    }
}