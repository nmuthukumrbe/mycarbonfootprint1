package com.fixxar.appyTailor.sms;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLEncoder;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * This class is used to deliver application sms to end user
 * 
 * @author Muthu N
 * @since 2.0
 * 
 */
public class AppSMS
{

	private Log log = LogFactory.getLog(this.getClass());

	private final String username = "nmuthukumarbe";//"jI4JY0bPSOjMvt0yplssaQ==";
	private final String password = "9789562069@";//"eTmPy0rnhS6FWb89KzSjnQ==";
	private final String senderName = "APYTLR";//"FIXDOC";//APYTLR
	private URL url = null;

	private static AppSMS appSMS;

	public static AppSMS getInstance() {
		if (appSMS == null) {
			synchronized (AppSMS.class) {
				if (appSMS == null) {
					appSMS = new AppSMS();
				}
			}
		}
		return appSMS;
	}
	
	/**
	 * Method to send SMS to end user
	 * 
	 * @param textMessageVO
	 * @throws Exception
	 */
	public void sendTransactionlSMS(final TextMessageVO textMessageVO) throws Exception {
		log.info("Preparing to send mail for :" + textMessageVO.getNumber().getNationalNumber());
		try {
			//AESencrp.decrypt()
			url = new URL("http://bhashsms.com/api/sendmsg.php?user="+ this.username 
					 +"&pass="+ this.password +"&sender="+ this.senderName +
					 "&priority=ndnd&stype=normal" +
					 "&text="+  URLEncoder.encode(textMessageVO.getMessage(), "UTF-8") +
					 "&phone="+ textMessageVO.getNumber().getNationalNumber());
			BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream()));
			String strTemp = "";
			while (null != (strTemp = br.readLine())) {
				strTemp += strTemp;
			}
			log.info(strTemp);
			log.info("Email delivered successfully :" + textMessageVO.getNumber().getNationalNumber());
		} catch (Exception e) {
			throw new Exception("App SMS delivery failed", e);
		}
	}
}
