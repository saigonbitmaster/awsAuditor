import { getSecurityGroups } from "./cmds";
import { securityGroupReport } from "./utils";

getSecurityGroups((data) => {
  let result = securityGroupReport(data.SecurityGroups);
  console.log(result);
});
