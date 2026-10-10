
terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = "ap-south-1"
}

data "aws_instance" "existing" {
  instance_id = "i-0a6c0f62fdaa11446"
}

resource "aws_instance" "taskflow" {
  ami           = data.aws_instance.existing.ami
  instance_type = data.aws_instance.existing.instance_type

  lifecycle {
    prevent_destroy = true
    ignore_changes  = all
  }
}

import {
  to = aws_instance.taskflow
  id = "i-0a6c0f62fdaa11446"
}

output "taskflow_public_ip" {
  value = aws_instance.taskflow.public_ip
}

output "taskflow_instance_type" {
  value = aws_instance.taskflow.instance_type
}