
variable "aws_region" {
  description = "AWS region for TaskFlow"
  type        = string
  default     = "ap-south-1"
}

variable "instance_id" {
  description = "Existing TaskFlow EC2 instance ID"
  type        = string
  default     = "i-0a6c0f62fdaa11446"
}