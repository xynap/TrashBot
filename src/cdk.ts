import { App, Construct, Stack, StackProps } from "@aws-cdk/core";
import { Vpc } from "@aws-cdk/aws-ec2";
import {
  AssetImage,
  AwsLogDriver,
  Cluster,
  FargateService,
  FargateTaskDefinition,
  Secret as SecretEnv
} from "@aws-cdk/aws-ecs";
import { Secret } from "@aws-cdk/aws-secretsmanager";

class TrashBotStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const discordSecret = new Secret(this, "DiscordSecret");

    const cluster = new Cluster(this, "Cluster", {
      vpc: Vpc.fromLookup(this, "DefaultVPC", {
        isDefault: true
      })
    });

    const taskDefinition = new FargateTaskDefinition(this, "TaskDefinition", {
      cpu: 256,
      memoryLimitMiB: 512
    });
    taskDefinition.addContainer("Container", {
      image: AssetImage.fromAsset("./dist/"),
      logging: new AwsLogDriver({
        streamPrefix: "TrashBot",
        logRetention: 30
      }),
      secrets: {
        DISCORD_TOKEN: SecretEnv.fromSecretsManager(discordSecret)
      }
    });

    new FargateService(this, "FargateService", {
      cluster,
      taskDefinition,
      assignPublicIp: true,
      desiredCount: 1
    });
  }
}

const app = new App();
new TrashBotStack(app, "TrashBot", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});
