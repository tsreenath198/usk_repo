package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.domain.PaymentSummary;

import java.util.List;

public abstract class PaymentDAO extends APIDAO<PaymentSummary>{
	public abstract List<PaymentSummary> getSummary();
}
