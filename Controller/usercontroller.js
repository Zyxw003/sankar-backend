import usermodel from "../models/usermodel.js";
import HandleError from "../Helper/handleError.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return next(new HandleError("name cannot be empty", 400));
    }

    if (!email) {
      return next(new HandleError("email cannot be empty", 400));
    }

    if (!password) {
      return next(new HandleError("password cannot be empty", 400));
    }

    const user = await usermodel.create({
      name,
      email,
      password,
      avatar: {
        public_id: "temp_id",
        url: "temp_url",
      },
    });

    const token = user.getJwtToken();

    res.status(201).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
  
};

export const loginuser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new HandleError("email or password cannot be empty", 400));
    }

    const user = await usermodel.findOne({ email }).select("+password");

    if (!user) {
      return next(new HandleError("invalid email or password", 401));
    }

    const ismatch = await user.comparePassword(password);

    if (!ismatch) {
      return next(new HandleError("invalid email or password", 401));
    }

    const token = user.getJwtToken();

    user.password = undefined;

    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};
