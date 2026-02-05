/** Contribution Model - this represents a user's contribution in a group */

const ContributionModel ={
    id: "UUID",
    user_id:"UUID",
    group_id:"UUID",
    amount: "number",
    round_number: " number",
    stauts: "pending | completed | missed ",
    created_at: "timestamp",
};

module.exports = ContributionModel;