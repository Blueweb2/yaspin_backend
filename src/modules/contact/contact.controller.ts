import { Request, Response } from "express";

import { ContactService } from "./contact.service";

const sendContactMessage = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await ContactService.sendContactEmail(
        req.body
      );

    res.status(200).json({
      success: true,

      message:
        "Message sent successfully",

      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message:
        "Failed to send message",
    });
  }
};

export const ContactController = {
  sendContactMessage,
};