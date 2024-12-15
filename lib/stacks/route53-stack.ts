import { Construct } from 'constructs';
import { AwsStackBase, BaseStackProps } from './stackbase';
import { Route53Zone } from '@cdktf/provider-aws/lib/route53-zone';
import { Route53Record } from '@cdktf/provider-aws/lib/route53-record';

export interface RouteConfigs extends BaseStackProps {
    name: string,
    project: string,
    region: string,
    dnsName: string,
    record: string,
    type: string,
}

export class Route53ZoneStack extends AwsStackBase {
    public record: Route53Record;
    constructor(scope: Construct, id: string, props: BaseStackProps) {
        super(scope, `${props.name}-${props.project}-${id}`, {
            name: props.name,
            project: props.project,
            region: props.region,
        })

        const zone = new Route53Zone (this, `${id}`, {
            name: `${props.name}.${props.project}.com`,
        });

        this.record = new Route53Record (this, `${props.name}-${id}`, {
            name: props.dnsName,
            type: props.type,
            zoneId: zone.zoneId,
            ttl: 60,
            records: props.record
        })
    }
}
