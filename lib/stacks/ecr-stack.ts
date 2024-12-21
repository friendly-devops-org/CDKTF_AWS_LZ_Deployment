import { Construct } from 'constructs';
import { AwsStackBase, BaseStackProps } from './stackbase';
import { EcrRepository } from '@cdktf/provider-aws/lib/ecr-repository'

export interface EcrConfigs extends BaseStackProps {
    name: string,
    project: string,
    region: string,
    imageName: string,
}

export class EcrStack extends AwsStackBase {
    constructor(scope: Construct, id: string, props: EcrConfigs) {
        super(scope,  `${props.name}-${props.project}-${id}`, {
            name: `${props.name}`,
            project: `${props.project}`,
            region: `${props.region}`
        })
        new EcrRepository(this, `${id}`, {
            name: `${props.imageName}`,
            imageTagMutability: "MUTABLE",
            imageScanningConfiguration: {
                scanOnPush: true
            }
        });
    }
}
