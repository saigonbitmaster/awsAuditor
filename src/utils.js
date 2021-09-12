import { whiteListPort, limitPorts } from "./config";
import _ from "lodash";
//create a list of security group open (0.0.0.0/0) except for white list ports
const tooOpenList = (securityGroups) => {
  //filter rule that open to all ips and port not in white list
  const filterRule = (rule) => {
    return rule.IpRanges.some((ipRange) => {
      const hasNoLimitTcp = ipRange.CidrIp === "0.0.0.0/0";
      const excludeWhiteList = whiteListPort.every(
        (item) => item < rule.FromPort || item > rule.ToPort
      );
      return hasNoLimitTcp && excludeWhiteList;
    });
  };

  let openList = securityGroups.map((item) => {
    let IpPermissions = item.IpPermissions.filter((ipItem) =>
      filterRule(ipItem)
    );

    return {
      groupName: item.GroupName,
      openRules: IpPermissions.map(
        ({ FromPort, ToPort, IpRanges, IpProtocol }) =>
          `${FromPort}-${ToPort}-${IpProtocol}-${IpRanges[0].CidrIp}`
      ).join(","),
    };
  });

  //filter passed group
  return openList.filter((item) => item.openRules.length > 0);
};

//create a list security group that has rule open the limit ports
let limitPortList = (securityGroups) => {
  //filter rule open the limit ports
  const filterRule = (ipItem) => {
    return limitPorts.some(
      (item) => item >= ipItem.FromPort && item <= ipItem.ToPort
    );
  };
  let limitPortList = securityGroups.map((item) => {
    let IpPermissions = item.IpPermissions.filter((ipItem) =>
      filterRule(ipItem)
    );
    return {
      groupName: item.GroupName,
      openRules: IpPermissions.map(
        ({ FromPort, ToPort, IpRanges, IpProtocol }) =>
          `${FromPort}-${ToPort}-${IpProtocol}`
      ).join(","),
    };
  });
  //filter passed group
  return limitPortList.filter((item) => item.openRules.length > 0);
};

//ec2 report
const ec2Report = (instances) => {
  let types = _.uniq(_.map(instances, "InstanceType"));
  let platforms = _.uniq(_.map(instances, "Platform"));
  let instancesByType = types.map((item) => ({
    [item]: instances.filter(
      (instanceItem) => instanceItem.InstanceType == item
    ).length,
  }));
  let instancesByPlatform = platforms.map((item) => ({
    [item]: instances.filter((instanceItem) => instanceItem.Platform == item)
      .length,
  }));
  let summedRecord = Object.assign(
    { reportName: "Ec2 report", total: instances.length },
    { instancesByType },
    { instancesByPlatform },
    { instances }
  );
  return summedRecord;
};

//security group report
const securityGroupReport = (securityGroups) => {
  let tooOpenRule = tooOpenList(securityGroups);
  let limitPortRule = limitPortList(securityGroups);
  let summedRecord = Object.assign(
    {
      reportName: "Security group report",
      total: securityGroups.length,
      groups: securityGroups.map((item) => item.GroupName).join(","),
      hasOpenRule: tooOpenRule.length,
      hasOpenLimitPort: limitPortRule.length,
    },
    { hasOpenRuleGroups: tooOpenRule },
    { hasOpenLimitPortGroups: limitPortRule }
  );
  return summedRecord;
};

//iam report 
const iamReport = (userGroups) => {
  let userDetailList = userGroups.UserDetailList.map((item) => {
    let { UserName, UserPolicyList, GroupList, AttachedManagedPolicies } =
      item;
    return {
      UserName,
      UserPolicyList: UserPolicyList.map((item) => item.PolicyName).join(','),
      GroupList: GroupList.join(','),
      AttachedManagedPolicies: AttachedManagedPolicies.map(item => item.PolicyName).join(","),
    };
  });
  let groupDetailList = userGroups.GroupDetailList.map((item) => {
    let { GroupName, GroupPolicyList, AttachedManagedPolicies } = item;
    return {
      GroupName,
      GroupPolicyList: GroupPolicyList.map((item) => item.PolicyName).join(","),
      AttachedManagedPolicies: AttachedManagedPolicies.map(item => item.PolicyName).join(","),
    }})
    let summedRecord = Object.assign(
      {
        reportName: "User group report",
        totalUser: userDetailList.length,
        users: userDetailList.map(item => item.UserName).join(","),
        totalGroup: groupDetailList.length,
        groups: groupDetailList.map(item => item.GroupName).join(",")
      },
      { userDetailList },
      { groupDetailList }
     
    );
    return summedRecord;
}
export { tooOpenList, limitPortList, ec2Report, securityGroupReport, iamReport };
