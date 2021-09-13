const fs = require("fs");
const AWS = require("aws-sdk");
require("dotenv").config();
const _ = require("lodash");

let ID = process.env.AWS_ID || "";
let SECRET = process.env.AWS_SECRET || "";
let REGION = process.env.AWS_REGION || "";
const s3 = new AWS.S3();

const iam = new AWS.IAM();
const ec2 = new AWS.EC2({ region: REGION });

//credentials will be get from aws global configuration ./aws/credentials
//list of raw commands from aws with some data filter
//add console.log(data) in callback to see raw data from AWS


const listBuckets = (cb) => {
  s3.listBuckets(function (err, data) {
    if (err) console.log(err, err.stack);
    else cb(data); // successful response
  });
};
const listObjects = (bucket, cb) => {
  const params = {
    Bucket: bucket,
    MaxKeys: 2,
  };

  s3.listObjects(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else cb(data); // successful response
  });
};

const getBucketAcl = (bucket, cb) => {
  const params = {
    Bucket: bucket,
  };
  s3.getBucketAcl(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else cb(data); // successful response
  });
};
const getSecurityGroups = (cb) => {
  ec2.describeSecurityGroups(function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else cb(data); // successful response
  });
};

const getAccountAuthorizationDetails = (
  filter = ["User", "Role", "Group", "LocalManagedPolicy", "AWSManagedPolicy"],
  cb
) => {
  const params = {
    Filter: filter, //No filter to get all
    MaxItems: 1000,
  };
  iam.getAccountAuthorizationDetails(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else {
      cb(data);
    } // successful response
  });
};
const getUsers = (cb) => {
  const params = {
    Filter: ["User"], //No filter to get all
    MaxItems: 1000,
  };
  iam.getAccountAuthorizationDetails(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else {
      let userPolicies = data.UserDetailList.map((item) => {
        let { UserName, UserPolicyList, GroupList, AttachedManagedPolicies } =
          item;
        return {
          UserName,
          UserPolicyList: UserPolicyList.map((item) => item.PolicyName).join(
            ","
          ),
          GroupList,
          AttachedManagedPolicies: AttachedManagedPolicies.map(
            (item) => item.PolicyName
          ).join(","),
        };
      });

      cb(userPolicies);
    } // successful response
  });
};

const getGroups = (cb) => {
  const params = {
    Filter: ["Group"], //No filter to get all
    MaxItems: 1000,
  };

  iam.getAccountAuthorizationDetails(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else {
      let groupDetailList = data.GroupDetailList.map((item) => {
        let { GroupName, GroupPolicyList, AttachedManagedPolicies } = item;
        return {
          GroupName,
          GroupPolicyList: GroupPolicyList.map((item) => item.PolicyName).join(
            ","
          ),
          AttachedManagedPolicies: AttachedManagedPolicies.map(
            (item) => item.PolicyName
          ).join(","),
        };
      });
      cb(groupDetailList);
    } // successful response
  });
};

const getUserGroups = (cb) => {
  const params = {
    Filter: ["Group", "User"], //No filter to get all
    MaxItems: 1000,
  };

  iam.getAccountAuthorizationDetails(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else {
      return cb(data);
    }
  });
};

const getRoles = (cb) => {
  const params = {
    Filter: ["Role"], //No filter to get all
    MaxItems: 1000,
  };
  iam.getAccountAuthorizationDetails(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else {
      let roleDetailList = data.RoleDetailList.map((item) => {
        let { RoleName, RolePolicyList, AttachedManagedPolicies } = item;
        return {
          RoleName,
          RolePolicyList: RolePolicyList.map((item) => item.PolicyName),
          AttachedManagedPolicies: JSON.stringify(AttachedManagedPolicies),
        };
      });
      cb(roleDetailList);
    } // successful response
  });
};

const getInstances = (cb) => {
  const params = {
    Filters: [],
  };
  ec2.describeInstances(function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else {
      //format data
      let _instances = data.Reservations.map((item) =>
        _.get(item, "Instances", [])
      ).flat();
      let instances = _instances.map(
        ({ KeyName, InstanceId, Platform = "linux", InstanceType, Tags }) => ({
          KeyName,
          InstanceId,
          Platform,
          InstanceType,
          Name: _.get(Tags, ["0", "Value"], "ec2"),
        })
      );

      cb(instances);
    }
  });
};

export {
  listBuckets,
  listObjects,
  getBucketAcl,
  getSecurityGroups,
  getAccountAuthorizationDetails,
  getUsers,
  getRoles,
  getGroups,
  getInstances,
  getUserGroups,
};
