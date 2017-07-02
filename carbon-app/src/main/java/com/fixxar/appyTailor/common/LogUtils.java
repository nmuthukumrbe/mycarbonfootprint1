/**
 * 
 */
package com.fixxar.appyTailor.common;

import org.apache.commons.logging.Log;

/**
 * @author Samy
 *
 */
public class LogUtils
{

	private LogUtils() {
	}

	public static final LogUtils loggerUtils = new LogUtils();

	public static LogUtils getInstance() {
		return loggerUtils;
	}

	public void log(Log log, String errorType, Exception e, String... message) {
		StringBuilder logBuilder = new StringBuilder(errorType);
		for (String string : message) {
			logBuilder.append(" ").append(string);
		}
		log.error(logBuilder.toString(), e);
	}
	
}
