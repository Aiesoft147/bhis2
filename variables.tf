variable "aws_region" {
  description = "The AWS region to deploy resources in"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
}

variable "public_subnet_cidr" {
  description = "CIDR block for the public subnet"
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

variable "public_subnet_name" {
  description = "Name of the public subnet"
  type        = string
}

variable "public_subnet_cidr_2" {
  description = "CIDR block for the second public subnet"
  type        = string
}

variable "public_subnet_name_2" {
  description = "Name of the second public subnet"
  type        = string
}


variable "vpc_name" {
  description = "Name of the vpc"
  type        = string
}

variable "ecs_task_execution_role_name" {
  description = "The name of the IAM role for ECS Task Execution"
  type        = string
}

variable "ecs_task_execution_role_policy_arn" {
  description = "The ARN of the IAM role policy attachment for ECS Task Execution"
  type        = string
}

variable "ecs_task_definition_family" {
  description = "The family name of the ECS task definition"
  type        = string
}

variable "ecs_task_memory" {
  description = "The memory allocated for the ECS task"
  type        = string
}

variable "ecs_task_cpu" {
  description = "The CPU allocated for the ECS task"
  type        = string
}

variable "ecs_service_desired_count" {
  description = "The number of desired instances of the ECS service"
  type        = number
}

variable "ecs_service_launch_type" {
  description = "The launch type for the ECS service"
  type        = string
}

variable "container_port" {
  description = "The port on which the container will be running"
  type        = number
}

variable "alb_target_group_name" {
  description = "Name of the ALB target group"
  type        = string
}

variable "alb_name" {
  description = "The name of the ALB"
  type        = string
  default     = "angular_alb"
}

variable "alb_listener_port" {
  description = "The port for the ALB listener"
  type        = number
  default     = 80
}

variable "alb_name_tag" {
  description = "The tag for the ALB name"
  type        = string
}

variable "alb_target_group_name_tag" {
  description = "The tag for the ALB target group name"
  type        = string
}
