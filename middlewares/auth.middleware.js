import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export function authenticateUser(req, _, next) {
  console.log("Auth Middleware() called ✅");
  const { token } = req.cookies;
  if (!token) {
    // ✅ Forward the error instead of throwing directly
    return next(new UnauthenticatedError("Authentication-Invalid!"));
  }
  if (!token) throw new UnauthenticatedError("Authentication-Invalid!");
  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === "68063d0d2e35142b93285da5";
    req.user = { userId, role, testUser };
    next();
  } catch (err) {
    console.log(err.message);
    throw new UnauthenticatedError("Authentication-Invalid!");
  }
}

export function authorizePermissions(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized Access | Access Denied!");
    }
    next();
  };
}

//test users:
export function checkForTestUser(req, res, next) {
  if (req.user.testUser) {
    throw new BadRequestError("Demo User. READ ONLY ⚠️");
  }
  next();
}
