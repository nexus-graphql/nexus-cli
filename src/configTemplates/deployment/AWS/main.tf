variable "aws_region" {}
variable "port" {}

output "aws_ecr_repository" {
  value = module.ecr.aws_ecr_repository
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
  port = var.port
  aws_region = var.aws_region
  repository_url = module.ecr.aws_ecr_repository
}