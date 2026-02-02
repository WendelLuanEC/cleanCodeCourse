import axios from "axios"

test("Deve criar uma conta", async () => {
    //Guiven
    const input = {
     name: "John Doe",
     email: "john.doe@gmail.com",
     document: "97456321558",
     password:  "12345678"
    }

    //When
    const responseSigunp = await axios.post("http://localhost:3000/signup", input);
    const outputSigunp = responseSigunp.data;

    //Then
    expect(outputSigunp.accountId).toBeDefined();
    const responseGetAccount = await axios.get(`http://localhost:3000/accounts/${outputSigunp.accountId}`);
    const outputGetAccount = responseGetAccount.data;
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.document).toBe(input.document);
    expect(outputGetAccount.password).toBe(input.password);
});