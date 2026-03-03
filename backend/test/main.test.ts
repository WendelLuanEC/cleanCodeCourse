import axios from "axios";

axios.defaults.validateStatus = () => true;

test("Deve criar uma conta", async () => {
    const input = {
     name: "John Doe",
     email: "john.doe@gmail.com",
     document: "97456321558",
     password:  "12345678Ac"
    }

    const responseSigunp = await axios.post("http://localhost:3000/signup", input);
    const outputSigunp = responseSigunp.data;
    const responseGetAccount = await axios.get(`http://localhost:3000/accounts/${outputSigunp.accountId}`);
    const outputGetAccount = responseGetAccount.data;
    console.log(outputGetAccount);
    expect(outputSigunp.accountId).toBeDefined();
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.document).toBe(input.document);
    expect(outputGetAccount.password).toBe(input.password);
});

test("Não deve criar uma conta se o nome for inválido", async () => {
    const input = {
     name: "John ",
     email: "john.doe@gmail.com",
     document: "97456321558",
     password:  "12345678"
    }

    const responseSigunp = await axios.post("http://localhost:3000/signup", input);
    expect(responseSigunp.status).toBe(422);
    const outputSigunp = responseSigunp.data;
    expect(outputSigunp.message).toBe("Invalid name");
});

test("Não deve criar uma conta se o email for inválido", async () => {
    const input = {
     name: "John Doe",
     email: "john.doe@",
     document: "97456321558",
     password:  "12345678"
    }

    const responseSigunp = await axios.post("http://localhost:3000/signup", input);
    expect(responseSigunp.status).toBe(422);
    const outputSigunp = responseSigunp.data;
    expect(outputSigunp.message).toBe("Invalid email");
});

test("Não deve criar uma conta se o document for inválido", async () => {
    const input = {
     name: "John Doe",
     email: "john.doe@gmail.com",
     document: "97456321",
     password:  "123456780"
    }

    const responseSigunp = await axios.post("http://localhost:3000/signup", input);
    expect(responseSigunp.status).toBe(422);
    const outputSigunp = responseSigunp.data;
    expect(outputSigunp.message).toBe("Invalid document");
});

test("Não deve criar uma conta se o senha tiver menos de 8 caracteres", async () => {
    const input = {
     name: "John Doe",
     email: "john.doe@gmail.com",
     document: "97456321558",
     password:  "12345"
    }

    const responseSigunp = await axios.post("http://localhost:3000/signup", input);
    expect(responseSigunp.status).toBe(422);
    const outputSigunp = responseSigunp.data;
    expect(outputSigunp.message).toBe("Invalid password");
});
