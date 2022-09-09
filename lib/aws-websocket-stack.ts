import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { addConnectHandlerLambda, addDisonnectHandlerLambda, addMessageHandlerLambda, addDefaultHandlerLambda } from './lambda-resources';

import { WebsocketApi } from "./websocket-api";
import { addStaticPageBucket } from './s3-resources';



export class AwsWebsocketStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const connectionsTable = new cdk.aws_dynamodb.Table(this, 'ConnectionsTable', {
      partitionKey: { name: 'connectionId', type: cdk.aws_dynamodb.AttributeType.STRING }
    });

    const connectFn = addConnectHandlerLambda(this, connectionsTable);
    const disconnectFn = addDisonnectHandlerLambda(this, connectionsTable);
    const sendmesssageFn = addMessageHandlerLambda(this, connectionsTable);
    const defaultFn = addDefaultHandlerLambda(this);

    const websocketApi = new WebsocketApi(this, 'Websocket Api', {
      apiName: "websocket-api",
      apiDescription: "Web Socket API for test",
      stageName: 'production',
      connectFn,
      disconnectFn,
      sendmesssageFn,
      defaultFn,
      connectionsTable
    });
    
    addStaticPageBucket(this);


  }
}
