data "aws_security_group" "taskflow_existing" {
  id = "sg-04017918a32a439cf"
}

output "taskflow_security_group_id" {
  description = "Existing TaskFlow security group"
  value       = data.aws_security_group.taskflow_existing.id
}

output "taskflow_security_group_name" {
  description = "Existing TaskFlow security group name"
  value       = data.aws_security_group.taskflow_existing.name
}