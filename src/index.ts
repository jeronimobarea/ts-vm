import { argv } from "process";
import ExecutionContext from "./classes/execution";

const main = () => {
  const code = argv[2] ?? "0x00";
  const execCtx = new ExecutionContext(code);

  execCtx.run();
};

main();