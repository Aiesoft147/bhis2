variable "aws_region" {
  description = "The AWS region to deploy resources in"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
}

variable "public_subnet_1_cidr" {
  description = "CIDR block for the first public subnet"
  type        = string
}

variable "public_subnet_2_cidr" {
  description = "CIDR block for the second public subnet"
  type        = string
}

variable "private_subnet_cidr" {
  description = "CIDR block for the private subnet"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type for the ECS cluster"
  type        = string
}

variable "ecr_repository_name" {
  description = "The name of the ECR repository"
  type        = string
}

variable "ecs_cluster_name" {
  description = "The name of the ECS cluster"
  type        = string
}

variable "ecs_service_name" {
  description = "The name of the ECS service"
  type        = string
}

variable "security_group_name" {
  description = "Name of the security group"
  type        = string
}

variable "private_subnet_name" {
  description = "Name of the private subnet"
  type        = string
}

variable "public_subnet_1_name" {
  description = "Name of the first public subnet"
  type        = string
}

variable "public_subnet_2_name" {
  description = "Name of the second public subnet"
  type        = string
}

variable "vpc_name" {
  description = "Name of the vpc"
  type        = string
}

variable "internet_gateway_name" {
  description = "Name of the internet gateway"
  type        = string
}

variable "public_route_table_name" {
  description = "Name of the public route table"
  type        = string
}

variable "ecs_task_execution_role_name" {
  description = "Name of the ECS task execution role"
  type        = string
}

variable "ecs_task_execution_role_policy_arn" {
  description = "ARN of the ECS task execution role policy"
  type        = string
}

variable "ecs_task_definition_family" {
  description = "Family name for the ECS task definition"
  type        = string
}

variable "ecs_task_memory" {
  description = "Memory for the ECS task"
  type        = string
}

variable "ecs_task_cpu" {
  description = "CPU for the ECS task"
  type        = string
}

variable "container_port" {
  description = "Port for the container"
  type        = number
}

variable "alb_name" {
  description = "Name of the Application Load Balancer"
  type        = string
}

variable "alb_name_tag" {
  description = "Tag name of the Application Load Balancer"
  type        = string
}

variable "alb_target_group_name" {
  description = "Name of the ALB target group"
  type        = string
}

variable "alb_target_group_name_tag" {
  description = "Tag name of the ALB target group"
  type        = string
}

variable "alb_listener_port" {
  description = "Listener port for the ALB"
  type        = number
}

variable "ecs_service_desired_count" {
  description = "Desired count of ECS service"
  type        = number
}

variable "ecs_service_launch_type" {
  description = "Launch type for the ECS service"
  type        = string
}