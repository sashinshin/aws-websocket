import { DynamoDB } from "aws-sdk";
import { getEnvVar } from "../../utils";

const ddb = new DynamoDB.DocumentClient();

exports.handler = async function (event: any, context: any) {
  try {
    await ddb
      .put({
        TableName: getEnvVar('CONNECTIONS_TABLE_NAME'),
        Item: {
          connectionId: event.requestContext.connectionId,
        },
      })
      .promise();
  } catch (err) {
    return {
      statusCode: 500
    };
  }
  return {
    statusCode: 200,
  };
};