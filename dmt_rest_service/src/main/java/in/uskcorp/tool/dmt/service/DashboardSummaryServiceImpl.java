package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.BatchDAO;
import in.uskcorp.tool.dmt.dao.InterviewDAO;
import in.uskcorp.tool.dmt.dao.PaymentDAO;
import in.uskcorp.tool.dmt.dao.SupportDAO;
import in.uskcorp.tool.dmt.domain.DashboardSummary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("dashboardSummaryServiceImpl")
public class DashboardSummaryServiceImpl extends DashboardSummaryService {

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
	 * 
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

		// dashboardSummary.setPaymentSummaries(paymentDAO.getSummary());
		/*
		 * dashboardSummary.setClientSummaries(clientDAO.getSummary());
		 * dashboardSummary.setPaymentSummaries(paymentDAO.getSummary());
		 * dashboardSummary.setTrainingSummaries(traineeDAO.getSummary());
		 */

		return dashboardSummary;

	}

}
