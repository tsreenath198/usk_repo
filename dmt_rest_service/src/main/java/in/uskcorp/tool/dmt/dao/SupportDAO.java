package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.domain.Support;
import in.uskcorp.tool.dmt.domain.SupportSummary;

import java.util.List;

public abstract class SupportDAO extends APIDAO<Support> {
	public abstract List<SupportSummary> getSummary();

}
