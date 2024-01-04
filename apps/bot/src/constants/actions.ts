export enum ActionTypeEnum {
  goBack = 'goBack',
  goMenu = 'goMenu',
  goHowItWorks = 'goHowItWorks',
  goReportMenu = 'goReportMenu',
  goInstruction = 'goInstruction',
  reportRestriction = 'reportRestriction',
  reportConvenience = 'reportConvenience',
  startReportingRestriction = 'startReportingRestriction',
  howToSendLocation = 'howToSendLocation',
}

export const SCENES = {
  REPORT: 'report',
} as const;

export const STEPS = {
  FIRST: 0,
  SECOND: 1,
} as const;
