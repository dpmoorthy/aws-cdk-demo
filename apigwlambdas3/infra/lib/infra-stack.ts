import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
//import { APPSYNC_GRAPHQLAPI_SCOPE_LAMBDA_FUNCTION_PERMISSION } from 'aws-cdk-lib/cx-api';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'InfraQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    //S3 Bucket
    const balancestatuss3 = new s3.Bucket(this,"s3bucketlogicalid",{
      bucketName:'balancestatus-302024',
      versioned: true,
      publicReadAccess: false,
      removalPolicy:cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects:true
    })
    //IAM role
    const iambalancestatusrole = new iam.Role(this,"iambalancerole",{
      roleName:'bankingLambdaRole',
      description:'role for lambda to access S3 bucket',
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
    })
    iambalancestatusrole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'));
    //lambda Function
    const bankingLambdafunction = new lambda.Function(this,"lambdalogicalid",{
      handler:'lambda_function.lambda_handler',
      runtime: lambda.Runtime.PYTHON_3_9,
      code:lambda.Code.fromAsset('../services/'),
      role:iambalancestatusrole,
    })
    //API Gateway
    const bankingrestapi = new apigateway.LambdaRestApi(this,"bankingrestapi",{
      handler:bankingLambdafunction,
      restApiName:'bankingrestapi',
      deploy: true,
      proxy:false,
    })
    const bankstatus = bankingrestapi.root.addResource('bankstatus');
    bankstatus.addMethod('GET');
  }
}
