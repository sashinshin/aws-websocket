import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';


export class AwsWebsocketStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const connectionsTable = new cdk.aws_dynamodb.Table(this, 'ConnectionsTable', {
      partitionKey: { name: 'connectionId', type: cdk.aws_dynamodb.AttributeType.STRING }
    });




  }
}
