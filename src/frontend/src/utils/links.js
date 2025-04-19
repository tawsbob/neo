export const LINKS = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    VERIFY_EMAIL: '/verify-email',
    DASHBOARD: '/dashboard',
    DASHBOARD_SHORTURL: '/dashboard/shorturl',
    DASHBOARD_BIOPROFILE: '/dashboard/bioprofile',
    DASHBOARD_BIOPROFILE_CREATE: '/dashboard/bioprofile/create',
    DASHBOARD_LINKINBIO: '/dashboard/bioprofile/linkinbio',
    BIOPROFILE: (url) => `/bio/${url}`,
}