import { App } from 'cdktf';
import { BaseStackProps } from './lib/stacks/stackbase';
import { EcrStack } from './lib/stacks/ecr-stack';
import { AcmZone } from './lib/stacks/certificate-manager-stack';
import { Route53ZoneStack, RouteConfigs } from './lib/stacks/route53-stack';

const StackProps: BaseStackProps = {
    name: "aws2",
    project: "friendlydevops",
    region: "us-east-2"
}

const app = new App();

const acm = new AcmZone(app, "acm-stack", StackProps)

const RouteProps: RouteConfigs = {
    name: StackProps.name,
    project: StackProps.project,
    region: StackProps.region,
    dnsName: acm.acm.domainValidationOptions(0).resourceRecordName,
    record: acm.acm.domainValidationOptions(0).resourceRecordValue,
    type: acm.acm.domainValidationOptions(0).resourceRecordType
}

new Route53ZoneStack(app, "route53-stack", RouteProps)

new EcrStack(app,"ecr-stack", StackProps)

// To deploy using Terraform Cloud comment out the above line
// And uncomment the below block of lines

/*const stack = new EcsServiceStack(app, "ecs-service-stack", EcsConfig);
new RemoteBackend(stack, {
  hostname: "app.terraform.io",
  organization: process.env.CDKTF_ECS_TFC_ORGANIZATION || "",
  workspaces: {
    name: "ecs-microservices-cdktf"
  }
}); */

app.synth();
