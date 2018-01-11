package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.PaymentDAO;
import in.uskcorp.tool.dmt.domain.PaymentSummary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;


@Service("PaymentServiceImpl")
public class PaymentServiceImpl extends PaymentService {
	@Autowired
	@Qualifier("PaymentDAOImpl")
	PaymentDAO paymentDAO;

	@Override
	protected APIDAO<PaymentSummary> getDao() {
		return paymentDAO;
	}

}