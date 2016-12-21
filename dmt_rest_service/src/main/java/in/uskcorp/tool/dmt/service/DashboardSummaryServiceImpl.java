package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.ClientDAO;
import in.uskcorp.tool.dmt.dao.InterviewDAO;
import in.uskcorp.tool.dmt.dao.SupportDAO;
import in.uskcorp.tool.dmt.dao.TraineeDAO;
import in.uskcorp.tool.dmt.domain.DashboardSummary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("dashboardSummaryServiceImpl")
public class DashboardSummaryServiceImpl extends DashboardSummaryService {
	@Autowired
	@Qualifier("traineeDaoImpl")
	TraineeDAO traineeDAO;
	@Autowired
	@Qualifier("interviewDaoImpl")
	InterviewDAO interviewDAO;
	@Autowired
	@Qualifier("supportDaoImpl")
	SupportDAO supportDAO;

/*	@Autowired
	@Qualifier("clientDAOImpl")
	ClientDAO clientDAO;
*/
	/*
	 * @Autowired
	 * 
	 * @Qualifier("paymentDAOImpl") PaymentDAO paymentDAO;
	 */

	@Override
	public DashboardSummary getDashboardSummary() {
		DashboardSummary dashboardSummary = new DashboardSummary();
		dashboardSummary.setTrainingSummaries(traineeDAO.getSummary());
		dashboardSummary.setInterviewSummaries(interviewDAO.getSummary());
		dashboardSummary.setSupportSummaries(supportDAO.getSummary());
		
		/*
		 * dashboardSummary.setClientSummaries(clientDAO.getSummary());
		 * dashboardSummary.setPaymentSummaries(paymentDAO.getSummary());
		 */
		return dashboardSummary;

	}

}
