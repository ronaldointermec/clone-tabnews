import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();
    await email.send({
      from: "rsilva <ronaldo.intermec@gmail.com>",
      to: "<ronaldo.silva2@honeywell.com>",
      subject: "Teste de assunto",
      text: "Teste de corpo.",
    });
  });
});
