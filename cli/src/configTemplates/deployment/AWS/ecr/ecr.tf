resource "aws_ecr_repository" "ecr_repo" {
  name = "ecr-automation"
}

output "aws_ecr_repository" {
  value = aws_ecr_repository.ecr_repo.repository_url
}