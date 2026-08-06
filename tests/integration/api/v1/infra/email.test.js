import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();
    await email.send({
      from: "rsilva <ronaldo.intermec@gmail.com>",
      to: "<ronaldo.silva2@honeywell.com>",
      subject: "Teste de assunto",
      text: "Teste de corpo.",
    });

    await email.send({
      from: "rsilva <ronaldo.intermec@gmail.com>",
      to: "<ronaldo.silva2@honeywell.com>",
      subject: "Último email enviado",
      text: "Corpo do último email enviado.",
    });

    const lastEmail = await orchestrator.getLastEmail();

    console.log("lastEmail", lastEmail);

    expect(lastEmail.sender).toEqual("<ronaldo.intermec@gmail.com>");
    expect(lastEmail.recipients[0]).toEqual("<ronaldo.silva2@honeywell.com>");
    expect(lastEmail.subject).toEqual("Último email enviado");
    expect(lastEmail.text).toEqual("Corpo do último email enviado.\r\n");
  });
});
