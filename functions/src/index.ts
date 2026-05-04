import { onRequest } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import { SubscriptionServices } from "./services/subscription"; // adjust path

export const checkSubscriptionFn = onRequest(async (req, res) => {
  try {
    if (req.method !== "POST") {
      res.status(405).json({
        success: false,
        message: "Method Not Allowed",
      });
      return; // ✅ important
    }

    const payload = req.body;

    if (!payload?.purchaseToken) {
      res.status(400).json({
        success: false,
        message: "purchaseToken is required",
      });
      return; // ✅ important
    }

    const result = await SubscriptionServices.checkSubscription(payload);

    res.status(200).json({
      success: true,
      message: "Subscription checked successfully",
      data: result,
    });
    return; // ✅ optional but clean
  } catch (error: any) {
    logger.error("Subscription check failed", error);

    res.status(error.statusCode || error.status || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
    return; // ✅ important
  }
});