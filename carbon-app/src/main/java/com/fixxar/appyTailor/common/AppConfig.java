/**
 * 
 *//*
package com.fixxar.appyTailor.common;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.springframework.stereotype.Component;

*//**
 * @author mnagappan
 *
 *//*
@Component
public class AppConfig {

	private Properties props; 
	
	private AppConfig() throws IOException{
		try{
			System.out.println("prop file lication "+ AppConstants.DB_FILE);
			InputStream stream = new FileInputStream(AppConstants.DB_FILE);
			props = new Properties();
			props.load(stream);
		} catch(Exception e){
			System.out.println("Error loading property file" + e.getMessage());
		}
		
	}
	
	public String getUsername() throws Exception {
		return props.get("username").toString();
	}

	public String getPassword() throws Exception {
		return props.get("password").toString();
	}
	
	public String getDBServerName() throws Exception {
		return props.get("dbServer").toString();
	}
	
	public String getDBName() throws Exception {
		return props.get("database").toString();
	}
	
}
*/