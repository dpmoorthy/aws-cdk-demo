import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as s3 from 'aws-cdk-lib/aws-s3'
export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'InfraQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    //S3 Bucket
     const s3demobucket = new s3.Bucket(this, 's3demobucket2024' ,{
      bucketName: 'demos3bucket202228',
      versioned: true,
      publicReadAccess: false,
      removalPolicy:cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects:true
     })
  }
}
