
interface Project {
  title: string;
  description: string;
}

interface BuildingInfo {
  title: string;
  color: string;
  experience: string;
  projects: Project[];
  skills: string[];
}

export const useBuildingData = () => {
  const buildingData: Record<string, BuildingInfo> = {
    'Main': {
      title: 'Multi-Cloud Architecture',
      color: '#7ea8c4',
      experience: '10+ years in cloud architecture across major platforms, specializing in enterprise-scale multi-cloud strategies and digital transformation initiatives.',
      projects: [
        {
          title: 'Enterprise Multi-Cloud Strategy',
          description: 'Developed comprehensive cloud adoption roadmap for Fortune 500 company, defining governance framework and migration strategy across AWS, NAVER Cloud, and KT Cloud platforms.'
        },
        {
          title: 'Cloud Center of Excellence',
          description: 'Established CoE framework for organization with 5000+ employees, implementing best practices, training programs, and standardized cloud deployment processes.'
        },
        {
          title: 'Cost Optimization Initiative',
          description: 'Led enterprise-wide cloud cost optimization project resulting in 35% reduction in cloud spending through rightsizing, reserved instances, and automated resource management.'
        }
      ],
      skills: ['Multi-cloud', 'AWS', 'NAVER Cloud', 'KT Cloud', 'Terraform', 'Ansible', 'SRE', 'DevOps', 'Cloud Governance']
    },
    'AWS': {
      title: 'AWS Cloud Solutions',
      color: '#ff9900',
      experience: '8+ years of AWS experience specializing in scalable architectures, serverless solutions, and enterprise migrations with focus on security and cost optimization.',
      projects: [
        {
          title: 'E-commerce Platform Migration',
          description: 'Led complete migration of legacy e-commerce platform to AWS, implementing auto-scaling architecture that resulted in 40% cost reduction and 99.9% uptime.'
        },
        {
          title: 'Serverless Data Pipeline',
          description: 'Designed and implemented real-time analytics pipeline using AWS Lambda, Kinesis, and DynamoDB, processing millions of events daily with sub-second latency.'
        },
        {
          title: 'Multi-Region DR Solution',
          description: 'Architected cross-region disaster recovery solution with automated failover, achieving RTO of 15 minutes and RPO of 5 minutes for critical business applications.'
        }
      ],
      skills: ['EC2', 'S3', 'Lambda', 'EKS', 'CloudFormation', 'DynamoDB', 'VPC', 'IAM', 'RDS', 'CloudWatch']
    },
    'Kubernetes': {
      title: 'Kubernetes Orchestration',
      color: '#326ce5',
      experience: '6+ years with Kubernetes, focusing on microservices architecture, container orchestration, and implementing robust CI/CD pipelines for enterprise applications.',
      projects: [
        {
          title: 'Microservices Platform',
          description: 'Transformed monolithic application into 30+ microservices using Kubernetes, implementing service mesh with Istio and achieving 10x deployment frequency.'
        },
        {
          title: 'Multi-Cluster Federation',
          description: 'Implemented federated Kubernetes architecture across multiple cloud providers, enabling seamless workload distribution and high availability.'
        },
        {
          title: 'GitOps Implementation',
          description: 'Established GitOps workflow using ArgoCD and Flux, automating deployment processes and reducing deployment errors by 85%.'
        }
      ],
      skills: ['Kubernetes', 'Docker', 'Helm', 'Istio', 'Prometheus', 'Grafana', 'GitOps', 'Service Mesh', 'ArgoCD']
    },
    'NAVER Cloud': {
      title: 'NAVER Cloud Platform',
      color: '#1ec800',
      experience: '5+ years with NAVER Cloud Platform, specializing in Korean market requirements, regulatory compliance, and hybrid cloud architectures for enterprise clients.',
      projects: [
        {
          title: 'Financial Services Migration',
          description: 'Migrated critical banking applications to NAVER Cloud Platform, ensuring compliance with Korean financial regulations and implementing enhanced security measures.'
        },
        {
          title: 'AI/ML Research Platform',
          description: 'Built scalable AI/ML computing platform for academic institution using NAVER Cloud AI services, supporting 1000+ concurrent research projects.'
        },
        {
          title: 'Hybrid Cloud Architecture',
          description: 'Designed hybrid cloud solution integrating on-premises infrastructure with NAVER Cloud Platform, enabling seamless data synchronization and workload distribution.'
        }
      ],
      skills: ['NAVER Cloud', 'Object Storage', 'VPC', 'Load Balancer', 'Cloud Functions', 'CDN', 'AI Services', 'Compliance']
    },
    'KT Cloud': {
      title: 'KT Cloud Solutions',
      color: '#ff1c1c',
      experience: '4+ years working with KT Cloud in enterprise and government sectors, specializing in secure architectures and compliance-driven solutions.',
      projects: [
        {
          title: 'Government Cloud Migration',
          description: 'Led migration of sensitive government workloads to KT Cloud, implementing enhanced security controls and achieving G-Cloud certification compliance.'
        },
        {
          title: 'Healthcare System Infrastructure',
          description: 'Designed and deployed healthcare data management system on KT Cloud, ensuring HIPAA compliance and implementing encrypted data processing pipelines.'
        },
        {
          title: 'Telecom Data Platform',
          description: 'Built high-throughput data processing platform for telecom analytics, handling petabytes of network data with real-time insights and reporting.'
        }
      ],
      skills: ['KT Cloud', 'IaaS', 'PaaS', 'Security Services', 'VDI', 'Dedicated Servers', 'Compliance', 'Data Analytics']
    }
  };

  const getBuildingInfo = (buildingName: string): BuildingInfo | null => {
    return buildingData[buildingName] || null;
  };

  return { getBuildingInfo };
};
