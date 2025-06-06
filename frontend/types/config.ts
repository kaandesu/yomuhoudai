export type Page = {
  title?: string;
  uid: string;
  label?: string;
  href?: string;
  icon?: string;
  isCollapsed?: boolean;
  desc?: string;
  sub?: Page[];
  action?: Function;
  tabs?: Page[];
  parent?: string;
  tourDesc?: string;
};

export type DashboardConfig = {
  title?: string;
  desc?: string;
  logo?: string;
  logoFallback?: string;
  pages: Page[];
};
