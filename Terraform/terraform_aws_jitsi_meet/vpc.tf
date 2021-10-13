resource “aws_vpc” “jitsi-vpc” {
    cidr_block = “10.0.3.0/16”
    enable_dns_support = “true” 
    enable_dns_hostnames = “true” 
    instance_tenancy = “default”    
    
    tags {
        Name = “jitsi-vpc”
    }
}

resource “aws_subnet” “jitsi-public-subnet” {
    vpc_id = “${aws_jitsi-vpc.id}”
    cidr_block = “10.0.1.0/24”
    map_public_ip_on_launch = “true” 
    availability_zone = “eu-east-1a”
    tags {
        Name = “jitsi-public-subnet”
    }
}
resource "aws_internet_gateway" "jitsi-igw" {
    vpc_id = "${aws_vpc.jitsi-vpc.id}"
    tags {
        Name = "jits-igw"
    }
}