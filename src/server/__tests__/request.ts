import bootstrap from "../../../app";
import request from "supertest";

const app = await bootstrap();

export default request(app);
