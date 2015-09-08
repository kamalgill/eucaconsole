# -*- coding: utf-8 -*-
# Copyright 2013-2015 Hewlett Packard Enterprise Development LP
#
# Redistribution and use of this software in source and binary forms,
# with or without modification, are permitted provided that the following
# conditions are met:
#
# Redistributions of source code must retain the above copyright notice,
# this list of conditions and the following disclaimer.
#
# Redistributions in binary form must reproduce the above copyright
# notice, this list of conditions and the following disclaimer in the
# documentation and/or other materials provided with the distribution.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
# "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
# LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
# A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
# OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
# SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
# LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
# DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
# THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
# (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
# OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

"""
Constants for IAM Policy permissions (actions)

"""
from ..i18n import _


# Policy Generator Actions for EC2
EC2_ACTIONS = [
    # 'ActivateLicense',
    'AllocateAddress',
    'AssignPrivateIpAddresses',
    'AssociateAddress',
    # 'AssociateDhcpOptions',
    # 'AssociateRouteTable',
    # 'AttachInternetGateway',
    # 'AttachNetworkInterface',
    'AttachVolume',
    # 'AttachVpnGateway',
    'AuthorizeSecurityGroupEgress',
    'AuthorizeSecurityGroupIngress',
    # 'BundleInstance',
    # 'CancelBundleTask',
    # 'CancelConversionTask',
    # 'CancelExportTask',
    # 'CancelReservedInstancesListing',
    # 'CancelSpotInstanceRequests',
    # 'ConfirmProductInstance',
    'CopyImage',
    'CopySnapshot',
    # 'CreateCustomerGateway',
    # 'CreateDhcpOptions',
    'CreateImage',
    # 'CreateInstanceExportTask',
    # 'CreateInternetGateway',
    'CreateKeyPair',
    # 'CreateNetworkAcl',
    # 'CreateNetworkAclEntry',
    # 'CreateNetworkInterface',
    'CreatePlacementGroup',
    # 'CreateReservedInstancesListing',
    # 'CreateRoute',
    # 'CreateRouteTable',
    'CreateSecurityGroup',
    'CreateSnapshot',
    # 'CreateSpotDatafeedSubscription',
    # 'CreateSubnet',
    'CreateTags',
    'CreateVolume',
    # 'CreateVpc',
    # 'CreateVpnConnection',
    # 'CreateVpnConnectionRoute',
    # 'CreateVpnGateway',
    # 'DeactivateLicense',
    # 'DeleteCustomerGateway',
    # 'DeleteDhcpOptions',
    # 'DeleteInternetGateway',
    'DeleteKeyPair',
    # 'DeleteNetworkAcl',
    # 'DeleteNetworkAclEntry',
    # 'DeleteNetworkInterface',
    'DeletePlacementGroup',
    # 'DeleteRoute',
    # 'DeleteRouteTable',
    'DeleteSecurityGroup',
    'DeleteSnapshot',
    # 'DeleteSpotDatafeedSubscription',
    # 'DeleteSubnet',
    'DeleteTags',
    'DeleteVolume',
    # 'DeleteVpc',
    # 'DeleteVpnConnection',
    # 'DeleteVpnConnectionRoute',
    # 'DeleteVpnGateway',
    'DeregisterImage',
    'DescribeAccountAttributes',
    'DescribeAddresses',
    'DescribeAvailabilityZones',
    # 'DescribeBundleTasks',
    # 'DescribeConversionTasks',
    # 'DescribeCustomerGateways',
    # 'DescribeDhcpOptions',
    # 'DescribeExportTasks',
    'DescribeImageAttribute',
    'DescribeImages',
    'DescribeInstanceAttribute',
    'DescribeInstanceStatus',
    'DescribeInstances',
    # 'DescribeInternetGateways',
    'DescribeKeyPairs',
    # 'DescribeLicenses',
    # 'DescribeNetworkAcls',
    # 'DescribeNetworkInterfaceAttribute',
    # 'DescribeNetworkInterfaces',
    'DescribePlacementGroups',
    'DescribeRegions',
    # 'DescribeReservedInstances',
    # 'DescribeReservedInstancesListings',
    # 'DescribeReservedInstancesModifications',
    # 'DescribeReservedInstancesOfferings',
    # 'DescribeRouteTables',
    'DescribeSecurityGroups',
    'DescribeSnapshotAttribute',
    'DescribeSnapshots',
    # 'DescribeSpotDatafeedSubscription',
    # 'DescribeSpotInstanceRequests',
    # 'DescribeSpotPriceHistory',
    # 'DescribeSubnets',
    'DescribeTags',
    'DescribeVolumeAttribute',
    'DescribeVolumeStatus',
    'DescribeVolumes',
    # 'DescribeVpcAttribute',
    # 'DescribeVpcs',
    # 'DescribeVpnConnections',
    # 'DescribeVpnGateways',
    # 'DetachInternetGateway',
    # 'DetachNetworkInterface',
    'DetachVolume',
    # 'DetachVpnGateway',
    # 'DisableVgwRoutePropagation',
    'DisassociateAddress',
    # 'DisassociateRouteTable',
    # 'EnableVgwRoutePropagation',
    'EnableVolumeIO',
    'GetConsoleOutput',
    'GetPasswordData',
    'ImportInstance',
    'ImportKeyPair',
    'ImportVolume',
    'ModifyImageAttribute',
    'ModifyInstanceAttribute',
    # 'ModifyNetworkInterfaceAttribute',
    # 'ModifyReservedInstances',
    'ModifySnapshotAttribute',
    'ModifyVolumeAttribute',
    # 'ModifyVpcAttribute',
    'MonitorInstances',
    # 'PurchaseReservedInstancesOffering',
    'RebootInstances',
    'RegisterImage',
    'ReleaseAddress',
    # 'ReplaceNetworkAclAssociation',
    # 'ReplaceNetworkAclEntry',
    # 'ReplaceRoute',
    # 'ReplaceRouteTableAssociation',
    'ReportInstanceStatus',
    # 'RequestSpotInstances',
    'ResetImageAttribute',
    'ResetInstanceAttribute',
    # 'ResetNetworkInterfaceAttribute',
    'ResetSnapshotAttribute',
    'RevokeSecurityGroupEgress',
    'RevokeSecurityGroupIngress',
    'RunInstances',
    'StartInstances',
    'StopInstances',
    'TerminateInstances',
    'UnassignPrivateIpAddresses',
    'UnmonitorInstances',
]


# Policy Generator Actions for AutoScaling
AUTOSCALING_ACTIONS = [
    'CreateAutoScalingGroup',
    'CreateLaunchConfiguration',
    'CreateOrUpdateScalingTrigger',
    'CreateOrUpdateTags',
    'DeleteAutoScalingGroup',
    'DeleteLaunchConfiguration',
    'DeleteNotificationConfiguration',
    'DeletePolicy',
    'DeleteScheduledAction',
    'DeleteTags',
    'DeleteTrigger',
    'DescribeAdjustmentTypes',
    'DescribeAutoScalingGroups',
    'DescribeAutoScalingInstances',
    'DescribeAutoScalingNotificationTypes',
    'DescribeLaunchConfigurations',
    'DescribeMetricCollectionTypes',
    'DescribeNotificationConfigurations',
    'DescribePolicies',
    'DescribeScalingActivities',
    'DescribeScalingProcessTypes',
    'DescribeScheduledActions',
    'DescribeTags',
    'DescribeTriggers',
    'DisableMetricsCollection',
    'EnableMetricsCollection',
    'ExecutePolicy',
    'PutNotificationConfiguration',
    'PutScalingPolicy',
    'PutScheduledUpdateGroupAction',
    'ResumeProcesses',
    'SetDesiredCapacity',
    'SetInstanceHealth',
    'SuspendProcesses',
    'TerminateInstanceInAutoScalingGroup',
    'UpdateAutoScalingGroup',
]

# Policy Generator Actions for Elastic Load Balancing
ELB_ACTIONS = [
    'ConfigureHealthCheck',
    'CreateAppCookieStickinessPolicy',
    'CreateLBCookieStickinessPolicy',
    'CreateLoadBalancer',
    'CreateLoadBalancerListeners',
    'DeleteLoadBalancer',
    'DeleteLoadBalancerListeners',
    'DeleteLoadBalancerPolicy',
    'DeregisterInstancesFromLoadBalancer',
    'DescribeInstanceHealth',
    'DescribeLoadBalancers',
    'DisableAvailabilityZonesForLoadBalancer',
    'EnableAvailabilityZonesForLoadBalancer',
    'RegisterInstancesWithLoadBalancer',
    'SetLoadBalancerListenerSSLCertificate',
    'SetLoadBalancerPoliciesOfListener',
]


# Policy Generator Actions for CloudWatch
CLOUDWATCH_ACTIONS = [
    'DeleteAlarms',
    'DescribeAlarmHistory',
    'DescribeAlarms',
    'DescribeAlarmsForMetric',
    'DisableAlarmActions',
    'EnableAlarmActions',
    'GetMetricStatistics',
    'ListMetrics',
    'PutMetricAlarm',
    'PutMetricData',
    'SetAlarmState',
]


# Policy Generator Actions for S3/Walrus
S3_ACTIONS = [
    'AbortMultipartUpload',
    'CreateBucket',
    'DeleteBucket',
    'DeleteBucketPolicy',
    'DeleteBucketWebsite',
    'DeleteObject',
    'DeleteObjectVersion',
    'GetBucketAcl',
    'GetBucketLocation',
    'GetBucketLogging',
    'GetBucketNotification',
    'GetBucketPolicy',
    'GetBucketRequestPayment',
    'GetBucketTagging',
    'GetBucketVersioning',
    'GetBucketWebsite',
    'GetLifecycleConfiguration',
    'GetObject',
    'GetObjectAcl',
    'GetObjectTorrent',
    'GetObjectVersion',
    'GetObjectVersionAcl',
    'GetObjectVersionTorrent',
    'ListAllMyBuckets',
    'ListBucket',
    'ListBucketMultipartUploads',
    'ListBucketVersions',
    'ListMultipartUploadParts',
    'PutBucketAcl',
    'PutBucketLogging',
    'PutBucketNotification',
    'PutBucketPolicy',
    'PutBucketRequestPayment',
    'PutBucketTagging',
    'PutBucketVersioning',
    'PutBucketWebsite',
    'PutLifecycleConfiguration',
    'PutObject',
    'PutObjectAcl',
    'PutObjectVersionAcl',
]


# Policy Generator Actions for IAM
IAM_ACTIONS = [
    # 'AddRoleToInstanceProfile',
    'AddUserToGroup',
    'ChangePassword',
    'CreateAccessKey',
    'CreateAccountAlias',
    'CreateGroup',
    # 'CreateInstanceProfile',
    # 'CreateLoginProfile',
    # 'CreateRole',
    'CreateUser',
    # 'CreateVirtualMFADevice',
    # 'DeactivateMFADevice',
    'DeleteAccessKey',
    'DeleteAccountAlias',
    # 'DeleteAccountPasswordPolicy',
    'DeleteGroup',
    'DeleteGroupPolicy',
    # 'DeleteInstanceProfile',
    # 'DeleteLoginProfile',
    # 'DeleteRole',
    # 'DeleteRolePolicy',
    # 'DeleteServerCertificate',
    # 'DeleteSigningCertificate',
    'DeleteUser',
    'DeleteUserPolicy',
    # 'DeleteVirtualMFADevice',
    # 'EnableMFADevice',
    # 'GetAccountPasswordPolicy',
    'GetAccountSummary',
    'GetGroup',
    'GetGroupPolicy',
    # 'GetInstanceProfile',
    # 'GetLoginProfile',
    # 'GetRole',
    # 'GetRolePolicy',
    # 'GetServerCertificate',
    'GetUser',
    'GetUserPolicy',
    'ListAccessKeys',
    'ListAccountAliases',
    'ListGroupPolicies',
    'ListGroups',
    'ListGroupsForUser',
    # 'ListInstanceProfiles',
    # 'ListInstanceProfilesForRole',
    # 'ListMFADevices',
    # 'ListRolePolicies',
    # 'ListRoles',
    # 'ListServerCertificates',
    # 'ListSigningCertificates',
    'ListUserPolicies',
    'ListUsers',
    # 'ListVirtualMFADevices',
    # 'PassRole',
    'PutGroupPolicy',
    # 'PutRolePolicy',
    'PutUserPolicy',
    # 'RemoveRoleFromInstanceProfile',
    'RemoveUserFromGroup',
    # 'ResyncMFADevice',
    'UpdateAccessKey',
    # 'UpdateAccountPasswordPolicy',
    # 'UpdateAssumeRolePolicy',
    'UpdateGroup',
    # 'UpdateLoginProfile',
    # 'UpdateServerCertificate',
    # 'UpdateSigningCertificate',
    'UpdateUser',
    # 'UploadServerCertificate',
    # 'UploadSigningCertificate',
]


# Policy Generator Actions for STS (Security Token Service)
STS_ACTIONS = [
    'GetFederationToken',
    'AssumeRole',
]


POLICY_ACTIONS = [
    {
        'name': 'ec2',
        'label': _(u'All EC2 actions'),
        'actions': EC2_ACTIONS,
    },
    {
        'name': 'elasticloadbalancing',
        'label': _(u'All Load Balancing actions'),
        'actions': ELB_ACTIONS,
    },
    {
        'name': 'autoscaling',
        'label': _(u'All Autoscaling actions'),
        'actions': AUTOSCALING_ACTIONS,
    },
    {
        'name': 'cloudwatch',
        'label': _(u'All CloudWatch actions'),
        'actions': CLOUDWATCH_ACTIONS,
    },
    {
        'name': 's3',
        'label': _(u'All S3/Walrus actions'),
        'actions': S3_ACTIONS,
    },
    {
        'name': 'iam',
        'label': _(u'All IAM actions'),
        'actions': IAM_ACTIONS,
    },
    {
        'name': 'sts',
        'label': _(u'All Security Token Service actions'),
        'actions': STS_ACTIONS,
    },
]


