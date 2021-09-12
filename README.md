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
reportName: 'User group report',
  totalUser: 15,
  users: 'dev,accountance,dev-gitlab-backup,k3s-admin,prod-dev-product-01-online,prod-singapore-product-01-online,prod-asia-36-product-01-online,s3-asia,s3-asia-06,s3-prod-dev-1,SfApi,asia-36,adminCLI,adminnt@myAccount.vn,trnadmin',
  totalGroup: 7,
  groups: 'admin,develop,docker,ec2-access,finance,k3s,test',
