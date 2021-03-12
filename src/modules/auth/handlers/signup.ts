import { Request, Response } from "express";
import { ApiError } from "../../../utils/types";
import { newResponse } from "../../../utils/utils";
import { SignupInput } from "../models/user";

/**
 * 
 * @param req `{ username, password } = req.body`
 * @param res 
 */
const signup = (req: Request, res: Response) => {
    const userInput = new SignupInput(req.body)
    if (!userInput.isValid()) {
        res.json(newResponse(null, ApiError.incompleteSignupData))
        return
    }

    const user = userInput.toUserModel()
    user?.save().then(savedUser => {
        res.json(newResponse(savedUser, null))
    }).catch(error => {
        console.log('[DB ERROR]', error)
        res.json(newResponse(null, ApiError.serverError))
    })
}

export default signup
