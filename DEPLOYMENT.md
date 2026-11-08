# AWS Deployment Guide

This guide will help you deploy the AWS First Cloud Journey Participant Management System to AWS using CloudFormation.

## Architecture Overview

The deployment creates:

- **VPC** with public and private subnets across 2 Availability Zones
- **Application Load Balancer** for high availability
- **Auto Scaling Group** with EC2 instances running the Node.js application
- **RDS MySQL** database with Multi-AZ deployment
- **Secrets Manager** for secure database credentials
- **NAT Gateway** for outbound internet access from private subnets

## Prerequisites

1. **AWS CLI** installed and configured
   ```bash
   aws configure
   ```

2. **EC2 Key Pair** created in your target region
   - Go to EC2 Console → Key Pairs → Create Key Pair
   - Download the `.pem` file for SSH access

3. **Sufficient AWS permissions** for:
   - CloudFormation
   - EC2, VPC, ELB
   - RDS, Secrets Manager
   - IAM (for creating roles)

## Quick Deployment

### Option 1: Using the Deployment Script (Linux/macOS)

```bash
# Make the script executable
chmod +x deploy.sh

# Run the deployment
./deploy.sh
```

### Option 2: Manual CloudFormation Deployment

```bash
# Validate the template
aws cloudformation validate-template --template-body file://aws-template.yaml

# Deploy the stack
aws cloudformation create-stack \
  --stack-name fcj-management-system \
  --template-body file://aws-template.yaml \
  --parameters ParameterKey=KeyName,ParameterValue=YOUR_KEY_PAIR_NAME \
  --capabilities CAPABILITY_IAM \
  --region us-east-1

# Wait for completion
aws cloudformation wait stack-create-complete --stack-name fcj-management-system
```

### Option 3: AWS Console Deployment

1. Go to **CloudFormation Console**
2. Click **Create Stack** → **With new resources**
3. Upload the `aws-template.yaml` file
4. Fill in the parameters:
   - **Stack name**: `fcj-management-system`
   - **KeyName**: Your EC2 Key Pair name
   - Leave other parameters as default or customize as needed
5. Check **I acknowledge that AWS CloudFormation might create IAM resources**
6. Click **Create Stack**

## Configuration Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `VpcCidr` | `10.20.0.0/16` | VPC CIDR block |
| `KeyName` | *Required* | EC2 Key Pair for SSH access |
| `DesiredCapacity` | `2` | Number of EC2 instances |
| `MinSize` | `2` | Minimum instances in ASG |
| `MaxSize` | `6` | Maximum instances in ASG |
| `AppInstanceType` | `t3.micro` | EC2 instance type |
| `DBEngine` | `mysql` | Database engine |
| `DBInstanceClass` | `db.t3.micro` | RDS instance type |
| `DBName` | `lib` | Database name |
| `DBUsername` | `root` | Database master username |

## What Gets Deployed

### Network Infrastructure
- **VPC**: `10.20.0.0/16`
- **Public Subnets**: `10.20.0.0/24`, `10.20.1.0/24`
- **App Subnets**: `10.20.10.0/24`, `10.20.11.0/24` (private)
- **DB Subnets**: `10.20.20.0/24`, `10.20.21.0/24` (private)
- **NAT Gateway**: For outbound internet access
- **Internet Gateway**: For public subnet access

### Application Layer
- **Application Load Balancer**: Internet-facing, distributes traffic
- **Auto Scaling Group**: 2-6 EC2 instances based on CPU utilization
- **Target Group**: Health checks on port 3333
- **Security Groups**: Properly configured for web traffic

### Database Layer
- **RDS MySQL**: Multi-AZ deployment for high availability
- **Secrets Manager**: Auto-generated secure database password
- **DB Subnet Group**: Spans multiple AZs
- **Automated Backups**: 7-day retention

### Security
- **IAM Roles**: Least privilege access for EC2 instances
- **Security Groups**: Network-level security
- **Secrets Manager**: Secure credential storage
- **Private Subnets**: App and DB tiers not directly accessible

## Monitoring & Scaling

### Auto Scaling
- **Target Tracking**: Scales based on 50% CPU utilization
- **Scheduled Scaling**: Peak hours (8 AM - 6 PM, Mon-Fri)
- **Health Checks**: ELB health checks with 2-minute grace period

### CloudWatch Alarms
- **High CPU Alarm**: Triggers when CPU > 70% for 5 minutes
- **ASG Metrics**: Collected every minute

## Application Features

Once deployed, the application provides:

- **Modern Web Interface**: Responsive design with AWS styling
- **Participant Management**: Full CRUD operations
- **Database Integration**: MySQL with automatic table creation
- **Sample Data**: Pre-loaded demo participants
- **Health Monitoring**: Built-in health check endpoints
- **Auto-scaling**: Handles traffic spikes automatically

## Accessing the Application

After deployment completes:

1. **Get the Application URL**:
   ```bash
   aws cloudformation describe-stacks \
     --stack-name fcj-management-system \
     --query 'Stacks[0].Outputs[?OutputKey==`ApplicationURL`].OutputValue' \
     --output text
   ```

2. **Open in browser**: The URL will be in format `http://fcj-management-ALB-xxxxx.region.elb.amazonaws.com`

3. **Wait for initialization**: The application may take 2-3 minutes to fully start

## Troubleshooting

### Common Issues

1. **Stack creation fails**:
   - Check AWS permissions
   - Verify Key Pair exists in the target region
   - Ensure sufficient service limits

2. **Application not accessible**:
   - Wait 2-3 minutes for initialization
   - Check Auto Scaling Group instances are healthy
   - Verify Security Group rules

3. **Database connection issues**:
   - Check RDS instance status
   - Verify Secrets Manager permissions
   - Review CloudWatch logs

### Debugging Commands

```bash
# Check stack status
aws cloudformation describe-stacks --stack-name fcj-management-system

# View stack events
aws cloudformation describe-stack-events --stack-name fcj-management-system

# Check Auto Scaling Group
aws autoscaling describe-auto-scaling-groups --auto-scaling-group-names <ASG-Name>

# View application logs (SSH to instance)
sudo journalctl -u fcj-management -f
```

## Cost Estimation

Approximate monthly costs (us-east-1):

- **EC2 instances** (2x t3.micro): ~$17
- **RDS MySQL** (db.t3.micro Multi-AZ): ~$25
- **Application Load Balancer**: ~$18
- **NAT Gateway**: ~$32
- **Data transfer**: Variable
- **Total**: ~$92/month

*Costs may vary by region and usage patterns*

## Cleanup

To delete all resources:

```bash
aws cloudformation delete-stack --stack-name fcj-management-system
aws cloudformation wait stack-delete-complete --stack-name fcj-management-system
```

**Warning**: This will permanently delete all data including the database!

## Security Best Practices

The template implements several security best practices:

- **Private subnets** for application and database tiers
- **Security groups** with minimal required access
- **Secrets Manager** for database credentials
- **IAM roles** with least privilege
- **Encrypted RDS storage**
- **VPC isolation** from internet

## Support

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review AWS CloudFormation events
3. Check application logs on EC2 instances
4. Open an issue on the GitHub repository

---

**Happy Deploying! **