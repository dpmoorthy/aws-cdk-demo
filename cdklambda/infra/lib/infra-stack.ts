import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda'

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'InfraQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    //lambda function
    const demolambda = new lambda.Function(this,'demologicalid', {
      handler:'lambda_function.lampda_handler',
      runtime:lambda.Runtime.PYTHON_3_9,
      code:lambda.Code.fromAsset('../services/'),
      functionName:'democdklampda'
     })
  }
}
