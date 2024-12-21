import { App } from 'cdktf';
import { BaseStackProps } from './lib/stacks/stackbase';
import { EcrStack, EcrConfigs } from './lib/stacks/ecr-stack';
import { KeyStack, KeyConfigs } from './lib/stacks/key-stack';
import { AcmZone } from './lib/stacks/certificate-manager-stack';
import { Route53ZoneStack, RouteConfigs } from './lib/stacks/route53-stack';

const StackProps: BaseStackProps = {
    name: "aws-test",
    project: "friendlydevops",
    region: "us-east-2"
}

const app = new App();

const acm = new AcmZone(app, "acm-stack", StackProps)

const RouteProps: RouteConfigs = {
    name: StackProps.name,
    project: StackProps.project,
    region: StackProps.region,
    acmZone: acm.acm
}

new Route53ZoneStack(app, "route53-stack", RouteProps)

const EcrConfig1: EcrConfigs = {
    name: StackProps.name,
    project: StackProps.project,
    region: StackProps.region,
    imageName: "nextcloud",
}

const EcrConfig2: EcrConfigs = {
    name: StackProps.name,
    project: StackProps.project,
    region: StackProps.region,
    imageName: "wordpress",
}

new EcrStack(app,"ecr-nextcloud-stack", EcrConfig1)
new EcrStack(app,"ecr-wordpress-stack", EcrConfig2)

const KeyProps: KeyConfigs = {
    name: StackProps.name,
    project: StackProps.project,
    region: StackProps.region,
    keyName: "master-key",
    publicKey: process.env.PUBLIC_KEY
}

new KeyStack(app,"master-key-stack", KeyProps)

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
