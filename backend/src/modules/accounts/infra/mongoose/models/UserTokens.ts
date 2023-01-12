import { mongoose } from "../../../../../database/index";

const UserTokensSchema = new mongoose.Schema({
    refresh_token: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    expires_date: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const UserTokens = mongoose.model("UserTokens", UserTokensSchema)

export { UserTokens }