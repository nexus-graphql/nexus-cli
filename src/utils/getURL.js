import { execSync } from "child_process";

export default () => {
  let url = "";
  try {
    const arn = JSON.parse(
      execSync("aws ecs list-tasks --cluster backend_cluster_example_app")
    ).taskArns[0];

    const eni = JSON.parse(
      execSync(
        `aws ecs describe-tasks --cluster backend_cluster_example_app  --tasks ${arn}`
      )
    ).tasks[0].attachments[0].details[1].value;

    const ip = JSON.parse(
      execSync(
        `aws ec2 describe-network-interfaces --network-interface-ids ${eni}`
      )
    ).NetworkInterfaces[0].Association.PublicIp;

    if (ip) {
      url = `${ip}:4000/graphql`;
    }
  } catch (error) {
    console.log("Waiting to get your URL...");
  }

  return url;
};
