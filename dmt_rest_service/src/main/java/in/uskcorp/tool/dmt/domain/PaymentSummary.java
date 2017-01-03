package in.uskcorp.tool.dmt.domain;


public class PaymentSummary {
	private String candidateName;
	private String clientName;
	private String category;
	private String assistedBy;

	public String getCandidateName() {
		return candidateName;
	}

	public void setCandidateName(String candidateName) {
		this.candidateName = candidateName;
	}

	public String getClientName() {
		return clientName;
	}

	public void setClientName(String clientName) {
		this.clientName = clientName;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getAssistedBy() {
		return assistedBy;
	}

	public void setAssistedBy(String assistedBy) {
		this.assistedBy = assistedBy;
	}

}
