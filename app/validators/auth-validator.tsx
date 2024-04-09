import { z } from "zod";





export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3).max(20).refine((name) => {
    // Check if the same character is repeated consecutively
    let isConsecutive = true;
    for (let i = 1; i < name.length; i++) {
      if (name[i] != name[i - 1]) {
        return true;
      }
    }
    return false;
  }, { message: "Name should not contain consecutive repeating characters." })
  .refine((name) => {
    // Check if the string starts with a space
    return !name.startsWith(" ");
  }, { message: "Name must not start with a space." }),
 
  password: z.string().min(8).max(50)
    .refine(password => {
      // Password should contain at least one uppercase letter
      // Password should contain at least one lowercase letter
      // Password should contain at least one digit
      // Password should contain at least one special character
      return /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /\d/.test(password) &&
        /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/.test(password);
    }, { message: "The password should contain both upper case and lower case and atleast a digit, special charter " }),
  confirmPassword: z.string(),
 
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match", // Set custom message for password mismatch
});



export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
});

export const passSchema = z.object({
  email: z.string().email(),
});
