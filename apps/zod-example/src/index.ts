import { z } from "zod";

const mySchema = z.object({
    name: z.string(),
    age: z.number(),
});

(() => {
    const myCorrectData = {
        name: "John",
        age: 30,
    };
    console.log("myCorrectData", myCorrectData);

    const myIncorrectData = {
        name: "John",
        age: "30",
    };
    console.log("myIncorrectData", myIncorrectData);

    const myCorrectDataResult = mySchema.safeParse(myCorrectData);
    const myIncorrectDataResult = mySchema.safeParse(myIncorrectData);

    console.log("myCorrectData result: ", myCorrectDataResult.success); // true
    console.log("myIncorrectData", myIncorrectDataResult.success); // false
})();
