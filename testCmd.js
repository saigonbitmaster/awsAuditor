import {listBuckets, listObjects, getBucketAcl,
  getSecurityGroups, 
   getUsers,
   getRoles,
   getGroups,
   getInstances,
   getUserGroups,
  getAccountAuthorizationDetails} from './src/cmds'
import {tooOpenList, limitPortList, ec2Report, securityGroupReport, iamReport} from "./src/utils"

let cb = (data) => {console.log(JSON.stringify(data))}

//listObjects("bucket4test", (data) => cb(data));
//getBucketAcl("bucket4test", (data) => cb(data));
//getSecurityGroups( (data) => cb(data));
//let filter = ["User", "Role", "Group", "LocalManagedPolicy", "AWSManagedPolicy"]
//getAccountAuthorizationDetails(filter, data => cb(data));
//getUsers(data => cb(data));
//getRoles(data => cb(data))
//getGroups(data => cb(data))
/* 
getSecurityGroups( (data) => {
  let test = tooOpenList(data.SecurityGroups);
  console.log(test)
}); 

getSecurityGroups( (data) => {
  let test = limitPortList(data.SecurityGroups);
  console.log(test)
});
 */
/* 
getSecurityGroups( (data) => {
  let result = securityGroupReport(data.SecurityGroups);
  console.log(result)
});

getInstances( (data) => {
  let result = ec2Report(data);
  console.log(result)
}); */
/* 
getUsers(data => cb(data));
//getRoles(data => cb(data))
getGroups(data => cb(data))
 */
/* 
getUserGroups(data => {
let result = iamReport(data);
console.log(result)
}) */