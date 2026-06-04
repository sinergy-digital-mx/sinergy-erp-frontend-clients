// src/app/features/marketing/config/permissions.config.ts
var MARKETING_PERMISSIONS = {
  // Module access
  viewMenu: "marketing:ViewMenu",
  // Views
  viewDashboard: "marketing:Read",
  viewCampaigns: "marketing:Read",
  viewAnalytics: "marketing:Read",
  // Campaign management
  createCampaign: "marketing:CreateCampaign",
  updateCampaign: "marketing:UpdateCampaign",
  deleteCampaign: "marketing:DeleteCampaign",
  launchCampaign: "marketing:LaunchCampaign",
  pauseCampaign: "marketing:PauseCampaign",
  // Email marketing
  sendEmail: "marketing:SendEmail",
  viewEmailTemplates: "marketing:Read",
  manageEmailTemplates: "marketing:ManageEmailTemplates",
  // Analytics
  viewReports: "marketing:ViewReports",
  exportReports: "marketing:ExportReports",
  // Audience management
  viewAudience: "marketing:Read",
  createSegment: "marketing:CreateSegment",
  manageSegments: "marketing:ManageSegments"
};

export {
  MARKETING_PERMISSIONS
};
//# sourceMappingURL=chunk-3YDE66GB.js.map
