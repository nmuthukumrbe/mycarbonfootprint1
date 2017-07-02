/**
 * 
 */
package com.fixxar.appyTailor.common;

import java.text.NumberFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;


/**
 * @author Muthu
 *
 */
@Component
public class StartupListener implements
		ApplicationListener<ContextRefreshedEvent> {

	private boolean isLicensedValidated;

	private Log log = LogFactory.getLog(this.getClass());
	
	@Autowired DBFactory dbFactory;
	
	@Override
	public void onApplicationEvent(final ContextRefreshedEvent event) {
		try {
			dbFactory.initialize(false);
			log.info("INFO:DB Initialized properly");
			System.out.println("INFO:DB Initialized properly");
			isLicensedValidated = true;
		} catch (Exception e) {
			log.error("Error initializing application", e);
			isLicensedValidated = true;
		}
	}

	public boolean isLicensedValidated() {
		return isLicensedValidated;
	}

	public void setLicensedValidated(boolean isLicensedValidated) {
		this.isLicensedValidated = isLicensedValidated;
	}

	public static void main(String args[]){
		Calendar c = Calendar.getInstance();
		c.setTime(new Date());
		c.add(Calendar.MONTH, 12);
		System.out.println(c.getTime().getTime());
		
		int someNumber = 10000000;
		NumberFormat nf = NumberFormat.getInstance();
		System.out.println(nf.format(someNumber));
		
	}
}
