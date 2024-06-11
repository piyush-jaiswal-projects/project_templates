import dotenv from "dotenv";
import { app } from "./app";
import { ErrorHandler } from "./middlewares";

dotenv.config({
  path: "../.env",
});

const port = process.env.PORT || 8080;

//@ts-ignore
app.use(ErrorHandler);

console.log(`${process.env.NODE_ENV} Environment`);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
