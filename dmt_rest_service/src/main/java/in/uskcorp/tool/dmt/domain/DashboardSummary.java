package in.uskcorp.tool.dmt.domain;

import java.util.List;

public class DashboardSummary {

	private List<PaymentSummary> paymentSummaries;
	private List<InterviewSummary> interviewSummaries;
	private List<SupportSummary> supportSummaries;
	private List<BatchSummary> BatchSummaries;

	// private List<BatchSummary> batchSummaries;

	public List<BatchSummary> getBatchSummaries() {
		return BatchSummaries;
	}

	public void setBatchSummaries(List<BatchSummary> batchSummaries) {
		BatchSummaries = batchSummaries;
	}

	public List<InterviewSummary> getInterviewSummaries() {
		return interviewSummaries;
	}

	public List<PaymentSummary> getPaymentSummaries() {
		return paymentSummaries;
	}

	public void setPaymentSummaries(List<PaymentSummary> paymentSummaries) {
		this.paymentSummaries = paymentSummaries;
	}

	public void setInterviewSummaries(List<InterviewSummary> interviewSummaries) {
		this.interviewSummaries = interviewSummaries;
	}

	public List<SupportSummary> getSupportSummaries() {
		return supportSummaries;
	}

	public void setSupportSummaries(List<SupportSummary> supportSummaries) {
		this.supportSummaries = supportSummaries;
	}

	/*
	 * public List<TrainingSummary> getPaymentSummaries() { return
	 * paymentSummaries; }
	 * 
	 * public void setPaymentSummaries(List<TrainingSummary> paymentSummaries) {
	 * this.paymentSummaries = paymentSummaries; }
	 */
	// private List<TrainingSummary> trainingSummaries;
	/*
	 * public List<TrainingSummary> getTrainingSummaries() { return
	 * trainingSummaries; }
	 * 
	 * public void setTrainingSummaries(List<TrainingSummary> trainingSummaries)
	 * { this.trainingSummaries = trainingSummaries; }
	 */

}
