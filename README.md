## AWS QUICK REPORT

AWS has large resources and manage usually get long time even for overview. So this code help:
- Get fast summurized resource report in single view
- Manage the change has made to your aws for example add/remote user, ec2
- Scan and report the risk of security group and iam 

#Configuration
to run the code aws cli and credentials must be installed and configured:
https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html

#the REGION must be specified at .en file:
AWS_REGION="ap-southeast-1"

#AWS_ID AWS_SECRET in .env file is not used

#To add limit and white list ports modify: 
src/config.js 

#To get the raw data from aws run the command in:
src/cmds.js 

#This code only use describe commands which get data from aws 

#NONE OF ADD/MODIFY COMMANDS ARE USED IN THIS CODE to ensure the AWS resouces is SAFE when run the commands.

AWS API: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/top-level-namespace.html

#To run the code: 
- git clone https://github.com/saigonbitmaster/awsAuditor
- yarn 
- yarn run all

#Commands to get report: 
- yarn run help: to get help for commands
- yarn run all: to get full report
- yarn run sg: to scan all security group then report the rule that may risk e.g too open, open for the limit access port
- yarn run ec2: report ec2 on the account 
- yarn run iam: report iam user, group, policies 

#Some output:
- reportName: 'User group report',
  - totalUser: 15,
  - users: '',
  - totalGroup: 7,
  - groups: '',
  -  UserPolicyList: '',
  - GroupList: 'test,docker',
  -  AttachedManagedPolicies: 'test'
- reportName: 'Security group report',
   - total: 10,
   - groups: 'launch-wizard-2,rke,launch-wizard-1,prod-dev-1,product-01-prod,k3s1,testServer,default,gitlab,MiniWeb',
   - hasOpenRule: 4,
   - hasOpenLimitPort: 7,
- reportName: 'Ec2 report',
   - total: 17,
   - instancesByType: [ { 't2.micro': 8 }, { 't2.small': 7 }, { 't2.medium': 2 } ],
   - instancesByPlatform: [ { windows: 1 }, { linux: 16 } ],
