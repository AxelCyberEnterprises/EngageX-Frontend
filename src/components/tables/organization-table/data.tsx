
export type OrganizationTableData = {
    id: string;
    name: string;
    logo: string;
    industryType: string;
    members: number;
    trainingStatus: 'Active' | 'Blacklisted';
  };