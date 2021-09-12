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
