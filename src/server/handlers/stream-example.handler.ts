import { GET, RequestHandler } from "fastify-decorators";
import Minipass from "minipass";

const getResponseOutput = (req, delay = 2000): Minipass => {
  const output = new Minipass();
  const chunks = [
    `<html><head></head><body>`,
    `<h1>Hello</h1>`,
    `<h1>What's your name?</h1>`,
    `<h1>Nice to meet you, I am fastify.</h1>`,
    `<h1>Fantastic to be streaming with you.</h1>`,
    `<h1>Bye, have a nice day.</h1>`,
    `</body></html>\n`,
  ];

  let ix = 0;
  const interval = setInterval(() => output.write("."), 100);

  let fail = -1;

  if (req.query.fail) {
    fail = parseInt(req.query.fail);
  }

  const send = () => {
    console.log(`sending ${ix} ${chunks[ix]}`);
    output.write(chunks[ix++]);
    if (fail !== undefined && ix === fail) {
      clearInterval(interval);
      process.nextTick(() => output.emit("error"));
    } else {
      if (ix === chunks.length) {
        clearInterval(interval);
        output.end();
      } else {
        setTimeout(send, delay);
      }
    }
  };

  process.nextTick(() => send());

  return output;
};

@GET({
  url: "/stream",
})
export default class StreamExampleHandler extends RequestHandler {
  async handle() {
    this.reply.header("Content-Type", "text/html").code(200);
    this.reply.send(getResponseOutput(this.request));
  }
}
