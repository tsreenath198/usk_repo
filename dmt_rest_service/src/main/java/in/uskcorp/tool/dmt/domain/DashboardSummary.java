package in.uskcorp.tool.dmt.domain;

import java.util.List;

public class DashboardSummary {
	private List<TrainingSummary> trainingSummaries;
	private List<InterviewSummary> interviewSummaries;
	private List<SupportSummary> supportSummaries;
	private List<ClientSummary> clientSummaries;
	//private List<PaymentSummary> paymentSummaries;

	public List<TrainingSummary> getTrainingSummaries() {
		return trainingSummaries;
	}

	public void setTrainingSummaries(List<TrainingSummary> trainingSummaries) {
		this.trainingSummaries = trainingSummaries;
	}

	public List<InterviewSummary> getInterviewSummaries() {
		return interviewSummaries;
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

	public List<ClientSummary> getClientSummaries() {
		return clientSummaries;
	}

	public void setClientSummaries(List<ClientSummary> clientSummaries) {
		this.clientSummaries = clientSummaries;
	}
	/*
	 * public List<PaymentSummary> getPaymentSummaries() { return
	 * paymentSummaries; }
	 * 
	 * public void setPaymentSummaries(List<PaymentSummary> paymentSummaries) {
	 * this.paymentSummaries = paymentSummaries; }
	 */

}
