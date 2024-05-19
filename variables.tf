variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "vpc_name" {
  description = "Name of the VPC"
  type        = string
  default     = "angular-frontend-vpc"
}

variable "public_subnet_1_cidr" {
  description = "CIDR block for the first public subnet"
  type        = string
  default     = "10.0.1.0/24"
}

variable "public_subnet_1_name" {
  description = "Name of the first public subnet"
  type        = string
  default     = "angular-frontend-public-subnet-1"
}

variable "public_subnet_2_cidr" {
  description = "CIDR block for the second public subnet"
  type        = string
  default     = "10.0.2.0/24"
}

variable "public_subnet_2_name" {
  description = "Name of the second public subnet"
  type        = string
  default     = "angular-frontend-public-subnet-2"
}

variable "private_subnet_cidr" {
  description = "CIDR block for the private subnet"
  type        = string
  default     = "10.0.3.0/24"
}

variable "private_subnet_name" {
  description = "Name of the private subnet"
  type        = string
  default     = "angular-frontend-private-subnet"
}

variable "security_group_name" {
  description = "Name of the security group"
  type        = string
  default     = "angular-frontend-sg"
}

variable "ecr_repository_name" {
  description = "Name of the ECR repository"
  type        = string
  default     = "angular-frontend-repo"
}

variable "ecs_cluster_name" {
  description = "Name of the ECS cluster"
  type        = string
  default     = "angular-frontend-cluster"
}

variable "ecs_task_execution_role_name" {
  description = "Name of the ECS task execution role"
  type        = string
  default     = "ecsTaskExecutionRole"
}

variable "ecs_task_execution_role_policy_arn" {
  description = "ARN of the ECS task execution role policy"
  type        = string
  default     = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

variable "ecs_task_definition_family" {
  description = "Family of the ECS task definition"
  type        = string
  default     = "angular-task"
}

variable "ecs_task_memory" {
  description = "Memory for the ECS task"
  type        = string
  default     = "512"
}

variable "ecs_task_cpu" {
  description = "CPU for the ECS task"
  type        = string
  default     = "256"
}

variable "container_port" {
  description = "Port for the container"
  type        = number
  default     = 80
}

variable "ecs_service_name" {
  description = "Name of the ECS service"
  type        = string
  default     = "angular-service"
}

variable "ecs_service_desired_count" {
  description = "Desired count of ECS service tasks"
  type        = number
  default     = 1
}

variable "ecs_service_launch_type" {
  description = "Launch type for the ECS service"
  type        = string
  default     = "FARGATE"
}

variable "alb_name" {
  description = "Name of the Application Load Balancer"
  type        = string
  default     = "angular-alb"
}

variable "alb_listener_port" {
  description = "Listener port for the ALB"
  type        = number
  default     = 80
}

variable "alb_name_tag" {
  description = "Tag name for the ALB"
  type        = string
  default     = "angular-alb"
}

variable "alb_target_group_name" {
  description = "Name of the ALB target group"
  type        = string
  default     = "angular-tg"
}

variable "alb_target_group_name_tag" {
  description = "Tag name for the ALB target group"
  type        = string
  default     = "angular-tg"
}

variable "internet_gateway_name" {
  description = "Name of the Internet Gateway"
  type        = string
  default     = "angular-frontend-igw"
}

variable "public_route_table_name" {
  description = "Name of the public route table"
  type        = string
  default     = "angular-frontend-public-rt"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}