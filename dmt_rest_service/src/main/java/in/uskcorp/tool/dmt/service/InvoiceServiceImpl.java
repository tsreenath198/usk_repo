package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.InvoiceDAO;
import in.uskcorp.tool.dmt.domain.Invoice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("invoiceServiceImpl")
public class InvoiceServiceImpl extends InvoiceService {
	@Autowired
	@Qualifier("invoiceDaoImpl")
	InvoiceDAO invoiceDAO;

	@Override
	protected APIDAO<Invoice> getDao() {
		return invoiceDAO;
	}

}
