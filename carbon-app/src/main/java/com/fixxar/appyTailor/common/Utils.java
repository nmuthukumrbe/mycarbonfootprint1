package com.fixxar.appyTailor.common;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;

import org.apache.commons.lang.StringUtils;

public class Utils
{
	private static String dbDateTimeFormat = "yyyy-MM-dd HH:mm:SS";
	private static String dbDateFormat = "yyyy-MM-dd";
	private static String uiDTFormat = "EEE, dd MMM yyyy";
	private static String uiDateTimeFormat = "EEE, dd MMM yyyy hh:mm a";
	private static String uiDateFormat = "EEE, dd MMM yyyy hh:mm a";
	public static int MAX_FETCH_SIZE = 25;
	private static Map<String, DateFormat> displayDateFormat = new HashMap<String, DateFormat>();
	private static TimeZone tzInIndia = TimeZone.getTimeZone("IST");
	
	static {	
		displayDateFormat.put("DATE", new SimpleDateFormat(Utils.uiDateFormat));
		displayDateFormat.put("DATETIME", new SimpleDateFormat(Utils.uiDateTimeFormat));
		displayDateFormat.get("DATE").setTimeZone(tzInIndia);
		displayDateFormat.get("DATETIME").setTimeZone(tzInIndia);
	}

	private static String[] dateFormats = new String[] { Utils.uiDateFormat, Utils.uiDateTimeFormat };
	private static String[] dateFormat = new String[] { Utils.uiDateFormat};
	
	
	/**
	 * Get Datetime string format to display in UI 
	 *   
	 * @param db
	 * @return
	 */
	public static String dbToUI(String db){
		SimpleDateFormat dbFormatter = new SimpleDateFormat(Utils.dbDateTimeFormat);
		try {
			if(StringUtils.isNotEmpty(db)){
				dbFormatter.setTimeZone(tzInIndia);
				Date dbDT = dbFormatter.parse(db);
				return displayDateFormat.get("DATETIME").format(dbDT);
			}
		} catch (ParseException e) {
			System.out.println(e);
		}	
		return "";
	}
	
	/**
	 * Get Datetime string format to persist in database
	 * 
	 * @param db
	 * @return
	 */
	public static String uiToDB(String ui){
		SimpleDateFormat dbFormatter = new SimpleDateFormat(Utils.dbDateTimeFormat);
		try {
			if(StringUtils.isNotEmpty(ui)){
				Date dbDT = displayDateFormat.get("DATETIME").parse(ui);
				dbFormatter.setTimeZone(tzInIndia);
				return dbFormatter.format(dbDT);
			}
		} catch (ParseException e) {
			System.out.println(e);
		}	
		return null;
	}

	/**
	 * Get Date String format to display in report
	 * 
	 * @param ui
	 * @return
	 */
	public static String uiToDBDate(String ui){
		SimpleDateFormat dbFormatter = new SimpleDateFormat(Utils.dbDateFormat);
		try {
			if(StringUtils.isNotEmpty(ui)){
				Date dbDT = displayDateFormat.get("DATETIME").parse(ui);
				dbFormatter.setTimeZone(tzInIndia);
				return dbFormatter.format(dbDT);
			}
		} catch (ParseException e) {
			System.out.println(e);
		}	
		return "";
	}
	
	/**
	 * Get Datetime string format to persist in database
	 * 
	 * @param db
	 * @return
	 */
	public static String getUIDate(int days){
		SimpleDateFormat dbFormatter = new SimpleDateFormat(Utils.uiDateTimeFormat);
		try {
			
			Calendar c = Calendar.getInstance();				
			c.add(Calendar.DATE, days);
			dbFormatter.setTimeZone(tzInIndia);
			return dbFormatter.format(c.getTime());
			
		} catch (Exception e) {
			System.out.println(e);
		}	
		return "";
	}
	
	/**
	 * 
	 * Get UI date format for report
	 * 
	 * @param days
	 * @return
	 */
	public static String getUIDateFormat(int days){
		SimpleDateFormat dbFormatter = new SimpleDateFormat(Utils.uiDateTimeFormat);
		try {
			
			Calendar c = Calendar.getInstance();				
			c.add(Calendar.DATE, days);
			c.set(Calendar.HOUR_OF_DAY, 00);
			c.set(Calendar.MINUTE, 00);
			c.set(Calendar.MILLISECOND, 00);
			dbFormatter.setTimeZone(tzInIndia);
			return dbFormatter.format(c.getTime());
			
		} catch (Exception e) {
			System.out.println(e);
		}	
		return "";
	}
	
	/**
	 * 
	 * @return
	 */
	public static String getCurrentDBDate(){
		SimpleDateFormat dbFormatter = new SimpleDateFormat(Utils.dbDateTimeFormat);
		Date dbDT = new Date();
		dbFormatter.setTimeZone(tzInIndia);
		return dbFormatter.format(dbDT);
	}
	
	public static int getDiffYears(Date first, Date last) {
		Calendar a = getCalendar(first);
		Calendar b = getCalendar(last);
		int diff = b.get(Calendar.YEAR) - a.get(Calendar.YEAR);
		if (a.get(Calendar.MONTH) > b.get(Calendar.MONTH) || (a.get(Calendar.MONTH) == b.get(Calendar.MONTH) && a.get(Calendar.DATE) > b.get(Calendar.DATE))) {
			diff--;
		}
		return diff;
	}

	public static Calendar getCalendar(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return cal;
	}
	
	public static String getStrDate(Date date) throws ParseException {
		DateFormat format = displayDateFormat.get("DATETIME");
		return format.format(date);
	}
	
	/**
	 * return date format without time
	 * 
	 * @param date
	 * @return
	 * @throws ParseException
	 */
	public static String getStrAsDate(Date date) throws ParseException {
		DateFormat format = displayDateFormat.get("DATE");
		return format.format(date);
	}
	
	public static String formatDate(Date date, String format) {
		if (date != null && displayDateFormat.containsKey(format)) {
			return displayDateFormat.get(format).format(date);
		}
		return "";
	}
	
	public static String incrimentString(String st) {
		int val = 0;
		int i = 0;
		String newString = "";
		for (i = st.length() - 1; i > -1; i--) {
			try {
				val = Integer.parseInt(String.valueOf(st.charAt(i)));
			} catch (Exception e) {
				val = 0;
				break;
			}
			if (val == 9) {
				newString = newString + "0";
			} else {
				val++;
				newString = st.substring(0, i) + val + newString;
				break;
			}
		}
		return newString;
	}

	public static void main(String[] args) {
		
		SimpleDateFormat dbFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:SS");
		try {
			Date dbDT = dbFormatter.parse("2016-11-27 01:01:00");
			System.out.println("UI=" + displayDateFormat.get("DATETIME").format(dbDT));
			
			dbDT = displayDateFormat.get("DATETIME").parse("Sun, 27 Nov 2016 01:01 AM");
			System.out.println("DB=" + dbFormatter.format(dbDT));
		} catch (ParseException e) {
			System.out.println(e);
		}
		//System.out.println(Utils.dbToUI("2016-11-27 08:14:00"));
		//System.out.println(Utils.uiToDB(Utils.dbToUI("2016-11-27 08:14:00")));
		
	}

}
