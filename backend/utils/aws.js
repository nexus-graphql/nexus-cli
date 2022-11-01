const { execSync } = require("child_process");

const getARN = () => {
  let buffer = execSync(
    "aws ecs list-tasks --cluster backend_cluster_example_app"
  );

  return JSON.parse(buffer.toString()).taskArns[0];
};

const getENI = (arn) => {
  let buffer = execSync(
    `aws ecs describe-tasks --cluster backend_cluster_example_app  --tasks ${arn}`
  );

  return JSON.parse(buffer.toString()).tasks[0].attachments[0].details[1].value;
};

const getIP = (eni) => {
  let buffer = execSync(
    `aws ec2 describe-network-interfaces --network-interface-ids ${eni}`
  );

  return JSON.parse(buffer.toString()).NetworkInterfaces[0].Association
    .PublicIp;
};

const getStatus = (arn) => {
  let buffer = execSync(
    `aws ecs describe-tasks --cluster backend_cluster_example_app --tasks ${arn}`
  );

  return JSON.parse(buffer.toString()).tasks[0].lastStatus;
};

module.exports = {
  getARN,
  getENI,
  getIP,
  getStatus,
};
