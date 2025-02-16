import {
  CollegeDetailIcon,
  DashboardIcon,
  InfrastructureIcon,
  ScholarshipIcon,
  SetupsIcon,
  StudentsIcon,
  TeacherIcon,
} from "../assets/SideBarIcons";

export const SideBarLinks = {
  college: [
    { label: "Dashboard", path: "/college/dashboard", icon: DashboardIcon },
    { label: "Students", path: "/college/students", icon: StudentsIcon },
    { label: "Teachers", path: "/college/teachers", icon: TeacherIcon },
    { label: "Setups", path: "/college/setups", icon: SetupsIcon },
    {
      label: "Infrastructure",
      path: "/college/infrastructure",
      icon: InfrastructureIcon,
    },
    {
      label: "Scholarship Approval",
      path: "/college/scholarship",
      icon: ScholarshipIcon,
    },
    {
      label: "College Details",
      path: "/college/details",
      icon: CollegeDetailIcon,
    },
  ],
};
