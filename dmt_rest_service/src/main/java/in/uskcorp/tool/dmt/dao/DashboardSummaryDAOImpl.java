package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.domain.DashboardSummary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

public abstract class DashboardSummaryDAOImpl extends DashboardSummaryDAO {

	@Autowired
	@Qualifier("batchDAOImpl")
	BatchDAO batchDAO;

	@Autowired
	@Qualifier("interviewDaoImpl")
	InterviewDAO interviewDAO;
	@Autowired
	@Qualifier("supportDaoImpl")
	SupportDAO supportDAO;

	@Autowired
	@Qualifier("PaymentDAOImpl")
	PaymentDAO paymentDAO;

	/*
	 * @Autowired
	 * 
	 * @Qualifier("traineeDaoImpl") TraineeDAO traineeDAO;
	 */

	@Override
	public DashboardSummary getDashboardSummary() {
		DashboardSummary dashboardSummary = new DashboardSummary();

		dashboardSummary.setInterviewSummaries(interviewDAO.getSummary());
		dashboardSummary.setSupportSummaries(supportDAO.getSummary());
		dashboardSummary.setPaymentSummaries(paymentDAO.getSummary());
		dashboardSummary.setBatchSummaries(batchDAO.getSummary());
		// dashboardSummary.setTrainingSummaries(traineeDAO.getTraineeSummary());
		// dashboardSummary.setBatchSummaries(batchDAO.getSummary());

		return dashboardSummary;
	}

}
