export const menuSections = [
	{
		department: 'Admin',
		items: [
			// {
			// 	icon: '/icons/building.png',
			// 	title: 'Departments and Employees List',
			// 	description: 'For admins to view employee information',
			// 	route: '/admin/departments'
			// },
			{
				icon: '/icons/uim.png',
				title: 'User Information Management',
				description: 'For admins to edit user information',
				route: '/admin/user-information'
			},
			{
				icon: '/icons/uam.jpg',
				title: 'User Access Management',
				description: 'For admins to manage user access to various app features',
				route: '/admin/user-access'
			}
		]
	},
	{
		department: 'Project',
		items: [
			{
				icon: '/icons/project_info.png',
				title: 'Project Information Management',
				description: 'For users to create and update project information',
				route: '/project/project-information'
			}
		]
	},
	{
		department: 'Occupational Safety & Health (OSH)',
		items: [
			{
				icon: '/icons/database.png',
				title: 'Site Safety eForm Information',
				description: 'For admins to show site safety eForm data',
				route: '/osh/site-safety'
			},
			{
				icon: '/icons/eWDA.png',
				title: 'Working Day Attendance (e-WDA) Record',
				description: 'For admins to show site safety supervisor attendance record',
				route: '/osh/e-wda'
			},
			{
				icon: '/icons/eCAR.png',
				title: 'Corrective Action Report (e-CAR) Submission',
				description: 'For OSH engineers to submit corrective action reports',
				route: '/osh/e-car'
			},
			{
				icon: '/icons/eCTR.jpg',
				title: 'Competency Register (e-CTR) Submission',
				description: 'For OSH engineers to submit competency register reports',
				route: '/osh/e-ctr'
			},
			{
				icon: '/icons/eHWA.png',
				title: 'Hot Work Activities Permit (e-HWA) Submission',
				description: 'For OSH engineers to submit hot work activities permit report',
				route: '/osh/e-hwa'
			},
			{
				icon: '/icons/eHKP.jpg',
				title: 'Housekeeping Report (e-HKP) Submission',
				description: 'For OSH engineers to submit housekeeping report',
				route: '/osh/e-hkp'
			},
			{
				icon: '/icons/eORA.png',
				title: 'Overtime Requisition and Approval Form (e-ORA) Submission',
				description: 'For OSH engineers to submit overtime requisition and approval report',
				route: '/osh/e-ora'
			},
			{
				icon: '/icons/ePPE.png',
				title: 'PPE Visual Inspections (e-PPE) Submission',
				description: 'For OSH engineers to submit PPE visual inspections report',
				route: '/osh/e-ppe'
			},
			{
				icon: '/icons/eSCF.jpg',
				title: 'Staff Claim Form (e-SCF) Submission',
				description: 'For OSH engineers to submit staff claim form report',
				route: '/osh/e-scf'
			},
			{
				icon: '/icons/eSOA.jpg',
				title: 'Safety Officer Audit (e-SOA) Submission',
				description: 'For OSH engineers to submit safety officer audit report',
				route: '/osh/e-soa'
			},
			{
				icon: '/icons/eTBM.jpg',
				title: 'Tool Box Meeting (e-TBM) Submission',
				description: 'For OSH engineers to submit tool box meeting report',
				route: '/osh/e-tbm'
			},
			{
				icon: '/icons/eTRF.png',
				title: 'Travel Requisition Form (e-TRF) Submission',
				description: 'For OSH engineers to submit travel requisition form report',
				route: '/osh/e-trf'
			},
			{
				icon: '/icons/eZCA.jpg',
				title: 'Zero Compromise Audit (e-ZCA) Submission',
				description: 'For OSH engineers to submit zero compromise audit report',
				route: '/osh/e-zca'
			}
		]
	}
];
