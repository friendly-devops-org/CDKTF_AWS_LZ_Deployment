import { Construct } from 'constructs';
import { AwsStackBase, BaseStackProps } from './stackbase';
import { Route53Zone } from '@cdktf/provider-aws/lib/route53-zone';
import { Route53Record } from '@cdktf/provider-aws/lib/route53-record';
import { AcmZone } from './lib/stacks/certificate-manager-stack';

export interface RouteConfigs extends BaseStackProps {
    name: string,
    project: string,
    region: string,
    acmZone: AcmZone,
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
            name: `${each.value.name}`,
            type: `${each.value.type}`,
            records: [
                `${each.value.record}`
            ],
            zoneId: zone.zoneId,
            ttl: 60,
            allowOverwrite: true
        })

        record.addOverride('for_each', `\${{
            for dvo in ${acmZone.fqn}.domain_validation_options : dvo.domain_name => {
              name   = dvo.resource_record_name
              record = dvo.resource_record_value
              type   = dvo.resource_record_type
            }
          }
        }`)
    }
}
