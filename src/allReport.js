import {listBuckets, listObjects, getBucketAcl,
  getSecurityGroups, 
  getInstances,
  getUserGroups} from './cmds'
import {ec2Report, securityGroupReport, iamReport} from "./utils"

getUserGroups(data => {
let result = iamReport(data);
console.log(result)
});

getSecurityGroups( (data) => {
  let result = securityGroupReport(data.SecurityGroups);
  console.log(result)
});

getInstances( (data) => {
  let result = ec2Report(data);
  console.log(result)
});