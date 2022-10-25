resource "aws_ecr_repository" "ecr_repo" {
  name = "ecr_example_repo"
}

output "aws_ecr_repository" {
  value = aws_ecr_repository.ecr_repo.repository_url
}