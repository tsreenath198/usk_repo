package in.uskcorp.tool.dmt.domain;

public class BatchSummary {

		private int batchId;
		private int numberOfStudents;
		private String trainerName;
		private String technology;

		public int getBatchId() {
			return batchId;
		}

		public void setBatchId(int batchId) {
			this.batchId = batchId;
		}

		public int getNumberOfStudents() {
			return numberOfStudents;
		}

		public void setNumberOfStudents(int numberOfStudents) {
			this.numberOfStudents = numberOfStudents;
		}

		public String getTrainerName() {
			return trainerName;
		}

		public void setTrainerName(String trainerName) {
			this.trainerName = trainerName;
		}

		public String getTechnology() {
			return technology;
		}

		public void setTechnology(String technology) {
			this.technology = technology;
		}

	}


