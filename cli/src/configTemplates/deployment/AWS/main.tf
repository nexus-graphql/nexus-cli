variable "aws_region" {
  description = "Which region should the resources be deployed into?"
}

provider "aws" {
  shared_credentials_files = ["~/.aws/credentials"]
  shared_config_files = ["~/.aws/config"]
}

module "ecr" {
  source = "./ecr"
}

module "ecs" {
  source = "./ecs"
  aws_region = var.aws_region
  respository_url = module.ecr.aws_ecr_repository
}