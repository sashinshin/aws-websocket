import { DynamoDB } from "aws-sdk";
import { getEnvVar } from "../../utils";

const ddb = new DynamoDB.DocumentClient();

exports.handler = async function (event: any, context: any) {
  await ddb
    .delete({
      TableName: getEnvVar('CONNECTIONS_TABLE_NAME'),
      Key: {
        connectionId: event.requestContext.connectionId,
      },
    })
    .promise();
  return {
    statusCode: 200,
  };
};