import * as cdk from 'aws-cdk-lib';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path'
import { PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';

export const addConnectHandlerLambda = (stack: Construct, connectionsTable: cdk.aws_dynamodb.Table) => (
    new NodejsFunction(stack, "ConnectHandlerLambda", {
        description: "Lambda that access salt resources",
        handler: "handler",
        entry: join(__dirname, "../lambda/connectHandler/index.ts"),
        runtime: Runtime.NODEJS_14_X,
        timeout: cdk.Duration.seconds(30),
        environment: {
            CONNECTIONS_TABLE_NAME: connectionsTable.tableName,
        },
        initialPolicy: [
            new PolicyStatement({
                effect: Effect.ALLOW,
                actions: [
                    'dynamodb:BatchWriteItem',
                    'dynamodb:PutItem',
                    'dynamodb:UpdateItem',
                    'dynamodb:DeleteItem'],
                resources: [connectionsTable.tableArn]
            }),
            new PolicyStatement({
                effect: Effect.ALLOW,
                actions: [
                    'sts:AssumeRole'
                ],
                resources: ['lambda.amazonaws.com']
            }),
        ]
    }));

export const addDisonnectHandlerLambda = (stack: Construct, connectionsTable: cdk.aws_dynamodb.Table) => (
    new NodejsFunction(stack, "DisconnectHandlerLambda", {
        description: "Lambda that access salt resources",
        handler: "handler",
        entry: join(__dirname, "../lambda/disconnectHandler/index.ts"),
        runtime: Runtime.NODEJS_14_X,
        timeout: cdk.Duration.seconds(30),
        environment: {
            CONNECTIONS_TABLE_NAME: connectionsTable.tableName,
        },
        initialPolicy: [
            new PolicyStatement({
                effect: Effect.ALLOW,
                actions: [
                    'dynamodb:BatchWriteItem',
                    'dynamodb:PutItem',
                    'dynamodb:UpdateItem',
                    'dynamodb:DeleteItem'],
                resources: [connectionsTable.tableArn]
            }),
            new PolicyStatement({
                effect: Effect.ALLOW,
                actions: [
                    'sts:AssumeRole'
                ],
                resources: ['lambda.amazonaws.com']
            }),
        ]
    }));

export const addDefaultHandlerLambda = (stack: Construct) => (
    new NodejsFunction(stack, "DefaultHandlerLambda", {
        description: "Lambda that access salt resources",
        handler: "handler",
        entry: join(__dirname, "../lambda/defaultHandler/index.ts"),
        runtime: Runtime.NODEJS_14_X,
        timeout: cdk.Duration.seconds(30),
        initialPolicy: [
            new PolicyStatement({
                effect: Effect.ALLOW,
                actions: [
                    'sts:AssumeRole'
                ],
                resources: ['lambda.amazonaws.com']
            }),
        ]
    }));

export const addMessageHandlerLambda = (stack: Construct, connectionsTable: cdk.aws_dynamodb.Table) => (
    new NodejsFunction(stack, "MessageHandlerLambda", {
        description: "Lambda that access salt resources",
        handler: "handler",
        entry: join(__dirname, "../lambda/messageHandler/index.ts"),
        runtime: Runtime.NODEJS_14_X,
        timeout: cdk.Duration.seconds(30),
        environment: {
            CONNECTIONS_TABLE_NAME: connectionsTable.tableName,
        },
        initialPolicy: [
            new PolicyStatement({
                effect: Effect.ALLOW,
                actions: [
                    'dynamodb:*'
                ],
                resources: [connectionsTable.tableArn]
            }),
            new PolicyStatement({
                effect: Effect.ALLOW,
                actions: [
                    'sts:AssumeRole'
                ],
                resources: ['lambda.amazonaws.com']
            }),
        ]
    })
    );

