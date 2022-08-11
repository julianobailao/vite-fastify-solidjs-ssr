import { GET, RequestHandler } from "fastify-decorators";
import Munchy from "munchy";
import { PassThrough } from "stream";

const getResponseOutput = (req, delay = 2000) => {
  const output = new PassThrough();
  const chunks = [
    `<h1>Hello</h1>`,
    `<h1>What's your name?</h1>`,
    `<h1>Nice to meet you, I am fastify.</h1>`,
    `<h1>Fantastic to be streaming with you.</h1>`,
    `<h1>Bye, have a nice day.</h1>`,
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
    const munchy = new Munchy();

    const data = getResponseOutput(this.request);
    munchy.munch(`<html><head></head><body>`, data, `</body></html>\n`, null);

    this.reply.header("Content-Type", "text/html").code(200);
    this.reply.send(munchy);
  }
}
