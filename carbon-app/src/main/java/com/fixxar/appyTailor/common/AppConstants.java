/**
 * 
 */
package com.fixxar.appyTailor.common;

import java.io.File;

public final class AppConstants
{
	static {
		if (System.getProperty("catalina.home") != null) {
			System.setProperty("fixaar.dir", System.getProperty("catalina.home"));
		} else {
			System.setProperty("fixaar.dir", System.getProperty("user.dir"));
		}
	}

	public static final String SERVER_DIR = System.getProperty("fixaar.dir").concat(File.separator);

	public static final String CONF_DIR = SERVER_DIR.concat("conf").concat(File.separator);
	
	public static final String DOWNLOAD_DIR = SERVER_DIR.concat("downloads").concat(File.separator);

	public static final String DB_FILE = CONF_DIR.concat("app.conf");

	public static final String PRODUCT_UUID = "wmic csproduct get UUID";
	
	public static final String DISKDRIVE_UUID = "wmic DISKDRIVE get SerialNumber";
	
	public static final String SEPERATION_CHARACTER = ";";
	
}
