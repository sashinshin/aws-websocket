import { DynamoDB, ApiGatewayManagementApi } from "aws-sdk";
import { getEnvVar } from "../../utils";

const ddb = new DynamoDB.DocumentClient();


exports.handler = async function (event: any, context: any) {
    let connections;
    try {
        connections = await ddb.scan({ TableName: getEnvVar('CONNECTIONS_TABLE_NAME') }).promise();
    } catch (err) {
        return {
            statusCode: 500,
        };
    }
    const callbackAPI = new ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint:
            event.requestContext.domainName + '/' + event.requestContext.stage,
    });

    const message = JSON.parse(event.body).message;

    const sendMessages = connections.Items?.map(async ({ connectionId }) => {
        if (connectionId !== event.requestContext.connectionId) {
            try {
                await callbackAPI
                    .postToConnection({ ConnectionId: connectionId, Data: message })
                    .promise();
            } catch (e) {
                console.log(e);
            }
        }
    });

    try {
        if (!sendMessages) {
            throw new Error();
        }
        await Promise.all(sendMessages);
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500,
        };
    }

    return { statusCode: 200 };
};