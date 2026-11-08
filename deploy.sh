#!/bin/bash

# AWS FCJ Management System Deployment Script
# This script deploys the CloudFormation stack for the FCJ Management System

set -e

# Configuration
STACK_NAME="fcj-management-system"
TEMPLATE_FILE="aws-template.yaml"
REGION="us-east-1"  # Change this to your preferred region
KEY_NAME=""  # Set your EC2 Key Pair name here

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    print_error "AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    print_warning "jq is not installed. Some features may not work properly."
fi

# Check if template file exists
if [ ! -f "$TEMPLATE_FILE" ]; then
    print_error "Template file $TEMPLATE_FILE not found!"
    exit 1
fi

# Get Key Pair name if not set
if [ -z "$KEY_NAME" ]; then
    print_status "Available EC2 Key Pairs:"
    aws ec2 describe-key-pairs --region $REGION --query 'KeyPairs[].KeyName' --output table
    echo
    read -p "Enter your EC2 Key Pair name: " KEY_NAME
    
    if [ -z "$KEY_NAME" ]; then
        print_error "Key Pair name is required!"
        exit 1
    fi
fi

# Validate the template
print_status "Validating CloudFormation template..."
aws cloudformation validate-template --template-body file://$TEMPLATE_FILE --region $REGION > /dev/null
print_success "Template validation passed!"

# Check if stack already exists
STACK_EXISTS=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --region $REGION 2>/dev/null || echo "false")

if [ "$STACK_EXISTS" != "false" ]; then
    print_warning "Stack $STACK_NAME already exists."
    read -p "Do you want to update it? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        ACTION="update"
    else
        print_status "Deployment cancelled."
        exit 0
    fi
else
    ACTION="create"
fi

# Deploy the stack
print_status "Starting CloudFormation stack $ACTION..."

if [ "$ACTION" = "create" ]; then
    aws cloudformation create-stack \
        --stack-name $STACK_NAME \
        --template-body file://$TEMPLATE_FILE \
        --parameters ParameterKey=KeyName,ParameterValue=$KEY_NAME \
        --capabilities CAPABILITY_IAM \
        --region $REGION \
        --tags Key=Project,Value=AWS-First-Cloud-Journey \
               Key=Environment,Value=Production \
               Key=Owner,Value=$(whoami)
    
    print_status "Stack creation initiated. Waiting for completion..."
    aws cloudformation wait stack-create-complete --stack-name $STACK_NAME --region $REGION
else
    aws cloudformation update-stack \
        --stack-name $STACK_NAME \
        --template-body file://$TEMPLATE_FILE \
        --parameters ParameterKey=KeyName,ParameterValue=$KEY_NAME \
        --capabilities CAPABILITY_IAM \
        --region $REGION
    
    print_status "Stack update initiated. Waiting for completion..."
    aws cloudformation wait stack-update-complete --stack-name $STACK_NAME --region $REGION
fi

# Get stack outputs
print_success "Stack $ACTION completed successfully!"
print_status "Getting stack outputs..."

OUTPUTS=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --region $REGION --query 'Stacks[0].Outputs' --output json)

if command -v jq &> /dev/null; then
    echo
    echo "=== Stack Outputs ==="
    echo "$OUTPUTS" | jq -r '.[] | "\(.OutputKey): \(.OutputValue)"'
    echo
    
    # Get the application URL
    APP_URL=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="ApplicationURL") | .OutputValue')
    if [ "$APP_URL" != "null" ]; then
        print_success "AWS FCJ Management System is now available at:"
        echo -e "${GREEN}${APP_URL}${NC}"
        echo
        print_status "It may take a few minutes for the application to be fully ready."
        print_status "The system will automatically set up the database and sample data."
    fi
else
    echo
    echo "=== Stack Outputs ==="
    aws cloudformation describe-stacks --stack-name $STACK_NAME --region $REGION --query 'Stacks[0].Outputs[*].[OutputKey,OutputValue]' --output table
fi

print_success "Deployment completed!"