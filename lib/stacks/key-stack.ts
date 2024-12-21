import { Construct } from 'constructs';
import { AwsStackBase, BaseStackProps } from './stackbase';
import { KeyPair } from '@cdktf/provider-aws/lib/key-pair'

export interface KeyConfigs extends BaseStackProps {
    name: string,
    project: string,
    region: string,
    keyName: string,
    publicKey: string,
}

export class KeyStack extends AwsStackBase {
    constructor(scope: Construct, id: string, props: KeyConfigs) {
        super(scope,  `${props.name}-${props.project}-${id}`, {
            name: `${props.name}`,
            project: `${props.project}`,
            region: `${props.region}`
        })
        new KeyPair(this, `${id}`, {
            keyName: `${props.keyName}`,
            publicKey: "MUTABLE",
        })
    }
}
