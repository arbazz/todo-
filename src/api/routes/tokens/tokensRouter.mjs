import { Router } from "express";
import tokensController from "../../../controllers/tokens/tokensController.mjs";

const TokensRouter = Router();

const path = "/tokens";

TokensRouter.post(`${path}`,tokensController.createTokens);



export { TokensRouter };
