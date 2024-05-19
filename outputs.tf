output "repository_url" {
  description = "URL of the ECR repository for the Angular frontend"
  value       = aws_ecr_repository.angular_repo.repository_url
}

output "ecs_cluster_id" {
  description = "ID of the ECS cluster for the Angular frontend"
  value       = aws_ecs_cluster.angular_cluster.id
}

output "ecs_service_name" {
  description = "Name of the ECS service for the Angular frontend"
  value       = aws_ecs_service.angular_service.name
}

output "alb_dns_name" {
  description = "The DNS name of the Application Load Balancer"
  value       = aws_lb.angular_alb.dns_name
}

