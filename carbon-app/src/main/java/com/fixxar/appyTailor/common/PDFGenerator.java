/**
 * Example written by Bruno Lowagie in answer to the following question:
 * http://stackoverflow.com/questions/28472400/adding-pdfdiv-to-paragraph
 */
package com.fixxar.appyTailor.common;
 
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.stereotype.Component;

import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorkerHelper;
/**
 *
 * @author iText
 */
@Component
public class PDFGenerator {
	
	private static final String FILE_EXT_PDF = ".pdf";
    private static final String FORMAT_DATE = "ddMMyy-hhmm";
    private static final SimpleDateFormat FILE_FORMATER = new SimpleDateFormat(FORMAT_DATE);
    
	public String createPDF(String preFileName,String page){
		String fileName = AppConstants.DOWNLOAD_DIR+preFileName+"_" + FILE_FORMATER.format(new Date()) + FILE_EXT_PDF;
		try {
			OutputStream file = new FileOutputStream(new File(fileName));
			Document document = new Document();
			PdfWriter writer = PdfWriter.getInstance(document, file);
			StringBuilder htmlString = new StringBuilder();
			htmlString.append(page);
			document.open();
			InputStream is = new ByteArrayInputStream(htmlString.toString().getBytes());
			XMLWorkerHelper.getInstance().parseXHtml(writer, document, is);
			document.close();
			file.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return fileName;
	}
}