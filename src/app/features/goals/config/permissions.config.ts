/**
 * Goals Module Permissions Catalog
 */
export const GOAL_PERMISSIONS = {
  viewMenu: 'goals:ViewMenu',
  viewList: 'goals:Read',
  viewDetail: 'goals:Read',
  create: 'goals:Create',
  update: 'goals:Update',
  delete: 'goals:Delete',
} as const;

export type GoalPermission = (typeof GOAL_PERMISSIONS)[keyof typeof GOAL_PERMISSIONS];
