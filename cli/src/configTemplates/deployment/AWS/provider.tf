variable "aws_region" {
  description = "Which region should the resources be deployed into?"
}

provider "aws" {
  shared_credentials_files = ["~/.aws/credentials"]
  shared_config_files = ["~/.aws/config"]
}