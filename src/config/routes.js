const routes = {
    // public
    login: "/login",
    home: "/",
    detailJob: "/job/:_id",
    company: "/company",
    detailCompany: "/company/:_id",
    blog: "/blog",
    signUp: "/sign-up",
    forgotPassword: "/forgot-password",
    recruitment: "https://employers.glints.vn/",
    resetPassword: "/reset-password",
    error: "*",
    // private
    job: "/job",
    opportunities: "/opportunities",
    test: "/test",
    setting: "/setting",
    myApplications: "/applications"
}

export default routes;