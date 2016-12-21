package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.Invoice;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.InvoiceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.INVOICES)
public class InvoiceController extends APIController<Invoice> {
	@Autowired
	@Qualifier("invoiceServiceImpl")
	InvoiceService invoiceService;

	@Override
	protected APIService<Invoice> getService() {
		return invoiceService;
	}

}
