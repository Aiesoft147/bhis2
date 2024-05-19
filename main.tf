# Declare the provider and region
provider "aws" {
  region = var.aws_region
}

# Create a VPC
resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr

  tags = {
    Name = var.vpc_name
  }
}

# Create a public subnet
resource "aws_subnet" "public" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.public_subnet_cidr
  availability_zone = "${var.aws_region}a"

  tags = {
    Name = var.public_subnet_name
  }
}

# Create a second public subnet
resource "aws_subnet" "public2" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.public_subnet_cidr_2
  availability_zone = "${var.aws_region}b" # Change the availability zone if needed

  tags = {
    Name = var.public_subnet_name_2
  }
}


# Create a private subnet
resource "aws_subnet" "private" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_cidr
  availability_zone = "${var.aws_region}a"

  tags = {
    Name = var.private_subnet_name
  }
}

# Create Security Group
resource "aws_security_group" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = var.security_group_name
  }

  # Allow inbound HTTP access
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Create ECR Repository
resource "aws_ecr_repository" "angular_repo" {
  name = var.ecr_repository_name
}

# Create ECS Cluster
resource "aws_ecs_cluster" "angular_cluster" {
  name = var.ecs_cluster_name
}

# Create IAM Role for ECS Task Execution
resource "aws_iam_role" "ecs_task_execution_role" {
  name = var.ecs_task_execution_role_name

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        },
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = var.ecs_task_execution_role_policy_arn
}

# Create ECS Task Definition
resource "aws_ecs_task_definition" "angular_task" {
  family                   = var.ecs_task_definition_family
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  memory                   = var.ecs_task_memory
  cpu                      = var.ecs_task_cpu
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([
    {
      name      = "angular-container"
      image     = "${aws_ecr_repository.angular_repo.repository_url}:latest"
      essential = true
      portMappings = [
        {
          containerPort = var.container_port
          hostPort      = var.container_port
        }
      ]
    }
  ])
}

# Create ALB
resource "aws_lb" "angular_alb" {
  name               = var.alb_name
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.main.id]
  subnets = [
    aws_subnet.public.id,
    aws_subnet.public2.id # Add the second public subnet here
  ]

  tags = {
    Name = var.alb_name_tag
  }
}


resource "aws_lb_target_group" "angular_tg" {
  name        = var.alb_target_group_name
  port        = 80
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  health_check {
    path                = "/"
    protocol            = "HTTP"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }

  tags = {
    Name = var.alb_target_group_name_tag
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.angular_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.angular_tg.arn
  }
}

resource "aws_ecs_service" "angular_service" {
  name            = var.ecs_service_name
  cluster         = aws_ecs_cluster.angular_cluster.id
  task_definition = aws_ecs_task_definition.angular_task.arn
  desired_count   = var.ecs_service_desired_count
  launch_type     = var.ecs_service_launch_type

  network_configuration {
    subnets = [
      aws_subnet.public.id,
      aws_subnet.public2.id # Add the second public subnet here
    ]
    security_groups  = [aws_security_group.main.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.angular_tg.arn
    container_name   = "angular-container"
    container_port   = var.container_port
  }
}
