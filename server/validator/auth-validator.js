const { z } = require("zod")

// create schema signup
const signUpschema = z.object({
    username: z
        .string({ required_error: "name is required" })
        .trim()
        .min(3, { message: "Nane 3 krata vadhare" })
        .max(255, { message: "Nane 255 krata ochu" })
    ,
    email: z
        .string({ required_error: "emmail is required" })
        .trim()
        .email({ message: "invalid email" })
        .min(3, { message: "Nane 3 krata vadhare" })
        .max(255, { message: "Nane 255 krata ochu" })
    ,
    phone: z
        .string({ required_error: "phone is required" })
        .trim()
        .min(10, { message: "Nane 10 hova joye" })
        .max(20, { message: "Nane 20 krata ochu" })
    ,
    password: z
        .string({ required_error: "password is required" })
        .trim()
        .min(7, { message: "Nane 7 pass krata vadhare" })
        .max(1024, { message: "Nane 1024 pass krata ochu" })
    ,
})

module.exports = signUpschema;