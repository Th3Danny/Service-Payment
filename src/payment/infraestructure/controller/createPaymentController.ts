import { Response, Request } from "express";
import { CreatePaymentService } from "../../application/services/createPaymentService";

export class CreatePaymentController {
  constructor(private readonly createPaymentService: CreatePaymentService) {}
  async run(req: Request, res: Response) {
    try {
      console.log("paso")
      const order = req.body;
      if (order === null) res.status(404).send("not found");
      await this.createPaymentService.run(order);
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}