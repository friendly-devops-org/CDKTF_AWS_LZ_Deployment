import { Construct } from 'constructs';
import { AwsStackBase, BaseStackProps } from './stackbase';
import { Route53Zone } from '@cdktf/provider-aws/lib/route53-zone';

export class Route53ZoneStack extends AwsStackBase {
    public zone; Route53Zone;
    constructor(scope: Construct, id: string, props: BaseStackProps) {
        super(scope, `${props.name}-${props.project}-${id}`, {
            name: props.name,
            project: props.project,
            region: props.region,
        })

        this.zone = new Route53Zone (this, `${id}`, {
            name: `${props.name}.${props.project}.com`,
    }
}
