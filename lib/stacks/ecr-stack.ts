import { Construct } from 'constructs';
import { AwsStackBase, BaseStackProps } from './stackbase';
import { EcrRepository } from '@cdktf/provider-aws/lib/ecr-repository'

export class EcrStack extends AwsStackBase {
    constructor(scope: Construct, id: string, props: BaseStackProps) {
        super(scope,  `${props.name}-${props.project}-${id}`, {
            name: `${props.name}`,
            project: `${props.project}`,
            region: `${props.region}`
        })
        new EcrRepository(this, `${id}`, {
            name: "nextcloud",
            imageTagMutability: "MUTABLE",
            imageScanningConfiguration: {
                scanOnPush: true
            }
        });
    }
}
