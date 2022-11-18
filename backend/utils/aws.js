const { execSync } = require("child_process");

const getARN = () => {
  try {
    let buffer = execSync(
      "aws ecs list-tasks --cluster backend_cluster_example_app"
    );
    if (JSON.parse(buffer.toString()).taskArns.length > 1) {
      return JSON.parse(buffer.toString()).taskArns[1];
    } else {
      return JSON.parse(buffer.toString()).taskArns[0];
    }
  } catch (error) {
    return;
  }
};

const getENI = (arn) => {
  let buffer = execSync(
    `aws ecs describe-tasks --cluster backend_cluster_example_app  --tasks ${arn}`
  );

  return JSON.parse(buffer.toString()).tasks[0].attachments[0].details[1].value;
};

const getIP = () => {
  const arn = getARN();
  if (!arn) {
    return { error: "No deployments" };
  }

  let eni;
  try {
    eni = getENI(arn);
  } catch (e) {
    return {
      status: "redeploying",
    };
  }

  let buffer = execSync(
    `aws ec2 describe-network-interfaces --network-interface-ids ${eni}`
  );

  return {
    ip: JSON.parse(buffer.toString()).NetworkInterfaces[0].Association.PublicIp,
  };
};

const getStatus = () => {
  const arn = getARN();
  if (!arn) {
    return { error: "No deployments" };
  }
  let buffer = execSync(
    `aws ecs describe-tasks --cluster backend_cluster_example_app --tasks ${arn}`
  );

  return { status: JSON.parse(buffer.toString()).tasks[0].lastStatus };
};

module.exports = {
  getIP,
  getStatus,
};
