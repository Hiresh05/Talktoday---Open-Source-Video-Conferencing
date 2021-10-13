variable "aws_access_key" {
  description = "Access key from AWS"
  default = "AKIAZAF7HZFPYMMZTLRT"
}
variable "aws_secret_key" {
  description = "Secret key from AWS"
  default = "XVDhwoo+bcErR73jJXK3+TAEq/ws4AJ5ZM/wbIXj"
}
variable "aws_region" {
  description = "Region where the instance should be located"
  default = "us-east-1"
}
variable "ssh_key_path" {
  description = "Path to the AWS SSH key"
  default = "C:/Users/...."
}
variable "instance_type" {
  description = "Instance type to launch"
  default = "t2.large"
}
variable "ssh_key_name" {
  description = "Name of the SSH key"
  default = "terraform"
}
variable "ip_whitelist" {
  description = "All allowed ingress IPs"
  default = ["31.205.59.223/32"]
}
variable "eip" {
  description = "Elastic IP associated with the instance"
  default     = "54.87.126.169"
}
variable "email_address" {
  description = "Email to use for the certificate generation"
  default     = "hireshj@gmail.com"
}
variable "domain_name" {
  description = "Domain of the Jitsi Server"
  default     = "talktoday.live"
}