/**
 * Marketing Module Permissions Catalog
 * 
 * Defines all permissions required for marketing-related actions.
 * Use these constants throughout the module instead of hardcoded strings.
 */
export const MARKETING_PERMISSIONS = {
  // Module access
  viewMenu: 'marketing:ViewMenu',
  
  // Views
  viewDashboard: 'marketing:Read',
  viewCampaigns: 'marketing:Read',
  viewAnalytics: 'marketing:Read',
  
  // Campaign management
  createCampaign: 'marketing:CreateCampaign',
  updateCampaign: 'marketing:UpdateCampaign',
  deleteCampaign: 'marketing:DeleteCampaign',
  launchCampaign: 'marketing:LaunchCampaign',
  pauseCampaign: 'marketing:PauseCampaign',
  
  // Email marketing
  sendEmail: 'marketing:SendEmail',
  viewEmailTemplates: 'marketing:Read',
  manageEmailTemplates: 'marketing:ManageEmailTemplates',
  
  // Analytics
  viewReports: 'marketing:ViewReports',
  exportReports: 'marketing:ExportReports',
  
  // Audience management
  viewAudience: 'marketing:Read',
  createSegment: 'marketing:CreateSegment',
  manageSegments: 'marketing:ManageSegments'
} as const;

/**
 * Helper type for permission values
 */
export type MarketingPermission = typeof MARKETING_PERMISSIONS[keyof typeof MARKETING_PERMISSIONS];
