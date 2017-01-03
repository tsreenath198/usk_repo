package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.domain.Batch;
import in.uskcorp.tool.dmt.domain.BatchSummary;

import java.util.List;

public abstract class BatchDAO extends APIDAO<Batch> {
	public abstract List<BatchSummary> getSummary();
}
