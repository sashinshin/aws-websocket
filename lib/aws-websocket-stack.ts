import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { addConnectHandlerLambda, addDisonnectHandlerLambda, addMessageHandlerLambda } from './lambda-resources';


export class AwsWebsocketStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const connectionsTable = new cdk.aws_dynamodb.Table(this, 'ConnectionsTable', {
      partitionKey: { name: 'connectionId', type: cdk.aws_dynamodb.AttributeType.STRING }
    });

    const connectHandleLambda = addConnectHandlerLambda(this, connectionsTable)
    const disconnectHandlerLambda = addDisonnectHandlerLambda(this, connectionsTable)
    const messageHandlerLambda = addMessageHandlerLambda(this, connectionsTable)

    // const websocketApi = new cdk.aws_apigateway.api



  }
}
