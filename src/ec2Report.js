import { getInstances } from "./cmds";
import { ec2Report } from "./utils";

getInstances((data) => {
  let result = ec2Report(data);
  console.log(result);
});
