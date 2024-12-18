import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { loginService, signupService } from "./user.service";

export const signup = catchAsync(async(req, res) => {
    
    const result = await signupService(req.body);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'User created successfully',
        data: result
    })
})

export const login = catchAsync(async(req, res) => {
    const { email, password } = req.body;
    const result = await loginService(email, password);

    res.status(200).json({
        success: true,
        statusCode: StatusCodes.OK,
        message: 'User logged in successfully',
        token: result.token,
        data: result.user
    })
})