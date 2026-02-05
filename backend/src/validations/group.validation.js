/** Validation for Creating Group */

function validateGroup(data){
    const {name,type, contribution_amount, max_members} = data;

    if(!name || !type || !contribution_amount || !max_members ) {
        return "missing fields required!";
    }

    if(!["public","private"].includes(type)){
        return "invalid group type";
    }

    if (max_members < 5 || max_members > 100){
        return "Group size must be between 5 and 100";
    }

    return null;

}

module.exports = {validateGroup};