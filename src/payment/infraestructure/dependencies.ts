import { SendMessageService } from "../../shared/broker/application/service/sendMessageService";
import { AmqpLibPort } from "../../shared/broker/infraestructure/ports/AmqpLip";
import { CreatePaymentService } from "../application/services/createPaymentService";
import { SocketIOPort } from "../../shared/socket/infrastructure/ports/socktIOPorts";
import { SendDataService } from "../../shared/socket/application/sendDataService";
import { CreatePaymentController } from "./controller/createPaymentController";

const socketIoPort = new SocketIOPort("http://34.234.26.214:5000");
const amqplLib = new AmqpLibPort("amqp://3.225.191.175");

const sendMessageService = new SendMessageService(amqplLib);
const sendDataService = new SendDataService(socketIoPort)

 const createPaymentService = new CreatePaymentService(
  sendMessageService,
  sendDataService
);

export const createPaymentController = new CreatePaymentController(createPaymentService)