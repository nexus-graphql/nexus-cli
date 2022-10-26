resource "aws_ecr_repository" "ecr_repo" {
  name = "ecr-automation"
}

output "repository_url" {
  value = aws_ecr_repository.ecr_repo.repository_url
}