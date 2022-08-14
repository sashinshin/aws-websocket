import { ApiGatewayManagementApi } from "aws-sdk";

exports.handler = async function (event: any, context: any) {
    let connectionInfo;
    let connectionId = event.requestContext.connectionId;

    const callbackAPI = new ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint:
            event.requestContext.domainName + '/' + event.requestContext.stage,
    });

    try {
        connectionInfo = await callbackAPI
            .getConnection({ ConnectionId: event.requestContext.connectionId })
            .promise();
    } catch (e) {
        console.log(e);
    }

    if (typeof connectionInfo === 'undefined') {
        throw new Error();

    }

    // connectionInfo.connectionID = connectionId;

    await callbackAPI
        .postToConnection({
            ConnectionId: event.requestContext.connectionId,
            Data:
                'Use the sendmessage route to send a message. Your info:' +
                JSON.stringify({...connectionInfo, connectionID: connectionId}),
        })
        .promise();

    return {
        statusCode: 200,
    };
};