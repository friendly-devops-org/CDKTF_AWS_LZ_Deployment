import { Construct } from 'constructs';
import { AwsStackBase, BaseStackProps } from './stackbase';
import { AcmCertificate } from '@cdktf/provider-aws/lib/acm-certificate'

export class AcmZone extends AwsStackBase {
    public acm: AcmCertificate;
    constructor(scope: Construct, id: string, props: BaseStackProps) {
        super(scope,  `${props.name}-${props.project}-${id}`, {
            name: props.name,
            project: props.project,
            region: props.region,
        })
        this.acm = new AcmCertificate(this, `${id}`, {
            domainName: `${props.name}.${props.project}.com`,
            subjectAlternativeNames:[
                `*.${props.name}.${props.project}.com`,
            ]
        })
    }
}
